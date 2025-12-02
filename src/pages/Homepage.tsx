
import HomePage from "@/pages/Homepage/HeroSection"
import Design from "@/pages/Homepage/Design"
import Hire from "@/pages/Homepage/Hire"
import Contact from "@/pages/Homepage/Contact"
import Solution from "@/pages/Homepage/Solution"
import WhatNext from "@/pages/Homepage/WhatNext"
import OurProjects from "@/pages/Homepage/OurProjects"
import ClientLogoMarquee from "@/pages/Homepage/ClientLogoMarquee"
import AnswerQuestion from "@/pages/Homepage/AnswerQuestion"
import { AboutUs } from "@/pages/Homepage/AboutUs"
import LatestInsights from "@/pages/Homepage/Latest insights"
import PilotStack from "@/pages/Homepage/Piolet"
import FrequentlyAskedQuestions from "@/pages/Homepage/frequentlyAskedQuestions"

export const Homepage = () => {
  return (
    <> 
        <HomePage/>
        <ClientLogoMarquee/>
        <Design/>
        <AnswerQuestion/>
        <OurProjects/>
        <Solution/>
        <PilotStack/>
        <Hire/> 
        <AboutUs/>
        <LatestInsights/>
        <WhatNext/>
        <Contact/>
        <FrequentlyAskedQuestions/>
    </>
  );
};


