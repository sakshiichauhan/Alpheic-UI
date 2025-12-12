import React, { useEffect, useState, useMemo } from "react";
import { useParams, Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "@/store/rootReducer";
import type { AppDispatch } from "@/store";
import type { CaseStudyData } from "@/store/Slice/CaseStudy/CaseStudyThunk";
import { fetchAllCaseStudies } from "@/store/Slice/CaseStudy/CaseStudyThunk";
import { findOriginalCaseStudyName } from "@/utils/urlMapping";
import { ArrowUpRight } from "lucide-react";

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

// ---------------------------------------------------------
// CASE STUDY SECTION
// ---------------------------------------------------------

const CaseStudySection: React.FC<{ caseStudyData: CaseStudyData }> = ({
  caseStudyData,
}) => {
  const [videoErrors, setVideoErrors] = useState<Record<number, boolean>>({});

  // Get title - prefer heading, then full_title
  const title =  caseStudyData.full_title;
  
  // Get subheading
  const subHeading = caseStudyData.heading || '';
  
  // Get description - prefer description, then short_description
  const description = caseStudyData.description || caseStudyData.short_description || '';
  
  // Get deliverables - split by comma if string, or use as is
  const deliverables = caseStudyData.deliverables 
    ? (typeof caseStudyData.deliverables === 'string' 
        ? caseStudyData.deliverables.split(',').map(d => d.trim())
        : Array.isArray(caseStudyData.deliverables) 
          ? caseStudyData.deliverables 
          : [])
    : [];
  
  // Get industry, duration, platform
  const industry = caseStudyData.industry || '';
  const duration = caseStudyData.duration || '';
  const platform = caseStudyData.main_platform || 
    (caseStudyData.platform_tags && caseStudyData.platform_tags.length > 0
      ? caseStudyData.platform_tags.map(tag => tag.pl_name).join(', ')
      : '');
  
  // Get link
  const ctaLink = caseStudyData.link;
  
  // Process attachments - filter out videos and get image URLs (only actual images, no padding)
  const images = (caseStudyData.attachments || [])
    .filter(att => att.attach && !isVideoFile(att.attach))
    .map(att => getImageUrl(att.attach))
    .filter(url => url !== ''); // Remove empty URLs
  
  // Get video attachments
  const videoAttachments = (caseStudyData.attachments || [])
    .filter(att => att.attach && isVideoFile(att.attach))
    .map(att => ({
      url: getImageUrl(att.attach),
      idx: att.idx,
    }));

  const handleVideoError = (idx: number) => {
    setVideoErrors(prev => ({ ...prev, [idx]: true }));
  };
  return (
    <section  id="case-study-title" className="w-full 2xl:pb-[84px] 2xl:pt-[190px] xl:pt-[160px] lg:pt-[140px] md:pt-[120px] pt-[110px] xl:pb-[72px] lg:pb-[60px] md:pb-[52px] pb-[40px] px-4 sm:px-6 md:px-12 lg:px-[80px] xl:px-[120px] 2xl:px-[200px]">

      <div  className="grid grid-cols-1 lg:grid-cols-2 lg:gap-[84px] gap-[40px]">

        {/* LEFT SIDE */}
        <div className="space-y-6">

          {/* TITLE */}
          <h1 
         
            className="font-semibold text-black leading-tight 
            xl:text-[64px] lg:text-[56px] md:text-[48px] text-[40px]"
          >
            {title}
          </h1>

          {/* CTA BUTTON */}
          <a
            href={ctaLink ?? "#"}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-3 text-[16px] sm:text-[20px] md:text-[22px] lg:text-[24px] 
              border border-[var(--color)]
              text-black font-urbanist
              hover:bg-[var(--color)]/10 transition"
          >
            View Website
            <ArrowUpRight strokeWidth={1} className="h-full w-[20px] sm:w-[22px] md:w-[24px] lg:w-[30px] xl:w-[36px] 2xl:w-[40px] shrink-0" aria-hidden />
          </a>

          

          {/* LABELS ROW */}
          <div className="flex flex-row flex-wrap gap-4 text-left items-stretch">

            <div className="space-y-1">
              <p className="md:text-[14px] text-[12px] font-medium tracking-wider uppercase text-[#AAAAAA] font-urbanist">
                Deliverables
              </p>
              <p className="md:text-[16px] text-[14px] font-medium text-black font-urbanist">
                {deliverables.join(", ")}
              </p>  
            </div>
            <div className="w-[2px] bg-[var(--border-color)] self-stretch"></div>

            <div className="space-y-1">
              <p className="md:text-[14px] text-[12px] font-medium tracking-wider uppercase text-[#AAAAAA] font-urbanist">
                Industry
              </p>
              <p className="md:text-[16px] text-[14px] font-medium text-black font-urbanist">
                {industry}
              </p>
            </div>
            <div className="w-[2px] bg-[var(--border-color)] self-stretch"></div>

            <div className="space-y-1">
              <p className="md:text-[14px] text-[12px] font-medium tracking-wider uppercase text-[#AAAAAA] font-urbanist">
                Duration
              </p>
              <p className="md:text-[16px] text-[14px] font-medium text-black font-urbanist">
                {duration}
              </p>
            </div>
            <div className="w-[2px] bg-[var(--border-color)] self-stretch"></div>

            <div className="space-y-1">
              <p className="md:text-[14px] text-[12px] font-medium tracking-wider uppercase text-[#AAAAAA] font-urbanist">
                Platform
              </p>
              <p className="md:text-[16px] text-[14px] font-medium text-black font-urbanist">
                {platform}
              </p>
            </div>
          </div>

          
          {/* DESCRIPTION */}
          <div className="space-y-4">
          <h2 className="2xl:text-[32px] xl:text-[28px] lg:text-[24px] md:text-[20px] sm:text-[16px] text-[14px] text-[var(--hero-text)] font-medium leading-snug">
            {subHeading}
          </h2>

          <p className="md:text-[16px] lg:text-[20px] text-[14px] font-medium text-[var(--medium-text)] font-urbanist">
            {description}
          </p>
          </div>
          
        </div>

        {/* RIGHT SIDE — IMAGE/VIDEO LAYOUT */}
        <div className="space-y-8">
          {/* Render videos first if available */}
          {videoAttachments.length > 0 && !videoErrors[videoAttachments[0].idx] && (
            <div className="w-full h-[320px] md:h-[360px] lg:h-[400px] xl:h-[450px] 2xl:h-[504px] overflow-hidden">
              <video
                src={videoAttachments[0].url}
                className="w-full h-full object-cover"
                controls
                playsInline
                muted
                loop
                onError={() => handleVideoError(videoAttachments[0].idx)}
              />
            </div>
          )}

          {/* Dynamic image layout based on count */}
          {images.length === 1 && (
            // 1 image → large
            <div className="w-full h-[320px] md:h-[360px] lg:h-[400px] xl:h-[450px] 2xl:h-[504px] overflow-hidden">
              <img
                src={images[0]}
                className="w-full h-full object-cover"
                alt="main"
                referrerPolicy="no-referrer"
              />
            </div>
          )}

          {images.length === 2 && (
            // 2 images → first large, second large in next row
            <>
              <div className="w-full h-[320px] md:h-[360px] lg:h-[400px] xl:h-[450px] 2xl:h-[504px] overflow-hidden">
                <img
                  src={images[0]}
                  className="w-full h-full object-cover"
                  alt="image-1"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="w-full h-[320px] md:h-[360px] lg:h-[400px] xl:h-[450px] 2xl:h-[504px] overflow-hidden">
                <img
                  src={images[1]}
                  className="w-full h-full object-cover"
                  alt="image-2"
                  referrerPolicy="no-referrer"
                />
              </div>
            </>
          )}

          {images.length === 3 && (
            // 3 images → first large, second & third small on same row
            <>
              <div className="w-full h-[320px] md:h-[360px] lg:h-[400px] xl:h-[450px] 2xl:h-[504px] overflow-hidden">
                <img
                  src={images[0]}
                  className="w-full h-full object-cover"
                  alt="image-1"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="h-[180px] md:h-[200px] lg:h-[220px] xl:h-[240px] 2xl:h-[245px] overflow-hidden">
                  <img
                    src={images[1]}
                    className="w-full h-full object-cover"
                    alt="image-2"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="h-[180px] md:h-[200px] lg:h-[220px] xl:h-[240px] 2xl:h-[245px] overflow-hidden">
                  <img
                    src={images[2]}
                    className="w-full h-full object-cover"
                    alt="image-3"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>
            </>
          )}

          {images.length >= 4 && (
            // 4+ images → pattern: large, then 2 small, then large, then 2 small, etc.
            <>
              {/* First large image */}
              <div className="w-full h-[320px] md:h-[360px] lg:h-[400px] xl:h-[450px] 2xl:h-[504px] overflow-hidden">
                <img
                  src={images[0]}
                  className="w-full h-full object-cover"
                  alt="image-1"
                  referrerPolicy="no-referrer"
                />
              </div>
              
              {/* Remaining images in groups: 2 small, 1 large, 2 small, 1 large, etc. */}
              {Array.from({ length: Math.ceil((images.length - 1) / 3) }).map((_, groupIndex) => {
                const startIdx = 1 + groupIndex * 3;
                const groupImages = images.slice(startIdx, startIdx + 3);
                
                if (groupImages.length === 1) {
                  // Single large image
                  return (
                    <div key={groupIndex} className="w-full h-[320px] md:h-[360px] lg:h-[400px] xl:h-[450px] 2xl:h-[504px] overflow-hidden">
                      <img
                        src={groupImages[0]}
                        className="w-full h-full object-cover"
                        alt={`image-${startIdx + 1}`}
                        referrerPolicy="no-referrer"
                      />
                    </div>
                  );
                } else if (groupImages.length === 2) {
                  // Two small images
                  return (
                    <div key={groupIndex} className="grid grid-cols-2 gap-4">
                      <div className="h-[180px] md:h-[200px] lg:h-[220px] xl:h-[240px] 2xl:h-[245px] overflow-hidden">
                        <img
                          src={groupImages[0]}
                          className="w-full h-full object-cover"
                          alt={`image-${startIdx + 1}`}
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <div className="h-[180px] md:h-[200px] lg:h-[220px] xl:h-[240px] 2xl:h-[245px] overflow-hidden">
                        <img
                          src={groupImages[1]}
                          className="w-full h-full object-cover"
                          alt={`image-${startIdx + 2}`}
                          referrerPolicy="no-referrer"
                        />
                      </div>
                    </div>
                  );
                } else {
                  // Three images: first large, next two small
                  return (
                    <div key={groupIndex} className="space-y-4">
                      <div className="w-full h-[320px] md:h-[360px] lg:h-[400px] xl:h-[450px] 2xl:h-[504px] overflow-hidden">
                        <img
                          src={groupImages[0]}
                          className="w-full h-full object-cover"
                          alt={`image-${startIdx + 1}`}
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="h-[180px] md:h-[200px] lg:h-[220px] xl:h-[240px] 2xl:h-[245px] overflow-hidden">
                          <img
                            src={groupImages[1]}
                            className="w-full h-full object-cover"
                            alt={`image-${startIdx + 2}`}
                            referrerPolicy="no-referrer"
                          />
                        </div>
                        <div className="h-[180px] md:h-[200px] lg:h-[220px] xl:h-[240px] 2xl:h-[245px] overflow-hidden">
                          <img
                            src={groupImages[2]}
                            className="w-full h-full object-cover"
                            alt={`image-${startIdx + 3}`}
                            referrerPolicy="no-referrer"
                          />
                        </div>
                      </div>
                    </div>
                  );
                }
              })}
            </>
          )}
        </div>
      </div>
    </section>
  );
};


// ---------------------------------------------------------
// MAIN PAGE
// ---------------------------------------------------------

const CaseStudyPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const location = useLocation();
  const dispatch = useDispatch<AppDispatch>();
  const { caseStudies, loading, error } = useSelector((state: RootState) => state.caseStudy);

  // Map cleaned slug back to original case study name
  const caseStudyName = useMemo(() => {
    if (!slug) return null;
    
    // Get list of case study names
    const caseStudyNames = Object.values(caseStudies).map(cs => cs.name).filter(Boolean) as string[];
    
    // Find original name that matches when cleaned
    const originalName = findOriginalCaseStudyName(slug, caseStudyNames);
    
    return originalName;
  }, [slug, caseStudies]);

  // Find case study by original name
  const caseStudyData = useMemo(() => {
    if (!caseStudyName) return undefined;
    return Object.values(caseStudies).find(cs => cs.name === caseStudyName);
  }, [caseStudyName, caseStudies]);

  // Fetch all case studies if not already loaded or if case study not found
  useEffect(() => {
    if (slug) {
      // If we don't have the case study data and we're not currently loading
      if (!caseStudyData && !loading) {
        // If we have no case studies loaded at all, fetch them
        if (Object.keys(caseStudies).length === 0) {
          console.log('CaseStudy: No case studies loaded, fetching all case studies to find slug:', slug);
          dispatch(fetchAllCaseStudies());
        } else {
          // We have some case studies but not the one we need - it might not exist
          console.log('CaseStudy: Case study not found in loaded data for slug:', slug);
          console.log('CaseStudy: Available case studies:', Object.keys(caseStudies));
        }
      }
    }
  }, [slug, caseStudyData, loading, caseStudies, dispatch]);

  // Scroll to title when navigating from OurProjects
  useEffect(() => {
    const shouldScroll = (location.state as { scrollToTitle?: boolean })?.scrollToTitle;
    if (shouldScroll) {
      // Small delay to ensure the page has rendered
      setTimeout(() => {
        const titleElement = document.getElementById('case-study-title');
        if (titleElement) {
          titleElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      }, 100);
    }
  }, [location.state]);

  if (loading) {
    return (
      <section className="w-full 2xl:pb-[84px] 2xl:pt-[190px] xl:pt-[160px] lg:pt-[140px] md:pt-[120px] pt-[110px] xl:pb-[72px] lg:pb-[60px] md:pb-[52px] pb-[40px] px-4 sm:px-6 md:px-12 lg:px-[80px] xl:px-[120px] 2xl:px-[200px] text-center">
        <p className="text-[var(--medium-text)]">Loading case study...</p>
      </section>
    );
  }

  if (error) {
    return (
      <section className="w-full 2xl:pb-[84px] 2xl:pt-[190px] xl:pt-[160px] lg:pt-[140px] md:pt-[120px] pt-[110px] xl:pb-[72px] lg:pb-[60px] md:pb-[52px] pb-[40px] px-4 sm:px-6 md:px-12 lg:px-[80px] xl:px-[120px] 2xl:px-[200px] text-center">
        <p className="text-red-500">Error loading case study: {error}</p>
        <Link
          to="/"
          className="inline-flex items-center justify-center bg-black text-white px-6 py-3 rounded-sm hover:bg-neutral-800 transition mt-4"
        >
          Back to Home
        </Link>
      </section>
    );
  }

  // Show loading while fetching if we don't have the case study yet
  if (!caseStudyData && loading) {
    return (
      <section className="w-full 2xl:pb-[84px] 2xl:pt-[190px] xl:pt-[160px] lg:pt-[140px] md:pt-[120px] pt-[110px] xl:pb-[72px] lg:pb-[60px] md:pb-[52px] pb-[40px] px-4 sm:px-6 md:px-12 lg:px-[80px] xl:px-[120px] 2xl:px-[200px] text-center">
        <p className="text-[var(--medium-text)]">Loading case study...</p>
      </section>
    );
  }

  // Show error or not found only after loading is complete
  if (!caseStudyData && !loading) {
    return (
      <section className="w-full 2xl:pb-[84px] 2xl:pt-[190px] xl:pt-[160px] lg:pt-[140px] md:pt-[120px] pt-[110px] xl:pb-[72px] lg:pb-[60px] md:pb-[52px] pb-[40px] px-4 sm:px-6 md:px-12 lg:px-[80px] xl:px-[120px] 2xl:px-[200px]
  text-center">
        <h1 className="xl:text-[64px] lg:text-[56px] md:text-[48px] text-[40px] font-semibold text-black mb-4">
          Case study not found
        </h1>
        <p className="xl:text-[24px] lg:text-[20px] md:text-[18px] text-[16px] text-gray-600 mb-6">
          The case study you are looking for does not exist.
        </p>
        <Link
          to="/"
          className="inline-flex items-center justify-center bg-black text-white px-6 py-3 rounded-sm hover:bg-neutral-800 transition"
        >
          Back to Home
        </Link>
      </section>
    );
  }

  if (!caseStudyData) {
    return null; // Should not reach here due to checks above, but TypeScript safety
  }

  return <CaseStudySection caseStudyData={caseStudyData} />;
};

export default CaseStudyPage;
