import React, { useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '@/store';
import { fetchIndustryL2Data } from '@/store/Slice/IndustryPage/TechnologyPageThunk';
import { findOriginalIndustryName } from '@/utils/urlMapping';
import { ParsedHtml } from "@/Components/ParsedHtml";

// --- 1. Reusable Stat Component ---
// This makes the layout cleaner and easier to manage
const StatItem: React.FC<{ value: string; description: string }> = ({
  value,
  description,
}) => (
  <div className="flex flex-col gap-[8px] self-stretch">
    <span className="xl:text-[54px] lg:text-[48px] md:text-[44px] text-[40px] font-semibold text-black">
      {value}
    </span>
    <p className="xl:text-[24px] lg:text-[20px] md:text-[18px] text-[16px] font-urbanist text-[var(--medium-text)]">
      {description}
    </p>
  </div>
);

// --- 2. Main Experience Section Component ---
interface OurExperienceProps {
  className?: string;
}

const OurExperience: React.FC<OurExperienceProps> = ({ 
  className = ""
}) => {
  const { industryName } = useParams<{ industryName?: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const { data, loading } = useSelector((state: RootState) => state.technologyPage);
  const { l2Cards } = useSelector((state: RootState) => state.industryPage);

  // Map cleaned URL name back to original industry name for API calls
  const currentIndustry = useMemo(() => {
    if (!industryName) return "Energy & Environment";
    
    const industryNames = l2Cards.map(card => card.name).filter(Boolean) as string[];
    const originalName = findOriginalIndustryName(industryName, industryNames);
    
    return originalName || industryName;
  }, [industryName, l2Cards]);

  useEffect(() => {
    // Fetch industry data on component mount
    if (!data || data.name !== currentIndustry) {
      if (!loading && currentIndustry) {
        dispatch(fetchIndustryL2Data(currentIndustry));
      }
    }
  }, [dispatch, data, loading, currentIndustry]);

  // Check flag - if 0, don't render
  if (data && data.industry_experience !== 1) {
    return null;
  }

  const heading = data?.industry_experience_heading;
  const description = data?.industry_experience_description;
  const experienceCards = data?.industry_experience_highlights || [];
  return (
    <section
      className={`
        w-full relative overflow-clip
        lg:bg-[radial-gradient(ellipse_50%_100%_at_top_right,#EDE6FE_10%,#FFFFFF_100%)]
        ${className}
      `}
    >
      {/* Container with responsive padding */}
      <div
        className="
          2xl:py-[84px] xl:py-[72px] lg:py-[60px] md:py-[52px] py-[40px] px-4 sm:px-6 md:px-12 lg:px-[80px] xl:px-[120px] 2xl:px-[200px]
 
        "
      >
        {/* Main Title */}
        {heading ? (
          <ParsedHtml
            htmlContent={heading}
            as="h1"
            className="xl:text-[72px] lg:text-[60px] md:text-[48px] sm:text-[40px] text-[32px] font-semibold text-black"
          />
        ) : (
          <h1 className="xl:text-[72px] lg:text-[60px] md:text-[48px] sm:text-[40px] text-[32px] font-semibold text-black">
            Our Experience
          </h1>
        )}

        {/* Stats Grid - Dynamic based on API data */}
        {loading ? (
          <div className="flex sm:flex-row flex-col sm:justify-between items-stretch xl:gap-10 lg:gap-8 md:gap-6 sm:gap-4 gap-2 mt-4 md:mt-10 lg:mt-12">
            {[1, 2, 3].map((index) => (
              <React.Fragment key={index}>
                {index > 1 && (
                  <div className="hidden sm:block self-stretch">
                    <div className="bg-[var(--border-color)] h-full w-[2px]" />
                  </div>
                )}
                <div className="flex flex-col gap-[8px] self-stretch">
                  <div className="xl:h-[54px] lg:h-[48px] md:h-[44px] h-[40px] bg-gray-200 rounded animate-pulse"></div>
                  <div className="xl:h-[24px] lg:h-[20px] md:h-[18px] h-[16px] bg-gray-200 rounded animate-pulse"></div>
                </div>
              </React.Fragment>
            ))}
          </div>
        ) : experienceCards.length > 0 ? (
          <div className="flex sm:flex-row flex-col sm:justify-between items-stretch xl:gap-10 lg:gap-8 md:gap-6 sm:gap-4 gap-2 mt-4 md:mt-10 lg:mt-12">
            {experienceCards.map((card, index) => (
              <React.Fragment key={index}>
                {index > 0 && (
                  <div className="hidden sm:block self-stretch">
                    <div className="bg-[var(--border-color)] h-full w-[2px]" />
                  </div>
                )}
                <StatItem
                  value={card.exp_head || ''}
                  description={card.exp_description || ''}
                />
              </React.Fragment>
            ))}
          </div>
        ) : null}

        {/* Paragraphs Section - Dynamic from description field */}
        {loading ? (
          <div className="mt-10 md:mt-12 flex flex-col gap-4">
            {[1, 2, 3, 4, 5].map((index) => (
              <div key={index} className="xl:h-[24px] lg:h-[20px] md:h-[18px] h-[16px] bg-gray-200 rounded animate-pulse"></div>
            ))}
          </div>
        ) : description ? (
          <div className="mt-10 md:mt-12 flex flex-col text-[var(--medium-text)] xl:text-[24px] lg:text-[20px] md:text-[18px] text-[16px] font-urbanist">
            {/* Split description text by newlines and render as paragraphs */}
            {description.split('\n').filter(para => para.trim()).map((paragraph, index) => (
              <p key={index}>
                {paragraph.trim()}
              </p>
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
};

export default OurExperience;