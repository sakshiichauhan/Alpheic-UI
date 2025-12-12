import project1 from "@/assets/OurProjects/p1.png";
import project1_secondary from "@/assets/OurProjects/p1s.png";
import { ArrowUpRight } from "lucide-react";
import SneekPeak from "@/Components/SneekPeak";
import { motion } from "framer-motion";
import { useRef, useEffect, useMemo, useState } from "react";
import {  useScroll, useTransform } from "framer-motion";
import { DefaultButton } from "@/Components/Button";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllCaseStudies } from "@/store/Slice/CaseStudy/CaseStudyThunk";
import type { RootState } from "@/store/rootReducer";
import { cleanNameForUrl } from "@/utils/urlMapping";

type Project = {
  id: string;
  title: string;            // e.g., "CricksLab – Smarter Cricket UX"
  tags: string[];           // e.g., ["Product Design", "Dashboard Design", ...]
  heroMedia: { 
    src: string; 
    alt: string; 
    type: 'image' | 'video';  // media type
  };        // large left image or video
  secondaryImage: { src: string; alt: string };   // top-right image
  summary: string;          // right-bottom description card
  bgColor: string;          // background color for summary card
  caseStudySlug?: string;   // slug for internal case-study route
  caseStudyName?: string;   // API identifier (e.g., "CaseStudy-0014")
};

// Default background colors for projects (cycling through)
const defaultBgColors = ["#D4F3EA", "#CAE4F9", "#F4E4D4", "#E8D5E8", "#D4E8F4"];

// Fallback images
const fallbackImages = {
  hero: project1,
  secondary: project1_secondary,
};

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


const TagChip = ({ label }: { label: string }) => (
  <span className="inline-flex items-center border border-[#D9D9D9] bg-white px-[8px] sm:px-[12px] lg:px-[20px] py-[4px] sm:py-[10px] lg:py-[12px] 
  text-[10px] sm:text-[14px] lg:text-[20px] font-medium text-[var(--medium-text)] font-urbanist">
    {label}
  </span>
);

