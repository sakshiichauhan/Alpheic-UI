import React, { useEffect, useMemo, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '@/store';
import { fetchDesignPageL2Data, type LinkServiceNameItem } from '@/store/Slice/UxDesgin/DesginPageThunk';
import { ParsedHtml } from '@/Components/ParsedHtml';
import Amber from "@/assets/Tools/Amber.png";



interface ServiceItemProps {
  text: string;
  index: number;
}

const ServiceItem: React.FC<ServiceItemProps> = ({ text, index }) => (
  <li className="flex items-center justify-between border border-[#F0F1F2] xl:p-4 md:p-3 p-2">

    {/* Left side: Number + Text */}
    <div className="flex items-center gap-4">

      {/* Number with blue background */}
      <span
        className="flex xl:h-10 xl:w-10 md:h-8 md:w-8 h-6 w-6 shrink-0 items-center justify-center 
                     bg-[#EFFAFC] text-[14px] md:text-[16px] lg:text-[18px] xl:text-[20px] font-bold text-black"
      >
        {index + 1}
      </span>

      {/* Text */}
      <span className="text-[14px] md:text-[16px] lg:text-[18px] xl:text-[20px] font-urbanist font-semibold text-black">{text}</span>
    </div>

    {/* Right side: Icon in a box (as a button for interaction) */}
    <Link
      to="/UxDesgin"
      className="flex xl:h-10 xl:w-10 md:h-8 md:w-8 h-6 w-6 shrink-0 items-center justify-center 
                   border border-[var(--color)] text-black 
                   transition-colors hover:bg-[var(--color)]/50"
    >
      <ArrowUpRight className="xl:h-6 xl:w-6 md:h-5 md:w-5 h-4 w-4" />
    </Link>
  </li>
);

// --- 2. Reusable Card Component ---

type ImagePosition = 'left' | 'right';

interface SlideItem {
  image: string;
  alt?: string;
  logoLabel?: string;
  headline?: string;
  description?: string;
}

interface PracticeCardProps {
  title: string;
  description: string;
  services: string[];
  imageSrc: string;
  imageAlt: string;
  imageCaption: string;
  imagePosition?: ImagePosition;
  showNavArrows?: boolean;
  gallery?: SlideItem[];
  overlay?: {
    logoLabel?: string;
    headline?: string;
    description?: string;
  };
  caseStudySlug?: string;
  caseStudySlugs?: string[]; // Array of slugs for all case studies in gallery
}

const PracticeCard: React.FC<PracticeCardProps> = ({
  title,
  description,
  services,
  imageSrc,
  imageAlt,
  imagePosition = 'left',
  showNavArrows = false,
  gallery,
  overlay,
  caseStudySlug,
  caseStudySlugs,
}) => {
  // ... (All your state and logic here is correct and unchanged) ...
  const textOrder = imagePosition === 'left' ? 'lg:order-2 order-2' : 'lg:order-1 order-2';
  const imageOrder = imagePosition === 'left' ? 'lg:order-1 order-1' : 'lg:order-2 order-1';

  const slides = useMemo<SlideItem[]>(() => {
    if (gallery && gallery.length > 0) {
      return gallery;
    }
    return [
      {
        image: imageSrc,
        alt: imageAlt,
        logoLabel: overlay?.logoLabel,
        headline: overlay?.headline,
        description: overlay?.description,
      },
    ];
  }, [gallery, imageSrc, imageAlt, overlay?.logoLabel, overlay?.headline, overlay?.description]);

  const [activeIndex, setActiveIndex] = useState(0);
  const dotRef = useRef<HTMLButtonElement>(null);
  const [dotHeight, setDotHeight] = useState(10); // Default height

  useEffect(() => {
    setActiveIndex(0);
  }, [slides.length]);

  useEffect(() => {
    // Measure the actual height of a dot element
    const updateDotHeight = () => {
      if (dotRef.current) {
        const height = dotRef.current.offsetHeight;
        setDotHeight(height);
      }
    };

    updateDotHeight();
    window.addEventListener('resize', updateDotHeight);
    return () => window.removeEventListener('resize', updateDotHeight);
  }, []);

  const slideCount = slides.length;
  const currentSlide = slides[activeIndex];

  const handlePrev = () => {
    if (slideCount <= 1) return;
    setActiveIndex((prev) => (prev - 1 + slideCount) % slideCount);
  };

  const handleNext = () => {
    if (slideCount <= 1) return;
    setActiveIndex((prev) => (prev + 1) % slideCount);
  };

  const handleDotClick = (index: number) => {
    if (index === activeIndex) return;
    setActiveIndex(index);
  };

  // Use current slide data (from CaseStudy API) or overlay fallback
  const headline =
    currentSlide.headline ??
    overlay?.headline ??
    '';
  const descriptionText =
    currentSlide.description ??
    overlay?.description ??
    '';

  const gridTemplate =
    imagePosition === 'left'
      ? '2xl:grid-cols-[minmax(570px,1fr)_minmax(0,1fr)] xl:grid-cols-[minmax(540px,1fr)_minmax(0,1fr)] lg:grid-cols-[minmax(457px,1fr)_minmax(0,1fr)]'
      : '2xl:grid-cols-[minmax(0,1fr)_minmax(570px,1fr)] xl:grid-cols-[minmax(0,1fr)_minmax(540px,1fr)] lg:grid-cols-[minmax(0,1fr)_minmax(457px,1fr)]';

  return (
    <div className={`grid grid-cols-1 items-start ${gridTemplate} 2xl:gap-16 xl:gap-12 lg:gap-10 md:gap-8 sm:gap-6 gap-4 h-auto`}>
      {/* --- Text Column (Unchanged) --- */}
      <div className={`flex min-w-0 flex-col ${textOrder}`}>
        <h2 className="text-[20px] sm:text-[24px] md:text-[28px] lg:text-[32px] xl:text-[42px] 2xl:text-[48px] font-urbanist font-semibold text-black">{title}</h2>
        <p className=" lg:mt-[10px] mt-[8px] text-[14px] sm:text-[16px] md:text-[18px] lg:text-[20px] xl:text-[24px] font-urbanist text-[var(--medium-text)]">
          {description}
        </p>
        <ol className="flex flex-col gap-4 2xl:mt-[32px] xl:mt-[28px] lg:mt-[24px] md:mt-[20px] mt-[16px]">
          {services.map((service, index) => (
            <ServiceItem key={index} text={service} index={index} />
          ))}
        </ol>
      </div>

      {/* --- Image Column  --- */}
      <div className={`relative ${imageOrder} h-full w-full overflow-hidden bg-gray-100 xl:min-h-[557px] lg:min-h-[450px] md:min-h-[350px] min-h-[277px] xl:max-h-[557px] lg:max-h-[450px] md:max-h-[350px] max-h-[277px]`}>
        <div className="relative h-full w-full">
          <AnimatePresence mode="wait">
            <motion.img
              key={currentSlide.image}
              src={currentSlide.image}
              alt={currentSlide.alt ?? ''}
              className="h-full w-full object-cover"
              initial={{ opacity: 0, scale: 0.98, x: 60 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.98, x: -60 }}
              transition={{ duration: 0.45, ease: [0.4, 0, 0.2, 1] }}
              onError={(e) => {
                console.error('DesignPractice: Image failed to load:', {
                  src: currentSlide.image,
                  alt: currentSlide.alt,
                  slideIndex: activeIndex
                });
                // Optionally set a fallback or hide the image
                (e.target as HTMLImageElement).style.display = 'none';
              }}
              onLoad={() => {
                console.log('DesignPractice: Image loaded successfully:', currentSlide.image);
              }}
            />
          </AnimatePresence>
        </div>

        {/* --- 1. Large Side Navigation Arrows (with blur) --- */}
        {showNavArrows && (
          <>
            <button
              onClick={handlePrev}
              className={`group absolute left-6 top-1/2 flex -translate-y-1/2 items-center justify-center bg-black/25 backdrop-blur-sm xl:px-3 md:px-2 px-[6px] xl:py-6 md:py-4 sm:py-3 py-[6px] text-white shadow-lg transition hover:bg-black/40 ${slideCount <= 1 ? 'pointer-events-none opacity-40' : ''}`}
              aria-label="Previous image"
            >
              <ChevronLeft className="xl:h-8 xl:w-8 md:h-6 md:w-6 h-4 w-4" />
            </button>

            <button
              onClick={handleNext}
              className={`group absolute right-6 top-1/2 flex -translate-y-1/2 items-center justify-center bg-black/25 backdrop-blur-sm xl:px-3 md:px-2 px-[6px] xl:py-6 md:py-4 sm:py-3 py-[6px] text-white shadow-lg transition hover:bg-black/40 ${slideCount <= 1 ? 'pointer-events-none opacity-40' : ''}`}
              aria-label="Next image"
            >
              <ChevronRight className="xl:h-8 xl:w-8 md:h-6 md:w-6 h-4 w-4" />
            </button>
          </>
        )}

        {/* Gradient with blur */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-fit min-h-[90px] md:min-h-[130px] xl:min-h-[170px] bg-gradient-to-t from-black/85 via-black/50 to-transparent backdrop-blur-md" />

        {/* Container for Dots + Text Content */}
        <div className="absolute inset-x-0 bottom-0 flex flex-col items-center gap-[10px] xl:p-6 md:p-4 p-2">

          {/* --- 2. Carousel Dots (MOVED & FIXED) --- */}
          {slideCount > 1 && (
            <div className=" z-10 flex gap-3">
              {slides.map((_, index) => {
                const inactiveWidth = dotHeight; // Match height when inactive
                const activeWidth = dotHeight * 4.2; // 4.2x height when active (maintains similar ratio to original 42/10)
                
                return (
                  <motion.button
                    key={index}
                    ref={index === 0 ? dotRef : undefined}
                    onClick={() => handleDotClick(index)}
                    className="sm:h-[8px] sm:w-[8px] h-[6px] w-[6px] lg:h-[10px] lg:w-[10px] rounded-full bg-white/40 transition-colors hover:bg-white/60" // Base style
                    animate={{
                      width: index === activeIndex ? activeWidth : inactiveWidth,
                      backgroundColor: index === activeIndex ? 'rgba(255,255,255,1)' : 'rgba(255,255,255,0.4)',
                    }}
                    transition={{ duration: 0.3 }}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                );
              })}
            </div>
          )}

          {/* --- Text Content Area --- */}
          <div className="flex w-full flex-col gap-6 md:flex-row md:items-center md:justify-between">
            {/* Left Side: Logo + Text */}
            <div className="flex w-full items-center gap-4 md:w-auto">
              <div className="flex xl:h-[100px] md:h-[80px] h-[50px] xl:min-w-[111px] md:min-w-[75px] min-w-[50px] flex-none items-center justify-center bg-white/95">
                <img src={Amber} alt="Amber" className="h-full w-full object-contain" />
              </div>
              <div className="flex min-w-0 flex-1 flex-col gap-2">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={headline}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.35, ease: 'easeOut' }}
                  >
                    {(() => {
                      // Get the slug for the current slide
                      const currentSlug = caseStudySlugs && caseStudySlugs[activeIndex] || caseStudySlug;
                      return currentSlug ? (
                        <Link
                          to={`/case-study/${currentSlug}`}
                          className="text-[16px] md:text-[18px] lg:text-[20px] xl:text-[22px] 2xl:text-[24px] font-urbanist font-semibold text-white flex items-center gap-[10px] hover:opacity-90 transition-opacity"
                        >
                          {headline} <div className="flex items-center justify-center bg-white/40 lg:p-[5px] md:p-[4px] sm:p-[3px] p-[2px]"><ArrowUpRight className="xl:h-[30px] xl:w-[30px] md:h-[20px] md:w-[20px] h-[14px] w-[14px]" strokeWidth={1} /></div>
                        </Link>
                      ) : (
                        <h3 className="text-[16px] md:text-[18px] lg:text-[20px] xl:text-[22px] 2xl:text-[24px] font-urbanist font-semibold text-white flex items-center gap-[10px]">
                          {headline} <div className="flex items-center justify-center bg-white/40 lg:p-[5px] md:p-[4px] sm:p-[3px] p-[2px]"><ArrowUpRight className="xl:h-[30px] xl:w-[30px] md:h-[20px] md:w-[20px] h-[14px] w-[14px]" strokeWidth={1} /></div>
                        </h3>
                      );
                    })()}
                    <p className="text-[12px] md:text-[14px] lg:text-[16px] xl:text-[18px] 2xl:text-[20px] font-urbanist text-[#EEEEEE] md:line-clamp-2 line-clamp-1">
                      {descriptionText}
                    </p>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

// --- 3. Main Page Component ---

const DesignPractice: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { data, loading } = useSelector((state: RootState) => state.designPageL2);

  useEffect(() => {
    // Fetch data if not already loaded
    if (!data && !loading) {
      dispatch(fetchDesignPageL2Data());
    }
  }, [dispatch, data, loading]);

  // Conditionally render based on link_service
  const shouldShowSection = data?.link_service === 1;

  // Use API data if available, otherwise use defaults
  const description = data?.link_service_description || "We combine logic, emotion, and function to create systems that scale across websites, apps, offices, and stores.";

  // Get titles from link_service_names array
  const linkServiceNames = data?.link_service_names || [];
  
  // Helper function to get services from API - NO DEFAULTS
  const getServices = (serviceItem: LinkServiceNameItem | undefined): string[] => {
    if (serviceItem?.service_category_services && Array.isArray(serviceItem.service_category_services) && serviceItem.service_category_services.length > 0) {
      const mappedServices = serviceItem.service_category_services
        .map(item => item.service)
        .filter((service): service is string => Boolean(service));
      return mappedServices;
    }
    return [];
  };

  // Prepare cards data dynamically from linkServiceNames - NO DEFAULTS, ONLY API DATA
  const practiceCards = useMemo(() => {
    if (!linkServiceNames || linkServiceNames.length === 0) {
      console.log('DesignPractice: No linkServiceNames found');
      return [];
    }

    console.log('DesignPractice: Processing linkServiceNames:', linkServiceNames.length, 'items');

    // Map over linkServiceNames and create card data - ONLY FROM CASE STUDY API
    return linkServiceNames
      .map((item, index) => {
        // Get case study slides data (can have multiple case studies)
        const caseStudySlides = item.case_study_slides;
        
        // ONLY create card if we have complete case study data
        if (!caseStudySlides || caseStudySlides.length === 0) {
          console.log(`DesignPractice: Item ${index} - Skipping: No case study data`);
          return null;
        }

        // Filter out slides without required data
        const validSlides = caseStudySlides.filter(slide => 
          slide.first_attachment && slide.full_title
        );

        if (validSlides.length === 0) {
          console.log(`DesignPractice: Item ${index} - Skipping: No valid case study slides`);
          return null;
        }

        // Alternate image position: even index = right, odd index = left
        const imagePosition: ImagePosition = index % 2 === 0 ? 'right' : 'left';
        
        // Create gallery from case study slides - LIMITED TO 4 ITEMS
        const gallery: SlideItem[] = validSlides.slice(0, 4).map((slide) => {
          console.log(`DesignPractice: Creating slide for "${slide.full_title}":`, {
            firstAttachment: slide.first_attachment,
            attachmentType: typeof slide.first_attachment,
            hasAttachment: !!slide.first_attachment
          });
          
          return {
            image: slide.first_attachment as string, // From CaseStudy API - 1st attachment (already processed URL)
            alt: slide.full_title || '', // From CaseStudy API
            logoLabel: 'amber', // Only default - logo
            headline: slide.full_title || '', // From CaseStudy API
            description: slide.very_short_description || '', // From CaseStudy API
          };
        });
        
        console.log(`DesignPractice: Item ${index} - Created card with ${gallery.length} case study slide(s) (limited to 4):`, {
          title: item.name1,
          slidesCount: gallery.length,
          totalValidSlides: validSlides.length,
          slugs: validSlides.slice(0, 4).map(s => s.case_study_slug),
          galleryImages: gallery.map(g => g.image)
        });

        // Return card with ALL data from CaseStudy API (except logo)
        return {
          title: item.name1, // From link_service_names
          description: item.service_category_description, // From link_service_names
          services: getServices(item), // From ServicePage L3
          imagePosition,
          gallery, // From CaseStudy API - LIMITED TO 4 ITEMS
          caseStudySlug: validSlides[0]?.case_study_slug, // First case study slug for backward compatibility
          caseStudySlugs: validSlides.slice(0, 4).map(slide => slide.case_study_slug || '').filter(Boolean), // Limited to 4 case study slugs for current slide linking
        };
      })
      .filter((card): card is NonNullable<typeof card> => card !== null);
  }, [linkServiceNames]);

  // Don't render if link_service is 0
  if (data && !shouldShowSection) {
    console.log('DesignPractice: Not showing section - link_service is not 1');
    return null;
  }

  // Show section even if no cards - at least show header
  if (practiceCards.length === 0) {
    console.log('DesignPractice: No practice cards available', {
      hasData: !!data,
      linkServiceNamesCount: linkServiceNames.length,
      shouldShowSection
    });
    // Still render the section header so user knows something is loading or missing
  }

  return (
    <section className="xl:space-y-[72px] lg:space-y-[52px] md:space-y-[40px] space-y-[32px] 2xl:py-[84px] xl:py-[72px] lg:py-[60px] md:py-[52px] sm:py-[40px] py-[24px] px-4 sm:px-6 md:px-12 lg:px-[80px] xl:px-[120px] 2xl:px-[200px]
 ">
      {/* --- Header --- */}
      <header className="flex flex-col lg:flex-row min-w-0 items-center 2xl:gap-8 lg:gap-6 md:gap-4 sm:gap-2 gap-1 ">
        <h1 className="w-full text-[32px] sm:text-[40px] md:text-[48px] lg:text-[56px] xl:text-[64px] 2xl:text-[72px] font-semibold text-black 2xl:min-w-[680px]">
          {data?.link_service_heading ? (
            <ParsedHtml 
              htmlContent={data.link_service_heading} 
              as="span"
            />
          ) : (
            "Our Design Practice"
          )}
        </h1>
        <p className="min-w-0 text-[14px] sm:text-[18px] md:text-[20px] lg:text-[22px] xl:text-[24px] font-urbanist text-[var(--medium-text)] lg:justify-self-end">
          {description}
        </p>
      </header>

      {/* --- Main Content (Cards) --- */}
      <main className="2xl:space-y-[128px] xl:space-y-[100px] lg:space-y-[80px] md:space-y-[60px] sm:space-y-[40px] space-y-[24px]">
        {practiceCards.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-[var(--medium-text)]">No practice cards available. Check console for details.</p>
          </div>
        ) : (
          practiceCards.map((card, index) => {
            // All data from CaseStudy API (gallery is guaranteed to exist at this point)
            if (!card.gallery || card.gallery.length === 0) {
              return null;
            }
            
            const firstSlide = card.gallery[0];
            
            // All data from CaseStudy API
            // image is required in SlideItem, alt is optional but we provide default
            const imageSrc = firstSlide.image; // From CaseStudy API - 1st attachment (required - string type)
            const imageAlt = firstSlide.alt || card.title || ''; // From CaseStudy API - full_title (optional, fallback to title)
            const imageCaption = '';

            // Overlay from CaseStudy API
            const overlay = {
              logoLabel: 'amber', // Only default - logo
              headline: firstSlide.headline || '', // From CaseStudy API - full_title
              description: firstSlide.description || '', // From CaseStudy API - very_short_description
            };

            return (
              <PracticeCard
                key={index}
                title={card.title || ''}
                description={card.description || ''}
                services={card.services}
                imageSrc={imageSrc}
                imageAlt={imageAlt}
                imageCaption={imageCaption}
                imagePosition={card.imagePosition}
                showNavArrows={card.gallery && card.gallery.length > 1} // Show arrows if multiple case studies
                gallery={card.gallery}
                overlay={overlay}
                caseStudySlug={card.caseStudySlug}
                caseStudySlugs={card.caseStudySlugs}
              />
            );
          })
          .filter((card) => card !== null)
        )}
      </main>
    </section>
  );
};

export default DesignPractice;