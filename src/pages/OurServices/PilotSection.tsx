import React from 'react';
import ServiceCard from '@/Components/ServiceCard';

const pilotServices = [
  {
    title: "Product Pilot",
    desc: "Designing interfaces that engage and convert."
  },
  {
    title: "Market Pilot",
    desc: "Creating high-performing apps across devices."
  },
  {
    title: "Brand Pilot",
    desc: "Implementing automation and intelligence into systems."
  },
  {
    title: "Automation Pilot",
    desc: "Structuring scalable, efficient cloud environments."
  },
  {
    title: "Digital Transformation Pilot",
    desc: "Protecting systems and maintaining compliance."
  },
  {
    title: "Experience Pilot",
    desc: "Expanding reach through strategic digital campaigns."
  },
  {
    title: "Performance Pilot",
    desc: "Track ROI through measurable, short-term initiatives."
  }
];

const PilotSection: React.FC = () => {
  return (
    <section className="bg-white 2xl:py-[84px] xl:py-[72px] lg:py-[60px] md:py-[52px] py-[40px]">
      <div className="px-4 sm:px-6 md:px-12 lg:px-[80px] xl:px-[120px] 2xl:px-[200px]">
        
        <div className="text-center">
          <h2 className="xl:text-[72px] lg:text-[64px] md:text-[52px] sm:text-[40px] text-[32px] font-bold tracking-tight text-black">
            Pilot
          </h2>
          <p className="mt-[18px] xl:text-[40px] lg:text-[32px] md:text-[28px] sm:text-[24px] text-[20px] text-black font-semibold">
            Start small. Think big.
          </p>
          <p className="mx-auto mt-[16px] max-w-3xl xl:text-[24px] lg:text-[20px] md:text-[18px] sm:text-[16px] text-[14px] leading-8 text-[var(--medium-text)] font-urbanist">
            Our pilot programs help you test, validate, and scale ideas with confidence.
          </p>
        </div>

        <div className="2xl:mt-[75px] xl:mt-[60px] lg:mt-[48px] md:mt-[40px] mt-[32px] grid grid-cols-1 lg:gap-8 gap-6 sm:grid-cols-2 lg:grid-cols-3 justify-center items-center">
          {pilotServices.map((service, i) => {
            const isLast = i === pilotServices.length - 1;
            const centerOnLgThreeCol = pilotServices.length % 3 === 1;
            const centerOnMdTwoCol = pilotServices.length % 2 === 1;

            return (
              <div
                key={i}
                className={`${
                  isLast && centerOnLgThreeCol ? 'lg:col-start-2 lg:col-span-1 lg:justify-self-stretch' : ''
                } ${
                  isLast && centerOnMdTwoCol ? 'md:col-span-2 md:justify-self-center' : ''
                }`}
              >
                <ServiceCard
                  title={service.title}
                  description={service.desc}
                  href="/LetsTalk"
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default PilotSection;