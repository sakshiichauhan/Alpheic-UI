import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '@/store';
import { submitConsultingForm } from '@/store/Slice/letsTalkForm/ConsultingThunk';
import { submitInquiryForm } from '@/store/Slice/letsTalkForm/inquiryThunk';
import { submitSupportForm } from '@/store/Slice/letsTalkForm/supportThunk';
import { uploadFile } from '@/store/Slice/letsTalkForm/uploadThunk';
import { fetchServices } from '@/store/Slice/letsTalkForm/services';
import InputField from '@/Components/InputField';
import SelectField from '@/Components/SelectField';
import Checkbox from '@/Components/Checkbox';


// Define the shape of our form data
interface FormData {
  reason: string;
  services: Record<string, boolean>;
  fullName: string;
  email: string;
  phoneCountry: string;
  phoneNumber: string;
  organization: string;
  role: string;
  location: string;
  message: string;
  agreeToPrivacy: boolean;
}

// Initial state for the form - services will be initialized dynamically
const getInitialFormData = (): FormData => ({
  reason: '',
  services: {},
  fullName: '',
  email: '',
  phoneCountry: '+91',
  phoneNumber: '',
  organization: '',
  role: '',
  location: '',
  message: '',
  agreeToPrivacy: false,
});

// Data for our select fields
const reasonOptions = [
  { value: 'General Consultation', label: 'General Consultation' },
  { value: 'Project Inquiry', label: 'Project Inquiry' },
  { value: 'Support Request', label: 'Support Request' },
];

// const roleOptions = [
//   { value: 'cto', label: 'CTO' },
//   { value: 'engineer', label: 'Engineer' },
//   { value: 'manager', label: 'Project Manager' },
//   { value: 'other', label: 'Other' },
// ];

// const locationOptions = [
//   { value: 'na', label: 'North America' },
//   { value: 'eu', label: 'Europe' },
//   { value: 'asia', label: 'Asia' },
//   { value: 'other', label: 'Other' },
// ];


/**
 * The main contact form, built with reusable components.
 */
