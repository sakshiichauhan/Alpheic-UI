import React, { useState } from 'react';
import InputField from '@/Components/InputField';
import SelectField from '@/Components/SelectField';
import Checkbox from '@/Components/Checkbox';

// Define the shape of our MODAL form data
interface ModalFormData {
  fullName: string;
  email: string;
  phoneCountry: string;
  phoneNumber: string;
  organization: string; // 'Company' in the image
  whatDoYouNeed: string; // New select field
  message: string;
  agreeToPrivacy: boolean;
}

// Initial state for the MODAL form
const initialModalFormData: ModalFormData = {
  fullName: '',
  email: '',
  phoneCountry: '+91',
  phoneNumber: '',
  organization: '',
  whatDoYouNeed: '',
  message: '',
  agreeToPrivacy: false,
};

// Data for our new select field
const needOptions = [
  { value: 'web', label: 'Web Development' },
  { value: 'mobile', label: 'Mobile App Development' },
  { value: 'design', label: 'UX/UI Design' },
  { value: 'consulting', label: 'Strategy & Consulting' },
  { value: 'other', label: 'Other' },
];

/**
 * The simplified form for the contact modal.
 */
const ModalForm: React.FC = () => {
  const [formData, setFormData] =
    useState<ModalFormData>(initialModalFormData);

  // Generic handler (unchanged)
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Privacy checkbox handler (unchanged)
  const handlePrivacyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      agreeToPrivacy: e.target.checked,
    }));
  };

  // Form submission handler (unchanged)
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Modal Form Submitted:', formData);
    alert('Form submitted! Check the console for the data.');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <InputField
        label="Your Name"
        id="fullName"
        name="fullName"
        placeholder="Enter Full Name"
        value={formData.fullName}
        onChange={handleChange}
        required
      />
      <InputField
        label="Your Email"
        id="email"
        name="email"
        type="email"
        placeholder="Enter Your Email"
        value={formData.email}
        onChange={handleChange}
        required
      />

      {/* Phone Number Input (copied from your original form) */}
      <div className="relative w-full">
        <label
          htmlFor="phoneNumber"
          className="absolute -top-2.5 left-3 z-10 bg-white px-1 text-[16px] text-[var(--medium-text)]"
        >
          Phone Number
          <span className="text-red-500">*</span>
        </label>
        <div className="flex w-full border-2 border-[#E5E7EA] focus-within:border-[var(--medium-text)] focus-within:outline-none focus-within:ring-1 focus-within:ring-[var(--medium-text)]">
          <div className="relative">
            <select
              name="phoneCountry"
              value={formData.phoneCountry}
              onChange={handleChange}
              className="w-20 appearance-none border-none bg-transparent py-[14px] pl-3 pr-1 text-base text-[#999999] focus:outline-none focus:ring-0 font-urbanist"
            >
              <option value="+91">+91</option>
              <option value="+1">+1</option>
              <option value="+44">+44</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2 text-gray-700">
              <svg
                className="h-4 w-4 fill-current"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
              </svg>
            </div>
          </div>
          <div className="my-3 border-r-2 border-[#E5E7EA]"></div>
          <input
            type="tel"
            id="phoneNumber"
            name="phoneNumber"
            placeholder="Enter Phone Number"
            value={formData.phoneNumber}
            onChange={handleChange}
            required
            className="flex-1 w-full rounded-none border-none bg-transparent px-3 py-[14px] text-base text-[#999999] placeholder-[#999999] focus:outline-none focus:ring-0 font-urbanist"
          />
        </div>
      </div>

      <InputField
        label="Company"
        id="organization"
        name="organization"
        placeholder="Enter Company"
        value={formData.organization}
        onChange={handleChange}
        required
      />

      {/* New Field from Image */}
      <SelectField
        label="What do you need?"
        id="whatDoYouNeed"
        name="whatDoYouNeed"
        value={formData.whatDoYouNeed}
        onChange={handleChange}
        options={needOptions}
        placeholder="Select What do you need?"
        required
      />

      {/* Message Textarea (copied from your original form) */}
      <div className="relative w-full">
        <label
          htmlFor="message"
          className="absolute -top-2.5 left-3 z-10 bg-white px-1 text-[16px] text-[var(--medium-text)]"
        >
          Message
          <span className="text-red-500">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          placeholder="Tell us briefly about your project."
          value={formData.message}
          onChange={handleChange}
          required
          className="w-full border-2 border-[#E5E7EA] px-3 py-[14px] text-base text-[#999999] placeholder-[#999999] transition-colors focus:border-[var(--medium-text)] focus:outline-none focus:ring-1 focus:ring-[var(--medium-text)] font-urbanist"
        />
      </div>

      {/* Privacy and Submit (copied from your original form) */}
      <div className="space-y-6">
        <Checkbox
          label={
            <span className="text-[16px] text-[var(--medium-text)] font-urbanist font-medium">
              I have read and agree to the{' '}
              <a href="/privacy" className="text-[var(--color)] underline">
                Privacy Policy
              </a>
            </span>
          }
          id="agreeToPrivacy"
          name="agreeToPrivacy"
          checked={formData.agreeToPrivacy}
          onChange={handlePrivacyChange}
        />

        <button
            type="submit"
            className="flex items-center justify-center lg:text-[24px] md:text-[20px] text-[16px] md:px-8 px-4 md:py-[10px] py-[8px] bg-black text-white font-urbanist hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 transition-all"
            disabled={!formData.agreeToPrivacy} // Disable if privacy not agreed
          >
            Submit
            {/* Arrow Icon */}
            <svg
              className="lg:w-[32px] lg:h-[32px] w-[24px] h-[24px] ml-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              ></path>
            </svg>
          </button>
      </div>
    </form>
  );
};

export default ModalForm;