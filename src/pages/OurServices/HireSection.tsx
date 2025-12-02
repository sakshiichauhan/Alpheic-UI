import React from 'react';
import ServiceCard from '@/Components/ServiceCard';

const hireRoles = [
  {
    title: "UI/UX Designers",
    desc: "Designing interfaces that engage and convert."
  },
  {
    title: "App Developers",
    desc: "Creating high-performing apps across devices."
  },
  {
    title: "AI Engineers",
    desc: "Implementing automation and intelligence into systems."
  },
  {
    title: "Cloud Architects",
    desc: "Structuring scalable, efficient cloud environments."
  },
  {
    title: "Cybersecurity Specialists",
    desc: "Protecting systems and maintaining compliance."
  },
  {
    title: "Growth Marketers",
    desc: "Expanding reach through strategic digital campaigns."
  }
];

const HireSection: React.FC = () => {
  return (
    <section className="bg-white 2xl:py-[84px] xl:py-[72px] lg:py-[60px] md:py-[52px] py-[40px]">
      <div className="px-4 sm:px-6 md:px-12 lg:px-[80px] xl:px-[120px] 2xl:px-[200px]">
        
        <div className="text-center">
          <h2 className="xl:text-[72px] lg:text-[64px] md:text-[52px] sm:text-[40px] text-[32px] font-bold tracking-tight text-black">
            Hire
          </h2>
          <p className="mt-[18px] xl:text-[40px] lg:text-[32px] md:text-[28px] sm:text-[24px] text-[20px] text-black font-semibold">
            Talent on demand.
          </p>
          <p className="mx-auto mt-[16px] max-w-3xl xl:text-[24px] lg:text-[20px] md:text-[18px] sm:text-[16px] text-[14px] leading-8 text-[var(--medium-text)] font-urbanist">
            We connect you with vetted, world-class talent to scale your team and accelerate projects.
          </p>
        </div>

        <div className="2xl:mt-[75px] xl:mt-[60px] lg:mt-[48px] md:mt-[40px] mt-[32px] grid grid-cols-1 lg:gap-8 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {hireRoles.map((service, i) => (
            <ServiceCard
              key={i}
              title={service.title}
              description={service.desc}
              href="/LetsTalk"
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HireSection;