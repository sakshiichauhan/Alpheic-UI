import React from "react";
import imageSrc from "@/assets/ServicePage/HumanCenter.png";

type HumanCenterProps = {
  imageAlt?: string;
  className?: string;
};

const HumanCenter: React.FC<HumanCenterProps> = ({
  imageAlt = "Team collaborating in an office",
  className = "",
}) => {
  return (
    <section
      className={`w-full bg-zinc-50 ${className}`}
      aria-label="Company sub-hero"
    >
      <div className="px-4 sm:px-8 md:px-16 2xl:px-0 xl:px-0 bg-[#F7FCFD] ">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-8 md:gap-[84px] justify-between">

          {/* Image - First on mobile, Right on desktop */}
          <div className="w-full md:w-[960px] flex flex-col justify-center order-1 md:order-2">
            <div className="relative w-full h-full flex justify-center md:justify-end">
              <img
                src={imageSrc}
                alt={imageAlt}
                className="w-[280px] sm:w-[340px] md:w-[720px] lg:w-[820px] xl:w-[930px] 2xl:w-[960px] h-auto object-contain"
              />
            </div>
          </div>

          {/* Text Content - Below image on mobile, Left on desktop */}
          <div className="w-full 2xl:w-[820px]  flex flex-col justify-center order-2 md:order-1 px-4 sm:px-8 md:px-0 pt-4 md:pt-0 lg:px-16 text-left">
            <h1 className="text-[24px] sm:text-[28px] md:text-5xl lg:text-5xl xl:text-[54px] font-medium text-[#000000] leading-tight font-instrument-sans">
              Design that feels right, <br />
              not just looks right.
            </h1>

            <p className="text-[14px] sm:text-[16px] md:text-xl lg:text-2xl text-[#3E3E3E] font-normal font-urbanist leading-relaxed mt-2 md:mt-3">
              Human-centered, data-driven design that delivers measurable results.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
};

export default HumanCenter;
