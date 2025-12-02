import React from "react";
import Vision from "@/assets/AboutUsPage/Vision.png";
import Mission from "@/assets/AboutUsPage/Mission.png";

type Props = {
  visionText?: string;
  missionText?: string;
  className?: string;
};

const VisionMission: React.FC<Props> = ({
  visionText = "To build a world where security drives innovation, and technology and design work together to empower businesses and communities.",
  missionText = "To enable every organization to consult, build, and grow confidently through Alpheric’s integrated ecosystem — uniting Cyber Security, Technology, Design, and Hosting.",
  className = "",
}) => {
  return (
    <section className={`w-full bg-[#F9FAFB] ${className}`} aria-label="Vision and Mission">
      <style>{`
        @media (min-width: 1536px) and (max-width: 1800px) {
          .vision-mission-container > div {
            gap: 40px;
          }
        }
      `}</style>
      <div className="px-4 sm:px-6 md:px-12 lg:px-[80px] xl:px-[120px] 2xl:px-[200px] 2xl:py-[120px] xl:py-[100px] lg:py-[80px] md:py-[60px] sm:py-[52px] py-[40px] flex flex-col shrink-0 vision-mission-container">
        <div className="flex lg:flex-row flex-col justify-between 2xl:gap-[114px] xl:gap-[100px] lg:gap-[80px] md:gap-[32px] sm:gap-[24px] gap-[16px]">
          {/* Vision */}
          <div className="w-full items-center lg:items-start flex flex-col xl:gap-[24px] lg:gap-[20px] md:gap-[16px] sm:gap-[14px] gap-[12px] 2xl:min-w-[475px]">
            <div className="flex items-center justify-center lg:justify-start lg:gap-3 gap-[10px]">
              <img src={Vision} alt="Vision" className="2xl:w-[58px] xl:w-[52px] lg:w-[48px] md:w-[40px] w-[32px] 2xl:h-[58px] xl:h-[52px] lg:h-[48px] md:h-[40px] h-[32px]" />
              <h3 className="2xl:text-[72px] xl:text-[60px] lg:text-[48px] md:text-[40px] sm:text-[38px] text-[32px] font-normal text-black">
                Our <span className="font-semibold">Vision</span>
              </h3>
            </div>
            <p className="max-w-prose text-center lg:text-left 2xl:text-[24px] xl:text-[20px] lg:text-[18px] md:text-[16px] sm:text-[14px] text-[14px] text-[var(--medium-text)] font-urbanist">{visionText}</p>
          </div>
          
          <div className="pointer-events-none lg:h-[220px] h-[2px] lg:w-[2px] w-full bg-[#D2D3D7] block my-auto "> </div>

          {/* Mission */}
          <div className="w-full items-center lg:items-start flex flex-col xl:gap-[24px] lg:gap-[20px] md:gap-[16px] sm:gap-[14px] gap-[12px] 2xl:min-w-[475px]">
            <div className="flex items-center justify-center lg:justify-start lg:gap-3 gap-[10px]">
              <img src={Mission} alt="Mission" className="2xl:w-[58px] xl:w-[52px] lg:w-[48px] md:w-[40px] w-[32px] 2xl:h-[58px] xl:h-[52px] lg:h-[48px] md:h-[40px] h-[32px]" />
              <h3 className="2xl:text-[72px] xl:text-[60px] lg:text-[48px] md:text-[40px] sm:text-[38px] text-[32px] font-normal text-black">
                Our <span className="font-semibold">Mission</span>
              </h3>
            </div>
            <p className="max-w-prose text-center lg:text-left 2xl:text-[24px] xl:text-[20px] lg:text-[18px] md:text-[16px] sm:text-[14px] text-[14px] text-[var(--medium-text)] font-urbanist">{missionText}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VisionMission;
