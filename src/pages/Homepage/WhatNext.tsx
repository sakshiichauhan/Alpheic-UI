// WhatNext.tsx
import React, { useMemo, useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

import first from "@/assets/WhatNext/i.png";
import second from "@/assets/WhatNext/ii.png";
import third from "@/assets/WhatNext/iii.png";

interface CardData {
  title: string;
  description: string;
  imageUrl: string;
  bullets: string[];
}

const cardsData: CardData[] = [
  {
    title: "Brief",
    description:
      "You will get to know our team while we dive into project details for effective communication",
    imageUrl: first,
    bullets: ["Our questionnaire", "Introductory call", "Project documentation"],
  },
  {
    title: "Proposal",
    description:
      "You'll receive a detailed proposal with project goals and timeline to foster mutual understanding",
    imageUrl: second,
    bullets: ["Budget", "Team size", "Timeline"],
  },
  {
    title: "Kickoff",
    description:
      "We coordinate all necessary documentation from both sides before the project starts for seamless collaboration",
    imageUrl: third,
    bullets: ["Invoice and contract issuance", "Making deposit", "Start project"],
  },
];

// Simple inline text card (no external component dependency)
const TextCard: React.FC<Pick<CardData, "title" | "description" | "bullets">> = ({
  title,
  description,
  bullets,
}) => {
  return (
    <div className="max-w-[560px] flex flex-col gap-4">
      <h2 className="font-instrument-sans font-semibold text-[24px] xl:text-[52px] lg:text-[40px] md:text-[32px] 2xl:text-[64px] text-black">
        {title}
      </h2>
      <p className="text-[14px] sm:text-[16px] 2xl:text-[32px] xl:text-[28px] lg:text-[24px] md:text-[20px] text-[var(--sub-text)] font-urbanist">
        {description}
      </p>
      {bullets?.length ? (
        <ul className="space-y-3 text-[14px] sm:text-[16px] 2xl:text-[32px] xl:text-[28px] lg:text-[24px] md:text-[20px] text-[var(--sub-text)] font-urbanist">
          {bullets.map((b, i) => (
            <li key={i} className="pl-4 relative flex items-center gap-4">
              <span className="block md:w-1 md:h-1 w-0.5 h-0.5 rounded-full bg-[var(--sub-text)]" />
              {b}
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
};

const WhatNext: React.FC = () => {
  // Intro hero (already non-animated below lg)
  const nextSectionRef = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: nextSectionRef,
    offset: ["start center", "end start"],
  });
  const translateY = useTransform(scrollYProgress, [0, 1], [300, -300]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.5]);

  // Desktop (lg+) animated setup
  const contentCards = cardsData;
  const lastIndex = contentCards.length - 1;

  const textRefs = useMemo(
    () => contentCards.map(() => React.createRef<HTMLDivElement>()),
    [contentCards.length]
  );

  const progresses = contentCards.map((_, i) =>
    useScroll({ target: textRefs[i], offset: ["start center", "end center"] })
      .scrollYProgress
  );

  const sprung = progresses.map((p) =>
    useSpring(p, { stiffness: 180, damping: 20, mass: 0.25 })
  );

  const textOpacity = sprung.map((sp) =>
    useTransform(sp, [0, 0.5, 1], [0.5, 1, 0.5])
  );

  const overlayOpacities = contentCards.map((_, i) => {
    const sp = sprung[i];
    if (i === 0) return useTransform(sp, [0, 1], [1, 1]); // always visible
    return useTransform(sp, [0, 0.5, 1], [0, 1, 1]); // fade in then hold
  });

  return (
    <>
      {/* Intro header */}
      <section
        ref={nextSectionRef}
        className="lg:h-[60vh] lg:mt-[200px] flex flex-col justify-center items-center md:gap-4 lg:gap-8 gap-2 "
      >
        {/* STATIC (< lg) */}
        <div className="lg:hidden flex flex-col items-center md:gap-4 lg:gap-8 gap-2 ">
          <h1 className="2xl:text-[96px] xl:text-[82px] md:text-[68px] sm:text-[48px] text-[32px] text-center font-semibold">
            What Next?
          </h1>
          <div>
            <p className="text-[var(--sub-text)] text-[14px] sm:text-[15px] md:text-[18px] lg:text-[22px] xl:text-[32px] text-center">
              How will our cooperation go
            </p>
            <p className="text-[var(--sub-text)] text-[14px] sm:text-[15px] md:text-[18px] lg:text-[22px] xl:text-[32px] text-center">
              after the start of work
            </p>
          </div>
        </div>

        {/* ANIMATED (lg+) */}
        <motion.div
          style={{ y: translateY, scale }}
          className="hidden lg:flex flex-col items-center md:gap-4 lg:gap-8 gap-2 will-change-transform"
        >
          <h1 className="2xl:text-[96px] xl:text-[82px] md:text-[68px] sm:text-[48px] text-[32px] text-center font-semibold">
            What Next?
          </h1>
          <div>
            <p className="text-[var(--sub-text)] text-[14px] sm:text-[15px] md:text-[18px] lg:text-[22px] xl:text-[32px] text-center">
              How will our cooperation go
            </p>
            <p className="text-[var(--sub-text)] text-[14px] sm:text-[15px] md:text-[18px] lg:text-[22px] xl:text-[32px] text-center">
              after the start of work
            </p>
          </div>
        </motion.div>
      </section>

      {/* Main section */}
      <section className="relative w-full px-4 sm:px-6 md:px-12 lg:px-[80px] xl:px-[120px] 2xl:px-[200px]">
        {/* lg+ animated/sticky layout */}
        <div className="relative w-full mx-auto grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] justify-center m-auto">
          {/* TEXT (animated) */}
          <div className="relative hidden lg:flex flex-col items-center justify-right">
            {contentCards.map((card, i) => {
              const spacingClass =
                i === lastIndex
                  ? "mb-[18vh]"
                  : i === 0
                  ? "xl:mt-[27vh] mt-[24vh]"
                  : "xl:py-12 py-8";
              return (
                <motion.div
                  key={`text-${card.title}-${i}`}
                  ref={textRefs[i]}
                  style={{ opacity: textOpacity[i] }}
                  className={`${spacingClass} flex items-center xl:h-[65vh] h-[55vh] box-border justify-end`}
                >
                  <TextCard
                    title={card.title}
                    description={card.description}
                    bullets={card.bullets}
                  />
                </motion.div>
              );
            })}
          </div>

          {/* IMAGES (sticky) */}
          <div className="relative hidden lg:flex">
            <div className="sticky top-0 h-screen w-full flex items-center justify-center">
              <div className="relative w-[520px] h-[620px]">
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
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* < lg — NO animations: horizontal, swipeable carousel */}
        <div className="lg:hidden px-6">
          <div
            className="
              flex gap-4 py-10
              overflow-x-auto
              snap-x snap-mandatory
              scroll-px-6
              touch-pan-x
              overscroll-x-contain
              scroll-smooth
              no-scrollbar
            "
            role="region"
            aria-label="Project steps"
            tabIndex={0}
          >
            {contentCards.map((card, i) => (
              <article
                key={`m-${card.title}-${i}`}
                className="
                  snap-start shrink-0
                  w-[270px] sm:w-[320px] md:w-[360px] lg:w-[400px] xl:w-[440px] 2xl:w-[480px]
                  bg-white 
                  border border-[#F0F1F2]
                  p-3 sm:p-4 md::p-6 
                  flex flex-col md:gap-6 gap-4
                "
              >
                <img
                  src={card.imageUrl}
                  alt={card.title}
                  className="w-[270px] h-[225px] sm:w-[320px] sm:h-[260px] md:w-[360px] md:h-[290px] lg:w-[400px] lg:h-[320px] xl:w-[440px] xl:h-[350px] 2xl:w-[480px] 2xl:h-[380px] object-cover"
                  draggable={false}
                />
                <TextCard
                  title={card.title}
                  description={card.description}
                  bullets={card.bullets}
                />
              </article>
            ))}
          </div>

          
        </div>
      </section>
    </>
  );
};

export default WhatNext;
