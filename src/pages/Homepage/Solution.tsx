// SolutionPage.tsx
import React, { useMemo } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import SolutionCard from "@/Components/SolutionCard";

// Images
import Consult from "@/assets/Solutions/i.png";
import Build from "@/assets/Solutions/ii.png";
import Design from "@/assets/Solutions/iii.png";
import Host from "@/assets/Solutions/iv.png";
import Market from "@/assets/Solutions/v.png";
import Blank from "@/assets/Solutions/Blank.png";

import Avatar1 from "@/assets/Homeicons/asset-1.png";
import Avatar2 from "@/assets/Homeicons/asset-2.png";
import Avatar3 from "@/assets/Homeicons/asset-3.png";
import Avatar4 from "@/assets/Homeicons/asset-4.png";
import Avatar5 from "@/assets/Homeicons/asset-5.png";

interface CardData {
  title: string;
  description: string;
  imageUrl: string;
  heading?: string;
  subtitle?: string;
  tags?: string[];
  avatars?: string[];
  note?: string;
}

const cardsData: CardData[] = [
  { title: "", description: "", imageUrl: Blank }, // placeholder (ignored)
  {
    title: "Consult",
    description:
      "Every great solution begins with understanding.We help you see the bigger picture, defining strategy, growth paths, and scalable systems that move your business forward.",
    subtitle: "It Starts With Clarity.",
    imageUrl: Consult,
    tags: ["Technology", "Design", "Cyber Security", "Business Consulting"],
    avatars: [Avatar1, Avatar2, Avatar3, Avatar4, Avatar5],
    heading: "Expertise:",
    note: "Talk with minds that move strategy forward.",
  },
  {
    title: "Design",
    description:
      "Design isn’t just how it looks; it’s how it works, connects, and feels. We craft seamless, user-centric experiences that make brands memorable.",
    imageUrl: Design,
    subtitle: "Where Creativity Meets Purpose.",
    tags: ["Branding", "UX/UI Design", "Concept Design", "Product Design", "Space Design"],
    avatars: [Avatar1, Avatar2, Avatar3, Avatar4, Avatar5],
    heading: "Expertise:",
    note: "Collaborate with designers who think beyond visuals.",
  },
  {
    title: "Build",
    description:
      "We turn ideas into intelligent, high-performance digital products built for impact, speed, and scalability.",
    imageUrl: Build,
    subtitle: "From Vision to Execution.",
    tags: ["Mobile", "Web App", "AI & Automation", "Enterprise Application"],
    avatars: [Avatar1, Avatar2, Avatar3, Avatar4, Avatar5],
    heading: "Capabilities:",
    note: "Work with engineers who love creating impact.",
  },
  {
    title: "Secure",
    description:
      "Your business deserves digital resilience. We safeguard your systems with advanced security frameworks that prevent, detect, and respond to evolving threats.",
    imageUrl: Host,
    subtitle: "Trust. Protect. Evolve.",
    tags: ["Network Security", "Data Protection", "Compliance", "Threat Monitoring", "Audits"],
    avatars: [Avatar1, Avatar2, Avatar3, Avatar4, Avatar5],
    heading: "Expertise:",
    note: "Partner with experts who turn security into confidence.",
  },
  {
    title: "Host",
    description:
      "Your digital ecosystem deserves reliability, speed, and security. We keep your platforms always-on with cloud-grade hosting and enterprise infrastructure.",
    imageUrl: Host,
    subtitle: "Power That Never Sleeps",
    tags: ["Web Hosting", "Cloud", "Server Management", "AWS", "Google Cloud", "Azure"],
    avatars: [Avatar1, Avatar2, Avatar3, Avatar4, Avatar5], 
    heading: "Solutions:",
    note: "Run with experts who keep uptime sacred.",
  },
  {
    title: "Market",
    description:
      "We don’t just market; we build movements. Our strategies amplify reach, drive conversions, and create lasting digital footprints.",
    imageUrl: Market,
    subtitle: "Make Noise That Matters.",
    tags: ["Digital Growth", "Organic Marketing", "Media Buying", "Performance Marketing"],
    avatars: [Avatar1, Avatar2, Avatar3, Avatar4, Avatar5],
    heading: "Services:",
    note: "Connect with marketers who make results happen.",
  },
];

