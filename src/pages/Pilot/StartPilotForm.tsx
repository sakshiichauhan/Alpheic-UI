import React, { useState } from 'react';
import InputField from '@/Components/InputField';
import SelectField from '@/Components/SelectField';


// Define the shape of our form data
interface FormData {
  selectedPilot: string;
  reason: string;
  services: Record<string, boolean>;
  projectTimeline: string;
  estimatedBudget: string;
  fullName: string;
  email: string;
  phoneCountry: string;
  phoneNumber: string;
  organization: string;
  role: string;
  location: string;
  message: string;
  agreeToPrivacy: boolean;
  companyType: string;
  industrySector: string;
  companySize: string;
  howDidYouHearAboutUs: string;
}

const roleOptions = [
  { value: 'cto', label: 'CTO' },
  { value: 'engineer', label: 'Engineer' },
  { value: 'manager', label: 'Project Manager' },
  { value: 'other', label: 'Other' },
];


const locationOptions = [
  { value: 'na', label: 'North America' },
  { value: 'eu', label: 'Europe' },
  { value: 'asia', label: 'Asia' },
  { value: 'other', label: 'Other' },
];



const serviceOptions = [
  { key: 'market', label: 'Market' },
  { key: 'hire', label: 'Hire' },
  { key: 'design', label: 'Design' },
  { key: 'build', label: 'Build' },
  { key: 'pilot', label: 'Pilot' },
  { key: 'secure', label: 'Secure' },
  { key: 'host', label: 'Host' },
];



// Initial state for the form
const initialFormData: FormData = {
  selectedPilot: 'Pitch it – Investor Deck',
  reason: '',
  services: serviceOptions.reduce<Record<string, boolean>>((acc, option) => {
    acc[option.key] = false;
    return acc;
  }, {}),
  projectTimeline: '',
  estimatedBudget: '',
  fullName: '',
  email: '',
  phoneCountry: '+91',
  phoneNumber: '',
  organization: '',
  role: '',
  location: '',
  message: '',
  agreeToPrivacy: false,
  companyType: '',
  industrySector: '',
  companySize: '',
  howDidYouHearAboutUs: '',
};

/**
 * The main contact form, built with reusable components.
 */
const StartPilotForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>(initialFormData);

  // Generic handler for most text inputs and selects
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handler for the 'services' checkboxes



  // Form submission handler
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Form Submitted:', formData);
    // Here you would typically send the data to your backend API
    alert('Form submitted! Check the console for the data.');
  };

  return (
    <div id="ux-heading" className="2xl:px-[200px] xl:px-[120px] lg:px-[80px] md:px-[40px] sm:px-[20px] px-[10px] 2xl:py-[120px] xl:py-[100px] lg:py-[80px] md:py-[60px] sm:py-[52px] py-[40px] font-sans">
      <div className="relative inline-flex gap-2 mb-4 flex-wrap">
        <h1

          className="text-[28px] sm:text-[32px] md:text-6xl lg:text-7xl 2xl:text-[64px] font-semibold text-[#000000] leading-tight inline-block "
        >
          Start your pilot
        </h1>

      </div>

      {/* First paragraph */}
      <p className="text-[13px] sm:text-[15px] md:text-xl lg:text-[24px] text-[#3E3E3E]  font-urbanist font-light  leading-relaxed mb-6">
        You’re just a few steps away from launching your pilot with Alpheric. Tell us a bit about you so we can come prepared.
      </p>




      <div className="bg-[#E8F3FA] border border-[#5AC8DC] shadow-[0px_24px_70px_rgba(15,23,42,0.08)] p-5 sm:p-7 lg:p-8 mb-8">

        <div className="space-y-4">
          <div>
            <p className="inline-block px-2 py-1 text-[20px] sm:text-[20px] text-[#000000] font-medium bg-[#FFFFFF]">
              Selected Pilot
            </p>

            <div className="mt-4 flex flex-wrap items-center gap-4">
              <p className="text-[#000000] text-[22px] sm:text-[26px] lg:text-[40px] font-medium">
                Pitch it – Investor Deck
              </p>

              <button
                type="button"
                className="text-[#5AC8DC] text-[20px] sm:text-[14px] font-semibold tracking-wide hover:underline"
              >
                Change
              </button>
            </div>
            <hr className="w-full border-t-2 border-[#E5E5E5]" />
          </div>
          <p className="text-[#535353] text-[20px] sm:text-[20px] leading-relaxed font-urbanist">
            Turn your idea into a sharp, investor-ready story and deck.
          </p>
          <div className="bg-white  border border-[#D4E6F2] gap-[40px] flex flex-col sm:flex-row">

            {/* Deliverables */}

            <div className="flex flex-wrap items-center gap-2 px-4 py-4">
              <p className="text-[20px] text-[#535353] font-semibold font-urbanist">
                Deliverables:
              </p>
              <p className="text-[#535353] text-[20px] sm:text-[20px] font-urbanist ">
                Strategy Deck + Brand Pack
              </p>

            </div>

            {/* Duration */}

            <div className="flex flex-wrap items-center gap-2">
              <p className="text-[20px] text-[#535353] font-semibold font-urbanist">
                Duration:
              </p>
              <p className="text-[#535353] text-[20px] sm:text-[20px] font-urbanist ">
                2 Weeks
              </p>
              <span className="2xl:text-[22px] xl:text-[20px] lg:text-[18px] text-[16px] leading-none">🗓️</span>

            </div>

            {/* Primary KPI */}

            <div className="flex flex-wrap items-center gap-2">
              <p className="text-[20px] text-[#535353] font-semibold font-urbanist">
                Primary KPI:
              </p>
              <p className="text-[#535353] text-[20px] sm:text-[20px] font-urbanist ">
                Name recall & clarity
              </p>

            </div>

          </div>

        </div>

      </div>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 lg:grid-cols-[minmax(400px,1fr)_1fr_1fr] xl:grid-cols-[minmax(500px,1fr)_1fr_1fr] 2xl:grid-cols-[minmax(550px,1fr)_1fr_1fr] xl:gap-x-10 2xl:gap-x-56 lg:gap-y-12 md:gap-y-8 gap-y-6">

        {/* --- Section 1: What Do You Want to Talk About? --- */}
        <div className="lg:col-span-1">
          <h2 className="xl:text-[32px] md:text-[24px] text-[20px] font-semibold text-black">Tell Us About You</h2>
        </div>
        <div className="lg:col-span-2 space-y-6"> {/* CHANGED: from lg:col-span-1 to lg:col-span-2 */}

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
          {/* Phone Number Input */}
          <div className="relative w-full">
            {/* The absolute "outlined" label, matching InputField */}
            <label
              htmlFor="phoneNumber"
              className="absolute -top-2.5 left-3 text-[16px] text-[var(--medium-text)] bg-white px-1 z-10"
            >
              Phone Number
              <span className="text-red-500">*</span>
            </label>

            {/* The "box" that contains both select and input.
                We apply all border, focus, and rounded styles here.
            */}
            <div className="flex w-full border-2 border-[#E5E7EA] focus-within:border-[var(--medium-text)] focus-within:ring-1 focus-within:ring-[var(--medium-text)] focus-within:outline-none">
              {/* Country Code Select */}
              <div className="relative">
                <select
                  name="phoneCountry"
                  value={formData.phoneCountry}
                  onChange={handleChange}
                  // Apply matching font/text styles, remove default appearance
                  className="w-20 pl-3 pr-1 py-[14px] appearance-none bg-transparent border-none focus:outline-none focus:ring-0 text-base text-[#999999] font-urbanist"
                >
                  <option value="+91">+91</option>
                  <option value="+1">+1</option>
                  <option value="+44">+44</option>
                </select>
                {/* Arrow for the select */}
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2 text-gray-700">
                  <svg
                    className="fill-current h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                  </svg>
                </div>
              </div>

              {/* Vertical divider */}
              <div className="border-r-2 border-[#E5E7EA] my-3"></div>{' '}
              {/* Adjusted padding to my-3 */}
              {/* Phone Number Input */}
              <input
                type="tel"
                id="phoneNumber" // ID for the label's htmlFor
                name="phoneNumber"
                placeholder="Enter Phone Number"
                value={formData.phoneNumber}
                onChange={handleChange}
                required
                // Apply matching font/text styles, remove default appearance
                className="flex-1 rounded-none w-full px-3 py-[14px] bg-transparent border-none focus:outline-none focus:ring-0 text-base text-[#999999] font-urbanist placeholder-[#999999]"
              />
            </div>
          </div>

          <InputField
            label="Your Organization / Company Name"
            id="organization"
            name="organization"
            placeholder="Enter Your Organization / Company Name"
            value={formData.organization}
            onChange={handleChange}
            required
          />
          <SelectField
            label="Your Role"
            id="role"
            name="role"
            value={formData.role}
            onChange={handleChange}
            options={roleOptions}
            placeholder="Select Your Role"
            required
          />

          {/* Location Select */}
          <SelectField
            label="Location"
            id="location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            options={locationOptions}
            placeholder="Select Location"
            required
          />

        </div>


        {/* --- Section 3: About You --- */}
        <div className="lg:col-span-1">
          <h2 className="xl:text-[32px] md:text-[24px] text-[20px] font-semibold text-black">Share Your Thoughts</h2>
        </div>
        <div className="lg:col-span-2 space-y-6"> {/* CHANGED: from lg:col-span-1 to lg:col-span-2 */}

          <div className="relative w-full">
            <label
              htmlFor="message"
              className="absolute -top-2.5 left-3 text-[16px] text-[var(--medium-text)] bg-white px-1 z-10"
            >
              Your Message
              <span className="text-red-500">*</span>
            </label>

            {/* The textarea with matching styles */}
            <textarea
              id="message"
              name="message"
              rows={4}
              placeholder="Tell us what’s on your mind, a vision, a challenge, or even just an idea."
              value={formData.message}
              onChange={handleChange}
              required
              // Apply all the styles from InputField
              className="w-full border-2 border-[#E5E7EA] px-3 py-[14px] text-base text-[#999999] font-urbanist placeholder-[#999999] focus:border-[var(--medium-text)] focus:ring-1 focus:ring-[var(--medium-text)] focus:outline-none transition-colors"
            />
          </div>




        </div>

        {/* --- Section 5: Submission --- */}
        <div className="lg:col-span-1">
          {/* Empty cell for layout, aligns the button to the right column */}
        </div>
        <div className="lg:col-span-2 space-y-6"> {/* CHANGED: from lg:col-span-1 to lg:col-span-2 */}
          {/* Privacy Agreement */}


          {/* Submit Button */}
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
    </div>
  );
};

export default StartPilotForm;