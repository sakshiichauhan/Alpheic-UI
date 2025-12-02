import React from 'react';
import ServiceCard from '@/Components/ServiceCard'; // Adjust the import path if needed
import {
  Cpu,
  GraduationCap,
  Landmark,
  HeartPulse,
  ShoppingCart,
  Factory,
  Leaf,
  HandHeart,
  Briefcase,
  Building,
  Dumbbell,
  Scale,
  Plane,
  Clapperboard,
  Rocket
} from 'lucide-react';

const iconStyle = "h-8 w-8 text-black";

const industriesData = [
  {
    title: "Technology & SaaS",
    desc: "Driving innovation through scalable platforms, AI automation, and seamless user experiences for tech companies and startups.",
    icon: <Cpu className={iconStyle} />,
    href: "/Technology"
  },
  {
    title: "Education & EdTech",
    desc: "Creating connected learning ecosystems through digital platforms, AI career tools, and institutional transformation.",
    icon: <GraduationCap className={iconStyle} />
  },
  {
    title: "Finance & FinTech",
    desc: "Enabling secure, compliant, and intelligent financial systems that simplify transactions and build trust.",
    icon: <Landmark className={iconStyle} />
  },
  {
    title: "Healthcare & Wellness",
    desc: "Designing secure, patient-centric digital solutions for healthcare providers, wellness brands, and health-tech startups.",
    icon: <HeartPulse className={iconStyle} />
  },
  {
    title: "Retail & E-Commerce",
    desc: "Building end-to-end digital experiences — from storefront to fulfillment — that enhance engagement and conversion.",
    icon: <ShoppingCart className={iconStyle} />
  },
  {
    title: "Manufacturing & Industrial",
    desc: "Integrating automation, data analytics, and smart systems to optimize processes and efficiency.",
    icon: <Factory className={iconStyle} />
  },
  {
    title: "Energy & Environment",
    desc: "Supporting sustainability and energy management through technology and smart data platforms.",
    icon: <Leaf className={iconStyle} />
  },
  {
    title: "NGO & CSR",
    desc: "Enabling impact-driven organizations with platforms that simplify outreach, engagement, and visibility.",
    icon: <HandHeart className={iconStyle} />
  },
  {
    title: "Professional Services",
    desc: "Digitally transforming consulting, legal, and accounting firms with secure and modern service platforms.",
    icon: <Briefcase className={iconStyle} />
  },
  {
    title: "Real Estate & Infrastructure",
    desc: "Powering visibility and operations for developers and builders with digital branding, cloud hosting, and CRM solutions.",
    icon: <Building className={iconStyle} />
  },
  {
    title: "Sports, Fitness & Lifestyle",
    desc: "Empowering sports brands, events, and wellness platforms with digital transformation and marketing innovation.",
    icon: <Dumbbell className={iconStyle} />
  },
  {
    title: "Government & Public Sector",
    desc: "Delivering citizen-centric, transparent, and secure solutions for government, civic, and institutional bodies.",
    icon: <Scale className={iconStyle} />
  },
  {
    title: "Travel, Tourism & Hospitality",
    desc: "Transforming experiences with booking platforms, customer engagement systems, and dynamic brand storytelling.",
    icon: <Plane className={iconStyle} />
  },
  {
    title: "Media, Marketing & Entertainment",
    desc: "Crafting digital identities, content systems, and scalable platforms for creators, agencies, and media houses.",
    icon: <Clapperboard className={iconStyle} />
  },
  {
    title: "Startups & Emerging Businesses",
    desc: "Helping early-stage ventures scale with the right blend of strategy, product design, and marketing execution.",
    icon: <Rocket className={iconStyle} />
  }
];

const IndustriesSection: React.FC = () => {
  return (
    <section className="bg-gray-50 2xl:py-[84px] xl:py-[72px] lg:py-[60px] md:py-[52px] py-[40px]">
      <div className="px-4 sm:px-6 md:px-12 lg:px-[80px] xl:px-[120px] 2xl:px-[200px]">

        <div className="2xl:mt-[75px] xl:mt-[60px] lg:mt-[48px] md:mt-[40px] mt-[32px] grid grid-cols-1 lg:gap-8 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {industriesData.map((industry, i) => (
            <ServiceCard
              key={i}
              title={industry.title}
              description={industry.desc}
              icon={industry.icon}
              href={industry.href}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default IndustriesSection;