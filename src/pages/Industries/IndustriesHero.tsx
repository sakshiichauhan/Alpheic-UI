import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '@/store';
import { fetchIndustryPageData } from '@/store/Slice/IndustryPage/IndustryThunk';
import { ParsedHtml } from '@/Components/ParsedHtml';

const HeroSection: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { l1Data, loading } = useSelector((state: RootState) => state.industryPage);

  useEffect(() => {
    // Fetch industry data on component mount
    if (!l1Data && !loading) {
      dispatch(fetchIndustryPageData());
    }
  }, [dispatch, l1Data, loading]);

  // Check flag - if 0, don't render
  if (l1Data && l1Data.industry_hero !== 1) {
    return null;
  }

  // Use API data if available, otherwise use defaults
  const heading = l1Data?.industry_hero_heading || '<div class="ql-editor read-mode"><p>Industries</p><p><strong>We Empower</strong></p></div>';
  const subheading = l1Data?.industry_hero_subheading || 'Every industry has its own challenges.';
  const description = l1Data?.industry_hero_description || 'At Alpheric, we tailor technology, design, and innovation to fit each one — helping businesses grow, scale, and stay secure in a digital-first world.';

  // Check if heading contains HTML tags
  const hasHtmlContent = heading.includes('<') && heading.includes('>');

  return (
    <section className="bg-[radial-gradient(ellipse_50%_100%_at_top_right,#EDE6FE_10%,#FFFFFF_100%)] 2xl:pb-[84px] xl:pb-[72px] lg:pb-[60px] md:pb-[52px] pb-[40px] 2xl:pt-[188px] xl:pt-[170px] lg:pt-[150px] md:pt-[120px] pt-[110px]">
      <div className="px-4 sm:px-6 md:px-12 lg:px-[80px] xl:px-[120px] 2xl:px-[200px]">
        <div className="flex min-[950px]:flex-row flex-col items-center xl:gap-[64px] lg:gap-[48px] md:gap-[32px] sm:gap-[24px] gap-[16px]">
          
          <div className="xl:min-w-[460px] lg:min-w-[400px] md:min-w-[340px] sm:min-w-[240px] min-w-[200px] min-[950px]:text-left text-center">
            {hasHtmlContent ? (
              <div className="xl:text-[72px] lg:text-[64px] md:text-[52px] sm:text-[40px] text-[32px] text-black">
                <ParsedHtml
                  htmlContent={heading}
                  as="div"
                />
              </div>
            ) : (
              <>
                <h2 className="xl:text-[72px] lg:text-[64px] md:text-[52px] sm:text-[40px] text-[32px] font-semibold text-black">
                  Industries
                </h2>
                <h2 className="xl:text-[72px] lg:text-[64px] md:text-[52px] sm:text-[40px] text-[32px] text-black">
                  We Empower
                </h2>
              </>
            )}
          </div>

          <div className="">
            <h3 className="xl:text-[40px] lg:text-[32px] md:text-[28px] sm:text-[24px] text-[20px] font-semibold text-black">
              {subheading}
            </h3>
            <p className="xl:text-[24px] lg:text-[20px] md:text-[18px] sm:text-[16px] text-[14px] font-urbanist text-[var(--hero-text)]">
              {description}
            </p>
          </div>

        </div>
      </div>
    </section>
  );
};

export default HeroSection;