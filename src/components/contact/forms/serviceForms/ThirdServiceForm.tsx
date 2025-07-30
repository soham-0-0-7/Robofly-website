"use client";

import { useState, ChangeEvent, FormEvent, JSX } from "react";
import { colorPalette, validateEmail, validatePhone } from "@/utils/variables";
import { MAX_LENGTHS } from "@/utils/formConstants";

interface FormData {
  fullName: string;
  organizationName: string;
  email: string;
  phone: string;
  damLocation: string;
  analysisType: string;
  areaCoverage: string;
  timelineFrequency: string;
  documentationNeeded: string;
  additionalInfo: string;
  startDate: string;
}

export default function ThirdServiceForm(): JSX.Element {
  const [form, setForm] = useState<FormData>({
    fullName: "",
    organizationName: "",
    email: "",
    phone: "",
    damLocation: "",
    analysisType: "",
    areaCoverage: "",
    timelineFrequency: "",
    documentationNeeded: "",
    additionalInfo: "",
    startDate: "",
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

  // Update handleSubmit function
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
      const response = await fetch("/api/query/services/third", {
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
      alert("Dam analysis inquiry submitted successfully!");
      // Reset form
      setForm({
        fullName: "",
        organizationName: "",
        email: "",
        phone: "",
        damLocation: "",
        analysisType: "",
        areaCoverage: "",
        timelineFrequency: "",
        documentationNeeded: "",
        additionalInfo: "",
        startDate: "",
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
          Dam Analysis via Drone Surveillance Inquiry Form
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
              Organization Name <span className="text-red-600">*</span>
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

        <div>
          <label className="block font-medium mb-1">
            Name/Location of Dam <span className="text-red-600">*</span>
          </label>
          <textarea
            name="damLocation"
            required
            rows={3}
            value={form.damLocation}
            onChange={handleChange}
            className="input"
            placeholder="Please provide the name and detailed location of the dam..."
            maxLength={MAX_LENGTHS.address}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block font-medium mb-1">
              Type of Analysis Required <span className="text-red-600">*</span>
            </label>
            <select
              name="analysisType"
              required
              value={form.analysisType}
              onChange={handleChange}
              className="input"
            >
              <option value="">Select Analysis Type</option>
              <option value="Structural">Structural Analysis</option>
              <option value="Vegetation">Vegetation Assessment</option>
              <option value="Crack Detection">Crack Detection</option>
              <option value="Water Level">Water Level Monitoring</option>
              <option value="Comprehensive">Comprehensive Analysis</option>
            </select>
          </div>

          <div>
            <label className="block font-medium mb-1">
              Area of Coverage (in sq. km){" "}
              <span className="text-red-600">*</span>
            </label>
            <input
              name="areaCoverage"
              required
              type="number"
              min="0"
              step="0.01"
              value={form.areaCoverage}
              onChange={handleChange}
              className="input"
              maxLength={MAX_LENGTHS.numbers}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block font-medium mb-1">
              Timeline & Frequency <span className="text-red-600">*</span>
            </label>
            <select
              name="timelineFrequency"
              required
              value={form.timelineFrequency}
              onChange={handleChange}
              className="input"
            >
              <option value="">Select Timeline & Frequency</option>
              <option value="One-time">One-time Analysis</option>
              <option value="Monthly">Monthly Monitoring</option>
              <option value="Quarterly">Quarterly Assessment</option>
              <option value="Bi-annual">Bi-annual Inspection</option>
              <option value="Annual">Annual Survey</option>
            </select>
          </div>

          <div>
            <label className="block font-medium mb-1">
              Preferred Start Date <span className="text-red-600">*</span>
            </label>
            <input
              name="startDate"
              required
              type="date"
              min={new Date().toISOString().split("T")[0]}
              value={form.startDate}
              onChange={handleChange}
              className="input"
            />
          </div>
        </div>

        <div>
          <label className="block font-medium mb-1">
            Documentation Required <span className="text-red-600">*</span>
          </label>
          <select
            name="documentationNeeded"
            required
            value={form.documentationNeeded}
            onChange={handleChange}
            className="input"
          >
            <option value="">Select Documentation Type</option>
            <option value="Report">Detailed Report</option>
            <option value="Images">Images Only</option>
            <option value="Both">Both Report and Images</option>
            <option value="Raw">Raw Data</option>
          </select>
        </div>

        <div>
          <label className="block font-medium mb-1">Additional Info</label>
          <textarea
            name="additionalInfo"
            rows={4}
            value={form.additionalInfo}
            onChange={handleChange}
            className="input"
            placeholder="Please provide any additional information or specific requirements..."
            maxLength={MAX_LENGTHS.comments}
          />
        </div>

        <input type="hidden" name="querytype" value="service-dam-analysis" />

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
