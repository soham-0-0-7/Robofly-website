"use client";

import { useState, ChangeEvent, FormEvent, JSX, useRef } from "react";
import { colorPalette } from "@/utils/variables";
import ReCaptcha, { ReCaptchaRef } from "@/components/common/ReCaptcha";

const indianStatesAndUTs = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttarakhand",
  "Uttar Pradesh",
  "West Bengal",
  "Andaman and Nicobar Islands",
  "Chandigarh",
  "Dadra and Nagar Haveli and Daman and Diu",
  "Delhi",
  "Jammu and Kashmir",
  "Lakshadweep",
  "Puducherry",
  "Ladakh",
];

interface FormData {
  fullName: string;
  organizationName: string;
  email: string;
  phone: string;
  queryType: string;
  querytype: string;
  city: string;
  address: string;
  state: string;
  concerns: string[];
  additionalInfo: string;
}

interface Errors {
  phone?: string;
  email?: string;
  captcha?: string;
  submit?: string;
}

export default function GenForm(): JSX.Element {
  const [form, setForm] = useState<FormData>({
    fullName: "",
    organizationName: "",
    email: "",
    phone: "",
    queryType: "",
    querytype: "general-form",
    city: "",
    address: "",
    state: "",
    concerns: [],
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

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const validateEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validatePhone = (phone: string) =>
    /^(\+\d{1,3}[- ]?)?\d{10}$/.test(phone.trim());

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
      const response = await fetch("/api/verify-captcha", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ captchaToken: token }),
      });

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
          captcha: "CAPTCHA verification failed. Please try again.",
        }));
        console.error("❌ CAPTCHA verification failed:", data.error);
      }
    } catch (error) {
      setIsCaptchaVerified(false);
      setCaptchaToken(null);
      setErrors((prev) => ({
        ...prev,
        captcha: "CAPTCHA verification error. Please try again.",
      }));
      console.error("❌ CAPTCHA verification error:", error);
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

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const newErrors: typeof errors = {};
    let hasError = false;

    // Validate form fields
    if (!validateEmail(form.email)) {
      newErrors.email = "Please enter a valid email address.";
      hasError = true;
    }

    if (!validatePhone(form.phone)) {
      newErrors.phone = "Please enter a valid phone number.";
      hasError = true;
    }

    // Validate CAPTCHA
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
      const response = await fetch("/api/query/general", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...form,
          captchaToken, // Include CAPTCHA token in submission
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setHasGeneralError(true);
        setErrors((prev) => ({ ...prev, submit: data.error }));
        return;
      }

      setHasGeneralError(false);
      setErrors({});
      alert("Form submitted successfully!");

      // Reset form and CAPTCHA
      setForm({
        fullName: "",
        organizationName: "",
        email: "",
        phone: "",
        querytype: "general-form",
        queryType: "",
        city: "",
        address: "",
        state: "",
        concerns: [],
        additionalInfo: "",
      });

      // Reset CAPTCHA
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
        {/* Your existing form fields remain the same */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block font-medium mb-1">
              Full Name <span className="text-red-600">*</span>
            </label>
            <input
              maxLength={50}
              suppressHydrationWarning
              name="fullName"
              required
              value={form.fullName}
              onChange={handleChange}
              className="input"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Organization Name</label>
            <input
              suppressHydrationWarning
              name="organizationName"
              value={form.organizationName}
              onChange={handleChange}
              className="input"
              maxLength={100}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block font-medium mb-1">
              Email <span className="text-red-600">*</span>
            </label>
            <input
              suppressHydrationWarning
              name="email"
              required
              type="email"
              value={form.email}
              onChange={handleChange}
              className="input"
              maxLength={100}
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
              suppressHydrationWarning
              name="phone"
              required
              value={form.phone}
              onChange={handleChange}
              className="input"
              maxLength={50}
            />
            {errors.phone && (
              <p className="text-red-600 text-sm mt-1">{errors.phone}</p>
            )}
          </div>
        </div>

        <div>
          <label className="block font-medium mb-1">
            Type of Query <span className="text-red-600">*</span>
          </label>
          <textarea
            name="queryType"
            required
            rows={3}
            value={form.queryType}
            onChange={handleChange}
            className="input"
            placeholder="Please describe your query in detail..."
            maxLength={200}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block font-medium mb-1">
              City / Town / Village <span className="text-red-600">*</span>
            </label>
            <input
              suppressHydrationWarning
              name="city"
              required
              value={form.city}
              onChange={handleChange}
              className="input"
              maxLength={80}
            />
          </div>

          <div>
            <label className="block font-medium mb-1">
              State <span className="text-red-600">*</span>
            </label>
            <select
              suppressHydrationWarning
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
        </div>

        <div>
          <label className="block font-medium mb-1">
            Address <span className="text-red-600">*</span>
          </label>
          <textarea
            name="address"
            required
            rows={3}
            value={form.address}
            onChange={handleChange}
            className="input"
            maxLength={200}
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Additional Info</label>
          <textarea
            name="additionalInfo"
            rows={4}
            value={form.additionalInfo}
            onChange={handleChange}
            className="input"
            maxLength={200}
            placeholder="Please provide any additional information or specific requirements... (maximum 200 characters)"
          />
        </div>

        <input type="hidden" name="querytype" value="general-form" />

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

          {/* CAPTCHA Status */}
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
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
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
            <p className="text-red-600 text-sm text-center">{errors.captcha}</p>
          )}
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <button
            suppressHydrationWarning
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
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
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

        <style>{`
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
