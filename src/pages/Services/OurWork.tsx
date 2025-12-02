import { useState } from "react";
import { ArrowUpRight} from "lucide-react";
import { DefaultButton } from "@/Components/Button";
import instagram from "@/assets/logo/insta.png";
import linkedin from "@/assets/logo/linkdin.png";
import dribbble from "@/assets/logo/dribble.png";
import behance from "@/assets/logo/behance.png";

type Category = "All" | "Websites" | "Dashboards" | "Mobile Apps" | "Landing Pages";

const categories: Category[] = ["All", "Websites", "Dashboards", "Mobile Apps", "Landing Pages"];

import Image1 from "@/assets/ServicePage/OurWork/Image1.png";
import Image2 from "@/assets/ServicePage/OurWork/Image2.png";
import Image3 from "@/assets/ServicePage/OurWork/Image3.png";
import Image4 from "@/assets/ServicePage/OurWork/Image4.png";
import Image5 from "@/assets/ServicePage/OurWork/Image5.png";
import Image6 from "@/assets/ServicePage/OurWork/Image6.png";

const projects = [
  {
    id: 1,
    category: "Product Design",
    title: "MamaEarth Retail Experience",
    subtitle: "Mobile App Design",
    image: Image1,
    bgColor: "#E3F2FD",
    type: "Mobile Apps" as Category,
    link: "#"
  },
  {
    id: 2,
    category: "Product Design",
    title: "Analytics Dashboard",
    subtitle: "Web Dashboard",
    image: Image2,
    bgColor: "#424242",
    type: "Dashboards" as Category,
    link: "#"
  },
  {
    id: 3,
    category: "Product Design",
    title: "Business Dashboard",
    subtitle: "Web Application",
    image: Image3,
    bgColor: "#2E7D32",
    type: "Dashboards" as Category,
    link: "#"
  },
  {
    id: 4,
    category: "Product Design",
    title: "Analytics Platform",
    subtitle: "Multi-Device App",
    image: Image4,
    bgColor: "#F5F5F5",
    type: "Websites" as Category,
    link: "#"
  },
  {
    id: 5,
    category: "Product Design",
    title: "User Management System",
    subtitle: "Web Application",
    image: Image5,
    bgColor: "#E3F2FD",
    type: "Websites" as Category,
    link: "#"
  },
  {
    id: 6,
    category: "Product Design",
    title: "E-commerce Platform",
    subtitle: "Web Store",
    image: Image6,
    bgColor: "#FFFFFF",
    type: "Websites" as Category,
    link: "#"
  },
];

const WorkSection = () => {
  const [activeCategory, setActiveCategory] = useState<Category>("All");

  const filteredProjects = activeCategory === "All" 
    ? projects 
    : projects.filter(project => project.type === activeCategory);

  return (
    <section className=" px-4 sm:px-6 md:px-12 lg:px-[80px] xl:px-[120px] 2xl:px-[200px] 2xl:py-[84px] xl:py-[72px] lg:py-[60px] md:py-[52px] py-[40px] bg-background">
      <div className=" mx-auto">
        {/* Header */}
        <div className="text-center mb-6">
        <h2 className="text-5xl md:text-7xl 2xl:font-light font-medium  mb-6">
            Our <span className="2xl:font-semibold font-medium">Work</span> 
          </h2>
          <p className="text-[#3E3E3E] 2xl:max-w-[960px]  mx-auto text-[14px] md:text-2xl font-urbanist ">
            Integral to our approach is a comprehensive user research phase, discovering general and
            niche audience needs through quantitative and qualitative research.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center 2xl:gap-3 gap-2 mb-6">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`2xl:px-6 2xl:py-2 px-2 py-1 font-light font-urbanist transition-all border-2 ${
                activeCategory === category
                  ? "bg-[#F5F5F5] text-[#3E3E3E] border-[#5AC8DC] hover:bg-[#E3F2FD]"
                  : "text-[#535353] border-[#E9EAEC] hover:text-[#444444] hover:bg-gray-50"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {filteredProjects.map((project) => (
            <ProjectCard key={project.id} {...project} />
          ))}
        </div>

        {/* View All Button */}
        <div className="flex justify-center">
             {/* View all projects button */}
      <DefaultButton href="#" onClick={() => {}}>View All Projects</DefaultButton>
        </div>
        
      </div>
      
    </section>
    
  );
};

