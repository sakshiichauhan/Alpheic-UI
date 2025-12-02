import React from "react";
import lightning from "@/assets/AboutUsPage/Lightning.png";
import {ArrowUpRight} from "lucide-react"
import { DefaultButton } from "@/Components/Button";

type Service = { title: string; desc: string; href?: string };

const services: Service[] = [
    { 
      title: "AI Agents & Automation Systems", 
      desc: "Creating seamless digital journeys that connect user needs with business goals." 
    },
    { 
      title: "UX/UI & Product Experience Design", 
      desc: "Creating seamless digital journeys that connect user needs with business goals." 
    },
    { 
      title: "Brand Strategy & Digital Communication", 
      desc: "Creating seamless digital journeys that connect user needs with business goals." 
    },
    { 
      title: "Cloud & Hosting Infrastructure", 
      desc: "Creating seamless digital journeys that connect user needs with business goals." 
    },
    { 
      title: "Enterprise Platforms & SaaS Development", 
      desc: "Creating seamless digital journeys that connect user needs with business goals." 
    },
    { 
      title: "CSR, Education & Sports-Tech Ecosystems", 
      desc: "Creating seamless digital journeys that connect user needs with business goals." 
    },
  ];

const HireAlpheric: React.FC<{ className?: string }> = ({ className = "" }) => {
  return (
    <section className={`w-full ${className}`} aria-labelledby="wwd-heading">
      <div className="px-4 sm:px-6 md:px-12 lg:px-[80px] xl:px-[120px] 2xl:px-[200px] 2xl:py-[84px] xl:py-[72px] lg:py-[60px] md:py-[52px] py-[40px]  flex flex-col xl:gap-[32px] md:gap-[24px] gap-[16px]">
        <div className="text-center space-y-4">
        <h2
          id="wwd-heading"
          className="text-center 2xl:text-[72px]  xl:text-[72px] text-[32px] text-[#000000]"
        >
          What <span className="font-semibold">Hire with Alpheric</span>
        </h2>
        <p className="text-[16px] sm:text-[18px] md:text-[20x] lg:text-[24px] xl:text-[28px] 2xl:text-[32px] font-semibold text-[var(--medium-text)] font-urbanist ">
        Talent That Builds Tomorrow.
          </p>
          <p className="text-[14px] sm:text-[16px] md:text-[18px] lg:text-[20px] xl:text-[24px] text-[var(--medium-text)] font-urbanist ">
          Scale faster with professionals who think beyond code - experts who <br className="hidden md:block" /> design, develop, and secure innovation.
          </p>
        </div>

        <p className="text-[16px] text-center sm:text-[18px] md:text-[20x] lg:text-[24px] xl:text-[28px] 2xl:text-[32px] font-semibold text-[var(--medium-text)] font-urbanist ">
        Roles You Can Hire
          </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 justify-around gap-[32px] bg-[#FBFBFB] ">
          {services.map((s, i) => (
            <a
              key={i}
              href={s.href ?? "#"}
              className="relative  xl:p-[32px] lg:p-[24px] md:p-[20px] sm:p-[16px] p-[12px] lg:gap-[30px] md:gap-[24px] gap-[16px] flex flex-col bg-[#FBFBFB]"
            >
              <div className="flex items-start justify-between">
                <img src={lightning} alt="Lightning" className=" lg:w-[40px] lg:h-[40px] w-[32px] h-[32px]" />
                  <div className="border-2 border-[var(--color)] p-[8px]"><ArrowUpRight strokeWidth={1.5} className="lg:w-[30px] lg:h-[30px] w-[24px] h-[24px]" /></div>
              </div>
              <div className="flex flex-col gap-[16px]">
                <h3 className="xl:text-[24px] md:text-[20px] text-[16px] font-semibold text-black">
                  {s.title}
                </h3>
                <p className="xl:text-[20px] md:text-[18px] text-[14px]  text-[var(--medium-text)] font-urbanist">{s.desc}</p>
              </div>
              
            </a>
          ))}
        </div>

        <p className="text-[16px] text-center sm:text-[18px] md:text-[20px] lg:text-[24px] xl:text-[28px] text-[var(--medium-text)] font-urbanist ">
        Hire hourly or per project - your goals, our expertise.
          </p>

        <div className="flex justify-center">
          <DefaultButton
            onClick={() => {}}
            href="#"
          >
            Hire a Specialist
          </DefaultButton>
        </div>
      </div>
    </section>
  );
};

export default HireAlpheric;
