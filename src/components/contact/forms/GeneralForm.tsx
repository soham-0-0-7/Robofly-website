"use client";

import { useState, ChangeEvent, FormEvent, JSX } from "react";
import { colorPalette } from "@/utils/variables";

const indianStatesAndUTs = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttarakhand",
  "Uttar Pradesh",
  "West Bengal",
  "Andaman and Nicobar Islands",
  "Chandigarh",
  "Dadra and Nagar Haveli and Daman and Diu",
  "Delhi",
  "Jammu and Kashmir",
  "Lakshadweep",
  "Puducherry",
  "Ladakh",
];

// const MULTI_SELECT_OPTIONS = [
//   { title: "Agricultural Drone" },
//   { title: "Surveillance Drone" },
//   { title: "Logistics Package Dropping Drone" },
//   { title: "FPV Drone" },
//   { title: "Training Drone" },
//   { title: "Custom Drone" },
//   { title: "Agricultural Surveillance Drone Solutions" },
//   { title: "Drone Mapping Services (DSM, DTM, Ortho)" },
//   { title: "Dam Surveillance and Structural Analysis" },
//   { title: "Industrial & Infrastructure Inspection Services" },
//   { title: "Forest Fire Prediction & Eradication System" },
//   { title: "Post-Wildfire Biodiversity & Impact Assessment" }
// ];

interface FormData {
  fullName: string;
  organizationName: string;
  email: string;
  phone: string;
  queryType: string;
  city: string;
  address: string;
  state: string;
  concerns: string[];
  additionalInfo: string;
}

interface Errors {
  phone?: string;
  email?: string;
  submit?: string;
}

export default function GenForm(): JSX.Element {
  const [form, setForm] = useState<FormData>({
    fullName: "",
    organizationName: "",
    email: "",
    phone: "",
    queryType: "",
    city: "",
    address: "",
    state: "",
    concerns: [],
    additionalInfo: "",
  });

  const [errors, setErrors] = useState<Errors>({});
  const [hasGeneralError, setHasGeneralError] = useState(false);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  // const handleMultiSelect = (e: ChangeEvent<HTMLSelectElement>) => {
  //   const selectedOptions = Array.from(e.target.selectedOptions, option => option.value);
  //   setForm(prev => ({ ...prev, concerns: selectedOptions }));
  // };

  const validateEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validatePhone = (phone: string) =>
    /^(\+\d{1,3}[- ]?)?\d{10}$/.test(phone.trim());

  // Update the handleSubmit function
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
      const response = await fetch("/api/query/general", {
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
      alert("Form submitted successfully!");
      // Optionally reset form here
      setForm({
        fullName: "",
        organizationName: "",
        email: "",
        phone: "",
        queryType: "",
        city: "",
        address: "",
        state: "",
        concerns: [],
        additionalInfo: "",
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block font-medium mb-1">
              Full Name <span className="text-red-600">*</span>
            </label>
            <input
              maxLength={50}
              suppressHydrationWarning
              name="fullName"
              required
              value={form.fullName}
              onChange={handleChange}
              className="input"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Organization Name</label>
            <input
              suppressHydrationWarning
              name="organizationName"
              value={form.organizationName}
              onChange={handleChange}
              className="input"
              maxLength={100}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block font-medium mb-1">
              Email <span className="text-red-600">*</span>
            </label>
            <input
              suppressHydrationWarning
              name="email"
              required
              type="email"
              value={form.email}
              onChange={handleChange}
              className="input"
              maxLength={100}
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
              suppressHydrationWarning
              name="phone"
              required
              value={form.phone}
              onChange={handleChange}
              className="input"
              maxLength={50}
            />
            {errors.phone && (
              <p className="text-red-600 text-sm mt-1">{errors.phone}</p>
            )}
          </div>
        </div>

        <div>
          <label className="block font-medium mb-1">
            Type of Query <span className="text-red-600">*</span>
          </label>
          <textarea
            name="queryType"
            required
            rows={3}
            value={form.queryType}
            onChange={handleChange}
            className="input"
            placeholder="Please describe your query in detail..."
            maxLength={200}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block font-medium mb-1">
              City / Town / Village <span className="text-red-600">*</span>
            </label>
            <input
              suppressHydrationWarning
              name="city"
              required
              value={form.city}
              onChange={handleChange}
              className="input"
              maxLength={80}
            />
          </div>

          <div>
            <label className="block font-medium mb-1">
              State <span className="text-red-600">*</span>
            </label>
            <select
              suppressHydrationWarning
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
            maxLength={200}
          />
        </div>

        {/* <div>
          <label className="block font-medium mb-1">
            Select the fields your query might concern <span className="text-red-600">*</span>
          </label>
          <select
            name="concerns"
            multiple
            value={form.concerns}
            onChange={handleMultiSelect}
            className="input h-40"
          >
            {MULTI_SELECT_OPTIONS.map(option => (
              <option key={option.title} value={option.title}>{option.title}</option>
            ))}
          </select>
        </div> */}

        <div>
          <label className="block font-medium mb-1">Additional Info</label>
          <textarea
            name="additionalInfo"
            rows={4}
            value={form.additionalInfo}
            onChange={handleChange}
            className="input"
            maxLength={200}
            placeholder="Please provide any additional information or specific requirements... (maximum 200 characters)"
          />
        </div>
        <input type="hidden" name="querytype" value="general-form" />

        <div className="text-center">
          <button
            suppressHydrationWarning
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

        <style>{`
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

        {errors.submit && (
          <p className="text-red-600 text-center mt-4">{errors.submit}</p>
        )}
      </form>
    </div>
  );
}
