// PilotCardGrid.tsx
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@/store";
import { fetchPilotPageData, isEnabled } from "@/store/Slice/Pilot/PilotPageThunk";
import { fetchPilots, selectPilots, selectPilotLoading, buildPilotImageUrl } from "@/store/Slice/Pilot/PilotThunk";
import { motion, type Variants } from "framer-motion"; 
import { ArrowUpRight } from "lucide-react";
import { useNavigate } from "react-router-dom";


const barVariants: Variants = {
  initial: { scaleX: 0 },
  hover: { scaleX: 1, transition: { duration: 0.3, ease: "easeOut" } },
};

// Title shrink animation
const titleVariants: Variants = {
  initial: { scale: 1 },
  hover: { scale: 0.70, transition: { duration: 0.2, ease: "easeOut" } },
};

// Description reveal animation
const descriptionVariants: Variants = {
  initial: { opacity: 0, maxHeight: 0, marginTop: 0, y: 0 },
  hover: {
    opacity: 1,
    maxHeight: "50px",
    y: -16, 
    transition: { duration: 0.3, ease: "easeOut", delay: 0.1 },
  },
};

// --- Prop Types ---
type CardProps = {
  title: string;
  description: string;
  duration: string;
  calendarIcon?: string;
  pilotName: string; // The pilot name key for navigation
};

// --- 1. Hover Card Component ---

const HoverCard: React.FC<CardProps> = ({
  title,
  description,
  duration,
  calendarIcon,
  pilotName,
}) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    // Navigate to Dreamers page with pilot name parameter
    // For "Dreamer", use /Pilot/Dreamers, for others use /Pilot/Dreamers/:pilotName
    if (pilotName === "Dreamer") {
      navigate("/Pilot/Dreamers");
    } else {
      navigate(`/Pilot/Dreamers/${encodeURIComponent(pilotName)}`);
    }
  };

  const handleArrowClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (pilotName === "Dreamer") {
      navigate("/Pilot/Dreamers");
    } else {
      navigate(`/Pilot/Dreamers/${encodeURIComponent(pilotName)}`);
    }
  };

  return (
    // Main card wrapper. This controls the hover state for all children.
    <motion.div
      className="relative flex flex-col w-full bg-white border border-white overflow-hidden cursor-pointer"
      initial="initial" // Set initial animation state
      whileHover="hover" // Set state to animate to on hover
      onClick={handleCardClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleCardClick();
        }
      }}
    >
      {/* 1. Animated Top Bar */}
      {/* This is the "track" for the bar */}
      <div className="absolute top-0 left-0 w-full h-[6px] bg-[#E5E7EA]">
        {/* This is the filling bar that animates */}
        <motion.div
          className="h-full bg-[var(--color)] origin-left"
          variants={barVariants as Variants} // Links to the barVariants
        />
      </div>

      {/* 2. Card Content Wrapper */}
      <div className="flex flex-col flex-grow xl:p-[30px] lg:p-[24px] md:p-[20px] sm:p-[16px] p-[12px] sm:pt-[36px] pt-[20px] xl:min-h-[252px] lg:min-h-[220px] md:min-h-[200px] sm:min-h-[185px] min-h-[130px]">
        
        {/* Top part with text (set to grow) */}
        <div className="flex-grow flex flex-col 2xl:gap-[0px] gap-[8px]">
          <motion.h3
            className="2xl:text-[40px] xl:text-[36px] lg:text-[30px] md:text-[30px] sm:text-[24px] text-[22px] font-semibold text-black origin-top-left"
            variants={titleVariants} // Links to the titleVariants
          >
            {title}
          </motion.h3>

          <motion.p
            className="2xl:text-[20px] xl:text-[18px] lg:text-[16px] font-urbanist md:text-[16px] sm:text-[14px] text-[12px] text-[var(--medium-text)] origin-top-left "
            variants={descriptionVariants} // Links to the descriptionVariants
          >
            {description}
          </motion.p>
        </div>

        {/* 3. Bottom Row (pushed to bottom) */}
        <div className="flex justify-between items-center mt-auto md:pt-4 sm:pt-2">
          <div className="flex items-center gap-2 border border-[#F0F1F2] p-[8px]">
            {/* Calendar icon from API */}
            {calendarIcon ? (
              <img
                src={buildPilotImageUrl(calendarIcon)}
                alt="Calendar"
                className="w-4 h-4 object-contain"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  // Hide image if it fails to load
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                }}
              />
            ) : null}
            <span className="2xl:text-[16px] xl:text-[14px] sm:text-[12px] text-[10px] text-[var(--medium-text)] font-urbanist font-medium">{duration}</span>
          </div>

          <div 
            className="border border-[var(--color)] p-2 cursor-pointer hover:bg-[var(--color)]/10 transition-colors"
            onClick={handleArrowClick}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleArrowClick(e as any);
              }
            }}
            aria-label={`Navigate to ${title} page`}
          >
            {/* Replaced with Lucid Icon */}
            <ArrowUpRight className="text-black 2xl:w-[30px] xl:w-[24px] lg:w-[20px] md:w-[20px] sm:w-[16px] w-[12px] 2xl:h-[30px] xl:h-[24px] lg:h-[20px] md:h-[20px] sm:h-[16px] h-[12px]" />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// --- 2. Card Grid Component (Default Export) ---

