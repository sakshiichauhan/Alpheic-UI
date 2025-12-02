import React from "react";
import NeerajDhiman from "@/assets/AboutUsPage/NeerajDhiman.png";
import DaljeetSingh from "@/assets/AboutUsPage/DaljeetSingh.png";
import QuoteIcon from "@/assets/AboutUsPage/QuoteIcon.png";

interface Founder {
  name: string;
  title: string;
  imageSrc: any;
  description: string;
  quote: string;
  quoteIcon: any;
}

const foundersData: Founder[] = [
  {
    name: "Neeraj Dhiman",
    title: "Founder & CEO",
    imageSrc: NeerajDhiman,
    description:
      "A cybersecurity specialist turned technology entrepreneur, Neeraj Dhiman envisioned Alpheric as a company that blends Security, Technology, and Design into one ecosystem.\nWith a background in digital systems and enterprise architecture, he leads Alpheric’s innovation, partnerships, and strategic growth across its ventures — from AI and education to sports and cloud infrastructure",
    quote:
      "From securing systems to designing experiences, we build what the future runs on.",
    quoteIcon: QuoteIcon,
  },
  {
    name: "Daljeet Singh",
    title: "Co-Founder & Director",
    imageSrc: DaljeetSingh,
    description:
      "An educator, mathematician, and product thinker, Daljeet Singh brings academic depth and design clarity to Alpheric's mission.\nHe leads the company's education, R&D, and experience strategy initiatives — ensuring every solution Alpheric builds is not just functional, but meaningful.",
    quote:
      "The most powerful technology is the one that makes learning and growth accessible to all.",
    quoteIcon: QuoteIcon,
  },
];

const FoundersSection: React.FC = () => {
  return (
    <div className="bg-white 2xl:py-[84px] xl:py-[72px] lg:py-[60px] md:py-[52px] py-[40px] px-4 sm:px-6 md:px-12 lg:px-[80px] xl:px-[120px] 2xl:px-[200px]">

      <h2 className="2xl:text-[72px] xl:text-[60px] lg:text-[48px] md:text-[40px] sm:text-[38px] text-[32px] text-black font-semibold text-center mb-[32px]">
        Our Founders
      </h2>

      {/* 
        NEW CHANGE:
        On lg and above → show cards in a row using the SAME mobile card layout.
      */}
      <div className="flex flex-col lg:flex-row lg:gap-[32px] gap-[24px]">

        {foundersData.map((founder, index) => (
          <div
            key={index}
            className="border-[3px] border-[var(--border-color)] md:pr-0 pr-[16px]  xl:py-[32px] lg:py-[24px] py-[16px]  xl:pl-[32px] lg:pl-[24px] pl-[16px] w-full lg:w-1/2"
          >
            {/* --- MOBILE DESIGN (ALWAYS USED) --- */}
            <div className="relative flex flex-col justify-between h-full">
              <div className="mb-[16px] lg:mb-[24px] xl:pr-[32px] lg:pr-[24px] md:pr-[16px] pr-[0px]">
              <div className="flex flex-row items-center gap-[24px]">
                <img
                  src={founder.imageSrc}
                  alt={founder.name}
                  className="xl:w-[160px] lg:w-[120px] md:w-[100px] w-[80px] xl:h-[160px] lg:h-[120px] md:h-[100px] h-[80px] object-cover shrink-0"
                />

                <div className="flex flex-col gap-[4px] w-full">
                  <h3 className="xl:text-[36px] lg:text-[32px] md:text-[28px] sm:text-[26px] text-[24px] text-black font-bold">
                    {founder.name}
                  </h3>

                  <div className="flex items-center gap-[8px] w-full">
                    <p className="xl:text-[24px] lg:text-[20px] md:text-[18px] sm:text-[16px] text-[12px] text-[var(--color)] font-urbanist font-medium whitespace-nowrap">
                      {founder.title}
                    </p>
                    <span className="h-[2px] bg-[var(--color)] flex-1 block" />
                  </div>
                </div>
              </div>

              <p className="mt-[16px] lg:mt-[24px] 2xl:text-[20px] xl:text-[18px] lg:text-[16px] md:text-[14px] sm:text-[12px] text-[12px] text-[var(--medium-text)] font-urbanist">
                {founder.description
                  .split("\n")
                  .map((line, lineIndex) => (
                    <React.Fragment key={lineIndex}>
                      {line}
                      {lineIndex <
                        founder.description.split("\n").length - 1 && <br />}
                    </React.Fragment>
                  ))}
              </p>
              </div>

              <div className="mt-auto ml-auto bg-[var(--color)] text-white md:py-[5px] py-[4px] md:px-[16px] px-[12px] flex items-center justify-end gap-3 w-fit self-end">
                <img
                  src={founder.quoteIcon}
                  alt="Quote Icon"
                  className="w-auto object-contain xl:h-[24px] lg:h-[20px] md:h-[18px] h-[16px]"
                />
                <span className="font-medium 2xl:text-[20px] xl:text-[18px] lg:text-[16px] md:text-[14px] sm:text-[12px] text-[12px] text-white">
                  {founder.quote}
                </span>
              </div>
            </div>
          </div>
        ))}

      </div>
    </div>
  );
};

export default FoundersSection;
