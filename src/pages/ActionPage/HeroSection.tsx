import React from 'react';

interface HeroSectionProps {
  heading?: string;
  subheading?: string;
  description?: string;
}

const stripHtml = (html?: string): string => {
  if (!html) return "";
  return html.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
};

const HeroSection: React.FC<HeroSectionProps> = ({
  heading = "Our Work",
  subheading = "User Research That Drives Impact",
  description = "Integral to our approach is a comprehensive user research phase, discovering general and niche audience needs through quantitative and qualitative research.",
}) => {
  const safeHeading = stripHtml(heading) || "Our Work";
  const safeSubheading = stripHtml(subheading) || "User Research That Drives Impact";
  const safeDescription = stripHtml(description) || description;

  return (
    <section className="bg-[radial-gradient(ellipse_50%_100%_at_top_right,#EDE6FE_10%,#FFFFFF_100%)] 2xl:pb-[84px] xl:pb-[72px] lg:pb-[60px] md:pb-[52px] pb-[40px] 2xl:pt-[188px] xl:pt-[170px] lg:pt-[150px] md:pt-[120px] pt-[110px]">
      <div className="px-4 sm:px-6 md:px-12 lg:px-[80px] xl:px-[120px] 2xl:px-[200px]">

        <div className="flex min-[950px]:flex-row flex-col items-center xl:gap-[64px] lg:gap-[48px] md:gap-[32px] sm:gap-[24px] gap-[16px]">
          
          <div className="xl:min-w-[460px] lg:min-w-[400px] md:min-w-[340px] sm:min-w-[240px] min-w-[200px] min-[950px]:text-left text-center">
            <h2 className="xl:text-[72px] lg:text-[64px] md:text-[52px] sm:text-[40px] text-[32px] font-semibold text-black">
              {safeHeading}
            </h2>
          </div>

          <div>
            <h3 className="xl:text-[40px] lg:text-[32px] md:text-[28px] sm:text-[24px] text-[20px] font-semibold text-black">
              {safeSubheading}
            </h3>
            <p className="xl:text-[24px] lg:text-[20px] md:text-[18px] sm:text-[16px] text-[14px] font-urbanist text-[var(--hero-text)]">
              {safeDescription}
            </p>
          </div>

        </div>
      </div>
    </section>
  );
};

export default HeroSection;