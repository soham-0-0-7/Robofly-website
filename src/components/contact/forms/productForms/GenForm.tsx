/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useState, ChangeEvent, FormEvent, JSX } from "react";
import {
  colorPalette,
  indianStatesAndUTs,
  validateEmail,
  validatePhone,
} from "@/utils/variables";
import { MAX_LENGTHS } from "@/utils/formConstants";
import ReCaptcha, { ReCaptchaRef } from "@/components/common/ReCaptcha";
import { useRef } from "react"; // Add to existing imports
interface Errors {
  phone?: string;
  email?: string;
  captcha?: string; // Add this
  submit?: string;
}
interface FormData {
  fullName: string;
  organizationName: string;
  email: string;
  phone: string;
  droneApplication: string[];
  droneApplicationOther: string;
  payloadRequirements: string;
  flightTime: number | "";
  payloadWeight: number | "";
  desiredRange: number | "";
  specialFeatures: string[];
  specialFeaturesOther: string;
  state: string;
  city: string;
  address: string;
  deliveryTimeline: string;
  budgetRange: number | "";
  droneQuantity: number | "";
  additionalRequirements: string;
}

const droneApplications = [
  "Agriculture",
  "Surveillance/Security",
  "Mapping & Surveying",
  "Logistics/Delivery",
  "Inspection (Industrial/Infrastructure)",
  "Training/Education",
  "Forestry/Wildfire Monitoring",
  "Defense/FPV Racing",
  "Other",
];

const specialFeaturesList = [
  "GPS Tracking",
  "Thermal Camera",
  "Obstacle Avoidance",
  "Autonomous Flight",
  "Night Vision",
  "AI-based Analytics",
  "Other",
];

