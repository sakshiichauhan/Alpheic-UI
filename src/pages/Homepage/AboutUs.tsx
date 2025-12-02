import { useEffect, useRef, useState } from "react";
import { useInView, animate } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

import clientsDelighted from "@/assets/AboutUs/ClientsDelighted.png";
import projectsDelivered from "@/assets/AboutUs/ProjectsDelivered.png";
import partnershipsForged from "@/assets/AboutUs/PartnershipsForged.png";
import resultsRetained from "@/assets/AboutUs/Resultsretained.png";
import successAchieved from "@/assets/AboutUs/SuccessAchieved.png";
import industryReach from "@/assets/AboutUs/IndustryReach.png";

import asset_1 from "@/assets/Homeicons/asset-1.png";
import asset_2 from "@/assets/Homeicons/asset-2.png";
import asset_3 from "@/assets/Homeicons/asset-3.png";
import asset_4 from "@/assets/Homeicons/asset-4.png";
import asset_5 from "@/assets/Homeicons/asset-5.png";

type Stat = {
  value: number;
  suffix?: string;
  title: string;
  caption: string;
  img: string;
};

const STATS: Stat[] = [
  { value: 200, suffix: "+", title: "Projects Delivered", caption: "Achieving exceptional results,exceeding client expectations.", img: projectsDelivered },
  { value: 100, suffix: "+", title: "Clients Delighted", caption: "Achieving exceptional results,exceeding client expectations.", img: clientsDelighted },
  { value: 11, suffix: "+", title: "Partnerships Forged", caption: "Achieving exceptional results,exceeding client expectations.", img: partnershipsForged },
  { value: 94, suffix: "%", title: "Results Retained", caption: "Achieving exceptional results,exceeding client expectations.", img: resultsRetained },
  { value: 98, suffix: "%", title: "Success Achieved", caption: "Achieving exceptional results,exceeding client expectations.", img: successAchieved },
  { value: 12, suffix: "+", title: "Industry Reach", caption: "Achieving exceptional results,exceeding client expectations.", img: industryReach },
];

function useCountUp(target: number, start: boolean, duration = 2) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!start) return;
    const controls = animate(0, target, {
      duration,
      ease: "easeOut",
      onUpdate: (latest) => setVal(Math.round(latest)),
    });
    return () => controls.stop();
  }, [start, target, duration]);
  return val;
}

function StatCard({ s }: { s: Stat }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.35, once: true });
  const n = useCountUp(s.value, inView);

  return (
    <div
      ref={ref}
      className="relative w-[485px] bg-[#FBFBFB] 2xl:p-[32px] xl:p-[28px] md:p-[24px] sm:p-[16px] p-[12px] 
  xl:max-h-[360px] lg:max-h-[280px] md:max-h-[240px] sm:max-h-[160px] max-h-[141px]
  xl:min-h-[360px] lg:min-h-[280px] md:min-h-[240px] sm:min-h-[160px] min-h-[141px] flex flex-col"
    >

      <img
        src={s.img}
        alt=""
        className="pointer-events-none absolute lg:-top-10 -top-6 md:left-8 left-6 2xl:h-[130px] xl:h-[112px] lg:h-[94px] md:h-[76px] sm:h-[58px] h-[62px] w-auto"
      />

      {/* spacer pushes content to the bottom within max-h */}
      <div className="flex-1" />

      {/* bottom content */}
      <div className="flex-col gap-[10px]">
        <div className="flex items-center gap-4">
          <span className="2xl:text-[64px] xl:text-[56px] lg:text-[48px] md:text-[40px] sm:text-[32px] text-[28px] italic font-semibold text-black">
            {n}{s.suffix ?? ""}
          </span>
          <div className="leading-tight text-[var(--sub-text)] font-semibold font-urbanist">
            <div className="2xl:text-[24px] xl:text-[22px] md:text-[20px] sm:text-[16px] text-[12px]">{s.title}</div>
          </div>
        </div>

        <p className=" whitespace-pre-line 2xl:text-[20px] xl:text-[18px] md:text-[16px] sm:text-[14px] text-[12px] text-[var(--medium-text)] font-urbanist">
          {s.caption}
        </p>
      </div>
    </div>

  );
}

