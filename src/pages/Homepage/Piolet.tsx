import { motion, useScroll, useTransform, } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";

import photo1 from "@/assets/Pilot_assets/one.png";
import photo2 from "@/assets/Pilot_assets/two.png";
import photo3 from "@/assets/Pilot_assets/three.png";
import photo4 from "@/assets/Pilot_assets/four.png";
import baground1 from "@/assets/Pilot_assets/bg.png";
import { ArrowUpRight } from "lucide-react";


/* ==================== Data ==================== */
type PilotCard = {
  id: string;
  title: string;
  subtitle: string;
  gradient: string;
  bigImg?: string;
  tags: string[];
  duration: string;
};

const CARDS: PilotCard[] = [
  {
    id: "you",
    title: "Pilot for You",
    subtitle:
      "For individuals or creators exploring ideas.",
    gradient: "bg-gradient-to-b from-[#62D5E8] to-[#678DFE]",
    bigImg: photo1,
    duration: "4 weeks",
    tags: ["Strategy" , "Branding" , "Design" , "Website" , "Growth"],
  },
  {
    id: "startups",
    title: "Pilot for Startups",
    subtitle: "For emerging founders building their first big leap.",
    gradient: "bg-gradient-to-b from-[#B772FA] to-[#5C87FF]",
    bigImg: photo2,
    duration: "6 weeks",
    tags: ["MVP" , "Product" , "Launch" , "Marketing" , "Automation" ],
  },
  {
    id: "smb",
    title: "Pilot For SMBs",
    subtitle: "For growing businesses ready to scale with clarity.",
    gradient: "bg-gradient-to-b from-[#F1B6FF] to-[#B772FA]",
    bigImg: photo3,
    duration: "6 weeks",
    tags: ["Digital" , "Cloud" , "Design" , "Market" , "Optimize"],
  },
  {
    id: "enterprise",
    title: "Pilot for Enterprises",
    subtitle: "For established organizations seeking transformation and innovation.",
    gradient: "bg-gradient-to-b from-[#01C9DF] to-[#678DFE]",
    bigImg: photo4,
    duration: "8 weeks",
    tags: ["Consulting" , "Infrastructure" , "Security" , "AI" , "Integration"],
  },
];

/* ==================== UI Bits ==================== */
const  TagChip = ({ label }: { label: string }) => (
  <span className="inline-flex items-center gap-[4px] border 2xl:text-[20px] xl:text-[18px] lg:text-[16px] md:text-[14px] text-[12px] font-urbanist xl:px-[24px] lg:px-[20px] md:px-[16px] sm:px-[14px] px-[12px] xl:py-[12px] lg:py-[10px] md:py-[8px] py-[6px] border-[#ECF1FC33] sm:border-white/10 text-white ">
    {label} <ArrowUpRight className="w-5 h-5" />
  </span>
);

