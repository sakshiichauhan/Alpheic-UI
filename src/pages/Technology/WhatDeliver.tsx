import Sparkle from "@/assets/ServicePage/Star.png";

interface FeatureCardProps {
  title: string;
  description: string;
  index: number;
  totalItems: number;
}

const FeatureCard = ({ title, description, index, totalItems }: FeatureCardProps) => {
  // Calculate grid positions
  const cols2 = 2; // grid-cols-2 (mobile and md)
  const cols3 = 3; // lg:grid-cols-3
  
  // For 2-column layout (mobile and md)
  const isLastInRow2 = (index + 1) % cols2 === 0; // Right column: indices 1, 3, 5
  const isLastRow2 = index >= totalItems - cols2; // Last row: indices 4, 5
  
  // For 3-column layout (lg+)
  const isLastInRow3 = (index + 1) % cols3 === 0; // Right column: indices 2, 5
  const isLastRow3 = index >= totalItems - cols3; // Last row: indices 3, 4, 5
  
  // Build border classes - always top and left, conditional right and bottom
  const baseRightBorder = isLastInRow2 ? "border-r border-[#CCEEF4]" : "border-r-0";
  const baseBottomBorder = isLastRow2 ? "border-b border-[#CCEEF4]" : "border-b-0";
  const lgRightBorder = isLastInRow3 ? "lg:border-r lg:border-[#CCEEF4]" : "lg:border-r-0";
  const lgBottomBorder = isLastRow3 ? "lg:border-b lg:border-[#CCEEF4]" : "lg:border-b-0";
  
  const borderClasses = [
    "border-t border-l border-[#CCEEF4]", // Top and left on all items
    baseRightBorder, // Right border for 2-col layout
    baseBottomBorder, // Bottom border for 2-col layout
    lgRightBorder, // Right border override for 3-col layout
    lgBottomBorder, // Bottom border override for 3-col layout
  ].filter(Boolean).join(" ");

  return (
    <div className={`flex flex-col items-start xl:p-[32px] md:p-[24px] p-[16px] xl:gap-[24px] md:gap-[20px] gap-[16px] ${borderClasses}`}>
      <img src={Sparkle} alt="Sparkle" className="xl:w-[48px] xl:h-[48px] md:w-[32px] md:h-[32px] w-[24px] h-[24px]" />
      <div className="space-y-2">
        <h3 className="text-[14px] sm:text-[16px] md:text-[20px] lg:text-[24px] font-semibold">
          {title}
        </h3>
        <p className="text-[12px] sm:text-[14px] md:text-[16px] lg:text-[20px] text-[var(--medium-text)] font-urbanist">
          {description}
        </p>
      </div>
    </div>
  );
};

const WhatDeliver = () => {

  const features = [
  {
    title: "Digital Transformation",
    description: "Align technology with business goals for measurable growth.",
  },
  {
    title: "Cloud & Infrastructure",
    description: "Secure, scalable, and performance-optimized systems.",
  },
  {
    title: "AI & Automation",
    description: "Empowering decision-making and efficiency.",
  },
  {
    title: "Cybersecurity",
    description: "Trust through proactive defense and compliance.",
  },
  {
    title: "Product Engineering",
    description: "From MVPs to enterprise systems built for scale.",
  },
  {
    title: "Data & Insights",
    description: "Turning raw data into actionable intelligence.",
  },
];

  return (
    <section className="px-4 sm:px-6 md:px-12 lg:px-[80px] xl:px-[120px] 2xl:px-[200px] 2xl:py-[84px] xl:py-[72px] lg:py-[60px] md:py-[52px] py-[40px] bg-background">
      <div>
        {/* Heading Section */}
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-[24px] sm:text-[32px] md:text-6xl lg:text-7xl font-light leading-tight">
            What <span className="font-semibold">We Deliver</span>
          </h2>
        
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 ">
          {features.map((feature, index) => (
            <FeatureCard 
              key={index} 
              title={feature.title} 
              description={feature.description}
              index={index}
              totalItems={features.length}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhatDeliver;
