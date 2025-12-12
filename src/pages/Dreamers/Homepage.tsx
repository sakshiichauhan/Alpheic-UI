import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@/store";
import { fetchPilotByName, selectPilot, selectPilotLoading, isPilotSectionEnabled } from "@/store/Slice/Pilot/PilotThunk";
import { ParsedHtml } from "@/Components/ParsedHtml";
import Spiral from "@/assets/Homepage/spiral.png"; 

const DreamersHomepage: React.FC = () => {
  // Get pilot name from URL params
  const { pilotName } = useParams<{ pilotName?: string }>();
  
  // Decode the pilot name from URL and default to "Dreamer" for backward compatibility
  const decodedPilotName = pilotName ? decodeURIComponent(pilotName) : undefined;
  const activePilotName = decodedPilotName || "Dreamer";

  const dispatch = useDispatch<AppDispatch>();
  const pilotData = useSelector((state: RootState) => selectPilot(state, activePilotName));
  const loading = useSelector(selectPilotLoading);

  useEffect(() => {
    if (!pilotData && !loading) {
      dispatch(fetchPilotByName(activePilotName));
    }
  }, [dispatch, pilotData, loading, activePilotName]);

  if (!isPilotSectionEnabled(pilotData?.herosection)) {
    return null;
  }

  // Show loading state
  if (loading && !pilotData) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // Get data from API with fallbacks
  const kicker = pilotData?.piolet_name || activePilotName || "Dreamers";
  const titleHtml = pilotData?.herosection_heading || '<div class="ql-editor read-mode"><p>Turn an idea into something people can <strong>see, use and trust</strong></p></div>';
  const description = pilotData?.herosection_subheading || "We help you name it, shape it, ship it. Quick, focused pilots that validate value in two to four weeks.";
  const ctaPrimaryText = pilotData?.herosection_button1 || "Dreamer Piolets";
  const ctaSecondaryText = pilotData?.herosection_button2 || "Talk";
  const ctaPrimaryLink = "/Pilot";
  const ctaSecondaryLink = "/LetsTalk";

  return (
    <section
      id="hero-heading" 
      className={`w-full relative bg-[radial-gradient(ellipse_70%_120%_at_right_top,#EDE6FE_20%,#FFFFFF_70%)] overflow-clip`}
      aria-labelledby="hero-heading"
    >
      <div className="px-4 sm:px-6 md:px-12 lg:px-[80px] xl:px-[120px] 2xl:px-[200px] 2xl:pt-[190px] xl:pt-[160px] lg:pt-[140px] md:pt-[120px] pt-[110px] 2xl:pb-[84px] xl:pb-[72px] lg:pb-[60px] md:pb-[52px] pb-[40px]">
        <div className="flex flex-col items-start gap-8">
          <div className="w-full flex flex-col items-start lg:gap-[16px] gap-[12px]">
            
            <p className="2xl:text-[32px] xl:text-[28px] lg:text-[24px] md:text-[20px] sm:text-[16px] text-[14px]  text-[var(--hero-text)] text-urbanist text-left">
              {kicker}
            </p>
            
            <ParsedHtml
              htmlContent={titleHtml}
              as="h1"
              className="2xl:text-[84px] xl:text-[72px] lg:text-[60px] md:text-[48px] sm:text-[40px] text-[32px] text-black text-left 2xl:max-w-[1250px] xl:max-w-[1050px] lg:max-w-[900px] md:max-w-[800px]"
            />

            <p 
              className="2xl:max-w-[1250px] xl:max-w-[1050px] lg:max-w-[900px] md:max-w-[600px] sm:max-w-[400px] max-w-[300px] 2xl:text-[24px] xl:text-[20px] lg:text-[18px] md:text-[16px] sm:text-[14px] text-[12px] text-[var(--medium-text)] text-urbanist text-left"
            >
              {description}
            </p>

            <div className="flex flex-row flex-wrap gap-4">
              <a
                href={ctaPrimaryLink}
                onClick={(e) => {
                  e.preventDefault();
                  window.location.href = ctaPrimaryLink;
                }}
                className="bg-black text-white 2xl:px-[34px] xl:px-[28px] lg:px-[24px] md:px-[20px] sm:px-[16px] px-[12px] 2xl:py-[14px] xl:py-[12px] py-[10px] 2xl:text-[24px] xl:text-base text-sm font-medium hover:bg-gray-800 transition-colors"
              >
                {ctaPrimaryText}
              </a>
              <a
                href={ctaSecondaryLink}
                onClick={(e) => {
                  e.preventDefault();
                  window.location.href = ctaSecondaryLink;
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
          className="absolute hidden lg:block 2xl:top-20 xl:top-[60px] lg:top-[60px] -right-[170px] 2xl:w-[500px] xl:w-[420px] lg:w-[360px] md:w-[400px] sm:w-[360px] w-[320px] h-auto object-contain
           max-[1700px]:-translate-y-[30px]
          "
        />
      </div>
    </section>
  );
};

export default DreamersHomepage;