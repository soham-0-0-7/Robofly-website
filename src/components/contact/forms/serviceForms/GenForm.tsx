/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
// General Service Inquiry Form
import { useState, ChangeEvent, FormEvent, JSX, useRef } from "react";
import { colorPalette, validateEmail, validatePhone } from "@/utils/variables";
import { MAX_LENGTHS } from "@/utils/formConstants";
import { indianStatesAndUTs } from "@/utils/variables";
import ReCaptcha, { ReCaptchaRef } from "@/components/common/ReCaptcha";
import OTPModal from "@/components/common/OTPModal";

interface FormData {
  fullName: string;
  organizationName: string;
  email: string;
  phone: string;
  state: string;
  city: string;
  serviceCategory: string;
  serviceType: string;
  projectDescription: string;
  requirements: string;
  timeline: string;
  budget: string;
  urgency: string;
  additionalInfo: string;
}

interface Errors {
  phone?: string;
  email?: string;
  captcha?: string;
  submit?: string;
}

const serviceCategories = [
  "Drone Services",
  "Mapping & Surveying",
  "Inspection & Monitoring",
  "Agricultural Solutions",
  "Emergency Response",
  "Research & Development",
  "Training & Consultation",
  "Custom Solutions",
  "Other",
];

const serviceTypes = [
  "Aerial Photography",
  "Video Production",
  "3D Mapping",
  "Thermal Imaging",
  "Search & Rescue",
  "Surveillance",
  "Delivery Services",
  "Data Analysis",
  "Software Development",
  "Hardware Customization",
  "Training Programs",
  "Technical Support",
  "Other",
];

const urgencyLevels = [
  "Low (1+ months)",
  "Medium (2-4 weeks)",
  "High (1-2 weeks)",
  "Urgent (Within 1 week)",
  "Emergency (Immediate)",
];

const budgetRanges = [
  "Under ₹50,000",
  "₹50,000 - ₹1,00,000",
  "₹1,00,000 - ₹5,00,000",
  "₹5,00,000 - ₹10,00,000",
  "₹10,00,000+",
  "To be discussed",
];

