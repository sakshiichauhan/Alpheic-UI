import React, { useState } from 'react';
import { ChevronDown, ArrowUpRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ContactFormSection = () => {
  const [industry, setIndustry] = useState('');
  const [email, setEmail] = useState('');
  const navigate = useNavigate();
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/thank-you/contact');
  };

  return (
    <section className="bg-white px-4 sm:px-6 md:px-12 lg:px-[80px] xl:px-[120px] 2xl:px-[200px] py-[40px] md:py-[52px] lg:py-[60px] xl:py-[72px] 2xl:py-[84px]">
      <div className="flex flex-col border-[3px] border-[#CCEEF4] px-4 py-6 sm:px-10 sm:py-12 md:px-[64px] md:py-[71px]">

        {/* ✅ FLEX layout instead of grid, preventing shrinking and preserving desktop */}
        <div className="
          flex 
          flex-col 
          lg:flex-row 
          items-start lg:items-center 
          gap-10 sm:gap-[50px] md:gap-[80px] xl:gap-[100px] 2xl:gap-[200px]
        ">

          {/* LEFT CONTENT — does NOT shrink */}
          <div className="flex-none w-full lg:w-auto flex flex-col gap-2 md:gap-[16px] text-left">
            <h2 className="text-[28px] sm:text-[38px] md:text-[48px] xl:text-[50px] 2xl:text-[72px] font-semibold text-black leading-tight">
              Ready to talk?
            </h2>

            <p className="text-[14px] sm:text-[18px] md:text-[20px] lg:text-[24px] text-[var(--medium-text)] font-urbanist">
              I want to talk to your experts in:
            </p>

            <div className="relative">
              <select
                id="industry-select"
                value={industry}
                onChange={(e) => setIndustry(e.target.value)}
                className="block w-full bg-transparent p-3 md:p-[12px] pr-[40px] border-b-2 border-[var(--color)] text-[14px] sm:text-[16px] text-[#000000] font-urbanist appearance-none focus:outline-none"
              >
                <option value="" disabled>Select an industry</option>
                <option value="Technology">Technology</option>
                <option value="Finance">Finance</option>
                <option value="Healthcare">Healthcare</option>
                <option value="Retail">Retail</option>
              </select>

              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 sm:w-6 sm:h-6 pointer-events-none text-[#9EA2AE]" />
            </div>
          </div>

          {/* RIGHT CONTENT — grows/shrinks safely */}
          <div className="flex-1 flex flex-col text-left gap-4 md:gap-[20px]">
            <p className="text-[14px] sm:text-[16px] md:text-[20px] xl:text-[24px] text-[var(--hero-text)] font-urbanist leading-normal">
              We work as one team to help businesses grow with clarity, creativity, and technology.
            </p>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4 md:gap-[20px]">
              <input
                type="email"
                placeholder="Your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-3 py-3 text-[14px] sm:text-[16px] text-[var(--medium-text)] font-urbanist border border-[#E5E7EA] focus:outline-[var(--color)]"
              />

              {/* ✅ full width on mobile, auto on desktop */}
              <button
              type="submit"
              className="bg-black text-white text-[24px] font-urbanist px-8 py-2 flex items-center justify-center  w-auto hover:bg-gray-800 transition-colors self-start"
              >
              Contact Us
              <ArrowUpRight className="w-[32px] h-[32px]" />
              </button>
            </form>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ContactFormSection;
