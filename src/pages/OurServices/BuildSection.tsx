import React from 'react';
import ServiceCard from '@/Components/ServiceCard';

const buildServices = [
  {
    title: "SaaS Development",
    desc: "Building software solutions that scale with demand."
  },
  {
    title: "E-Commerce Platforms",
    desc: "Creating secure and conversion-focused online stores."
  },
  {
    title: "CRM & ERP Systems",
    desc: "Streamlining customer and business management."
  },
  {
    title: "API Integration",
    desc: "Connecting systems for smooth data exchange."
  },
  {
    title: "MVP Development",
    desc: "Launching lean prototypes to validate ideas fast."
  },
  {
    title: "Automation Workflows",
    desc: "Simplifying repetitive tasks with intelligent automation."
  }
];

const BuildSection: React.FC = () => {
  return (
    <section className="bg-white 2xl:py-[84px] xl:py-[72px] lg:py-[60px] md:py-[52px] py-[40px]">
      <div className="px-4 sm:px-6 md:px-12 lg:px-[80px] xl:px-[120px] 2xl:px-[200px]">
        
        <div className="text-center">
          <h2 className="xl:text-[72px] lg:text-[64px] md:text-[52px] sm:text-[40px] text-[32px] font-bold tracking-tight text-black">
            Build
          </h2>
          <p className="mx-auto mt-[18px] max-w-3xl xl:text-[24px] lg:text-[20px] md:text-[18px] sm:text-[16px] text-[14px] leading-8 text-[var(--medium-text)] font-urbanist">
            We develop scalable digital products and platforms engineered for speed, security, and impact.
          </p>
        </div>

        <div className="2xl:mt-[75px] xl:mt-[60px] lg:mt-[48px] md:mt-[40px] mt-[32px] grid grid-cols-1 lg:gap-8 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {buildServices.map((service, i) => (
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

export default BuildSection;    