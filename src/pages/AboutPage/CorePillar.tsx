import React from "react";
import Lightning from "@/assets/AboutUsPage/Lightning.png";

type Pillar = {
  title: string;
  subtitle: string;
};

type Props = {
  items?: Pillar[];
  className?: string;
};

const CorePillars: React.FC<Props> = ({
  className = "",
  items = [
    { title: "Cyber Security", subtitle: "Protect what you build." },
    { title: "Technology", subtitle: "Engineer what you imagine." },
    { title: "Design & Branding", subtitle: "Express what you stand for." },
    { title: "Hosting & Infrastructure", subtitle: "Power what you deliver." },
  ],
}) => {
  return (
    <section className={`w-full bg-white ${className}`} aria-labelledby="pillars">
      <div className="px-4 sm:px-6 md:px-12 lg:px-[80px] xl:px-[120px] 2xl:px-[200px] 2xl:py-[120px] xl:py-[100px] lg:py-[80px] md:py-[60px] sm:py-[52px] py-[40px] flex flex-col xl:gap-[48px] lg:gap-[32px] md:gap-[28px]  gap-[24px]">
        <h2
          id="pillars"
          className="text-center 2xl:text-[72px] xl:text-[60px] lg:text-[48px] md:text-[40px] sm:text-[38px] text-[32px] lg:font-normal font-medium text-black"
        >
          Our <span className=" lg:font-bold font-medium">Core Pillars</span>
        </h2>

        {/* Card grid */}
        <div className="overflow-hidden border border-[#E9EAEC] bg-white">
          <div className="grid divide-y divide-[#E9EAEC] grid-cols-2 lg:grid-cols-4 lg:divide-y-0 divide-x">
            {items.map((p, i) => (
              <div key={i} className="2xl:p-[32px] xl:p-[28px] lg:p-[24px] md:p-[20px] sm:p-[18px] p-[16px]">
                <img src={Lightning} alt="Lightning" className="2xl:w-[72px] xl:w-[60px] lg:w-[52px] md:w-[48px] w-[40px] 2xl:h-[72px] xl:h-[60px] lg:h-[52px] md:h-[48px] h-[40px]" />
                <h3 className="xl:mt-[30px] lg:mt-[24px] md:mt-[20px] sm:mt-[16px] mt-[12px] xl:text-[24px] lg:text-[20px] md:text-[18px] sm:text-[16px] text-[14px] font-semibold text-[var(--hero-text)]">
                  {p.title}
                </h3>
                <p className="xl:text-[24px] lg:text-[20px] md:text-[18px] sm:text-[16px] text-[14px]  text-[var(--hero-text)] font-urbanist">
                  {p.subtitle}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Footer line */}
        <p className="mx-auto text-center 2xl:text-[28px] xl:text-[24px] lg:text-[20px] md:text-[14px] text-[12px] text-[var(--medium-text)] font-urbanist">
          These four pillars define how Alpheric{" "}
          helps businesses evolve from <span className="font-semibold">concept to continuity</span>.
        </p>
      </div>
    </section>
  );
};

export default CorePillars;
