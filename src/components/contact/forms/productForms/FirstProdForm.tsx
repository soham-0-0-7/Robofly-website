"use client";

import { useState, ChangeEvent, FormEvent, JSX } from "react";
import { colorPalette, validateEmail, validatePhone } from "@/utils/variables";
import { MAX_LENGTHS } from "@/utils/formConstants";

interface FormData {
  fullName: string;
  farmName: string;
  email: string;
  phone: string;
  cropTypes: string;
  tankCapacity: string;
  customAutomation: string;
  existingDroneUsage: string;
  additionalNotes: string;
}

const tankCapacities = ["10", "16"];

export default function FirstProdForm(): JSX.Element {
  const [form, setForm] = useState<FormData>({
    fullName: "",
    farmName: "",
    email: "",
    phone: "",
    cropTypes: "",
    tankCapacity: "",
    customAutomation: "",
    existingDroneUsage: "",
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
  ): void => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
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
      const response = await fetch("/api/query/products/first", {
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
      alert("Agricultural spraying drone inquiry submitted successfully!");
      // Reset form
      setForm({
        fullName: "",
        farmName: "",
        email: "",
        phone: "",
        cropTypes: "",
        tankCapacity: "",
        customAutomation: "",
        existingDroneUsage: "",
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
  return (
    <div className="flex justify-center py-10 px-4">
      <form
        onSubmit={handleSubmit}
        className="space-y-6 max-w-4xl w-full rounded-xl bg-white p-8"
      >
        <h2 className="text-2xl font-bold text-center mb-4">
          Agricultural Spraying Drone Inquiry Form
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
              Farm/Organization Name <span className="text-red-600">*</span>
            </label>
            <input
              name="farmName"
              required
              type="text"
              value={form.farmName}
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

        <div>
          <label className="block font-medium mb-1">
            Type of Crops <span className="text-red-600">*</span>
          </label>
          <textarea
            name="cropTypes"
            required
            rows={3}
            value={form.cropTypes}
            onChange={handleChange}
            className="form-input"
            placeholder="Please describe the types of crops you grow..."
            maxLength={MAX_LENGTHS.description}
          />
        </div>

        <div>
          <label className="block font-medium mb-1">
            Preferred Tank Capacity <span className="text-red-600">*</span>
          </label>
          <select
            name="tankCapacity"
            required
            value={form.tankCapacity}
            onChange={handleChange}
            className="form-input"
          >
            <option value="">Select tank capacity</option>
            {tankCapacities.map((capacity) => (
              <option key={capacity} value={capacity}>
                {capacity} Liters
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block font-medium mb-1">
            Custom Automation Needs (Optional)
          </label>
          <textarea
            name="customAutomation"
            rows={3}
            value={form.customAutomation}
            onChange={handleChange}
            className="form-input"
            placeholder="Describe any specific automation requirements..."
            maxLength={MAX_LENGTHS.specifications}
          />
        </div>

        <div>
          <label className="block font-medium mb-1">
            Any Existing Drone Usage? <span className="text-red-600">*</span>
          </label>
          <select
            name="existingDroneUsage"
            required
            value={form.existingDroneUsage}
            onChange={handleChange}
            className="form-input"
          >
            <option value="">Select option</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </div>

        <div>
          <label className="block font-medium mb-1">Additional Notes</label>
          <textarea
            name="additionalNotes"
            rows={4}
            value={form.additionalNotes}
            onChange={handleChange}
            className="form-input"
            placeholder="Any additional information or specific requirements..."
            maxLength={MAX_LENGTHS.comments}
          />
        </div>

        <input
          type="hidden"
          name="querytype"
          value="product-agricultural-spraying-drone"
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
