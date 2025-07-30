"use client";

import { useState, ChangeEvent, FormEvent, JSX } from "react";
import { colorPalette, validateEmail, validatePhone } from "@/utils/variables";
import { MAX_LENGTHS } from "@/utils/formConstants";

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  flightTime: number | "";
  cameraSetup: string;
  cameraSetupOther: string;
  framePreference: string;
  needGoggles: string;
  customTuning: string;
  comments: string;
}

const cameraSetups = ["HD", "4K", "GoPro Mount", "Other"];
const framePreferences = ["5inch", "6inch", "7inch"];

export default function FourthProdForm(): JSX.Element {
  const [form, setForm] = useState<FormData>({
    fullName: "",
    email: "",
    phone: "",
    flightTime: "",
    cameraSetup: "",
    cameraSetupOther: "",
    framePreference: "",
    needGoggles: "",
    customTuning: "",
    comments: "",
  });
  const [errors, setErrors] = useState<{
    phone?: string;
    email?: string;
    submit?: string;
  }>({});
  const [hasGeneralError, setHasGeneralError] = useState(false);

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
      const response = await fetch("/api/query/products/fourth", {
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
      alert("FPV drone inquiry submitted successfully!");
      // Reset form
      setForm({
        fullName: "",
        email: "",
        phone: "",
        flightTime: "",
        cameraSetup: "",
        cameraSetupOther: "",
        framePreference: "",
        needGoggles: "",
        customTuning: "",
        comments: "",
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

  return (
    <div className="flex justify-center py-10 px-4">
      <form
        onSubmit={handleSubmit}
        className="space-y-6 max-w-4xl w-full rounded-xl bg-white p-8"
      >
        <h2 className="text-2xl font-bold text-center mb-4">
          FPV Drone Inquiry Form
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
              Contact Number <span className="text-red-600">*</span>
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
            Flight Time Requirement (minutes){" "}
            <span className="text-red-600">*</span>
          </label>
          <input
            name="flightTime"
            required
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
            Preferred Camera Setup <span className="text-red-600">*</span>
          </label>
          <select
            name="cameraSetup"
            required
            value={form.cameraSetup}
            onChange={handleChange}
            className="form-input"
          >
            <option value="">Select camera setup</option>
            {cameraSetups.map((setup) => (
              <option key={setup} value={setup}>
                {setup}
              </option>
            ))}
          </select>
          {form.cameraSetup === "Other" && (
            <input
              name="cameraSetupOther"
              type="text"
              placeholder="Please specify..."
              value={form.cameraSetupOther}
              onChange={handleChange}
              className="form-input mt-2"
              maxLength={MAX_LENGTHS.shortText}
            />
          )}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block font-medium mb-1">
              Frame Preference (Size) <span className="text-red-600">*</span>
            </label>
            <select
              name="framePreference"
              required
              value={form.framePreference}
              onChange={handleChange}
              className="form-input"
            >
              <option value="">Select frame size</option>
              {framePreferences.map((frame) => (
                <option key={frame} value={frame}>
                  {frame}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block font-medium mb-1">
              Need for Goggles & Transmitter?{" "}
              <span className="text-red-600">*</span>
            </label>
            <select
              name="needGoggles"
              required
              value={form.needGoggles}
              onChange={handleChange}
              className="form-input"
            >
              <option value="">Select option</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>
        </div>
        <div>
          <label className="block font-medium mb-1">
            Custom Tuning Requirements
          </label>
          <textarea
            name="customTuning"
            rows={3}
            value={form.customTuning}
            onChange={handleChange}
            className="form-input"
            placeholder="Describe any specific tuning requirements..."
            maxLength={MAX_LENGTHS.specifications}
          />
        </div>
        <div>
          <label className="block font-medium mb-1">Comments or Notes</label>
          <textarea
            name="comments"
            rows={4}
            value={form.comments}
            onChange={handleChange}
            className="form-input"
            placeholder="Any additional information or specific requirements..."
            maxLength={MAX_LENGTHS.comments}
          />
        </div>
        <input type="hidden" name="querytype" value="product-fpv-drone" />
        <div className="text-center">
          <button
            type="submit"
            className="bg-[#1ba100] hover:bg-[#104a2f] text-white py-3 px-8 rounded-full transition hover:scale-105"
          >
            Submit Inquiry
          </button>

          {hasGeneralError && (
            <p className="text-red-600 text-center mt-4">
              There was some error in filling the form. Please recheck!
            </p>
          )}
        </div>
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
        `}</style>
      </form>
    </div>
  );
}
