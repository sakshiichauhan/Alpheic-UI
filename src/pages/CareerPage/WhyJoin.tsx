import React from 'react';
import dummy3 from '@/assets/dummy3.png';
// An interface for our card data for type safety
interface BenefitCardProps {
  imageSrc: string;
  // We use React.ReactNode to allow for JSX (like <strong> tags) in our data
  line1: React.ReactNode;
}

// Storing the data in an array makes the component clean and easy to update
const benefitsData: BenefitCardProps[] = [
  {
    imageSrc: dummy3,
    line1: <>Work with <span className="font-semibold">cutting-edge technologies</span> in AI, Cloud, and Automation</>
  },
  {
    imageSrc: dummy3,
    line1: <>Solve <span className="font-semibold">real-world problems</span> across multiple industries</>,
  },
  {
    imageSrc: dummy3,
    line1: <>Be part of a <span className="font-semibold">multi-brand ecosystem</span> (Aimshala, HSWF, Hostripples, BOS & more)</>,
  },
  {
    imageSrc: dummy3,
    line1: <>Collaborate with <span className="font-semibold">mentors, innovators, and change-makers</span></>,
  },
  {
    imageSrc: dummy3,
    line1: <>Experience <span className="font-semibold">flexibility, freedom, and ownership</span> in every role</>,
  },
];

// A helper component for individual cards to keep the main component cleaner
const BenefitCard: React.FC<BenefitCardProps> = ({ imageSrc, line1 }) => {
  return (
    <div className="flex flex-col w-full max-w-[490px]">
      <div className="overflow-hidden ">
        <img 
          src={imageSrc} 
          alt="" 
          className="w-full h-auto object-cover aspect-[2/1] transition-transform duration-300 hover:scale-105" 
        />
      </div>
      <div className="text-left lg:p-[24px] md:p-[20px] p-[16px]">
        <p className="2xl:text-[28px] xl:text-[24px] lg:text-[20px] md:text-[18px] text-[16px] text-black font-urbanist">
          {line1}
        </p>
      </div>
    </div>
  );
};


const WhyJoinSection: React.FC = () => {
  return (
    <section className="px-4 sm:px-6 md:px-12 lg:px-[80px] xl:px-[120px] 2xl:px-[200px] 2xl:py-[84px] xl:py-[72px] lg:py-[60px] md:py-[52px] py-[40px]">
      <div className=" mx-auto text-center flex flex-col items-center gap-[40px]">

        {/* Section Title */}
        <h2 className="2xl:text-[72px] xl:text-[60px] lg:text-[48px] md:text-[36px] text-[32px] text-black ">
          Why <span className="font-bold">Join Alpheric</span>
        </h2>

        {/* Cards Container */}
        <div className="flex flex-col items-center lg:gap-[24px] md:gap-[20px] gap-[8px]">
          
          {/* Top Row (3 items) */}
          <div className="flex flex-col md:flex-row lg:gap-[24px] md:gap-[20px] gap-[8px] w-full justify-center">
            {benefitsData.slice(0, 3).map((benefit, index) => (
              <BenefitCard key={index} {...benefit} />
            ))}
          </div>
          
          {/* Bottom Row (2 items) */}
          <div className="flex flex-col md:flex-row lg:gap-[24px] md:gap-[20px] gap-[8px] w-full justify-center md:max-w-[68%]">
            {benefitsData.slice(3, 5).map((benefit, index) => (
              <BenefitCard key={index} {...benefit} />
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default WhyJoinSection;