export const AboutUs = () => {
  const avatars = [asset_1, asset_2, asset_3, asset_4, asset_5, asset_1];

  return (
    <section className="w-full py-[120px] flex flex-col gap-[54px] px-4 sm:px-6 md:px-12 lg:px-[80px] xl:px-[120px] 2xl:px-[200px]">
      {/* top rows */}
      <div className="flex w-full flex-col xl:gap-[84px] lg:gap-[64px] md:gap-[48px] gap-[32px] ">
        <div className="flex w-full flex-row justify-between gap-[32px]">
          {/* <div className="flex-row gap-[32px] hidden min-[1860px]:flex">
            <StatCard s={STATS[0]} />
            <StatCard s={STATS[1]} />
          </div> */}

          <div className="flex flex-col min-[1024px]:flex-row gap-[32px]">
            <div className="flex min-w-0 flex-1 basis-1/2 min-[1860px]:basis-auto min-[1860px]:w-full flex-col md:gap-[16px] gap-[12px]">
              <h3 className="2xl:text-[40px] xl:text-[36px] text-[32px] font-semibold text-black">About Us</h3>
              <div className="flex-col">
                <p className="2xl:text-[24px] xl:text-[22px] md:text-[20px] sm:text-[16px] text-[12px] leading-relaxed text-[var(--sub-text)] font-urbanist">
                  We’re Alpheric — a multidisciplinary innovation company that started with Cyber Security and evolved into a powerhouse of Technology, Design, Hosting, and Culture
                </p>
                <p className="2xl:text-[24px] xl:text-[22px] md:text-[20px] sm:text-[16px] text-[12px] leading-relaxed text-[var(--sub-text)] font-urbanist mt-2">
                  We blend logic, creativity, and purpose to build secure, scalable, and stunning digital ecosystems for tomorrow.
                </p>
              </div>
            </div>

            <div className="flex min-w-0 flex-1 basis-1/2 min-[1860px]:basis-auto min-[1860px]:w-full flex-col md:gap-[16px] gap-[12px]">
              <h4 className="2xl:text-[40px] xl:text-[36px] text-[32px] font-semibold text-black">Our idealist</h4>
              <div className="flex-col">
                <p className="2xl:text-[24px] xl:text-[22px] md:text-[20px] sm:text-[16px] text-[12px] leading-relaxed text-[var(--sub-text)] font-urbanist">
                  We believe great design isn’t just about how it looks — it’s about how it works and connects.
                </p>
                <p className="2xl:text-[24px] xl:text-[22px] md:text-[20px] sm:text-[16px] text-[12px] leading-relaxed text-[var(--sub-text)] font-urbanist mt-2">
                  That’s why we create solutions that unite security, intelligence, and experience, helping brands thrive in a digital-first world.
                </p>
              </div>
            </div>
          </div>

        </div>

        {/* <div className="flex-row gap-[32px] hidden min-[1860px]:flex">
          <StatCard s={STATS[2]} />
          <StatCard s={STATS[3]} />
          <StatCard s={STATS[4]} />
          <StatCard s={STATS[5]} />
        </div> */}

        <div className="flex-row xl:gap-[32px] gap-[16px] justify-between hidden min-[960px]:flex ">
          <StatCard s={STATS[0]} />
          <StatCard s={STATS[1]} />
          <StatCard s={STATS[2]} />
        </div>

        <div className="flex-row xl:gap-[32px] gap-[16px] justify-between hidden min-[960px]:flex ">
          <StatCard s={STATS[3]} />
          <StatCard s={STATS[4]} />
          <StatCard s={STATS[5]} />
        </div>




        <div className="flex-row gap-[16px] justify-around flex min-[960px]:hidden ">
          <StatCard s={STATS[0]} />
          <StatCard s={STATS[1]} />
        </div>

        <div className="flex-row gap-[16px] justify-around flex min-[960px]:hidden min-[1860px]:hidden">
          <StatCard s={STATS[2]} />
          <StatCard s={STATS[3]} />
        </div>

        <div className="flex-row gap-[16px] justify-around flex min-[960px]:hidden min-[1860px]:hidden">
          <StatCard s={STATS[4]} />
          <StatCard s={STATS[5]} />
        </div>


      </div>

      {/* bottom row → split 50/50 */}
      <div className="w-full flex 2xl:gap-[54px] xl:gap-[48px] md:gap-[40px] sm:gap-[38px] gap-[32px] min-[1340px]:flex-row flex-col">
        {/* left 50% */}
        <div className="w-full flex flex-col xl:gap-[24px] lg:gap-[20px] md:gap-[40px] sm:gap-[38px] gap-[32px] min-[1340px]:min-w-[430px]">
          <p className="2xl:text-[20px] xl:text-[18px] md:text-[16px] sm:text-[14px] text-[12px] text-[var(--sub-text)] font-urbanist">
            We believe great design is not just about how it looks — it’s about how it works. That’s why we take the
            time to understand your business, your goals, and your audience,
          </p>
          <button
            className="inline-flex w-fit items-center gap-2 border lg:px-[32px] md:px-[24px] px-[16px] py-[8px] 
            xl:text-[20px] md:text-[18px] sm:text-[16px] text-[14px] font-urbanist"
            style={{ borderColor: "#7CC8CC", color: "#0f172a" }}
          >
            About Us
            <ArrowUpRight className="lg:h-[40px] md:h-[32px] h-[20px] lg:w-[40px] md:w-[32px] w-[20px]" />
          </button>
        </div>

        {/* right 50% */}
        <div className="w-full bg-[#F7F7F7] xl:px-[32px] xl:py-[28px] lg:p-[24px] md:p-[20px] sm:p-[16px] p-[12px] min-[1340px]:min-w-[610px]">
          <div className="flex shrink-0 justify-between">
            <div className="flex items-center lg:gap-[16px] md:gap-[12px] gap-[8px]">
              <span className="2xl:text-[64px] xl:text-[56px] lg:text-[48px] md:text-[40px] sm:text-[32px] text-[28px] font-italic font-semibold text-black">20+</span>
              <div className="2xl:text-[24px] xl:text-[22px] md:text-[20px] sm:text-[16px] text-[12px] font-urbanist font-medium text-black min-[1340px]:w-[120px] min-[1860px]:w-full">Creative Mavericks</div>
            </div>
            <div className="flex -space-x-[16px]">
              {avatars.map((src, i) => (
                <img
                  key={i}
                  src={src}
                  alt={`avatar ${i + 1}`}
                  className="xl:h-[64px] lg:h-[48px] md:h-[40px] h-[32px]  xl:w-[64px] lg:w-[48px] md:w-[40px] w-[32px] rounded-full object-cover"
                  loading="lazy"
                />
              ))}
            </div>
          </div>

          <div>
            <p className="mt-1 2xl:text-[20px] xl:text-[18px] md:text-[16px] sm:text-[14px] text-[12px] text-[var(--sub-text)] font-urbanist">
              Achieving exceptional results, exceeding client expectations.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
