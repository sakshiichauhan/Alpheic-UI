import React from 'react';
import { Link2, Mail, ChevronRight } from 'lucide-react';

// --- 1. Social Share Component (Unchanged) ---
const SocialShare: React.FC = () => {
  const iconClasses = "flex xl:h-[40px] md:h-[32px] h-[28px] xl:w-[40px] md:w-[32px] w-[28px] items-center justify-center text-black";
  const iconTextClasses = "leading-none font-semibold xl:text-[28px] md:text-[24px] text-[20px] font-urbanist";

  const shareTargets = [
    {
      href: "#",
      label: "Share on Facebook",
      icon: <span className={`${iconTextClasses} lowercase`}>f</span>,
    },
    {
      href: "#",
      label: "Share on X",
      icon: <span className={iconTextClasses}>X</span>,
    },
    {
      href: "#",
      label: "Share on Threads",
      icon: <span className={iconTextClasses}>@</span>,
    },
    {
      href: "#",
      label: "Share on LinkedIn",
      icon: <span className={`${iconTextClasses} lowercase`}>in</span>,
    },
    {
      href: "#",
      label: "Share via Email",
      icon: <Mail className="h-6 w-6" />,
    },
    {
      href: "#",
      label: "Copy link",
      icon: <Link2 className="h-6 w-6" />,
    },
  ];
  
  return (
    <div className="flex items-center xl:gap-[24px] md:gap-[20px] gap-[16px]">
      <span className="xl:text-[32px] md:text-[28px] sm:text-[24px] text-[20px] text-black">Share</span>
      <div className="flex items-center xl:gap-[20px] md:gap-[16px] gap-[12px] text-black">
        {shareTargets.map(({ href, label, icon }) => (
          <a key={label} href={href} aria-label={label} className={iconClasses}>
            {icon}
          </a>
        ))}
      </div>
    </div>
  );
};


// --- 2. Article Header Component (STYLES UPDATED) ---

const KeyDetails: React.FC = () => {
  // Mock data based on the image (Unchanged)
  const breadcrumbs = ['Category', 'Category', 'Category'];
  const title = 'Filing of Annual RODTEP Return (ARR) by Exporters: Key Details';
  const date = '24 July, 2025';
  const readTime = '5 min';
  const imageUrl = 'https://placehold.co/1200x700/263A50/FFFFFF?text=99.9%25';

  return (
    <article 
      className={`
        w-full relative overflow-clip 
        bg-[radial-gradient(ellipse_70%_120%_at_right_top,#EDE6FE_20%,#FFFFFF_70%)]
      `}
    >
      
      {/* Container with new padding for the content area */}
      <div 
        className="
          px-4 sm:px-6 md:px-12 lg:px-[80px] xl:px-[120px] 2xl:px-[200px] 
          2xl:pt-[190px] xl:pt-[160px] lg:pt-[140px] md:pt-[120px] pt-[110px] 
          lg:pb-[64px] pb-[40px]
        "
      >
        
        {/* Header Section: Breadcrumbs, Title, Meta */}
        <header className="flex flex-col gap-[14px]">
          
          {/* Breadcrumbs (Unchanged) */}
          <nav className="flex items-center gap-[8px] xl:text-[20px] md:text-[18px] text-[16px] text-[var(--medium-text)] font-urbanist">
            {breadcrumbs.map((crumb, index) => (
              <React.Fragment key={index}>
                <a href="#" className="hover:text-[var(--sub-text)]">
                  {crumb}
                </a>
                {index < breadcrumbs.length - 1 && (
                  <span className="text-[var(--medium-text) xl:text-[20px] md:text-[18px] text-[16px]"><ChevronRight /></span>
                )}
              </React.Fragment>
            ))}
          </nav>

          {/* Title - NEW TEXT SIZES APPLIED */}
          <h1 
            className="2xl:text-[64px] xl:text-[56px] lg:text-[48px] md:text-[40px] sm:text-[32px] text-[28px] 
              font-semibold text-black text-left
            "
          >
            {title}
          </h1>

          <div className="flex items-center gap-4 xl:text-[20px] md:text-[18px] text-[16px] text-[var(--medium-text)] font-urbanist">
            {date && <span className="">{date}</span>}
            <div className="flex items-center gap-1">
               {date && readTime && <span className="text-[var(--color)]">{readTime}</span>}
               {readTime && <span>Read</span>}
            </div>
          </div>
        </header>

        {/* Featured Image */}
        <div className="xl:my-[48px] md:my-[40px] my-[32px] w-full overflow-hidden ">
          <img
            src={imageUrl}
            alt={title}
            className="h-full w-full object-cover"
          />
        </div>

        {/* Footer: Share buttons */}
        <footer className="flex justify-end xl:gap-[20px] md:gap-[16px] gap-[12px] w-full items-center">
          <span className="w-full h-[4px] bg-[#D9D9D980] block"></span><SocialShare />
        </footer>
        
      </div>
    </article>
  );
};

export default KeyDetails;