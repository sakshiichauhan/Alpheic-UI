import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@/store";
import { fetchDesignPageL2Data } from "@/store/Slice/UxDesgin/DesginPageThunk";
import { ParsedHtml } from "@/Components/ParsedHtml";
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

const DesignHeroSection: React.FC<Props> = ({
  title: defaultTitle = "Make it clear. Usable. Loved.",
  kicker: defaultKicker = "Design by Alpheric",
  description: defaultDescription = `We design experiences that connect people with brands — digital, physical, and three-dimensional. Every element has a job. Clarity comes first.`,
  ctaPrimaryText: defaultCtaPrimaryText = "Explore Dreamer pilots",
  ctaPrimaryLink: defaultCtaPrimaryLink = "/Pilot",
  ctaSecondaryText: defaultCtaSecondaryText = "Talk to a Strategist",
  ctaSecondaryLink: defaultCtaSecondaryLink = "/LetsTalk",
  className = "",
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const { data, loading, error } = useSelector((state: RootState) => state.designPageL2);

  useEffect(() => {
    if (!data && !loading) {
      dispatch(fetchDesignPageL2Data('Design'));
    }
  }, [dispatch, data, loading]);

  // Show loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // Show error state
  if (error && !data) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-red-600 mb-4">Error loading page data: {error}</p>
          <button
            onClick={() => dispatch(fetchDesignPageL2Data('Design'))}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  // Conditionally render based on service_category
  const shouldShowSection = data?.service_category === 1;

  // Use API data if available, otherwise use props/defaults
  const kicker = data?.service_category_smalltitle || defaultKicker;
  const description = data?.service_category_description || defaultDescription;
  const ctaPrimaryText = data?.service_category_button1 || defaultCtaPrimaryText;
  const ctaSecondaryText = data?.service_category_button2 || defaultCtaSecondaryText;

  // Don't render if service_category is 0
  if (!shouldShowSection) {
    return null;
  }

  return (
    <section
      className={`w-full relative ${className} bg-[radial-gradient(ellipse_70%_120%_at_right_top,#EDE6FE_20%,#FFFFFF_70%)] overflow-clip`}
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
              id="hero-heading"
              className="2xl:text-[84px] xl:text-[72px] lg:text-[60px] md:text-[48px] sm:text-[42px] text-[40px] font-semibold text-black text-left"
            >
              {data?.service_category_heading ? (
                <ParsedHtml 
                  htmlContent={data.service_category_heading} 
                  as="span"
                />
              ) : (
                defaultTitle
              )}
            </h1>


            <p 
              className="2xl:max-w-[1250px] xl:max-w-[1050px] lg:max-w-[900px] md:max-w-[600px] sm:max-w-[400px] max-w-[300px] 2xl:text-[24px] xl:text-[20px] lg:text-[18px] md:text-[16px] sm:text-[14px] text-[12px] text-[var(--medium-text)] text-urbanist text-left"
            >
              {description}
            </p>

            <div className="flex flex-row gap-4">
              <a
                href={defaultCtaPrimaryLink}
                className="bg-black text-white 2xl:px-[34px] xl:px-[28px] lg:px-[24px] md:px-[20px] sm:px-[16px] px-[12px] 2xl:py-[14px] xl:py-[12px] py-[10px] 2xl:text-[24px] xl:text-base text-sm font-medium hover:bg-gray-800 transition-colors"
              >
                {ctaPrimaryText}
              </a>
              <a
                href={defaultCtaSecondaryLink}
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
          className="absolute hidden lg:block 2xl:top-13 xl:top-[60px] lg:top-[60px] -right-[170px] 2xl:w-[500px] xl:w-[420px] lg:w-[360px] md:w-[400px] sm:w-[360px] w-[320px] h-auto object-contain
           max-[1700px]:-translate-y-[30px]
          "
        />
      </div>
    </section>
  );
};

export default DesignHeroSection;