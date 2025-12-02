import React from 'react';
import ServiceCard from '@/Components/ServiceCard';

const designServices = [
  {
    title: "Logo Design",
    desc: "Creating symbols that define your identity."
  },
  {
    title: "Brand Guidelines",
    desc: "Ensuring consistent visual and tonal identity."
  },
  {
    title: "Website Design",
    desc: "Designing intuitive, modern, and responsive interfaces."
  },
  {
    title: "Wireframing",
    desc: "Structuring ideas into seamless user flows."
  },
  {
    title: "Motion & Interaction Design",
    desc: "Adding energy and personality through animation."
  },
  {
    title: "Design Systems",
    desc: "Building scalable design frameworks for future growth."
  },
  {
    title: "Space Design",
    desc: "Translating brand aesthetics into physical environments that inspire connection and creativity."
  }
];

const DesignSection: React.FC = () => {
  return (
    <section className="bg-white 2xl:py-[84px] xl:py-[72px] lg:py-[60px] md:py-[52px] py-[40px]">
      <div className="px-4 sm:px-6 md:px-12 lg:px-[80px] xl:px-[120px] 2xl:px-[200px]">
        
        <div className="text-center">
          <h2 className="xl:text-[72px] lg:text-[64px] md:text-[52px] sm:text-[40px] text-[32px] font-bold tracking-tight text-black">
            Design
          </h2>
          <p className="mt-[18px] xl:text-[40px] lg:text-[32px] md:text-[28px] sm:text-[24px] text-[20px] text-black font-semibold">
            Where creativity meets purpose.
          </p>
          <p className="mx-auto mt-[16px] max-w-3xl xl:text-[24px] lg:text-[20px] md:text-[18px] sm:text-[16px] text-[14px] leading-8 text-[var(--medium-text)] font-urbanist">
            We craft experiences that connect visually, functionally, and emotionally, bringing your brand to life.
          </p>
        </div>

        <div className="2xl:mt-[75px] xl:mt-[60px] lg:mt-[48px] md:mt-[40px] mt-[32px] grid grid-cols-1 lg:gap-8 gap-6 sm:grid-cols-2 lg:grid-cols-3 justify-center items-center">
          {designServices.map((service, i) => {
            const isLast = i === designServices.length - 1;
            const centerOnLgThreeCol = designServices.length % 3 === 1; 

            return (
              <div
                key={i}
                className={`${
                  isLast && centerOnLgThreeCol ? 'lg:col-start-2 lg:col-span-1' : ''
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

export default DesignSection;