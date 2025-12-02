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
    <section className={`w-full ${className} 2xl:py-[84px] xl:py-[72px] lg:py-[60px] md:py-[52px] py-[40px]`}>
      
      {/* -------------------- SECTION 1: IMAGE RIGHT -------------------- */}
      <div className="w-full bg-zinc-50  hidden lg:block">
        <div className="py-0 bg-[#F7FCFD] pr-0">
          <div className="flex lg:flex-row flex-col-reverse items-center 2xl:gap-[74px] xl:gap-[50px] lg:gap-[20px] md:gap-[54px] sm:gap-[48px] gap-[40px] justify-between">
            {/* Text */}
            <div className="w-full items-center px-4 sm:px-6 md:px-12 lg:pl-[2px] xl:pl-[100px] 2xl:pl-[150px] lg:pb-0 md:pb-[54px] sm:pb-[48px] pb-[40px]">
              <h1 className="2xl:text-[54px] xl:text-[40px] lg:text-[40px] md:text-[32px] sm:text-[28px] text-[24px] font-medium text-[#000000] leading-tight font-instrument-sans">
                Design that feels right,
                <br />
                not just looks right.
              </h1>
              <p className="2xl:text-2xl xl:text-[20px] lg:text-2xl md:text-[20px] sm:text-[16px] text-[14px] text-[#3E3E3E] font-normal font-urbanist leading-relaxed mt-2 md:mt-3">
                Human-centered, data-driven design that delivers measurable results.
              </p>
            </div>

            {/* Image */}
            <div className="w-full items-right">
              <div className="relative bg-white">
                <img
                  src={imageSrc}
                  alt={imageAlt}
                  className="h-full  lg:min-w-[50vw] w-full  object-cover lg:ml-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* -------------------- SECTION 2: IMAGE LEFT -------------------- */}
      <div className="w-full bg-white">
        <div className="py-0 pr-0">
          <div className="flex lg:flex-row flex-col items-center 2xl:gap-[74px] xl:gap-[50px] lg:gap-[20px] md:gap-[54px] sm:gap-[48px] gap-[40px] justify-between">
            {/* Image */}
            <div className="w-full items-left">
              <div className="relative bg-white">
                <img
                  src={imageSrc}
                  alt={imageAlt}
                  className="h-full  lg:min-w-[50vw] w-full object-contain lg:mr-auto"
                />
              </div>
            </div>

            {/* Text */}
            <div className="w-full items-center px-4 sm:px-6 md:px-12 lg:pr-[15px] xl:pr-[60px] 2xl:pr-[60px] lg:pb-0 md:pb-[54px] sm:pb-[48px] pb-[40px]">
              <h1 className="2xl:text-[54px] xl:text-[40px] lg:text-[40px] md:text-[32px] sm:text-[28px] text-[24px] font-medium text-[#000000] leading-tight font-instrument-sans">
                Design that feels right,
                <br />
                not just looks right.
              </h1>
              <p className="2xl:text-2xl xl:text-[20px] lg:text-2xl md:text-[20px] sm:text-[16px] text-[14px] text-[#3E3E3E] font-normal font-urbanist leading-relaxed mt-2 md:mt-3">
                Human-centered, data-driven design that delivers measurable results.
              </p>
            </div>
          </div>
        </div>
      </div>

    </section>
  );
};

export default HumanCenter;
