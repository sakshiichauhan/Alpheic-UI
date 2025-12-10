import { motion } from "framer-motion";

// --- 1. DATA SETUP (Keep stable) ---
const buildLogos = () => {
  const modules = import.meta.glob("@/assets/ClientsLogo/*.{png,jpg,jpeg,svg}", { eager: true });
  return Object.entries(modules)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([path, mod]) => ({
      src: (mod as any).default,
      alt: path.split("/").pop()?.replace(/\.[^/.]+$/, "") || "Logo",
    }));
};

const LOGOS = buildLogos();

// --- 2. SIMPLE COMPONENT ---
const MarqueeRow = ({ items, direction = "left", speed = 30, className = "" }: { items: typeof LOGOS, direction?: "left" | "right", speed?: number, className?: string }) => {
  
  // Logic: 
  // 1. If direction is Right, we reverse the list first.
  // 2. We double the list (A + A) to create the seamless loop.
  const content = direction === "right" ? [...items].reverse() : items;
  const loopItems = [...content, ...content];

  return (
    <div className={`w-full overflow-hidden flex bg-transparent select-none ${className}`}>
      <motion.div
        // EXACT ORIGINAL UI GAPS
        className="flex shrink-0 items-center gap-[8px] sm:gap-[12px] md:gap-[16px] lg:gap-[24px] pr-[8px] sm:pr-[12px] md:pr-[16px] lg:pr-[24px]"
        // ANIMATION LOGIC:
        // Left:  Moves 0% -> -50%
        // Right: Moves -50% -> 0% (This keeps the "Middle" of the row visible, ensuring mouse clicks work)
        initial={{ x: direction === "left" ? "0%" : "-50%" }}
        animate={{ x: direction === "left" ? "-50%" : "0%" }}
        transition={{
          duration: speed,
          ease: "linear",
          repeat: Infinity,
        }}
      >
        {loopItems.map((item, i) => (
          <div key={i} className="flex-none flex items-center justify-center relative">
            <img
              src={item.src}
              alt={item.alt}
              draggable={false}
              // EXACT ORIGINAL UI SIZES & HOVER
              className="block object-contain opacity-80 hover:opacity-100 transition-opacity duration-300 cursor-pointer h-[41px] sm:h-[60px] md:h-[72px] lg:h-[124px] xl:h-[156px] pointer-events-auto"
              style={{ width: "auto" }}
            />
          </div>
        ))}
      </motion.div>
    </div>
  );
};

// --- 3. MAIN EXPORT ---
export default function ClientLogoMarquee() {
  return (
    // EXACT ORIGINAL SECTION PADDING
    <section className="w-full lg:pt-[64px] lg:pb-[24px] md:pt-[48px] pt-[32px] pb-[0px]">
      <div className="flex w-full flex-col gap-8">
        
        {/* EXACT ORIGINAL FONT SIZES */}
        <div className="flex w-full justify-center lg:text-[40px] md:text-[32px] sm:text-[26px] text-[20px] font-medium">
          Proudly worked with
        </div>

        {/* Row 1: Left */}
        <MarqueeRow items={LOGOS} direction="left" speed={100} />

        {/* Row 2: Right */}
        <MarqueeRow items={LOGOS} direction="right" speed={100} />
        
        <MarqueeRow className="opacity-0 " items={LOGOS} direction="left" speed={100} />
      </div>
    </section>
  );
}