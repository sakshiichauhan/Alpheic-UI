import React, { useState } from 'react';
import InputField from '@/Components/InputField';
import SelectField from '@/Components/SelectField';
import Checkbox from '@/Components/Checkbox';
import RadioButton from '@/Components/RadioButton';

// Define the shape of our form data
interface FormData {
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
const CompanytypeOptions = [
  { value: 'startup', label: 'Startup' },
  { value: 'scaleup', label: 'Scaleup' },
  { value: 'enterprise', label: 'Enterprise' },
  { value: 'smb', label: 'SMB' },
  { value: 'other', label: 'Other' },
];
const industrySectorOptions = [
  { value: 'tech', label: 'Tech' },
  { value: 'finance', label: 'Finance' },
  { value: 'healthcare', label: 'Healthcare' },
  { value: 'other', label: 'Other' },
];
const companySizeOptions = [
  { value: '1-10', label: '1-10' },
  { value: '11-50', label: '11-50' },  
  { value: '51-200', label: '51-200' },
  { value: '201-1000', label: '201-1000' },
  { value: '1001-plus', label: '1001+' },
];
const howDidYouHearAboutUsOptions = [
  { value: 'social-media', label: 'Social Media' },
  { value: 'search-engine', label: 'Search Engine' },
  { value: 'referral', label: 'Referral' },
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

const projectTimelineOptions = [
  { value: 'placeholder_now', label: 'Placeholder' },
  { value: 'placeholder_next', label: 'Placeholder' },
  { value: 'placeholder_later', label: 'Placeholder' },
  { value: 'placeholder_future', label: 'Placeholder' },
];

const estimatedBudgetOptions = [
  { value: 'under-5l', label: 'Under Rs 5L' },
  { value: '5l-15l', label: 'Rs 5L–Rs 15L' },
  { value: '15l-50l', label: 'Rs 15L–Rs 50L' },
 
  { value: '50l-plus', label: 'Rs 50L+' },
  { value: 'not-decided', label: 'Not Decided' },
];

// Initial state for the form
const initialFormData: FormData = {
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
const BusinessInquiry: React.FC = () => {
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
  const handleServiceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      services: {
        ...prev.services,
        [name]: checked,
      },
    }));
  };

  // Handler for the 'agreeToPrivacy' checkbox
  const handlePrivacyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      agreeToPrivacy: e.target.checked,
    }));
  };

  // Form submission handler
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Form Submitted:', formData);
    // Here you would typically send the data to your backend API
    alert('Form submitted! Check the console for the data.');
  };

  return (
    <div className="2xl:px-[200px] xl:px-[120px] lg:px-[80px] md:px-[40px] sm:px-[20px] px-[10px] 2xl:py-[84px] xl:py-[72px] lg:py-[60px] md:py-[52px] py-[40px] font-sans">
       <div className="relative inline-flex gap-2 mb-4 flex-wrap">
            <h1
              id="ux-heading"
              className="text-[28px] sm:text-[32px] md:text-6xl lg:text-7xl 2xl:text-[64px] font-semibold text-[#000000] leading-tight inline-block "
            >
           New Business Inquiry
            </h1>
          
          </div>

          {/* First paragraph */}
          <p className="text-[13px] sm:text-[15px] md:text-xl lg:text-[24px] text-[#3E3E3E]  font-urbanist font-light  leading-relaxed mb-6">
          Clean. Conversational. Easy to Fill.
          </p>
        
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

        <div className="lg:col-span-1">
          <h2 className="xl:text-[32px] md:text-[24px] text-[20px] font-semibold text-black">
          About Your Business
          </h2>
        </div>
        <div className="lg:col-span-2 space-y-6">{/* CHANGED: from lg:col-span-1 to lg:col-span-2 */}

          <SelectField
            label="Company Type"
            id="companyType"
            name="companyType"
            value={formData.companyType}
            onChange={handleChange}
            options={CompanytypeOptions}
            placeholder="Select Company Type"
            required
          />
             <SelectField
            label="Industry/Sector"
            id="industrySector"
            name="industrySector"
            value={formData.industrySector}
            onChange={handleChange}
            options={industrySectorOptions}
            placeholder="Select Industry/Sector"
            required
          />
          <SelectField
            label="Company Size"
            id="companySize"
            name="companySize"
            value={formData.companySize}
            onChange={handleChange}
            options={companySizeOptions}
            placeholder="Select Company Size"
            required
          />
           
        
          
             <SelectField
            label="How Did You Hear About Us?"
            id="howDidYouHearAboutUs"
            name="howDidYouHearAboutUs"
            value={formData.howDidYouHearAboutUs}
            onChange={handleChange}
            options={howDidYouHearAboutUsOptions}
            placeholder="Select How Did You Hear About Us?"
            required
          />
        
        </div>

        {/* --- Section 3: About You --- */}
        <div className="lg:col-span-1">
          <h2 className="xl:text-[32px] md:text-[24px] text-[20px] font-semibold text-black">Project Overview</h2>
        </div>
        <div className="lg:col-span-2 space-y-6"> {/* CHANGED: from lg:col-span-1 to lg:col-span-2 */}
          <InputField
            label="Project Name/Title"
            id="fullName"
            name="fullName"
            placeholder="Enter Project Name/Title"
            value={formData.fullName}
            onChange={handleChange}
            required
          />
            <div className="relative w-full">
            <label
              htmlFor="message"
              className="absolute -top-2.5 left-3 text-[16px] text-[var(--medium-text)] bg-white px-1 z-10"
            >
             Objective or Challenge
              <span className="text-red-500">*</span>
            </label>

            {/* The textarea with matching styles */}
            <textarea
              id="message"
              name="message"
              rows={4}
              placeholder="What are you trying to achieve? Briefly describe your vision or problem."
              value={formData.message}
              onChange={handleChange}
              required
              // Apply all the styles from InputField
              className="w-full border-2 border-[#E5E7EA] px-3 py-[14px] text-base text-[#999999] font-urbanist placeholder-[#999999] focus:border-[var(--medium-text)] focus:ring-1 focus:ring-[var(--medium-text)] focus:outline-none transition-colors"
            />
          </div>
          
          <div className="lg:col-span-1 ">
          <div className="xl:text-[16px] md:text-[24px] text-[20px] font-semibold text-black ">
          How did you hear about Alpheric?
          </div>
        </div>
        <div className="lg:col-span-2"> {/* CHANGED: from lg:col-span-1 to lg:col-span-2 */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {serviceOptions.map((service) => (
              <Checkbox
                key={service.key}
                label={service.label}
                id={`service-${service.key}`}
                name={service.key}
                checked={!!formData.services[service.key]}
                onChange={handleServiceChange}
              />
            ))}
          </div>
          <div className="xl:text-[16px] md:text-[24px] text-[20px] font-semibold text-black mt-4">
          Project Timeline
          </div>
        </div>
        <div className="lg:col-span-2"> {/* CHANGED: from lg:col-span-1 to lg:col-span-2 */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {projectTimelineOptions.map((option) => (
              <RadioButton
                key={option.value}
                label={option.label}
                id={`timeline-${option.value}`}
                name="projectTimeline"
                value={option.value}
                checked={formData.projectTimeline === option.value}
                onChange={handleChange}
              />
            ))}
          </div>
          <div className="xl:text-[16px] md:text-[24px] text-[20px] font-semibold text-black mt-4">
          Estimated Budget
          </div>
        </div>
        <div className="lg:col-span-2"> {/* CHANGED: from lg:col-span-1 to lg:col-span-2 */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {estimatedBudgetOptions.map((option) => (
              <RadioButton
                key={option.value}
                label={option.label}
                id={`budget-${option.value}`}
                name="estimatedBudget"
                value={option.value}
                checked={formData.estimatedBudget === option.value}
                onChange={handleChange}
              />
            ))}
          </div>
          
        </div>


        </div>

        {/* --- Section 4: Share Your Thoughts --- */}
        <div className="lg:col-span-1">
          <h2 className="xl:text-[32px] md:text-[24px] text-[20px] font-semibold text-black">
          Additional Information
          </h2>
        </div>
        <div className="lg:col-span-2 space-y-6"> {/* CHANGED: from lg:col-span-1 to lg:col-span-2 */}
        

          <div>
            <label
              htmlFor="file-upload"
              className="flex flex-col items-center justify-center w-full pb-0 p-4 space-y-2 border-2 border-[#E5E7EA] text-center cursor-pointer transition-colors focus-within:border-[var(--medium-text)] focus-within:ring-1 focus-within:ring-[var(--medium-text)] focus-within:outline-none"
            >
              {/* Top part: Icon + Title */}
              <div className="flex items-center justify-center gap-[8px]">
                {/* Upload Icon SVG */}
                <svg
                  className="w-[24px] h-[24px] text-[var(--color)]"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
                  />
                </svg>
                <span className="text-[16px] text-black ">
                  Attach Files (Optional)
                </span>
              </div>

              {/* Drag and drop text with "Browse" button */}
              <p className="text-[14px] text-[var(--medium-text)] font-urbanist">
                Drag and drop files here or{' '}
                <span className="inline-block px-4 py-1 border-2 border-[var(--color)] text-black transition-colors text-[14px] font-urbanist font-medium">
                  Browse
                </span>
              </p>

              {/* Helper text */}
              <p className="text-[14px] text-[var(--medium-text)] font-urbanist">
                Upload a brief, presentation, Profile or any supporting material
              </p>

              {/* Divider */}
              <hr className="w-full px-3 border-[#E5E7EA]" />

              {/* Supported formats text */}
              <p className="text-[14px] text-[var(--medium-text)] font-urbanist">
                Supported formats for upload: .pdf, .doc, .docx
              </p>

              {/* Hidden file input */}
              <input
                type="file"
                id="file-upload"
                className="hidden"
                multiple
              />
            </label>
            
          </div>
          <div className="relative w-full">
            <label
              htmlFor="message"
              className="absolute -top-2.5 left-3 text-[16px] text-[var(--medium-text)] bg-white px-1 z-10"
            >
              Anything else we should know?
              <span className="text-red-500">*</span>
            </label>

            {/* The textarea with matching styles */}
            <textarea
              id="message"
              name="message"
              rows={4}
              placeholder="Write if anything else we should know?


"
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
          <p className="text-[13px] sm:text-[15px] md:text-xl lg:text-[16px] text-[#3E3E3E]  font-urbanist font-light  leading-relaxed mb-6">
          💬 Once submitted, our team will review and connect with you for a quick discussion or a proposal outline within 24–48 hours.
          </p>
        </div>
      </form>
    </div>
  );
};

export default BusinessInquiry;