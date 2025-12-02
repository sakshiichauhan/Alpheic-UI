import React from 'react';

const HeroSection: React.FC = () => {
  return (
    <section className="bg-[radial-gradient(ellipse_50%_100%_at_top_right,#EDE6FE_10%,#FFFFFF_100%)] 2xl:pb-[84px] xl:pb-[72px] lg:pb-[60px] md:pb-[52px] pb-[40px] 2xl:pt-[188px] xl:pt-[170px] lg:pt-[150px] md:pt-[120px] pt-[110px]">
      <div className="px-4 sm:px-6 md:px-12 lg:px-[80px] xl:px-[120px] 2xl:px-[200px]
 ">

        <div className="flex min-[950px]:flex-row flex-col md:items-start items-center xl:gap-[64px] lg:gap-[48px] md:gap-[32px] sm:gap-[24px] gap-[4px]">
          
        <div className="2xl:min-w-[500px] xl:min-w-[450px] lg:min-w-[340px] md:min-w-[280px] sm:min-w-[300px] min-w-[180px]">
            <h2 className="2xl:text-[84px] xl:text-[70px] lg:text-[64px] md:text-[52px] sm:text-[40px] text-[40px] font-semibold tracking-tight text-black ">
            Contact Us
            </h2>
      </div>

          <div className="flex flex-col text-center md:text-left 2xl:gap-4 gap-2">
            <h3 className="2xl:text-[40px] lg:text-[32px] md:text-[28px] sm:text-[24px] text-[14px] font-semibold text-black ">
            We’d Love to Hear From You.
            </h3>
            <p className="2xl:text-[24px] lg:text-[20px] md:text-[18px] sm:text-[16px] text-[12px] font-urbanist text-[var(--hero-text)]">
            Got a vision, a question, a collaboration idea, or just want to explore what’s possible? Whether you're a founder, a team lead, an NGO, or a student with something big in mind — say hello. We're listening.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
};

export default HeroSection;