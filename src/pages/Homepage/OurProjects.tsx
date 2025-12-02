import project1 from "@/assets/OurProjects/p1.png";
import project1_secondary from "@/assets/OurProjects/p1s.png";
import project2 from "@/assets/OurProjects/p2.png"; 
import project2_secondary from "@/assets/OurProjects/p2s.png";
// import project3 from "@/assets/OurProjects/p3.png";
// import project3_secondary from "@/assets/OurProjects/p3s.png";
// import project4 from "@/assets/OurProjects/p4.png";
// import project4_secondary from "@/assets/OurProjects/p4s.png";
import { ArrowUpRight } from "lucide-react";
import SneekPeak from "@/Components/SneekPeak";
import { motion } from "framer-motion";
import { useRef } from "react";
import {  useScroll, useTransform } from "framer-motion";
import { DefaultButton } from "@/Components/Button";
import { useNavigate, Link } from "react-router-dom";

type Project = {
  id: string;
  title: string;            // e.g., "CricksLab – Smarter Cricket UX"
  tags: string[];           // e.g., ["Product Design", "Dashboard Design", ...]
  heroImage: { src: string; alt: string };        // large left image
  secondaryImage: { src: string; alt: string };   // top-right image
  summary: string;          // right-bottom description card
  bgColor: string;          // background color for summary card
  caseStudySlug?: string;   // slug for internal case-study route
};

const projects: Project[] = [
  {
    id: "p1",
    title: "CricksLab – Smarter Cricket UX",
    tags: [
      "Product Design",
      "Dashboard Design",
      "Mobile App",
      "Interface Design & UX",
      "Data Insights",
      "Fantasy App",
      "SaaS",
    ],
    heroImage: {
      src: project1,
      alt: "CricksLab redesigned app shown on a laptop",
    },
    secondaryImage: {
      src: project1_secondary,
      alt: "CricksLab analytics dashboard preview",
    },
    summary:
      "We redesigned CricksLab from scratch, enhancing UX usability and effortless match tracking for cricket fans. Post-launch, the successful revamped app crossed 10K+ downloads and improved retention significantly.",
    bgColor: "#D4F3EA",
    caseStudySlug: "crickslab",
  },
  {
    id: "p2",
    title: "FitFlow – Actionable Health Dashboards",
    tags: [
      "Product Design",
      "HealthTech",
      "Mobile App",
      "Data Visualization",
      "SaaS",
    ],
    heroImage: {
      src: project2,
      alt: "FitFlow dashboard on laptop showing KPIs",
    },
    secondaryImage: {
      src: project2_secondary,
      alt: "FitFlow mobile screens and charts",
    },
    summary:
      "Designed a modular insights layer with habits, trends, and cohort analysis. Ship-ready components reduced time-to-feature by ~35% and boosted DAU with better streak mechanics.",
    bgColor: "#CAE4F9",
    caseStudySlug: "fitflow",
  },
  // leave `id` here; more projects will be added later
];


const TagChip = ({ label }: { label: string }) => (
  <span className="inline-flex items-center border border-[#D9D9D9] bg-white px-[8px] sm:px-[12px] lg:px-[20px] py-[4px] sm:py-[10px] lg:py-[12px] 
  text-[10px] sm:text-[14px] lg:text-[20px] font-medium text-[var(--medium-text)] font-urbanist">
    {label}
  </span>
);