const ContactForm: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { loading: submitting, error: submitError, success } = useSelector(
    (state: RootState) => state.formSubmission
  );
  const { services, loading: servicesLoading, error: servicesError } = useSelector(
    (state: RootState) => state.services
  );
  const [formData, setFormData] = useState<FormData>(getInitialFormData());
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [uploadedFilePaths, setUploadedFilePaths] = useState<string[]>([]);
  const [uploading, setUploading] = useState(false);

  // Fetch services on component mount
  useEffect(() => {
    dispatch(fetchServices());
  }, [dispatch]);

  // Initialize services in form data when services are loaded
  useEffect(() => {
    if (services.length > 0) {
      setFormData((prev) => {
        const newServices: Record<string, boolean> = {};
        services.forEach((service) => {
          const key = service.name.toLowerCase();
          // Preserve existing checked state if service already exists
          newServices[key] = prev.services[key] || false;
        });
        return {
          ...prev,
          services: newServices,
        };
      });
    }
  }, [services]);

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

  // Handler for file upload
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    setSelectedFiles(files);
    setUploading(true);
    setUploadedFilePaths([]);

    try {
      const uploadPromises = files.map((file) => dispatch(uploadFile(file)).unwrap());
      const uploadResults = await Promise.all(uploadPromises);
      const filePaths = uploadResults
        .filter((result) => result && result.file_url)
        .map((result) => result.file_url);
      
      if (filePaths.length !== files.length) {
        throw new Error('Some files failed to upload. Please try again.');
      }
      
      setUploadedFilePaths(filePaths);
    } catch (error) {
      console.error('File upload error:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to upload files. Please try again.';
      alert(errorMessage);
      setSelectedFiles([]);
      setUploadedFilePaths([]);
    } finally {
      setUploading(false);
    }
  };

  // Handler for drag and drop
  const handleDrop = async (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files || []);
    if (files.length === 0) return;

    setSelectedFiles(files);
    setUploading(true);
    setUploadedFilePaths([]);

    try {
      const uploadPromises = files.map((file) => dispatch(uploadFile(file)).unwrap());
      const uploadResults = await Promise.all(uploadPromises);
      const filePaths = uploadResults
        .filter((result) => result && result.file_url)
        .map((result) => result.file_url);
      
      if (filePaths.length !== files.length) {
        throw new Error('Some files failed to upload. Please try again.');
      }
      
      setUploadedFilePaths(filePaths);
    } catch (error) {
      console.error('File upload error:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to upload files. Please try again.';
      alert(errorMessage);
      setSelectedFiles([]);
      setUploadedFilePaths([]);
    } finally {
      setUploading(false);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
  };

  // Form submission handler
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Prevent submission if files are still uploading
    if (uploading) {
      alert('Please wait for file uploads to complete before submitting.');
      return;
    }

    // Validate required fields
    if (!formData.reason) {
      alert('Please select a reason for contacting us.');
      return;
    }

    if (!formData.fullName.trim()) {
      alert('Please enter your full name.');
      return;
    }

    if (!formData.email.trim()) {
      alert('Please enter your email address.');
      return;
    }

    if (!formData.phoneNumber.trim()) {
      alert('Please enter your phone number.');
      return;
    }

    if (!formData.organization.trim()) {
      alert('Please enter your organization/company name.');
      return;
    }

    if (!formData.message.trim()) {
      alert('Please enter your message.');
      return;
    }

    if (!formData.agreeToPrivacy) {
      alert('Please agree to the Privacy Policy to continue.');
      return;
    }

    // Get selected services as an array of service names
    const selectedServices = Object.entries(formData.services)
      .filter(([_, checked]) => checked)
      .map(([serviceKey]) => {
        // Find the original service name from the services array
        const service = services.find(
          (s) => s.name.toLowerCase() === serviceKey
        );
        return service ? service.name : serviceKey;
      });

    // Prepare form data according to API requirements
    const apiFormData: any = {
      full_name: formData.fullName.trim(),
      email_address: formData.email.trim(),
      country_code: String(formData.phoneCountry).trim(),
      phone_number: formData.phoneNumber.trim(),
      company_name: formData.organization.trim(),
      message: formData.message.trim(),
      select_services: selectedServices.length > 0 ? selectedServices : [],
    };
    
    // Only include attachments if there are valid uploaded files
    if (uploadedFilePaths.length > 0) {
      apiFormData.attachments = uploadedFilePaths.filter(path => path && path.trim() !== '');
    }

    try {
      // Submit based on selected reason
      if (formData.reason === 'General Consultation') {
        await dispatch(submitConsultingForm(apiFormData)).unwrap();
      } else if (formData.reason === 'Project Inquiry') {
        await dispatch(submitInquiryForm(apiFormData)).unwrap();
      } else if (formData.reason === 'Support Request') {
        await dispatch(submitSupportForm(apiFormData)).unwrap();
      } else {
        throw new Error('Please select a valid reason for contacting us.');
      }

      // Show success message
      alert('Form submitted successfully!');
      
      // Reset form
      setFormData(getInitialFormData());
      setSelectedFiles([]);
      setUploadedFilePaths([]);
    } catch (error) {
      // Error is handled by the slice and displayed in the UI
      // Log additional details for debugging
      console.error('Form submission error:', error);
      console.error('Form data that was submitted:', apiFormData);
      
      // The error message will be displayed via the submitError state from Redux
      // No need for additional alert here as it's already shown in the UI
    }
  };

  return (
    <div className="2xl:px-[200px] xl:px-[120px] lg:px-[80px] md:px-[40px] sm:px-[20px] px-[10px] 2xl:py-[84px] xl:py-[72px] lg:py-[60px] md:py-[52px] py-[40px] font-sans">
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 lg:grid-cols-[minmax(400px,1fr)_1fr_1fr] xl:grid-cols-[minmax(500px,1fr)_1fr_1fr] 2xl:grid-cols-[minmax(550px,1fr)_1fr_1fr] xl:gap-x-10 2xl:gap-x-12 lg:gap-y-12 md:gap-y-8 gap-y-6">
        
        {/* --- Section 1: What Do You Want to Talk About? --- */}
        <div className="lg:col-span-1">
          <h2 className="xl:text-[32px] md:text-[24px] text-[20px] font-semibold text-black">
            What Do You Want to Talk About?
          </h2>
        </div>
        <div className="lg:col-span-2"> {/* CHANGED: from lg:col-span-1 to lg:col-span-2 */}
          <SelectField
            label="Choose Your Reason for Contacting Us"
            id="reason"
            name="reason"
            value={formData.reason}
            onChange={handleChange}
            options={reasonOptions}
            placeholder="Select Your Reason"
            layout="simple"
            required
          />
        </div>

        <div className="lg:col-span-1">
          <h2 className="xl:text-[32px] md:text-[24px] text-[20px] font-semibold text-black">
            Services You're Interested In
          </h2>
        </div>
        <div className="lg:col-span-2"> {/* CHANGED: from lg:col-span-1 to lg:col-span-2 */}
          {servicesLoading && (
            <div className="text-[var(--medium-text)]">Loading services...</div>
          )}
          {servicesError && (
            <div className="text-red-500">Error loading services: {servicesError}</div>
          )}
          {!servicesLoading && !servicesError && services.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
              {services.map((service) => {
                const serviceKey = service.name.toLowerCase();
                return (
                  <Checkbox
                    key={service.name}
                    label={service.name}
                    id={`service-${serviceKey}`}
                    name={serviceKey}
                    checked={formData.services[serviceKey] || false}
                    onChange={handleServiceChange}
                  />
                );
              })}
            </div>
          )}
          {!servicesLoading && !servicesError && services.length === 0 && (
            <div className="text-[var(--medium-text)]">No services available</div>
          )}
        </div>

        {/* --- Section 3: About You --- */}
        <div className="lg:col-span-1">
          <h2 className="xl:text-[32px] md:text-[24px] text-[20px] font-semibold text-black">About You</h2>
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

            {/* The "box" that contains both country code and phone number input.
                We apply all border, focus, and rounded styles here.
            */}
            <div className="flex w-full border-2 border-[#E5E7EA] focus-within:border-[var(--medium-text)] focus-within:ring-1 focus-within:ring-[var(--medium-text)] focus-within:outline-none">
              {/* Country Code Input */}
              <input
                type="text"
                name="phoneCountry"
                placeholder="+91"
                value={formData.phoneCountry}
                onChange={handleChange}
                className="w-20 pl-3 pr-3 py-[14px] bg-transparent border-none focus:outline-none focus:ring-0 text-base text-[#999999] font-urbanist placeholder-[#999999]"
              />

              {/* Vertical divider */}
              <div className="border-r-2 border-[#E5E7EA] my-3"></div>
              
              {/* Phone Number Input */}
              <input
                type="tel"
                id="phoneNumber" // ID for the label's htmlFor
                name="phoneNumber"
                placeholder="Enter 10-digit Phone Number"
                value={formData.phoneNumber}
                onChange={(e) => {
                  // Only allow digits and limit to 10 digits
                  const value = e.target.value.replace(/\D/g, '').slice(0, 10);
                  setFormData((prev) => ({
                    ...prev,
                    phoneNumber: value,
                  }));
                }}
                required
                maxLength={10}
                pattern="[0-9]{10}"
                // Apply matching font/text styles, remove default appearance
                className="flex-1 rounded-none w-full px-3 py-[14px] bg-transparent border-none focus:outline-none focus:ring-0 text-base text-[#999999] font-urbanist placeholder-[#999999]"
              />
            </div>
          </div>

          <InputField
            label="Company Name"
            id="organization"
            name="organization"
            placeholder="Enter Company Name"
            value={formData.organization}
            onChange={handleChange}
          />
          {/* <SelectField
            label="Your Role"
            id="role"
            name="role"
            value={formData.role}
            onChange={handleChange}
            options={roleOptions}
            placeholder="Select Your Role"
            required
          />

          Location Select 
          <SelectField
            label="Location"
            id="location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            options={locationOptions}
            placeholder="Select Location"
            required
          /> */}
        </div>

        {/* --- Section 4: Share Your Thoughts --- */}
        <div className="lg:col-span-1">
          <h2 className="xl:text-[32px] md:text-[24px] text-[20px] font-semibold text-black">
            Share Your Thoughts
          </h2>
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
              placeholder="Tell us what's on your mind, a vision, a challenge, or even just an idea"
              value={formData.message}
              onChange={handleChange}
              required
              // Apply all the styles from InputField
              className="w-full border-2 border-[#E5E7EA] px-3 py-[14px] text-base text-[#999999] font-urbanist placeholder-[#999999] focus:border-[var(--medium-text)] focus:ring-1 focus:ring-[var(--medium-text)] focus:outline-none transition-colors"
            />
          </div>

          <div>
            <label
              htmlFor="file-upload"
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              className="flex flex-col items-center justify-center w-full pb-0 p-4 space-y-2 border-2 border-[#E5E7EA] text-center cursor-pointer transition-colors hover:border-[var(--medium-text)] focus-within:border-[var(--medium-text)] focus-within:ring-1 focus-within:ring-[var(--medium-text)] focus-within:outline-none"
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
                Supported formats: .pdf, .doc, .docx, .jpg, .jpeg, .png, .gif, .bmp, .webp
              </p>

              {/* Hidden file input */}
              <input
                type="file"
                id="file-upload"
                className="hidden"
                multiple
                accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.gif,.bmp,.webp"
                onChange={handleFileChange}
                disabled={uploading || submitting}
              />
            </label>
            
            {/* Show uploaded files */}
            {selectedFiles.length > 0 && (
              <div className="mt-2 space-y-1">
                {selectedFiles.map((file, index) => (
                  <div key={index} className="text-[12px] text-green-600">
                    ✓ {file.name}
                  </div>
                ))}
              </div>
            )}
            
            {uploading && (
              <div className="mt-2 text-[12px] text-[var(--medium-text)]">
                Uploading files...
              </div>
            )}
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
                <span className="text-red-500">*</span>
              </span>
            }
            id="agreeToPrivacy"
            name="agreeToPrivacy"
            checked={formData.agreeToPrivacy}
            onChange={handlePrivacyChange}
          />

          {/* Error Message */}
          {submitError && (
            <div className="p-4 bg-red-50 border-2 border-red-200 rounded text-red-700 text-sm font-urbanist">
              <strong>Error:</strong> {submitError}
            </div>
          )}

          {/* Success Message */}
          {success && (
            <div className="p-4 bg-green-50 border-2 border-green-200 rounded text-green-700 text-sm font-urbanist">
              <strong>Success:</strong> Your form has been submitted successfully!
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="flex items-center justify-center lg:text-[24px] md:text-[20px] text-[16px] md:px-8 px-4 md:py-[10px] py-[8px] bg-black text-white font-urbanist hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={!formData.agreeToPrivacy || submitting || uploading}
          >
            {submitting ? 'Submitting...' : 'Submit'}
            {/* Arrow Icon */}
            {!submitting && (
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
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ContactForm;