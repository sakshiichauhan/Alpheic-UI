import React from 'react';
import bg from '@/assets/CareerPage/bg2.jpg';
import { ArrowUpRight } from 'lucide-react';

const ExternalLinkIcon = () => <ArrowUpRight size={20} />;

const ReadyToGrow: React.FC = () => {
  return (
    <section className="relative bg-white py-10 md:py-14 lg:py-16 px-4 sm:px-6 md:px-12 lg:px-20 xl:px-[120px] 2xl:px-[200px] overflow-hidden font-sans">
      {/* Outer Container */}
      <div className="relative w-full h-full border-2 border-[var(--color)] py-12 px-4 sm:px-8 md:px-16 lg:px-[100px] xl:px-[200px]">
        {/* Background Image */}
        <img
          src={bg}
          alt="Abstract network graphic"
          className="absolute inset-0 w-full h-full object-cover opacity-30 z-0 grayscale rotate-180"
        />

        {/* Main Content */}
        <div className="relative z-10 text-center flex flex-col gap-8 sm:gap-10">
          {/* Headings */}
          <div className="flex flex-col items-center gap-4">
            <h2 className="text-[26px] sm:text-[36px] md:text-[48px] lg:text-[64px] font-semibold text-black leading-snug">
              Ready to <br className="sm:hidden" /> Grow with Us?
            </h2>
            <div className="text-[14px] sm:text-[16px] md:text-[18px] lg:text-[24px] font-urbanist text-[var(--medium-text)] leading-relaxed max-w-[340px] sm:max-w-none">
      Thousands trust us with their websites, their businesses, their stories.
      
  
      <br className="hidden xl:block" />
      
      If you believe in building with heart, backed by solid tech — you're in the right place.
    </div>
            <a
              href="mailto:careers@alpheric.com"
              className="block text-[16px] sm:text-[20px] md:text-[24px] lg:text-[28px] font-semibold text-black break-words"
            >
              careers@alpheric.com
            </a>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-center items-center flex-wrap gap-5 2xl:gap-15">
            <button className="flex items-center gap-2 sm:gap-3 text-[16px] sm:text-[20px] md:text-[22px] lg:text-[24px] font-medium text-black">
              Apply Now
              <span className="border-2 border-[var(--color)] p-1 sm:p-2">
                <ExternalLinkIcon />
              </span>
            </button>

            <div className="hidden sm:block h-[50px] w-[2px] bg-[#D2D3D7]" />

            <button className="flex items-center gap-2 sm:gap-3 text-[16px] sm:text-[20px] md:text-[22px] lg:text-[24px] font-medium text-black">
              Refer a Friend
              <span className="border-2 border-[var(--color)] p-1 sm:p-2">
                <ExternalLinkIcon />
              </span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReadyToGrow;
