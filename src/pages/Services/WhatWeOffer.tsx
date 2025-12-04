import React from "react";
import lightning from "@/assets/AboutUsPage/Lightning.png";
import {ArrowUpRight} from "lucide-react"
import { DefaultButton } from "@/Components/Button";
import ParsedHtml from "@/Components/ParsedHtml";
import type { ServiceHireCard } from "@/store/Slice/UxDesgin/UxDesgin";

// Helper function to construct image URL from API path
const getImageUrl = (imagePath?: string): string => {
  if (!imagePath) return lightning;
  
  // If it's already a full URL, return as-is
  if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
    return imagePath;
  }
  
  // If it starts with /files/, use the path directly
  if (imagePath.startsWith('/files/')) {
    const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || '';
    return apiBaseUrl ? `${apiBaseUrl}${imagePath}` : imagePath;
  }
  
  // Fallback to default icon if path is invalid
  return lightning;
};

const WhatWeOffer: React.FC<{ className?: string; heading?: string; cards?: ServiceHireCard[]; buttonData?: string }> = ({ 
  className = "", 
  heading,
  cards = [],
  buttonData
}) => {
  // Default fallback services if no cards provided
  const defaultServices: ServiceHireCard[] = [
    {
      name: "ux-research-user-testing",
      title: "UX Research & User Testing",
      description: "Creating seamless digital journeys that connect user needs with business goals.",
      doctype: "ImageCard",
    },
    {
      name: "ui-design-system",
      title: "UI Design System",
      description: "Creating seamless digital journeys that connect user needs with business goals.",
      doctype: "ImageCard",
    },
    {
      name: "prototyping-interaction-design",
      title: "Prototyping & Interaction Design",
      description: "Creating seamless digital journeys that connect user needs with business goals.",
      doctype: "ImageCard",
    },
    {
      name: "ux-audits-usability-optimization",
      title: "UX Audits & Usability Optimization",
      description: "Creating seamless digital journeys that connect user needs with business goals.",
      doctype: "ImageCard",
    },
    {
      name: "app-web-design-integration",
      title: "App & Web Design Integration",
      description: "Creating seamless digital journeys that connect user needs with business goals.",
      doctype: "ImageCard",
    },
  ];

  const services = cards.length > 0 ? cards : defaultServices;
  return (
    <section className={`w-full bg-[#FFFFFF] ${className}`} aria-labelledby="wwd-heading">
      <div className="px-4 sm:px-6 md:px-12 lg:px-[80px] xl:px-[120px] 2xl:px-[200px] 2xl:py-[84px] xl:py-[72px] lg:py-[60px] md:py-[52px] py-[40px]  flex flex-col 2xl:gap-[40px] gap-[20px]">
        {heading ? (
          <ParsedHtml
            htmlContent={heading}
            as="h2"
            id="wwd-heading"
            className="text-center 2xl:text-[72px] xl:text-[72px] text-[32px] text-[#000000]"
          />
        ) : (
          <h2
            id="wwd-heading"
            className="text-center 2xl:text-[72px] xl:text-[72px] text-[32px] text-[#000000]"
          >
            What <span className="font-semibold">Hire with Alpheric</span>
          </h2>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-around gap-[32px] bg-[#FBFBFB] ">
          {services.map((service) => {
            const imageUrl = getImageUrl(service.attach_image);
            const isDefaultIcon = !service.attach_image;
            
            return (
              <a
                key={service.name}
                href="#"
                className="relative  2xl:p-[32px] p-4 2xl:gap-[30px]  gap-[2px] flex flex-col bg-[#FBFBFB] shadow-2xs"
              >
                <div className="flex items-start justify-between">
                  <img 
                    src={imageUrl} 
                    alt={service.title || "Service icon"} 
                    className={`2xl:w-[72px] 2xl:h-[72px] w-[40px] h-[40px] ${isDefaultIcon ? '' : 'object-contain'}`}
                    onError={(e) => {
                      // Fallback to default icon if image fails to load
                      const target = e.target as HTMLImageElement;
                      if (target.src !== lightning) {
                        target.src = lightning;
                      }
                    }}
                  />
                  <ArrowUpRight className="2xl:w-[54px] 2xl:h-[54px] w-[40px] h-[40px] stroke-width-[1.5]" />
                </div>
                <div className="flex flex-col gap-[16px]">
                  <h3 className="2xl:text-[24px] text-[16px] font-semibold text-black">
                    {service.title}
                  </h3>
                  <p className="2xl:text-[20px] text-[12px]  text-[var(--medium-text)] font-urbanist">
                    {service.description}
                  </p>
                </div>
              </a>
            );
          })}
        </div>

        <div className="flex justify-center">
          <DefaultButton
            onClick={() => {}}
            href="/Services"
          >
            {buttonData || "Explore Our Services"}
          </DefaultButton>
        </div>
      </div>
    </section>
  );
};

export default WhatWeOffer;
