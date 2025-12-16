import { useEffect, useMemo, useState } from "react";
import { ArrowUpRight} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import type { AppDispatch, RootState } from "@/store";
import { fetchServicePageData } from "@/store/Slice/UxDesgin/UxDesgin";
import { fetchAllCaseStudies } from "@/store/Slice/CaseStudy/CaseStudyThunk";
import type { CaseStudyData } from "@/store/Slice/CaseStudy/CaseStudyThunk";
import { cleanNameForUrl } from "@/utils/urlMapping";
import instagram from "@/assets/logo/insta.png";
import linkedin from "@/assets/logo/linkdin.png";
import dribbble from "@/assets/logo/dribble.png";
import behance from "@/assets/logo/behance.png";

// Helper function to check if file is an image
const isImageFile = (attachPath: string | undefined | null): boolean => {
  if (!attachPath || typeof attachPath !== 'string') return false;
  const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg', '.bmp', '.ico'];
  const lowerPath = attachPath.toLowerCase();
  return imageExtensions.some(ext => lowerPath.endsWith(ext));
};

// Helper function to convert API attachment path to full URL (only for images)
const getImageUrl = (attachPath: string | undefined | null): string => {
  if (!attachPath || typeof attachPath !== 'string' || attachPath.trim() === '') return "";
  if (!isImageFile(attachPath)) return "";
  const trimmedPath = attachPath.trim();
  return `https://work.alpheric.com${trimmedPath}`;
};

// Helper function to check if attachment is a video
const isVideoFile = (attachPath: string | undefined | null): boolean => {
  if (!attachPath || typeof attachPath !== 'string') return false;
  const videoExtensions = ['.mp4', '.webm', '.ogg', '.mov', '.avi', '.mkv', '.m4v'];
  const lowerPath = attachPath.toLowerCase();
  return videoExtensions.some(ext => lowerPath.endsWith(ext));
};

// Helper function to get first image from attachments (skip videos)
const getFirstImage = (attachments: CaseStudyData['attachments']): string => {
  if (!attachments || !Array.isArray(attachments)) return "";
  for (const attachment of attachments) {
    if (attachment.attach && !isVideoFile(attachment.attach)) {
      const url = getImageUrl(attachment.attach);
      if (url) return url;
    }
  }
  return "";
};

// Default background colors for cards
const defaultBgColors = ["#E3F2FD", "#F5F5F5", "#FFFFFF", "#E3F2FD", "#F5F5F5", "#FFFFFF"];

const WorkSection = () => {
  const dispatch = useDispatch<AppDispatch>();
  const servicePageData = useSelector((state: RootState) => state.servicePage.data);
  const servicePageLoading = useSelector((state: RootState) => state.servicePage.loading);
  const caseStudies = useSelector((state: RootState) => state.caseStudy.caseStudies);
  const caseStudyLoading = useSelector((state: RootState) => state.caseStudy.loading);

  // Fetch ServicePage data on mount
  useEffect(() => {
    if (!servicePageData && !servicePageLoading) {
      dispatch(fetchServicePageData('Page'));
    }
  }, [dispatch, servicePageData, servicePageLoading]);

  // Fetch all case studies (no platform tag filtering)
  useEffect(() => {
    if (!caseStudyLoading && Object.keys(caseStudies).length === 0) {
      dispatch(fetchAllCaseStudies());
    }
  }, [dispatch, caseStudyLoading, caseStudies]);

  // Derive parent_tag categories for UI tabs (UI only)
  const categories = useMemo(() => {
    const caseStudyArray = Object.values(caseStudies);
    const tagNames = caseStudyArray
      .map((cs: any) => cs.parent_tag as string | undefined)
      .filter((tag): tag is string => !!tag && tag.trim().length > 0);
    const unique = Array.from(new Set(tagNames));
    return ["All", ...unique];
  }, [caseStudies]);

  const [activeCategory, setActiveCategory] = useState<string>("All");

  // Keep activeCategory in sync when categories change
  useEffect(() => {
    if (!categories.includes(activeCategory)) {
      setActiveCategory(categories[0] || "All");
    }
  }, [categories, activeCategory]);

  // Build projects from case studies
  const projects = useMemo(() => {
    const caseStudyArray = Object.values(caseStudies);
    return caseStudyArray.map((caseStudy, index) => {
      const slug = cleanNameForUrl(caseStudy.name);
      const imageUrl = getFirstImage(caseStudy.attachments);
      const bgColor = defaultBgColors[index % defaultBgColors.length];
      const category = (caseStudy as any).parent_tag || "";
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
  }, [caseStudies]);

  // Filter projects by activeCategory (All shows everything)
  const filteredProjects = useMemo(() => {
    if (activeCategory === "All") return projects;
    return projects.filter((p) => (p.category || "").trim() === activeCategory);
  }, [projects, activeCategory]);

  return (
    <section className=" px-4 sm:px-6 md:px-12 lg:px-[80px] xl:px-[120px] 2xl:px-[200px] 2xl:pt-[84px] xl:pt-[72px] lg:pt-[60px] md:pt-[52px] pt-[40px] bg-background">
      <div className=" mx-auto">

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

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {filteredProjects.map((project) => (
            <ProjectCard key={project.id} {...project} />
          ))}
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
            <div className="absolute top-1 left-1">
              <span className="bg-[#F5F5F5] 2xl:px-1 py-1 2xl:text-sm text-[10px] font-light text-[#3E3E3E] font-urbanist">
                {category}
              </span>
            </div>
          )}

          
            <img
              src={image}
              alt={title}
              className="w-full lg:h-[202px] 2xl:h-[250px] h-[180px] object-cover"
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
          <ArrowUpRight
            className="absolute right-2 top-1/2 -translate-y-1/2 w-6 h-6 2xl:w-10 2xl:h-10 text-[#000000] "
          />
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
    <div className="w-full flex flex-col items-center gap-[16px] sm:gap-[20px] lg:gap-[32px] pt-[40px] 2xl:pb-[84px] xl:pb-[72px] lg:pb-[60px] md:pb-[52px] pb-[40px]">


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
const SubHero = () => {
  return (
    <>
      <WorkSection />
     <SocialCta/>
    </>
  );
};

export default SubHero;