import React from "react";
import lightning from "@/assets/AboutUsPage/Lightning.png";


type Service = { title: string; desc: string; href?: string };

const services: Service[] = [
  { title: "We Review", desc: "Our strategists assess your brief." },
  { title: "We Respond", desc: "With clarifications and a proposal timeline." },
  { title: "We Propose", desc: "You receive a detailed proposal with scope, team, and price." },
  
];

const WhatHappen: React.FC<{ className?: string }> = ({ className = "" }) => {
  return (
    <section className={`w-full bg-[#FFFFFF] ${className}`} aria-labelledby="wwd-heading">
      <div className="px-4 sm:px-6 md:px-12 lg:px-[80px] xl:px-[120px] 2xl:px-[200px] 2xl:py-[84px] xl:py-[72px] lg:py-[60px] md:py-[52px] py-[40px]  flex flex-col 2xl:gap-[40px] gap-[20px]">
        <h2
          id="wwd-heading"
          className="text-center 2xl:text-[72px]  xl:text-[72px] text-[32px] text-[#000000] font-semibold"
        >
          What Happens After You Submit
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-around  bg-[#FBFBFB] ">
          {services.map((s, i) => (
            <a
              key={i}
              href={s.href ?? "#"}
              className="relative  2xl:p-[28px] p-4 2xl:gap-[30px]  gap-[2px] flex flex-col bg-[#FBFBFB] border border-[#E9EAEC]"
            >
              <div className="flex items-start justify-between">
                <img src={lightning} alt="Lightning" className="2xl:w-[72px] 2xl:h-[72px] w-[40px] h-[40px]" />

              </div>
              <div className="flex flex-col gap-[10px]">
                <h3 className="2xl:text-[32px] text-[16px] font-semibold text-black font-urbanist" >
                  {s.title}
                </h3>
                <p className="2xl:text-[24px] text-[12px]  text-[#000000] font-urbanist">{s.desc}</p>
              </div>
              
            </a>
          ))}
        </div>

     
      </div>
    </section>
  );
};

export default WhatHappen;
