import React from 'react';
import Sparkles from "@/assets/logo/Sparky.png";

type Outcome = {
    id: number;
    title: string;
    description: string;
};

// Data based on the new image ("Outcomes in weeks")
const outcomes: Outcome[] = [
    {
        id: 1,
        title: 'Identity',
        description: 'A name and a simple visual system',
    },
    {
        id: 2,
        title: 'Prototype',
        description: 'Clickable flow that shows value',
    },
    {
        id: 3,
        title: 'Presence',
        description: 'One-page site with analytics',
    },
    {
        id: 4,
        title: 'Pitch',
        description: 'Short deck ready to send',
    },
];


// --- 2. Reusable Outcome Card Component ---

const OutcomeCard: React.FC<{ outcome: Outcome }> = ({ outcome }) => {
    return (
        /* The border styling is now applied by the parent grid, 
           but we keep the internal padding and layout from your previous card. */
        <div className="flex flex-col xl:gap-6 md:gap-4 gap-2 bg-white 2xl:p-8 xl:p-6 lg:p-5 p-4 ">

            {/* Icon: Replicating the sparkle with Lucide and basic sizing */}
            <img src={Sparkles as string} alt="Sparkles" className="xl:w-[48px] xl:h-[48px] lg:w-[40px] lg:h-[40px] md:w-[32px] md:h-[32px] w-[24px] h-[24px]" />


            <div>
                {/* Title: Bold and slightly larger font */}
                <h3 className="2xl:text-[24px] xl:text-[20px] lg:text-[18px] md:text-[16px] text-[14px] font-semibold text-black">
                    {outcome.title}
                </h3>

                {/* Description: Medium text size and color */}
                <p className="2xl:text-[20px] xl:text-[18px] lg:text-[16px] md:text-[14px] text-[12px] text-[var(--medium-text)] font-urbanist">
                    {outcome.description}
                </p>
            </div>
        </div>
    );
};


// --- 3. Main Outcomes Section Component ---

const OutcomesSection: React.FC = () => {
    return (
        <section className="bg-white 2xl:py-[84px] xl:py-[72px] lg:py-[60px] md:py-[52px] py-[40px]">
            <div className="px-4 sm:px-6 md:px-12 lg:px-[80px] xl:px-[120px] 2xl:px-[200px]">

                {/* Header */}
                <h1 className="text-center 2xl:text-[72px] xl:text-[60px] lg:text-[48px] md:text-[40px] sm:text-[32px] text-[24px] font-bold text-black lg:mb-[40px] md:mb-[32px] mb-[24px]">
                    Outcomes in weeks
                </h1>

                {/* Responsive Grid with Border Styling to create the box effect */}
                <div className="
            grid grid-cols-1 lg:grid-cols-4 
            border-t border-b border-l border-[var(--border-color)] 
            divide-x divide-[var(--border-color)]
            lg:gap-0 md:gap-4 gap-2 
            sm:grid-cols-2 lg:border-r
        ">
                    {outcomes.map((outcome) => (
                        <OutcomeCard key={outcome.id} outcome={outcome} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default OutcomesSection;