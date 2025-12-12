import { useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@/store";
import { fetchServicePageData } from "@/store/Slice/UxDesgin/UxDesgin";
import { fetchDesignPageL2Data } from "@/store/Slice/UxDesgin/DesginPageThunk";
import { findOriginalServiceName, cleanNameForUrl } from "@/utils/urlMapping";
import UiDesgin from "@/pages/Services/UiDesgin";
// import HumanCenter from "@/pages/Services/HumanCenter";
import WhyChooseUs from "@/pages/Services/WhyChooseUs";
import WhatWeOffer from "@/pages/Services/WhatWeOffer";
import OurWork from "@/pages/Services/OurWork";
import DesignInsights from "@/pages/Services/DesignInsights";
import StartPilot from "@/pages/Services/StartPilot";
import LetsTalk from "@/pages/Services/LetsTalk";
import Question from "@/pages/Services/Question";
import Contact from "@/pages/Services/Contact";
import Human from "@/pages/Services/Human";
import HireDesigner from "@/pages/Services/HireDesigner";
import Whitepapers from "@/pages/Services/Whitepapers";
import DesignExpert from "@/pages/Services/DesignExpert";
import Industries from "@/pages/Services/Industries";

export const UxDesign = () => {
  const { name, servicename } = useParams<{ name?: string; servicename?: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const { data, loading, error } = useSelector((state: RootState) => state.servicePage);
  const { data: designPageL2Data, loading: designPageL2Loading } = useSelector((state: RootState) => state.designPageL2);

  // Fetch DesignPageL2 data if not loaded (needed for mapping service names)
  useEffect(() => {
    if (!designPageL2Data && !designPageL2Loading) {
      // For now, default to Design category
      // In the future, map servicename back to original category name
      dispatch(fetchDesignPageL2Data('Design'));
    }
  }, [dispatch, designPageL2Data, designPageL2Loading]);

  // Map cleaned URL service name back to original service name for API calls
  const currentService = useMemo(() => {
    if (!name) return 'Page'; // Default fallback
    
    // Get list of service names from DesignPageL2 data
    const serviceNames: string[] = [];
    if (designPageL2Data?.link_service_names) {
      designPageL2Data.link_service_names.forEach(linkItem => {
        if (linkItem.service_category_services) {
          linkItem.service_category_services.forEach(service => {
            const serviceName = service.service || service.name || '';
            if (serviceName && !serviceNames.includes(serviceName)) {
              serviceNames.push(serviceName);
            }
          });
        }
      });
    }
    
    // Find original name that matches when cleaned
    const originalName = findOriginalServiceName(name, serviceNames);
    
    // If found, use it; otherwise fallback to the cleaned name
    return originalName || name;
  }, [name, designPageL2Data]);

  useEffect(() => {
    // Fetch service data on component mount or when service name changes
    // Always fetch when name changes, or if no data exists
    console.log('UxDesign: Current service:', currentService, 'URL name param:', name, 'Data name:', data?.name);
    if (!data || !data.name || data.name !== currentService) {
      if (!loading) {
        console.log('UxDesign: Fetching service data for:', currentService);
        dispatch(fetchServicePageData(currentService));
      }
    }
  }, [dispatch, data, loading, currentService, name]);

  // Show loading state (optional - you can customize this)
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // Show error state (optional - you can customize this)
  if (error && !data) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-red-600 mb-4">Error loading page data: {error}</p>
          <button
            onClick={() => dispatch(fetchServicePageData(currentService))}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  // Extract data with fallbacks
  const serviceHero = data?.service_hero === 1;
  const whyChooseUs = data?.why_choose_us === 1;
  const serviceCaseStudies = data?.service_casestudies === 1;
  const linkedIndustries = data?.linked_industries === 1;
  const serviceHire = data?.service_hire === 1;
  const resourceCard = data?.resource_card === 1;
  const designConsultants = data?.design_consultants === 1;
  const hireCard = data?.hire_card === 1;
  const serviceBrands = data?.service_brands === 1;
  const serviceInsights = data?.service_insights === 1;
  const servicePilot = data?.service_piolet === 1;
  const sectionFaqs = data?.section_faqs === 1;
  const sectionCollaborateCard = data?.section_collaborate_card === 1;

  return (
    <> 
      {/* Service Hero Section - Conditionally render based on flag */}
      {serviceHero && (
        <UiDesgin
          title={data?.service_hero_other_name }
          kicker={data?.service_hero_short_description }
          description={data?.service_hero_description }
        
        />
      )}

      {/* Why Choose Us Section - Conditionally render based on flag */}
      {whyChooseUs && (
        <WhyChooseUs
          heading={data?.why_choose_us_heading}
          description={data?.why_choose_us_description}
          cards={data?.why_choose_us_cards}
        />
      )}
    
      {/* Case Studies Section - Conditionally render based on flag */}
      {serviceCaseStudies && (
        <OurWork
          heading={data?.service_casestudies_heading}
          description={data?.service_casestudies_description}
          buttonData={data?.service_casestudies_buttondata}
        />
      )}
      
      {/* Other sections - always render (or add flags if needed) */}
      {/* <HumanCenter/> */}
      <Human cards={data?.service_design_cards_table} />
      
      {/* Industries Section - Conditionally render based on flag */}
      {linkedIndustries && (
        <Industries heading={data?.linked_industries_heading} />
      )}
      
      {/* What We Offer Section - Conditionally render based on flag */}
      {serviceHire && (
        <WhatWeOffer 
          heading={data?.service_hire_heading} 
          cards={data?.service_hire_cards}
          buttonData={data?.service_hire_buttondata}
        />
      )}
      
      {/* Resource Card / Whitepapers Section - Conditionally render based on flag */}
      {resourceCard && (
        <Whitepapers
          heading={data?.resource_card_heading}
          title={data?.resource_card_title}
          description={data?.resource_card_description}
          image={data?.resource_card_image}
          buttonData={data?.resource_card_buttondata}
        />
      )}
      
      {/* Design Consultants Section - Conditionally render based on flag */}
      {designConsultants && (
        <DesignExpert
          heading={data?.design_consultants_heading}
          description={data?.design_consultants_description}
          buttonData={data?.design_consultants_buttondata}
          consultants={data?.design_consultants_list}
        />
      )}
      
      {/* Hire Card Section - Conditionally render based on flag */}
      {hireCard && (
        <HireDesigner
          title={data?.hire_card_title}
          heading={data?.hire_card_heading}
          description={data?.hire_card_description}
          buttonData={data?.hire_card_buttondata}

        />
      )}
      
      {/* Service Brands Section - Conditionally render based on flag */}
      {serviceBrands && (
        <Contact
          heading={data?.service_brands_heading}
          description={data?.service_brands_description}
          brands={data?.service_brands_list}
        />
      )}
      
      {/* Service Insights Section - Conditionally render based on flag */}
      {serviceInsights && (
        <DesignInsights
          heading={data?.service_insights_heading}
          description={data?.service_insights_description}
          buttonData={data?.service_insights_buttondata}
        />
      )}
      
      {/* Service Pilot Section - Conditionally render based on flag */}
      {servicePilot && (
        <StartPilot
          title={data?.service_piolet_title}
          heading={data?.service_piolet_heading}
          description={data?.service_piolet_description}
          buttonData={data?.service_piolet_buttondata}
          image={data?.service_piolet_image}
        />
      )}
      
      {/* Section FAQs - Conditionally render based on flag */}
      {sectionFaqs && <Question faqs={data?.faqs} />}
      
      {/* Section Collaborate Card - Conditionally render based on flag */}
      {sectionCollaborateCard && <LetsTalk/>}
    </>
  );
};