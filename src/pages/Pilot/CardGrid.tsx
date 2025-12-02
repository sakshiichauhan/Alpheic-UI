// PilotCardGrid.tsx
import React from "react";
import { motion, type Variants } from "framer-motion"; 
import { Calendar, ArrowUpRight } from "lucide-react";
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
};

// --- 1. Hover Card Component ---

const HoverCard: React.FC<CardProps> = ({
  title,
  description,
  duration,
}) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    if (title === "Dreamers") {
      navigate("/Dreamers");
    }
    // Add navigation for other cards if needed
  };

  return (
    // Main card wrapper. This controls the hover state for all children.
    <motion.div
      className="relative flex flex-col w-full bg-white border border-white overflow-hidden cursor-pointer"
      initial="initial" // Set initial animation state
      whileHover="hover" // Set state to animate to on hover
      onClick={handleCardClick}
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
            {/* Replaced with Lucid Icon */}
            <Calendar size={16} className="text-[var(--medium-text)]" />
            <span className="2xl:text-[16px] xl:text-[14px] sm:text-[12px] text-[10px] text-[var(--medium-text)] font-urbanist font-medium">{duration}</span>
          </div>

          <div className="border border-[var(--color)] p-2">
            {/* Replaced with Lucid Icon */}
            <ArrowUpRight className="text-black 2xl:w-[30px] xl:w-[24px] lg:w-[20px] md:w-[20px] sm:w-[16px] w-[12px] 2xl:h-[30px] xl:h-[24px] lg:h-[20px] md:h-[20px] sm:h-[16px] h-[12px]" />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// --- Dummy Data ---
const cardData = [
  {
    title: "Dreamers",
    description: "For those with a big idea and the courage to build it.",
    duration: "2 to 4 weeks",
  },
  {
    title: "Startups",
    description: "Scale your product and find your market fit, fast.",
    duration: "2 to 4 weeks",
  },
  {
    title: "SMBs",
    description: "Optimize operations and unlock new growth channels.",
    duration: "2 to 4 weeks",
  },
  {
    title: "Enterprises",
    description: "Innovate at scale with robust, future-proof systems.",
    duration: "2 to 4 weeks",
  },
];

// --- 2. Card Grid Component (Default Export) ---

const CardGrid = () => {
  return (
    <section className="w-full 2xl:py-[84px] xl:py-[72px] lg:py-[60px] md:py-[52px] py-[40px] px-4 sm:px-6 md:px-12 lg:px-[80px] xl:px-[120px] 2xl:px-[200px]">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:gap-[24px] gap-[16px]">
        {cardData.map((card) => (
          <HoverCard
            key={card.title}
            title={card.title}
            description={card.description}
            duration={card.duration}
          />
        ))}
      </div>
    </section>
  );
};

export default CardGrid;