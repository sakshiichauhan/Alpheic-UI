import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '@/store';
import { fetchServicePageL1Data } from '@/store/Slice/UxDesgin/ServiceThunk';
import { ParsedHtml } from '@/Components/ParsedHtml';

const HeroSection: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { data, loading, error } = useSelector((state: RootState) => state.servicePageL1);

  useEffect(() => {
    // Fetch service page L1 data on component mount
    if (!data && !loading) {
      dispatch(fetchServicePageL1Data());
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
            onClick={() => dispatch(fetchServicePageL1Data())}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  // Use API data if available, otherwise use defaults
  const heading = data?.heading || '<div class="ql-editor read-mode"><p>Our <strong>Services</strong></p></div>';
  const subheading = data?.subheading || 'Powering ideas through technology, design, and intelligence.';
  const description = data?.description || 'Alpheric delivers end-to-end digital solutions from strategy and product development to hosting, security, and growth.';

  return (
    <section className="bg-[radial-gradient(ellipse_50%_100%_at_top_right,#EDE6FE_10%,#FFFFFF_100%)] 2xl:pb-[84px] xl:pb-[72px] lg:pb-[60px] md:pb-[52px] pb-[40px] 2xl:pt-[188px] xl:pt-[170px] lg:pt-[150px] md:pt-[120px] pt-[110px]">
      <div className="px-4 sm:px-6 md:px-12 lg:px-[80px] xl:px-[120px] 2xl:px-[200px]">

        <div className="flex min-[950px]:flex-row flex-col items-start xl:gap-[64px] lg:gap-[48px] md:gap-[32px] sm:gap-[24px] gap-[16px]">
          
          <div className="2xl:min-w-[510px] xl:min-w-[420px] lg:min-w-[380px] md:min-w-[320px] sm:min-w-[240px] min-w-[200px]">
            {heading ? (
              <ParsedHtml
                htmlContent={heading}
                as="h2"
                className="2xl:text-[84px] xl:text-[72px] lg:text-[64px] md:text-[52px] sm:text-[40px] text-[32px] font-bold tracking-tight text-black"
              />
            ) : (
              <h2 className="2xl:text-[84px] xl:text-[72px] lg:text-[64px] md:text-[52px] sm:text-[40px] text-[32px] font-bold tracking-tight text-black">
                Our Services
              </h2>
            )}
          </div>

          <div className="">
            <h3 className="2xl:text-[40px] lg:text-[32px] md:text-[28px] sm:text-[24px] text-[20px] font-semibold text-black">
              {subheading}
            </h3>
            <p className="2xl:text-[24px] lg:text-[20px] md:text-[18px] sm:text-[16px] text-[14px] font-urbanist text-[var(--hero-text)]">
              {description}
            </p>
          </div>

        </div>
      </div>
    </section>
  );
};

export default HeroSection;