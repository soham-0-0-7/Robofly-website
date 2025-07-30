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
  forestArea: string;
  servicesRequired: string;
  pastFireHistory: string;
  availableGISData: string;
  needAIMLModels: string;
  preferredDeliveryFormat: string;
  timelineToDeploy: string;
  governmentPermits: string;
  additionalNeeds: string;
}

export default function FifthServiceForm(): JSX.Element {
  const [form, setForm] = useState<FormData>({
    fullName: "",
    organizationName: "",
    email: "",
    phone: "",
    regionName: "",
    forestArea: "",
    servicesRequired: "",
    pastFireHistory: "",
    availableGISData: "",
    needAIMLModels: "",
    preferredDeliveryFormat: "",
    timelineToDeploy: "",
    governmentPermits: "",
    additionalNeeds: "",
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
      const response = await fetch("/api/query/services/fifth", {
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
      alert("Forest fire service inquiry submitted successfully!");
      // Reset form
      setForm({
        fullName: "",
        organizationName: "",
        email: "",
        phone: "",
        regionName: "",
        forestArea: "",
        servicesRequired: "",
        pastFireHistory: "",
        availableGISData: "",
        needAIMLModels: "",
        preferredDeliveryFormat: "",
        timelineToDeploy: "",
        governmentPermits: "",
        additionalNeeds: "",
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
          Forest Fire Prediction & Eradication System Inquiry Form
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
              Organization/Department Name{" "}
              <span className="text-red-600">*</span>
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
              Region or Forest Name <span className="text-red-600">*</span>
            </label>
            <input
              name="regionName"
              required
              type="text"
              value={form.regionName}
              onChange={handleChange}
              className="form-input"
              maxLength={MAX_LENGTHS.name}
            />
          </div>

          <div>
            <label className="block font-medium mb-1">
              Forest / Region Area (sq. km){" "}
              <span className="text-red-600">*</span>
            </label>
            <input
              name="forestArea"
              required
              type="number"
              min="0"
              step="0.01"
              value={form.forestArea}
              onChange={handleChange}
              className="form-input"
              maxLength={MAX_LENGTHS.numbers}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block font-medium mb-1">
              Services Required <span className="text-red-600">*</span>
            </label>
            <select
              name="servicesRequired"
              required
              value={form.servicesRequired}
              onChange={handleChange}
              className="form-input"
            >
              <option value="">Select Service</option>
              <option value="Prediction">Prediction</option>
              <option value="Surveillance">Surveillance</option>
              <option value="Fire Spread Risk Modeling">
                Fire Spread Risk Modeling
              </option>
              <option value="All">All</option>
            </select>
          </div>

          <div>
            <label className="block font-medium mb-1">
              Past Fire History Availability{" "}
              <span className="text-red-600">*</span>
            </label>
            <select
              name="pastFireHistory"
              required
              value={form.pastFireHistory}
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
              Available GIS Data <span className="text-red-600">*</span>
            </label>
            <select
              name="availableGISData"
              required
              value={form.availableGISData}
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
              Need for AI/ML Risk Models?{" "}
              <span className="text-red-600">*</span>
            </label>
            <select
              name="needAIMLModels"
              required
              value={form.needAIMLModels}
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
              Preferred Delivery Format <span className="text-red-600">*</span>
            </label>
            <select
              name="preferredDeliveryFormat"
              required
              value={form.preferredDeliveryFormat}
              onChange={handleChange}
              className="form-input"
            >
              <option value="">Select Format</option>
              <option value="Live Feed">Live Feed</option>
              <option value="Alerts">Alerts</option>
              <option value="Reports">Reports</option>
            </select>
          </div>

          <div>
            <label className="block font-medium mb-1">
              Timeline to Deploy <span className="text-red-600">*</span>
            </label>
            <input
              name="timelineToDeploy"
              required
              type="date"
              min={new Date().toISOString().split("T")[0]}
              value={form.timelineToDeploy}
              onChange={handleChange}
              className="form-input"
            />
          </div>
        </div>

        <div>
          <label className="block font-medium mb-1">
            Government Permits or Clearances{" "}
            <span className="text-red-600">*</span>
          </label>
          <select
            name="governmentPermits"
            required
            value={form.governmentPermits}
            onChange={handleChange}
            className="form-input"
          >
            <option value="">Select</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </div>

        <div>
          <label className="block font-medium mb-1">Additional Needs</label>
          <textarea
            name="additionalNeeds"
            rows={4}
            value={form.additionalNeeds}
            onChange={handleChange}
            className="form-input"
            placeholder="Please specify any additional needs or requirements..."
            maxLength={MAX_LENGTHS.comments}
          />
        </div>

        <input
          type="hidden"
          name="querytype"
          value="service-forestfire-predictionAndEradication"
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
