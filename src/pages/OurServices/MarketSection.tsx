import React from 'react';
import ServiceCard from '@/Components/ServiceCard';

const marketServices = [
  {
    title: "Social Media Marketing",
    desc: "Building community and visibility across platforms."
  },
  {
    title: "Campaign Management",
    desc: "Planning and executing targeted ad campaigns."
  },
  {
    title: "Influencer Collaboration",
    desc: "Leveraging creators to enhance brand reach."
  },
  {
    title: "Email Marketing",
    desc: "Driving engagement through personalized communication."
  },
  {
    title: "Paid Ads",
    desc: "Generating instant traction with performance-based advertising."
  },
  {
    title: "Analytics & Optimization",
    desc: "Tracking metrics to refine and scale results."
  }
];

const MarketSection: React.FC = () => {
  return (
    <section className="bg-white 2xl:py-[84px] xl:py-[72px] lg:py-[60px] md:py-[52px] py-[40px]">
      <div className="px-4 sm:px-6 md:px-12 lg:px-[80px] xl:px-[120px] 2xl:px-[200px]">
        
        <div className="text-center">
          <h2 className="xl:text-[72px] lg:text-[64px] md:text-[52px] sm:text-[40px] text-[32px] font-bold tracking-tight text-black">
            Market
          </h2>
          <p className="mt-[18px] xl:text-[40px] lg:text-[32px] md:text-[28px] sm:text-[24px] text-[20px] text-black font-semibold">
            Make noise that matters.
          </p>
          <p className="mx-auto mt-[16px] max-w-3xl xl:text-[24px] lg:text-[20px] md:text-[18px] sm:text-[16px] text-[14px] leading-8 text-[var(--medium-text)] font-urbanist">
            We help brands grow with intelligent marketing strategies that attract, engage, and convert.
          </p>
        </div>

        <div className="2xl:mt-[75px] xl:mt-[60px] lg:mt-[48px] md:mt-[40px] mt-[32px] grid grid-cols-1 lg:gap-8 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {marketServices.map((service, i) => (
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

export default MarketSection;