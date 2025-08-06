/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, ChangeEvent, FormEvent, JSX, useRef } from "react";
import { colorPalette, validateEmail, validatePhone } from "@/utils/variables";
import { MAX_LENGTHS } from "@/utils/formConstants";
import ReCaptcha, { ReCaptchaRef } from "@/components/common/ReCaptcha";
// Logistics/Package Dropping Drone
interface FormData {
  fullName: string;
  companyName: string;
  email: string;
  phone: string;
  packageNature: string;
  packageWeight: number | "";
  deliveryDistance: number | "";
  deliveryFrequency: string;
  payloadCapacity: number | "";
  securityRequirements: string;
  gpsTracking: string;
  routeTerrain: string;
  additionalComments: string;
}

interface Errors {
  phone?: string;
  email?: string;
  captcha?: string;
  submit?: string;
}

const packageNatures = ["Medical", "Food", "Heavy materials", "Others"];
const deliveryFrequencies = [
  "Hourly",
  "Daily",
  "Weekly",
  "Monthly",
  "Annually",
];
const routeTerrains = ["Urban", "Rural", "Hilly", "Forest"];

export default function ThirdProdForm(): JSX.Element {
  const [form, setForm] = useState<FormData>({
    fullName: "",
    companyName: "",
    email: "",
    phone: "",
    packageNature: "",
    packageWeight: "",
    deliveryDistance: "",
    deliveryFrequency: "",
    payloadCapacity: "",
    securityRequirements: "",
    gpsTracking: "",
    routeTerrain: "",
    additionalComments: "",
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
      const response = await fetch("/api/query/products/third", {
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
      alert("Logistics/Package dropping drone inquiry submitted successfully!");

      // Reset form and CAPTCHA
      setForm({
        fullName: "",
        companyName: "",
        email: "",
        phone: "",
        packageNature: "",
        packageWeight: "",
        deliveryDistance: "",
        deliveryFrequency: "",
        payloadCapacity: "",
        securityRequirements: "",
        gpsTracking: "",
        routeTerrain: "",
        additionalComments: "",
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
          Logistics/Package Dropping Drone Inquiry Form
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
              Company/Startup Name <span className="text-red-600">*</span>
            </label>
            <input
              name="companyName"
              required
              type="text"
              value={form.companyName}
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
              Phone <span className="text-red-600">*</span>
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block font-medium mb-1">
              Nature of Package <span className="text-red-600">*</span>
            </label>
            <select
              name="packageNature"
              required
              value={form.packageNature}
              onChange={handleChange}
              className="form-input"
            >
              <option value="">Select package nature</option>
              {packageNatures.map((nature) => (
                <option key={nature} value={nature}>
                  {nature}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block font-medium mb-1">
              Weight of Each Package (kg){" "}
              <span className="text-red-600">*</span>
            </label>
            <input
              name="packageWeight"
              required
              type="number"
              min="0"
              step="0.1"
              value={form.packageWeight}
              onChange={handleChange}
              className="form-input"
              maxLength={MAX_LENGTHS.numbers}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block font-medium mb-1">
              Delivery Distance (km) <span className="text-red-600">*</span>
            </label>
            <input
              name="deliveryDistance"
              required
              type="number"
              min="0"
              step="0.1"
              value={form.deliveryDistance}
              onChange={handleChange}
              className="form-input"
              maxLength={MAX_LENGTHS.numbers}
            />
          </div>

          <div>
            <label className="block font-medium mb-1">
              Frequency of Delivery <span className="text-red-600">*</span>
            </label>
            <select
              name="deliveryFrequency"
              required
              value={form.deliveryFrequency}
              onChange={handleChange}
              className="form-input"
            >
              <option value="">Select frequency</option>
              {deliveryFrequencies.map((freq) => (
                <option key={freq} value={freq}>
                  {freq}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="block font-medium mb-1">
            Preferred Payload Capacity <span className="text-red-600">*</span>
          </label>
          <input
            name="payloadCapacity"
            required
            type="number"
            min="0"
            step="0.1"
            value={form.payloadCapacity}
            onChange={handleChange}
            className="form-input"
            maxLength={MAX_LENGTHS.numbers}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block font-medium mb-1">
              Security/Locking Requirements{" "}
              <span className="text-red-600">*</span>
            </label>
            <select
              name="securityRequirements"
              required
              value={form.securityRequirements}
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
              GPS/Tracking Integration <span className="text-red-600">*</span>
            </label>
            <select
              name="gpsTracking"
              required
              value={form.gpsTracking}
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
              Delivery Route Terrain <span className="text-red-600">*</span>
            </label>
            <select
              name="routeTerrain"
              required
              value={form.routeTerrain}
              onChange={handleChange}
              className="form-input"
            >
              <option value="">Select terrain</option>
              {routeTerrains.map((terrain) => (
                <option key={terrain} value={terrain}>
                  {terrain}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="block font-medium mb-1">Additional Comments</label>
          <textarea
            name="additionalComments"
            rows={4}
            value={form.additionalComments}
            onChange={handleChange}
            className="form-input"
            placeholder="Any additional information or specific requirements..."
            maxLength={MAX_LENGTHS.comments}
          />
        </div>

        <input type="hidden" name="querytype" value="product-logistics-drone" />

        {/* CAPTCHA Section */}
        <div className="space-y-3">
          <div>
            <label className="block font-medium mb-3">
              Security Verification  ( may take a little time to render ) <span className="text-red-600">*</span>
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
  );
}
