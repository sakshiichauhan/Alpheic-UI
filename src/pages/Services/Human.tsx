import React from "react";
import imageSrc from "@/assets/ServicePage/HumanCenter.png";
import ParsedHtml from "@/Components/ParsedHtml";
import type { ServiceDesignCard } from "@/store/Slice/UxDesgin/UxDesgin";

export interface HumanItem {
  title: string;
  description: string;
  image: string;
  imageAlt?: string;
  id?: string; // Optional unique identifier (e.g., card name from API)
}

// Helper function to construct image URL from API path
const getImageUrl = (imagePath?: string): string => {
  if (!imagePath) return imageSrc;
  
  // If it's already a full URL, return as-is
  if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
    return imagePath;
  }
  
  // If it starts with /files/, use the path directly
  if (imagePath.startsWith('/files/')) {
    const apiBaseUrl = 'https://work.alpheric.com';
    return apiBaseUrl ? `${apiBaseUrl}${imagePath}` : imagePath;
  }
  
  // Fallback to default image if path is invalid
  return imageSrc;
};

// Helper function to convert newline characters to HTML breaks
const formatTitle = (title: string): string => {
  // Convert \n to <br /> for HTML rendering
  return title.replace(/\n/g, '<br />');
};

// Helper function to map API cards to HumanItem format
const mapApiCardsToHumanItems = (cards: ServiceDesignCard[]): HumanItem[] => {
  return cards.map((card) => ({
    id: card.name,
    title: formatTitle(card.title),
    description: card.description,
    image: getImageUrl(card.attach_image),
    imageAlt: card.title || card.name || "Human centered design",
  }));
};

type HumanCenterProps = {
  items?: HumanItem[];
  cards?: ServiceDesignCard[];
  className?: string;
};

const HumanCenter: React.FC<HumanCenterProps> = ({
  items = [],
  cards = [],
  className = "",
}) => {
  // Default fallback items if no data provided
  const defaultItems: HumanItem[] = [
    {
      title: "Design that feels right,<br />not just looks right.",
      description: "Human-centered, data-driven design that delivers measurable results.",
      image: imageSrc,
      imageAlt: "Team collaborating in an office",
    },
    {
      title: "Design that feels right,<br />not just looks right.",
      description: "Human-centered, data-driven design that delivers measurable results.",
      image: imageSrc,
      imageAlt: "Team collaborating in an office",
    },
  ];

  // Priority: items > cards > defaultItems
  let humanItems: HumanItem[];
  if (items.length > 0) {
    humanItems = items;
  } else if (cards.length > 0) {
    humanItems = mapApiCardsToHumanItems(cards);
  } else {
    humanItems = defaultItems;
  }

  return (
    <section className={`w-full ${className} 2xl:py-[84px] xl:py-[72px] lg:py-[60px] md:py-[52px] py-[40px]`}>
      {humanItems.map((item, index) => {
        // First item (index 0) = image on right, second (index 1) = image on left, and so on
        const imageOnRight = index % 2 === 0;
        const bgColor = index % 2 === 0 ? "bg-[#F7FCFD]" : "bg-white";
        // Mobile: use flex-col-reverse for right images (image below text), flex-col for left images (image above text)
        const mobileFlexDirection = imageOnRight ? "flex-col-reverse" : "flex-col";

        return (
          <div key={item.id || `human-item-${index}`} className="w-full">
            <div className={`py-0 ${bgColor} pr-0`}>
              <div className={`flex lg:flex-row ${mobileFlexDirection} items-center 2xl:gap-[74px] xl:gap-[50px] lg:gap-[20px] md:gap-[54px] sm:gap-[48px] gap-[40px] justify-between`}>
                {imageOnRight ? (
                  <>
                    {/* Text on Left */}
                    <div className="w-full items-center px-4 sm:px-6 md:px-12 lg:pl-[2px] xl:pl-[100px] 2xl:pl-[150px] lg:pb-0 md:pb-[54px] sm:pb-[48px] pb-[40px]">
                      <ParsedHtml
                        htmlContent={item.title}
                        as="h1"
                        className="2xl:text-[54px] xl:text-[40px] lg:text-[40px] md:text-[32px] sm:text-[28px] text-[24px] font-medium text-[#000000] leading-tight font-instrument-sans"
                      />
                      <p className="2xl:text-2xl xl:text-[20px] lg:text-2xl md:text-[20px] sm:text-[16px] text-[14px] text-[#3E3E3E] font-normal font-urbanist leading-relaxed mt-2 md:mt-3">
                        {item.description}
                      </p>
                    </div>
                    {/* Image on Right - max 50% width */}
                    <div className="w-full lg:max-w-[50%] flex-shrink-0">
                      <div className="relative bg-white">
                        <img
                          src={item.image}
                          alt={item.imageAlt || "Human centered design"}
                          className="h-full w-full object-cover lg:ml-auto"
                          referrerPolicy="no-referrer"
                          onError={(e) => {
                            // Fallback to default image if image fails to load
                            const target = e.target as HTMLImageElement;
                            if (target.src !== imageSrc) {
                              target.src = imageSrc;
                            }
                          }}
                        />
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    {/* Image on Left - max 50% width */}
                    <div className="w-full lg:max-w-[50%] flex-shrink-0">
                      <div className="relative bg-white">
                        <img
                          src={item.image}
                          alt={item.imageAlt || "Human centered design"}
                          className="h-full w-full object-contain lg:mr-auto"
                          referrerPolicy="no-referrer"
                          onError={(e) => {
                            // Fallback to default image if image fails to load
                            const target = e.target as HTMLImageElement;
                            if (target.src !== imageSrc) {
                              target.src = imageSrc;
                            }
                          }}
                        />
                      </div>
                    </div>
                    {/* Text on Right */}
                    <div className="w-full items-center px-4 sm:px-6 md:px-12 lg:pr-[15px] xl:pr-[60px] 2xl:pr-[60px] lg:pb-0 md:pb-[54px] sm:pb-[48px] pb-[40px]">
                      <ParsedHtml
                        htmlContent={item.title}
                        as="h1"
                        className="2xl:text-[54px] xl:text-[40px] lg:text-[40px] md:text-[32px] sm:text-[28px] text-[24px] font-medium text-[#000000] leading-tight font-instrument-sans"
                      />
                      <p className="2xl:text-2xl xl:text-[20px] lg:text-2xl md:text-[20px] sm:text-[16px] text-[14px] text-[#3E3E3E] font-normal font-urbanist leading-relaxed mt-2 md:mt-3">
                        {item.description}
                      </p>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </section>
  );
};

export default HumanCenter;