// ProjectCard Component
interface ProjectCardProps {
  category: string;
  title: string;
  subtitle: string;
  image: string;
  bgColor: string;
  link: string;
}

const ProjectCard = ({ category, title, subtitle, bgColor, image, link }: ProjectCardProps) => {
  return (
    <div 
      className="group overflow-hidden border-0"
      style={{ backgroundColor: bgColor }}
    >
      <a href={link} className="block">
        {/* Top Category Tag + Image */}
        <div className="relative overflow-hidden">
          <div className="absolute top-1 left-1">
            <span className="bg-[#F5F5F5] 2xl:px-1 py-1 2xl:text-sm text-[10px] font-light text-[#3E3E3E] font-urbanist">
              {category}
            </span>
          </div>

          
            <img
              src={image}
              alt={title}
              className="2xl:w-full 2xl:h-full w-full h-[202px] object-cover"
            />
          </div>
      

        {/* Title, Subtitle, and Icon */}
        <div className="bg-[#FFFFFF]  py-2 relative">
          <div className="flex flex-col justify-center">
            <h3 className="2xl:text-2xl text-[16px] font-semibold text-[#3E3E3E] leading-tight">
              {title}
            </h3>
            <p className="text-[#3E3E3E] 2xl:text-base text-[12px] font-urbanist leading-tight">
              {subtitle}
            </p>
          </div>

          {/* Icon Positioned Between */}
          <ArrowUpRight
            className="absolute right-2 top-1/2 -translate-y-1/2 w-6 h-6 2xl:w-10 2xl:h-10 text-[#000000] "
          />
        </div>
      </a>
    </div>
  );
};

// SocialMedia Component
type Social = { name: string; href: string; image: string };

const items: Social[] = [
  { name: "Dribbble", href: "#", image: dribbble },
  { name: "Behance", href: "#", image: behance },
  { name: "LinkedIn", href: "#", image: linkedin },
  { name: "Instagram", href: "#", image: instagram },
];

function SocialCta() {
  return (
    <>
    <div className="w-full flex flex-col items-center gap-[16px] sm:gap-[20px] lg:gap-[32px] md:pt-[0px] pt-[px]">


      {/* Subheading */}
      <p className="pt-[0px] lg:pt-[28px] xl:pt-[42px] text-[14px] sm:text-[16px] md:text-[18px] lg:text-[20px] tracking-[0.18em] text-[var(--medium-text)] uppercase font-urbanist">
        A SNEAK PEAK INTO OUR SOCIAL MEDIA
      </p>

      {/* Social row */}
      <ul className="flex flex-wrap items-center justify-center gap-x-[16px] sm:gap-x-[24px] lg:gap-x-[32px] gap-y-[8px] sm:gap-y-[12px] mb-2">
        {items.map(({ name, href, image }) => (
          <li key={name} className="flex items-center gap-[12px] sm:gap-[16px] lg:gap-[24px] ">
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-[6px] sm:gap-[8px] lg:gap-[10px]"
              aria-label={name}
            >
                <img
                  src={image}
                  alt={name}
                  className="h-auto w-[32px] sm:w-[48px] lg:w-[72px] object-contain"
                  loading="lazy"
                />
              <span className="hidden md:block text-[16px] lg:text-[20px] font-regular text-black ">{name}</span>
            </a>
          </li>
        ))}
      </ul>
    </div>
    </>
  );
}
// Main component that includes both WorkSection and SocialMedia
const OurWork = () => {
  return (
    <>
      <WorkSection />
     <SocialCta/>
    </>
  );
};

export default OurWork;