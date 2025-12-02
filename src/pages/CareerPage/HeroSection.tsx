// AboutUsHeroPlain.tsx
import React from "react";
import Spiral from "@/assets/Homepage/spiral.png";

type Props = {
  title?: string;
  kicker?: string;
  description?: string;
  className?: string;
};

const AboutUsHeroPlain: React.FC<Props> = ({
  title = "Careers at Alpheric",
  kicker = "At Alpheric, we don’t just hire people, we empower creators.",
  description = `We’re building the future of technology, design, and automation, and we’re looking for passionate minds who 
  believe in turning ideas into impact. If you’re driven by curiosity, purpose, and innovation, you’ll fit right in.`,
  className = "",
}) => {
  return (
    <section className={`w-full relative ${className} bg-[radial-gradient(ellipse_70%_120%_at_right,#EDE6FE_20%,#FFFFFF_70%)] overflow-clip`} aria-labelledby="about-heading">
      <div className="px-4 sm:px-6 md:px-12 lg:px-[80px] xl:px-[120px] 2xl:px-[200px] 2xl:pt-[190px] xl:pt-[160px] lg:pt-[140px] md:pt-[120px] pt-[110px] 2xl:pb-[84px] xl:pb-[72px] lg:pb-[60px] md:pb-[52px] pb-[40px]">
        <div className="flex flex-col items-center gap-8 ">
          <div className="w-full flex flex-col items-center 2xl:gap-[16px] xl:gap-[12px] lg:gap-[8px] md:gap-[6px] gap-[4px]">
            <h1
              id="about-heading"
              className="2xl:text-[84px] xl:text-[72px] lg:text-[60px] md:text-[48px] sm:text-[42px] text-[40px] font-semibold text-black text-center"
            >
              {title}
            </h1>

            <p className="2xl:text-[32px] xl:text-[28px] lg:text-[24px] md:text-[20px] sm:text-[16px] text-[14px] sm:max-w-full max-w-[260px] mx-auto font-medium text-[var(--hero-text)] text-urbanist text-center">
              {kicker}
            </p>

            <p className="2xl:max-w-[1190px] xl:max-w-[1000px] lg:max-w-[900px] max-w-full mx-auto 2xl:text-[24px] xl:text-[20px] lg:text-[18px] md:text-[16px] sm:text-[14px] text-[12px] text-[var(--medium-text)] text-urbanist text-center">
              {description}
            </p>
          </div>
        </div>
        <img src={Spiral} alt="Spiral" className="absolute hidden lg:block 2xl:top-0 top-[50px] -right-[150px] 2xl:w-[520px] xl:w-[420px] lg:w-[340px] md:w-[400px] sm:w-[360px] w-[320px] h-auto object-contain
        max-[1700px]:-translate-y-[30px]
        " />
      </div>
    </section>
  );
};

export default AboutUsHeroPlain;
