import React from 'react';
import ServiceCard from '@/Components/ServiceCard';

const consultingServices = [
  {
    title: "Business Strategy",
    desc: "Turning business goals into measurable action plans."
  },
  {
    title: "Digital Transformation",
    desc: "Aligning processes and technology for smarter operations."
  },
  {
    title: "Product Roadmapping",
    desc: "Creating seamless digital journeys that connect user needs with business goals."
  },
  {
    title: "Market Research",
    desc: "Understanding competition, demand, and user needs."
  },
  {
    title: "Brand Strategy",
    desc: "Translating brand aesthetics into physical environments that inspire connection and creativity."
  },
  {
    title: "Innovation Consulting",
    desc: "Guiding teams to embrace change and experiment with purpose."
  }
];

const ConsultSection: React.FC = () => {
  return (
    <section className="bg-white 2xl:py-[84px] xl:py-[72px] lg:py-[60px] md:py-[52px] py-[40px]">
      <div className="px-4 sm:px-6 md:px-12 lg:px-[80px] xl:px-[120px] 2xl:px-[200px]">
        
        <div className="text-center">
          <h2 className="xl:text-[72px] lg:text-[64px] md:text-[52px] sm:text-[40px] text-[32px] font-bold tracking-tight text-black">
            Consult
          </h2>
          <p className="mt-[18px] xl:text-[40px] lg:text-[32px] md:text-[28px] sm:text-[24px] text-[20px] text-black font-semibold">
            It starts with clarity.
          </p>
          <p className="mx-auto mt-[16px] max-w-2xl xl:text-[24px] lg:text-[20px] md:text-[18px] sm:text-[16px] text-[14px] leading-8 text-[var(--medium-text)] font-urbanist">
            We help you define direction, simplify decisions, and create actionable roadmaps that drive sustainable growth.
          </p>
        </div>

        <div className="2xl:mt-[75px] xl:mt-[60px] lg:mt-[48px] md:mt-[40px] mt-[32px] grid grid-cols-1 lg:gap-8 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {consultingServices.map((service, i) => (
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

export default ConsultSection;