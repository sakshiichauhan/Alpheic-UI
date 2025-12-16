import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "@/store";
import HeroSection from "@/pages/ActionPage/HeroSection";
import SubHero from "@/pages/ActionPage/SubHero";
import LetsTalk from "@/pages/Services/LetsTalk";

type ActionPageData = {
  hero_section?: number;
  hero_section_heading?: string;
  hero_section_subheading?: string;
  hero_section_description?: string;
  case_studies?: number;
  lets_collaborate?: number;
};

export const Actions = () => {
  const token = useSelector((state: RootState) => (state as any)?.auth?.token);
  const [actionData, setActionData] = useState<ActionPageData | null>(null);

  useEffect(() => {
    const fetchActionPage = async () => {
      try {
        const headers: Record<string, string> = { "Content-Type": "application/json" };
        if (token) {
          headers.Authorization = `token ${token}`;
        }
        const res = await fetch("/api/resource/ActionPage/Page", { headers });
        const json = await res.json();
        setActionData(json?.data || json || null);
      } catch (e) {
        console.error("Failed to fetch ActionPage/Page", e);
      }
    };
    fetchActionPage();
  }, [token]);

  const showHero = actionData?.hero_section === 1;
  const showCaseStudies = actionData?.case_studies === 1;
  const showLetsCollaborate = actionData?.lets_collaborate === 1;

  return (
    <> 
      {showHero && (
        <HeroSection
          heading={actionData?.hero_section_heading}
          subheading={actionData?.hero_section_subheading}
          description={actionData?.hero_section_description}
        />
      )}
      {showCaseStudies && <SubHero />}
      {showLetsCollaborate && <LetsTalk />}
    </>
  );
};