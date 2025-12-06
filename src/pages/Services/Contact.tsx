import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { motion, useInView, useMotionValue, useAnimationFrame } from "framer-motion";
import ParsedHtml from "@/Components/ParsedHtml";
import type { ServiceBrandListItem } from "@/store/Slice/UxDesgin/UxDesgin";

import logo1 from "@/assets/logo/logo1.png";
import logo2 from "@/assets/logo/logo2.png";
import logo3 from "@/assets/logo/logo3.png";
import logo4 from "@/assets/logo/logo4.png";
import logo5 from "@/assets/logo/logo5.png";
import logo6 from "@/assets/logo/logo6.png";
import logo7 from "@/assets/logo/logo7.png";

type Item = { src: string; alt: string };

const LOGOS: Item[] = [
  { src: logo1 as unknown as string, alt: "Client logo 1" },
  { src: logo2 as unknown as string, alt: "Client logo 2" },
  { src: logo3 as unknown as string, alt: "Client logo 3" },
  { src: logo4 as unknown as string, alt: "Client logo 4" },
  { src: logo5 as unknown as string, alt: "Client logo 5" },
  { src: logo6 as unknown as string, alt: "Client logo 6" },
  { src: logo7 as unknown as string, alt: "Client logo 7" },
];

// Helper function to construct image URL from API path
const getImageUrl = (imagePath?: string): string => {
  if (!imagePath) return '';
  
  // If it's already a full URL, return as-is
  if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
    return imagePath;
  }
  
  // If it starts with /files/, construct full URL
  if (imagePath.startsWith('/files/')) {
    const apiBaseUrl = 'https://work.alpheric.com';
    return apiBaseUrl ? `${apiBaseUrl}${imagePath}` : imagePath;
  }
  
  // Fallback to empty string if path is invalid
  return '';
};

// Helper function to convert brand list to Item[] format
const convertBrandsToItems = (brands?: ServiceBrandListItem[]): Item[] => {
  if (!brands || brands.length === 0) {
    return LOGOS; // Fallback to hardcoded logos
  }

  return brands
    .filter((brand) => brand.attach_logo) // Only include brands with logos
    .map((brand) => ({
      src: getImageUrl(brand.attach_logo),
      alt: brand.brand_name || brand.name1 || brand.name || "Client logo",
    }));
};

type RowProps = {
  items: Item[];
  speed?: number;   // px/sec
  dir?: 1 | -1;  
};

