import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@/store";
import { fetchIndustryL2Data } from "@/store/Slice/IndustryPage/TechnologyPageThunk";
import lightning from "@/assets/AboutUsPage/Lightning.png";
import {ArrowUpRight} from "lucide-react"
import { DefaultButton } from "@/Components/Button";
import { ParsedHtml } from "@/Components/ParsedHtml";

type Service = { title: string; desc: string; href?: string; image?: string };

interface HireAlphericProps {
  className?: string;
}

const defaultServices: Service[] = [
    { 
      title: "AI Agents & Automation Systems", 
      desc: "Creating seamless digital journeys that connect user needs with business goals." 
    },
    { 
      title: "UX/UI & Product Experience Design", 
      desc: "Creating seamless digital journeys that connect user needs with business goals." 
    },
    { 
      title: "Brand Strategy & Digital Communication", 
      desc: "Creating seamless digital journeys that connect user needs with business goals." 
    },
    { 
      title: "Cloud & Hosting Infrastructure", 
      desc: "Creating seamless digital journeys that connect user needs with business goals." 
    },
    { 
      title: "Enterprise Platforms & SaaS Development", 
      desc: "Creating seamless digital journeys that connect user needs with business goals." 
    },
    { 
      title: "CSR, Education & Sports-Tech Ecosystems", 
      desc: "Creating seamless digital journeys that connect user needs with business goals." 
    },
  ];

const HireAlpheric: React.FC<HireAlphericProps> = ({ 
  className = "" 
}) => {
  const { industryName } = useParams<{ industryName?: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const { data, loading } = useSelector((state: RootState) => state.technologyPage);

  // Get industry name from route or use default
  const currentIndustry = industryName ? decodeURIComponent(industryName) : "Energy & Environment";

  useEffect(() => {
    // Fetch industry data on component mount
    if (!data || data.name !== currentIndustry) {
      if (!loading) {
        dispatch(fetchIndustryL2Data(currentIndustry));
      }
    }
  }, [dispatch, data, loading, currentIndustry]);

  // Check flag - if 0, don't render
  if (data && data.hire_section !== 1) {
    return null;
  }

  const heading = data?.hire_section_heading;
  const description = data?.hire_section_description;
  const lastText = data?.hire_section_lasttext;
  const buttonText = data?.hire_section_buttontext;
  const cards = data?.hire_section_cards || [];
  // Helper function to convert API attachment path to full URL
  const getImageUrl = (attachPath: string | undefined): string => {
    if (!attachPath) return lightning;
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

  const services: Service[] = cards.length > 0
    ? cards.map(card => ({
        title: card.title || '',
        desc: card.description || '',
        image: card.attach_image,
      }))
    : defaultServices;
  return (
    <section className={`w-full ${className}`} aria-labelledby="wwd-heading">
      <div className="px-4 sm:px-6 md:px-12 lg:px-[80px] xl:px-[120px] 2xl:px-[200px] 2xl:py-[84px] xl:py-[72px] lg:py-[60px] md:py-[52px] py-[40px]  flex flex-col xl:gap-[32px] md:gap-[24px] gap-[16px]">
        <div className="text-center space-y-4">
          {heading ? (
            <ParsedHtml
              htmlContent={heading}
              as="h2"
              id="wwd-heading"
              className="text-center 2xl:text-[72px]  xl:text-[72px] text-[32px] text-[#000000]"
            />
          ) : (
            <h2
              id="wwd-heading"
              className="text-center 2xl:text-[72px]  xl:text-[72px] text-[32px] text-[#000000]"
            >
              What <span className="font-semibold">Hire with Alpheric</span>
            </h2>
          )}
          
          {description && (
            <div className="text-[14px] sm:text-[16px] md:text-[18px] lg:text-[20px] xl:text-[24px] text-[var(--medium-text)] font-urbanist">
              <ParsedHtml htmlContent={description} as="div" />
            </div>
          )}
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 justify-around gap-[32px] bg-[#FBFBFB]">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="xl:p-[32px] lg:p-[24px] md:p-[20px] sm:p-[16px] p-[12px] bg-[#FBFBFB] animate-pulse">
                <div className="flex items-start justify-between mb-4">
                  <div className="lg:w-[40px] lg:h-[40px] w-[32px] h-[32px] bg-gray-200 rounded"></div>
                  <div className="border-2 border-gray-200 p-[8px]">
                    <div className="lg:w-[30px] lg:h-[30px] w-[24px] h-[24px] bg-gray-200"></div>
                  </div>
                </div>
                <div className="h-6 bg-gray-200 rounded mb-4"></div>
                <div className="h-4 bg-gray-200 rounded"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 justify-around gap-[32px] bg-[#FBFBFB] ">
            {services.map((s, i) => (
              <a
                key={i}
                href={s.href ?? "#"}
                className="relative  xl:p-[32px] lg:p-[24px] md:p-[20px] sm:p-[16px] p-[12px] lg:gap-[30px] md:gap-[24px] gap-[16px] flex flex-col bg-[#FBFBFB]"
              >
                <div className="flex items-start justify-between">
                  <img 
                    src={getImageUrl(s.image)} 
                    alt="Icon" 
                    className=" lg:w-[40px] lg:h-[40px] w-[32px] h-[32px] object-contain"
                    referrerPolicy="no-referrer"
                  />
                  <div className="border-2 border-[var(--color)] p-[8px]"><ArrowUpRight strokeWidth={1.5} className="lg:w-[30px] lg:h-[30px] w-[24px] h-[24px]" /></div>
                </div>
                <div className="flex flex-col gap-[16px]">
                  <h3 className="xl:text-[24px] md:text-[20px] text-[16px] font-semibold text-black">
                    {s.title}
                  </h3>
                  <p className="xl:text-[20px] md:text-[18px] text-[14px]  text-[var(--medium-text)] font-urbanist">{s.desc}</p>
                </div>
              </a>
            ))}
          </div>
        )}

        {lastText && (
          <p className="text-[16px] text-center sm:text-[18px] md:text-[20px] lg:text-[24px] xl:text-[28px] text-[var(--medium-text)] font-urbanist ">
            {lastText}
          </p>
        )}

        {buttonText && (
          <div className="flex justify-center">
            <DefaultButton
              onClick={() => {}}
              href="#"
            >
              {buttonText}
            </DefaultButton>
          </div>
        )}
      </div>
    </section>
  );
};

export default HireAlpheric;
