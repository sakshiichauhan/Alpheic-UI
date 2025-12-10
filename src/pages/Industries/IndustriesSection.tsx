import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '@/store';
import { fetchIndustryPageData } from '@/store/Slice/IndustryPage/IndustryThunk';
import ServiceCard from '@/Components/ServiceCard';

const IndustriesSection: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { l1Data, l2Cards, loading } = useSelector((state: RootState) => state.industryPage);

  useEffect(() => {
    // Fetch industry data on component mount
    if (!l1Data && !loading) {
      dispatch(fetchIndustryPageData());
    }
  }, [dispatch, l1Data, loading]);

  // Helper function to convert API icon path to full URL
  const getImageUrl = (iconPath: string | undefined): string => {
    if (!iconPath) return '';
    // If it's already a full URL, return as is
    if (iconPath.startsWith('http://') || iconPath.startsWith('https://')) {
      return iconPath;
    }
    // If it starts with /files/, construct full URL
    if (iconPath.startsWith('/files/')) {
      const apiBaseUrl = 'https://work.alpheric.com';
      return apiBaseUrl ? `${apiBaseUrl}${iconPath}` : iconPath;
    }
    // If it starts with /, use as relative path (proxy will handle it)
    if (iconPath.startsWith('/')) {
      return iconPath;
    }
    // Otherwise, assume it's a relative path
    return iconPath;
  };

  // Generate href from industry name - links to industry detail page
  const generateHref = (name: string | undefined): string => {
    if (!name) return '#';
    // Link to the industry page with the industry name as a route parameter
    // Format: /industry/Energy%20%26%20Environment
    return `/industry/${encodeURIComponent(name)}`;
  };

  return (
    <section className="bg-gray-50 2xl:py-[84px] xl:py-[72px] lg:py-[60px] md:py-[52px] py-[40px]">
      <div className="px-4 sm:px-6 md:px-12 lg:px-[80px] xl:px-[120px] 2xl:px-[200px]">
        {loading ? (
          <div className="2xl:mt-[75px] xl:mt-[60px] lg:mt-[48px] md:mt-[40px] mt-[32px] grid grid-cols-1 lg:gap-8 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-[#FBFBFB] p-[32px] animate-pulse">
                <div className="h-8 w-8 bg-gray-200 rounded mb-4"></div>
                <div className="h-6 bg-gray-200 rounded mb-2"></div>
                <div className="h-4 bg-gray-200 rounded"></div>
              </div>
            ))}
          </div>
        ) : l2Cards.length > 0 ? (
          <div className="2xl:mt-[75px] xl:mt-[60px] lg:mt-[48px] md:mt-[40px] mt-[32px] grid grid-cols-1 lg:gap-8 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {l2Cards.map((card, i) => (
              <ServiceCard
                key={i}
                title={card.card_title || card.name || ''}
                description={card.card_description || ''}
                iconUrl={getImageUrl(card.card_icon)}
                href={generateHref(card.name)}
              />
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
};

export default IndustriesSection;