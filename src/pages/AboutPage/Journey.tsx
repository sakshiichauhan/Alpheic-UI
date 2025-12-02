import React, { useRef, useEffect, useState } from "react";

type Card = { title: string; subtitle: string; body: string };

const cards: Card[] = [
  { title: "Cyber Security", subtitle: "Where We Started", body: "Our story began in the world of cybersecurity, helping organizations safeguard their networks, users, and operations. We built our foundation on trust, protection, and digital assurance, ensuring every system we touched was resilient and secure." },
  { title: "Technology", subtitle: "Expanding the Horizon", body: "As our clients grew, so did their ambitions. We evolved into a technology development and automation company, building digital platforms, enterprise dashboards, and AI models that powered smarter decision-making and seamless operations." },
  { title: "Design & Branding", subtitle: "Giving Identity to Innovation", body: "We soon realized that technology must also connect emotionally. That’s when Alpheric expanded into design and branding, blending creativity with strategy. From UX/UI experiences to brand storytelling and visual systems — we started helping businesses communicate who they are, not just what they do." },
  { title: "Hosting & Infrastructur", subtitle: "Powering Everything Behind the Scenes", body: "To complete the circle, we built our own hosting and infrastructure ecosystem.Through Hostripples and our data systems, we now provide end-to-end digital reliability — powering websites, applications, and enterprise systems with speed, scalability, and security." },
  { title: "Culture & People", subtitle: "The Rise of Unstoppables", body: "Unstoppables isn’t just a team; it’s our culture of grit, collaboration, and continuous creation. It symbolizes the people who dare to think differently, build fearlessly, and never stop learning. At Alpheric, Unstoppables is the driving force behind every line of code, every design, every decision." },
];

const Journey: React.FC = () => {
  const firstDotRef = useRef<HTMLSpanElement>(null);
  const lastDotRef = useRef<HTMLSpanElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const [lineHeight, setLineHeight] = useState<number>(0);

  // Calculate line height dynamically based on dot positions
  useEffect(() => {
    const calculateHeight = () => {
      if (firstDotRef.current && lastDotRef.current) {
        const firstDotRect = firstDotRef.current.getBoundingClientRect();
        const lastDotRect = lastDotRef.current.getBoundingClientRect();
        
        // Calculate distance from the center of the first dot to the center of the last dot
        const firstDotCenter = firstDotRect.top + firstDotRect.height / 2;
        const lastDotCenter = lastDotRect.top + lastDotRect.height / 2;
        const height = lastDotCenter - firstDotCenter;
        
        setLineHeight(height);
      }
    };

    // Calculate on mount and resize
    calculateHeight();
    window.addEventListener('resize', calculateHeight);

    return () => window.removeEventListener('resize', calculateHeight);
  }, []);

  return (
    <section className="w-full bg-white" aria-labelledby="journey-heading">
      <style>{`
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        .no-scrollbar::-webkit-scrollbar { display: none; }
       `}</style>

      <div className="mx-auto 2xl:pb-[120px] xl:pb-[100px] xl:pt-0 lg:py-[80px] md:py-[60px] sm:py-[52px] py-[40px]">
        <h2 id="journey-heading" className="text-center 2xl:text-[72px] xl:text-[60px] lg:text-[48px] md:text-[40px] sm:text-[38px] text-[32px] tracking-tight text-black">
          Our <span className="font-bold">Journey</span>
        </h2>

        {/* ======================================================================= */}
        {/* DESKTOP VIEW: Horizontal scroll layout (unchanged)                  */}
        {/* ======================================================================= */}
        <div className="hidden lg:block relative xl:pt-[64px] lg:pt-[56px] md:pt-[48px] sm:pt-[40px] pt-[32px]">
          <div className="no-scrollbar relative overflow-x-auto" aria-label="Journey timeline">
            <div className="relative flex snap-x snap-mandatory xl:gap-[120px] lg:gap-[100px] md:gap-[80px] sm:gap-[60px] gap-[40px] pt-14">
              <div
                className="pointer-events-none absolute left-[80px] xl:left-[120px] 2xl:left-[200px] top-[22px] xl:top-6 h-[2px] w-[calc((320px+120px)*4)] sm:w-[calc((380px+100px)*4)] 2xl:w-[calc((492px+120px)*4)] bg-[var(--color)]"
              />
              {cards.map((c, i) => (
                <div key={i} className={`relative w-[320px] shrink-0 snap-start sm:w-[380px] 2xl:w-[492px] ${i === 0 ? 'lg:ml-[80px] xl:ml-[120px] 2xl:ml-[200px]' : ''}`}>
                  <span className="pointer-events-none absolute left-0 -top-11 inline-block xl:h-[24px] xl:w-[24px] h-[20px] w-[20px] rounded-full bg-[var(--color)] " />
                  <div data-card="true">
                    <h3 className="2xl:text-[40px] xl:text-[32px] lg:text-[28px] text-black font-semibold">{c.title}</h3>
                    <p className="2xl:text-[28px] xl:text-[24px] lg:text-[20px] mt-[8px] font-medium text-[var(--hero-text)]">{c.subtitle}</p>
                    <p className="2xl:text-[20px] xl:text-[18px] lg:text-[16px] 2xl:mt-[32px] xl:mt-[28px] lg:mt-[24px] md:mt-[20px] sm:mt-[16px] mt-[12px] text-[var(--medium-text)] font-urbanist">{c.body}</p>
                    </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ======================================================================= */}
        {/* MOBILE VIEW: Vertical stack layout (CORRECTED)                       */}
        {/* ======================================================================= */}
        <div className="lg:hidden relative xl:pt-[64px] lg:pt-[56px] md:pt-[48px] sm:pt-[40px] pt-[32px] px-4 sm:px-6 md:px-12">
          {/* THE VERTICAL LINE */}
          <div 
            ref={lineRef}
            className="absolute sm:top-[55px] top-[50px] left-[23px] sm:left-[31px] md:left-[57px] w-[2px] bg-[var(--color)]"
            style={{ height: lineHeight > 0 ? `${lineHeight}px` : 'auto' }}
          ></div>

          {/* CARDS CONTAINER */}
          <div className="flex flex-col gap-y-12">
            {cards.map((c, i) => (
              <div key={i} className="relative">

                {/* The Dot: Positioned absolutely to sit on the line */}
                <span 
                  ref={i === 0 ? firstDotRef : i === cards.length - 1 ? lastDotRef : null}
                  className="absolute left-0 top-1 md:h-[20px] md:w-[20px] h-[16px] w-[16px] rounded-full bg-[var(--color)] z-10" 
                />

                {/* Card Content: Padded to the left to make space for the dot/line */}
                <div className="pl-10">
                  <h3 className="md:text-[24px] sm:text-[22px] text-[20px] font-semibold text-black">{c.title}</h3>
                  <p className="md:text-[18px] sm:text-[16px] text-[14px] md:mt-[8px] sm:mt-[6px] mt-[4px] font-medium text-[var(--hero-text)]">{c.subtitle}</p>
                  <p className="md:text-[14px] text-[12px] md:mt-[8px] sm:mt-[6px] mt-[4px] text-[var(--medium-text)] font-urbanist">{c.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Journey;