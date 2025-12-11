import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@/store";
import { fetchPilotPageData, stripHtml, isEnabled } from "@/store/Slice/Pilot/PilotPageThunk";
import Spiral from "@/assets/Homepage/spiral.png"; 

const PilotHeroSection: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { data, loading } = useSelector((state: RootState) => state.pilotPage);

  useEffect(() => {
    if (!data && !loading) {
      dispatch(fetchPilotPageData());
    }
  }, [data, loading, dispatch]);

  if (!isEnabled(data?.herosection)) {
    return null;
  }

  const title = stripHtml(data?.herosection_heading, "Pilot by Alpheric");
  const kicker = stripHtml(data?.herosection_subheading, "Start small. Learn fast. Scale smart.");
  const description = stripHtml(
    data?.herosection_description,
    "Validate ideas and systems in 2 to 4 weeks. Fixed scope. Measurable outcomes. Real users."
  );
  const ctaPrimaryText = data?.herosection_button1 || "Explore Pilots";
  const ctaSecondaryText = data?.herosection_button2 || "Talk to a Strategist";
  const ctaPrimaryLink = "/Pilot";
  const ctaSecondaryLink = "/LetsTalk";
  const className = "";
  return (
    <section
      className={`w-full relative ${className} bg-[radial-gradient(ellipse_70%_120%_at_right_top,#EDE6FE_20%,#FFFFFF_70%)] overflow-clip`}
      aria-labelledby="hero-heading"
    >
      <div className="px-4 sm:px-6 md:px-12 lg:px-[80px] xl:px-[120px] 2xl:px-[200px] 2xl:pt-[190px] xl:pt-[160px] lg:pt-[140px] md:pt-[120px] pt-[110px] 2xl:pb-[84px] xl:pb-[72px] lg:pb-[60px] md:pb-[52px] pb-[40px]">
        <div className="flex flex-col items-start gap-8">
          <div className="w-full flex flex-col items-start lg:gap-[16px] gap-[12px]">
            <h1
              id="hero-heading"
              className="2xl:text-[84px] xl:text-[72px] lg:text-[60px] md:text-[48px] sm:text-[42px] text-[40px] font-semibold text-black text-left"
            >
              {title}
            </h1>

            <p 
              className="2xl:text-[32px] xl:text-[28px] lg:text-[24px] md:text-[20px] sm:text-[16px] text-[14px] font-medium text-[var(--hero-text)] text-urbanist text-left"
            >
              {kicker}
            </p>

            <p 
              className="2xl:text-[24px] xl:text-[20px] lg:text-[18px] md:text-[16px] sm:text-[14px] text-[12px] text-[var(--medium-text)] text-urbanist text-left"
            >
              {description}
            </p>

            <div className="flex flex-row gap-4">
              <a
                href={ctaPrimaryLink}
                onClick={() => {
                  window.location.href = '/Pilot';
                }}
                className="bg-black text-white 2xl:px-[34px] xl:px-[28px] lg:px-[24px] md:px-[20px] sm:px-[16px] px-[12px] 2xl:py-[14px] xl:py-[12px] py-[10px] 2xl:text-[24px] xl:text-base text-sm font-medium hover:bg-gray-800 transition-colors"
              >
                {ctaPrimaryText}
              </a>
              <a
                href={ctaSecondaryLink}
                onClick={() => {
                  window.location.href = '/LetsTalk';
                }}
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
          className="absolute hidden lg:block 2xl:top-10 xl:top-[80px] lg:top-[100px] -right-[150px] 2xl:w-[520px] xl:w-[420px] lg:w-[340px] md:w-[400px] sm:w-[360px] w-[320px] h-auto object-contain
           max-[1700px]:-translate-y-[30px]
          "
        />
      </div>
    </section>
  );
};

export default PilotHeroSection;