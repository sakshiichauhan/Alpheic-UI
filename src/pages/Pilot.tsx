import HeroSection from "@/pages/Pilot/HeroSection"
import CardGrid from "@/pages/Pilot/CardGrid"
import PilotProgrammTable from "@/pages/Pilot/PilotProgrammTable"
import PilotsWork from "@/pages/Pilot/PilotsWork"
import Reports from "@/pages/Pilot/Reports"
import LatestInsights from "@/pages/Homepage/Latest insights"
import FrequentlyAskedQuestions from "@/pages/CareerPage/frequentlyAskedQuestions"
import StartSmall from "@/pages/Pilot/StartSmall"

export const Pilot = () => {
  return (
    <> 
    <HeroSection/>
    <CardGrid/>
    <PilotProgrammTable/>
    <PilotsWork/>
    <Reports/>
    <LatestInsights/>
    <FrequentlyAskedQuestions/>
    <StartSmall/>
    </>
  );
};


