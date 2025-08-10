"use client";
// Surveillance Drone
import { useState, ChangeEvent, FormEvent, JSX, useRef } from "react";
import { colorPalette, validateEmail, validatePhone } from "@/utils/variables";
import { MAX_LENGTHS } from "@/utils/formConstants";
import ReCaptcha, { ReCaptchaRef } from "@/components/common/ReCaptcha";
import OTPModal from "@/components/common/OTPModal";

interface FormData {
  fullName: string;
  organizationName: string;
  email: string;
  phone: string;
  surveillanceType: string;
  surveillanceTypeOther: string;
  flightTime: number | "";
  cameraType: string;
  cameraTypeOther: string;
  transmissionRange: number | "";
  useFrequency: string;
  operatingEnvironment: string;
  regulatoryPermissions: string;
  specialRequirements: string;
}

interface Errors {
  phone?: string;
  email?: string;
  captcha?: string;
  submit?: string;
}

const surveillanceTypes = [
  "Perimeter monitoring",
  "Infrastructure surveillance",
  "Crowd monitoring",
  "Other",
];

const cameraTypes = [
  "Thermal",
  "Optical",
  "Night Vision",
  "Zoom",
  "Multispectral",
  "Other",
];

const useFrequencies = ["Daily", "Weekly", "Emergency Only"];
const operatingEnvironments = ["Urban", "Forest", "Coastal", "Desert"];

export default function SecondProdForm(): JSX.Element {
  const [form, setForm] = useState<FormData>({
    fullName: "",
    organizationName: "",
    email: "",
    phone: "",
    surveillanceType: "",
    surveillanceTypeOther: "",
    flightTime: "",
    cameraType: "",
    cameraTypeOther: "",
    transmissionRange: "",
    useFrequency: "",
    operatingEnvironment: "",
    regulatoryPermissions: "",
    specialRequirements: "",
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
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isOTPVerified, setIsOTPVerified] = useState(false);
  const [isVerifyingOTP, setIsVerifyingOTP] = useState(false);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ): void => {
    const { name, value, type } = e.target;
    if (type === "number") {
      setForm((prev) => ({
        ...prev,
        [name]: value === "" ? "" : Number(value),
      }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
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
      const response = await fetch("/api/query/products/second", {
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
      alert("Surveillance drone inquiry submitted successfully!");

      // Reset form and states
      setForm({
        fullName: "",
        organizationName: "",
        email: "",
        phone: "",
        surveillanceType: "",
        surveillanceTypeOther: "",
        flightTime: "",
        cameraType: "",
        cameraTypeOther: "",
        transmissionRange: "",
        useFrequency: "",
        operatingEnvironment: "",
        regulatoryPermissions: "",
        specialRequirements: "",
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

  return (
    <>
      <div className="flex justify-center py-10 px-4">
        <form
          onSubmit={handleSubmit}
          className="space-y-6 max-w-4xl w-full rounded-xl bg-white p-8"
        >
          <h2 className="text-2xl font-bold text-center mb-4">
            Surveillance Drone Inquiry Form
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
                className="form-input"
                maxLength={MAX_LENGTHS.name}
              />
            </div>

            <div>
              <label className="block font-medium mb-1">
                Company/Organization <span className="text-red-600">*</span>
              </label>
              <input
                name="organizationName"
                required
                type="text"
                value={form.organizationName}
                onChange={handleChange}
                className="form-input"
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
                className="form-input"
                maxLength={MAX_LENGTHS.email}
              />
              {errors.email && (
                <p className="text-red-600 text-sm mt-1">{errors.email}</p>
              )}
            </div>

            <div>
              <label className="block font-medium mb-1">
                Phone Number <span className="text-red-600">*</span>
              </label>
              <input
                name="phone"
                required
                type="text"
                value={form.phone}
                onChange={handleChange}
                className="form-input"
                maxLength={MAX_LENGTHS.phone}
              />
              {errors.phone && (
                <p className="text-red-600 text-sm mt-1">{errors.phone}</p>
              )}
            </div>
          </div>

          <div>
            <label className="block font-medium mb-1">
              Type of Surveillance
            </label>
            <select
              name="surveillanceType"
              value={form.surveillanceType}
              onChange={handleChange}
              className="form-input"
              required
            >
              <option value="">Select surveillance type</option>
              {surveillanceTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
            {form.surveillanceType === "Other" && (
              <input
                name="surveillanceTypeOther"
                type="text"
                placeholder="Please specify..."
                value={form.surveillanceTypeOther}
                onChange={handleChange}
                className="form-input mt-2"
                maxLength={MAX_LENGTHS.shortText}
              />
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block font-medium mb-1">
                Required Flight Time (minutes)
              </label>
              <input
                required
                name="flightTime"
                type="number"
                min="0"
                value={form.flightTime}
                onChange={handleChange}
                className="form-input"
                maxLength={MAX_LENGTHS.numbers}
              />
            </div>

            <div>
              <label className="block font-medium mb-1">
                Required Transmission Range (metres)
              </label>
              <input
                required
                name="transmissionRange"
                type="number"
                min="0"
                value={form.transmissionRange}
                onChange={handleChange}
                className="form-input"
                maxLength={MAX_LENGTHS.numbers}
              />
            </div>
          </div>

          <div>
            <label className="block font-medium mb-1">
              Preferred Camera Type
            </label>
            <select
              name="cameraType"
              required
              value={form.cameraType}
              onChange={handleChange}
              className="form-input"
            >
              <option value="">Select camera type</option>
              {cameraTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
            {form.cameraType === "Other" && (
              <input
                name="cameraTypeOther"
                type="text"
                placeholder="Please specify..."
                value={form.cameraTypeOther}
                onChange={handleChange}
                className="form-input mt-2"
                maxLength={MAX_LENGTHS.shortText}
              />
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block font-medium mb-1">
                Expected Use Frequency <span className="text-red-600">*</span>
              </label>
              <select
                name="useFrequency"
                required
                value={form.useFrequency}
                onChange={handleChange}
                className="form-input"
              >
                <option value="">Select frequency</option>
                {useFrequencies.map((freq) => (
                  <option key={freq} value={freq}>
                    {freq}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-medium mb-1">
                Operating Environment <span className="text-red-600">*</span>
              </label>
              <select
                name="operatingEnvironment"
                required
                value={form.operatingEnvironment}
                onChange={handleChange}
                className="form-input"
              >
                <option value="">Select environment</option>
                {operatingEnvironments.map((env) => (
                  <option key={env} value={env}>
                    {env}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block font-medium mb-1">
              Any Regulatory Permissions Already Acquired?{" "}
              <span className="text-red-600">*</span>
            </label>
            <select
              name="regulatoryPermissions"
              required
              value={form.regulatoryPermissions}
              onChange={handleChange}
              className="form-input"
            >
              <option value="">Select option</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>

          <div>
            <label className="block font-medium mb-1">
              Special Requirements
            </label>
            <textarea
              name="specialRequirements"
              rows={4}
              value={form.specialRequirements}
              onChange={handleChange}
              className="form-input"
              maxLength={MAX_LENGTHS.specifications}
            />
          </div>

          <input
            type="hidden"
            name="querytype"
            value="product-surveillance-drone"
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
            .form-input {
              padding: 0.75rem;
              border: 1px solid #ccc;
              border-radius: 0.5rem;
              width: 100%;
              background: ${colorPalette.whiteMint};
              transition: box-shadow 0.3s ease;
            }
            .form-input:focus {
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
