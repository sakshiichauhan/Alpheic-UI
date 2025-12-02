import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import answer1 from "@/assets/Answers/Answer1.png";

type Step = {
  id: number;
  title: string;
  options: string[];
  multiple: boolean;
};

const STEPS: Step[] = [
  {
    id: 1,
    title: "1. Select your industry",
    multiple: false,
    options: [
      "Tech",
      "Education",
      "Healthcare",
      "Finance",
      "Retail",
      "Manufacturing",
      "Real Estate",
      "Travel",
      "Sports",
      "Media",
      "Energy",
      "Government",
      "NGO",
      "Consulting",   
      "Startups",
    ],
  },
  {
    id: 2,
    title: "2. Define your business objective",
    multiple: false,
    options: [
      "AI",
      "Automation",
      "Website / App",
      "Branding",
      "Marketing",
      "Product Launch",
      "CX / Engagement",
      "Cloud",
      "Cyber Security",
      "Expansion",
      "Space Design",
      "Transformation"
    ],
  },
];

const color= "#5AC8DC";

export default function InsightsQuiz() {
  const [stepIdx, setStepIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string[]>>({});

  const step = STEPS[stepIdx];
  const selected = answers[step.id] ?? [];
  const canProceed = useMemo(() => selected.length > 0, [selected]);

  const toggle = (label: string) => {
    setAnswers((prev) => {
      const cur = prev[step.id] ?? [];
      return cur.includes(label)
        ? { ...prev, [step.id]: cur.filter((v) => v !== label) }
        : { ...prev, [step.id]: [...cur, label] };
    });
  };

  return (
    <section className="w-full py-[32px] sm:py-[40px] md:py-[48px] lg:py-[120px] px-4 sm:px-6 md:px-12 lg:px-[80px] xl:px-[120px] 2xl:px-[200px]">
      <div className="w-full">
        <div className="flex w-full items-center md:gap-10 gap-8  min-[1700px]:gap-[84px] min-[1400px]:gap-[56px] lg:flex-row justify-between flex-col-reverse">
          {/* LEFT */}
          <div className="w-full 2xl:min-w-[720px] xl:min-w-[625px] lg:min-w-[580px]">
            <h1 className="2xl:text-[60px] xl:text-[52px] lg:text-[48px] md:text-[40px] text-[32px] font-medium text-black">
            We empower leaders to achieve the extraordinary.
            </h1>
            <p className="pt-4 2xl:text-[32px] xl:text-[24px] lg:text-[20px] md:text-[18px] text-[16px] text-[var(--medium-text)] font-urbanist">
            Answer two short questions, and we’ll align our strategic thinking to your business challenges.
              </p>

            {/* Step pills */}
            
            <div className="2xl:pt-[48px] xl:pt-[40px] lg:pt-[32px] pt-[24px] flex items-center gap-[10px] flex-row ">
                
            <p className="min-[1700px]:text-[32px] min-[1460px]:text-[30px] xl:text-[28px] lg:text-[24px] md:text-[22px] text-[20px] font-medium text-black">{step.title}</p>
            <div className="flex items-center gap-[10px]">
              {STEPS.map((s, i) => {
                const active = i === stepIdx;
                return (
                  <button
                    key={s.id}
                    onClick={() => setStepIdx(i)}
                    aria-current={active ? "step" : undefined}
                    style={active ? { backgroundColor: color } : undefined}
                    className={[
                      "lg:h-[36px] lg:w-[36px] md:h-[32px] md:w-[32px] h-[24px] w-[24px] min-[1700px]:text-[20px] min-[1460px]:text-[18px] xl:text-[16px] lg:text-[14px] text-[12px]  font-medium transition-colors duration-200",
                      active    
                        ? "text-black"
                        : "bg-neutral-100 text-[var(--medium-text)] hover:bg-neutral-200",
                    ].join(" ")}
                  >
                    {i + 1}
                  </button>
                );
              })}
              </div>
            </div>

            {/* Question + chips */}
            <div className="mt-6 w-full">
              <AnimatePresence mode="wait">
                <motion.div
                  key={step.id}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.18 }}
                >

                  <div className="flex flex-wrap min-[1700px]:gap-[24px] min-[1460px]:gap-[20px] xl:gap-[16px] lg:gap-[14px] gap-[12px]">
                    {step.options.map((label) => {
                      const active = selected.includes(label);
                      return (
                        <motion.button
                          key={label}
                          type="button"
                          onClick={() => toggle(label)}
                          aria-pressed={active}
                          style={{ 
                            borderColor: color+'50',
                            backgroundColor: active ? color : '#ffffff'
                          }}
                          whileHover={{ borderColor: color }}
                          transition={{ duration: 0.2 }}
                          className={[
                            "border lg:px-[24px] md:px-[16px] px-[12px] lg:py-[12px] md:py-[8px] py-[6px] min-[1700px]:text-[24px] min-[1460px]:text-[20px] xl:text-[18px] lg:text-[16px] md:text-[14px] text-[12px] transition-colors duration-200",
                            "outline-none font-urbanist",
                            // selected text color
                            active ? "text-black" : "text-[var(--medium-text)]",
                          ].join(" ")}
                        >
                          {label}
                        </motion.button>
                      );
                    })}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* no Next/Back buttons by request */}
            {canProceed ? <div className="sr-only">Use the step pills to navigate.</div> : null}
          </div>

          {/* RIGHT */}
          <div className="w-full lg:max-w-[693px] lg:max-h-[615px] lg:min-h-[490px] md:max-h-[5000px] sm:max-h-[380px] max-h-[230px]">
            <div className="">
              <img
                src={answer1}
                alt="People collaborating"
                className="w-full lg:max-h-[615px] lg:min-h-[490px] h-auto md:max-h-[500px] sm:max-h-[380px] max-h-[230px] lg:object-right object-center object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
