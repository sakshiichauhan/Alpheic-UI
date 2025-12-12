import React, { useState, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ChevronRight } from "lucide-react";
import type { AppDispatch, RootState } from "@/store";
import { fetchServicePageData } from "@/store/Slice/UxDesgin/UxDesgin";
import Indus1 from "@/assets/ServicePage/Industries/Indus1.png";
import Indus2 from "@/assets/ServicePage/Industries/Indus2.png";
import Indus3 from "@/assets/ServicePage/Industries/Indus3.png";
import Indus4 from "@/assets/ServicePage/Industries/Indus4.png";
import Indus5 from "@/assets/ServicePage/Industries/Indus5.png";
import Indus6 from "@/assets/ServicePage/Industries/Indus6.png";
import Indus7 from "@/assets/ServicePage/Industries/Indus7.png";
import Indus8 from "@/assets/ServicePage/Industries/Indus8.png";
import Indus9 from "@/assets/ServicePage/Industries/Indus9.png";
import ParsedHtml from "@/Components/ParsedHtml";

// Helper function to build image URL
const buildImageUrl = (path?: string) => {
  if (!path) return "";
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  if (path.startsWith("/files/")) return `https://work.alpheric.com${path}`;
  return `https://work.alpheric.com/files/${path}`;
};

interface Industry {
  id: number;
  uniqueKey: string;
  name: string;
  icon: string;
  isHighlighted?: boolean;
}

// Fallback icons array
const fallbackIcons = [Indus1, Indus2, Indus3, Indus4, Indus5, Indus6, Indus7, Indus8, Indus9];

const Industries: React.FC<{ 
  className?: string; 
  heading?: string;
  serviceName?: string;
}> = ({ 
  className = "", 
  heading,
  serviceName
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const { data, loading } = useSelector((state: RootState) => state.servicePage);
  
  // Fetch service page data if serviceName is provided and data doesn't match
  useEffect(() => {
    if (serviceName && (!data || data.name !== serviceName) && !loading) {
      dispatch(fetchServicePageData(serviceName));
    }
  }, [dispatch, serviceName, data, loading]);
  
  // If no serviceName provided but we have data, use it (for cases where parent component already fetched)

  // Map API data to Industry format
  const industries: Industry[] = useMemo(() => {
    if (data?.linked_industries_list && data.linked_industries_list.length > 0) {
      return data.linked_industries_list.map((item, index) => {
        const industryName = item.industry_name || item.name1 || '';
        const iconUrl = item.icon || item.attach_image;
        const icon = iconUrl ? buildImageUrl(iconUrl) : fallbackIcons[index % fallbackIcons.length];
        // Use name1 as unique identifier, fallback to index if not available
        const uniqueId = item.name1 || `industry-${index}`;
        
        return {
          id: index + 1, // Keep numeric ID for highlighting logic
          uniqueKey: uniqueId, // Use for React key prop
          name: industryName,
          icon: icon,
          isHighlighted: false, // Can be set based on API data if needed
        };
      });
    }
    // Return empty array if no API data
    return [];
  }, [data?.linked_industries_list]);

  const [highlightedIds, setHighlightedIds] = useState<Set<number>>(
    new Set(industries.filter(i => i.isHighlighted).map(i => i.id))
  );

  // Update highlightedIds when industries change
  useEffect(() => {
    setHighlightedIds(new Set(industries.filter(i => i.isHighlighted).map(i => i.id)));
  }, [industries]);

  const handleClick = (id: number, e: React.MouseEvent) => {
    e.preventDefault();
    setHighlightedIds(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  // Get heading from API or props
  const displayHeading = heading || data?.linked_industries_heading;

  // Don't render if linked_industries is 0 (disabled)
  if (data && data.linked_industries !== undefined && data.linked_industries !== 1) {
    return null;
  }

  // Don't render if no industries data
  if (industries.length === 0 && !loading) {
    return null;
  }

  return (
    <section className={`w-full bg-white ${className}`} aria-labelledby="industries-heading">
      <div className="px-4 sm:px-6 md:px-12 lg:px-[80px] xl:px-[120px] 2xl:px-[200px] 2xl:py-[84px] xl:py-[72px] lg:py-[60px] md:py-[52px] py-[40px]
 ">
        {/* Header */}
        {displayHeading ? (
          <ParsedHtml
            htmlContent={displayHeading}
            as="h2"
            id="industries-heading"
            className="text-center text-[32px] md:text-[60px] lg:text-[72px]  2xl:mb-16 xl:mb-14 mb-6 md:mb-12 "
          />
        ) : null}

        {/* Grid of Industries */}
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="text-[var(--medium-text)]">Loading industries...</div>
          </div>
        ) : industries.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 2xl:gap-4 xl:gap-6 md:gap-6 gap-4">
            {industries.map((industry, index) => {
              // Show divider for all items
              // For exactly 3 items: show divider on all (including third card)
              // For more than 3 items: show divider on all except the very last item
              const showDivider = industries.length === 3 ? true : index < industries.length - 1;
              const isHighlighted = highlightedIds.has(industry.id);
            
            return (
              <div key={industry.uniqueKey} className="relative">
                <a
                  href="#"
                  onClick={(e) => handleClick(industry.id, e)}
                  className="flex items-center 2xl:py-6 2xl:px-3 xl:py-3  py-2 px-2  cursor-pointer"
                >
                  {/* Icon */}
                  <img
                    src={industry.icon}
                    alt={industry.name}
                    className={`w-6 h-6 md:w-8 md:h-8 flex-shrink-0 transition-all duration-200 -ml-1 -xl:ml-1 mr-6 xl:mr-3 ${
                      isHighlighted ? "brightness-0 saturate-100" : ""
                    }`}
                    style={{
                      filter: isHighlighted ? "invert(69%) sepia(91%) saturate(1397%) hue-rotate(142deg) brightness(99%) contrast(93%)" : "none"
                    }}
                    referrerPolicy="no-referrer"
                  />
                  
                  {/* Text */}
                  <span
                    className={`text-[16px] md:text-[20px] lg:text-[24px] xl:text-[18px] font-medium flex-1 min-w-0 ${
                      isHighlighted
                        ? "text-[#5AC8DC]  decoration-1 underline-offset-4"
                        : "text-black"
                    }`}
                  >
                    {industry.name}
                  </span>

                  {/* Arrow */}
                  <ChevronRight className={`w-5 h-5 md:w-6 md:h-6 flex-shrink-0 group-hover:translate-x-1 transition-transform -mr- ${
                    isHighlighted ? "text-[#5AC8DC]" : "text-black"
                  }`} />
                </a>

                {/* Horizontal divider - spans full width of content */}
                {showDivider && (
                  <div className={`absolute bottom-0 left-0 right-0 h-px transition-colors duration-200 ${
                    isHighlighted ? "bg-[#5AC8DC]" : "bg-[#D2D5DB]"
                  }`} />
                )}
              </div>
            );
          })}
          </div>
        ) : null}
      </div>
    </section>
  );
};

export default Industries;

