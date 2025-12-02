import React, { useEffect } from "react";
import { useParams, Link, useLocation } from "react-router-dom";

import project1 from "@/assets/OurProjects/p1.png";
import project1s from "@/assets/OurProjects/p1s.png";
import project2 from "@/assets/OurProjects/p2.png";
import project2s from "@/assets/OurProjects/p2s.png";
import project3 from "@/assets/OurProjects/p3.png";
import project3s from "@/assets/OurProjects/p3s.png";
import { ArrowUpRight } from "lucide-react";

type CaseStudyProps = {
  title: string;
  subHeading?: string;
  description: string;
  deliverables: string[];
  industry: string;
  duration: string;
  platform: string;
  images: string[];
  ctaLink?: string;
};

const caseStudies: Record<string, CaseStudyProps> = {
  crickslab: {
    title: "CricksLab – Smarter Cricket UX",
    subHeading: "A complete redesign of a high-performance cricket analytics platform.",
    description:
      "Pentanet is a leading provider of fiber-optic, NBN and fixed wireless internet solutions for residential and business customers across Western Australia. For a brand that prides itself on innovation, technology and experience, its website needed to mirror this positioning. Pentanet were seeking a mesmeric experience that invited audiences to deeply engage with them on both a brand and product level.",
    deliverables: ["UI/UX", "Product Design", "SaaS"],
    industry: "Sports & Fantasy",
    duration: "2 Months",
    platform: "Web & Mobile App",
    images: [
      project1, project1s,
      project1, project1s,
    ],
    ctaLink: "https://crickslab.com",
  },

  fitflow: {
    title: "FitFlow – Actionable Health Dashboards",
    subHeading: "Transforming biosensor data into simplified human health insights.",
    description:
      "FitFlow partnered with us to translate complex health data into intuitive experiences. We delivered modular dashboards, habit loops and multi-layered analytics that reduced time-to-design and improved DAU significantly.",
    deliverables: ["Product Strategy", "UX/UI", "Design System"],
    industry: "HealthTech",
    duration: "10 Weeks",
    platform: "Web & Mobile",
    images: [
      project2, project2s,
      project2, project2s,
    ],
    ctaLink: "https://fitflow.com",
  },

  analyticspro: {
    title: "AnalyticsPro – Workforce Efficiency",
    subHeading: "Enterprise-grade dashboards for productivity and workforce KPIs.",
    description:
      "AnalyticsPro required advanced dashboards, data-heavy interfaces and modular UI blocks to scale across 15+ enterprise-level internal tools. We delivered a unified design system powering the entire ecosystem.",
    deliverables: ["UX Audit", "Dashboard Design", "Data Visualization"],
    industry: "Enterprise SaaS",
    duration: "9 Weeks",
    platform: "Web App",
    images: [
      project3, project3s,
      project3, project3s,
    ],
    ctaLink: "https://analyticspro.com",
  }
};

// ---------------------------------------------------------
// CASE STUDY SECTION
// ---------------------------------------------------------

