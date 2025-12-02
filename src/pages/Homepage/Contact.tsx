import React, { useState, useEffect } from "react";
import { MoveRight } from "lucide-react";
import { motion } from "framer-motion";

import girl from "@/assets/CommingSoon/girls.png";


const Contact: React.FC = () => {
  const [animationKey, setAnimationKey] = useState<number>(0);

  useEffect(() => {
 
    setAnimationKey(Math.random());
  }, []);

  return (
    <section
      id="contact"
      className="lg:min-h-screen w-full items-center justify-start hidden lg:flex 2xl:px-[200px] xl:px-[120px] lg:px-[80px] "
    
    >
      <motion.div
        key={animationKey}
        className="w-full font-instrument-sans leading-tight"
      >
        
      
        <h3
      
          className="text-base text-[#444444] 2xl:text-[40px] xl:text-[38px] lg:text-[32px] mb-2"
        >
          Shall we chat?
        </h3>

        {/* ✅ Email link with accessible underline animation */}
        <h1 className="text-[40px] 2xl:text-[64px] xl:text-[56px] lg:text-[48px] md:text-[40px] sm:text-[32px] font-bold mb-4 sm:mb-6 md:mb-8 relative inline-block group underline-offset-8 decoration-3">
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

        {/* ✅ Animated row with text + image + button */}
        <div className="flex flex-row md:items-center gap-1 sm:gap-2 group hover:underline underline-offset-8 decoration-4 transition font-instrument-sans font-medium
        2xl:max-w-[920px] xl:max-w-[790px] lg:max-w-[660px] md:max-w-[320px] sm:max-w-[220px] max-w-[120px]">
          <span className="flex items-center 2xl:text-[140px] xl:text-[120px] lg:text-[100px] md:text-[80px] sm:text-[60px] text-[40px]">
            Let&apos;s
          </span>

          {/* ✅ Image animation */}
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
              className="2xl:h-[120px] xl:h-[100px] lg:h-[80px] md:h-[60px] sm:h-[40px] h-[20px] w-auto bg-[#56c8dc] rounded-full object-cover"
              loading="lazy"
            />
          </motion.div>

          {/* ✅ "Talk" text animation */}
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
            className="flex items-center 2xl:text-[140px] xl:text-[120px] lg:text-[100px] md:text-[80px] sm:text-[60px] text-[40px] overflow-hidden"
          >
            talk
          </motion.span>

          {/* ✅ Button with accessibility + keyboard focus */}
          <a
            href="#"
            className="mt-2 sm:mt-0 sm:ml-2 md:ml-4 2xl:px-[32px] xl:px-[28px] lg:px-[24px] md:px-[20px] sm:px-[16px] px-[12px] 
            2xl:py-[8px] xl:py-[7px] lg:py-[6px] md:py-[5px] sm:py-[4px] py-[3px] rounded-full bg-transparent transition-colors 
            duration-300 group-hover:bg-black focus:outline-none focus:ring-4 focus:ring-blue-400"
            aria-label="Contact us by email"
          >
            <MoveRight
            onClick={() => {
              window.location.href = '/LetsTalk';
            }}
              size={48}
              className="2xl:w-[120px] xl:w-[100px] lg:w-[80px] md:w-[60px] sm:w-[40px] w-[20px] 2xl:h-[120px] xl:h-[100px] lg:h-[80px] md:h-[60px] sm:h-[40px] h-[20px] text-black transition-colors duration-300 group-hover:text-white"
              aria-hidden="true"
            />
          </a>
        </div>
      </motion.div>
    </section>
  );
};

export default Contact;
