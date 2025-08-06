"use client";

import { useState, ChangeEvent, FormEvent, JSX, useRef } from "react";
import { colorPalette } from "@/utils/variables";
import ReCaptcha, { ReCaptchaRef } from "@/components/common/ReCaptcha";

interface FormData {
  firstName: string;
  lastName: string;
  gender: string;
  phone: string;
  email: string;
  city: string;
  state: string;
  linkedin: string;
  hearAbout: string;
  experience: string;
  education: string;
  workplace: string;
  interest: string;
  message: string;
  relocate: string;
  availability: string;
  currentSalary: string;
  expectedSalary: string;
  resume: string | null;
  portfolio: string | null;
}

interface Errors {
  phone?: string;
  email?: string;
  captcha?: string;
  submit?: string;
}

type FieldConfig = [keyof FormData, string];

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
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
  "Andaman and Nicobar Islands",
  "Chandigarh",
  "Dadra and Nagar Haveli and Daman and Diu",
  "Delhi",
  "Jammu and Kashmir",
  "Ladakh",
  "Lakshadweep",
  "Puducherry",
];

export default function CareerForm(): JSX.Element {
  const [form, setForm] = useState<FormData>({
    firstName: "",
    lastName: "",
    gender: "",
    phone: "",
    email: "",
    city: "",
    state: "",
    linkedin: "",
    hearAbout: "",
    experience: "",
    education: "",
    workplace: "",
    interest: "",
    message: "",
    relocate: "",
    availability: "",
    currentSalary: "",
    expectedSalary: "",
    resume: null,
    portfolio: null,
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

  const validateEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validatePhone = (phone: string) =>
    /^(?:\+91|0091)?[6-9]\d{9}$/.test(phone.trim());

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
      // Create AbortController for timeout
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 15000); // 15 second timeout

      const response = await fetch("/api/verify-captcha", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
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
        console.error("❌ CAPTCHA verification failed:", data.error);

        // Reset CAPTCHA on failure
        captchaRef.current?.reset();
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
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

      console.error("❌ CAPTCHA verification error:", error);

      // Reset CAPTCHA on error
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
      newErrors.phone = "Please enter a valid 10-digit phone number.";
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
      const response = await fetch("/api/query/career", {
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
      alert("Application submitted successfully!");

      // Reset form
      setForm({
        firstName: "",
        lastName: "",
        gender: "",
        phone: "",
        email: "",
        city: "",
        state: "",
        linkedin: "",
        hearAbout: "",
        experience: "",
        education: "",
        workplace: "",
        interest: "",
        message: "",
        relocate: "",
        availability: "",
        currentSalary: "",
        expectedSalary: "",
        resume: null,
        portfolio: null,
      });

      // Reset CAPTCHA
      setIsCaptchaVerified(false);
      setCaptchaToken(null);
      captchaRef.current?.reset();
    } catch (error) {
      console.log(error);
      setHasGeneralError(true);
      setErrors((prev) => ({
        ...prev,
        submit: "Error submitting form. Please try again.",
      }));
    } finally {
      setIsSubmitting(false);
    }
  };

  const basicFields: FieldConfig[] = [
    ["firstName", "First Name"],
    ["lastName", "Last Name"],
    ["gender", "Gender"],
    ["phone", "Phone No."],
    ["email", "Email ID"],
    ["city", "City/Town/Village"],
    ["state", "State / UT"],
    ["linkedin", "LinkedIn Profile URL"],
    ["hearAbout", "How did you hear about this Job Opening?"],
    ["experience", "Experience (in years)"],
    ["education", "Educational Qualification"],
    ["workplace", "Current/Previous Place of Work"],
    ["interest", "Why are you interested in this role?"],
  ];

  const additionalFields: FieldConfig[] = [
    ["relocate", "Are you willing to relocate?"],
    ["availability", "Availability to join the new role (in months)"],
    ["currentSalary", "Current Salary (INR)"],
    ["expectedSalary", "Expected Salary"],
  ];

  return (
    <div className="flex justify-center py-10 px-4">
      <form
        onSubmit={handleSubmit}
        className="space-y-6 max-w-3xl w-full rounded-xl bg-white p-8"
      >
        {/* Basic Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {basicFields.map(([key, label]) => (
            <div
              key={key}
              className={key === "interest" ? "md:col-span-2" : ""}
            >
              <label className="block font-medium mb-1">
                {label}{" "}
                {key !== "workplace" && key !== "interest" && (
                  <span className="text-red-600">*</span>
                )}
              </label>
              {key === "gender" ? (
                <select
                  name={key}
                  required
                  value={form[key] as string}
                  onChange={handleChange}
                  className="input"
                >
                  <option value="">Select</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              ) : key === "state" ? (
                <select
                  name={key}
                  required
                  value={form[key] as string}
                  onChange={handleChange}
                  className="input"
                >
                  <option value="">Select State / UT</option>
                  {indianStatesAndUTs.map((state) => (
                    <option key={state} value={state}>
                      {state}
                    </option>
                  ))}
                </select>
              ) : key === "hearAbout" ? (
                <select
                  name={key}
                  required
                  value={form[key] as string}
                  onChange={handleChange}
                  className="input"
                >
                  <option value="">Select</option>
                  <option value="LinkedIn">LinkedIn</option>
                  <option value="Company Website">Company Website</option>
                  <option value="Friend/Colleague">Friend/Colleague</option>
                  <option value="Job Portal">Job Portal</option>
                  <option value="Other">Other</option>
                </select>
              ) : key === "experience" ? (
                <input
                  name={key}
                  required
                  type="number"
                  min="0"
                  step="1"
                  value={form[key] as string}
                  onChange={handleChange}
                  className="input"
                  maxLength={2}
                />
              ) : key === "email" ? (
                <>
                  <input
                    name={key}
                    required
                    type="email"
                    value={form[key] as string}
                    onChange={handleChange}
                    className="input"
                    maxLength={100}
                  />
                  {errors.email && (
                    <p className="text-red-600 text-sm mt-1">{errors.email}</p>
                  )}
                </>
              ) : key === "phone" ? (
                <>
                  <input
                    name={key}
                    required
                    type="text"
                    value={form[key] as string}
                    onChange={handleChange}
                    className="input"
                    maxLength={15}
                  />
                  {errors.phone && (
                    <p className="text-red-600 text-sm mt-1">{errors.phone}</p>
                  )}
                </>
              ) : key === "interest" ? (
                <textarea
                  name={key}
                  rows={4}
                  value={form[key] as string}
                  onChange={handleChange}
                  className="input"
                  placeholder="Why are you interested in this role?"
                  maxLength={200}
                />
              ) : (
                <input
                  name={key}
                  required={key !== "workplace"}
                  type={key === "linkedin" ? "url" : "text"}
                  value={form[key] as string}
                  onChange={handleChange}
                  className="input"
                  maxLength={
                    key === "firstName" || key === "lastName"
                      ? 50
                      : key === "city"
                      ? 80
                      : key === "linkedin"
                      ? 120
                      : key === "education"
                      ? 100
                      : key === "workplace"
                      ? 100
                      : 100
                  }
                />
              )}
            </div>
          ))}
        </div>

        {/* Message */}
        <div>
          <label className="block font-medium mb-1">Your Message/Query</label>
          <textarea
            name="message"
            rows={4}
            value={form.message}
            onChange={handleChange}
            className="input"
            maxLength={200}
          />
        </div>

        {/* Resume and Portfolio as URL */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block font-medium mb-1">
              Resume/CV (Drive link) <span className="text-red-600">*</span>
            </label>
            <input
              type="url"
              name="resume"
              required
              placeholder="make your file in drive public"
              value={form.resume || ""}
              onChange={handleChange}
              className="input"
              maxLength={2100}
            />
          </div>
          <div>
            <label className="block font-medium mb-1">
              Upload Portfolio (link, optional)
            </label>
            <input
              type="url"
              name="portfolio"
              placeholder="make your file in drive public"
              value={form.portfolio || ""}
              onChange={handleChange}
              className="input"
              maxLength={2100}
            />
          </div>
        </div>

        {/* Additional Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {additionalFields.map(([key, label]) => (
            <div key={key}>
              <label className="block font-medium mb-1">
                {label}{" "}
                {key !== "currentSalary" && (
                  <span className="text-red-600">*</span>
                )}
              </label>
              {key === "relocate" ? (
                <select
                  name={key}
                  required
                  value={form[key] as string}
                  onChange={handleChange}
                  className="input"
                >
                  <option value="">Select</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
              ) : (
                <input
                  name={key}
                  required={key !== "currentSalary"}
                  type="number"
                  min="0"
                  step="1"
                  value={form[key] as string}
                  onChange={handleChange}
                  className="input"
                  maxLength={10}
                />
              )}
            </div>
          ))}
        </div>

        <input type="hidden" name="querytype" value="join-our-team" />

        {/* CAPTCHA Section */}
        <div className="space-y-3">
          <div>
            <label className="block font-medium mb-3">
              Security Verification ( may take a little time to render )
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

        {/* Styles */}
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
