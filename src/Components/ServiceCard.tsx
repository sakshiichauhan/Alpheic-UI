import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Arrow1 from '@/assets/Arrow1.png';

interface ServiceCardProps {
  title: string;
  description: string;
  href?: string;
  icon?: React.ReactNode;
  iconUrl?: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ title, description, href = "#", icon, iconUrl }) => {
  const navigate = useNavigate();
  
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (href && href !== '#') {
      // Use navigate to ensure proper URL handling
      navigate(href);
    }
  };

  return (
    <Link
      to={href}
      onClick={handleClick}
      className="group relative flex 2xl:max-w-[485px] flex-col justify-between bg-[#FBFBFB] p-[16px] sm:p-[18px] md:p-[20px] lg:p-[24px] xl:p-[28px] 2xl:p-[32px]"
    >
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-4">
          {(icon || iconUrl) && (
            <div className="h-8 w-8 flex-shrink-0 flex items-center justify-center">
              {iconUrl ? (
                <img 
                  src={iconUrl} 
                  alt={title} 
                  className="h-8 w-8 object-contain"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    console.error('Image failed to load:', iconUrl);
                    (e.target as HTMLImageElement).style.display = 'none';
                  }}
                />
              ) : (
                icon
              )}
            </div>
          )}
          <h3 className="text-left text-[16px] font-semibold text-black md:text-[18px] lg:text-[20px] xl:text-[22px] 2xl:text-[24px]">
            {title}
          </h3>
        </div>
        
        <img src={Arrow1} alt="Arrow" className="h-[30px] w-[30px] flex-shrink-0" />
      </div>
  
      <div className="mt-4">
        <p className="font-urbanist text-left text-[12px] text-[var(--medium-text)] md:text-[14px] lg:text-[16px] xl:text-[18px] 2xl:text-[20px]">
          {description}
        </p>
      </div>
    </Link>
  );
};

export default ServiceCard;