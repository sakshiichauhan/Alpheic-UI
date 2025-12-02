import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { MoveRight, VolumeOff, Volume2, Play, Pause, RotateCcw } from "lucide-react";

import vid from "@/assets/Video/vid2.mp4";

const Design: React.FC = () => {
  /** ---------------------------
   *  STATIC (shown only below lg)
   *  --------------------------*/
  const mobileVideoRef = useRef<HTMLVideoElement | null>(null);
  const mobileSectionRef = useRef<HTMLElement | null>(null);
  const [mobileMuted, setMobileMuted] = useState(true);
  const [mobileIsPlaying, setMobileIsPlaying] = useState(false);

  // Intersection Observer for mobile video
  useEffect(() => {
    const video = mobileVideoRef.current;
    if (!video) return;

    // Set initial video properties
    video.muted = true;
    video.playsInline = true;
    video.loop = true;

    const updatePlayingState = () => {
      setMobileIsPlaying(!video.paused);
    };

    video.addEventListener("play", updatePlayingState);
    video.addEventListener("pause", updatePlayingState);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            video.play().catch(() => {
              // Silently handle autoplay errors
            });
          } else {
            video.pause();
          }
        });
      },
      { threshold: 0.3, rootMargin: "0px" }
    );

    observer.observe(video);

    return () => {
      observer.disconnect();
      video.removeEventListener("play", updatePlayingState);
      video.removeEventListener("pause", updatePlayingState);
    };
  }, []);

  const handleMobileVideoClick = () => {
    const v = mobileVideoRef.current;
    if (!v) return;
    if (v.paused) {
      v.play();
    } else {
      v.pause();
    }
  };

  const toggleMobilePlayPause = () => {
    const v = mobileVideoRef.current;
    if (!v) return;
    if (v.paused) {
      v.play();
    } else {
      v.pause();
    }
  };

  const handleMobileReplay = () => {
    const v = mobileVideoRef.current;
    if (!v) return;
    v.currentTime = 0;
    v.play();
  };

  const toggleMobileMute = () => {
    const v = mobileVideoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setMobileMuted(v.muted);
  };

  /** ---------------------------------
   *  ORIGINAL ANIMATION (lg and above)
   *  --------------------------------*/
  const sectionRef = useRef<HTMLElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const rawScale = useTransform(scrollYProgress, [0, 1], [1, 0.4]);
  const scale = useSpring(rawScale, { stiffness: 200, damping: 24, mass: 0.4 });
  const textOpacity = useTransform(scrollYProgress, [0.85, 0.98], [0, 1]);

  // Intersection Observer for desktop video
  useEffect(() => {
    const video = videoRef.current;
    const section = sectionRef.current;
    if (!video || !section) return;

    // Set initial video properties
    video.muted = true;
    video.playsInline = true;
    video.loop = true;

    const updatePlayingState = () => {
      setIsPlaying(!video.paused);
    };

    video.addEventListener("play", updatePlayingState);
    video.addEventListener("pause", updatePlayingState);

    // Observe the section for when it enters viewport
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            video.play().catch(() => {
              // Silently handle autoplay errors
            });
          } else {
            video.pause();
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px" }
    );

    observer.observe(section);

    // Also observe the video directly as a fallback
    const videoObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (video.paused) {
              video.play().catch(() => {
                // Silently handle autoplay errors
              });
            }
          } else {
            if (!video.paused) {
              video.pause();
            }
          }
        });
      },
      { threshold: 0.2, rootMargin: "0px" }
    );

    videoObserver.observe(video);

    return () => {
      observer.disconnect();
      videoObserver.disconnect();
      video.removeEventListener("play", updatePlayingState);
      video.removeEventListener("pause", updatePlayingState);
    };
  }, []);

  const handleVideoClick = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      v.play();
    } else {
      v.pause();
    }
  };

  const togglePlayPause = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      v.play();
    } else {
      v.pause();
    }
  };

  const handleReplay = () => {
    const v = videoRef.current;
    if (!v) return;
    v.currentTime = 0;
    v.play();
  };

  const toggleMute = () => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setIsMuted(v.muted);
  };

  return (
    <>
      {/* ---------- STATIC BELOW LG ---------- */}
      <section
        ref={mobileSectionRef}
        className="block lg:hidden"
        aria-labelledby="design-heading-mobile"
      >
        <div className="mx-auto w-full py-8 sm:py-14 md:py-20 px-4 sm:px-6 md:px-12 gap-[20px] flex flex-col sm:gap-[24px] md:gap-[32px]">
          <header className="w-full flex flex-col gap-[8px] sm:gap-[12px] md:gap-[16px]">
            <h1
              id="design-heading-mobile"
              className="font-instrument-sans font-semibold leading-tight text-left text-[32px] sm:text-[40px] md:text-[48px] "
            >
              We do amazing things
            </h1>
            <div className="flex items-center gap-3 md:gap-4 font-instrument-serif-italics text-left text-[24px] sm:text-[28px] md:text-[32px] leading-tight">
              <MoveRight className="w-[35px] h-auto sm:w-[36px] lg:w-[40px] xl:w-[52px] " />
              <span>oh, we do it with amazing people.</span>
            </div>
          </header>

          <div className="">
            <div className="relative">
              <video
                ref={mobileVideoRef}
                className="w-full h-auto cursor-pointer"
                src={vid}
                onClick={handleMobileVideoClick}
                aria-label="Promotional video. Click to play or pause."
                muted
                playsInline
                loop
                autoPlay
              />
              {/* Video controls at bottom center */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center gap-3 px-4 py-2 z-10">
                <button
                  onClick={toggleMobilePlayPause}
                  className="bg-transparent hover:bg-white/20 transition-colors p-2 rounded-full"
                  aria-label={mobileIsPlaying ? "Pause video" : "Play video"}
                >
                  {mobileIsPlaying ? (
                    <Pause className="w-5 h-5 text-black" />
                  ) : (
                    <Play className="w-5 h-5 text-black" />
                  )}
                </button>
                <button
                  onClick={handleMobileReplay}
                  className="bg-transparent hover:bg-white/20 transition-colors p-2 rounded-full"
                  aria-label="Replay video"
                >
                  <RotateCcw className="w-5 h-5 text-black" />
                </button>
                <button
                  onClick={toggleMobileMute}
                  className="bg-transparent hover:bg-white/20 transition-colors p-2 rounded-full"
                  aria-label={mobileMuted ? "Unmute video" : "Mute video"}
                >
                  {mobileMuted ? (
                    <VolumeOff className="w-5 h-5 text-black" />
                  ) : (
                    <Volume2 className="w-5 h-5 text-black" />
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- YOUR ORIGINAL ANIMATION (UNCHANGED), SHOWN AT LG+ ---------- */}
      <section
        ref={sectionRef}
        className="hidden lg:block relative h-[290vh] "
        aria-labelledby="design-heading"
      >
        {/* Sticky, centered stage */}
        <div className="sticky top-0 h-screen flex items-center justify-center">
          <div className="relative w-full py-[120px] xl:py-[165px] lg:px-[80px] xl:px-[120px] 2xl:px-[200px]">
            {/* Wrap video + button so both scale together; video layout stays w-full h-auto */}
            <motion.div style={{ scale }} className="origin-center will-change-transform relative mt-50">
              <video
                ref={videoRef}
                className="w-full h-auto cursor-pointer focus:outline-none focus:ring-4 focus:ring-blue-300"
                src={vid}
                onClick={handleVideoClick}
                aria-label="Promotional video. Click to play or pause."
                muted
                playsInline
                loop
                autoPlay
              />
              {/* Video controls at bottom center */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center gap-3 px-4 py-2 z-30">
                <button
                  onClick={togglePlayPause}
                  className="bg-transparent hover:bg-white/20 transition-colors p-2 rounded-full"
                  aria-label={isPlaying ? "Pause video" : "Play video"}
                >
                  {isPlaying ? (
                    <Pause className="w-5 h-5 text-black" />
                  ) : (
                    <Play className="w-5 h-5 text-black" />
                  )}
                </button>
                <button
                  onClick={handleReplay}
                  className="bg-transparent hover:bg-white/20 transition-colors p-2 rounded-full"
                  aria-label="Replay video"
                >
                  <RotateCcw className="w-5 h-5 text-black" />
                </button>
                <button
                  onClick={toggleMute}
                  className="bg-transparent hover:bg-white/20 transition-colors p-2 rounded-full"
                  aria-label={isMuted ? "Unmute video" : "Mute video"}
                >
                  {isMuted ? (
                    <VolumeOff className="w-5 h-5 text-black" />
                  ) : (
                    <Volume2 className="w-5 h-5 text-black" />
                  )}
                </button>
              </div>
            </motion.div>

            {/* Elegant centered text, on top of video; appears near end of sticky window */}
            <motion.div
              style={{ opacity: textOpacity }}
              className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center bottom-1/3"
            >
              <div className="text-center max-w-[900px]">
                <h1
                  id="design-heading"
                  className="font-instrument-sans font-semibold leading-tight xl:text-[68px] lg:text-[54px]"
                >
                  We do amazing things
                </h1>
                <div className="mt-4 flex items-center justify-center gap-3 md:gap-4 font-instrument-serif-italics xl:text-[64px] lg:text-[52px] leading-tight">
                  <MoveRight className="w-[35px] h-auto lg:w-[40px] xl:w-[52px] " />
                  <span>oh, we do it with amazing people.</span>
                </div>
              </div>  
            </motion.div>
          </div>
        </div>
        {/* After sticky finishes, normal scrolling resumes with no further scaling */}
      </section>
    </>
  );
};

export default Design;
