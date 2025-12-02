import React, { useState, useEffect } from "react";
import { MoveRight } from "lucide-react";
import { motion } from "framer-motion";

// Assuming your import path is correct
import girl from "@/assets/CommingSoon/girls.png";


const Collaborate: React.FC = () => {
  const [animationKey, setAnimationKey] = useState<number>(0);

  useEffect(() => {
    // This key reset can be used to re-trigger animations if needed
    setAnimationKey(Math.random());
  }, []);

  return (
    <section
      id="collaborate"
      className="lg:min-h-screen w-full items-center justify-start 2xl:py-[120px] xl:py-[100px] lg:py-[80px] md:py-[60px] sm:py-[52px] py-[40px] flex px-4 sm:px-6 md:px-12 lg:px-[80px] xl:px-[120px] 2xl:px-[200px]"
    >
      <div className="border-[3px] border-[var(--color)] lg:p-[64px] md:p-[48px] sm:p-[40px] p-[16px] h-full w-full ">
        {/* --- ADDED flex flex-col and gap for vertical spacing --- */}
        <motion.div
          key={animationKey}
          className="w-full font-instrument-sans leading-tight flex flex-col gap-[32px]"
        >
          {/* --- ADDED This section for the main title and subtitle --- */}
          <div className="flex flex-col lg:gap-[16px] md:gap-[12px] gap-[8px]">
            <h2 className="2xl:text-[40px] xl:text-[38px] lg:text-[32px] md:text-[24px] sm:text-[20px] font-bold text-black">
              Let's Collaborate
            </h2>
            <p className="2xl:text-[20px] xl:text-[18px] text-[16px] text-[var(--medium-text)]">
              Let's turn your product vision into a meaningful user experience.
            </p>
          </div>

          {/* This is your existing "Shall we chat?" section */}
          <div>
            <h3
              className="text-base 2xl:text-[40px] xl:text-[38px] lg:text-[32px] md:text-[28px] text-[24px] lg:mb-2 text-[var(--sub-text)]"
            >
              Shall we chat?
            </h3>

            <h1 className="2xl:text-[64px] xl:text-[56px] lg:text-[48px] md:text-[40px] sm:text-[28px] text-[24px] font-bold relative inline-block group underline-offset-8 decoration-3">
              <a
                href="mailto:hello@alpheric.com"
                className="focus:outline-none focus:ring-4 focus:ring-blue-400"
                aria-label="Email us at hello@alpheric.com"
              >
                <span>hello@alpheric.com</span>
                <span
                  className="absolute left-0 bottom-[-2px] h-[3px] w-full bg-current scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100"
                  aria-hidden="true"
                />
              </a>
            </h1>
          </div>
          
          {/* This is your existing animated "Let's talk" section */}
          <div className="flex flex-row items-center gap-1 sm:gap-2 group hover:underline underline-offset-8 decoration-4 transition font-instrument-sans font-medium">
  {/* The text sizes and other elements remain the same */}
  <span className="flex items-center 2xl:text-[140px] xl:text-[120px] lg:text-[100px] md:text-[80px] sm:text-[60px] text-[40px]">
    Let&apos;s
  </span>

  <motion.div
    key={`${animationKey}-image`}
    initial={{ clipPath: "inset(0 100% 0 0)" }}
    animate={{
      clipPath: "inset(0 0 0 0)",
      transition: { duration: 1.2, ease: "easeInOut" },
    }}
    className="overflow-hidden my-2 sm:my-0"
  >
    <img
      src={girl}
      alt="Chat illustration"
      className="2xl:h-[120px] xl:h-[100px] lg:h-[80px] md:h-[70px] sm:h-[60px] h-[52px] w-auto bg-[#56c8dc] rounded-full object-cover"
      loading="lazy"
    />
  </motion.div>

  <div className="relative group">
    <motion.span
      key={`${animationKey}-talk`}
      initial={{ x: -100 }}
      animate={{
        x: 0,
        transition: {
          delay: 0.4,
          duration: 1.2,
          type: "spring",
          stiffness: 70,
          damping: 15,
        },
      }}
      className="flex items-center 2xl:text-[140px] xl:text-[120px] lg:text-[100px] md:text-[80px] sm:text-[60px] text-[32px] overflow-hidden"
    >
      talk
    </motion.span>
    
    <span className="sm:hidden absolute bottom-0 left-0 w-full h-[4px] bg-black 
                   transform scale-x-0 group-hover:scale-x-100
                   duration-1.2 spring-70 damping-15 origin-left ">
    </span>
  </div>

  <a
    href="/LetsTalk"
    className="mt-2 sm:mt-0 sm:ml-2 md:ml-4 2xl:px-[32px] xl:px-[28px] lg:px-[24px] md:px-[20px] sm:px-[16px] px-[12px] 
               2xl:py-[8px] xl:py-[7px] lg:py-[6px] md:py-[5px] sm:py-[4px] py-[3px] rounded-full bg-transparent transition-colors 
               duration-300 group-hover:bg-black focus:outline-none focus:ring-4 focus:ring-blue-400"
    aria-label="Contact us by email"
  >
    <MoveRight
      size={48}
      className="hidden lg:block 2xl:w-[120px] xl:w-[100px] lg:w-[80px] md:w-[60px] sm:w-[40px] w-[80px] 2xl:h-[120px] xl:h-[100px] lg:h-[80px] md:h-[60px] sm:h-[40px] h-[58px] text-black transition-colors duration-300 group-hover:text-white"
      aria-hidden="true"
    />
    <MoveRight
      size={20}
      className="block lg:hidden 2xl:w-[120px] xl:w-[100px] lg:w-[80px] md:w-[60px] sm:w-[40px] w-[32px] 2xl:h-[120px] xl:h-[100px] lg:h-[80px] md:h-[60px] sm:h-[40px] h-[32px] text-black transition-colors duration-300 group-hover:text-white"
      aria-hidden="true"
    />
  </a>
</div>
        </motion.div>
      </div>
    </section>
  );
};

export default Collaborate;