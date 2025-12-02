import React from 'react';
import ServiceCard from '@/Components/ServiceCard';

const hostServices = [
  {
    title: "VPS Hosting",
    desc: "Flexible virtual private environments for growing businesses."
  },
  {
    title: "Dedicated Servers",
    desc: "Full control and performance for enterprise workloads."
  },
  {
    title: "Backup & Recovery",
    desc: "Keeping your data safe and restorable at any time."
  },
  {
    title: "CDN Optimization",
    desc: "Accelerating website speed and global accessibility."
  },
  {
    title: "DevOps Support",
    desc: "Automating deployment and scaling processes."
  },
  {
    title: "Load Balancing",
    desc: "Managing traffic to maintain uptime and stability."
  }
];

const HostSection: React.FC = () => {
  return (
    <section className="bg-white 2xl:py-[84px] xl:py-[72px] lg:py-[60px] md:py-[52px] py-[40px]">
      <div className="px-4 sm:px-6 md:px-12 lg:px-[80px] xl:px-[120px] 2xl:px-[200px]">
        
        <div className="text-center">
          <h2 className="xl:text-[72px] lg:text-[64px] md:text-[52px] sm:text-[40px] text-[32px] font-bold tracking-tight text-black">
            Host
          </h2>
          <p className="mt-[18px] xl:text-[40px] lg:text-[32px] md:text-[28px] sm:text-[24px] text-[20px] text-black font-semibold">
            Power that never sleeps.
          </p>
          <p className="mx-auto mt-[16px] max-w-3xl xl:text-[24px] lg:text-[20px] md:text-[18px] sm:text-[16px] text-[14px] leading-8 text-[var(--medium-text)] font-urbanist">
            We ensure reliability, performance, and uptime through managed hosting and cloud infrastructure.
          </p>
        </div>

        <div className="2xl:mt-[75px] xl:mt-[60px] lg:mt-[48px] md:mt-[40px] mt-[32px] grid grid-cols-1 lg:gap-8 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {hostServices.map((service, i) => (
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

export default HostSection;