"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import { colorPalette, validateEmail, validatePhone } from "@/utils/variables";
import { MAX_LENGTHS } from "@/utils/formConstants";
import { indianStatesAndUTs } from "@/utils/variables";

const ANALYSIS_OPTIONS = [
  "NDVI",
  "CVI",
  "Crop Yield",
  "Crop Mortality",
  "Crop Height",
  "Crop Type",
  "Other",
];

export default function AgriDroneForm() {
  const [form, setForm] = useState({
    fullName: "",
    organizationName: "",
    email: "",
    phone: "",
    cropType: "",
    areaSize: "",
    state: "",
    city: "",
    address: "",
    analysisTypes: [] as string[],
    analysisOther: "",
    frequency: "",
    specificIssues: "",
    previousUsage: "",
    customParameters: "",
    expectedStartDate: "",
    additionalNotes: "",
  });
  const [errors, setErrors] = useState<{
    phone?: string;
    email?: string;
    submit?: string;
  }>({});
  const [hasGeneralError, setHasGeneralError] = useState(false);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleCheckboxChange = (value: string) => {
    setForm((prev) => {
      const current = prev.analysisTypes;
      return current.includes(value)
        ? { ...prev, analysisTypes: current.filter((v) => v !== value) }
        : { ...prev, analysisTypes: [...current, value] };
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
      const response = await fetch("/api/query/services/first", {
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
      alert("Agricultural analysis inquiry submitted successfully!");
      // Reset form
      setForm({
        fullName: "",
        organizationName: "",
        email: "",
        phone: "",
        cropType: "",
        areaSize: "",
        state: "",
        city: "",
        address: "",
        analysisTypes: [],
        analysisOther: "",
        frequency: "",
        specificIssues: "",
        previousUsage: "",
        customParameters: "",
        expectedStartDate: "",
        additionalNotes: "",
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
          Drone-Based Agriculture Analysis Form
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
              Organization/Farm Name <span className="text-red-600">*</span>
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
              type="email"
              required
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
              Crop Type <span className="text-red-600">*</span>
            </label>
            <input
              name="cropType"
              required
              type="text"
              value={form.cropType}
              onChange={handleChange}
              className="input"
              maxLength={MAX_LENGTHS.shortText}
            />
          </div>

          <div>
            <label className="block font-medium mb-1">
              Total Farm Area (in hectares){" "}
              <span className="text-red-600">*</span>
            </label>
            <input
              name="areaSize"
              type="number"
              required
              min="0"
              step="0.01"
              value={form.areaSize}
              onChange={handleChange}
              className="input"
              maxLength={MAX_LENGTHS.numbers}
            />
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
            maxLength={MAX_LENGTHS.address}
          />
        </div>

        <div>
          <label className="block font-medium mb-1">
            Desired Analysis <span className="text-red-600">*</span>
          </label>
          <div className="grid grid-cols-2 gap-2">
            {ANALYSIS_OPTIONS.map((opt) => (
              <label key={opt} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={form.analysisTypes.includes(opt)}
                  onChange={() => handleCheckboxChange(opt)}
                  className="form-checkbox"
                />
                {opt}
              </label>
            ))}
          </div>
          {form.analysisTypes.includes("Other") && (
            <input
              name="analysisOther"
              className="input mt-2"
              placeholder="Please specify..."
              value={form.analysisOther}
              onChange={handleChange}
              maxLength={MAX_LENGTHS.shortText}
            />
          )}
        </div>

        <div>
          <label className="block font-medium mb-1">
            Frequency of Analysis <span className="text-red-600">*</span>
          </label>
          <select
            name="frequency"
            required
            value={form.frequency}
            onChange={handleChange}
            className="input"
          >
            <option value="">Select frequency</option>
            <option value="One-time">One-time</option>
            <option value="Monthly">Monthly</option>
            <option value="Seasonal">Seasonal</option>
          </select>
        </div>

        <div>
          <label className="block font-medium mb-1">
            Specific Issues Observed
          </label>
          <textarea
            name="specificIssues"
            rows={3}
            value={form.specificIssues}
            onChange={handleChange}
            className="input"
            maxLength={MAX_LENGTHS.comments}
          />
        </div>

        <div>
          <label className="block font-medium mb-1">
            Previous Use of Drone/Remote Sensing?{" "}
            <span className="text-red-600">*</span>
          </label>
          <select
            name="previousUsage"
            required
            value={form.previousUsage}
            onChange={handleChange}
            className="input"
          >
            <option value="">Select</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </div>

        <div>
          <label className="block font-medium mb-1">
            Custom Parameters Required?
          </label>
          <textarea
            name="customParameters"
            rows={3}
            value={form.customParameters}
            onChange={handleChange}
            className="input"
            maxLength={MAX_LENGTHS.specifications}
          />
        </div>

        <div>
          <label className="block font-medium mb-1">
            Expected Start Date <span className="text-red-600">*</span>
          </label>
          <input
            name="expectedStartDate"
            type="date"
            min={today}
            required
            value={form.expectedStartDate}
            onChange={handleChange}
            className="input"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Additional Notes</label>
          <textarea
            name="additionalNotes"
            rows={3}
            value={form.additionalNotes}
            onChange={handleChange}
            className="input"
            maxLength={MAX_LENGTHS.comments}
          />
        </div>

        <input
          type="hidden"
          name="querytype"
          value="service-agricultural-analysis"
        />

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
        {/* Add this inside the form, before the style jsx block */}
        {errors.submit && (
          <p className="text-red-600 text-center mt-4">{errors.submit}</p>
        )}

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
          .form-checkbox {
            margin-right: 0.5rem;
          }
        `}</style>
      </form>
    </div>
  );
}
