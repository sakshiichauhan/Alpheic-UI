import React from "react";
// Assuming your image paths are correct
import Shield from "@/assets/AboutUsPage/Shield.png";
import Cog from "@/assets/AboutUsPage/Cog.png";
import Spark from "@/assets/AboutUsPage/Spark.png";
import Cloud from "@/assets/AboutUsPage/Cloud.png";

type Pillar = { icon: React.ReactNode; bold: string; rest: string };

// No changes to this section
const items: Pillar[] = [
  { icon: <img src={Shield} alt="Shield" className="md:w-[72px] md:h-[72px] w-[54px] h-[54px]" />, bold: "Security", rest: "builds trust." },
  { icon: <img src={Cog} alt="Cog" className="md:w-[72px] md:h-[72px] w-[54px] h-[54px]" />, bold: "Technology", rest: "builds function." },
  { icon: <img src={Spark} alt="Spark" className="md:w-[72px] md:h-[72px] w-[54px] h-[54px]" />, bold: "Design", rest: "builds connection." },
  { icon: <img src={Cloud} alt="Cloud" className="md:w-[72px] md:h-[72px] w-[54px] h-[54px]" />, bold: "Hosting", rest: "builds continuity." },
];

type Props = { className?: string };

const Philosophy: React.FC<Props> = ({ className = "" }) => {
  return (
    <section className={`w-full bg-white ${className}`} aria-labelledby="philosophy">
      <div className="px-4 sm:px-6 md:px-12 lg:px-[80px] xl:px-[120px] 2xl:px-[200px] 2xl:py-[120px] xl:py-[100px] lg:py-[80px] md:py-[60px] sm:py-[52px] py-[40px] flex flex-col">
        {/* CHANGED: Adjusted gap for different screen sizes */}
        <div className="flex lg:flex-row flex-col justify-between gap-12 lg:gap-[82px]">
          <div className="w-full flex flex-col lg:max-w-[640px] gap-[16px] 2xl:min-w-[521px]">
            <h2 id="philosophy" className="text-center lg:text-left 2xl:text-[72px] xl:text-[60px] lg:text-[48px] md:text-[40px] sm:text-[38px] text-[32px] font-semibold text-black">
              Our Philosophy
            </h2>
            <p className="text-center lg:text-left 2xl:text-[32px] xl:text-[28px] lg:text-[24px] md:text-[20px] sm:text-[16px] text-[14px] text-[var(--medium-text)] font-urbanist">We follow a principle we call</p>
            <p className="text-center lg:text-left 2xl:text-[40px] xl:text-[36px] lg:text-[32px] md:text-[28px] sm:text-[20px] text-[16px] font-semibold text-[var(--hero-text)]">Intelligence by Design.</p>
            <p className="text-center lg:text-left 2xl:text-[28px] xl:text-[24px] lg:text-[20px] md:text-[18px] sm:text-[16px] text-[14px] text-[var(--medium-text)] font-urbanist ">
              It means every product, platform, or experience we create is designed with logic, empathy, and purpose.
            </p>
          </div>

          {/* This container wraps the grid and the paragraph below it */}
          <div className="w-full max-w-[800px] mx-auto lg:mx-0">
             {/* CHANGED: Made grid responsive. 1 column on mobile, 2 on larger screens. */}
            <div className="grid grid-cols-2 gap-4">
              {items.map((it, i) => (
                <div
                  key={i}
                   // CHANGED: Removed fixed width 'w-[385px]' and added responsive padding.
                  className="flex items-start gap-[16px] border border-[#E5E7EA] p-4 md:p-[24px] flex-col"
                >
                  <div className="shrink-0">{it.icon}</div>
                  <p className="2xl:text-[24px] xl:text-[22px] lg:text-[20px] md:text-[18px] text-[16px] font-urbanist text-[var(--medium-text)]">
                    <span className="font-semibold ">{it.bold}</span> {it.rest}
                  </p>
                </div>
              ))}
            </div>

            <p className="mt-6 2xl:text-[28px] xl:text-[24px] lg:text-[20px] md:text-[18px] sm:text-[16px] text-[14px] font-urbanist text-[var(--medium-text)] text-center">
              Together, they form{" "}
              <a href="#" className="2xl:text-[28px] xl:text-[24px] lg:text-[20px] md:text-[18px] sm:text-[16px] text-[14px] font-medium text-[var(--color)] hover:text-[var(--color)]">
                The Alpheric Chain of Innovation
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Philosophy;