// AboutUsHeroPlain.tsx
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@/store";
import { fetchIndustryL2Data } from "@/store/Slice/IndustryPage/TechnologyPageThunk";
import Spiral from "@/assets/Homepage/spiral.png";
import { ParsedHtml } from "@/Components/ParsedHtml";

type Props = {
  className?: string;
};

const TechnologyBuild: React.FC<Props> = ({
  className = "",
}) => {
  const { industryName } = useParams<{ industryName?: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const { data, loading } = useSelector((state: RootState) => state.technologyPage);

  // Get industry name from route or use default
  const currentIndustry = industryName ? decodeURIComponent(industryName) : "Energy & Environment";

  useEffect(() => {
    // Fetch industry data on component mount
    // Check if we need to fetch new data if industry name changed
    if (!data || data.name !== currentIndustry) {
      if (!loading) {
        dispatch(fetchIndustryL2Data(currentIndustry));
      }
    }
  }, [dispatch, data, loading, currentIndustry]);

  // Check flag - if 0, don't render
  if (data && data.industry_hero !== 1) {
    return null;
  }

  // Use API data if available, otherwise use defaults
  const displayTitle = data?.industry_hero_heading || "Technology";
  const displayKicker = data?.industry_hero_subheading || "Building Intelligent, Secure, and Scalable Futures.";
  const displayDescription = data?.industry_hero_description || `Amid waves of digital disruption, Alpheric helps technology companies design strategies, products, and platforms that sustain growth and stay ahead of change.`;
  
  // Check if title contains HTML tags
  const hasHtmlContent = displayTitle.includes('<') && displayTitle.includes('>');
  
  return (
    <section className={`w-full relative ${className} bg-[radial-gradient(ellipse_50%_100%_at_top_right,#EDE6FE_10%,#FFFFFF_100%)] lg:bg-[radial-gradient(ellipse_70%_200%_at_right,#EDE6FE_20%,#FFFFFF_70%)] overflow-clip`} aria-labelledby="about-heading">
      <div className="px-4 sm:px-6 md:px-12 lg:px-[80px] xl:px-[120px] 2xl:px-[200px] 2xl:pt-[190px] xl:pt-[160px] lg:pt-[140px] md:pt-[120px] pt-[110px] 2xl:pb-[84px] xl:pb-[72px] lg:pb-[60px] md:pb-[48px] pb-[40px] ">
        <div className="">
          <div className="w-full flex flex-col items-center lg:items-start lg:gap-4 md:gap-3 sm:gap-2 gap-1">
            {hasHtmlContent ? (
              <ParsedHtml
                htmlContent={displayTitle}
                as="h1"
                id="about-heading"
                className="2xl:text-[84px] xl:text-[72px] lg:text-[60px] md:text-[52px] sm:text-[48px] text-[40px] text-center lg:text-left font-semibold text-black"
              />
            ) : (
              <h1
                id="about-heading"
                className="2xl:text-[84px] xl:text-[72px] lg:text-[60px] md:text-[52px] sm:text-[48px] text-[40px] text-center lg:text-left font-semibold text-black"
              >
                {displayTitle}
              </h1>
            )}

            <p className="2xl:text-[32px] xl:text-[28px] lg:text-[24px] md:text-[20px] sm:text-[16px] text-[14px] text-center lg:text-left font-semibold text-[var(--hero-text)] text-urbanist">
              {displayKicker}
            </p>

            <p className="2xl:max-w-[1160px] xl:max-w-[1000px] lg:max-w-[900px] max-w-full text-center lg:text-left 2xl:text-[24px] xl:text-[20px] lg:text-[18px] text-[16px] text-[var(--medium-text)] text-urbanist">
              {displayDescription}
            </p>
          </div>
        </div>
        <img 
          src={Spiral} 
          alt="Spiral" 
          className="absolute top-0 -right-[150px] 2xl:w-[520px] xl:w-[450px] lg:w-[340px] w-full h-auto object-contain hidden lg:block
        max-[1700px]:-translate-y-[30px]
        max-[1535px]:translate-y-[0px]
        max-[1280px]:translate-y-[45px]
        "
          referrerPolicy="no-referrer"
        />
      </div>
    </section>
  );
};

export default TechnologyBuild;
