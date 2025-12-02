import React from 'react';
import SubHeroImage from '@/assets/CareerPage/bg.png';

const SubHero: React.FC = () => {   

  return (
    <section 
      className="relative px-4 sm:px-6 md:px-12 lg:px-[80px] xl:px-[120px] 2xl:px-[200px] py-[96px] w-full bg-cover bg-center"
      style={{ backgroundImage: `url(${SubHeroImage})` }}
    >
      {/* Gradient Overlay */}
      <div 
        className="absolute top-0 left-0 right-0 bottom-0 bg-black/60"
        aria-hidden="true"
      />

      {/* Text Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white x-auto gap-[16px]">
        <h1 className="2xl:text-[48px] xl:text-[38px] lg:text-[32px] md:text-[30px] text-[28px] font-bold text-center">
          Work where ideas grow,<br className="block lg:hidden" /> people thrive,<br className="hidden lg:block" /> and<br className="block lg:hidden" /> innovation never stops.
        </h1>
        <p className="2xl:text-[28px] xl:text-[24px] lg:text-[20px] md:text-[18px] text-[15px] text-center font-urbanist">
          Join a culture that values creativity, ownership, and collaboration.
        </p>
      </div>
    </section>
  );
};

export default SubHero;