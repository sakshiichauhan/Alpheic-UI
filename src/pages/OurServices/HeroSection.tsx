import React from 'react';

const HeroSection: React.FC = () => {
  return (
    <section className="bg-[radial-gradient(ellipse_50%_100%_at_top_right,#EDE6FE_10%,#FFFFFF_100%)] 2xl:pb-[84px] xl:pb-[72px] lg:pb-[60px] md:pb-[52px] pb-[40px] 2xl:pt-[188px] xl:pt-[170px] lg:pt-[150px] md:pt-[120px] pt-[110px]">
      <div className="px-4 sm:px-6 md:px-12 lg:px-[80px] xl:px-[120px] 2xl:px-[200px]
 ">

        <div className="flex min-[950px]:flex-row flex-col items-start xl:gap-[64px] lg:gap-[48px] md:gap-[32px] sm:gap-[24px] gap-[16px]">
          
          <div className="2xl:min-w-[510px] xl:min-w-[420px] lg:min-w-[380px] md:min-w-[320px] sm:min-w-[240px] min-w-[200px]">
            <h2 className="2xl:text-[84px] xl:text-[72px] lg:text-[64px] md:text-[52px] sm:text-[40px] text-[32px] font-bold tracking-tight text-black ">
              Our Services
            </h2>
          </div>

          <div className="">
            <h3 className="2xl:text-[40px] lg:text-[32px] md:text-[28px] sm:text-[24px] text-[20px] font-semibold text-black ">
              Powering ideas through technology, design, and intelligence.
            </h3>
            <p className="2xl:text-[24px] lg:text-[20px] md:text-[18px] sm:text-[16px] text-[14px] font-urbanist text-[var(--hero-text)]">
              Alpheric delivers end-to-end digital solutions from strategy and product development to hosting, security, and growth.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
};

export default HeroSection;