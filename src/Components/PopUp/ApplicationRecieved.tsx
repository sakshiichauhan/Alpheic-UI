import React from 'react';

const ApplicationReceived: React.FC = () => {
    return (
        <section
            className={`
        w-full relative overflow-clip flex items-center justify-center
      `}
        >
            {/* Content Container (styles from ref code) */}
            <div className="relative z-10 flex flex-col items-center space-y-6 text-center px-4">

                {/* Kicker (Text from image, style from ref code) */}
                <p className="xl:text-[48px] lg:text-[40px] md:text-[36px] text-[32px] font-instrument-serif-italics text-black">
                    Application Received!
                </p>

                {/* Heading (Text from image, style from ref code) */}
                <h1 className="xl:text-[84px] lg:text-[70px] md:text-[56px] text-[40px] font-semibold text-black">
                    Thank you<br />for applying.
                </h1>

                {/* Description (Text from image, style from ref code) */}
                <p className="xl:text-[24px] lg:text-[20px] md:text-[18px] text-[14px] font-urbanist text-[var(--hero-text)] max-w-xl">
                    Our recruitment team will review your profile and get in touch if you're shortlisted.
                    Until then, learn more about our work and culture!
                </p>
            </div>
        </section>
    );
};

export default ApplicationReceived;