const SolutionPage: React.FC = () => {
  // Intro sections
  const heroRef = React.useRef<HTMLDivElement>(null);
  const secondRef = React.useRef<HTMLDivElement>(null);

  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ["start center", "end start"],
  });
  const { scrollYProgress: secondProgress } = useScroll({
    target: secondRef,
    offset: ["start center", "end start"],
  });

  const translateY = useTransform(heroProgress, [0, 1], [0, -300]);
  const scale = useTransform(heroProgress, [0, 1], [1, 0.5]);
  const translateY2 = useTransform(secondProgress, [0, 1], [0, -300]);
  const scale2 = useTransform(secondProgress, [0, 1], [1, 0.5]);

  // Real content (skip placeholder)
  const contentCards = useMemo(
    () => cardsData.filter((c) => c.title || c.description),
    []
  );
  const lastIndex = contentCards.length - 1;

  // Per-panel refs & progress
  const textRefs = useMemo(
    () => contentCards.map(() => React.createRef<HTMLDivElement>()),
    [contentCards.length]
  );
  const progresses = contentCards.map((_, i) =>
    useScroll({ target: textRefs[i], offset: ["start center", "end center"] })
      .scrollYProgress
  );

  // Text micro-hold + ghost opacity
  const sprung = progresses.map((p) =>
    useSpring(p, { stiffness: 180, damping: 20, mass: 0.25 })
  );
  const textY = sprung.map((sp) => useTransform(sp, [0, 0.5, 1], [24, 0, -24]));
  const textOpacity = sprung.map((sp) =>
    useTransform(sp, [0, 0.5, 1], [0.5, 1, 0.5])
  );

  // LEFT overlay image opacities — fade IN and then stay visible (no fade-out)
  const overlayOpacities = contentCards.map((_, i) => {
    const sp = sprung[i];
    if (i === 0) {
      // First image visible from start and never fades out
      return useTransform(sp, [0, 1], [1, 0.5]);
    }
    if(i === lastIndex) {
      return useTransform(sp, [0,0.5, 1], [0,1, 1]);
    }
    // Others: 0 → 1 by the time text reaches center, then stay at 1
    return useTransform(sp, [0, 0.5, 1], [0, 1, 0.5]);
  });

  return (
    <div className="px-4 sm:px-6 md:px-12 lg:px-[80px] xl:px-[120px] 2xl:px-[200px] py-[40px] sm:py-[48px] md:py-[52px] lg:py-[0px]">
      {/* Section 1 */}
      <div className="flex flex-col lg:gap-0 md:gap-10 sm:gap-8 gap-6">
      <section
  ref={heroRef}
  className="lg:h-[60vh] lg:mt-[200px] flex flex-col justify-center items-center md:gap-4 lg:gap-8 gap-2 "
>
  {/* STATIC (< lg) */}
  <div className="lg:hidden flex flex-col items-center md:gap-4 lg:gap-8 gap-2 ">
    <h1 className="2xl:text-[96px] xl:text-[82px] md:text-[68px] sm:text-[48px] text-[32px] text-center font-semibold">
      What Are We
      <br className="hidden xl:block" /> Fighting Against?
    </h1>
    <div>
      <p className="text-[var(--sub-text)] text-[14px] sm:text-[15px] md:text-[18px] lg:text-[22px] xl:text-[32px] text-center">
      Low engagement. Missed connection. Lost momentum.
      </p>
      <p className="text-[var(--sub-text)] text-[14px] sm:text-[15px] md:text-[18px] lg:text-[22px] xl:text-[32px] text-center">
      We turn that friction into forward motion.
      </p>
    </div>
  </div>

  {/* ANIMATED (lg+) */}
  <motion.div
    style={{ y: translateY, scale }}
    className="hidden lg:flex flex-col items-center md:gap-4 lg:gap-8 gap-2  will-change-transform"
  >
    <h1 className="2xl:text-[96px] xl:text-[82px] md:text-[68px] sm:text-[48px] text-[32px] text-center font-semibold">
      What Are We
      <br className="hidden xl:block" /> Fighting Against?
    </h1>
    <div>
      <p className="text-[var(--sub-text)] text-[14px] sm:text-[15px] md:text-[18px] lg:text-[22px] xl:text-[32px] text-center">
      Low engagement. Missed connection. Lost momentum.
      </p>
      <p className="text-[var(--sub-text)] text-[14px] sm:text-[15px] md:text-[18px] lg:text-[22px] xl:text-[32px] text-center">
      We turn that friction into forward motion.
      </p>
    </div>
  </motion.div>
</section>


      {/* Section 2 */}
      <section
    ref={secondRef}
    className="lg:h-[80vh] flex flex-col justify-center items-center"
  >
    {/* Static (below lg) */}
    <div className="lg:hidden flex flex-col items-center gap-2 md:gap-4 lg:gap-8">
      <h1 className="2xl:text-[96px] xl:text-[82px] md:text-[68px] sm:text-[48px] text-[24px] text-center font-semibold">
        Your Business, Simplified
      </h1>
      <div>
        <p className="text-[var(--sub-text)] text-[14px] sm:text-[15px] md:text-[18px] lg:text-[22px] xl:text-[32px] text-center">
        We handle the complexity so you can
        </p>
        <p className="text-[var(--sub-text)] text-[14px] sm:text-[15px] md:text-[18px] lg:text-[22px] xl:text-[32px] text-center">
          focus on what matters most.
        </p>
      </div>
    </div>

    {/* Motion (lg and up) */}
    <motion.div
      style={{ y: translateY2, scale: scale2 }}
      className="hidden lg:flex flex-col items-center gap-2 md:gap-4 lg:gap-8 will-change-transform"
    >
      <h1 className="2xl:text-[96px] xl:text-[82px] md:text-[68px] sm:text-[48px] text-[24px] text-center font-semibold">
        Your Business, Simplified
      </h1>
      <div>
        <p className="text-[var(--sub-text)] text-[14px] sm:text-[15px] md:text-[18px] lg:text-[22px] xl:text-[32px] text-center">
        We handle the complexity so you can focus on what matters most.
        </p>
      </div>
    </motion.div>
  </section>

  </div>











      {/* Stack + Panels */}
      <section className="relative w-full">
  {/* < lg : STATIC UI (no motion) */}
  <div className="lg:hidden md:pt-10 sm:pt-8 pt-6">
  <div className="w-full mx-auto flex flex-col space-y-10 sm:space-y-12 md:space-y-16">
    {contentCards.map((card, i) => {
      const avatars = (card as { avatars?: string[] }).avatars; // optional
      return (
        <div key={`m-${card.title}-${i}`} className="w-full">
          {/* hero image */}
          <div className="w-full overflow-hidden aspect-[16/9] mb-6">
            <img
              src={card.imageUrl}
              alt={card.title}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="flex flex-col md:gap-8 gap-6">
            {/* title + description */}
            <div className="flex flex-col md:gap-4 gap-2">
              <h2 className="md:text-[48px] sm:text-[32px] text-[24px] font-semibold">
                {card.title}
              </h2>
              <div>
              <p className="text-black font-semibold text-[14px] sm:text-[16px] md:text-[18px]">
                {card.subtitle}
              </p>
              <p className="text-[var(--sub-text)] text-[14px] sm:text-[16px] md:text-[18px]">
                {card.description}
              </p>
              </div>
            </div>

            <div>
            <p className="text-black font-semibold text-[14px] sm:text-[16px] md:text-[18px]">
                {card.heading}
              </p>
            {Array.isArray(card.tags) && card.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 md:gap-3">
                {card.tags.map((t, k) => (
                  <span
                    key={k}
                    className="px-3 sm:py-2 sm:px-4 py-[6px] text-[12px] sm:text-[16px] md:text-[18px] border"
                  >
                    {t}
                  </span>
                ))}
              </div>
            )}
            </div>

            <div className="flex items-center md:gap-4 gap-2">
              <div className="min-w-[130px]">
                {Array.isArray(avatars) && avatars.length > 0 && (
                  <div className="flex -space-x-2">
                    {avatars.slice(0, 5).map((src, idx) => (
                      <img
                        key={idx}
                        src={src}
                        alt=""
                        className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-full ring-2 ring-white object-cover"
                      />
                    ))}
                  </div>
                )}
              </div>
              <p className="text-[14px] sm:text-[16px] md:text-[18px] text-[var(--sub-text)]">
                {card.note}
              </p>
            </div>
          </div>
        </div>
      );
    })}
  </div>
