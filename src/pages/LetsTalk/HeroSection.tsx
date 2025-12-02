import React from "react";
type Props = {
  title?: string;
  kicker?: string;
  description?: string;
  descriptiondown?: string;
};

const LetsTalkHeroSection: React.FC<Props> = ({
  title = "Let’s Talk",
  kicker = "Every great story starts with a conversation.",
  description = `Have a vision, a challenge, or an idea worth exploring? Let’s talk and turn it into something remarkable.`,
  descriptiondown = `Please note: due to the volume of inquiries, we may not be able to respond to everyone — but where we can, we’ll reach out as soon as possible.`,
}) => {
  return (
    <section
      className={`w-full relative bg-[radial-gradient(ellipse_70%_120%_at_right_top,#EDE6FE_20%,#FFFFFF_70%)] overflow-clip`}
      aria-labelledby="hero-heading"
    >
      <div className="px-4 sm:px-6 md:px-12 lg:px-[80px] xl:px-[120px] 2xl:px-[200px] 2xl:pt-[190px] xl:pt-[160px] lg:pt-[140px] md:pt-[120px] pt-[110px] 2xl:pb-[84px] xl:pb-[72px] lg:pb-[60px] md:pb-[52px] pb-[40px]">
        <div className="flex flex-col items-start gap-8">
          <div className="w-full flex flex-col items-start lg:gap-[16px] gap-[12px]">
            <h1
              id="hero-heading"
              className="2xl:text-[84px] xl:text-[72px] lg:text-[60px] md:text-[48px] sm:text-[42px] text-[40px] font-semibold text-black text-left"
            >
              {title}
            </h1>

            <p 
              className="2xl:text-[32px] xl:text-[28px] lg:text-[24px] md:text-[20px] sm:text-[16px] text-[14px] font-medium text-[var(--hero-text)] text-urbanist text-left"
            >
              {kicker}
            </p>
            <div className="flex flex-col">
            <p 
              className="2xl:text-[24px] xl:text-[20px] lg:text-[18px] md:text-[16px] sm:text-[14px] text-[12px] text-[var(--medium-text)] text-urbanist text-left"
            >
              {description}
            </p>
            <p 
              className="2xl:text-[24px] xl:text-[20px] lg:text-[18px] md:text-[16px] sm:text-[14px] text-[12px] text-[var(--medium-text)] text-urbanist text-left"
            >
              {descriptiondown}
            </p>

            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default LetsTalkHeroSection;