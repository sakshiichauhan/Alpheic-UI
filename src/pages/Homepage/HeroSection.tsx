import React, { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { X, VolumeOff, Volume2, ChevronLeft, ChevronRight, ArrowUpRight } from "lucide-react";

// Assets
import Spiral from "@/assets/Homepage/spiral.png";
import arrow from "@/assets/Homepage/Arrow.png";
import Text from "@/assets/Homepage/text.png";

import asset_1 from "@/assets/Homeicons/asset-1.png";
import asset_2 from "@/assets/Homeicons/asset-2.png";
import asset_3 from "@/assets/Homeicons/asset-3.png";
import asset_4 from "@/assets/Homeicons/asset-4.png";
import asset_5 from "@/assets/Homeicons/asset-5.png";

import Video from "@/assets/Video/vid.mp4";
import img from "@/assets/Video/img.png";



const TEAM_ASSETS = [asset_1, asset_2, asset_3, asset_4, asset_5];

const HomePage: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPanelVisible, setIsPanelVisible] = useState<boolean>(true);
  const [isMuted, setIsMuted] = useState<boolean>(true);

  // Auto-configure video playback
  useEffect(() => {
    if (videoRef.current) {
      const video = videoRef.current;
      video.muted = true;
      video.autoplay = true;
      video.playsInline = true;
      video.loop = true;
      video.play().catch(() => {
        // Silently handle autoplay errors (e.g., when component unmounts)
      });
    }
  }, []);

  const toggleVolume = () => {
    if (!videoRef.current) return;
    const video = videoRef.current;
    video.muted = !isMuted;
    video.volume = isMuted ? 1 : 0;
    setIsMuted(!isMuted);
  };


  return (
    <section
      id="home"
      className="w-full bg-[radial-gradient(ellipse_50%_100%_at_top_right,#EDE6FE_10%,#FFFFFF_100%)] overflow-clip"
    >
      <div className="w-full lg:pt-50 lg:pb-50 pb-15 sm:pt-30 pt-20 flex items-center px-4 sm:px-6 md:px-12 lg:px-[80px] xl:px-[120px] 2xl:px-[200px]">
        <div className="flex flex-col lg:flex-row items-center w-full gap-8 lg:gap-0">

          {/* ✅ LEFT CONTENT */}
          <div className="w-full flex flex-col justify-center lg:mt-0  lg:gap-[109] gap-[76px]">
            <div className="flex flex-col">
              <div className="flex items-center gap-6">
                <h1 className="2xl:text-[96px] xl:text-[82px] md:text-[68px] sm:text-[54px] text-[40px] font-semibold">Clear Direction </h1>
                <img src={arrow} alt="arrow" className="h-[30px] w-auto hidden lg:block" />
              </div>
              <div className="flex items-center lg:gap-6 gap-4"> 
                <img src={Text} alt="text" className="2xl:h-[100px] xl:h-[80px] md:h-[60px] sm:h-[48px] h-[40px] w-auto " />
                <h2 className="2xl:text-[84px] xl:text-[70px] md:text-[64px] sm:text-[48px] text-[32px] font-instrument-serif-italics">for Your Business</h2>
              </div>
            </div>

            <div className="flex-col lg:gap-[48px] md:gap-[32px] sm:gap-[24px] gap-[16px]">
              <div>
              <Link
                to="/LetsTalk"
                className="inline-flex items-center gap-2 lg:px-[34px] px-[16px] py-[10px] lg:py-[16px] text-[14px] lg:text-[20px] border border-black text-base sm:text-[16px] md:text-[18px] font-urbanist "
              >
                Let's Talk
                <ArrowUpRight size={20} className="block lg:hidden" />
              </Link>
              </div>

              {/* ✅ TEAM SECTION */}
              <div className="flex flex-col justify-between lg:gap-[48px] lg:mt-[48px] md:gap-[32px] md:mt-[32px] sm:gap-[24px] sm:mt-[24px] gap-[16px] mt-[16px] font-urbanist">

                  <div className="flex flex-col items-start lg:items-center gap-3 sm:gap-5 lg:flex-row">
                  <p className="text-base text-[16px] text-left md:text-[20px] text-[var(--hero-text)] lg:max-w-[200px] lg:min-w-[200px] font-urbanist">
                    You'll Be Talking With 
                    Our Creative Talents.
                  </p>
                  <div className="flex lg:max-w-[200px] lg:min-w-[200px] lg:justify-center items-center gap-1 lg:self-center self-start font-urbanist">
                    {TEAM_ASSETS.map((imgSrc, idx) => (
                      <img
                        key={idx}
                        src={imgSrc}
                        alt={`Team member ${idx + 1}`}
                        className="w-[30px] h-[30px] sm:w-[36px] sm:h-[36px] object-cover"
                      />
                    ))}
                  </div>
                </div>

                <p className="text-base sm:text-[20px] text-[var(--hero-text)] lg:max-w-[550px] lg:min-w-[550px] xl:max-w-[600px] xl:min-w-[600px] font-urbanist">
                  Let’s craft a digital strategy powered by innovation and intelligence to drive results, amplify impact, and grow your business together.
                </p>
              </div>
            </div>
          </div>

          {/* ✅ RIGHT CONTENT */}
          <div className="relative h-full">

            {/* Spiral Background */}
            <div className="block absolute
                md:right-[-400px]
                lg:right-[-350px]
                xl:translate-x-[50px]
                translate-y-[-450px]
                translate-x-[120px]
                max-[540px]:translate-x-[70px]
                lg:translate-y-[50px]
                lg:top-[-400px] h-[154px]  w-[206px]
                md:translate-y-[-600px] md:translate-x-[170px]
                sm:w-[400px] sm:h-[350px] sm:translate-y-[-500px] sm:translate-x-[50px]
                md:w-[510px] lg:w-[900px] md:h-[690px] mx-auto">
            <img src={Spiral} alt="Spiral background" className="w-full h-auto" />
          </div>






            {/* ✅ Floating Video Panel */}
            {isPanelVisible && (
              <div className="lg:block hidden fixed bottom-12 md:bottom-[50px] md:right-[50px] bg-slate-900 text-white h-[280px] sm:h-[350px] md:h-[409px] w-[180px] sm:w-[200px] md:w-[230px] z-50">
                <div className="relative">
                  <video
                    ref={videoRef}
                    src={Video}
                    poster={img}
                    className="w-full object-cover"
                    autoPlay
                    playsInline
                    muted
                    loop
                  />

                  {/* Close button */}
                  <button
                    aria-label="Close video panel"
                    onClick={() => setIsPanelVisible(false)}
                    className="absolute top-2 sm:top-4 right-2 sm:right-4 bg-white h-[24px] w-[24px] sm:h-[32px] sm:w-[32px]  text-black hover:bg-black hover:text-white flex justify-center items-center p-1 transition"
                  >
                    <X size={20} />
                  </button>

                  {/* Volume toggle */}
                  <button
                    aria-label={isMuted ? "Unmute video" : "Mute video"}
                    onClick={toggleVolume}
                    className="absolute top-2 sm:top-4 left-2 sm:left-4 bg-white h-[24px] w-[24px] sm:h-[32px] sm:w-[32px] text-black hover:bg-black hover:text-white flex justify-center items-center p-1 transition"
                  >
                    {isMuted ? <VolumeOff size={20} /> : <Volume2 size={20} />}
                  </button>

                  {/* CTA Button */}
                  <Link
                    to="/LetsTalk"
                    className="absolute -bottom-0 left-1/2 transform -translate-x-1/2 w-[130px] sm:w-[173px] pt-3 pb-1 bg-white text-black font-medium text-sm sm:text-xl hover:bg-black hover:text-white transition flex items-center justify-center"
                  >
                    Let's Talk 👋
                  </Link>
                </div>
              </div>
            )}

            {/* ✅ Toggle Panel Button */}
            <button
              onClick={() => setIsPanelVisible(true)}
              aria-label="Toggle video panel"
              className="fixed bottom-16 sm:bottom-24 md:bottom-30 right-0 sm:-right-3 md:-right-5 bg-white text-black rounded-l-4xl h-12 w-6 sm:h-16 sm:w-8 md:h-20 md:w-10 z-50 hover:bg-black hover:text-white transition-all duration-300 hover:scale-105 flex items-center justify-center"
            >
              {isPanelVisible ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomePage;