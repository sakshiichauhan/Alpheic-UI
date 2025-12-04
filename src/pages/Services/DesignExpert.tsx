import React, { useMemo, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import Img1 from "@/assets/ServicePage/DesginExpert/Img1.png";
import Img2 from "@/assets/ServicePage/DesginExpert/Img2.png";
import Img3 from "@/assets/ServicePage/DesginExpert/Img3.png";
import Img4 from "@/assets/ServicePage/DesginExpert/Img4.png";
import Img5 from "@/assets/ServicePage/DesginExpert/Img5.png";
import Img6 from "@/assets/ServicePage/DesginExpert/Img6.png";
import Img7 from "@/assets/ServicePage/DesginExpert/Img7.png";
import ParsedHtml from "@/Components/ParsedHtml";

interface ExpertImage {
  src: string;
  name?: string;
  title?: string;
  isHighlighted?: boolean; 
}

interface DesignExpertProps {
  className?: string;
  heading?: string;
  description?: string;
  buttonData?: string;
}

const DesignExpert: React.FC<DesignExpertProps> = ({ 
  className = "",
  heading,
  description,
  buttonData
}) => {
  const experts: ExpertImage[] = [
    { src: Img1, name: "Amit Sharma", title: "UX Strategist" },
    { src: Img2, name: "Vikram Singh", title: "Product Designer", isHighlighted: true }, 
    { src: Img3, name: "Neha Kapoor", title: "Design Researcher" },
    { src: Img4, name: "Arjun Mehta", title: "Creative Lead" },
    { src: Img5, name: "Riya Das", title: "UI Designer" },
    { src: Img6, name: "Sandeep Rao", title: "Brand Designer" },
    { src: Img7, name: "Ishita Verma", title: "Product Strategist" },
    { src: Img1, name: "Karan Patel", title: "Visual Designer" },
  ];

  const defaultHighlightIndex = useMemo(() => {
    const presetIndex = experts.findIndex(expert => expert.isHighlighted);
    return presetIndex >= 0 ? presetIndex : 0;
  }, [experts]);

  const [highlightedIndex, setHighlightedIndex] = useState<number>(defaultHighlightIndex);

  const handleActivate = (index: number) => {
    if (index === highlightedIndex) return;
    setHighlightedIndex(index);
  };

  return (
    <section
      className={`w-full bg-white ${className}`}
      aria-labelledby="design-experts-heading"
    >
      <div className="w-full px-4 sm:px-6 md:px-12 lg:px-[80px] xl:px-[120px] 2xl:px-[200px] py-16 md:py-20 lg:py-24">
        <div className="flex flex-col items-center text-center">
          {heading ? (
            <ParsedHtml
              htmlContent={heading}
              as="h2"
              id="design-experts-heading"
              className="text-[32px] sm:text-[40px] md:text-5xl lg:text-6xl xl:text-7xl font-light text-black mb-6 md:mb-8 font-urbanist"
            />
          ) : (
            <h2
              id="design-experts-heading"
              className="text-[32px] sm:text-[40px] md:text-5xl lg:text-6xl xl:text-7xl font-light text-black mb-6 md:mb-8 font-urbanist"
            >
              Design <span className="font-semibold">Experts</span>
            </h2>
          )}

          {description ? (
            <ParsedHtml
              htmlContent={description}
              as="p"
              className="text-[14px] sm:text-lg md:text-xl lg:text-[22px] text-[#333333] max-w-4xl mx-auto mb-12 md:mb-16 lg:mb-20 leading-relaxed font-urbanist"
            />
          ) : (
            <p className="text-[14px] sm:text-lg md:text-xl lg:text-[22px] text-[#333333] max-w-4xl mx-auto mb-12 md:mb-16 lg:mb-20 leading-relaxed font-urbanist">
              Meet Alpheric's UX strategists, design researchers, and product innovators who have shaped experiences for startups and enterprises worldwide.
            </p>
          )}

          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 lg:gap-10 mb-12 md:mb-16 lg:mb-20">
            {experts.map((expert, index) => {
              const isActive = index === highlightedIndex;
              return (
                <div
                  key={index}
                  role="button"
                  tabIndex={0}
                  onClick={() => handleActivate(index)}
                  onKeyDown={event => {
                    if (event.key === "Enter" || event.key === " ") {
                      event.preventDefault();
                      handleActivate(index);
                    }
                  }}
                  aria-pressed={isActive}
                  className={`relative w-full aspect-square overflow-hidden bg-white rounded-md transition-all duration-300 ease-in-out cursor-pointer group hover:scale-105 hover:shadow-2xl ${
                    isActive ? "" : "grayscale hover:grayscale-0"
                  } ${isActive ? "" : ""}`}
                >
                  <img
                    src={expert.src}
                    alt={expert.name || `Design Expert ${index + 1}`}
                    className="w-full h-full object-cover"
                  />

                  {(expert.name || expert.title) && (
                    <div
                      className={`absolute 2xl:bottom-4 bottom-2 2xl:left-4 left-2 2xl:right-4 right-2 bg-[#FFFFFF] backdrop-blur-sm px-4 py-1 transition-all duration-300 ease-in-out ${
                        isActive
                          ? "opacity-100 translate-y-0"
                          : "opacity-0 translate-y-full group-hover:opacity-100 group-hover:translate-y-0"
                      }`}
                    >
                      <h3 className="text-[14px] md:text-xl font-bold text-black font-instrument-sans">
                        {expert.name}
                      </h3>
                      <p className="text-[10px] md:text-base text-[#333333] font-instrument-sans">
                        {expert.title}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <a
            href="#"
            className="inline-flex items-center gap-2 border-[2px] px-6 sm:px-8 md:px-10 lg:px-12 py-3 md:py-4 text-base sm:text-lg md:text-xl lg:text-2xl transition-colors font-urbanist rounded-sm hover:bg-[#E6F7FF]"
            style={{ borderColor: "#ADD8E6", color: "black" }}
          >
            {buttonData || "View Our Consultants"}
            <ArrowUpRight className="h-auto w-4 sm:w-5 md:w-6 lg:w-7" aria-hidden />
          </a>
        </div>
      </div>
    </section>
  );
};

export default DesignExpert;
