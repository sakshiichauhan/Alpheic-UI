import React, { useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@/store";
import { fetchIndustryL2Data } from "@/store/Slice/IndustryPage/TechnologyPageThunk";
import { findOriginalIndustryName } from "@/utils/urlMapping";
import Sparkle from "@/assets/ServicePage/Star.png";
import { ParsedHtml } from "@/Components/ParsedHtml";

interface FeatureCardProps {
  title: string;
  description: string;
  index: number;
  totalItems: number;
  image?: string;
}

interface WhatDeliverProps {
  industryName?: string;
  className?: string;
}

const FeatureCard = ({ title, description, index, totalItems, image }: FeatureCardProps) => {
  // Calculate grid positions
  const cols2 = 2; // grid-cols-2 (mobile and md)
  const cols3 = 3; // lg:grid-cols-3
  
  // For 2-column layout (mobile and md)
  const isLastInRow2 = (index + 1) % cols2 === 0; // Right column: indices 1, 3, 5
  const isLastRow2 = index >= totalItems - cols2; // Last row: indices 4, 5
  
  // For 3-column layout (lg+)
  const isLastInRow3 = (index + 1) % cols3 === 0; // Right column: indices 2, 5
  const isLastRow3 = index >= totalItems - cols3; // Last row: indices 3, 4, 5
  
  // Build border classes - always top and left, conditional right and bottom
  const baseRightBorder = isLastInRow2 ? "border-r border-[#CCEEF4]" : "border-r-0";
  const baseBottomBorder = isLastRow2 ? "border-b border-[#CCEEF4]" : "border-b-0";
  const lgRightBorder = isLastInRow3 ? "lg:border-r lg:border-[#CCEEF4]" : "lg:border-r-0";
  const lgBottomBorder = isLastRow3 ? "lg:border-b lg:border-[#CCEEF4]" : "lg:border-b-0";
  
  const borderClasses = [
    "border-t border-l border-[#CCEEF4]", // Top and left on all items
    baseRightBorder, // Right border for 2-col layout
    baseBottomBorder, // Bottom border for 2-col layout
    lgRightBorder, // Right border override for 3-col layout
    lgBottomBorder, // Bottom border override for 3-col layout
  ].filter(Boolean).join(" ");

  // Helper function to convert API attachment path to full URL
  const getImageUrl = (attachPath: string | undefined): string => {
    if (!attachPath) return Sparkle;
    // If it's already a full URL, return as is
    if (attachPath.startsWith('http://') || attachPath.startsWith('https://')) {
      return attachPath;
    }
    // If it starts with /files/, construct full URL
    if (attachPath.startsWith('/files/')) {
      const apiBaseUrl = 'https://work.alpheric.com';
      return apiBaseUrl ? `${apiBaseUrl}${attachPath}` : attachPath;
    }
    // If it starts with /, use as relative path (proxy will handle it)
    if (attachPath.startsWith('/')) {
      return attachPath;
    }
    // Otherwise, assume it's a relative path
    return attachPath;
  };

  const imageUrl = image ? getImageUrl(image) : Sparkle;

  return (
    <div className={`flex flex-col items-start xl:p-[32px] md:p-[24px] p-[16px] xl:gap-[24px] md:gap-[20px] gap-[16px] ${borderClasses}`}>
      <img 
        src={imageUrl} 
        alt="Feature icon" 
        className="xl:w-[48px] xl:h-[48px] md:w-[32px] md:h-[32px] w-[24px] h-[24px] object-contain"
        referrerPolicy="no-referrer"
      />
      <div className="space-y-2">
        <h3 className="text-[14px] sm:text-[16px] md:text-[20px] lg:text-[24px] font-semibold whitespace-pre-line">
          {title}
        </h3>
        <p className="text-[12px] sm:text-[14px] md:text-[16px] lg:text-[20px] text-[var(--medium-text)] font-urbanist">
          {description}
        </p>
      </div>
    </div>
  );
};

const WhatDeliver: React.FC<WhatDeliverProps> = ({ 
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
  if (data && data.whatwedeliver !== 1) {
    return null;
  }

  const heading = data?.whatwedeliver_heading;
  const cards = data?.whatwedeliver_cards || [];

  // Default features if no API data
  const defaultFeatures = [
    {
      title: "Digital Transformation",
      description: "Align technology with business goals for measurable growth.",
    },
    {
      title: "Cloud & Infrastructure",
      description: "Secure, scalable, and performance-optimized systems.",
    },
    {
      title: "AI & Automation",
      description: "Empowering decision-making and efficiency.",
    },
    {
      title: "Cybersecurity",
      description: "Trust through proactive defense and compliance.",
    },
    {
      title: "Product Engineering",
      description: "From MVPs to enterprise systems built for scale.",
    },
    {
      title: "Data & Insights",
      description: "Turning raw data into actionable intelligence.",
    },
  ];

  const features = cards.length > 0 
    ? cards.map(card => ({
        title: card.title || '',
        description: card.description || '',
        image: card.attach_image,
      }))
    : defaultFeatures.map(f => ({ ...f, image: undefined }));

  return (
    <section className={`px-4 sm:px-6 md:px-12 lg:px-[80px] xl:px-[120px] 2xl:px-[200px] 2xl:py-[84px] xl:py-[72px] lg:py-[60px] md:py-[52px] py-[40px] bg-background ${className}`}>
      <div>
        {/* Heading Section */}
        <div className="text-center mb-16 space-y-4">
          {heading ? (
            <ParsedHtml
              htmlContent={heading}
              as="h2"
              className="text-[24px] sm:text-[32px] md:text-6xl lg:text-7xl font-light leading-tight"
            />
          ) : (
            <h2 className="text-[24px] sm:text-[32px] md:text-6xl lg:text-7xl font-light leading-tight">
              What <span className="font-semibold">We Deliver</span>
            </h2>
          )}
        </div>

        {/* Feature Grid */}
        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((index) => (
              <div key={index} className="xl:p-[32px] md:p-[24px] p-[16px] border-t border-l border-[#CCEEF4] animate-pulse">
                <div className="xl:w-[48px] xl:h-[48px] md:w-[32px] md:h-[32px] w-[24px] h-[24px] bg-gray-200 rounded mb-4"></div>
                <div className="h-6 bg-gray-200 rounded mb-2"></div>
                <div className="h-4 bg-gray-200 rounded"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => (
              <FeatureCard 
                key={index} 
                title={feature.title} 
                description={feature.description}
                image={feature.image}
                index={index}
                totalItems={features.length}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default WhatDeliver;
