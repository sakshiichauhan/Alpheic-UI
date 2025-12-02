import React from 'react';
import Icon1 from '@/assets/logo/Sparky.png';

const ThankYouForPilot: React.FC = () => {
    return (
        // Content Container (from ref code)
        <div className="relative z-10 flex flex-col items-center 2xl:space-y-8 lg:space-y-6 space-y-4 text-center 2xl:mt-18 mt-10">

            {/* Kicker (Text from image, style from ref code) */}
            <p className="xl:text-[48px] lg:text-[40px] md:text-[36px] text-[32px] font-instrument-serif-italics text-black">
                You're Already A Step Closer!
            </p>

            {/* Heading (Text from image, style from ref code) */}
            <h1 className="xl:text-[84px] lg:text-[70px] md:text-[56px] text-[40px] font-semibold text-black">
                Thank You for Starting<br />Your Pilot with Alpheric
            </h1>

            {/* Description (Text from image, style from ref code) */}
            <p className="xl:text-[24px] lg:text-[20px] md:text-[18px] text-[14px] font-urbanist text-[var(--hero-text)] max-w-3xl">
                We've received your request. Our team is reviewing the details and will connect with you soon to finalize your pilot.
            </p>

            {/* --- What Happens Next Section --- */}
            <div className="flex flex-col items-center gap-3 text-left max-w-3xl">
                {/* Title for the list */}
                <h2 className="xl:text-[32px] lg:text-[28px] md:text-[24px] text-[20px] font-semibold text-black">
                    What Happens Next
                </h2>
                {/* List of next steps */}
                <ul className="flex flex-col gap-[10px]">
                    {/* List Item 1 */}
                    <li className="flex items-center gap-[10px] xl:text-[24px] lg:text-[20px] md:text-[18px] text-[16px] font-urbanist text-[var(--hero-text)]">
                        <img src={Icon1} alt="Icon 1" className="h-[24px] w-[24px] text-cyan-500 shrink-0" />
                        Our team will get in touch via phone or email within 24 hours.
                    </li>
                    {/* List Item 2 */}
                    <li className="flex items-center gap-[10px] xl:text-[24px] lg:text-[20px] md:text-[18px] text-[16px] font-urbanist text-[var(--hero-text)]">
                        <img src={Icon1} alt="Icon 1" className="h-[24px] w-[24px] text-cyan-500 shrink-0" />
                        We'll align on your goals, refine the scope, and confirm timelines.
                    </li>
                    {/* List Item 3 */}
                    <li className="flex items-center gap-[10px] xl:text-[24px] lg:text-[20px] md:text-[18px] text-[16px] font-urbanist text-[var(--hero-text)]">
                        <img src={Icon1} alt="Icon 1" className="h-[24px] w-[24px] text-cyan-500 shrink-0" />
                        You'll receive a confirmation email once your pilot setup is complete.
                        </li>
                </ul>
            </div>
            {/* --- End What Happens Next --- */}


            {/* CTA Box (Layout and style from ref code) */}
            <div
                className="w-full max-w-4xl border-[3px] border-transparent bg-[var(--color)]/10 lg:py-6 md:py-4 py-3 lg:px-8 md:px-6 px-4"
                style={{ borderImage: 'linear-gradient(to right, var(--color), transparent) 1' }}
            >
                <div className="flex items-center justify-between gap-4 flex-col sm:flex-row">

                    {/* Left Side (Text from image, style from ref code) */}
                    <div className="flex-1 text-left">
                        {/* Using text style from ref code's "15 minutes" paragraph, but with black color */}
                        <p className="font-urbanist xl:text-[24px] lg:text-[20px] md:text-[16px] text-[14px] text-black">
                            Explore what we've built for other Dreamers and see what's possible.
                        </p>
                    </div>

                    <div className="">
                        <a
                            href="#"
                            className="whitespace-nowrap bg-black lg:px-8 md:px-6 px-4 lg:py-4 md:py-3 py-2 xl:text-[24px] lg:text-[20px] md:text-[18px] text-[14px] text-white transition-colors hover:bg-gray-800"
                        >
                            Explore Dreamer Pilot
                        </a>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default ThankYouForPilot;