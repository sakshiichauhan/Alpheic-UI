import React from 'react';
import { Phone } from 'lucide-react'; // Make sure you have lucide-react

const ThankYouMessage: React.FC = () => {
  return (
    // Content Container
    <div className="relative z-10 flex flex-col items-center space-y-6  text-center">
      
      {/* "You're Already A Step Closer!" */}
      <p className="xl:text-[48px] lg:text-[40px] md:text-[36px] text-[32px]  font-instrument-serif-italics text-black">
        You're Already A Step Closer!
      </p>
      
      {/* "Thank You For Believing In Us!" */}
      <h1 className="xl:text-[84px] lg:text-[70px] md:text-[56px] text-[40px] font-semibold text-black ">
        Thank You For<br />Believing In Us!
      </h1>
      
      {/* "We're on it!..." */}
      <p className="xl:text-[24px] lg:text-[20px] md:text-[18px] text-[14px] font-urbanist text-[var(--hero-text)]">
        We're on it! A team member will be in touch soon. Meanwhile, check out our work!
      </p>
      

      <p className="xl:text-[24px] lg:text-[20px] md:text-[18px] text-[14px] font-urbanist text-[var(--hero-text)] flex items-center w-full gap-2">
        <span className='bg-[#E5E5E5] w-full h-[1px] block'></span>OR
        <span className='bg-[#E5E5E5] w-full h-[1px] block'></span>
      </p>

      {/* Booking Box */}
      <div
        className="w-full border-[3px] border-transparent bg-[var(--color)]/10 lg:py-5 md:py-3 py-2 lg:px-8 md:px-6 px-4"
        style={{ borderImage: 'linear-gradient(to right, var(--color), transparent) 1' }}
      >
        <div className="flex items-center justify-between gap-4 flex-row">
        
          {/* Left Side */}
          <div className="flex-1 text-left flex flex-col justify-start gap-3">
            <h3 className="flex items-center justify-center gap-2 xl:text-[32px] lg:text-[28px] md:text-[24px] text-[20px] font-semibold text-black sm:justify-start">
              <Phone className="text-black xl:w-8 lg:w-6 w-5" strokeWidth={0.5} fill="black" />
              Let's talk Tomorrow
            </h3>
            <p className="font-urbanist xl:text-[24px] lg:text-[20px] md:text-[16px] text-[12px] flex items-center gap-2">
              <span className="bg-black xl:w-[28px] lg:w-[24px] md:w-[20px] w-[16px] lg:h-[4px] md:h-[3px] h-[2px] block"></span>
              <span className="font-semibold text-black">15 minutes to see if we're a fit.</span>
            </p>
          </div>

          {/* Right Side - Button */}
          <div className="mt-4 sm:mt-0">
            <a
              href="/book-call" // Change this link
              className="whitespace-nowrap bg-black lg:px-8 md:px-6 px-4 lg:py-4 md:py-3 py-2 xl:text-[24px] lg:text-[20px] md:text-[18px] text-[14px] text-white transition-colors"
            >
              Book Now
            </a>
          </div>
        </div>
      </div>

    </div>
  );
};

export default ThankYouMessage;