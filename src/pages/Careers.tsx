import HeroSection from "@/pages/CareerPage/HeroSection"
import SubHero from "@/pages/CareerPage/SubHero"
import WhyJoin from "@/pages/CareerPage/WhyJoin"
import InternshipsSection from "@/pages/CareerPage/InternshipsSection"
import OpenPositions from "@/pages/CareerPage/OpenPosition"
import HiringProcess from "@/pages/CareerPage/HiringProcess"
import TestimonialSlider from "@/pages/CareerPage/TestimonialSlider"
import ReadyToGrow from "@/pages/CareerPage/ReadyToGrow"
import FrequentlyAskedQuestions from "@/pages/CareerPage/frequentlyAskedQuestions"

export const Careers = () => {
  return (
    <> 
     <HeroSection/>
     <SubHero/>
     <WhyJoin/>
     <OpenPositions/>
     <InternshipsSection/>
     <HiringProcess/>
     <FrequentlyAskedQuestions/>
     <TestimonialSlider/>
     <ReadyToGrow/>
    </>
  );
};

