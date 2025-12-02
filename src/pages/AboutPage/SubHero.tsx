import React from "react";
import imageSrc from "@/assets/dummy2.png";

type SubHeroProps = {
  imageAlt?: string;
  className?: string; 
};

const SubHero: React.FC<SubHeroProps> = ({
  imageAlt = "Team collaborating in an office",
  className = "",
}) => {
  return (
    <section
      className={`w-full bg-zinc-50 ${className}`}
      aria-label="Company sub-hero"
    >
      <div className="py-0 bg-[#F7FCFD] pr-0">
        <div className="flex lg:flex-row flex-col-reverse items-center 2xl:gap-[84px] xl:gap-[72px] lg:gap-[60px] md:gap-[54px] sm:gap-[48px] gap-[40px] justify-between ">
          {/* Text */}
          <div className="w-full items-center px-4 sm:px-6 md:px-12 lg:pl-[80px] xl:pl-[120px] 2xl:pl-[200px] lg:pb-0 md:pb-[54px] sm:pb-[48px] pb-[40px]">
            <p className="2xl:text-[32px] xl:text-[28px] lg:text-[24px] md:text-[20px] sm:text-[16px] text-[14px] text-[var(--hero-text)] font-urbanist ">
              Today, <span className="font-semibold">Alpheric</span> is a
              multidisciplinary consulting and innovation company that brings
              together <span className="font-semibold">Security</span>,{" "}
              <span className="font-semibold">Technology</span>,{" "}
              <span className="font-semibold">Design</span>, and{" "}
              <span className="font-semibold">Hosting</span>, helping
              organizations <span className="font-semibold">Consult</span>,{" "}
              <span className="font-semibold">Build</span>,{" "}
              <span className="font-semibold">Assure</span>,{" "}
              <span className="font-semibold">Promote</span>, and{" "}
              <span className="font-semibold">Support</span> their digital growth.
            </p>
          </div>

          {/* Image */}
          <div className="w-full items-right">
            <div className="relative bg-white ">
              <img
                src={imageSrc}
                alt={imageAlt}
                className="h-full lg:w-[960px] w-full object-contain lg:ml-auto"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SubHero;
