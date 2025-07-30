"use client";

import { useState, ChangeEvent, FormEvent, JSX } from "react";
import { colorPalette, validateEmail, validatePhone } from "@/utils/variables";
import { MAX_LENGTHS } from "@/utils/formConstants";

interface FormData {
  fullName: string;
  organizationName: string;
  email: string;
  phone: string;
  assetType: string;
  inspectionPurpose: string;
  areaOrUnits: string;
  requiredSensor: string;
  inspectionFrequency: string;
  dataOutputFormat: string;
  regulatoryRequirements: string;
  customDeliverables: string;
  startDate: string;
  endDate: string;
  notesAttachments: string;
}

export default function FourthServiceForm(): JSX.Element {
  const [form, setForm] = useState<FormData>({
    fullName: "",
    organizationName: "",
    email: "",
    phone: "",
    assetType: "",
    inspectionPurpose: "",
    areaOrUnits: "",
    requiredSensor: "",
    inspectionFrequency: "",
    dataOutputFormat: "",
    regulatoryRequirements: "",
    customDeliverables: "",
    startDate: "",
    endDate: "",
    notesAttachments: "",
  });

  // const [errors, setErrors] = useState<{ phone?: string; email?: string }>({});
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
      const response = await fetch("/api/query/services/fourth", {
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
      alert("Inspection service inquiry submitted successfully!");
      // Reset form
      setForm({
        fullName: "",
        organizationName: "",
        email: "",
        phone: "",
        assetType: "",
        inspectionPurpose: "",
        areaOrUnits: "",
        requiredSensor: "",
        inspectionFrequency: "",
        dataOutputFormat: "",
        regulatoryRequirements: "",
        customDeliverables: "",
        startDate: "",
        endDate: "",
        notesAttachments: "",
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
          Drone Inspection Services Inquiry Form
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
              Organization/Company Name <span className="text-red-600">*</span>
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
              Type of Asset <span className="text-red-600">*</span>
            </label>
            <select
              name="assetType"
              required
              value={form.assetType}
              onChange={handleChange}
              className="form-input"
            >
              <option value="">Select Asset Type</option>
              <option value="Solar">Solar</option>
              <option value="Tower">Tower</option>
              <option value="Bridge">Bridge</option>
              <option value="Building">Building</option>
              <option value="Powerline">Powerline</option>
              <option value="Others">Others</option>
            </select>
          </div>

          <div>
            <label className="block font-medium mb-1">
              Purpose of Inspection <span className="text-red-600">*</span>
            </label>
            <select
              name="inspectionPurpose"
              required
              value={form.inspectionPurpose}
              onChange={handleChange}
              className="form-input"
            >
              <option value="">Select Purpose</option>
              <option value="Damage Assessment">Damage Assessment</option>
              <option value="Routine Maintenance">Routine Maintenance</option>
              <option value="Insurance">Insurance</option>
              <option value="Others">Others</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block font-medium mb-1">
              Area or Number of Units to Inspect{" "}
              <span className="text-red-600">*</span>
            </label>
            <input
              name="areaOrUnits"
              required
              type="number"
              min="0"
              step="1"
              value={form.areaOrUnits}
              onChange={handleChange}
              className="form-input"
              maxLength={MAX_LENGTHS.numbers}
            />
          </div>

          <div>
            <label className="block font-medium mb-1">
              Required Camera/Sensor <span className="text-red-600">*</span>
            </label>
            <select
              name="requiredSensor"
              required
              value={form.requiredSensor}
              onChange={handleChange}
              className="form-input"
            >
              <option value="">Select Sensor</option>
              <option value="Thermal">Thermal</option>
              <option value="RGB">RGB</option>
              <option value="LiDAR">LiDAR</option>
              <option value="Zoom">Zoom</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block font-medium mb-1">
              Inspection Frequency <span className="text-red-600">*</span>
            </label>
            <select
              name="inspectionFrequency"
              required
              value={form.inspectionFrequency}
              onChange={handleChange}
              className="form-input"
            >
              <option value="">Select Frequency</option>
              <option value="One-time">One-time</option>
              <option value="Monthly">Monthly</option>
              <option value="Quarterly">Quarterly</option>
            </select>
          </div>

          <div>
            <label className="block font-medium mb-1">
              Data Output Format Preferred
            </label>
            <input
              name="dataOutputFormat"
              type="text"
              value={form.dataOutputFormat}
              onChange={handleChange}
              className="form-input"
              maxLength={MAX_LENGTHS.shortText}
              placeholder="e.g., PDF, Excel, RAW images..."
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block font-medium mb-1">
              Any Regulatory Requirements{" "}
              <span className="text-red-600">*</span>
            </label>
            <select
              name="regulatoryRequirements"
              required
              value={form.regulatoryRequirements}
              onChange={handleChange}
              className="form-input"
            >
              <option value="">Select</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>

          <div>
            <label className="block font-medium mb-1">
              Custom Deliverables Required{" "}
              <span className="text-red-600">*</span>
            </label>
            <select
              name="customDeliverables"
              required
              value={form.customDeliverables}
              onChange={handleChange}
              className="form-input"
            >
              <option value="">Select</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block font-medium mb-1">
              Start Date <span className="text-red-600">*</span>
            </label>
            <input
              name="startDate"
              required
              type="date"
              min={new Date().toISOString().split("T")[0]}
              value={form.startDate}
              onChange={handleChange}
              className="form-input"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">
              End Date <span className="text-red-600">*</span>
            </label>
            <input
              name="endDate"
              required
              type="date"
              min={form.startDate || new Date().toISOString().split("T")[0]}
              value={form.endDate}
              onChange={handleChange}
              className="form-input"
            />
          </div>
        </div>

        <div>
          <label className="block font-medium mb-1">
            Notes or Attachments (drive or any other links)
          </label>
          <textarea
            name="notesAttachments"
            rows={4}
            value={form.notesAttachments}
            onChange={handleChange}
            className="form-input"
            placeholder="Please provide any additional notes or links to relevant documents..."
            maxLength={MAX_LENGTHS.url}
          />
        </div>

        <input
          type="hidden"
          name="querytype"
          value="service-drone-inspection"
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
