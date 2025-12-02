import React from 'react';
import baground1 from "@/assets/Pilot_assets/bg.png";
import o1 from "@/assets/CareerPage/o1.png";
import o2 from "@/assets/CareerPage/o2.png";
import o3 from "@/assets/CareerPage/o3.png";
import o4 from "@/assets/CareerPage/o4.png";

// Define the type for a single hiring step
interface HiringStep {
  id: string;
  title: string;
  description: string;
  image: string;
}

// Data for the hiring steps
const hiringSteps: HiringStep[] = [
  {
    id: '01',
    title: 'Apply',
    description: 'Submit your profile and tell us what drives you.',
    image: o1,
  },
  {
    id: '02',
    title: 'Connect',
    description: 'A short discovery call with our team.',
    image: o2,
  },
  {
    id: '03',
    title: 'Challenge',
    description: 'A task or discussion to assess creativity and problem-solving.',
    image: o3,
  },
  {
    id: '04',
    title: 'Collaborate',
    description: 'Final conversation with your future mentor or lead.',
    image: o4,
  },
];

const HiringProcess: React.FC = () => {
  return (
    <section className="p-[24px]">
      
      <div className="relative h-full p-[3px] bg-gradient-to-br from-white/50 via-gray-400/50 to-gray-400/50">
    <div className="relative overflow-hidden py-[84px] px-4 sm:px-6 md:px-12 lg:px-[80px] xl:px-[120px] 2xl:px-[224px] bg-gradient-to-b from-[#62D5E8] to-[#678DFE] text-white">
      
      {/* Background Image - at the very bottom */}
      <img
        src={baground1}
        alt="Decorative background"
        className="absolute inset-0 w-full h-full object- cover z-0"
      />

      {/* Black Overlay - sits on top of the image */}
      <div className="absolute inset-0 z-[1] bg-black/20" />

      {/* --- MODIFIED SECTION 2 --- */}
      {/* Decorative Circles - now with z-[2] to be above the overlay */}
      {/* Top Left Circle */}
      <div className="absolute hidden md:block top-3 left-12 w-[240px] h-[240px] rounded-full border-[7px] border-white  -translate-x-1/2 -translate-y-1/2 z-[2]"></div>
      {/* Mid Left Circle */}
      <div className="absolute hidden md:block bottom-5 left-5 lg:w-[408px] lg:h-[400px] w-[360px] h-[360px] rounded-full border-[7px] border-white -translate-x-1/2 translate-y-1/2 z-[2]"></div>
      {/* Bottom Right Circle */}
        <div className="absolute hidden md:block top-5 -right-10 lg:w-[164px] h-[160px] rounded-full border-[7px] border-white translate-x-1/2 -translate-y-1/2 z-[2]"></div>
      {/* Mid Right Circle */}
      <div className="absolute hidden md:block bottom-10 -right-10 w-[264px] h-[264px] rounded-full border-[7px] border-white translate-x-1/2 translate-y-1/2 z-[2]"></div>


      {/* Main content container - has z-10, so it's on top of everything else */}
      <div className="relative z-10 flex flex-col items-center gap-[42px]">
        <h2 className="2xl:text-[72px] xl:text-[60px] lg:text-[48px] md:text-[36px] text-[32px] font-semibold text-center">
          Our Hiring Process
        </h2>
        <div className="flex flex-col lg:flex-row gap-[24px] items-center lg:items-start w-full">
          {hiringSteps.map((step, index) => (
            <React.Fragment key={step.id}>
              <div className="relative flex flex-col items-center text-center bg-transparent w-full lg:w-auto">
                {/* Step Number */}
                <img src={step.image} alt={step.title} className="2xl:w-[94px] xl:w-[80px] lg:w-[64px] md:w-[52px] w-[46px] h-auto mb-[16px]" />

                <h3 className="2xl:text-[28px] xl:text-[26px] lg:text-[24px] md:text-[22px] text-[20px] font-semibold text-white mb-2">
                  {step.title}
                </h3>
                <p className="2xl:text-[24px] xl:text-[20px] lg:text-[18px] md:text-[16px] text-[14px] font-urbanist text-white w-full lg:max-w-[325px] text-center px-4 sm:px-0 mx-auto">
                  {step.description}
                </p>
              </div>
              {/* Dotted line separator - only show between items (3 lines) */}
              {index < hiringSteps.length - 1 && (
                <>
                  {/* Vertical line for mobile/tablet */}
                  <div className="flex lg:hidden h-[60px] items-center justify-center">
                    <div className="h-full min-w-[3.50px] border-l-[3.50px] border-dashed border-white border-opacity-50"></div>
                  </div>
                  {/* Horizontal line for desktop */}
                  <div className="hidden lg:block flex-1 min-w-[24px] self-stretch relative">
                    <div className="absolute top-[47px] -left-15 -right-15 h-0 border-t-[3.50px] border-dashed border-white border-opacity-50"></div>
                  </div>
                </>
              )}
            </React.Fragment>
          ))}
        </div>
        
        <p className="2xl:text-[24px] xl:text-[22px] lg:text-[20px] md:text-[18px] text-[16px] font-urbanist text-white font-semibold text-center z-10">
          We value skill, passion, and mindset — not just degrees or titles.
        </p>
        </div>
      </div>
      </div>
    </section>
  );
};

export default HiringProcess;