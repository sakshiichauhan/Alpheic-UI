import React, { useId, useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";

type FaqItem = { q: string; a: string };

const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null); // all closed

  // Dummy data
  const faqs: FaqItem[] = [
    { q: "What does Alpheric do?", a: "Alpheric is a multidisciplinary innovation company offering technology, design, hosting, security, and marketing solutions. We help brands build secure, scalable, and intelligent digital ecosystems that deliver real business impact." },
    { q: "What industries does Alpheric work with?", a: "We work across diverse industries including technology, education, finance, healthcare, retail, real estate, and startups — tailoring every solution to the client’s specific goals and growth stage." },
    { q: "How does the Alpheric process work?", a: "Our process begins with a discovery brief to understand your goals, followed by a detailed proposal, timeline, and budget. Once approved, we kick off the project with transparent communication and measurable milestones." },
    { q: "Can I start with a pilot project before a full engagement?", a: "Yes. You can start with a pilot — a short, focused engagement designed to validate ideas, test performance, and align strategy before scaling the project further." },
    { q: "Does Alpheric offer hourly or project-based hiring?", a: "Yes. You can hire Alpheric experts — from designers and developers to cloud and security specialists — either hourly or on a project basis, depending on your business needs." },
    { q: "What makes Alpheric different from other agencies?", a: "Alpheric combines creativity, logic, and technology under one roof. We started with cybersecurity and evolved into a full-spectrum innovation company, ensuring every design, product, or platform is secure, intelligent, and future-ready." },
    { q: "Where is Alpheric based?", a: "Alpheric operates from India and collaborates with clients worldwide through digital communication, ensuring seamless project delivery across time zones." },
    { q: "How do I get started with Alpheric?", a: "Simply reach out at hello@alpheric.com or click Let’s Talk on our website. Share your project idea or challenge, and our team will guide you through the next steps." },
  ];

  return (
    <section className="mx-auto px-4 sm:px-6 md:px-12 lg:px-[80px] xl:px-[120px] 2xl:px-[200px]
     py-10 md:py-[60px] lg:py-[120px]">
      <div className="grid md:gap-12 sm:gap-[32px] gap-[24px] lg:grid-cols-10 lg:gap-16">
        {/* Left — 40%, centered */}
        <div className="lg:col-span-4 flex flex-col lg:items-start items-center justify-center text-left 2xl:min-w-[480px]">
          <h2 className="2xl:text-[96px] xl:text-[82px] md:text-[68px] sm:text-[48px] text-[32px] text-left lg:block hidden">
          Got <br />
            <span className=" lg:font-bold">Questions?</span>
          </h2>
          <h2 className="2xl:text-[96px] xl:text-[82px] md:text-[68px] sm:text-[48px] text-[32px] text-center lg:hidden block">
          Got Questions ?
          </h2>
          <p className="text-[var(--medium-text)] lg:text-left text-center 2xl:text-[24px] xl:text-[22px] md:text-[18px] sm:text-[16px] text-[14px] font-urbanist">
          We’ve gathered the most common ones here
          simple, straightforward, and made to help you understand how Alpheric makes ideas happen.
          </p>
        </div>

        {/* Right — 60% */}
        <div className="lg:col-span-6 lg:pl-[50px]">
          {/* No outer border; only thin dividers. Remove the class below to drop the lines too. */}
          <div className="divide-y divide-neutral-200">
            {faqs.map((item, idx) => (
              <AccordionItem
                key={idx}
                q={item.q}
                a={item.a}
                isOpen={openIndex === idx}
                onToggle={() => setOpenIndex(openIndex === idx ? null : idx)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

type AccordionItemProps = {
  q: string;
  a: string;
  isOpen: boolean;
  onToggle: () => void;
};

const AccordionItem: React.FC<AccordionItemProps> = ({ q, a, isOpen, onToggle }) => {
  const uid = useId();
  const contentRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState<number>(0);

  useEffect(() => {
    if (contentRef.current) {
      if (isOpen) {
        // Opening: set height to scrollHeight
        setHeight(contentRef.current.scrollHeight);
      } else {
        // Closing: set height to 0
        setHeight(0);
      }
    }
  }, [isOpen]);

  return (
    <div className={`transition-all duration-300 ease-in-out ${isOpen ? "border border-[#E5E7EA]/50 p-[12px] sm:p-[16px] md:p-[20px] lg:p-[24px]" : "border-none px-[12px] py-[8px] sm:px-[16px] sm:py-[10px] md:px-[20px] md:py-[12px] lg:px-[24px] lg:py-[16px]"}`}>
      <button
        id={`faq-btn-${uid}`}
        className="flex w-full items-center justify-between gap-6 py-5 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-800 transition-colors duration-200 hover:bg-gray-50/50 rounded-lg"
        aria-expanded={isOpen}
        aria-controls={`faq-panel-${uid}`}
        onClick={onToggle}
      >
        <span className="2xl:text-[24px] xl:text-[22px] md:text-[18px] sm:text-[16px] text-[14px] font-medium transition-colors duration-200">{q}</span>
        <ChevronDown
          aria-hidden="true"
          className={`h-5 w-5 shrink-0 transition-transform duration-300 ease-in-out ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {/* Answer — animated height */}
      <div
        id={`faq-panel-${uid}`}
        role="region"
        aria-labelledby={`faq-btn-${uid}`}
        aria-hidden={!isOpen}
        className="overflow-hidden transition-all duration-300 ease-in-out"
        style={{ height: `${height}px` }}
      >
        <div ref={contentRef} className="pb-5 pr-4 text-[var(--medium-text)]">
          <p className="leading-relaxed 2xl:text-[20px] xl:text-[18px] md:text-[16px] sm:text-[14px] text-[12px] font-urbanist">{a}</p>
        </div>
      </div>
    </div>
  );
};

export default FAQSection;