</div>


  {/* lg+ : YOUR ORIGINAL ANIMATION (unchanged). Only wrapped to show at lg+ */}
  <div className="hidden lg:block">
    <div className="relative w-full mx-auto flex gap-10 justify-between pl-[0px] min-[1600px]:pl-[50px]">
      {/* LEFT: sticky centered image stack (only shown at lg+) */}
      <div className="relative hidden lg:flex flex-[0_1_520px] min-w-0">
        <div className="sticky top-0 h-screen w-full flex items-center justify-center">
          {/* Only the image box scales: min -> preferred (vw) -> max */}
          <div className="relative mt-[50px] w-[clamp(220px,32vw,520px)] h-[clamp(320px,45vw,720px)]">
            {contentCards.map((card, i) => (
              <motion.img
                key={`overlay-${card.title}-${i}`}
                src={card.imageUrl}
                alt={card.title}
                className="absolute inset-0 w-full h-full object-contain"
                style={{
                  opacity: overlayOpacities[i],
                  zIndex: i === lastIndex ? 1000 : i + 1,
                }}
                transition={{ duration: 0, ease: "easeInOut", delay: 0.1 }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* RIGHT: never shrinks; image column takes the hit */}
      <div className="relative min-[1840px]:max-w-[800px] min-[1280px]:max-w-[600px] max-w-[500px] w-full">
        {contentCards.map((card, i) => {
          const spClass =
            i === lastIndex ? "xl:mb-[0vh] mb-[20vh]" : i === 0 ? "2xl:mt-[0vh] xl:mt-[5vh] mt-[22vh]" : "xl:py-12 py-0";
          return (
            <motion.div
              key={`text-${card.title}-${i}`}
              ref={textRefs[i]}
              style={{ y: textY[i], opacity: textOpacity[i] }}
              className={`${spClass} flex items-center xl:h-[100vh] h-[60vh] box-border`}
            >
              <div className="max-w-[840px]">
                <SolutionCard
                  title={card.title}
                  description={card.description}
                  tags={card.tags}
                  heading={card.heading}
                  subtitle={card.subtitle}
                  note={card.note}  

                />
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  </div>
</section>



    </div>
  );
};

export default SolutionPage;
