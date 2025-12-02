import React from "react";
import aimshala from "@/assets/AboutUsPage/aimshala.png";
import hswf from "@/assets/AboutUsPage/Hswf.png";
import bos from "@/assets/AboutUsPage/BondOver.png";
import hostripples from "@/assets/AboutUsPage/Hostripples.png";
import theinterior from "@/assets/AboutUsPage/InteriorDesign.png";
import booktick from "@/assets/AboutUsPage/Booktick.png";
import ekrocx from "@/assets/AboutUsPage/Ekrocx.png";
import { DefaultButton } from "@/Components/Button";

type Venture = {
  logo: string;    // path/URL to logo image
  name: string;
  blurb: string;
  href?: string;
};

const ventures: Venture[] = [
  { logo: aimshala, name: "Aimshala", blurb: "AI-powered Career Guidance Ecosystem", href: "#" },
  { logo: hswf, name: "HSWF Network", blurb: "Sports-Tech and Grassroots Sports Development", href: "#" },
  { logo: bos, name: "Bond Over Sports (BOS)", blurb: "Heritage Sports & Community Engagement Platform", href: "#" },
  { logo: hostripples, name: "Hostripples", blurb: "Cloud Hosting and Infrastructure Solutions", href: "#" },
  { logo: theinterior, name: "TheInterior.Design", blurb: "Retail & Commercial Design Consultancy", href: "#" },
  { logo: booktick, name: "BookTick", blurb: "Smart Travel, Forex, and Booking Solutions", href: "#" },
  { logo: ekrocx, name: "Ekrocx", blurb: "Enterprise Technology & Automation Consulting", href: "#" },
];

const Ecosystem: React.FC<{ className?: string }> = ({ className = "" }) => {
  return (
    <section className={`w-full bg-white ${className}`} aria-labelledby="eco-heading">
      <div className="px-4 sm:px-6 md:px-12 lg:px-[80px] xl:px-[120px] 2xl:px-[200px] 2xl:py-[84px] xl:py-[72px] lg:py-[60px] md:py-[52px] py-[40px] gap-[32px]">
        <div className="flex flex-col gap-[16px]">
           <h2
             id="eco-heading"
             className="text-center 2xl:text-[72px] xl:text-[60px] lg:text-[48px] md:text-[40px] sm:text-[38px] text-[32px] font-normal text-black "
           >
             Our <span className="font-semibold">Ecosystem</span>
           </h2>
           <p className="mx-auto text-center 2xl:text-[24px] xl:text-[22px] lg:text-[20px] md:text-[18px] sm:text-[16px] text-[14px] text-[var(--hero-text)] font-urbanist">
             Alpheric leads and powers multiple ventures, each focused on solving real-world problems with innovation.
           </p>
        </div>
       
        {/* Grid */}
        <div className="xl:mt-[40px] lg:mt-[32px] md:mt-[28px] mt-[24px] ">
          <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-y divide-[var(--border-color)]">
            {/* First 7 venture cells */}
            {ventures.map((v, i) => (
              <a
                key={i}
                href={v.href ?? "#"}
                className="flex flex-col xl:gap-[30px] lg:gap-[24px] md:gap-[20px] sm:gap-[18px] gap-[16px] bg-white 2xl:px-[32px] xl:px-[28px] lg:px-[24px] md:px-[20px] sm:px-[18px] px-[12px] 2xl:py-[40px] xl:py-[32px] lg:py-[28px] md:py-[24px] sm:py-[18px] py-[12px]"
              >
                <div className="flex 2xl:max-h-[70px] xl:max-h-[60px] lg:max-h-[52px] md:max-h-[36px] sm:max-h-[32px] max-h-[24px] max-w-[207px] justify-start items-start lg:min-h-[70px]">
                  <img
                    src={v.logo}
                    alt={`${v.name} logo`}
                    className="object-contain w-auto h-auto 2xl:max-h-[70px] xl:max-h-[60px] lg:max-h-[52px] md:max-h-[36px] sm:max-h-[32px] max-h-[24px] 2xl:max-w-[207px] xl:max-w-[180px] lg:max-w-[163px] max-w-full"
                  />
                </div>
                <div className="">
                  <h3 className="2xl:text-[24px] xl:text-[22px] lg:text-[20px] md:text-[18px] sm:text-[16px] text-[14px] font-semibold text-[var(--hero-text)] font-urbanist">{v.name}</h3>
                  <p className="2xl:text-[20px] xl:text-[18px] lg:text-[16px] md:text-[14px]  text-[12px] text-[var(--medium-text)] font-urbanist">{v.blurb}</p>
                </div>
              </a>
            ))}

            {/* CTA cell (bottom-right) */}
            <div className="flex items-center justify-center bg-white px-[32px] py-[40px] shrink-0">
              <DefaultButton 
                href="#"
                  onClick={() => {}}
                  className="text-center"
                  >Discover Our Ventures</DefaultButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Ecosystem;
