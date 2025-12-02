import React from 'react';  

import RocketIcon from "@/assets/logo/Rocket.png";
import CheckCircleIcon from "@/assets/logo/Tik.png";
import SearchIcon from "@/assets/logo/Search.png";
import HandshakeIcon from "@/assets/logo/Hands.png";
import UsersIcon from "@/assets/logo/Puzzle.png";
import MessageSquareTextIcon from "@/assets/logo/Chat.png";

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
      title: "Starting a New Project",
      description: "Turn ideas into strategy and execution."
    },
    {
      IconComponent: CheckCircleIcon,
      title: "Validating a Startup Idea",
      description: "Test, refine, and launch smarter."
    },
    {
      IconComponent: SearchIcon,
      title: "Featuring You in Our Insight Series",
      description: "Share your voice with our audience."
    },
    {
      IconComponent: HandshakeIcon,
      title: "Partnering with a School, NGO, or Academy",
      description: "Empower education through digital design."
    },
    {
      IconComponent: UsersIcon,
      title: "Collaborating as a Freelancer / Consultant",
      description: "Join hands to co-build innovation."
    },
    {
      IconComponent: MessageSquareTextIcon,
      title: "Just Having a Meaningful Conversation",
      description: "Every great story starts with a hello."
    }
  ];

  return (
    <section className="bg-white px-4 sm:px-6 md:px-12 lg:px-[80px] xl:px-[120px] 2xl:px-[200px] 2xl:py-[84px] xl:py-[72px] lg:py-[60px] md:py-[52px] py-[40px]">
      <div className="flex flex-col gap-[40px]">
        
        <div className="text-center flex flex-col items-center lg:gap-[24px] md:gap-[20px] gap-[16px]">
        <div className="flex flex-col items-center lg:gap-[16px] md:gap-[12px] gap-[8px]">
          <h2 className="
            font-semibold text-black font-urbanist
            text-[32px] sm:text-[42px] md:text-[54px] lg:text-[64px] xl:text-[72px]
            leading-tight
          ">
            We're Open To...
          </h2>
          <p className="
            text-[12px] sm:text-[16px] md:text-[18px] lg:text-[22px] 2xl:text-[24px]
            text-[var(--hero-text)] font-urbanist
            max-w-[900px] mx-auto
            leading-snug sm:leading-normal
          ">
            Integral to our approach is a comprehensive user research phase, discovering general and niche audience needs through quantitative and qualitative research.
          </p>
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

      </div>
    </section>
  );
};

export default OpenToSection;