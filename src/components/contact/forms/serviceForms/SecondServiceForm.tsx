"use client";
// Drone Mapping Services
import { useState, ChangeEvent, FormEvent, JSX, useRef } from "react";
import { colorPalette, validateEmail, validatePhone } from "@/utils/variables";
import { MAX_LENGTHS } from "@/utils/formConstants";
import ReCaptcha, { ReCaptchaRef } from "@/components/common/ReCaptcha";

interface FormData {
  fullName: string;
  organizationName: string;
  email: string;
  phone: string;
  mappingRequirement: string;
  areaToBeMapped: string;
  locationCoordinates: string;
  terrainType: string;
  usagePurpose: string;
  deliveryTimeline: string;
  additionalRequirements: string;
}

interface Errors {
  phone?: string;
  email?: string;
  captcha?: string;
  submit?: string;
}

export default function SecondServiceForm(): JSX.Element {
  const [form, setForm] = useState<FormData>({
    fullName: "",
    organizationName: "",
    email: "",
    phone: "",
    mappingRequirement: "",
    areaToBeMapped: "",
    locationCoordinates: "",
    terrainType: "",
    usagePurpose: "",
    deliveryTimeline: "",
    additionalRequirements: "",
  });

  const [errors, setErrors] = useState<Errors>({});
  const [hasGeneralError, setHasGeneralError] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // CAPTCHA state
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const [isCaptchaVerified, setIsCaptchaVerified] = useState(false);
  const [isCaptchaLoading, setIsCaptchaLoading] = useState(false);
  const captchaRef = useRef<ReCaptchaRef>(null);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ): void => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  // CAPTCHA handlers
  const handleCaptchaVerify = async (token: string | null) => {
    console.log("CAPTCHA verification started:", token ? "Token received" : "No token");
    setErrors(prev => ({ ...prev, captcha: undefined }));
    
    if (!token) {
      setIsCaptchaVerified(false);
      setCaptchaToken(null);
      return;
    }

    setIsCaptchaLoading(true);
    
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 15000);

      const response = await fetch('/api/verify-captcha', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ captchaToken: token }),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);
      const data = await response.json();

      if (response.ok && data.success) {
        setIsCaptchaVerified(true);
        setCaptchaToken(token);
        console.log('✅ CAPTCHA verified successfully');
      } else {
        setIsCaptchaVerified(false);
        setCaptchaToken(null);
        setErrors(prev => ({ 
          ...prev, 
          captcha: data.error || 'CAPTCHA verification failed. Please try again.' 
        }));
        captchaRef.current?.reset();
      }
    } catch (error: any) {
      setIsCaptchaVerified(false);
      setCaptchaToken(null);
      
      if (error.name === 'AbortError') {
        setErrors(prev => ({ 
          ...prev, 
          captcha: 'CAPTCHA verification timed out. Please try again.' 
        }));
      } else {
        setErrors(prev => ({ 
          ...prev, 
          captcha: 'CAPTCHA verification error. Please try again.' 
        }));
      }
      
      captchaRef.current?.reset();
    } finally {
      setIsCaptchaLoading(false);
    }
  };

  const handleCaptchaError = () => {
    setIsCaptchaVerified(false);
    setCaptchaToken(null);
    setErrors(prev => ({ 
      ...prev, 
      captcha: 'CAPTCHA error occurred. Please refresh and try again.' 
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const newErrors: typeof errors = {};
    let hasError = false;

    if (!validateEmail(form.email)) {
      newErrors.email = "Please enter a valid email address.";
      hasError = true;
    }

    if (!validatePhone(form.phone)) {
      newErrors.phone = "Please enter a valid phone number.";
      hasError = true;
    }

    if (!isCaptchaVerified || !captchaToken) {
      newErrors.captcha = "Please complete the CAPTCHA verification.";
      hasError = true;
    }

    if (hasError) {
      setErrors(newErrors);
      setHasGeneralError(true);
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/query/services/second", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, captchaToken }),
      });

      const data = await response.json();

      if (!response.ok) {
        setHasGeneralError(true);
        setErrors((prev) => ({ ...prev, submit: data.error }));
        return;
      }

      setHasGeneralError(false);
      setErrors({});
      alert("Mapping service inquiry submitted successfully!");
      
      // Reset form and CAPTCHA
      setForm({
        fullName: "",
        organizationName: "",
        email: "",
        phone: "",
        mappingRequirement: "",
        areaToBeMapped: "",
        locationCoordinates: "",
        terrainType: "",
        usagePurpose: "",
        deliveryTimeline: "",
        additionalRequirements: "",
      });
      setIsCaptchaVerified(false);
      setCaptchaToken(null);
      captchaRef.current?.reset();
    } catch (error) {
      console.error("Form submission error:", error);
      setHasGeneralError(true);
      setErrors((prev) => ({
        ...prev,
        submit: "Error submitting form. Please try again.",
      }));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex justify-center py-10 px-4">
      <form
        onSubmit={handleSubmit}
        className="space-y-6 max-w-4xl w-full rounded-xl bg-white p-8"
      >
        <h2 className="text-2xl font-bold text-center mb-4">
          Drone Mapping Services Inquiry Form
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block font-medium mb-1">
              Full Name <span className="text-red-600">*</span>
            </label>
            <input
              name="fullName"
              required
              type="text"
              value={form.fullName}
              onChange={handleChange}
              className="input"
              maxLength={MAX_LENGTHS.name}
            />
          </div>

          <div>
            <label className="block font-medium mb-1">
              Organization/Company Name <span className="text-red-600">*</span>
            </label>
            <input
              name="organizationName"
              required
              type="text"
              value={form.organizationName}
              onChange={handleChange}
              className="input"
              maxLength={MAX_LENGTHS.organization}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block font-medium mb-1">
              Email <span className="text-red-600">*</span>
            </label>
            <input
              name="email"
              required
              type="email"
              value={form.email}
              onChange={handleChange}
              className="input"
              maxLength={MAX_LENGTHS.email}
            />
            {errors.email && (
              <p className="text-red-600 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          <div>
            <label className="block font-medium mb-1">
              Phone <span className="text-red-600">*</span>
            </label>
            <input
              name="phone"
              required
              type="text"
              value={form.phone}
              onChange={handleChange}
              className="input"
              maxLength={MAX_LENGTHS.phone}
            />
            {errors.phone && (
              <p className="text-red-600 text-sm mt-1">{errors.phone}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block font-medium mb-1">
              Mapping Requirement <span className="text-red-600">*</span>
            </label>
            <select
              name="mappingRequirement"
              required
              value={form.mappingRequirement}
              onChange={handleChange}
              className="input"
            >
              <option value="">Select Mapping Type</option>
              <option value="DSM">DSM</option>
              <option value="DTM">DTM</option>
              <option value="Ortho">Ortho</option>
              <option value="Contour">Contour</option>
              <option value="Others">Others</option>
            </select>
          </div>

          <div>
            <label className="block font-medium mb-1">
              Area to be Mapped (in sq. km){" "}
              <span className="text-red-600">*</span>
            </label>
            <input
              name="areaToBeMapped"
              required
              type="number"
              min="0"
              step="0.01"
              value={form.areaToBeMapped}
              onChange={handleChange}
              className="input"
              maxLength={MAX_LENGTHS.numbers}
            />
          </div>
        </div>

        <div>
          <label className="block font-medium mb-1">
            Location/Coordinates (if available)
          </label>
          <textarea
            name="locationCoordinates"
            rows={3}
            value={form.locationCoordinates}
            onChange={handleChange}
            className="input"
            placeholder="Enter coordinates or detailed location description..."
            maxLength={MAX_LENGTHS.longText}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block font-medium mb-1">
              Terrain Type <span className="text-red-600">*</span>
            </label>
            <select
              name="terrainType"
              required
              value={form.terrainType}
              onChange={handleChange}
              className="input"
            >
              <option value="">Select Terrain Type</option>
              <option value="Urban">Urban</option>
              <option value="Forest">Forest</option>
              <option value="Agricultural">Agricultural</option>
              <option value="Mixed">Mixed</option>
            </select>
          </div>

          <div>
            <label className="block font-medium mb-1">
              Usage Purpose <span className="text-red-600">*</span>
            </label>
            <select
              name="usagePurpose"
              required
              value={form.usagePurpose}
              onChange={handleChange}
              className="input"
            >
              <option value="">Select Usage Purpose</option>
              <option value="Construction">Construction</option>
              <option value="Survey">Survey</option>
              <option value="Agriculture">Agriculture</option>
              <option value="Others">Others</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block font-medium mb-1">
            Timeline to Deliver Output <span className="text-red-600">*</span>
          </label>
          <input
            name="deliveryTimeline"
            required
            type="date"
            min={new Date().toISOString().split("T")[0]}
            value={form.deliveryTimeline}
            onChange={handleChange}
            className="input"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">
            Additional Requirements
          </label>
          <textarea
            name="additionalRequirements"
            rows={4}
            value={form.additionalRequirements}
            onChange={handleChange}
            className="input"
            placeholder="Please specify any additional requirements or special considerations..."
            maxLength={MAX_LENGTHS.specifications}
          />
        </div>

        <input type="hidden" name="querytype" value="service-drone-mapping" />

        {/* CAPTCHA Section */}
        <div className="space-y-3">
          <div>
            <label className="block font-medium mb-3">
              Security Verification ( may take a little time to render ) <span className="text-red-600">*</span>
            </label>
            <ReCaptcha
              ref={captchaRef}
              onVerify={handleCaptchaVerify}
              onError={handleCaptchaError}
              theme="light"
            />
          </div>
          
          {isCaptchaLoading && (
            <div className="flex items-center justify-center text-blue-600 text-sm">
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 714 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Verifying CAPTCHA...
            </div>
          )}
          
          {isCaptchaVerified && !isCaptchaLoading && (
            <div className="flex items-center justify-center text-green-600 text-sm">
              <svg className="h-4 w-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              CAPTCHA verified successfully
            </div>
          )}
          
          {errors.captcha && (
            <p className="text-red-600 text-sm text-center">{errors.captcha}</p>
          )}
        </div>

        <div className="text-center">
          <button
            type="submit"
            disabled={isSubmitting || !isCaptchaVerified}
            className="bg-[#1ba100] hover:bg-[#104a2f] text-white py-3 px-8 rounded-full transition hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 714 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Submitting...
              </span>
            ) : (
              "Submit Application"
            )}
          </button>

          {hasGeneralError && (
            <p className="text-red-600 text-center mt-4">
              There was some error in filling the form. Please recheck!
            </p>
          )}

          {errors.submit && (
            <p className="text-red-600 text-center mt-4">{errors.submit}</p>
          )}
        </div>

        <style jsx>{`
          .input {
            padding: 0.75rem;
            border: 1px solid #ccc;
            border-radius: 0.5rem;
            width: 100%;
            background: ${colorPalette.whiteMint};
            transition: box-shadow 0.3s ease;
          }
          .input:focus {
            outline: none;
            box-shadow: 0 0 0 2px ${colorPalette.green3};
          }
        `}</style>
      </form>
    </div>
  );
}