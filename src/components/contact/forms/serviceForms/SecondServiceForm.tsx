"use client";

import { useState, ChangeEvent, FormEvent, JSX } from "react";
import { colorPalette, validateEmail, validatePhone } from "@/utils/variables";
import { MAX_LENGTHS } from "@/utils/formConstants";

interface FormData {
  fullName: string;
  organizationName: string;
  email: string;
  phone: string;
  mappingRequirement: string;
  areaToBeMapped: string;
  locationCoordinates: string;
  terrainType: string;
  usagePurpose: string;
  deliveryTimeline: string;
  additionalRequirements: string;
}

export default function SecondServiceForm(): JSX.Element {
  const [form, setForm] = useState<FormData>({
    fullName: "",
    organizationName: "",
    email: "",
    phone: "",
    mappingRequirement: "",
    areaToBeMapped: "",
    locationCoordinates: "",
    terrainType: "",
    usagePurpose: "",
    deliveryTimeline: "",
    additionalRequirements: "",
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
      const response = await fetch("/api/query/services/second", {
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
      alert("Mapping service inquiry submitted successfully!");
      // Reset form
      setForm({
        fullName: "",
        organizationName: "",
        email: "",
        phone: "",
        mappingRequirement: "",
        areaToBeMapped: "",
        locationCoordinates: "",
        terrainType: "",
        usagePurpose: "",
        deliveryTimeline: "",
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
  return (
    <div className="flex justify-center py-10 px-4">
      <form
        onSubmit={handleSubmit}
        className="space-y-6 max-w-4xl w-full rounded-xl bg-white p-8"
      >
        <h2 className="text-2xl font-bold text-center mb-4">
          Drone Mapping Services Inquiry Form
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
              Organization/Company Name <span className="text-red-600">*</span>
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
              Mapping Requirement <span className="text-red-600">*</span>
            </label>
            <select
              name="mappingRequirement"
              required
              value={form.mappingRequirement}
              onChange={handleChange}
              className="input"
            >
              <option value="">Select Mapping Type</option>
              <option value="DSM">DSM</option>
              <option value="DTM">DTM</option>
              <option value="Ortho">Ortho</option>
              <option value="Contour">Contour</option>
              <option value="Others">Others</option>
            </select>
          </div>

          <div>
            <label className="block font-medium mb-1">
              Area to be Mapped (in sq. km){" "}
              <span className="text-red-600">*</span>
            </label>
            <input
              name="areaToBeMapped"
              required
              type="number"
              min="0"
              step="0.01"
              value={form.areaToBeMapped}
              onChange={handleChange}
              className="input"
              maxLength={MAX_LENGTHS.numbers}
            />
          </div>
        </div>

        <div>
          <label className="block font-medium mb-1">
            Location/Coordinates (if available)
          </label>
          <textarea
            name="locationCoordinates"
            rows={3}
            value={form.locationCoordinates}
            onChange={handleChange}
            className="input"
            placeholder="Enter coordinates or detailed location description..."
            maxLength={MAX_LENGTHS.longText}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block font-medium mb-1">
              Terrain Type <span className="text-red-600">*</span>
            </label>
            <select
              name="terrainType"
              required
              value={form.terrainType}
              onChange={handleChange}
              className="input"
            >
              <option value="">Select Terrain Type</option>
              <option value="Urban">Urban</option>
              <option value="Forest">Forest</option>
              <option value="Agricultural">Agricultural</option>
              <option value="Mixed">Mixed</option>
            </select>
          </div>

          <div>
            <label className="block font-medium mb-1">
              Usage Purpose <span className="text-red-600">*</span>
            </label>
            <select
              name="usagePurpose"
              required
              value={form.usagePurpose}
              onChange={handleChange}
              className="input"
            >
              <option value="">Select Usage Purpose</option>
              <option value="Construction">Construction</option>
              <option value="Survey">Survey</option>
              <option value="Agriculture">Agriculture</option>
              <option value="Others">Others</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block font-medium mb-1">
            Timeline to Deliver Output <span className="text-red-600">*</span>
          </label>
          <input
            name="deliveryTimeline"
            required
            type="date"
            min={new Date().toISOString().split("T")[0]}
            value={form.deliveryTimeline}
            onChange={handleChange}
            className="input"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">
            Additional Requirements
          </label>
          <textarea
            name="additionalRequirements"
            rows={4}
            value={form.additionalRequirements}
            onChange={handleChange}
            className="input"
            placeholder="Please specify any additional requirements or special considerations..."
            maxLength={MAX_LENGTHS.specifications}
          />
        </div>

        <input type="hidden" name="querytype" value="service-drone-mapping" />

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
