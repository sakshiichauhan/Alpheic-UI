import React, { useRef, useState, type MouseEvent } from "react";
import { motion } from "framer-motion";
import CarouselCard from "@/Components/CarouselCard";

import card1 from "@/assets/Carousel/asset1.jpeg";
import card2 from "@/assets/Carousel/asset2.jpeg";
import card3 from "@/assets/Carousel/asset3.jpeg";
import card4 from "@/assets/Carousel/asset4.jpeg";
import card5 from "@/assets/Carousel/asset5.jpeg";

interface CarouselItem {
    imageUrl: string;
    title: string;
    description: string;
    visitLink: string;
  }
  
  const carouselItems: CarouselItem[] = [
    { imageUrl: card1, title: "Technology", description: "Ensure your digital presence is reliable, fast, and secure with premium hosting solutions.", visitLink: "https://example.com" },
    { imageUrl: card2, title: "Project Manager", description: "Ensure your digital presence is reliable, fast, and secure with premium hosting solutions.", visitLink: "https://example.com" },
    { imageUrl: card3, title: "Developer", description: "Ensure your digital presence is reliable, fast, and secure with premium hosting solutions.", visitLink: "https://example.com" },
    { imageUrl: card4, title: "Designer", description: "Ensure your digital presence is reliable, fast, and secure with premium hosting solutions.", visitLink: "https://example.com" },
    { imageUrl: card5, title: "Marketer", description: "Ensure your digital presence is reliable, fast, and secure with premium hosting solutions.", visitLink: "https://example.com" },
    { imageUrl: card3, title: "Developer", description: "Ensure your digital presence is reliable, fast, and secure with premium hosting solutions.", visitLink: "https://example.com" },
    { imageUrl: card4, title: "Designer", description: "Ensure your digital presence is reliable, fast, and secure with premium hosting solutions.", visitLink: "https://example.com" },
    { imageUrl: card5, title: "Marketer", description: "Ensure your digital presence is reliable, fast, and secure with premium hosting solutions.", visitLink: "https://example.com" },
    { imageUrl: card3, title: "Developer", description: "Ensure your digital presence is reliable, fast, and secure with premium hosting solutions.", visitLink: "https://example.com" },
    { imageUrl: card4, title: "Designer", description: "Ensure your digital presence is reliable, fast, and secure with premium hosting solutions.", visitLink: "https://example.com" },
    { imageUrl: card5, title: "Marketer", description: "Ensure your digital presence is reliable, fast, and secure with premium hosting solutions.", visitLink: "https://example.com" },
  ];
  
  const Hire: React.FC = () => {
    // ✅ Strictly typed states
    const [isDragging, setIsDragging] = useState<boolean>(false);
    const [startX, setStartX] = useState<number>(0);
    const [scrollLeft, setScrollLeft] = useState<number>(0);
  
    // ✅ Typed ref
    const sliderRef = useRef<HTMLDivElement | null>(null);
  
    // ✅ Mouse event handlers with typing
    const handleMouseDown = (e: MouseEvent<HTMLDivElement>): void => {
      if (!sliderRef.current) return;
      setIsDragging(true);
      setStartX(e.pageX - sliderRef.current.offsetLeft);
      setScrollLeft(sliderRef.current.scrollLeft);
    };
  
    const handleMouseUp = (): void => {
      setIsDragging(false);
    };
  
    const handleMouseMove = (e: MouseEvent<HTMLDivElement>): void => {
      if (!isDragging || !sliderRef.current) return;
      e.preventDefault();
      const x = e.pageX - sliderRef.current.offsetLeft;
      const walk = (x - startX) * 2; // Adjust scroll speed
      sliderRef.current.scrollLeft = scrollLeft - walk;
    };
  
    return (
      <section
        className="flex flex-col items-center justify-evenly pl-4 sm:pl-6 md:pl-12 lg:pl-[80px] xl:pl-[120px] 2xl:pl-[200px] 
        gap-6  py-10 md:py-13 lg:py-16 xl:py-20 2xl:py-30"
      
      >
        {/* ✅ Accessible heading */}
        <h1
       
          className="font-instrument-sans text-[32px] md:text-[52px] lg:text-[64px] w-full font-semibold "
        >
          Hire
        </h1>
  
        <div className="w-full">
          {/* ✅ Scrollable carousel container */}
          <div
            ref={sliderRef}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onMouseMove={handleMouseMove}
            tabIndex={0}
         
            className="relative overflow-x-auto no-scrollbar  cursor-grab active:cursor-grabbing  "
          >
          
            <motion.div
              initial={{ x: "-100%", opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{
                type: "tween",
                duration: 2,
                ease: "easeOut",
                opacity: { duration: 2, ease: "easeIn" },
              }}
              className="flex gap-5 md:gap-6 w-max scroll-smooth snap-x snap-mandatory"
            >
              {carouselItems.map((item, index) => (
                <CarouselCard
                  key={index}
                  imageUrl={item.imageUrl}
                  title={item.title}
                  description={item.description}
                  visitLink={item.visitLink}
                />
              ))}
            </motion.div>
          </div>
        </div>
      </section>
    );
  };
  
  export default Hire;