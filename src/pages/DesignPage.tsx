// import UiDesgin from "@/pages/Services/UiDesgin";
// // import HumanCenter from "@/pages/Services/HumanCenter";
// import WhyChooseUs from "@/pages/Services/WhyChooseUs";
// import WhatWeOffer from "@/pages/Services/WhatWeOffer";
// import OurWork from "@/pages/Services/OurWork";
// import DesignInsights from "@/pages/Services/DesignInsights";
// import StartPilot from "@/pages/Services/StartPilot";
// import LetsTalk from "@/pages/Services/LetsTalk";
// import Question from "@/pages/Services/Question";
// import Contact from "@/pages/Services/Contact";
// import Human from "@/pages/Services/Human";
// import HireDesigner from "@/pages/Services/HireDesigner";
// import Whitepapers from "@/pages/Services/Whitepapers";
// import DesignExpert from "@/pages/Services/DesignExpert";
// import Industries from "@/pages/Services/Industries";

// export const DesignPage = () => {
//   return (
//     <> 
//      <UiDesgin/>
//      <WhyChooseUs/>
    
//      <OurWork/>
//      {/* <HumanCenter/> */}
//      <Human/>
//      <Industries/>
//    <WhatWeOffer/>
//    <Whitepapers/>
//   <DesignExpert/>
//   <HireDesigner/>
//   <Contact/>
//    <DesignInsights/>
//    <StartPilot/>
   
  
//    <Question/>
//    <LetsTalk/>
  
//     </>
//   );
// };


import DesignHeroSection from "@/pages/DesignPage/Homepage"
import DesignPractice from "@/pages/DesignPage/DesignPractice"
import ToolsSection from "@/pages/DesignPage/ToolsSection"
import Table from "@/pages/DesignPage/Table"
import LatestInsights from "@/pages/Homepage/Latest insights"
import CallToActionBanner from "@/pages/ContractUsFinal/CallToActionBanner"
import FrequentlyAskedQuestions from "@/pages/CareerPage/frequentlyAskedQuestions"
import DesignExpert from "@/pages/Services/DesignExpert"


export const DesignPage = () => {
  return (
    <> 
    <DesignHeroSection/>
    <DesignPractice/>
    <ToolsSection/>
    <Table/>
    <LatestInsights/>
    <DesignExpert/>
    <FrequentlyAskedQuestions/>
    <CallToActionBanner/>
    </>
  );
};

