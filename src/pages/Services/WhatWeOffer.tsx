import React from "react";
import lightning from "@/assets/AboutUsPage/Lightning.png";
import {ArrowUpRight} from "lucide-react"
import { DefaultButton } from "@/Components/Button";

type Service = { title: string; desc: string; href?: string };

const services: Service[] = [
  { title: "UX Research & User Testing", desc: "Creating seamless digital journeys that connect user needs with business goals." },
  { title: "UX Research & User Testing", desc: "Creating seamless digital journeys that connect user needs with business goals." },
  { title: "UI Design System", desc: "Creating seamless digital journeys that connect user needs with business goals." },
  { title: "Prototyping & Interaction Design", desc: "Creating seamless digital journeys that connect user needs with business goals." },
  { title: "UX Audits & Usability Optimization", desc: "Creating seamless digital journeys that connect user needs with business goals." },
  { title: "App & Web Design Integration", desc: "Creating seamless digital journeys that connect user needs with business goals." },
];

const WhatWeOffer: React.FC<{ className?: string }> = ({ className = "" }) => {
  return (
    <section className={`w-full bg-[#FFFFFF] ${className}`} aria-labelledby="wwd-heading">
      <div className="px-4 sm:px-6 md:px-12 lg:px-[80px] xl:px-[120px] 2xl:px-[200px] 2xl:py-[84px] xl:py-[72px] lg:py-[60px] md:py-[52px] py-[40px]  flex flex-col 2xl:gap-[40px] gap-[20px]">
        <h2
          id="wwd-heading"
          className="text-center 2xl:text-[72px]  xl:text-[72px] text-[32px] text-[#000000]"
        >
          What <span className="font-semibold">Hire with Alpheric</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-around gap-[32px] bg-[#FBFBFB] ">
          {services.map((s, i) => (
            <a
              key={i}
              href={s.href ?? "#"}
              className="relative  2xl:p-[32px] p-4 2xl:gap-[30px]  gap-[2px] flex flex-col bg-[#FBFBFB] shadow-2xs"
            >
              <div className="flex items-start justify-between">
                <img src={lightning} alt="Lightning" className="2xl:w-[72px] 2xl:h-[72px] w-[40px] h-[40px]" />
                  <ArrowUpRight className="2xl:w-[54px] 2xl:h-[54px] w-[40px] h-[40px]" />
              </div>
              <div className="flex flex-col gap-[16px]">
                <h3 className="2xl:text-[24px] text-[16px] font-semibold text-black">
                  {s.title}
                </h3>
                <p className="2xl:text-[20px] text-[12px]  text-[var(--medium-text)] font-urbanist">{s.desc}</p>
              </div>
              
            </a>
          ))}
        </div>

        <div className="flex justify-center">
          <DefaultButton
            onClick={() => {}}
            href="/Services"
          >
            Explore Our Services
          </DefaultButton>
        </div>
      </div>
    </section>
  );
};

export default WhatWeOffer;