const ProjectBlock = ({ project }: { project: Project }) => {
  const navigate = useNavigate();
  const [videoError, setVideoError] = useState(false);

  const handleCaseStudyClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (project.caseStudySlug) {
      navigate(`/case-study/${project.caseStudySlug}`, { 
        state: { scrollToTitle: true } 
      });
    }
  };

  // Reset video error when project changes
  useEffect(() => {
    setVideoError(false);
  }, [project.id]);

  return (
    <section
      key={project.id}
      className="w-full px-[14px] sm:px-[20px] md:px-[42px] lg:px-[80px] xl:px-[120px] 2xl:px-[200px]  xl:pb-[120px] lg:pb-[60px] md:pb-[42px] pb-[24px]"
    >
      <div className="border md:border-none border-[var(--border-color)] p-[12px] sm:p-[16px] md:p-[0px]">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-[16px] sm:gap-[20px] lg:gap-[24px]">
        <h2 className="text-[16px] sm:text-[24px] md:text-[40px] lg:text-[48px] xl:text-[64px] font-semibold tracking-tight text-black">
          {project.title}
        </h2>

        {project.caseStudySlug && (
          <Link
            to={`/case-study/${project.caseStudySlug}`}
            onClick={handleCaseStudyClick}
            className="group hidden z-10 md:inline-flex h-full w-auto items-center justify-center border border-[var(--color)] bg-white text-black p-[8px] sm:p-[10px] lg:p-[12px] flex-shrink-0"
            aria-label="Open case study"
          >
            <ArrowUpRight className="h-auto w-[20px] sm:w-[24px] lg:w-[28px]" />
          </Link>
        )}
    </div>

    <div className="pt-[16px] sm:pt-[20px] lg:pt-[24px] flex flex-wrap gap-[8px] sm:gap-[10px] lg:gap-[12px] pb-[24px] sm:pb-[32px] lg:pb-[40px]">
      {project.tags.map((t) => (
        <TagChip key={t} label={t} />
      ))}
    </div>

    {/* Content Grid */}
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 sm:gap-6 md:gap-8 lg:items-stretch">
  {/* Left: hero image/video defines the row height, keeps original proportions */}
  <div className="xl:col-span-2">
    {project.caseStudySlug ? (
      <Link
        to={`/case-study/${project.caseStudySlug}`}
        onClick={handleCaseStudyClick}
        className="bg-white relative block cursor-pointer group"
        aria-label="Open case study"
      >
        {project.heroMedia.type === 'video' && !videoError ? (
          <video
            src={project.heroMedia.src}
            className="block w-full h-auto object-contain transition-opacity group-hover:opacity-90"
            controls
            playsInline
            muted
            loop
            onError={() => {
              setVideoError(true);
            }}
          />
        ) : (
          <img
            src={videoError ? fallbackImages.hero : project.heroMedia.src}
            alt={project.heroMedia.alt}
            className="block w-full h-auto object-contain transition-opacity group-hover:opacity-90"
            referrerPolicy="no-referrer"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              if (target.src !== fallbackImages.hero) {
                target.src = fallbackImages.hero;
              }
            }}
          />
        )}
        <div className="md:hidden block absolute top-2 right-2 border border-[var(--color)] bg-white text-black p-[6px] sm:p-[10px]">
          <ArrowUpRight className="h-auto w-[10px] sm:w-[18px]" />
        </div>
      </Link>
    ) : (
      <div className="bg-white relative">
        {project.heroMedia.type === 'video' && !videoError ? (
          <video
            src={project.heroMedia.src}
            className="block w-full h-auto object-contain"
            controls
            playsInline
            muted
            loop
            onError={() => {
              setVideoError(true);
            }}
          />
        ) : (
          <img
            src={videoError ? fallbackImages.hero : project.heroMedia.src}
            alt={project.heroMedia.alt}
            className="block w-full h-auto object-contain"
            referrerPolicy="no-referrer"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              if (target.src !== fallbackImages.hero) {
                target.src = fallbackImages.hero;
              }
            }}
          />
        )}
      </div>
    )}
  </div>

  {/* Right: follows left height and splits 50/50 */}
  <div className="lg:flex flex-col h-full gap-[16px] sm:gap-[24px] lg:gap-[32px] hidden">
    {/* Top-right image fills half height */}
    {project.caseStudySlug ? (
      <Link
        to={`/case-study/${project.caseStudySlug}`}
        onClick={handleCaseStudyClick}
        className="relative flex-1 overflow-hidden bg-white hidden xl:block cursor-pointer group"
        aria-label="Open case study"
      >
        <img
          src={project.secondaryImage.src}
          alt={project.secondaryImage.alt}
          className="absolute inset-0 w-full h-full object-cover transition-opacity group-hover:opacity-90"
          referrerPolicy="no-referrer"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            if (target.src !== fallbackImages.secondary) {
              target.src = fallbackImages.secondary;
            }
          }}
        />
      </Link>
    ) : (
      <div className="relative flex-1 overflow-hidden bg-white hidden xl:block">
        <img
          src={project.secondaryImage.src}
          alt={project.secondaryImage.alt}
          className="absolute inset-0 w-full h-full object-cover"
          referrerPolicy="no-referrer"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            if (target.src !== fallbackImages.secondary) {
              target.src = fallbackImages.secondary;
            }
          }}
        />
      </div>
    )}

    {/* Bottom-right summary fills the other half */}
    {project.caseStudySlug ? (
      <Link
        to={`/case-study/${project.caseStudySlug}`}
        onClick={handleCaseStudyClick}
        style={{ backgroundColor: project.bgColor }}
        className="flex-1 items-center justify-center
                   px-[16px] sm:px-[24px] md:px-[40px] lg:px-[52px]
                   py-[12px] sm:py-[16px] lg:py-[20px]
                   text-[14px] sm:text-[16px] md:text-[18px] lg:text-[20px]
                   leading-relaxed text-[var(--medium-text)] font-medium font-urbanist 
                   hidden xl:flex cursor-pointer group transition-opacity hover:opacity-90"
        aria-label="Open case study"
      >
        <p
          className="overflow-hidden text-ellipsis line-clamp-4 sm:line-clamp-5 lg:line-clamp-6"
          style={{ display: "-webkit-box", WebkitBoxOrient: "vertical" }}
        >
          {project.summary}
        </p>
      </Link>
    ) : (
      <div
        style={{ backgroundColor: project.bgColor }}
        className="flex-1 items-center justify-center
                   px-[16px] sm:px-[24px] md:px-[40px] lg:px-[52px]
                   py-[12px] sm:py-[16px] lg:py-[20px]
                   text-[14px] sm:text-[16px] md:text-[18px] lg:text-[20px]
                   leading-relaxed text-[var(--medium-text)] font-medium font-urbanist 
                   hidden xl:flex"
      >
        <p
          className="overflow-hidden text-ellipsis line-clamp-4 sm:line-clamp-5 lg:line-clamp-6"
          style={{ display: "-webkit-box", WebkitBoxOrient: "vertical" }}
        >
          {project.summary}
        </p>
      </div>
    )}
  </div>
</div>

</div>

    </section>
  );
};


















