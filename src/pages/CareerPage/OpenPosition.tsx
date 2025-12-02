import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Positions from '@/assets/CareerPage/Positions.png';
import { ArrowRight } from 'lucide-react';

// Define the types for our data structure using TypeScript
interface Job {
  id: string;
  title: string;
  tags: string[];
}

interface Department {
  name: string;
  jobs: Job[];
}

// --- Mock Data ---
// In a real application, you would fetch this data from an API.
const departments: Department[] = [
  {
    name: 'Tech & Dev',
    jobs: [
      {
        id: 'senior-executive-operations',
        title: 'Technical Support Expert',
        tags: ['Full-time', 'Remote / Onsite'],
      },
    ],
  },
  {
    name: 'Tech & Dev',
    jobs: [
      {
        id: 'technical-support-expert-2',
        title: 'Technical Support Expert',
        tags: ['Full-time', 'Remote / Onsite', 'Full-time'],
      },
      {
        id: 'software-engineer-backend',
        title: 'Software Engineer (Backend)',
        tags: ['Full-time', 'Onsite'],
      },
      {
        id: 'devops-specialist',
        title: 'DevOps Specialist',
        tags: ['Full-time', 'Remote'],
      },
    ],
  },
  {
    name: 'Design & Creative',
    jobs: [
      {
        id: 'ui-ux-designer',
        title: 'UI/UX Designer',
        tags: ['Full-time', 'Remote'],
      },
      {
        id: 'graphic-designer',
        title: 'Graphic Designer',
        tags: ['Part-time', 'Onsite'],
      },
    ],
  },
  {
    name: 'Sales & Marketing',
    jobs: [
      {
        id: 'account-executive',
        title: 'Account Executive',
        tags: ['Full-time', 'Onsite'],
      },
      {
        id: 'content-marketing-manager',
        title: 'Content Marketing Manager',
        tags: ['Full-time', 'Remote'],
      },
    ],
  },
  {
    name: 'Customer Support',
    jobs: [
      {
        id: 'customer-success-manager',
        title: 'Customer Success Manager',
        tags: ['Full-time', 'Remote / Onsite'],
      },
    ],
  },
];

const ChevronIcon = ({ isOpen }: { isOpen: boolean }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={`lg:h-6 lg:w-6 h-[18px] w-[18px] transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
  </svg>
);

// --- The Main Component ---

const OpenPositions: React.FC = () => {
  // State to track the index of the currently open accordion item.
  // We initialize it to `1` to have the second item open by default, like in the image.
  const [openIndex, setOpenIndex] = useState<number | null>(1);

  // Function to handle clicking on an accordion header
  const handleToggle = (index: number) => {
    // If the clicked item is already open, close it. Otherwise, open it.
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="bg-white flex items-center justify-center font-sans px-4 sm:px-6 md:px-12 lg:px-[80px] xl:px-[120px] 2xl:px-[225px] lg:py-[64px] md:py-[52px] py-[40px]">
      <div className="w-full flex flex-col gap-[24px]">
        <h1 className="2xl:text-[72px] xl:text-[60px] lg:text-[48px] md:text-[40px] sm:text-[38px] text-[32px] font-semibold text-center text-black">
          Open Positions
        </h1>
        <div className="flex flex-col lg:gap-[24px] md:gap-[20px] gap-[8px]">
          {departments.map((dept, index) => {
            const isOpen = openIndex === index;
            return (
              <div key={index} className={`overflow-hidden bg-white ${isOpen ? 'border-[2px] border-[#EEEEEE]' : 'border-b-[2px] border-[#EEEEEE]'}`}>
                {/* Accordion Header */}
                <button
                  onClick={() => handleToggle(index)}
                  className={`w-full flex justify-between items-center 2xl:py-[28px] xl:py-[24px] lg:py-[20px] md:py-[16px] py-[8px] lg:px-[24px] md:px-[20px] px-[16px] text-left border-b-[2px] border-[#EEEEEE] transition-colors duration-300 ${
                    isOpen ? 'bg-gray-100 ' : 'bg-white hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center lg:gap-4 gap-3">
                    <span className="text-[16px] lg:text-[24px] md:text-[20px] sm:text-[18px] font-semibold text-black">{dept.name}</span>
                    <img src={Positions} alt="Positions" className="w-[16px] lg:w-[20px] lg:h-[20px] h-[16px]" />
                    <span className="text-[14px] lg:text-[20px] md:text-[18px] sm:text-[16px] text-[var(--sub-text)]">{dept.jobs.length} positions available</span>
                  </div>
                  <ChevronIcon isOpen={isOpen} />
                </button>

                {/* Accordion Body - Conditionally rendered */}
                <div
                  className={`transition-all duration-500 ease-in-out overflow-hidden ${
                    isOpen ? 'max-h-[1000px]' : 'max-h-0'
                  }`}
                >
                  <div className="divide-y-[2px] divide-[#EEEEEE]">
                    {dept.jobs.map((job, jobIndex) => (
                      <div key={jobIndex} className="xl:py-[28px] lg:py-[24px] md:py-[20px] py-[12px] lg:px-[24px] md:px-[20px] px-[16px] flex justify-between items-center">
                        <div className='flex flex-col xl:gap-[24px] lg:gap-[20px] md:gap-[16px] gap-[8px]'>
                          <h3 className="lg:text-[20px] sm:text-[18px] text-[16px] font-urbanist text-black">{job.title}</h3>
                          <div className="flex items-center lg:gap-[16px] md:gap-[12px] gap-[8px]">
                            {job.tags.map((tag, tagIndex) => (
                              <span
                                key={tagIndex}
                                className="lg:px-[16px] md:px-[12px] sm:px-[10px] px-[8px] lg:py-[4px] py-[3px] lg:text-[16px] md:text-[14px] sm:text-[12px] text-[10px] font-urbanist text-[var(--medium-text)] bg-[#EEEEEE]"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                        <Link
                          to="/job/senior-executive-operations"
                          className="lg:text-[18px] md:text-[16px] sm:text-[14px] text-[10px] font-semibold font-urbanist text-[var(--color)] flex items-center gap-[8px]"
                        >
                          <span>View Details</span>
                          <span>
                            <ArrowRight size={24} className='text-[var(--color)] lg:w-[24px] lg:h-[24px] md:w-[16px] h-[16px]' />
                          </span>
                        </Link>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default OpenPositions;