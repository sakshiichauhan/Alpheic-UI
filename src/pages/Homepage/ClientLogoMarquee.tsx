import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { motion, useInView, useMotionValue, useAnimationFrame } from "framer-motion";

type Item = { src: string; alt: string };

// Import all images in ClientsLogo (no numbering logic). Keep stable alphabetical order.
const buildLogos = (): Item[] => {
  const modules = import.meta.glob("@/assets/ClientsLogo/*.{png,jpg,jpeg,svg}", { eager: true });
  const entries = Object.entries(modules).sort(([a], [b]) => a.localeCompare(b));
  return entries.map(([path, mod]) => {
    const url = (mod as { default: string }).default;
    const file = path.split("/").pop() ?? path;
    const alt = file.replace(/\.[a-zA-Z]+$/, "");
    return { src: url, alt };
  });
};

const LOGOS: Item[] = buildLogos();

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
  

  const measure = () => {
    if (trackRef.current) setTrackW(trackRef.current.getBoundingClientRect().width);
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
    // Start both directions so the seam is offscreen to the left
    x.set(-trackW + eps);
  }, [trackW, dir, x]);

  // Per-frame loop with wrap
  useAnimationFrame((_, delta) => {
    if (!trackW || !inView) return;
    const step = (speed / 1000) * delta * dir;
    let next = x.get() + step;

    // Wrap within [-trackW, 0)
    if (next >= 0) next -= trackW;
    if (next <= -trackW) next += trackW;

    x.set(next);
  });

  const Logo = (key: string, it: Item) => (
    <div key={key} className="flex-none flex items-center pointer-events-auto">
      <img
        src={it.src}
        alt={it.alt}
        className="block object-contain opacity-80 grayscale transition hover:opacity-100 hover:grayscale-0 h-[41px] sm:h-[60px] md:h-[72px] lg:h-[124px] xl:h-[156px] pointer-events-auto"
        style={{ width: "auto" }}
        loading="lazy"
      />
    </div>
  );

  return (
    <div
      ref={containerRef}
      className="w-full overflow-hidden"
      style={{ background: "transparent" }}
    >
      {/* No outer gap; gaps are inside each track so the seam never shows as blank */}
      <motion.div className="flex w-max transform-gpu pointer-events-none" style={{ x, willChange: "transform" }}>
        {/* Track A (measured) */}
        <div ref={trackRef} className="flex lg:pl-[24px] md:pl-[16px] sm:pl-[12px] pl-[8px] lg:gap-[24px] md:gap-[16px] sm:gap-[12px] gap-[8px] pointer-events-none">
          {items.map((it, i) => Logo(`A-${i}`, it))}
        </div>
        {/* Track B (clone) */}
        <div className="flex lg:pl-[24px] md:pl-[16px] sm:pl-[12px] pl-[8px] lg:gap-[24px] md:gap-[16px] sm:gap-[12px] gap-[8px] pointer-events-none">
          {items.map((it, i) => Logo(`B-${i}`, it))}
        </div>
        {/* Removed extra buffer track to reduce any potential overlap at the seam */}
      </motion.div>
    </div>
  );
}

export default function ClientLogoMarquee() {
  return (
    <section className="w-full lg:py-[64px] md:py-[48px] py-[32px]">
      <div className="flex w-full flex-col gap-8">

        
      <div className="flex w-full justify-center lg:text-[40px] md:text-[32px] sm:text-[26px] text-[20px] font-medium">
      Proudly worked with
      </div>
        <MarqueeRow items={LOGOS} dir={1} speed={100} />

        <MarqueeRow items={LOGOS} dir={-1} speed={100} />
      </div>
    </section>
  );
}