function MarqueeRow({
  items,
  speed = 55,
  dir = 1,
}: RowProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null); // measure ONE track
  const inView = useInView(containerRef, { amount: 0.15 });

  const x = useMotionValue(0);
  const [trackW, setTrackW] = useState(0);
  const [containerW, setContainerW] = useState(0);
  const [paused, setPaused] = useState(false);

  const measure = () => {
    if (trackRef.current) setTrackW(trackRef.current.getBoundingClientRect().width);
    if (containerRef.current) setContainerW(containerRef.current.getBoundingClientRect().width);
  };

  useLayoutEffect(() => {
    measure();
    const onResize = () => measure();
    window.addEventListener("resize", onResize);

    // Re-measure when images finish loading / sizes change
    let ro: ResizeObserver | null = null;
    if (typeof ResizeObserver !== "undefined" && trackRef.current) {
      ro = new ResizeObserver(measure);
      ro.observe(trackRef.current);
    }

    return () => {
      window.removeEventListener("resize", onResize);
      ro?.disconnect();
    };
  }, []);

  // Start position:
  //  - dir = 1 (L→R): start at -trackW so the middle copy fills the viewport
  //  - dir = -1 (R→L): align the END of the track with the right edge so it starts "from far right"
  useEffect(() => {
    if (!trackW) return;
    const eps = 0.5;
    if (dir === 1) {
      x.set(-trackW + eps);
    } else {
      // put the seam offscreen to the right: right-align the last pixel of track
      // clamp to [-trackW, 0] to stay in our wrap window
      const startX = -(Math.max(trackW - containerW, 0)) + eps;
      x.set(Math.max(-trackW + eps, Math.min(0 - eps, startX)));
    }
  }, [trackW, containerW, dir, x]);

  // Per-frame loop with wrap
  useAnimationFrame((_, delta) => {
    if (!trackW || !inView || paused) return;
    const step = (speed / 1000) * delta * dir;
    let next = x.get() + step;

    // Wrap within [-trackW, 0)
    if (next >= 0) next -= trackW;
    if (next <= -trackW) next += trackW;

    x.set(next);
  });

  const Logo = (key: string, it: Item) => (
    <div key={key} className="flex-none flex items-center">
      <img
        src={it.src}
        alt={it.alt}
        className="block object-contain opacity-80 grayscale transition hover:opacity-100 hover:grayscale-0 h-[41px] sm:h-[60px] md:h-[72px] lg:h-[124px] xl:h-[156px]"
        style={{ width: "auto" }}
        loading="lazy"
        referrerPolicy="no-referrer"
      />
    </div>
  );

  return (
    <div
      ref={containerRef}
      className="w-full overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      style={{ background: "transparent" }}
    >
      {/* No outer gap; gaps are inside each track so the seam never shows as blank */}
      <motion.div className="flex w-max" style={{ x, willChange: "transform" }}>
        {/* Track A (measured) */}
        <div ref={trackRef} className="flex lg:pl-[24px] md:pl-[16px] sm:pl-[12px] pl-[8px] lg:gap-[24px] md:gap-[16px] sm:gap-[12px] gap-[8px]">
          {items.map((it, i) => Logo(`A-${i}`, it))}
        </div>
        {/* Track B (clone) */}
        <div className="flex lg:pl-[24px] md:pl-[16px] sm:pl-[12px] pl-[8px] lg:gap-[24px] md:gap-[16px] sm:gap-[12px] gap-[8px]">
          {items.map((it, i) => Logo(`B-${i}`, it))}
        </div>
        {/* Track C (extra buffer for truly circular feel) */}
        <div className="flex lg:pl-[24px] md:pl-[16px] sm:pl-[12px] pl-[8px] lg:gap-[24px] md:gap-[16px] sm:gap-[12px] gap-[8px]">
          {items.map((it, i) => Logo(`C-${i}`, it))}
        </div>

        <div className="flex lg:pl-[24px] md:pl-[16px] sm:pl-[12px] pl-[8px] lg:gap-[24px] md:gap-[16px] sm:gap-[12px] gap-[8px]">
          {items.map((it, i) => Logo(`C-${i}`, it))}
        </div>
      </motion.div>
    </div>
  );
}

interface ContactProps {
  heading?: string;
  description?: string;
  brands?: ServiceBrandListItem[];
}

export default function Contact({ heading, description, brands }: ContactProps) {
  // Convert brands to items format, fallback to hardcoded logos if no brands provided
  const logoItems = convertBrandsToItems(brands);
  return (
    <section className="w-full lg:py-[64px] md:py-[48px] py-[32px]">
      <div className="flex w-full flex-col gap-8">

        {/* Trusted By heading */}
        <div className="flex flex-col items-center text-center">
          {heading ? (
            <ParsedHtml
              htmlContent={heading}
              as="div"
              className="flex justify-center lg:text-[72px] md:text-[32px] sm:text-[24px] text-[20px] "
            />
          ) : (
            <div className="flex justify-center lg:text-[72px] md:text-[32px] sm:text-[24px] text-[20px] font-semibold">
              Trusted
              <span className="font-light ml-2">By</span>
            </div>
          )}

          {/* Subtitle below heading */}
          {description ? (
            <ParsedHtml
              htmlContent={description}
              as="p"
              className="mt-2 max-w-[1098px] text-center text-2xl font-light font-urbanist text-[#3E3E3E]"
            />
          ) : (
            <p className="mt-2 max-w-[1098px] text-center text-2xl font-light font-urbanist text-[#3E3E3E]">
              In collaboration with global tools and partners:
            </p>
          )}
        </div>

        {/* Logo marquee */}
        <MarqueeRow items={logoItems} dir={1} speed={100} />

      </div>
    </section>
  );
}
