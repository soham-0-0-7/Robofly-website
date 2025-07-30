"use client";

import { useState, ChangeEvent, FormEvent, JSX } from "react";
import { colorPalette, validateEmail, validatePhone } from "@/utils/variables";
import { MAX_LENGTHS } from "@/utils/formConstants";

interface FormData {
  fullName: string;
  organizationName: string;
  email: string;
  phone: string;
  regionName: string;
  affectedArea: string;
  analysisRequired: string;
  preferredSensor: string;
  previousSurveys: string;
  customParameters: string;
  desiredTimeline: string;
  notes: string;
}

export default function SixthServiceForm(): JSX.Element {
  const [form, setForm] = useState<FormData>({
    fullName: "",
    organizationName: "",
    email: "",
    phone: "",
    regionName: "",
    affectedArea: "",
    analysisRequired: "",
    preferredSensor: "",
    previousSurveys: "",
    customParameters: "",
    desiredTimeline: "",
    notes: "",
  });
  // Update the errors state to include submit error
  const [errors, setErrors] = useState<{
    phone?: string;
    email?: string;
    submit?: string;
  }>({});

  const [hasGeneralError, setHasGeneralError] = useState(false);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ): void => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  // Replace the existing handleSubmit function
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
      const response = await fetch("/api/query/services/sixth", {
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
      alert("Post-fire analysis inquiry submitted successfully!");
      // Reset form
      setForm({
        fullName: "",
        organizationName: "",
        email: "",
        phone: "",
        regionName: "",
        affectedArea: "",
        analysisRequired: "",
        preferredSensor: "",
        previousSurveys: "",
        customParameters: "",
        desiredTimeline: "",
        notes: "",
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
          Post-Fire Biodiversity & Impact Analysis Inquiry Form
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
              Organization/Department Name{" "}
              <span className="text-red-600">*</span>
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
              Region or Forest Name <span className="text-red-600">*</span>
            </label>
            <input
              name="regionName"
              required
              type="text"
              value={form.regionName}
              onChange={handleChange}
              className="input"
              maxLength={MAX_LENGTHS.name}
            />
          </div>

          <div>
            <label className="block font-medium mb-1">
              Affected Forest / Region Area (sq. km){" "}
              <span className="text-red-600">*</span>
            </label>
            <input
              name="affectedArea"
              required
              type="number"
              min="0"
              step="0.01"
              value={form.affectedArea}
              onChange={handleChange}
              className="input"
              maxLength={MAX_LENGTHS.numbers}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block font-medium mb-1">
              Analysis Required <span className="text-red-600">*</span>
            </label>
            <select
              name="analysisRequired"
              required
              value={form.analysisRequired}
              onChange={handleChange}
              className="input"
            >
              <option value="">Select Analysis Type</option>
              <option value="Species Loss">Species Loss</option>
              <option value="Burn Severity">Burn Severity</option>
              <option value="Recovery Monitoring">Recovery Monitoring</option>
              <option value="All">All</option>
            </select>
          </div>

          <div>
            <label className="block font-medium mb-1">
              Preferred Sensor <span className="text-red-600">*</span>
            </label>
            <select
              name="preferredSensor"
              required
              value={form.preferredSensor}
              onChange={handleChange}
              className="input"
            >
              <option value="">Select Sensor Type</option>
              <option value="RGB">RGB</option>
              <option value="Multispectral">Multispectral</option>
              <option value="Thermal">Thermal</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block font-medium mb-1">
            Previous Surveys Conducted? <span className="text-red-600">*</span>
          </label>
          <select
            name="previousSurveys"
            required
            value={form.previousSurveys}
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
            Custom Parameters to Monitor
          </label>
          <textarea
            name="customParameters"
            rows={4}
            value={form.customParameters}
            onChange={handleChange}
            className="input"
            placeholder="Please specify any custom parameters you would like to monitor..."
            maxLength={MAX_LENGTHS.specifications}
          />
        </div>

        <div>
          <label className="block font-medium mb-1">
            Desired Timeline <span className="text-red-600">*</span>
          </label>
          <input
            name="desiredTimeline"
            required
            type="date"
            min={new Date().toISOString().split("T")[0]}
            value={form.desiredTimeline}
            onChange={handleChange}
            className="input"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Notes</label>
          <textarea
            name="notes"
            rows={4}
            value={form.notes}
            onChange={handleChange}
            className="input"
            placeholder="Please provide any additional information or special requirements..."
            maxLength={MAX_LENGTHS.comments}
          />
        </div>

        <input
          type="hidden"
          name="querytype"
          value="service-post-ForestFire-analysis"
        />

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
