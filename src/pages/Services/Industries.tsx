import React, { useState } from "react";
import { ChevronRight } from "lucide-react";
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

interface Industry {
  id: number;
  name: string;
  icon: string;
  isHighlighted?: boolean;
}

const industries: Industry[] = [
  { id: 1, name: "Education & Career Tech", icon: Indus1 },
  { id: 2, name: "Customer Experience", icon: Indus2 },
  { id: 3, name: "Retail & D2C Brands", icon: Indus3 },
  { id: 4, name: "SaaS & Enterprise Tools", icon: Indus4 },
  { id: 5, name: "Fintech & Data Platforms", icon: Indus5 },
  { id: 6, name: "Health & Wellness Apps", icon: Indus6 },
  { id: 7, name: "Clean Technology", icon: Indus7 },
  { id: 8, name: "Shipping and Logistics", icon: Indus8, isHighlighted: true },
  { id: 9, name: "Transportation", icon: Indus9 },
];

const Industries: React.FC<{ className?: string; heading?: string }> = ({ 
  className = "", 
  heading 
}) => {
  const [highlightedIds, setHighlightedIds] = useState<Set<number>>(
    new Set(industries.filter(i => i.isHighlighted).map(i => i.id))
  );

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

  return (
    <section className={`w-full bg-white ${className}`} aria-labelledby="industries-heading">
      <div className="px-4 sm:px-6 md:px-12 lg:px-[80px] xl:px-[120px] 2xl:px-[200px] 2xl:py-[84px] xl:py-[72px] lg:py-[60px] md:py-[52px] py-[40px]
 ">
        {/* Header */}
        {heading ? (
          <ParsedHtml
            htmlContent={heading}
            as="h2"
            id="industries-heading"
            className="text-center text-[32px] md:text-[60px] lg:text-[72px]  2xl:mb-16 xl:mb-14 mb-6 md:mb-12 "
          />
        ) : (
          <h2
            id="industries-heading"
            className="text-center text-[32px] md:text-[60px] lg:text-[72px]  2xl:mb-16 xl:mb-14 mb-6 md:mb-12 "
          >
            Industries <span className="">We Empower</span>
          </h2>
        )}

        {/* Grid of Industries */}
        <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 2xl:gap-4 xl:gap-6 md:gap-6 gap-4">
          {industries.map((industry, index) => {
            const showDivider = index < 9; // Show divider for first two rows (items 0-5)
            const isHighlighted = highlightedIds.has(industry.id);
            
            return (
              <div key={industry.id} className="relative">
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
      </div>
    </section>
  );
};

export default Industries;