function PilotCardView({ card }: { card: PilotCard }) {
  return (
    <div className="relative w-full h-fit overflow-hidden  box-border">
      {/* Gradient border wrapper */}
      <div className="relative h-full p-[3px] bg-gradient-to-br from-white/50 via-gray-400/50 to-gray-400/50">
        <div className={`relative h-full  overflow-hidden ${card.gradient} text-white shadow-[0_8px_30px_rgba(0,0,0,0.2)]`}>
          
          {/* background image: cover the whole card */}
          <img
            src={baground1}
            alt="bg"
            className="absolute inset-0 z-0"
          />

          <div className="absolute inset-0 z-[1] bg-black/20" />
          
          <div className="relative z-10">
          <div className="flex h-full flex-row justify-between  min-[1700px]:pl-[84px] min-[1400px]:pl-[64px] min-[1024px]:pl-[40px] pl-[20px]">
            <div className="2xl:min-w-[630px] xl:min-w-[566px] lg:min-w-[495px] flex flex-col xl:gap-[18px] gap-[14px] min-[1700px]:pt-[84px] min-[1400px]:pt-[64px] min-[1250px]:pt-[40px] pt-[20px]">
               <h3 className="2xl:text-[64px] xl:text-[52px] lg:text-[40px] text-[32px]">
                 {card.title.includes("You") ? (
                   <>
                     {card.title.split("You")[0]}
                     <span className="font-bold">{" You"}</span>
                   </>
                 ) : (
                   card.title
                 )}
               </h3>
              <p className=" 2xl:text-[20px] xl:text-[18px] lg:text-[16px] text-[14px] text-white/90 leading-relaxed">
                {card.subtitle}
              </p>

              <div className="flex items-center gap-6 p-2 bg-white/10 w-fit">
      <div className="flex items-center text-white xl:px-[24px] px-[20px] py-[12px] xl:py-[14px] gap-1">
        <span className="2xl:text-[24px] xl:text-[20px] lg:text-[18px] text-[16px] font-medium tracking-tight">
          {card.duration}
        </span>
        <span className="2xl:text-[22px] xl:text-[20px] lg:text-[18px] text-[16px] leading-none">🗓️</span>
      </div>

      {/* White button */}
      <button
        type="button"
        className="inline-flex items-center justify-center border border-black/10 bg-white xl:px-[34px] px-[30px] xl:py-[16px] py-[12px] 2xl:text-[20px] xl:text-[18px] lg:text-[16px] text-[14px] font-semibold text-black shadow-[0_1px_0_rgba(0,0,0,0.08)]
                   hover:shadow-[0_2px_0_rgba(0,0,0,0.12)] focus:outline-none focus-visible:ring-2 focus-visible:ring-black/20"
      >
        Book a pilot
      </button>
    </div>
            </div>
            <div>
            {card.bigImg && (
            <img
              src={card.bigImg}
              alt=""
              className="pointer-events-none  z-[2] 2xl:max-w-[521px] 2xl:max-h-[417px] xl:max-w-[421px] xl:max-h-[317px] lg:max-w-[351px] lg:max-h-[247px] md:max-w-[221px] md:max-h-[117px] max-w-[100px] max-h-[80px] shrink-0  object-cover object-bottom"
            />
          )}
            </div>
            
          </div>

            <div className="flex items-end justify-between gap-[10px] pt-0 min-[1700px]:px-[84px] min-[1400px]:px-[64px] min-[1024px]:px-[40px] px-[20px]  min-[1700px]:pb-[84px] min-[1400px]:pb-[64px] min-[1024px]:pb-[40px] pb-[20px]">
              <div className="flex flex-wrap gap-4 2xl:min-w-auto xl:max-w-[710px] lg:max-w-[640px] w-full">
                {card.tags.slice(0, 10).map((t) => (
                  <TagChip key={t} label={t} />
                ))}
              </div>
              <Link 
                to="/Pilot"
                className="shrink-0 inline-flex items-center gap-2 bg-white xl:px-[22px] px-[20px] xl:py-[12px] py-[10px] 2xl:text-[20px] xl:text-[18px] lg:text-[16px] text-[14px] text-black font-urbanist hover:bg-gray-50 transition-colors cursor-pointer"
              >
                VIEW ALL <ArrowUpRight className="w-6 h-auto" />
              </Link>
            </div>
            </div>
        </div>
      </div>
    </div>
  );
}


function PilotCardMobile({ card }: { card: PilotCard }) {
  return (
    <div className={`relative w-full overflow-hidden ${card.gradient} text-white rounded-none `}>
      {/* background texture + overlay */}
      <img src={baground1} alt="" className="absolute inset-0 w-full h-full object-cover object-center" />
      <div className="absolute inset-0 bg-black/20" />

      {/* top-right image (absolute) */}
      {card.bigImg && (
        <img
          src={card.bigImg}
          alt=""
          className="absolute -top-0 right-0 w-[162px] sm:w-[220px] md:w-[300px] pointer-events-none"
        />
      )}

      {/* content */}
      <div className="relative z-10 px-4 pb-4 sm:px-6 md:px-8 sm:pb-6 md:pb-8   pt-[90px] sm:pt-[120px] md:pt-[150px] ">
        <div className="flex flex-col gap-6 md:gap-10 sm:gap-8 ">
          <div className="flex flex-col gap-4 md:gap-6 ">
        <h3 className="text-[24px] sm:text-[32px] md:text-[36px] font-semibold">
          {card.title.includes("You") ? (
            <>
              {card.title.split("You")[0]}
              <span className="font-bold">{" You"}</span>
            </>
          ) : (
            card.title
          )}
        </h3>

        <p className="text-white/90 text-[14px] sm:text-[16px] md:text-[18px] leading-relaxed">
          {card.subtitle}
        </p>

        {/* ===== EXACT CTA BLOCK from your snippet ===== */}
        <div className="flex items-center justify-between min-[415px]:gap-6 p-2 sm:bg-white/10 bg-[#FFFFFF14] min-[415px]:w-fit w-full">
          <div className="flex items-center text-white xl:px-[24px] px-[20px] py-[12px] xl:py-[14px] gap-1">
            <span className="2xl:text-[24px] xl:text-[20px] lg:text-[18px] md:text-[20px] sm:text-[16px] text-[14px] font-medium tracking-tight">
              {card.duration}
            </span>
            <span className="2xl:text-[22px] xl:text-[20px] lg:text-[18px] md:text-[16px] text-[14px] leading-none">🗓️</span>
          </div>
          <button
            type="button"
            className="inline-flex items-center  justify-center border border-[var(--color)] sm:border-black/10 bg-white xl:px-[34px] px-[30px] xl:py-[16px] py-[12px] 2xl:text-[20px] xl:text-[18px] lg:text-[16px] text-[14px] font-semibold text-black shadow-[0_1px_0_rgba(0,0,0,0.08)] hover:shadow-[0_2px_0_rgba(0,0,0,0.12)] focus:outline-none focus-visible:ring-2 focus-visible:ring-black/20"
          >
            Book a pilot
          </button>
        </div>
        </div>

        {/* tags */}
        <div className="mt-6 flex flex-wrap gap-3">
          {card.tags.slice(0, 10).map((t) => (
            <TagChip key={t} label={t} />
          ))}
        </div>
      </div>
      </div>
    </div>
  );
}


