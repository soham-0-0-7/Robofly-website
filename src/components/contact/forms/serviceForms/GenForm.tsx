"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import { colorPalette, validateEmail, validatePhone } from "@/utils/variables";
import { indianStatesAndUTs } from "@/utils/variables";
import { MAX_LENGTHS } from "@/utils/formConstants";

const SERVICE_OPTIONS = [
  "Agricultural Surveillance (NDVI, CVI, crop health, etc.)",
  "Mapping & Surveying (DSM, DTM, Ortho)",
  "Dam or Infrastructure Inspection",
  "Forest Fire Monitoring / Prediction",
  "Post-Fire Impact Assessment",
  "Industrial & Infrastructure Drone-based Inspection",
  "Other",
];

export default function DroneInquiryForm() {
  const [form, setForm] = useState({
    fullName: "",
    organizationName: "",
    email: "",
    phone: "",
    services: [] as string[],
    otherService: "",
    description: "",
    state: "",
    city: "",
    address: "",
    areaSize: "",
    timelineFrom: "",
    timelineTo: "",
    frequency: "",
    otherFrequency: "",
    specialRequirements: "",
  });
  // Update the state to include submit error
  const [errors, setErrors] = useState<{
    phone?: string;
    email?: string;
    submit?: string;
  }>({});

  const [hasGeneralError, setHasGeneralError] = useState(false);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;

    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setForm((prev) => {
        const updated = checked
          ? [...prev.services, value]
          : prev.services.filter((service) => service !== value);
        return { ...prev, services: updated };
      });
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
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
      const response = await fetch("/api/query/services/gen", {
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
      alert("Service inquiry submitted successfully!");
      // Reset form
      setForm({
        fullName: "",
        organizationName: "",
        email: "",
        phone: "",
        services: [],
        otherService: "",
        description: "",
        state: "",
        city: "",
        address: "",
        areaSize: "",
        timelineFrom: "",
        timelineTo: "",
        frequency: "",
        otherFrequency: "",
        specialRequirements: "",
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
          General Services Inquiry Form
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
              Company/Organization Name
            </label>
            <input
              name="organizationName"
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
              Email Address <span className="text-red-600">*</span>
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
              Phone Number <span className="text-red-600">*</span>
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
          <label className="block font-medium mb-2">
            Type of Service Required <span className="text-red-600">*</span>
          </label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {SERVICE_OPTIONS.map((service) => (
              <label key={service} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  name="services"
                  value={service}
                  checked={form.services.includes(service)}
                  onChange={handleChange}
                  className="form-checkbox"
                />
                <span>{service}</span>
              </label>
            ))}
          </div>
          {form.services.includes("Other") && (
            <input
              name="otherService"
              type="text"
              className="input mt-2"
              placeholder="Please specify..."
              value={form.otherService}
              onChange={handleChange}
              maxLength={MAX_LENGTHS.shortText}
            />
          )}
        </div>

        <div>
          <label className="block font-medium mb-1">
            Brief Description of Your Requirement{" "}
            <span className="text-red-600">*</span>
          </label>
          <textarea
            name="description"
            required
            rows={4}
            value={form.description}
            onChange={handleChange}
            className="input"
            maxLength={MAX_LENGTHS.description}
          />
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block font-medium mb-1">
              Size of Area to be Covered (sq. meters){" "}
              <span className="text-red-600">*</span>
            </label>
            <input
              name="areaSize"
              type="number"
              min="0"
              required
              value={form.areaSize}
              onChange={handleChange}
              className="input"
              maxLength={MAX_LENGTHS.numbers}
            />
          </div>
          <div>
            <label className="block font-medium mb-1">
              Frequency of Service Needed{" "}
              <span className="text-red-600">*</span>
            </label>
            <select
              name="frequency"
              required
              value={form.frequency}
              onChange={handleChange}
              className="input"
            >
              <option value="">Select</option>
              <option value="One-Time">One-Time</option>
              <option value="Weekly">Weekly</option>
              <option value="Monthly">Monthly</option>
              <option value="Seasonal">Seasonal</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block font-medium mb-1">
              Preferred Timeline From <span className="text-red-600">*</span>
            </label>
            <input
              name="timelineFrom"
              type="date"
              required
              min={new Date().toISOString().split("T")[0]}
              value={form.timelineFrom}
              onChange={handleChange}
              className="input"
            />
          </div>
          <div>
            <label className="block font-medium mb-1">
              Preferred Timeline To <span className="text-red-600">*</span>
            </label>
            <input
              name="timelineTo"
              type="date"
              required
              min={form.timelineFrom || new Date().toISOString().split("T")[0]}
              value={form.timelineTo}
              onChange={handleChange}
              className="input"
            />
          </div>
        </div>

        <div>
          <label className="block font-medium mb-1">
            Special Requirements or Constraints
          </label>
          <textarea
            name="specialRequirements"
            rows={3}
            value={form.specialRequirements}
            onChange={handleChange}
            className="input"
            maxLength={MAX_LENGTHS.specifications}
          />
        </div>

        <div className="text-center">
          <input type="hidden" name="querytype" value="service-general-form" />
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
          .form-checkbox {
            margin-right: 0.5rem;
          }
        `}</style>
      </form>
    </div>
  );
}