export default function GenForm(): JSX.Element {
  const [form, setForm] = useState<FormData>({
    fullName: "",
    organizationName: "",
    email: "",
    phone: "",
    droneApplication: [],
    droneApplicationOther: "",
    payloadRequirements: "",
    flightTime: "",
    payloadWeight: "",
    desiredRange: "",
    specialFeatures: [],
    specialFeaturesOther: "",
    state: "",
    city: "",
    address: "",
    deliveryTimeline: "",
    budgetRange: "",
    droneQuantity: "",
    additionalRequirements: "",
  });
  const [errors, setErrors] = useState<{
    phone?: string;
    email?: string;
    submit?: string;
  }>({});
  const [hasGeneralError, setHasGeneralError] = useState(false);
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

  const handleCheckboxChange = (
    field: "droneApplication" | "specialFeatures",
    value: string
  ) => {
    setForm((prev) => {
      const currentArray = prev[field];
      const isChecked = currentArray.includes(value);

      if (isChecked) {
        return {
          ...prev,
          [field]: currentArray.filter((item) => item !== value),
        };
      } else {
        return { ...prev, [field]: [...currentArray, value] };
      }
    });
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

    if (hasError) {
      setErrors(newErrors);
      setHasGeneralError(true);
      return;
    }

    try {
      const response = await fetch("/api/query/products/gen", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (!response.ok) {
        setHasGeneralError(true);
        setErrors((prev) => ({ ...prev, submit: data.error }));
        return;
      }

      setHasGeneralError(false);
      setErrors({});
      alert("Product inquiry submitted successfully!");
      // Reset form
      setForm({
        fullName: "",
        organizationName: "",
        email: "",
        phone: "",
        droneApplication: [],
        droneApplicationOther: "",
        payloadRequirements: "",
        flightTime: "",
        payloadWeight: "",
        desiredRange: "",
        specialFeatures: [],
        specialFeaturesOther: "",
        state: "",
        city: "",
        address: "",
        deliveryTimeline: "",
        budgetRange: "",
        droneQuantity: "",
        additionalRequirements: "",
      });
    } catch (error) {
      console.error("Form submission error:", error);
      setHasGeneralError(true);
      setErrors((prev) => ({
        ...prev,
        submit: "Error submitting form. Please try again.",
      }));
    }
  };
  const today = new Date().toISOString().split("T")[0];

  return (
    <div className="flex justify-center py-10 px-4">
      <form
        onSubmit={handleSubmit}
        className="space-y-6 max-w-4xl w-full rounded-xl bg-white p-8"
      >
        <h2 className="text-2xl font-bold text-center mb-4">
          General Product Form
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
              Company/Organization Name
            </label>
            <input
              name="organizationName"
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
              Email Address <span className="text-red-600">*</span>
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
          <label className="block font-medium mb-2">
            Application of Drone (Select all that apply){" "}
            <span className="text-red-600">*</span>
          </label>
          <div className="grid grid-cols-2 gap-2">
            {droneApplications.map((app) => (
              <label key={app} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={form.droneApplication.includes(app)}
                  onChange={() => handleCheckboxChange("droneApplication", app)}
                  className="form-checkbox"
                />
                <span>{app}</span>
              </label>
            ))}
          </div>
          {form.droneApplication.includes("Other") && (
            <input
              name="droneApplicationOther"
              type="text"
              placeholder="Please specify..."
              value={form.droneApplicationOther}
              onChange={handleChange}
              className="form-input mt-2"
              maxLength={MAX_LENGTHS.shortText}
            />
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block font-medium mb-1">
              Required Flight Time (minutes)
            </label>
            <input
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
              Estimated Payload Weight (kg)
            </label>
            <input
              name="payloadWeight"
              type="number"
              min="0"
              step="0.1"
              value={form.payloadWeight}
              onChange={handleChange}
              className="form-input"
              maxLength={MAX_LENGTHS.numbers}
            />
          </div>

          <div>
            <label className="block font-medium mb-1">
              Desired Range (metres)
            </label>
            <input
              name="desiredRange"
              type="number"
              min="0"
              value={form.desiredRange}
              onChange={handleChange}
              className="form-input"
              maxLength={MAX_LENGTHS.numbers}
            />
          </div>
        </div>

        <div>
          <label className="block font-medium mb-1">Payload Requirements</label>
          <textarea
            name="payloadRequirements"
            rows={3}
            value={form.payloadRequirements}
            onChange={handleChange}
            className="form-input"
            placeholder="Camera, Sprayer, Sensors, etc..."
            maxLength={MAX_LENGTHS.specifications}
          />
        </div>

        <div>
          <label className="block font-medium mb-2">
            Any Special Features Required?{" "}
            <span className="text-red-600">*</span>
          </label>
          <div className="grid grid-cols-2 gap-2">
            {specialFeaturesList.map((feature) => (
              <label key={feature} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={form.specialFeatures.includes(feature)}
                  onChange={() =>
                    handleCheckboxChange("specialFeatures", feature)
                  }
                  className="form-checkbox"
                />
                <span>{feature}</span>
              </label>
            ))}
          </div>
          {form.specialFeatures.includes("Other") && (
            <input
              name="specialFeaturesOther"
              type="text"
              placeholder="Please specify..."
              value={form.specialFeaturesOther}
              onChange={handleChange}
              className="form-input mt-2"
              maxLength={MAX_LENGTHS.shortText}
            />
          )}
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Location of Operation</h3>

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
                className="form-input"
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
                className="form-input"
                maxLength={MAX_LENGTHS.city}
              />
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
              className="form-input"
              maxLength={MAX_LENGTHS.address}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block font-medium mb-1">
              Preferred Timeline <span className="text-red-600">*</span>
            </label>
            <input
              name="deliveryTimeline"
              required
              type="date"
              min={today}
              value={form.deliveryTimeline}
              onChange={handleChange}
              className="form-input"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Budget Range</label>
            <input
              name="budgetRange"
              type="number"
              min="0"
              value={form.budgetRange}
              onChange={handleChange}
              className="form-input"
              maxLength={MAX_LENGTHS.numbers}
            />
          </div>

          <div>
            <label className="block font-medium mb-1">
              Drone Quantity <span className="text-red-600">*</span>
            </label>
            <input
              name="droneQuantity"
              required
              type="number"
              min="1"
              value={form.droneQuantity}
              onChange={handleChange}
              className="form-input"
              maxLength={MAX_LENGTHS.numbers}
            />
          </div>
        </div>

        <div>
          <label className="block font-medium mb-1">
            Additional Requirements or Notes
          </label>
          <textarea
            name="additionalRequirements"
            rows={4}
            value={form.additionalRequirements}
            onChange={handleChange}
            className="form-input"
            maxLength={MAX_LENGTHS.comments}
          />
        </div>

        <input type="hidden" name="querytype" value="product-general-form" />
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

          {/* Same CAPTCHA status indicators as other forms */}
        </div>
        <div className="text-center">
          <button
            type="submit"
            className="bg-[#1ba100] hover:bg-[#104a2f] text-white py-3 px-8 rounded-full transition hover:scale-105"
          >
            Submit Application
          </button>

          {hasGeneralError && (
            <p className="text-red-600 text-center mt-4">
              There was some error in filling the form. Please recheck!
            </p>
          )}
        </div>

        {/* Add this inside the form, before the style jsx block */}
        {errors.submit && (
          <p className="text-red-600 text-center mt-4">{errors.submit}</p>
        )}

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
          .form-checkbox {
            margin-right: 0.5rem;
          }
        `}</style>
      </form>
    </div>
  );
}
