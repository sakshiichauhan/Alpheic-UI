import React from 'react';  

import RocketIcon from "@/assets/logo/Rocket.png";
import CheckCircleIcon from "@/assets/logo/Tik.png";
import SearchIcon from "@/assets/logo/Search.png";
import HandshakeIcon from "@/assets/logo/Hands.png";
import UsersIcon from "@/assets/logo/Puzzle.png";


interface FeatureCardProps {
  IconComponent: string;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ IconComponent, title, description }) => {
  return (
    <div className="border-1 border-[var(--border-color)] lg:p-[24px] md:p-[20px] p-[16px] lg:gap-[16px] md:gap-[12px] gap-[24px] h-full flex flex-row sm:flex-col items-center sm:items-start">
      <div className="">
        <img src={IconComponent as string} alt={title} className="lg:w-[61px] lg:h-[61px] md:w-[48px] md:h-[48px] w-[40px] h-[40px]" />
      </div>
      <div className="flex flex-col flex-1">
        <h3 className="lg:text-[24px] md:text-[20px] text-[16px] font-semibold text-[var(--medium-text)] font-urbanist text-left">{title}</h3>
        <p className="lg:text-[24px] md:text-[20px] text-[14px] text-[var(--medium-text)] font-urbanist text-left">{description}</p>
      </div>
    </div>
  );
};


const OpenToSection = () => {
  const features = [
    {
      IconComponent: RocketIcon,
      title: "Research-Driven",
      description: "Real insights before roadmap."
    },
    {
      IconComponent: CheckCircleIcon,
      title: "Modular",
      description: "Scope by function, phase, or goal."
    },
    {
      IconComponent: SearchIcon,
      title: "Transparent Pricing",
      description: "Sprint-based, retainer, or hybrid models"
    },

 
  ];
  const feature2=[ {
    IconComponent: HandshakeIcon,
    title: "Clear Timelines",
    description: "Commitments you can rely on."
  },
  {
    IconComponent: UsersIcon,
    title: "Custom Team",
    description: "Strategists, technologists, and creatives built around your needs"
  },];

  return (
    <section className="bg-white px-4 sm:px-6 md:px-12 lg:px-[80px] xl:px-[120px] 2xl:px-[200px] 2xl:py-[84px] xl:py-[72px] lg:py-[60px] md:py-[52px] py-[40px]">
      <div className="flex flex-col gap-[40px]">
        
        <div className="text-center flex flex-col items-center lg:gap-[24px] md:gap-[20px] gap-[16px]">
        <div className="flex flex-col items-center lg:gap-[16px] md:gap-[12px] gap-[8px]">
          <h2 className="
            font-semibold text-black 
            text-[32px] sm:text-[42px] md:text-[54px] lg:text-[64px] xl:text-[72px]
            leading-tight
          ">
          What Makes Alpheric <br/>Proposals Different
          </h2>
         
        </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 lg:gap-[24px] md:gap-[20px] gap-[16px]">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              IconComponent={feature.IconComponent}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 lg:gap-[24px] md:gap-[20px] gap-[16px]">
          {feature2.map((feature, index) => (
            <FeatureCard
              key={index}
              IconComponent={feature.IconComponent}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>

      </div>
    </section>
  );
};

export default OpenToSection;