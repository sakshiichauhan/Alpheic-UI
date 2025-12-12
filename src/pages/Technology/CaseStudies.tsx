import React, { useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@/store";
import { fetchIndustryL2Data } from "@/store/Slice/IndustryPage/TechnologyPageThunk";
import { fetchCaseStudiesByIndustry } from "@/store/Slice/CaseStudy/CaseStudyThunk";
import { findOriginalIndustryName, cleanNameForUrl } from "@/utils/urlMapping";
import type { CaseStudyData } from "@/store/Slice/CaseStudy/CaseStudyThunk";
import { ArrowUpRight} from "lucide-react";
import { DefaultButton } from "@/Components/Button";
import { ParsedHtml } from "@/Components/ParsedHtml";
import instagram from "@/assets/logo/insta.png";
import linkedin from "@/assets/logo/linkdin.png";
import dribbble from "@/assets/logo/dribble.png";
import behance from "@/assets/logo/behance.png";

// Helper function to convert API attachment path to full URL
const getImageUrl = (attachPath: string | undefined | null): string => {
  if (!attachPath || typeof attachPath !== 'string' || attachPath.trim() === '') {
    return "";
  }
  
  const trimmedPath = attachPath.trim();
  
  // If it's already a full URL, return as is
  if (trimmedPath.startsWith("http://") || trimmedPath.startsWith("https://")) {
    return trimmedPath;
  }
  
  // If it starts with /files/, construct the full URL
  if (trimmedPath.startsWith("/files/")) {
    return `https://work.alpheric.com${trimmedPath}`;
  }
  
  // If it doesn't start with /, add /files/ prefix
  if (!trimmedPath.startsWith("/")) {
    return `https://work.alpheric.com/files/${trimmedPath}`;
  }
  
  // Otherwise, construct the full URL
  return `https://work.alpheric.com${trimmedPath}`;
};

// Helper function to check if attachment is a video
const isVideoFile = (attachPath: string | undefined | null): boolean => {
  if (!attachPath || typeof attachPath !== 'string') {
    return false;
  }
  
  const videoExtensions = ['.mp4', '.webm', '.ogg', '.mov', '.avi', '.mkv', '.m4v'];
  const lowerPath = attachPath.toLowerCase();
  
  return videoExtensions.some(ext => lowerPath.endsWith(ext));
};

// Import cleanNameForUrl utility
import { cleanNameForUrl } from "@/utils/urlMapping";

// Helper function to get first image from attachments (skip videos)
const getFirstImage = (attachments: CaseStudyData['attachments']): string => {
  if (!attachments || !Array.isArray(attachments)) {
    return "";
  }

  // Find first non-video attachment
  for (const attachment of attachments) {
    if (attachment.attach && !isVideoFile(attachment.attach)) {
      const url = getImageUrl(attachment.attach);
      if (url) {
        return url;
      }
    }
  }

  return "";
};

// Default background colors for cards
const defaultBgColors = ["#E3F2FD", "#F5F5F5", "#FFFFFF", "#E3F2FD", "#F5F5F5", "#FFFFFF"];

interface WorkSectionProps {
  className?: string;
}

const WorkSection: React.FC<WorkSectionProps> = ({ 
  className = ""
}) => {
  const { industryName } = useParams<{ industryName?: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const { data, loading } = useSelector((state: RootState) => state.technologyPage);
  const { caseStudies, loading: caseStudyLoading } = useSelector((state: RootState) => state.caseStudy);
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

  // Fetch case studies by industry when industry changes
  useEffect(() => {
    if (currentIndustry && !caseStudyLoading) {
      // Check if we already have case studies for this industry
      const hasCaseStudiesForIndustry = Object.values(caseStudies).some(caseStudy => 
        caseStudy.industry_linking?.some(link => link.name1 === currentIndustry)
      );
      
      // Only fetch if we don't have case studies for this industry
      if (!hasCaseStudiesForIndustry) {
        dispatch(fetchCaseStudiesByIndustry(currentIndustry));
      }
    }
  }, [dispatch, currentIndustry, caseStudyLoading, caseStudies]);

  // Transform case studies to project cards format
  const projects = useMemo(() => {
    const caseStudyArray = Object.values(caseStudies);
    
    // Filter case studies by current industry using industry_linking
    const filteredCaseStudies = caseStudyArray.filter(caseStudy => 
      caseStudy.industry_linking?.some(link => link.name1 === currentIndustry)
    );

    return filteredCaseStudies.map((caseStudy, index) => {
      const slug = cleanNameForUrl(caseStudy.name);
      const imageUrl = getFirstImage(caseStudy.attachments);
      const bgColor = defaultBgColors[index % defaultBgColors.length];
      
      // Get category from industry_linking (first matching industry) or fallback to platform_tags
      const category = caseStudy.industry_linking && caseStudy.industry_linking.length > 0
        ? caseStudy.industry_linking[0].name1
        : (caseStudy.platform_tags && caseStudy.platform_tags.length > 0
          ? caseStudy.platform_tags[0].pl_name
          : "");

      return {
        id: caseStudy.name,
        category,
        title: caseStudy.short_title || "",
        subtitle: caseStudy.main_platform || "",
        image: imageUrl || "",
        bgColor,
        link: `/case-study/${slug}`
      };
    });
  }, [caseStudies, currentIndustry]);

  // Check flag - if 0, don't render
  if (data && data.case_study !== 1) {
    return null;
  }

  const heading = data?.case_study_heading;
  const subheading = data?.case_study_subheading;
  const buttonText = data?.case_study_buttontext;
  
  // Combined loading state
  const isLoading = loading || caseStudyLoading;
  return (
    <section className={`px-4 sm:px-6 md:px-12 lg:px-[80px] xl:px-[120px] 2xl:px-[200px] 2xl:pt-[84px] xl:pt-[72px] lg:pt-[60px] md:pt-[52px] pt-[40px] bg-background ${className}`}>
      <div className=" mx-auto">
        {/* Header */}
        <div className="text-center lg:mb-8 md:mb-6 mb-4">
          {heading ? (
            <ParsedHtml
              htmlContent={heading}
              as="h2"
              className="text-[24px] sm:text-[32px] md:text-6xl lg:text-7xl font-semibold leading-tight lg:mb-4 md:mb-3 mb-2"
            />
          ) : (
            <h2 className="text-[24px] sm:text-[32px] md:text-6xl lg:text-7xl font-semibold leading-tight lg:mb-4 md:mb-3 mb-2">
              Case Studies / Our Actions
            </h2>
          )}
          {subheading && (
            <p className="text-[16px] sm:text-[18px] md:text-[20x] lg:text-[24px] xl:text-[28px] 2xl:text-[32px] font-semibold text-[var(--medium-text)] font-urbanist ">
              {subheading}
            </p>
          )}
        </div>

        {/* Projects Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:mb-12 md:mb-10 mb-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-gray-200 animate-pulse h-[300px]"></div>
            ))}
          </div>
        ) : projects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:mb-12 md:mb-10 mb-8">
            {projects.map((project) => (
              <ProjectCard key={project.id} {...project} />
            ))}
          </div>
        ) : null}

        {/* View All Button */}
        {buttonText && (
          <div className="flex justify-center">
            <DefaultButton href="#" onClick={() => {}}>
              {buttonText}
            </DefaultButton>
          </div>
        )}
        
      </div>
      
    </section>
    
  );
};

// ProjectCard Component
interface ProjectCardProps {
  category: string;
  title: string;
  subtitle: string;
  image: string;
  bgColor: string;
  link: string;
}

const ProjectCard = ({ category, title, subtitle, bgColor, image, link }: ProjectCardProps) => {
  return (
    <div 
      className="group overflow-hidden border-0"
      style={{ backgroundColor: bgColor }}
    >
      <a href={link} className="block">
        {/* Top Category Tag + Image */}
        <div className="relative overflow-hidden">
          <div className="absolute top-1 left-1">
            <span className="bg-[#F5F5F5] 2xl:px-1 py-1 2xl:text-sm text-[10px] font-light text-[#3E3E3E] font-urbanist">
              {category}
            </span>
          </div>

          
            <img
              src={image}
              alt={title}
              className="2xl:w-full 2xl:h-full w-full h-[202px] object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
      

        {/* Title, Subtitle, and Icon */}
        <div className="bg-[#FFFFFF]  py-2 relative">
          <div className="flex flex-col justify-center">
            <h3 className="2xl:text-2xl text-[16px] font-semibold text-[#3E3E3E] leading-tight">
              {title}
            </h3>
            <p className="text-[#3E3E3E] 2xl:text-base text-[12px] font-urbanist leading-tight">
              {subtitle}
            </p>
          </div>

          {/* Icon Positioned Between */}
          <ArrowUpRight strokeWidth={1.5}
            className="absolute right-2 top-1/2 -translate-y-1/2 w-6 h-6 2xl:w-10 2xl:h-10 text-[#000000] "
          />
        </div>
      </a>
    </div>
  );
};

// SocialMedia Component
type Social = { name: string; href: string; image: string };

const items: Social[] = [
  { name: "Dribbble", href: "#", image: dribbble },
  { name: "Behance", href: "#", image: behance },
  { name: "LinkedIn", href: "#", image: linkedin },
  { name: "Instagram", href: "#", image: instagram },
];

function SocialCta() {
  return (
    <>
    <div className="w-full flex flex-col items-center gap-[16px] sm:gap-[20px] lg:gap-[32px] md:pt-[0px] pt-[px]">


      {/* Subheading */}
      <p className="pt-[0px] lg:pt-[28px] xl:pt-[42px] text-[14px] sm:text-[16px] md:text-[18px] lg:text-[20px] tracking-[0.18em] text-[var(--medium-text)] uppercase font-urbanist">
        A SNEAK PEAK INTO OUR SOCIAL MEDIA
      </p>

      {/* Social row */}
      <ul className="flex flex-wrap items-center justify-center gap-x-[16px] sm:gap-x-[24px] lg:gap-x-[32px] gap-y-[8px] sm:gap-y-[12px] mb-2">
        {items.map(({ name, href, image }) => (
          <li key={name} className="flex items-center gap-[12px] sm:gap-[16px] lg:gap-[24px] ">
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-[6px] sm:gap-[8px] lg:gap-[10px]"
              aria-label={name}
            >
                <img
                  src={image}
                  alt={name}
                  className="h-auto w-[32px] sm:w-[48px] lg:w-[72px] object-contain"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
              <span className="hidden md:block text-[16px] lg:text-[20px] font-regular text-black ">{name}</span>
            </a>
          </li>
        ))}
      </ul>
    </div>
    </>
  );
}
// Main component that includes both WorkSection and SocialMedia
interface CaseStudiesProps {
  className?: string;
}

const CaseStudies: React.FC<CaseStudiesProps> = ({ className = "" }) => {
  return (
    <>
      <WorkSection className={className} />
     <SocialCta/>
    </>
  );
};

export default CaseStudies;