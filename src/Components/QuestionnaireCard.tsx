import React from "react";
import { motion } from "framer-motion";

export interface Question {
  id: number;
  text: string;
  type: "standard" | "special";
}

interface QuestionnaireCardProps {
  question: Question;
  stepNumber: number;
  totalSteps: number;
  onAnswer: (answer: string) => void;
  /** when false, the card is visually present but non-interactive (used for stack layers) */
  interactive?: boolean;
}

const QuestionnaireCard: React.FC<QuestionnaireCardProps> = ({
  question,
  stepNumber,
  totalSteps,
  onAnswer,
  interactive = true,
}) => {
  return (
    <div
      className="w-full font-instrument-sans"
      role="group"
      aria-roledescription="question card"
      aria-label={`Question ${stepNumber} of ${totalSteps}`}
    >
      <motion.div
        className="relative border border-gray-200 bg-gray-50 w-full sm:w-[500px] md:w-[600px] lg:w-[671px] h-auto min-h-[240px] sm:min-h-[240px] md:min-h-[280px] lg:h-[289px] p-3 sm:p-4 rounded-[18px] sm:rounded-[24px] shadow-sm overflow-hidden"
        layout
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.25 }}
      >
        {/* standard card */}
        {question.type !== "special" ? (
          <>
            {/* progress numbers */}
            <div
              className="flex items-center justify-center gap-3 md:gap-4 mb-4 md:mb-5 mt-4 md:mt-5 text-[16px] sm:text-[18px] md:text-[20px]"
              role="status"
              aria-label={`Step ${stepNumber} of ${totalSteps}`}
            >
              {Array.from({ length: totalSteps }, (_, index) => (
                <div
                  key={index + 1}
                  className={`w-7 h-7 md:w-8 md:h-8 rounded-full border-2 flex items-center justify-center font-medium ${
                    index + 1 === stepNumber
                      ? "border-black text-black"
                      : "border-gray-300 text-gray-300"
                  }`}
                  aria-current={index + 1 === stepNumber ? "step" : undefined}
                >
                  {index + 1}
                </div>
              ))}
            </div>

            {/* question */}
            <h2
              className="text-center text-[22px] sm:text-[26px] md:text-[30px] lg:text-[32px] font-medium mb-3 px-2 sm:px-3 md:px-4"
              aria-live="polite"
            >
              {question.text}
            </h2>

            {/* answers */}
            <div
              className={`flex justify-between mt-8 md:mt-10 ${
                !interactive ? "pointer-events-none opacity-60" : ""
              }`}
            >
              <motion.button
                onClick={() => onAnswer("no")}
                aria-label="Answer No"
                className="absolute -left-2 -bottom-5 bg-black text-white p-5 sm:p-6 md:p-7 text-[18px] sm:text-[20px] md:text-[24px] rounded-full font-medium shadow-lg hover:bg-[#56c8dc] transition duration-300 focus:outline-none focus:ring-4 focus:ring-blue-400"
              >
                No
              </motion.button>

              <motion.button
                onClick={() => onAnswer("yes")}
                aria-label="Answer Yes"
                className="absolute -right-2 sm:-right-3 -bottom-5 bg-black text-white p-5 sm:p-6 md:p-7 text-[18px] sm:text-[20px] md:text-[24px] rounded-full font-medium shadow-lg hover:bg-[#56c8dc] transition duration-300 focus:outline-none focus:ring-4 focus:ring-blue-400"
              >
                Yes
              </motion.button>
            </div>
          </>
        ) : (
          // special card
          <div className="text-center px-5">
            <div className="inline-block px-4 py-1 rounded-full bg-white border text-gray-600 mb-2 font-medium text-[18px]">
              Insights
            </div>
            <h2 className="text-[22px] md:text-[32px] font-bold whitespace-pre-line">
              {question.text}
            </h2>
            <motion.button
              onClick={() => onAnswer("view")}
              aria-label="View Insights"
              className={`bg-black text-white text-[20px] px-5 py-5 md:py-6 rounded-full absolute -bottom-6 left-1/2 -translate-x-1/2 shadow-lg hover:bg-[#56c8dc] transition duration-300 font-medium focus:outline-none focus:ring-4 focus:ring-blue-400 ${
                !interactive ? "pointer-events-none opacity-60" : ""
              }`}
            >
              View
            </motion.button>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default QuestionnaireCard;
