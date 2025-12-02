import React from "react";
import lightning from "@/assets/AboutUsPage/Lightning.png";
import {ArrowUpRight} from "lucide-react"
import { DefaultButton } from "@/Components/Button";

type Service = { title: string; desc: string; href?: string };

const services: Service[] = [
  { title: "AI Agents & Automation Systems", desc: "Creating seamless digital journeys that connect user needs with business goals." },
  { title: "UX/UI & Product Experience Design", desc: "Creating seamless digital journeys that connect user needs with business goals." },
  { title: "Brand Strategy & Digital Communication", desc: "Creating seamless digital journeys that connect user needs with business goals." },
  { title: "Cloud & Hosting Infrastructure", desc: "Creating seamless digital journeys that connect user needs with business goals." },
  { title: "Enterprise Platforms & SaaS Development", desc: "Creating seamless digital journeys that connect user needs with business goals." },
  { title: "CSR, Education & Sports-Tech Ecosystems", desc: "Creating seamless digital journeys that connect user needs with business goals." },
];

const WhatWeDo: React.FC<{ className?: string }> = ({ className = "" }) => {
  return (
    <section className={`w-full bg-white ${className}`} aria-labelledby="wwd-heading">
      <div className="px-4 sm:px-6 md:px-12 lg:px-[80px] xl:px-[120px] 2xl:px-[200px] 2xl:py-[84px] xl:py-[72px] lg:py-[60px] md:py-[52px] py-[40px] flex flex-col xl:gap-[40px] lg:gap-[32px] md:gap-[28px] gap-[24px]">
        <h2
          id="wwd-heading"
          className="text-center 2xl:text-[72px] xl:text-[60px] lg:text-[48px] md:text-[40px] sm:text-[38px] text-[32px] font-normal text-black"
        >
          What <span className="font-semibold">We Do</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-around 2xl:gap-[32px] xl:gap-[28px] lg:gap-[24px] md:gap-[20px] sm:gap-[18px] gap-[16px]">
          {services.map((s, i) => (
            <a
              key={i}
              href={s.href ?? "#"}
              className="relative 2xl:p-[32px] xl:p-[28px] lg:p-[24px] md:p-[20px] sm:p-[18px] p-[16px] 2xl:gap-[30px] xl:gap-[24px] lg:gap-[20px] md:gap-[16px] sm:gap-[14px] gap-[12px] flex flex-col"
            >
              <div className="flex items-start justify-between">
                <img src={lightning} alt="Lightning" className="2xl:w-[72px] xl:w-[60px] lg:w-[52px] md:w-[48px] w-[40px] 2xl:h-[72px] xl:h-[60px] lg:h-[52px] md:h-[48px] h-[40px]" />
                  <ArrowUpRight className="2xl:w-[54px] xl:w-[48px] lg:w-[42px] md:w-[36px] w-[30px] 2xl:h-[54px] xl:h-[48px] lg:h-[42px] md:h-[36px] h-[30px]" />
              </div>
              <div className="flex flex-col gap-[16px]">
                <h3 className="2xl:text-[24px] xl:text-[22px] lg:text-[20px] md:text-[18px]  text-[16px] font-semibold text-black">
                  {s.title}
                </h3>
                <p className="2xl:text-[20px] xl:text-[18px] lg:text-[16px] md:text-[14px] text-[12px] text-[var(--medium-text)] font-urbanist">{s.desc}</p>
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

export default WhatWeDo;
