import React, { useState, useRef } from 'react';
import culture1 from "@/assets/AboutUsPage/culture1.png";
import culture2 from "@/assets/AboutUsPage/culture2.png";
import culture3 from "@/assets/AboutUsPage/culture3.png";
import culture4 from "@/assets/AboutUsPage/culture4.png";
import videoPoster from "@/assets/Homepage/design-asset-cropped.png";
import playButton from "@/assets/Videos/play.png";

// Interface for the culture card data props
interface CultureCardProps {
  imageSrc: string;
  title: string;
  description: string;
}

// Data for the four culture cards
const cultureCardsData: CultureCardProps[] = [
  {
    imageSrc: culture1,
    title: 'Innovation Fridays',
    description: 'We pause routine work to experiment and build bold ideas.',
  },
  {
    imageSrc: culture2,
    title: 'Team Hackathons',
    description: 'Fast-paced challenges that spark creativity and teamwork.',
  },
  {
    imageSrc: culture3,
    title: 'Growth Labs',
    description: 'Mentorship and learning sessions to fuel personal growth.',
  },
  {
    imageSrc: culture4,
    title: 'Celebrations',
    description: 'We pause routine work to experiment and build bold ideas.',
  },
];

const CultureSection: React.FC = () => {
  // --- Video Player Logic ---
  const [mobilePlaying, setMobilePlaying] = useState(false);
  const mobileVideoRef = useRef<HTMLVideoElement>(null);

  // You will need to import your playButton image and video poster
  // Example: import playButton from '../assets/play-button.png';

  const handleMobileVideoClick = () => {
    const videoElement = mobileVideoRef.current;
    if (videoElement) {
      if (mobilePlaying) {
        videoElement.pause();
      } else {
        videoElement.play();
      }
      setMobilePlaying(!mobilePlaying);
    }
  };
  // --- End Video Player Logic ---

  return (
    <section className="bg-white 2xl:py-[84px] xl:py-[72px] lg:py-[60px] md:py-[52px] py-[40px]">
      <div className="px-4 sm:px-6 md:px-12 lg:px-[80px] xl:px-[120px] 2xl:px-[200px] flex flex-col xl:gap-[32px] lg:gap-[28px] gap-[24px] ">
        
        {/* Top Section: Title and Video */}
        <div className="flex flex-col lg:flex-row xl:gap-[40px] lg:gap-[32px] md:gap-[28px] gap-[24px] items-center lg:border lg:border-[var(--border-color)] lg:pl-[40px]">
          
          {/* Left Column: Text Content */}
          <div className="flex flex-col lg:text-left text-center xl:gap-[16px] lg:gap-[12px] md:gap-[10px] gap-[8px] max-w-[550px]">
            <h2 className="text-center lg:text-left 2xl:text-[72px] xl:text-[60px] lg:text-[48px] md:text-[40px] sm:text-[38px] text-[32px] font-semibold text-black">
              Our Culture
            </h2>
            <p className="text-center lg:text-left 2xl:text-[28px] xl:text-[24px] lg:text-[20px] md:text-[18px] text-[16px] text-[var(--hero-text)] font-urbanist font-semibold">
              We are thinkers, makers, and learners, driven by curiosity and purpose.
            </p>
            <p className="text-center lg:text-left 2xl:text-[20px] xl:text-[18px] lg:text-[16px] md:text-[14px] sm:text-[12px] text-[12px] text-[var(--hero-text)] font-urbanist">
              At Alpheric, collaboration is our default, and creativity is our language. Every voice matters, every idea grows, and every project becomes a shared journey.
            </p>
          </div>

          {/* Right Column: Video Player */}
          <div className="relative w-full 2xl:h-[445px] xl:h-[360px] lg:h-[320px] md:h-[350px] sm:h-[280px] h-[180px] overflow-hidden bg-black">
            <video
              ref={mobileVideoRef}
              className="w-full h-full object-cover cursor-pointer"
              src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
              poster={videoPoster}
              onClick={handleMobileVideoClick}
              aria-label="Promotional video. Click to play or pause."
              loop
              muted
              playsInline 
            />
            {/* --- THIS IS THE RESTORED BUTTON --- */}
            {!mobilePlaying && (
              <button
                type="button"
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full p-2 sm:p-3 md:p-4 hover:bg-white/10 focus:outline-none focus:ring-4 focus:ring-blue-300"
                onClick={handleMobileVideoClick}
                aria-label="Play video"
              >
                <img className="w-16 sm:w-20 md:w-24" src={playButton} alt="Play button" draggable={false} />
              </button>
            )}
          </div>
        </div>

        {/* Bottom Section: Four Feature Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 xl:gap-[32px] lg:gap-[28px] md:gap-[24px] sm:gap-[20px] gap-[0px] ">
          {cultureCardsData.map((card, index) => (
            <div key={index} className="flex flex-col sm:px-0 px-[8px] sm:pt-0 pt-[8px] sm:gap-0 gap-[8px] sm:pb-0 pb-[16px] sm:no-border border border-[var(--border-color)]">
              <div className="w-full 2xl:h-[225px] xl:h-[180px] lg:h-[160px] md:h-[200px] sm:h-[150px] h-[100px] overflow-hidden">
                <img
                  src={card.imageSrc}
                  alt={card.title}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>
              <div className="flex flex-col gap-[16px] xl:px-[16px] lg:px-[12px] md:px-[10px] 2xl:pt-[16px] xl:pt-[12px] lg:pt-[10px] 2xl:pb-[24px] xl:pb-[22px] lg:pb-[20px] md:pb-[18px] sm:border sm:border-[var(--border-color)]">
                <h3 className="2xl:text-[24px] xl:text-[22px] lg:text-[20px] md:text-[18px] sm:text-[16px] text-[14px] font-semibold text-black ">{card.title}</h3>
                <p className="2xl:text-[20px] xl:text-[18px] lg:text-[16px] md:text-[14px] text-[12px] text-[var(--medium-text)] font-urbanist">{card.description}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default CultureSection;