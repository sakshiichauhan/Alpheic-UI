import React from "react";
import leftImageSrc from "@/assets/AboutUsPage/WhoWeAre1.jpg";
import rightImageSrc from "@/assets/AboutUsPage/WhoWeAre2.jpg";

type WhoWeAreProps = {
  leftImageAlt?: string;
  rightImageAlt?: string;
  className?: string;
};

const WhoWeAre: React.FC<WhoWeAreProps> = ({
  leftImageAlt = "Tech visualization",
  rightImageAlt = "Team collaboration",
  className = "",
}) => {
  return (
    <section className={`w-full bg-white ${className}`} aria-labelledby="who-heading">
      <div className="px-4 sm:px-6 md:px-12 lg:px-[80px] xl:px-[120px] 2xl:px-[200px] 
      2xl:py-[120px] xl:py-[100px] lg:py-[80px] md:py-[60px] sm:py-[52px] py-[40px] flex flex-col 2xl:gap-[48px] xl:gap-[40px] lg:gap-[32px] md:gap-[28px] sm:gap-[24px] gap-[16px]">
        {/* Heading + tagline */}
        <div className="flex flex-col md:items-start items-center lg:gap-[24px] md:gap-[20px] sm:gap-[18px] gap-[16px]">
           <h2
             id="who-heading"
             className="text-center md:text-left 2xl:text-[72px] xl:text-[60px] lg:text-[48px] md:text-[40px] sm:text-[38px] text-[32px] font-semibold tracking-tight text-black"
           >
             Who We Are
           </h2>
           <p className="text-center md:text-left 2xl:text-[32px] xl:text-[28px] lg:text-[24px] md:text-[20px] sm:text-[16px] text-[14px] text-black">
             <span className="font-semibold">Alpheric</span> is where engineering meets
             empathy, and innovation meets identity.
           </p>
        </div>

        {/* Content row */}
        <div className="flex md:flex-row flex-col 2xl:gap-[48px] xl:gap-[40px] lg:gap-[32px] md:gap-[28px] sm:gap-[24px] gap-[16px]">
          {/* Two images on the left */}
          <div className="w-full md:w-fit">
            <div className="flex justify-between xl:gap-[24px] lg:gap-[20px] md:gap-[16px] sm:gap-[14px] gap-[12px]">
              <div className="2xl:w-[237px] xl:w-[220px] lg:w-[200px] md:w-[180px] w-full">
                <img
                  src={leftImageSrc}
                  alt={leftImageAlt}
                  className="block 2xl:h-[237px] xl:h-[220px] lg:h-[200px] md:h-[180px] h-full 2xl:w-[237px] xl:w-[220px] lg:w-[200px] md:w-[180px] w-full md:object-cover object-contain"
                />
              </div>
              <div className="2xl:w-[237px] xl:w-[220px] lg:w-[200px] md:w-[180px] w-full">
                <img  
                  src={rightImageSrc}
                  alt={rightImageAlt}
                  className="block 2xl:h-[237px] xl:h-[220px] lg:h-[200px] md:h-[180px] h-full 2xl:w-[237px] xl:w-[220px] lg:w-[200px] md:w-[180px] w-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* Paragraphs on the right */}
          <div className="w-full flex flex-col items-center justify-center">
            <p className="2xl:text-[24px] xl:text-[20px] lg:text-[18px] md:text-[16px] sm:text-[14px] text-[12px] text-[var(--medium-text)] font-urbanist">
              We blend logic, design, and trust to create unified digital ecosystems
              that help startups, enterprises, and institutions grow sustainably.
            </p>
            <p className="2xl:text-[24px] xl:text-[20px] lg:text-[18px] md:text-[16px] sm:text-[14px] text-[12px] text-[var(--medium-text)] font-urbanist">
              We don’t just build technology — we build platforms that connect people,
              simplify complexity, and amplify impact.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhoWeAre;
