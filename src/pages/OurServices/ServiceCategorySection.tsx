import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '@/store';
import { fetchServicePageL1Data, type SelectServiceCategoryItem, type LinkServiceNameItem } from '@/store/Slice/UxDesgin/ServiceThunk';
import { cleanNameForUrl } from '@/utils/urlMapping';
import ServiceCard from '@/Components/ServiceCard';

const ServiceCategorySection: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { data, loading } = useSelector((state: RootState) => state.servicePageL1);

  useEffect(() => {
    // Fetch service page L1 data on component mount
    if (!data && !loading) {
      dispatch(fetchServicePageL1Data());
    }
  }, [dispatch, data, loading]);

  // Get categories from API data
  const categories = data?.select_service_categories || [];

  // Don't render anything if no categories or still loading
  if (loading || categories.length === 0) {
    return null;
  }

  return (
    <>
      {categories.map((category: SelectServiceCategoryItem, categoryIndex: number) => {
        // Get services from link_service_names
        const linkServiceNames = category.link_service_names || [];
        const services = linkServiceNames
          .map((item: LinkServiceNameItem) => ({
            id: item.name1 || '',
            title: item.service_category_heading || item.name1 || item.name1 || '',
            desc: item.service_category_description || ''
          }))
          .filter(service => service.title && service.desc); // Filter out items without title or description

        // Skip category if no services
        if (services.length === 0) {
          return null;
        }

        // Get category title, subtitle, and description from API
        const title = category.service_category_card_title || '';
        const subtitle = category.service_category_card_subtitle || '';
        const description = category.service_category_card_description || '';
        
        // Get cleaned service category name for URL
        const serviceCategoryName = category.select || '';
        const cleanedCategoryName = cleanNameForUrl(serviceCategoryName);
        const categoryHref = cleanedCategoryName ? `/Services/${cleanedCategoryName}` : '/Services/Design';

        return (
          <section 
            key={category.select || categoryIndex} 
            className="bg-white 2xl:py-[84px] xl:py-[72px] lg:py-[60px] md:py-[52px] py-[40px]"
          >
            <div className="px-4 sm:px-6 md:px-12 lg:px-[80px] xl:px-[120px] 2xl:px-[200px]">
              
              <div className="text-center">
                {title && (
                  <h2 className="xl:text-[72px] lg:text-[64px] md:text-[52px] sm:text-[40px] text-[32px] font-bold tracking-tight text-black">
                    {title}
                  </h2>
                )}
                {subtitle && (
                  <p className="mt-[18px] xl:text-[40px] lg:text-[32px] md:text-[28px] sm:text-[24px] text-[20px] text-black font-semibold">
                    {subtitle}
                  </p>
                )}
                {description && (
                  <p className="mx-auto mt-[16px] max-w-3xl xl:text-[24px] lg:text-[20px] md:text-[18px] sm:text-[16px] text-[14px] leading-8 text-[var(--medium-text)] font-urbanist">
                    {description}
                  </p>
                )}
              </div>

              <div className="2xl:mt-[75px] xl:mt-[60px] lg:mt-[48px] md:mt-[40px] mt-[32px] grid grid-cols-1 lg:gap-8 gap-6 sm:grid-cols-2 lg:grid-cols-3 justify-center items-center">
                {services.map((service, i) => {
                  const isLast = i === services.length - 1;
                  const centerOnLgThreeCol = services.length % 3 === 1;

                  return (
                    <div
                      key={service.id || i}
                      className={`${
                        isLast && centerOnLgThreeCol ? 'lg:col-start-2 lg:col-span-1 lg:justify-self-stretch' : ''
                      } `}
                    >
                      <ServiceCard
                        title={service.title}
                        description={service.desc}
                        href={categoryHref}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        );
      })}
    </>
  );
};

export default ServiceCategorySection;

