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
  title = "About Us",
  kicker = "Every great company begins with a problem worth solving.",
  description = `At Alpheric, we create user experiences that blend design, data, and purpose. Our UX/UI team
   transforms complex systems into intuitive digital journeys that drive engagement, efficiency, and growth — helping brands deliver 
   impact through design intelligence.`,
  className = "",
}) => {
  return (
    <section className={`w-full relative ${className} bg-[radial-gradient(ellipse_50%_100%_at_top_right,#EDE6FE_10%,#FFFFFF_100%)] lg:bg-[radial-gradient(ellipse_70%_120%_at_right,#EDE6FE_20%,#FFFFFF_70%)] overflow-clip`} aria-labelledby="about-heading">
      <div className="px-4 sm:px-6 md:px-12 lg:px-[80px] xl:px-[120px] 2xl:px-[200px] 2xl:pt-[190px] xl:pt-[160px] lg:pt-[140px] md:pt-[120px] pt-[110px] 2xl:pb-[84px] xl:pb-[72px] lg:pb-[60px] md:pb-[48px] pb-[40px] ">
        <div className="">
          <div className="w-full flex flex-col items-center lg:items-start lg:gap-4 md:gap-3 sm:gap-2 gap-1">
            <h1
              id="about-heading"
              className="2xl:text-[84px] xl:text-[72px] lg:text-[60px] md:text-[52px] sm:text-[48px] text-[40px] text-center lg:text-left font-semibold text-black"
            >
              {title}
            </h1>

            <p className="2xl:text-[32px] xl:text-[28px] lg:text-[24px] md:text-[20px] sm:text-[16px] text-[14px] text-center lg:text-left font-semibold text-[var(--hero-text)] text-urbanist">
              {kicker}
            </p>

            <p className="2xl:max-w-[1160px] xl:max-w-[1000px] lg:max-w-[900px] max-w-full text-center lg:text-left 2xl:text-[24px] xl:text-[20px] lg:text-[18px] text-[16px] text-[var(--medium-text)] text-urbanist">
              {description}
            </p>
          </div>
        </div>
        <img src={Spiral} alt="Spiral" className="absolute top-0 -right-[150px] 2xl:w-[520px] xl:w-[450px] lg:w-[340px] w-full h-auto object-contain hidden lg:block
        max-[1700px]:-translate-y-[30px]
        max-[1535px]:translate-y-[0px]
        max-[1280px]:translate-y-[45px]
        " />
      </div>
    </section>
  );
};

export default AboutUsHeroPlain;
