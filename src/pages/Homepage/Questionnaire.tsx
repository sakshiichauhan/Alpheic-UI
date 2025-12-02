import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import QuestionaireCard from "@/Components/QuestionnaireCard";

interface Question {
  id: number;
  text: string;
  type: "standard" | "special";
}

const questions: Question[] = [
  { id: 1, text: "Are you taking advantage of cloud computing to reduce infrastructure costs and increase agility?", type: "standard" },
  { id: 2, text: "Have you implemented automated testing in your development pipeline?", type: "standard" },
  { id: 3, text: "Is your team using agile methodologies effectively?", type: "standard" },
  { id: 4, text: `The Heart of Enterprise Solutions\n Why it's All About People, Not Just Technology`, type: "special" },
];

// Solid blank (no flicker)
const BlankCard = () => (
  <div
    className="w-full rounded-2xl border border-black/10 bg-white overflow-hidden"
    style={{ minHeight: 260, backfaceVisibility: "hidden" as any }}
    aria-hidden="true"
  />
);

// Float to heaven (numeric y; no custom ease to avoid TS issues)
const CARD_EXIT_BASE = {
  y: -480,
  opacity: 0,
  transition: { duration: 0.6 },
};

const Questionaire: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<number>(1);

  const handleAnswer = () => {
    if (currentStep < questions.length) setCurrentStep((p) => p + 1);
  };

  return (
    <section
      className="max-w-full py-10 lg:py-80 px-4 sm:px-6 md:px-12 lg:px-[90px] flex flex-col lg:flex-row items-center gap-6 lg:gap-10 overflow-hidden justify-between"
      aria-labelledby="questionnaire-heading"
    >
      {/* Left copy */}
      <div className="flex flex-col gap-4 lg:gap-6 w-full lg:w-1/2 text-center lg:text-left">
        <motion.h1
          id="questionnaire-heading"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="font-instrument-sans font-semibold 
          text-4xl sm:text-5xl md:text-6xl lg:text-[80px] xl:text-[84px]
          xl:w-[910px]
          "
        >
          Answer a few questions to unlock Insights into
        </motion.h1>
        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-instrument-serif italic 
          text-4xl sm:text-5xl md:text-6xl lg:text-[80px] xl:text-[84px]
          xl:w-[910px]
          "
        >
          Innovation with AI and Cloud
        </motion.h3>
      </div>

      {/* Card stack */}
      <div className="flex justify-center items-center w-full">
      <div className="relative w-full max-w-[671px] mt-8 lg:mt-4" aria-live="polite" aria-atomic="true">
        <div className="relative h-[289px] sm:h-[320px] md:h-[350px] flex items-center justify-center">
          <AnimatePresence mode="popLayout">
            {questions.map((q, index) => {
              // render current + next 2
              if (index >= currentStep - 1 && index < currentStep + 2) {
                const stackPosition = index - currentStep + 1; // 0 = front
                const isFront = stackPosition === 0;

                // hidden cards rotate in place (clockwise); front = parallel
                const hiddenTilt = 4 + stackPosition * 4;
                const baseZ = 10 - stackPosition;

                return (
                  <motion.div
                    key={q.id}
                    className="absolute w-full"
                    style={{
                      zIndex: baseZ,
                      backfaceVisibility: "hidden",
                      transformStyle: "preserve-3d",
                      willChange: "transform, opacity",
                    }}
                    role="group"
                    aria-roledescription="question card"
                    aria-label={`Question ${index + 1} of ${questions.length}`}
                    initial={{
                      opacity: 0,
                      rotateZ: isFront ? 0 : hiddenTilt,
                    }}
                    animate={{
                      opacity: 1,
                      rotateZ: isFront ? 0 : hiddenTilt,
                      transition: { duration: 0.4 },
                    }}
                    // Front card floats away and gets a higher z-index while exiting
                    exit={
                      isFront
                        ? {
                            ...CARD_EXIT_BASE,
                            zIndex: baseZ + 1000, // ensure exiting card stays on top
                          }
                        : undefined
                    }
                  >
                    {isFront ? (
                      <QuestionaireCard
                        question={q}
                        stepNumber={index + 1}
                        totalSteps={questions.length - 1}
                        onAnswer={handleAnswer}
                      />
                    ) : (
                      <div className="pointer-events-none select-none">
                        <BlankCard />
                      </div>
                    )}
                  </motion.div>
                );
              }
              return null;
            })}
          </AnimatePresence>
        </div>
      </div>
      </div>
    </section>
  );
};

export default Questionaire;
