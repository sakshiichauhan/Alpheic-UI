// src/components/TestimonialSlider.tsx

import React, { useState } from 'react';
import testimonialImage from '@/assets/CareerPage/VikramSingh.png';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import BlackQuote from '@/assets/CareerPage/BlackQuote.png';
import star from '@/assets/CareerPage/Star.png';

// --- TYPE DEFINITION ---
// Defines the shape of a single testimonial object
interface Testimonial {
  name: string;
  role: string;
  quote: string;
  image: string; // Path to the image
}

// --- MOCK DATA ---
// In a real app, you might fetch this from a CMS or API
const testimonials: Testimonial[] = [
  {
    name: 'Vikram Singh',
    role: 'Product Engineer',
    quote: 'Working at Alpheric feels like building the future — one experiment at a time.',
    image: testimonialImage,
  },
  {
    name: 'Nikhil Sharma',
    role: 'Intern',
    quote: 'The collaborative environment here is incredible. I feel empowered to share my ideas and see them come to life.',
    image: testimonialImage, // Replace with another image
  },
  {
    name: 'Shivam Gupta',
    role: 'Intern',
    quote: 'Every day presents a new, exciting challenge. It’s a fast-paced culture that truly rewards innovation and effort.',
    image: testimonialImage, // Replace with another image
  },
];

const TestimonialSlider: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
//   const [isAnimating, setIsAnimating] = useState(false);

  const handleNavigation = (direction: 'next' | 'prev') => {
    // setIsAnimating(true); // Start the fade-out

    setTimeout(() => {
      if (direction === 'next') {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
      } else {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
      }
    //   setIsAnimating(false); // Start the fade-in
    }, 200); // This duration should match your transition duration
  };
  
  const activeTestimonial = testimonials[currentIndex];

  return (
    <section className="bg-white py-[64px] 2xl:px-[200px] px-4 sm:px-6 md:px-12 lg:px-[80px] xl:px-[120px]">
      <div className="flex flex-col gap-[42px]">
        {/* --- Header --- */}
        <div className="text-center">
          <h2 className="2xl:text-[72px] text-[32px] font-semibold text-black ">
            Internships & Programs
          </h2>
          <p className="2xl:text-[32px] xl:text-[30px] lg:text-[28px] md:text-[26px] sm:text-[16px] text-[14px] font-urbanist text-[var(--hero-text)]">
            Hear from the people shaping Alpheric every day:
          </p>
        </div>

        {/* --- Slider Content --- */}
        <div className="relative">
          <div className={``}>
            <div className="flex flex-row items-center gap-8 md:gap-12">
              {/* Image */}
              <div className="flex-shrink-0 w-[108px] h-[110px] sm:w-[120px] sm:h-[120px] md:w-[353px] md:h-[330px] transition-all duration-300">
  <img
    src={activeTestimonial.image}
    alt={activeTestimonial.name}
    className="w-full h-full object-cover rounded-md"
  />
</div>

{/* Text Content */}
<div className="flex-grow text-left flex flex-col gap-[12px] sm:gap-[16px] md:gap-[24px] transition-all duration-300">
  <div>
    <img src={BlackQuote} alt="BlackQuote" className="w-[24px] h-[24px] sm:w-[28px] sm:h-[28px] md:w-[32px] md:h-[32px]" />
  </div>
  <div className="flex gap-[2px] sm:gap-[3px] md:gap-[4px]">
    {[...Array(5)].map((_, i) => (
      <div key={i} className="p-[2px] sm:p-[3px] md:p-[4px] bg-[var(--color)] rounded-[4px]">
        <img src={star} alt="star" className="w-[12px] sm:w-[14px] md:w-[16px] object-contain" />
      </div>
    ))}
  </div>
  <blockquote className="text-[14px] sm:text-[18px] md:text-[24px] font-urbanist text-[var(--medium-text)] leading-snug">
    {activeTestimonial.quote}
  </blockquote>
  <hr className="h-[1px] md:h-[2px] md:border-[#9EA2AE] border-[#EEEEEE] " />
  <div className="flex flex-col gap-[2px] sm:gap-[3px] md:gap-[4px]">
    <p className="text-black text-[16px] sm:text-[20px] md:text-[24px] font-urbanist font-medium">{activeTestimonial.name}</p>
    <p className="text-[var(--medium-text)] text-[14px] sm:text-[16px] md:text-[20px] font-urbanist">{activeTestimonial.role}</p>
  </div>
</div>

              {/* Text Content */}
             
            </div>
          </div>
        </div>
        <div className="flex gap-[24px] justify-end">
            <button
              onClick={() => handleNavigation('prev')}
              aria-label="Previous testimonial"
              className="w-[64px] h-[64px] flex items-center justify-center rounded border border-[var(--color)] text-black "
            >
              <ArrowLeft size={40} />
            </button>
            <button
              onClick={() => handleNavigation('next')}
              aria-label="Next testimonial"
              className="w-[64px] h-[64px] flex items-center justify-center rounded border border-[var(--color)] text-black "
            >
              <ArrowRight size={40} />
            </button>
          </div>
      </div>
    </section>
  );
};

export default TestimonialSlider;