const CaseStudySection: React.FC<CaseStudyProps> = ({
  title,
  subHeading,
  description,
  deliverables,
  industry,
  duration,
  platform,
  images,
  ctaLink,
}) => {
  return (
    <section  id="case-study-title" className="w-full 2xl:pb-[84px] 2xl:pt-[190px] xl:pt-[160px] lg:pt-[140px] md:pt-[120px] pt-[110px] xl:pb-[72px] lg:pb-[60px] md:pb-[52px] pb-[40px] px-4 sm:px-6 md:px-12 lg:px-[80px] xl:px-[120px] 2xl:px-[200px]">

      <div  className="grid grid-cols-1 lg:grid-cols-2 lg:gap-[84px] gap-[40px]">

        {/* LEFT SIDE */}
        <div className="space-y-6">

          {/* TITLE */}
          <h1 
         
            className="font-semibold text-black leading-tight 
            xl:text-[64px] lg:text-[56px] md:text-[48px] text-[40px]"
          >
            {title}
          </h1>

          {/* CTA BUTTON */}
          <a
            href={ctaLink ?? "#"}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-3 text-[16px] sm:text-[20px] md:text-[22px] lg:text-[24px] 
              border border-[var(--color)]
              text-black font-urbanist
              hover:bg-[var(--color)]/10 transition"
          >
            View Website
            <ArrowUpRight strokeWidth={1} className="h-full w-[20px] sm:w-[22px] md:w-[24px] lg:w-[30px] xl:w-[36px] 2xl:w-[40px] shrink-0" aria-hidden />
          </a>

          

          {/* LABELS ROW */}
          <div className="flex flex-row flex-wrap gap-4 text-left items-stretch">

            <div className="space-y-1">
              <p className="md:text-[14px] text-[12px] font-medium tracking-wider uppercase text-[#AAAAAA] font-urbanist">
                Deliverables
              </p>
              <p className="md:text-[16px] text-[14px] font-medium text-black font-urbanist">
                {deliverables.join(", ")}
              </p>  
            </div>
            <div className="w-[2px] bg-[var(--border-color)] self-stretch"></div>

            <div className="space-y-1">
              <p className="md:text-[14px] text-[12px] font-medium tracking-wider uppercase text-[#AAAAAA] font-urbanist">
                Industry
              </p>
              <p className="md:text-[16px] text-[14px] font-medium text-black font-urbanist">
                {industry}
              </p>
            </div>
            <div className="w-[2px] bg-[var(--border-color)] self-stretch"></div>

            <div className="space-y-1">
              <p className="md:text-[14px] text-[12px] font-medium tracking-wider uppercase text-[#AAAAAA] font-urbanist">
                Duration
              </p>
              <p className="md:text-[16px] text-[14px] font-medium text-black font-urbanist">
                {duration}
              </p>
            </div>
            <div className="w-[2px] bg-[var(--border-color)] self-stretch"></div>

            <div className="space-y-1">
              <p className="md:text-[14px] text-[12px] font-medium tracking-wider uppercase text-[#AAAAAA] font-urbanist">
                Platform
              </p>
              <p className="md:text-[16px] text-[14px] font-medium text-black font-urbanist">
                {platform}
              </p>
            </div>
          </div>

          
          {/* SUB HEADING */}
          <div className="space-y-4">
          <h2 className="2xl:text-[32px] xl:text-[28px] lg:text-[24px] md:text-[20px] sm:text-[16px] text-[14px] text-[var(--hero-text)] font-medium leading-snug">
            {subHeading}
          </h2>

          {/* DESCRIPTION */}
          <p className="md:text-[16px] lg:text-[20px] text-[14px] font-medium text-[var(--medium-text)] font-urbanist">
            {description}
          </p>

          </div>
          
        </div>

        {/* RIGHT SIDE — IMAGE LAYOUT */}
        <div className="space-y-8">

          {/* TOP WIDE IMAGE */}
          <div className="w-full h-[320px] md:h-[360px] lg:h-[400px] xl:h-[450px] 2xl:h-[504px] overflow-hidden">
            <img
              src={images[0]}
              className="w-full h-full object-cover"
              alt="main"
            />
          </div>

          {/* 2 IMAGES SIDE BY SIDE */}
          <div className="grid grid-cols-2 gap-4">
            <div className="h-[180px] md:h-[200px] lg:h-[220px] xl:h-[240px] 2xl:h-[245px] overflow-hidden">
              <img src={images[1]} className="w-full h-full object-cover" />
            </div>
            <div className="h-[180px] md:h-[200px] lg:h-[220px] xl:h-[240px] 2xl:h-[245px] overflow-hidden">
              <img src={images[2]} className="w-full h-full object-cover" />
            </div>
          </div>

          {/* COLLAGE 3×2 */}
          <div className="w-full h-[320px] md:h-[360px] lg:h-[400px] xl:h-[450px] 2xl:h-[504px] overflow-hidden">
            <img
              src={images[3]}
              className="w-full h-full object-cover"
              alt="main"
            />
          </div>
        </div>
      </div>
    </section>
  );
};


// ---------------------------------------------------------
// MAIN PAGE
// ---------------------------------------------------------

const CaseStudyPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const location = useLocation();
  const data = slug ? caseStudies[slug] : undefined;

  // Scroll to title when navigating from OurProjects
  useEffect(() => {
    const shouldScroll = (location.state as { scrollToTitle?: boolean })?.scrollToTitle;
    if (shouldScroll) {
      // Small delay to ensure the page has rendered
      setTimeout(() => {
        const titleElement = document.getElementById('case-study-title');
        if (titleElement) {
          titleElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      }, 100);
    }
  }, [location.state]);

  if (!data) {
    return (
      <section className="w-full 2xl:pb-[84px] 2xl:pt-[190px] xl:pt-[160px] lg:pt-[140px] md:pt-[120px] pt-[110px] xl:pb-[72px] lg:pb-[60px] md:pb-[52px] pb-[40px] px-4 sm:px-6 md:px-12 lg:px-[80px] xl:px-[120px] 2xl:px-[200px]
  text-center">
        <h1 className="xl:text-[64px] lg:text-[56px] md:text-[48px] text-[40px] font-semibold text-black mb-4">
          Case study not found
        </h1>
        <p className="xl:text-[24px] lg:text-[20px] md:text-[18px] text-[16px] text-gray-600 mb-6">
          The case study you are looking for does not exist.
        </p>
        <Link
          to="/"
          className="inline-flex items-center justify-center bg-black text-white px-6 py-3 rounded-sm hover:bg-neutral-800 transition"
        >
          Back to Home
        </Link>
      </section>
    );
  }

  return <CaseStudySection {...data} />;
};

export default CaseStudyPage;
