"use client";

import { useState, ChangeEvent, FormEvent, JSX } from "react";
import { colorPalette, validateEmail, validatePhone } from "@/utils/variables";
import { MAX_LENGTHS } from "@/utils/formConstants";

interface FormData {
  fullName: string;
  organizationName: string;
  email: string;
  phone: string;
  applicationType: string;
  payloadRequirements: string;
  rangeEndurance: string;
  environmentalConditions: string;
  flightControllerPreference: string;
  cameraSensorRequirements: string;
  batteryPreference: string;
  deliveryTimeline: string;
  additionalNotes: string;
}

const applicationTypes = [
  "Surveillance",
  "Agriculture",
  "Logistics",
  "Mapping",
  "Other",
];
const environmentalConditions = [
  "High Temp",
  "Humidity",
  "Dust",
  "Wind Resistance",
];
const flightControllerPreferences = ["Pixhawk", "Custom"];
const batteryPreferences = ["Tattu", "Custom"];

export default function SixthProdForm(): JSX.Element {
  const [form, setForm] = useState<FormData>({
    fullName: "",
    organizationName: "",
    email: "",
    phone: "",
    applicationType: "",
    payloadRequirements: "",
    rangeEndurance: "",
    environmentalConditions: "",
    flightControllerPreference: "",
    cameraSensorRequirements: "",
    batteryPreference: "",
    deliveryTimeline: "",
    additionalNotes: "",
  });
  // Update the handleSubmit function in SixthProdForm.tsx
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
      const response = await fetch("/api/query/products/sixth", {
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
      alert("Custom drone inquiry submitted successfully!");
      // Reset form
      setForm({
        fullName: "",
        organizationName: "",
        email: "",
        phone: "",
        applicationType: "",
        payloadRequirements: "",
        rangeEndurance: "",
        environmentalConditions: "",
        flightControllerPreference: "",
        cameraSensorRequirements: "",
        batteryPreference: "",
        deliveryTimeline: "",
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
          Custom Drone Inquiry Form
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
            <label className="block font-medium mb-1">Organization Name</label>
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
            Application Type <span className="text-red-600">*</span>
          </label>
          <select
            name="applicationType"
            required
            value={form.applicationType}
            onChange={handleChange}
            className="form-input"
          >
            <option value="">Select application type</option>
            {applicationTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block font-medium mb-1">Payload Requirements</label>
          <textarea
            name="payloadRequirements"
            rows={3}
            value={form.payloadRequirements}
            onChange={handleChange}
            className="form-input"
            placeholder="Describe payload requirements..."
            maxLength={MAX_LENGTHS.requirements}
          />
        </div>

        <div>
          <label className="block font-medium mb-1">
            Range & Endurance Needed
          </label>
          <textarea
            name="rangeEndurance"
            rows={3}
            value={form.rangeEndurance}
            onChange={handleChange}
            className="form-input"
            placeholder="Describe range and endurance requirements..."
            maxLength={MAX_LENGTHS.specifications}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block font-medium mb-1">
              Environmental Conditions <span className="text-red-600">*</span>
            </label>
            <select
              name="environmentalConditions"
              required
              value={form.environmentalConditions}
              onChange={handleChange}
              className="form-input"
            >
              <option value="">Select conditions</option>
              {environmentalConditions.map((condition) => (
                <option key={condition} value={condition}>
                  {condition}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block font-medium mb-1">
              Flight Controller Preference{" "}
              <span className="text-red-600">*</span>
            </label>
            <select
              name="flightControllerPreference"
              required
              value={form.flightControllerPreference}
              onChange={handleChange}
              className="form-input"
            >
              <option value="">Select preference</option>
              {flightControllerPreferences.map((pref) => (
                <option key={pref} value={pref}>
                  {pref}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="block font-medium mb-1">
            Camera & Sensor Requirements
          </label>
          <textarea
            name="cameraSensorRequirements"
            rows={3}
            value={form.cameraSensorRequirements}
            onChange={handleChange}
            className="form-input"
            placeholder="Describe camera and sensor requirements..."
            maxLength={MAX_LENGTHS.specifications}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block font-medium mb-1">
              Battery or Power Preference{" "}
              <span className="text-red-600">*</span>
            </label>
            <select
              name="batteryPreference"
              required
              value={form.batteryPreference}
              onChange={handleChange}
              className="form-input"
            >
              <option value="">Select preference</option>
              {batteryPreferences.map((pref) => (
                <option key={pref} value={pref}>
                  {pref}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block font-medium mb-1">
              Expected Delivery Timeline <span className="text-red-600">*</span>
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

        <input type="hidden" name="querytype" value="product-custom-drone" />

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
