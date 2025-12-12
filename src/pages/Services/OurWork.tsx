import { useState, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import type { AppDispatch, RootState } from "@/store";
import { DefaultButton } from "@/Components/Button";
import ParsedHtml from "@/Components/ParsedHtml";
import { fetchServicePageData } from "@/store/Slice/UxDesgin/UxDesgin";
import { fetchCaseStudiesByPlatformTags } from "@/store/Slice/CaseStudy/CaseStudyThunk";
import type { CaseStudyData } from "@/store/Slice/CaseStudy/CaseStudyThunk";
import { cleanNameForUrl } from "@/utils/urlMapping";
import instagram from "@/assets/logo/insta.png";
import linkedin from "@/assets/logo/linkdin.png";
import dribbble from "@/assets/logo/dribble.png";
import behance from "@/assets/logo/behance.png";

// Helper function to check if file is an image
const isImageFile = (attachPath: string | undefined | null): boolean => {
  if (!attachPath || typeof attachPath !== 'string') {
    return false;
  }
  
  const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg', '.bmp', '.ico'];
  const lowerPath = attachPath.toLowerCase();
  
  return imageExtensions.some(ext => lowerPath.endsWith(ext));
};

// Helper function to convert API attachment path to full URL (only for images)
const getImageUrl = (attachPath: string | undefined | null): string => {
  if (!attachPath || typeof attachPath !== 'string' || attachPath.trim() === '') {
    return "";
  }
  
  // Only process image files
  if (!isImageFile(attachPath)) {
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
  heading?: string;
  description?: string;
  buttonData?: string | { text: string; href?: string };
}

const WorkSection = ({ 
  heading = "Our Work",
  description = "Integral to our approach is a comprehensive user research phase, discovering general and niche audience needs through quantitative and qualitative research.",
  buttonData
}: WorkSectionProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const servicePageData = useSelector((state: RootState) => state.servicePage.data);
  const servicePageLoading = useSelector((state: RootState) => state.servicePage.loading);
  const servicePageError = useSelector((state: RootState) => state.servicePage.error);
  const caseStudies = useSelector((state: RootState) => state.caseStudy.caseStudies);
  const caseStudyLoading = useSelector((state: RootState) => state.caseStudy.loading);
  const caseStudyError = useSelector((state: RootState) => state.caseStudy.error);

  // Fetch ServicePage data on mount
  useEffect(() => {
    if (!servicePageData && !servicePageLoading) {
      dispatch(fetchServicePageData('Page'));
    }
  }, [dispatch, servicePageData, servicePageLoading]);

  // Extract platform tag names from select_case_studies_by_tag
  const platformTagNames = useMemo(() => {
    if (!servicePageData?.select_case_studies_by_tag) {
      return [];
    }
    return servicePageData.select_case_studies_by_tag
      .map(item => item.pl_name)
      .filter((name): name is string => Boolean(name));
  }, [servicePageData]);

  // Generate categories from select_case_studies_by_tag (including "All")
  const categories = useMemo(() => {
    if (!servicePageData?.select_case_studies_by_tag) {
      return ["All"];
    }
    const categoryNames = servicePageData.select_case_studies_by_tag
      .map(item => item.pl_name)
      .filter((name): name is string => Boolean(name));
    return ["All", ...categoryNames];
  }, [servicePageData]);

  // Track if we've already fetched case studies for current platform tags
  const caseStudiesCount = Object.keys(caseStudies).length;
  
  // Fetch case studies when platform tags are available
  useEffect(() => {
    if (platformTagNames.length > 0 && !caseStudyLoading && caseStudiesCount === 0) {
      dispatch(fetchCaseStudiesByPlatformTags(platformTagNames));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, platformTagNames.join(','), caseStudyLoading, caseStudiesCount]);

  const [activeCategory, setActiveCategory] = useState<string>("All");

  // Filter case studies based on active category
  const filteredCaseStudies = useMemo(() => {
    const caseStudyArray = Object.values(caseStudies);
    
    if (activeCategory === "All") {
      return caseStudyArray;
    }

    return caseStudyArray.filter(caseStudy => {
      return caseStudy.platform_tags?.some(tag => tag.pl_name === activeCategory);
    });
  }, [caseStudies, activeCategory]);

  // Convert case studies to project cards format
  const projects = useMemo(() => {
    return filteredCaseStudies.map((caseStudy, index) => {
      const slug = cleanNameForUrl(caseStudy.name);
      const imageUrl = getFirstImage(caseStudy.attachments);
      const bgColor = defaultBgColors[index % defaultBgColors.length];
      
      // Get platform tags as category (only use pl_name, no fallback)
      const category = caseStudy.platform_tags && caseStudy.platform_tags.length > 0
        ? caseStudy.platform_tags[0].pl_name
        : "";

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
  }, [filteredCaseStudies]);

  // Only show loading if we're actively loading and don't have data yet
  const isLoading = (servicePageLoading && !servicePageData) || 
                   (caseStudyLoading && Object.keys(caseStudies).length === 0 && platformTagNames.length > 0);
  
  // Check for errors
  const hasError = servicePageError || caseStudyError;

  return (
    <section className=" px-4 sm:px-6 md:px-12 lg:px-[80px] xl:px-[120px] 2xl:px-[200px] 2xl:py-[84px] xl:py-[72px] lg:py-[60px] md:py-[52px] py-[40px] bg-background">
      <div className=" mx-auto">
        {/* Header */}
        <div className="text-center mb-6">
          {heading ? (
            <ParsedHtml
              htmlContent={heading}
              as="h2"
              className="text-5xl md:text-7xl 2xl:font-light font-medium mb-6"
            />
          ) : (
            <h2 className="text-5xl md:text-7xl 2xl:font-light font-medium mb-6">
              Our <span className="2xl:font-semibold font-medium">Work</span>
            </h2>
          )}
          {description && (
            <ParsedHtml
              htmlContent={description}
              as="p"
              className="text-[#3E3E3E] 2xl:max-w-[960px] mx-auto text-[14px] md:text-2xl font-urbanist"
            />
          )}
        </div>

        {/* Filter Tabs */}
        {categories.length > 1 && (
          <div className="flex flex-wrap justify-center 2xl:gap-3 gap-2 mb-6">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`2xl:px-6 2xl:py-2 px-2 py-1 font-light font-urbanist transition-all border-2 ${
                  activeCategory === category
                    ? "bg-[#F5F5F5] text-[#3E3E3E] border-[#5AC8DC] hover:bg-[#E3F2FD]"
                    : "text-[#535353] border-[#E9EAEC] hover:text-[#444444] hover:bg-gray-50"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        )}

        {/* Error State */}
        {hasError && (
          <div className="text-center py-12">
            <p className="text-red-500 text-lg font-urbanist">
              {servicePageError || caseStudyError || "Error loading data"}
            </p>
          </div>
        )}

        {/* Loading State */}
        {!hasError && isLoading && (
          <div className="text-center py-12">
            <p className="text-[#3E3E3E] text-lg font-urbanist">Loading projects...</p>
          </div>
        )}

        {/* Projects Grid */}
        {!isLoading && projects.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {projects.map((project) => (
              <ProjectCard key={project.id} {...project} />
            ))}
          </div>
        )}

        {/* Empty State */}
        {!isLoading && projects.length === 0 && (
          <div className="text-center py-12">
            <p className="text-[#3E3E3E] text-lg font-urbanist">No projects found.</p>
          </div>
        )}

        {/* View All Button */}
        <div className="flex justify-center">
          <DefaultButton 
            href={typeof buttonData === 'object' ? buttonData.href : '#'} 
            onClick={() => {}}
          >
            {buttonData 
              ? (typeof buttonData === 'string' ? buttonData : buttonData.text)
              : 'View All Projects'
            }
          </DefaultButton>
        </div>
        
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
      <Link to={link} className="block">
        {/* Top Category Tag + Image */}
        <div className="relative overflow-hidden">
          {category && (
            <div className="absolute top-1 left-1 z-10">
              <span className="bg-[#F5F5F5] 2xl:px-1 py-1 2xl:text-sm text-[10px] font-light text-[#3E3E3E] font-urbanist">
                {category}
              </span>
            </div>
          )}

          {image ? (
            <img
              src={image}
              alt={title}
              className="w-full lg:h-[202px] 2xl:h-[250px] h-[180px] object-cover"
              referrerPolicy="no-referrer"
              onError={(e) => {
                // Hide image on error and show fallback
                (e.target as HTMLImageElement).style.display = 'none';
                const parent = (e.target as HTMLImageElement).parentElement;
                if (parent && !parent.querySelector('.image-fallback')) {
                  const fallback = document.createElement('div');
                  fallback.className = 'w-full lg:h-[202px] 2xl:h-[250px] h-[180px] bg-gray-200 flex items-center justify-center image-fallback';
                  fallback.innerHTML = '<span class="text-gray-400 text-sm">No image</span>';
                  parent.appendChild(fallback);
                }
              }}
            />
          ) : (
            <div className="w-full lg:h-[202px] 2xl:h-[250px] h-[180px] bg-gray-200 flex items-center justify-center">
              <span className="text-gray-400 text-sm">No image</span>
            </div>
          )}
        </div>
      
        {/* Title and Subtitle - Only show short_title, main_platform */}
        <div className="bg-[#FFFFFF] py-2">
          <div className="flex flex-col justify-center">
            {title && (
              <h3 className="2xl:text-2xl text-[16px] font-semibold text-[#3E3E3E] leading-tight">
                {title}
              </h3>
            )}
            {subtitle && (
              <p className="text-[#3E3E3E] 2xl:text-base text-[12px] font-urbanist leading-tight">
                {subtitle}
              </p>
            )}
          </div>
        </div>
      </Link>
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
interface OurWorkProps {
  heading?: string;
  description?: string;
  buttonData?: string | { text: string; href?: string };
}

const OurWork = ({ heading, description, buttonData }: OurWorkProps) => {
  return (
    <>
      <WorkSection heading={heading} description={description} buttonData={buttonData} />
     <SocialCta/>
    </>
  );
};

export default OurWork;
