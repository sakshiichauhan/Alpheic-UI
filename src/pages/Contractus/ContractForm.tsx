import React, { useState } from "react";

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    companyName: "",
    mobileNumber: "",
    email: "",
    request: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);
    alert("Thank you for your message!");
  };


 

  return (
    <section className="bg-white 2xl:py-[64px] xl:py-[56px] lg:py-[48px] md:py-[40px] py-[32px] px-4 sm:px-6 md:px-12 lg:px-[80px] xl:px-[120px] 2xl:px-[200px]">
      <div className="mx-auto border-[2px] border-[var(--border-color)] overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2 relative">

          {/* === LEFT PANEL === */}
          <div className="bg-white p-[48px] flex flex-col gap-[12px]">
            <h2 className="text-[72px] font-semibold text-black">
              Get in Touch
            </h2>
            <p className="text-[var(--medium-text)] text-[28px] font-semibold font-urbanist">
              From Cyber Security to Design, from Technology to Hosting.
              One ecosystem with infinite possibilities.
            </p>
            <p className="text-[var(--medium-text)] text-[24px] font-urbanist">
              Let’s create something meaningful, secure, and future-ready together.
            </p>
          </div>

          {/* === MID DIVIDER LINE === */}
          <div className="hidden lg:flex absolute left-1/2 top-[10%] h-[80%] w-[2px] bg-gray-200 -translate-x-1/2"></div>

          {/* === RIGHT FORM === */}
          <div className="p-10 sm:p-12">
            <form onSubmit={handleSubmit} className="space-y-8">

              {/* === Input Template === */}
              {[
                { label: "Fullname", name: "fullName", type: "text" },
                { label: "Company Name", name: "companyName", type: "text" },
              ].map((field) => (
                <div key={field.name} className="relative">
                  <label
                    htmlFor={field.name}
                    className="absolute -top-2 left-4 text-[16px] font-medium text-[var(--medium-text)] bg-white px-1"
                  >
                    {field.label} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type={field.type}
                    id={field.name}
                    name={field.name}
                    placeholder={`Enter ${field.label}`}
                    value={(formData as any)[field.name]}
                    onChange={handleChange}
                    required
                    className="w-full border border-gray-300 rounded-md px-4 py-3 text-sm text-gray-900 placeholder-gray-400 focus:border-black focus:ring-1 focus:ring-black"
                  />
                </div>
              ))}

              {/* === MOBILE NUMBER (with dropdown) === */}
              <div className="relative">
                <label
                  htmlFor="mobileNumber"
                  className="absolute -top-2 left-4 text-xs font-medium text-gray-500 bg-white px-1"
                >
                  Mobile Number <span className="text-red-500">*</span>
                </label>
                <div className="flex border border-gray-300 rounded-md focus-within:border-black focus-within:ring-1 focus-within:ring-black">
                  <select
                    disabled
                    className="px-3 bg-gray-50 text-gray-500 text-sm border-r border-gray-300 outline-none cursor-not-allowed"
                  >
                    <option value="+91">+91</option>
                  </select>
                  <input
                    type="tel"
                    name="mobileNumber"
                    placeholder=""
                    value={formData.mobileNumber}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-3 text-sm text-gray-900 border-0 focus:ring-0"
                  />
                </div>
              </div>

              {/* === EMAIL === */}
              <div className="relative">
                <label
                  htmlFor="email"
                  className="absolute -top-2 left-4 text-xs font-medium text-gray-500 bg-white px-1"
                >
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder=""
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-md px-4 py-3 text-sm text-gray-900 placeholder-gray-400 focus:border-black focus:ring-1 focus:ring-black"
                />
              </div>

              {/* === YOUR REQUEST === */}
              <div className="relative">
                <label
                  htmlFor="request"
                  className="absolute -top-2 left-4 text-xs font-medium text-gray-500 bg-white px-1"
                >
                  Your Request <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="request"
                  name="request"
                  rows={3}
                  placeholder=""
                  value={formData.request}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-md px-4 py-3 text-sm text-gray-900 placeholder-gray-400 focus:border-black focus:ring-1 focus:ring-black"
                ></textarea>
              </div>

              {/* === SUBMIT BUTTON === */}
              <div>
                <button
                  type="submit"
                  className="bg-black text-white px-8 py-3 rounded-md text-sm font-medium hover:bg-gray-800 transition"
                >
                  Submit
                </button>
              </div>

            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
