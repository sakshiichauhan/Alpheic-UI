import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@/store";
import { fetchPilotPageData, stripHtml, isEnabled } from "@/store/Slice/Pilot/PilotPageThunk";
import bg from '@/assets/CareerPage/bg2.jpg';
import { ArrowUpRight } from 'lucide-react';

const ExternalLinkIcon = () => <ArrowUpRight size={20} />;

const StartSmall: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { data, loading } = useSelector((state: RootState) => state.pilotPage);

  useEffect(() => {
    if (!data && !loading) {
      dispatch(fetchPilotPageData());
    }
  }, [data, loading, dispatch]);

  if (!isEnabled(data?.card)) {
    return null;
  }

  const heading = stripHtml(
    data?.card_heading,
    'Start small. Prove value.<br/>  Scale with confidence.'
  );
  const description = stripHtml(
    data?.card_description,
    'Pick a pilot or ask for a custom mix for your stage and goals.'
  );
  const primaryCta = data?.card_button1 || 'Choose a pilot';
  const secondaryCta = data?.card_button2 || 'Book a 15 minute call';
  const headingLines = heading.split('<br/>');
  return (
    <section className="relative bg-white py-10 md:py-14 lg:py-16 px-4 sm:px-6 md:px-12 lg:px-20 xl:px-[120px] 2xl:px-[200px] overflow-hidden font-sans">
      {/* Outer Container */}
      <div className="relative w-full h-full border-2 border-[var(--color)] py-12 px-4">
        {/* Background Image */}
        <img
          src={bg}
          alt="Abstract network graphic"
          className="absolute inset-0 w-full h-full object-cover opacity-30 z-0 grayscale rotate-180"
        />

        {/* Main Content */}
        <div className="relative z-10 text-center flex flex-col gap-8 sm:gap-10">
          {/* Headings */}
          <div className="flex flex-col items-center gap-4 w-full">
            <h2 className="text-[26px] sm:text-[36px] md:text-[48px] lg:text-[64px] font-semibold text-black leading-snug">
            {headingLines.map((line, idx) => (
              <React.Fragment key={idx}>
                {line}
                {idx < headingLines.length - 1 && <br />}
              </React.Fragment>
            ))}
            </h2>
            <div className="text-[14px] sm:text-[16px] md:text-[18px] lg:text-[24px] font-urbanist text-[var(--medium-text)] leading-relaxed">
            {description}
            </div> 
          </div>

          {/* Action Buttons */}
          <div className="flex justify-center items-center flex-wrap gap-5 2xl:gap-15">
            <button className="flex items-center gap-2 sm:gap-3 text-[16px] sm:text-[20px] md:text-[22px] lg:text-[24px] font-medium text-black">
            {primaryCta}
              <span className="border-2 border-[var(--color)] p-1 sm:p-2">
                <ExternalLinkIcon />
              </span>
            </button>

            <div className="hidden sm:block h-[50px] w-[2px] bg-[#D2D3D7]" />

            <button className="flex items-center gap-2 sm:gap-3 text-[16px] sm:text-[20px] md:text-[22px] lg:text-[24px] font-medium text-black">
            {secondaryCta}
              <span className="border-2 border-[var(--color)] p-1 sm:p-2">
                <ExternalLinkIcon />
              </span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StartSmall;
