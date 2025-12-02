import React from "react";
import Spiral from "@/assets/Homepage/spiral.png"; 

type Props = {
  title?: string;
  kicker?: string;
  description?: string;
  ctaPrimaryText?: string;
  ctaPrimaryLink?: string;
  ctaSecondaryText?: string;
  ctaSecondaryLink?: string;
  className?: string;
};

const DreamersHomepage: React.FC<Props> = ({
  title = "Turn an idea into something people can see, use, and trust.",
  kicker = "Dreamers",
  description = `We help you name it, shape it, ship it. Quick, focused pilots that validate value in two to four weeks.`,
  ctaPrimaryText = "Explore Dreamer pilots",
  ctaPrimaryLink = "#",
  ctaSecondaryText = "Talk to a Strategist",
  ctaSecondaryLink = "#",
  className = "",
}) => {
  return (
    <section
    id="hero-heading" className={`w-full relative ${className} bg-[radial-gradient(ellipse_70%_120%_at_right_top,#EDE6FE_20%,#FFFFFF_70%)] overflow-clip`}
      aria-labelledby="hero-heading"
    >
      <div className="px-4 sm:px-6 md:px-12 lg:px-[80px] xl:px-[120px] 2xl:px-[200px] 2xl:pt-[190px] xl:pt-[160px] lg:pt-[140px] md:pt-[120px] pt-[110px] 2xl:pb-[84px] xl:pb-[72px] lg:pb-[60px] md:pb-[52px] pb-[40px]">
        <div className="flex flex-col items-start gap-8">
          <div className="w-full flex flex-col items-start lg:gap-[16px] gap-[12px]">
            
          <p  

              className="2xl:text-[32px] xl:text-[28px] lg:text-[24px] md:text-[20px] sm:text-[16px] text-[14px] font-medium text-[var(--hero-text)] text-urbanist text-left"
            >
              {kicker}
            </p>
            <h1
             
              className="2xl:text-[84px] xl:text-[72px] lg:text-[60px] md:text-[48px] sm:text-[40px] text-[32px] font-semibold text-black text-left 2xl:max-w-[1250px] xl:max-w-[1050px] lg:max-w-[900px] md:max-w-[800px]"
            >
              {title}
            </h1>


            <p 
              className="2xl:max-w-[1250px] xl:max-w-[1050px] lg:max-w-[900px] md:max-w-[600px] sm:max-w-[400px] max-w-[300px] 2xl:text-[24px] xl:text-[20px] lg:text-[18px] md:text-[16px] sm:text-[14px] text-[12px] text-[var(--medium-text)] text-urbanist text-left"
            >
              {description}
            </p>

            <div className="flex flex-row flex-wrap gap-4">
              <a
                href={ctaPrimaryLink}
                className="bg-black text-white 2xl:px-[34px] xl:px-[28px] lg:px-[24px] md:px-[20px] sm:px-[16px] px-[12px] 2xl:py-[14px] xl:py-[12px] py-[10px] 2xl:text-[24px] xl:text-base text-sm font-medium hover:bg-gray-800 transition-colors"
              >
                {ctaPrimaryText}
              </a>
              <a
                href={ctaSecondaryLink}
                className="bg-white text-black border border-black 2xl:px-[34px] xl:px-[28px] lg:px-[24px] md:px-[20px] sm:px-[16px] px-[12px] 2xl:py-[14px] xl:py-[12px] py-[10px] 2xl:text-[24px] xl:text-base text-sm font-medium hover:bg-gray-100 transition-colors"
              >
                {ctaSecondaryText}
              </a>
            </div>

          </div>
        </div>
        
        <img
          src={Spiral}
          alt="Spiral"
          className="absolute hidden lg:block 2xl:top-20 xl:top-[60px] lg:top-[60px] -right-[170px] 2xl:w-[500px] xl:w-[420px] lg:w-[360px] md:w-[400px] sm:w-[360px] w-[320px] h-auto object-contain
           max-[1700px]:-translate-y-[30px]
          "
        />
      </div>
    </section>
  );
};

export default DreamersHomepage;