export default function OurProjects() {
  const dispatch = useDispatch();
  const { caseStudies, loading, error } = useSelector((state: RootState) => state.caseStudy);
  const heroRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.5]);

  // Fetch all case studies on mount
  useEffect(() => {
    // Only fetch if we don't have any case studies yet
    if (Object.keys(caseStudies).length === 0 && !loading) {
      dispatch(fetchAllCaseStudies() as any);
    }
  }, [dispatch, caseStudies, loading]);

  // Convert case studies from API to Project format - limit to first 4 for homepage
  const projects = useMemo(() => {
    const caseStudyArray = Object.values(caseStudies);
    
    if (caseStudyArray.length === 0) {
      return [];
    }

    // Slice to show only first 4 case studies
    return caseStudyArray.slice(0, 4).map((caseStudyData, index) => {
      const caseStudyName = caseStudyData.name;
      const slug = cleanNameForUrl(caseStudyName);
      
      // Get background color (cycle through default colors)
      const bgColor = defaultBgColors[index % defaultBgColors.length];

      // Extract only first 2 attachments for homepage
      const attachments = (caseStudyData.attachments || []).slice(0, 2);
      
      // Get hero media (image or video) - use first attachment or fallback
      let heroMediaSrc = fallbackImages.hero;
      let heroMediaType: 'image' | 'video' = 'image';
      if (attachments.length > 0 && attachments[0]?.attach) {
        const url = getImageUrl(attachments[0].attach);
        if (url) {
          heroMediaSrc = url;
          heroMediaType = isVideoFile(attachments[0].attach) ? 'video' : 'image';
        }
      }
      
      // Get secondary image - use second attachment (only if it's an image), or first if only one and it's an image, or fallback
      let secondaryImageSrc = fallbackImages.secondary;
      if (attachments.length > 1 && attachments[1]?.attach) {
        // Only use second attachment if it's an image (not a video)
        if (!isVideoFile(attachments[1].attach)) {
          const url = getImageUrl(attachments[1].attach);
          secondaryImageSrc = url || fallbackImages.secondary;
        }
      } else if (attachments.length > 0 && attachments[0]?.attach) {
        // Only use first attachment for secondary if it's an image (not a video)
        if (!isVideoFile(attachments[0].attach)) {
          const url = getImageUrl(attachments[0].attach);
          secondaryImageSrc = url || fallbackImages.secondary;
        }
      }

      // Extract tags from platform_tags
      const tags = caseStudyData.platform_tags?.map(tag => tag.pl_name) || [];

      const project: Project = {
        id: `p${index + 1}`,
        title: caseStudyData.full_title || caseStudyName,
        tags: tags,
        heroMedia: {
          src: heroMediaSrc,
          alt: `${caseStudyData.full_title || caseStudyName} - Main ${heroMediaType}`,
          type: heroMediaType,
        },
        secondaryImage: {
          src: secondaryImageSrc,
          alt: `${caseStudyData.full_title || caseStudyName} - Secondary image`,
        },
        summary: caseStudyData.short_description || '',
        bgColor: bgColor,
        caseStudySlug: slug,
        caseStudyName: caseStudyName,
      };

      return project;
    });
  }, [caseStudies]);

  return (
    <div className="bg-gray-50 py-[32px] sm:py-[40px] md:py-[48px] lg:py-[120px]">
      <section
        ref={heroRef}
        className="lg:h-[80vh] pb-[24px] lg:pb-0 flex flex-col justify-center items-center"
      >
        {/* STATIC (< lg) */}
        <div className="lg:hidden flex flex-col items-center">
          <h1 className="2xl:text-[96px] xl:text-[82px] md:text-[68px] sm:text-[48px] text-[32px] text-center font-semibold">
            Latest Project
          </h1>
          <div>
            <p className="2xl:text-[84px] xl:text-[70px] md:text-[64px] sm:text-[40px] text-[24px] text-center font-instrument-serif-italics">
              Powerful Results. <br className="hidden md:block" /> Meaningful impact.
            </p>
            <p className="text-[var(--sub-text)] font-urbanist pt-2 md:pt-4 text-[14px] sm:text-[15px] md:text-[18px] lg:text-[22px] xl:text-[32px] text-center">
              Work, for us, is Worship.
            </p>
          </div>
        </div>

        {/* ANIMATED (lg+) */}
        <motion.div
          style={{ scale }}
          className="hidden lg:flex flex-col items-center will-change-transform"
        >
          <h1 className="2xl:text-[96px] xl:text-[82px] md:text-[68px] sm:text-[48px] text-[32px] text-center font-semibold">
            Latest Project
          </h1>
          <div>
            <p className="2xl:text-[84px] xl:text-[70px] md:text-[64px] sm:text-[40px] text-[24px] text-center font-instrument-serif-italics">
              Powerful Results. Meaningful impact.
            </p>
            <p className="text-[var(--sub-text)] font-urbanist pt-2 md:pt-4 text-[14px] sm:text-[15px] md:text-[18px] lg:text-[22px] xl:text-[32px] text-center">
              Work, for us, is Worship.
            </p>
          </div>
        </motion.div>
      </section>

      {loading && projects.length === 0 && (
        <div className="flex justify-center items-center py-12">
          <p className="text-[var(--medium-text)]">Loading projects...</p>
        </div>
      )}

      {error && (
        <div className="flex justify-center items-center py-12">
          <p className="text-red-500">Error loading projects: {error}</p>
        </div>
      )}

      {projects.map((p) => (
        <ProjectBlock key={p.id} project={p} />
      ))}
      
      <div className="flex justify-center">
        <DefaultButton href="#" onClick={() => {}}>View All Projects</DefaultButton>
      </div>
      <SneekPeak />
    </div>
  );
}