const ProjectBlock = ({ project }: { project: Project }) => {
  const navigate = useNavigate();

  const handleCaseStudyClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (project.caseStudySlug) {
      navigate(`/case-study/${project.caseStudySlug}`, { 
        state: { scrollToTitle: true } 
      });
    }
  };

  return (
    <section
      key={project.id}
      className="w-full px-[14px] sm:px-[20px] md:px-[42px] lg:px-[80px] xl:px-[120px] 2xl:px-[200px]  xl:pb-[120px] lg:pb-[60px] md:pb-[42px] pb-[24px]"
    >
      <div className="border md:border-none border-[var(--border-color)] p-[12px] sm:p-[16px] md:p-[0px]">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-[16px] sm:gap-[20px] lg:gap-[24px]">
        <h2 className="text-[16px] sm:text-[24px] md:text-[40px] lg:text-[48px] xl:text-[64px] font-semibold tracking-tight text-black">
          {project.title}
        </h2>

        {project.caseStudySlug && (
          <Link
            to={`/case-study/${project.caseStudySlug}`}
            onClick={handleCaseStudyClick}
            className="group hidden z-10 md:inline-flex h-full w-auto items-center justify-center border border-[var(--color)] bg-white text-black p-[8px] sm:p-[10px] lg:p-[12px] flex-shrink-0"
            aria-label="Open case study"
          >
            <ArrowUpRight className="h-auto w-[20px] sm:w-[24px] lg:w-[28px]" />
          </Link>
        )}
    </div>

    <div className="pt-[16px] sm:pt-[20px] lg:pt-[24px] flex flex-wrap gap-[8px] sm:gap-[10px] lg:gap-[12px] pb-[24px] sm:pb-[32px] lg:pb-[40px]">
      {project.tags.map((t) => (
        <TagChip key={t} label={t} />
      ))}
    </div>

    {/* Content Grid */}
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 sm:gap-6 md:gap-8 lg:items-stretch">
  {/* Left: hero image defines the row height, keeps original proportions */}
  <div className="xl:col-span-2">
    {project.caseStudySlug ? (
      <Link
        to={`/case-study/${project.caseStudySlug}`}
        onClick={handleCaseStudyClick}
        className="bg-white relative block cursor-pointer group"
        aria-label="Open case study"
      >
        <img
          src={project.heroImage.src}
          alt={project.heroImage.alt}
          className="block w-full h-auto object-contain transition-opacity group-hover:opacity-90"
        />
        <div className="md:hidden block absolute top-2 right-2 border border-[var(--color)] bg-white text-black p-[6px] sm:p-[10px]">
          <ArrowUpRight className="h-auto w-[10px] sm:w-[18px]" />
        </div>
      </Link>
    ) : (
      <div className="bg-white relative">
        <img
          src={project.heroImage.src}
          alt={project.heroImage.alt}
          className="block w-full h-auto object-contain"
        />
      </div>
    )}
  </div>

  {/* Right: follows left height and splits 50/50 */}
  <div className="lg:flex flex-col h-full gap-[16px] sm:gap-[24px] lg:gap-[32px] hidden">
    {/* Top-right image fills half height */}
    {project.caseStudySlug ? (
      <Link
        to={`/case-study/${project.caseStudySlug}`}
        onClick={handleCaseStudyClick}
        className="relative flex-1 overflow-hidden bg-white hidden xl:block cursor-pointer group"
        aria-label="Open case study"
      >
        <img
          src={project.secondaryImage.src}
          alt={project.secondaryImage.alt}
          className="absolute inset-0 w-full h-full object-cover transition-opacity group-hover:opacity-90"
        />
      </Link>
    ) : (
      <div className="relative flex-1 overflow-hidden bg-white hidden xl:block">
        <img
          src={project.secondaryImage.src}
          alt={project.secondaryImage.alt}
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>
    )}

    {/* Bottom-right summary fills the other half */}
    {project.caseStudySlug ? (
      <Link
        to={`/case-study/${project.caseStudySlug}`}
        onClick={handleCaseStudyClick}
        style={{ backgroundColor: project.bgColor }}
        className="flex-1 items-center justify-center
                   px-[16px] sm:px-[24px] md:px-[40px] lg:px-[52px]
                   py-[12px] sm:py-[16px] lg:py-[20px]
                   text-[14px] sm:text-[16px] md:text-[18px] lg:text-[20px]
                   leading-relaxed text-[var(--medium-text)] font-medium font-urbanist 
                   hidden xl:flex cursor-pointer group transition-opacity hover:opacity-90"
        aria-label="Open case study"
      >
        <p
          className="overflow-hidden text-ellipsis line-clamp-4 sm:line-clamp-5 lg:line-clamp-6"
          style={{ display: "-webkit-box", WebkitBoxOrient: "vertical" }}
        >
          {project.summary}
        </p>
      </Link>
    ) : (
      <div
        style={{ backgroundColor: project.bgColor }}
        className="flex-1 items-center justify-center
                   px-[16px] sm:px-[24px] md:px-[40px] lg:px-[52px]
                   py-[12px] sm:py-[16px] lg:py-[20px]
                   text-[14px] sm:text-[16px] md:text-[18px] lg:text-[20px]
                   leading-relaxed text-[var(--medium-text)] font-medium font-urbanist 
                   hidden xl:flex"
      >
        <p
          className="overflow-hidden text-ellipsis line-clamp-4 sm:line-clamp-5 lg:line-clamp-6"
          style={{ display: "-webkit-box", WebkitBoxOrient: "vertical" }}
        >
          {project.summary}
        </p>
      </div>
    )}
  </div>
</div>

</div>

    </section>
  );
};


















export default function OurProjects() {
  
  const heroRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.5]);
  return (
    
    <div className="bg-gray-50 py-[32px] sm:py-[40px] md:py-[48px] lg:py-[120px]">
      <section
  ref={heroRef}
  className="lg:h-[80vh] pb-[24px] lg:pb-0 flex flex-col justify-center items-center"
>
  {/* STATIC (< lg) */}
  <div className="lg:hidden flex flex-col items-center">
    <h1 className="2xl:text-[96px] xl:text-[82px] md:text-[68px] sm:text-[48px] text-[32px] text-center font-semibold">
      Latest Project
    </h1>
    <div>
      <p className="2xl:text-[84px] xl:text-[70px] md:text-[64px] sm:text-[40px] text-[24px] text-center font-instrument-serif-italics">
        Powerful Results. <br className="hidden md:block" /> Meaningful impact.
      </p>
      <p className="text-[var(--sub-text)] font-urbanist pt-2 md:pt-4 text-[14px] sm:text-[15px] md:text-[18px] lg:text-[22px] xl:text-[32px] text-center">
      Work, for us, is Worship.
      </p>
    </div>
  </div>

  {/* ANIMATED (lg+) */}
  <motion.div
    style={{ scale }}
    className="hidden lg:flex flex-col items-center will-change-transform"
  >
    <h1 className="2xl:text-[96px] xl:text-[82px] md:text-[68px] sm:text-[48px] text-[32px] text-center font-semibold">
      Latest Project
    </h1>
    <div>
      <p className="2xl:text-[84px] xl:text-[70px] md:text-[64px] sm:text-[40px] text-[24px] text-center font-instrument-serif-italics">
        Powerful Results. Meaningful impact.
      </p>
      <p className="text-[var(--sub-text)] font-urbanist pt-2 md:pt-4 text-[14px] sm:text-[15px] md:text-[18px] lg:text-[22px] xl:text-[32px] text-center">
      Work, for us, is Worship.
      </p>
    </div>
  </motion.div>
</section>

      {projects.map((p) => (
        <ProjectBlock key={p.id} project={p} />
      ))}
      
      <div className="flex justify-center">
        <DefaultButton href="#" onClick={() => {}}>View All Projects</DefaultButton>
      </div>
      <SneekPeak />
    </div>
  );
}