/* ==================== Page (with requested fade timing) ==================== */
export default function Study() {
  const lastCardRef = useRef<HTMLDivElement>(null);

  const heroRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.5]);

  return (
    <div className="w-full px-4 sm:px-6 md:px-12 lg:px-[80px] xl:px-[120px] 2xl:px-[200px] py-[40px] sm:py-[60px] md:py-[80px] lg:py-0">
      <section
  ref={heroRef}
  className="lg:h-[80vh] pb-[24px] lg:pb-0 flex flex-col justify-center items-center"
>
  {/* STATIC (< lg) */}
  <div className="lg:hidden flex flex-col items-center">
    <h1 className="2xl:text-[96px] xl:text-[82px] md:text-[68px] sm:text-[48px] text-[32px] text-center font-semibold">
    Start with a Pilot
    </h1>
    <div>
      <p className="2xl:text-[84px] xl:text-[70px] md:text-[64px] sm:text-[40px] text-[24px] text-center font-instrument-serif-italics">
      Small Start. Big Impact.
      </p>
      <p className="text-[var(--sub-text)] pt-2 font-urbanist md:pt-4 text-[12px] sm:text-[14px] md:text-[18px] lg:text-[22px] xl:text-[32px] text-center">
      Every partnership begins with a spark — a single idea tested, refined, and brought to life.
      </p>
      <p className="text-[var(--sub-text)] font-urbanist text-[12px] sm:text-[14px] md:text-[18px] lg:text-[22px] xl:text-[32px] text-center">
      Our pilot programs are built to validate your vision, align innovation with outcomes, and move fast toward measurable success.
      </p>
    </div>
  </div>

  {/* ANIMATED (lg+) */}
  <motion.div
    style={{ scale }}
    className="hidden lg:flex flex-col items-center will-change-transform"
  >
    <h1 className="2xl:text-[96px] xl:text-[82px] md:text-[68px] sm:text-[48px] text-[32px] text-center font-semibold">
    Start with a Pilot
    </h1>
    <div>
      <p className="2xl:text-[84px] xl:text-[70px] md:text-[64px] sm:text-[40px] text-[24px] text-center font-instrument-serif-italics">
      Small Start. Big Impact.
      </p>
      <p className="text-[var(--sub-text)] font-urbanist pt-2 md:pt-4 text-[14px] sm:text-[15px] md:text-[18px] lg:text-[22px] xl:text-[32px] text-center">
      Every partnership begins with a spark — a single idea tested, refined, and brought to life.
      </p>
      <p className="text-[var(--sub-text)] font-urbanist pt-2 md:pt-4 text-[14px] sm:text-[15px] md:text-[18px] lg:text-[22px] xl:text-[32px] text-center">
      Our pilot programs are built to validate your vision, align innovation with outcomes, and move fast toward measurable success.
      </p>
    </div>
  </motion.div>
</section>



{/* CARDS */}

      {/* < lg : STATIC LIST (no animation; code for lg+ is hidden) */}
      <div className="lg:hidden space-y-6">
        {CARDS.map((card) => (
          <PilotCardMobile key={`m-${card.id}`} card={card} />
        ))}
      </div>


      <div className="hidden lg:block">
      {CARDS.map((card, i) => {
        const isLast = i === CARDS.length - 1;
        return (
          <motion.div
            key={card.id}
            ref={isLast ? lastCardRef : undefined}
            className="w-full h-[120svh] flex flex-col items-center justify-center"
            style={{
              top: 1 / 2,                         // kept to match your snippet
              transform: scrollYProgress,          // kept to match your snippet
              transformOrigin: "center top",
              position: "sticky",
            }}
          >
            <PilotCardView card={card} />
          </motion.div>
        );
      })}
      </div>
    </div>
  );
}