const CardGrid = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { data, loading: pilotPageLoading } = useSelector((state: RootState) => state.pilotPage);
  const pilots = useSelector(selectPilots);
  const pilotsLoading = useSelector(selectPilotLoading);

  // Pilot names to fetch
  const pilotNames = ['Dreamer', 'Startups', 'SMBs', 'Enterprises'];

  useEffect(() => {
    if (!data && !pilotPageLoading) {
      dispatch(fetchPilotPageData());
    }
  }, [data, pilotPageLoading, dispatch]);

  useEffect(() => {
    // Fetch all pilots if not already loaded
    const pilotsToFetch = pilotNames.filter(name => !pilots[name]);
    if (pilotsToFetch.length > 0) {
      dispatch(fetchPilots(pilotsToFetch));
    }
  }, [dispatch, pilots]);

  if (!isEnabled(data?.piolets)) {
    return null;
  }

  // Map pilots data to card format
  type CardData = {
    title: string;
    description: string;
    duration: string;
    calendarIcon?: string;
    pilotKey?: string;
  };

  const cardData = pilotNames
    .map((name): (CardData & { pilotKey: string }) | null => {
      const pilot = pilots[name];
      if (!pilot) return null;
      
      return {
        title: pilot.piolet_name || name,
        description: pilot.description || '',
        duration: pilot.time || '',
        calendarIcon: pilot.calander_img || undefined,
        pilotKey: name, // Store the original pilot name as a unique key
      };
    })
    .filter((card): card is CardData & { pilotKey: string } => card !== null);

  // Show loading state or empty state
  if (pilotsLoading && cardData.length === 0) {
    return (
      <section className="w-full 2xl:py-[84px] xl:py-[72px] lg:py-[60px] md:py-[52px] py-[40px] px-4 sm:px-6 md:px-12 lg:px-[80px] xl:px-[120px] 2xl:px-[200px]">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:gap-[24px] gap-[16px]">
          {pilotNames.map((name) => (
            <div key={name} className="animate-pulse bg-gray-200 h-[200px] rounded" />
          ))}
        </div>
      </section>
    );
  }

  if (cardData.length === 0) {
    return null;
  }

  return (
    <section className="w-full 2xl:py-[84px] xl:py-[72px] lg:py-[60px] md:py-[52px] py-[40px] px-4 sm:px-6 md:px-12 lg:px-[80px] xl:px-[120px] 2xl:px-[200px]">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:gap-[24px] gap-[16px]">
        {cardData.map((card, index) => (
          <HoverCard
            key={card.pilotKey || card.title || `card-${index}`}
            title={card.title}
            description={card.description}
            duration={card.duration}
            calendarIcon={card.calendarIcon}
            pilotName={card.pilotKey}
          />
        ))}
      </div>
    </section>
  );
};

export default CardGrid;