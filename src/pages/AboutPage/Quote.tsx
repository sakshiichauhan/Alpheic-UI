import React from "react";
import QuoteLeft from "@/assets/AboutUsPage/QuoteLeft.png";
import QuoteRight from "@/assets/AboutUsPage/QuoteRight.png";

type QuoteProps = {
  className?: string;
  quoteColorClass?: string; 
};

const Quote: React.FC<QuoteProps> = ({
  className = "",
  quoteColorClass = "text-[#5AC8DC]",
}) => {
  return (
    <section className={`w-full bg-white px-4 sm:px-6 md:px-12 lg:px-[80px]xl:px-[120px] 2xl:px-[200px] ${className} 2xl:py-[180px] xl:py-[140px] lg:py-[100px] md:py-[80px] sm:py-[60px] py-[40px]`} aria-label="Quote">
      <div className="mx-auto w-full flex flex-col items-center justify-center">
        <div className="flex flex-row items-center">
          <img src={QuoteLeft} alt="Quote Left" className={` block max-[390px]:hidden  2xl:h-[40px] xl:h-[32px] lg:h-[28px] md:h-[24px] sm:h-[20px] h-[16px] w-auto object-contain mb-auto  ${quoteColorClass}`} />
          <div className="2xl:px-[64px] xl:px-[56px] lg:px-[48px] md:px-[28px] sm:px-[20px] px-[12px]">
            <p className="min-w-[281px] text-center 2xl:text-[40px] xl:text-[32px] lg:text-[28px] md:text-[24px] sm:text-[20px] text-[16px] font-semibold text-[#1D1D1D]">
            From securing systems to designing <br className="block lg:hidden"/>experiences, <br className="hidden lg:block"/>
            we build what the future <br className="block lg:hidden"/>runs on.
            </p>
          </div>
          <img src={QuoteRight} alt="Quote Right" className={` block max-[390px]:hidden 2xl:h-[40px] xl:h-[32px] lg:h-[28px] md:h-[24px] sm:h-[20px] h-[16px] w-auto object-contain mt-auto ${quoteColorClass}`} />
        </div>
      </div>
    </section>
  );
};

export default Quote;
