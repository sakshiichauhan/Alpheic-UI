import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@/store";
import { fetchIndustryPageData } from "@/store/Slice/IndustryPage/IndustryThunk";
import TechnologyBuild from "@/pages/Technology/TechnologyBuild";
import OurExperience from "@/pages/Technology/OurExperience";
import WhatDeliver from "@/pages/Technology/WhatDeliver";
import WhatWeOffer from "@/pages/Technology/HireAlpheric";
import CaseStudies from "@/pages/Technology/CaseStudies";
import ContactForm from "@/pages/Technology/ContactForm";
import Faq from "@/pages/Technology/Faq";

export const Technology = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { l2Cards, loading: industryPageLoading } = useSelector((state: RootState) => state.industryPage);

  // Fetch industry list if not loaded (needed for URL mapping)
  useEffect(() => {
    if (l2Cards.length === 0 && !industryPageLoading) {
      dispatch(fetchIndustryPageData());
    }
  }, [dispatch, l2Cards.length, industryPageLoading]);

  return (
    <>
      <TechnologyBuild />
      <OurExperience />
      <WhatDeliver />
      <WhatWeOffer />
      <CaseStudies />
      <ContactForm />
      <Faq />
    </>
  );
};