export default function GenForm(): JSX.Element {
  const [form, setForm] = useState<FormData>({
    fullName: "",
    organizationName: "",
    email: "",
    phone: "",
    state: "",
    city: "",
    serviceCategory: "",
    serviceType: "",
    projectDescription: "",
    requirements: "",
    timeline: "",
    budget: "",
    urgency: "",
    additionalInfo: "",
  });

  const [errors, setErrors] = useState<Errors>({});
  const [hasGeneralError, setHasGeneralError] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // CAPTCHA state
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const [isCaptchaVerified, setIsCaptchaVerified] = useState(false);
  const [isCaptchaLoading, setIsCaptchaLoading] = useState(false);
  const captchaRef = useRef<ReCaptchaRef>(null);

  // OTP state
  const [showOTPModal, setShowOTPModal] = useState(false);
  const [isOTPVerified, setIsOTPVerified] = useState(false);
  const [isVerifyingOTP, setIsVerifyingOTP] = useState(false);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ): void => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  // CAPTCHA handlers
  const handleCaptchaVerify = async (token: string | null) => {
    console.log(
      "CAPTCHA verification started:",
      token ? "Token received" : "No token"
    );
    setErrors((prev) => ({ ...prev, captcha: undefined }));

    if (!token) {
      setIsCaptchaVerified(false);
      setCaptchaToken(null);
      return;
    }

    setIsCaptchaLoading(true);

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 15000);

      const response = await fetch("/api/verify-captcha", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ captchaToken: token }),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);
      const data = await response.json();

      if (response.ok && data.success) {
        setIsCaptchaVerified(true);
        setCaptchaToken(token);
        console.log("✅ CAPTCHA verified successfully");
      } else {
        setIsCaptchaVerified(false);
        setCaptchaToken(null);
        setErrors((prev) => ({
          ...prev,
          captcha:
            data.error || "CAPTCHA verification failed. Please try again.",
        }));
        captchaRef.current?.reset();
      }
    } catch (error: any) {
      setIsCaptchaVerified(false);
      setCaptchaToken(null);

      if (error.name === "AbortError") {
        setErrors((prev) => ({
          ...prev,
          captcha: "CAPTCHA verification timed out. Please try again.",
        }));
      } else {
        setErrors((prev) => ({
          ...prev,
          captcha: "CAPTCHA verification error. Please try again.",
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
    setErrors((prev) => ({
      ...prev,
      captcha: "CAPTCHA error occurred. Please refresh and try again.",
    }));
  };

  // OTP handlers
  const handleSendOTP = async (): Promise<boolean> => {
    try {
      const response = await fetch("/api/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: form.email,
          name: form.fullName,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        return true;
      } else {
        setErrors((prev) => ({ ...prev, submit: data.error }));
        return false;
      }
    } catch (error) {
      console.error("Error sending OTP:", error);
      setErrors((prev) => ({
        ...prev,
        submit: "Failed to send OTP. Please try again.",
      }));
      return false;
    }
  };

  const handleVerifyOTP = async (otp: string): Promise<boolean> => {
    setIsVerifyingOTP(true);

    try {
      const response = await fetch("/api/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: form.email, otp }),
      });

      if (response.ok) {
        setIsOTPVerified(true);
        setShowOTPModal(false);
        // Now submit the form
        await submitFormToDatabase();
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
      return false;
    } finally {
      setIsVerifyingOTP(false);
    }
  };

  const submitFormToDatabase = async () => {
    try {
      const response = await fetch("/api/query/services/general", {
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
      alert("General service inquiry submitted successfully!");

      // Reset form and states
      setForm({
        fullName: "",
        organizationName: "",
        email: "",
        phone: "",
        state: "",
        city: "",
        serviceCategory: "",
        serviceType: "",
        projectDescription: "",
        requirements: "",
        timeline: "",
        budget: "",
        urgency: "",
        additionalInfo: "",
      });
      setIsCaptchaVerified(false);
      setCaptchaToken(null);
      setIsOTPVerified(false);
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
    setHasGeneralError(false);
    setErrors({});

    // Send OTP and show modal
    const otpSent = await handleSendOTP();
    if (otpSent) {
      setShowOTPModal(true);
    } else {
      setIsSubmitting(false);
    }
  };

  const today = new Date().toISOString().split("T")[0];

  return (
    <>
      <div className="flex justify-center py-10 px-4">
        <form
          onSubmit={handleSubmit}
          className="space-y-6 max-w-4xl w-full rounded-xl bg-white p-8"
        >
          <h2 className="text-2xl font-bold text-center mb-4">
            General Service Inquiry Form
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
                Organization/Company <span className="text-red-600">*</span>
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
                State <span className="text-red-600">*</span>
              </label>
              <select
                name="state"
                required
                value={form.state}
                onChange={handleChange}
                className="input"
              >
                <option value="">Select State</option>
                {indianStatesAndUTs.map((state) => (
                  <option key={state} value={state}>
                    {state}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-medium mb-1">
                City <span className="text-red-600">*</span>
              </label>
              <input
                name="city"
                required
                type="text"
                value={form.city}
                onChange={handleChange}
                className="input"
                maxLength={MAX_LENGTHS.city}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block font-medium mb-1">
                Service Category <span className="text-red-600">*</span>
              </label>
              <select
                name="serviceCategory"
                required
                value={form.serviceCategory}
                onChange={handleChange}
                className="input"
              >
                <option value="">Select Service Category</option>
                {serviceCategories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-medium mb-1">
                Service Type <span className="text-red-600">*</span>
              </label>
              <select
                name="serviceType"
                required
                value={form.serviceType}
                onChange={handleChange}
                className="input"
              >
                <option value="">Select Service Type</option>
                {serviceTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block font-medium mb-1">
              Project Description <span className="text-red-600">*</span>
            </label>
            <textarea
              name="projectDescription"
              required
              rows={4}
              value={form.projectDescription}
              onChange={handleChange}
              className="input"
              placeholder="Please describe your project, objectives, and what you're looking to achieve..."
              maxLength={MAX_LENGTHS.specifications}
            />
          </div>

          <div>
            <label className="block font-medium mb-1">
              Technical Requirements & Specifications{" "}
              <span className="text-red-600">*</span>
            </label>
            <textarea
              name="requirements"
              required
              rows={4}
              value={form.requirements}
              onChange={handleChange}
              className="input"
              placeholder="Describe technical requirements, specifications, deliverables, quality standards, etc..."
              maxLength={MAX_LENGTHS.specifications}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block font-medium mb-1">
                Project Timeline <span className="text-red-600">*</span>
              </label>
              <input
                name="timeline"
                required
                type="date"
                min={today}
                value={form.timeline}
                onChange={handleChange}
                className="input"
              />
            </div>

            <div>
              <label className="block font-medium mb-1">
                Budget Range <span className="text-red-600">*</span>
              </label>
              <select
                name="budget"
                required
                value={form.budget}
                onChange={handleChange}
                className="input"
              >
                <option value="">Select Budget Range</option>
                {budgetRanges.map((range) => (
                  <option key={range} value={range}>
                    {range}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block font-medium mb-1">
              Project Urgency <span className="text-red-600">*</span>
            </label>
            <select
              name="urgency"
              required
              value={form.urgency}
              onChange={handleChange}
              className="input"
            >
              <option value="">Select Urgency Level</option>
              {urgencyLevels.map((level) => (
                <option key={level} value={level}>
                  {level}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block font-medium mb-1">
              Additional Information
            </label>
            <textarea
              name="additionalInfo"
              rows={4}
              value={form.additionalInfo}
              onChange={handleChange}
              className="input"
              placeholder="Any additional information, special requirements, questions, or specific preferences..."
              maxLength={MAX_LENGTHS.comments}
            />
          </div>

          <input
            type="hidden"
            name="querytype"
            value="service-general-inquiry"
          />

          {/* CAPTCHA Section */}
          <div className="space-y-3">
            <div>
              <label className="block font-medium mb-3">
                Security Verification ( may take a little time to render ){" "}
                <span className="text-red-600">*</span>
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
                <svg
                  className="animate-spin -ml-1 mr-2 h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 714 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Verifying CAPTCHA...
              </div>
            )}

            {isCaptchaVerified && !isCaptchaLoading && (
              <div className="flex items-center justify-center text-green-600 text-sm">
                <svg
                  className="h-4 w-4 mr-2"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                CAPTCHA verified successfully
              </div>
            )}

            {errors.captcha && (
              <p className="text-red-600 text-sm text-center">
                {errors.captcha}
              </p>
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
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 714 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Sending verification email...
                </span>
              ) : (
                "Submit Inquiry"
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

      {/* OTP Modal */}
      <OTPModal
        isOpen={showOTPModal}
        onClose={() => {
          setShowOTPModal(false);
          setIsSubmitting(false);
        }}
        onVerify={handleVerifyOTP}
        email={form.email}
        onResendOTP={handleSendOTP}
        isVerifying={isVerifyingOTP}
      />
    </>
  );
}