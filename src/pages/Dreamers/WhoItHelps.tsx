import React from 'react';
import Logo from "@/assets/logo/Circle.png";
import Logo2 from "@/assets/logo/Laptop.png";
import Logo3 from "@/assets/logo/Rocket.png";
import Logo4 from "@/assets/logo/People.png";

type Feature = {
  id: number;
  icon: string; 
  title: string;
  description: string;
};

const features: Feature[] = [
  {
    id: 1,
    icon: Logo,
    title: 'First-time founders',
    description: 'Have an idea and want a credible start.',
  },
  {
    id: 2,
    icon: Logo2, 
    title: 'Creators and freelancers',
    description: 'Package a skill into a brand and offer.',
  },
  {
    id: 3,
    icon: Logo3,
    title: 'Side projects',
    description: 'Test a concept without heavy spend.',
  },
  {
    id: 4,
    icon: Logo4, 
    title: 'Student teams',
    description: 'Make a working story for demo days.',
  },
];


// --- 2. Reusable Feature Card Component ---

const FeatureCard: React.FC<{ feature: Feature }> = ({ feature }) => {
  const Icon = feature.icon as string;

  return (
    <div className="flex flex-col 2xl:gap-4 gap-2 border border-[var(--border-color)] bg-white xl:p-6 lg:p-5 p-4 ">
      
     <img src={Icon as string} alt={feature.title} className="text-black 2xl:w-[61px] 2xl:h-[61px] xl:w-[52px] xl:h-[52px] lg:w-[48px] lg:h-[48px] md:w-[40px] md:h-[40px] w-[32px] h-[32px]" />
      
      <div>
      <h3 className="2xl:text-[24px] xl:text-[20px] lg:text-[18px] md:text-[16px] text-[14px] font-semibold text-black">
        {feature.title}
      </h3>
      
      <p className="2xl:text-[24px] xl:text-[20px] lg:text-[18px] md:text-[16px] text-[14px] text-[var(--medium-text)] font-urbanist">
        {feature.description}
      </p>
      </div>
      
    </div>
  );
};


// --- 3. Main Section Component ---

const WhoItHelpsSection: React.FC = () => {
  return (
    <section className="bg-white 2xl:py-[84px] xl:py-[72px] lg:py-[60px] md:py-[52px] py-[40px]">
      <div className="px-4 sm:px-6 md:px-12 lg:px-[80px] xl:px-[120px] 2xl:px-[200px]">
        
        {/* Header */}
        <h1 className="text-center 2xl:text-[72px] xl:text-[60px] lg:text-[48px] md:text-[40px] sm:text-[32px] text-[24px] font-bold text-black lg:mb-[40px] md:mb-[32px] mb-[24px]">
          Who it helps
        </h1>
        
        {/* Responsive Grid: Stacks on mobile, 4 columns on large screens */}
        <div className="grid grid-cols-1 lg:gap-6 md:gap-4 gap-2 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <FeatureCard key={feature.id} feature={feature} />
          ))}
        </div>
        
      </div>
    </section>
  );
};

export default WhoItHelpsSection;