import React from 'react';
import { ArrowUpRight } from 'lucide-react'; // Using lucide-react for the button icon
import Business from '@/assets/CareerPage/Business.png';
import Design from '@/assets/CareerPage/Design.png';
import Tech from '@/assets/CareerPage/Tech.png';

// An interface for our program card data
interface ProgramCardData {
  icon: React.ReactNode;
  title: string;
  description: string;
}

// Storing data in an array makes the component easy to manage
const programsData: ProgramCardData[] = [
  {
    icon: (
      <img src={Tech} alt="Tech" className="h-12 w-12" />
    ),
    title: 'Tech Launchpad',
    description: '(for developers & engineers)',
  }, 
  {
    icon: (
      <img src={Design} alt="Design" className="h-12 w-12" />
    ),
    title: 'Design Apprentice',
    description: '(for UX/UI & creatives)',
  },
  {
    icon: (
      <img src={Business} alt="Business" className="h-12 w-12" />
    ),
    title: 'Business Sprint',
    description: '(for growth & research interns)',
  },
];

const InternshipsSection: React.FC = () => {
  return (
    <section className="px-4 sm:px-6 md:px-12 lg:px-[80px] xl:px-[120px] 2xl:px-[200px] 2xl:py-[84px] xl:py-[72px] lg:py-[60px] md:py-[52px] py-[40px]">
      <div className=" mx-auto text-center flex flex-col items-center lg:gap-[24px] md:gap-[20px] gap-[16px]">
        
        {/* Header Text */}
        <div className='flex flex-col items-center lg:gap-[16px] md:gap-[12px] gap-[8px]'>
        <h2 className="2xl:text-[72px] xl:text-[60px] lg:text-[48px] md:text-[36px] text-[32px] text-black lg:font-semibold font-medium ">
          Internships & Programs
        </h2>
        <div>
        <p className="hidden lg:block 2xl:text-[32px] xl:text-[30px] lg:text-[20px] md:text-[18px] text-[16px] text-black font-urbanist mx-auto">
          Kickstart your career with Alpheric's internship programs in
        </p>
        <p className="hidden lg:block 2xl:text-[32px] xl:text-[30px] lg:text-[20px] md:text-[18px] text-[16px] text-black font-urbanist mx-auto font-semibold">
          Technology, Design, and Business.
        </p>
        <p className="block lg:hidden 2xl:text-[32px] xl:text-[30px] lg:text-[20px] md:text-[18px] sm:text-[16px] text-[14px] text-black font-urbanist mx-auto font-semibold">
        Kickstart your career with Alpheric's internship programs in Technology, Design, and Business.
        </p>
        </div>
        

        <p className="2xl:text-[24px] xl:text-[20px] lg:text-[16px] md:text-[14px] text-[12px] text-black font-urbanist">
          Work alongside mentors who help you grow, experiment, and contribute meaningfully.
        </p>
        </div>
        

        {/* Program Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 lg:gap-[24px] md:gap-[20px] gap-[16px] w-full">
          {programsData.map((program, index) => (
            <div 
              key={index} 
              className="border border-[var(--border-color)] w-full sm:w-auto items-center justify-between sm:justify-start sm:items-start lg:p-[24px] md:p-[20px] p-[16px] flex flex-row sm:flex-col lg:gap-[16px] md:gap-[12px] gap-[24px]"
            >
              <div className="bg-[#E5F5FF] p-[8px] w-fit">
                {program.icon}
              </div>
              <div className="flex flex-col flex-1">
                <h3 className="lg:text-[24px] md:text-[20px] text-[16px] font-semibold text-[var(--hero-text)] font-urbanist text-left">{program.title}</h3>
                <p className="lg:text-[16px] md:text-[14px] text-[12px] text-[var(--hero-text)] font-urbanist text-left">{program.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* "View All Projects" Button */}
        <div className="lg:mt-[24px] md:mt-[20px] mt-[16px]">
          <button className="inline-flex items-center lg:text-[24px] md:text-[20px] text-[16px] gap-2 lg:px-[32px] md:px-[24px] px-[16px] lg:py-[12px] md:py-[10px] py-[8px] border border-[var(--color)] text-black ">
            <span>View All Projects</span>
            <ArrowUpRight className="lg:h-[40px] lg:w-[40px] md:w-[32px] h-[24px] w-[24px]" />
          </button>
        </div>

      </div>
    </section>
  );
};

export default InternshipsSection;