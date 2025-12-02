import React from "react";
import { ArrowUpRight } from "lucide-react";
interface CarouselCardProps {
    title: string;
    imageUrl: string;
    description: string;
    visitLink: string;
}

const CarouselCard: React.FC<CarouselCardProps> = ({
    title,
    imageUrl,
    description,
    visitLink,
}) => {
    return (
        <div
            className="relative w-[280px]  h-[440px] md:w-[320px] md:h-[480px] lg:w-[360px] lg:h-[550px] xl:w-[400px] xl:h-[627px] overflow-hidden shadow-lg group font-instrument-sans flex-shrink-0 snap-center"
            role="group"
            aria-label={`Card for ${title}`}
        >
            {/* ✅ Image with alt text for accessibility */}
            <img
                src={imageUrl}
                alt={title}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                loading="lazy"
            />

            
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent gap-[8px] to-transparent p-6 lg:p-8 flex flex-col justify-between">
                <div>
                    <h3 className="text-white text-[24px] lg:text-[36px] font-semibold">
                        {title}
                    </h3>
                    <p className="text-white text-[14px] md:text-[16px] lg:text-[20px] font-urbanist">
                        {description}
                    </p>
                </div>

             
                <div className="flex justify-end">
                    <a
                        href={visitLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Visit ${title} page`}
                        className="bg-white/50 hover:bg-black transition-colors text-white p-[12px] rounded-full flex items-center justify-center "
                    >
                        <ArrowUpRight size={30} aria-hidden="true" />
                    </a>
                </div>
            </div>
        </div>
    );
};

export default CarouselCard;
