import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from "@/Layouts/Navbar"
import Footer from "@/Layouts/Footer"
import { Homepage } from "@/pages/Homepage"
import { UxDesign } from '@/pages/DesignPage/UxDesgin';

// Route components
import { Pilot } from "@/pages/Pilot"
import { Consult } from "@/pages/Consult"
import { DesignPage } from "@/pages/DesignPage"
import { Build } from "@/pages/Build"
import { Host } from "@/pages/Host"
import Secure from "@/pages/Secure"
import { Market } from "@/pages/Market"
import { Actions } from "@/pages/Actions"
import { Network } from "@/pages/Network"
import { Careers } from "@/pages/Careers"
import { LetsTalk } from "@/pages/LetsTalk"

import { Inquiry } from "@/pages/Inquiry"
import { Industries } from "@/pages/Industries"
import { Insights } from "@/pages/Insights"
import { InsightsKeyDetails } from '@/pages/InsightsPage/InsightsKeyDetails';
import { AboutUs } from "@/pages/AboutUs"
import { ContactUs } from "@/pages/ContactUs"
import CaseStudy from "@/pages/CaseStudy"
import { ThankYouWrapper } from "@/pages/ThankYou/ThankYouWrapper"
import JobDetailsPage from "@/pages/JobDetails/JobDetailsPage"
import { Technology } from '@/pages/OurServices/Technology'

import { Dreamers } from '@/pages/Pilot/Dreamers'
import StartPilotForm from '@/pages/Pilot/StartPilotForm'
import { NewBusinessInquiry } from '@/pages/Contractus/NewBusinessInquiry';
import { Services } from '@/pages/Services';
function AppRoutes() {
  const location = useLocation();
  const hideLayout = location.pathname.startsWith('/thank-you');

  return (
    <>
      <Navbar />
      <Routes>
        {/* Homepage route */}
        <Route path="/" element={
          <Homepage />
        } />
        <Route path="/Pilot" element={<Pilot />} />
        <Route path="/Consult" element={<Consult />} />
        <Route path="/Design" element={<DesignPage />} />
        <Route path="/Build" element={<Build />} />
        <Route path="/Host" element={<Host />} />
        <Route path="/Secure" element={<Secure />} />
        <Route path="/Market" element={<Market />} />
        <Route path="/Actions" element={<Actions />} />
        <Route path="/Network" element={<Network />} />
        <Route path="/Careers" element={<Careers />} />
        <Route path="/job/:id" element={<JobDetailsPage />} />
        <Route path="/LetsTalk" element={<LetsTalk />} />
        <Route path="/inquiry" element={<Inquiry />} />
        <Route path="/Industries" element={<Industries />} />
        <Route path="/Services" element={<Services />} />
        <Route path="/Insights" element={<Insights />} />
        <Route path="/About Us" element={<AboutUs />} />
        <Route path="/Contact Us" element={<ContactUs />} />
        <Route path="/case-study/:slug" element={<CaseStudy />} />
        <Route path="/thank-you/:type" element={<ThankYouWrapper />} />
        <Route path="/thank-you" element={<ThankYouWrapper />} />
        <Route path="/Technology" element={<Technology />} />
        
        <Route path="/Industries/:industryName" element={<Technology />} />
        <Route path="/services/design/:name" element={<UxDesign />} />
      
        <Route path="/Dreamers" element={<Dreamers />} />
        <Route path="/start-pilot" element={<StartPilotForm />} />
        <Route path="/new-business-inquiry" element={<NewBusinessInquiry />} />
        <Route path="/UxDesgin" element={<UxDesign />} />
        <Route path="/InsightsKeyDetails" element={<InsightsKeyDetails />} />
      </Routes>
      {!hideLayout && <Footer />}
    </>
  )
}


export default AppRoutes
