import React from "react";
import {
  Phone,
  Mail,
  Download,
  ArrowUp,
} from "lucide-react";
import logo from "@/assets/logo/Blacklogo.png";
import Linkdin from "@/assets/logo/FootLinkdin.png";
import Instagram from "@/assets/logo/FoorInsta.png";
import Dribbble from "@/assets/logo/FoorDribble.png";
import Behance from "@/assets/logo/FootBehance.png";

type NavItem = { label: string; href: string };

const leftNav: NavItem[] = [
  { label: "Consult", href: "https://example.com/consult" },
  { label: "Design", href: "https://example.com/design" },
  { label: "Build", href: "https://example.com/build" },
  { label: "Host", href: "https://example.com/host" },
  { label: "Secure", href: "https://example.com/secure" },
  { label: "Market", href: "https://example.com/market" },
];

const rightNav: NavItem[] = [
  { label: "About Us", href: "https://example.com/about" },
  { label: "Career", href: "https://example.com/career" },
  { label: "Actions", href: "https://example.com/actions" },
  { label: "Insights", href: "https://example.com/insights" },
];

type Social = { label: string; href: string; Icon: React.ReactNode };
const socials: Social[] = [
  { label: "LinkedIn", href: "https://example.com/linkedin", Icon: <img src={Linkdin} alt="LinkedIn" className="lg:h-[30px] lg:w-[30px] h-[20px] w-[20px] object-contain" />  },
  { label: "Instagram", href: "https://example.com/instagram", Icon: <img src={Instagram} alt="Instagram" className="lg:h-[30px] lg:w-[30px] h-[20px] w-[20px] object-contain" />  },
  { label: "Dribbble", href: "https://example.com/dribbble", Icon: <img src={Dribbble} alt="Dribbble" className="lg:h-[30px] lg:w-[30px] h-[20px] w-[20px] object-contain" />  },
  { label: "Behance", href: "https://example.com/behance", Icon: <img src={Behance} alt="Behance" className="lg:h-[30px] lg:w-[30px] h-[20px] w-[20px] object-contain" />  },
];

const FooterAlpheric: React.FC = () => {
  return (
    <footer className="block">
      <div className="mx-auto px-4 sm:px-6 md:px-12 lg:px-[80px] xl:px-[120px] 2xl:px-[200px] 2xl:py-[84px] xl:py-[72px] lg:py-[60px] md:py-[52px] py-[40px] border-t border-b border-[#E9EAEC]">
      <div className="flex flex-col lg:flex-row lg:gap-[32px] md:gap-[48px] sm:gap-[32px] gap-[24px] justify-between">
        {/* Left block */}
        <div className="xl:min-w-[445px] lg:min-w-[400px] gap-6 flex lg:flex-col sm:flex-row flex-col items-start justify-start">
          {/* Logo (dummy image) */}
          <div className="flex flex-col items-start justify-start gap-4 sm:gap-6 w-full">
          <a href="/" className="inline-block">
            <img
              src={logo}
              alt="Alpheric logo"
              className="2xl:h-[50px] xl:h-[48px] lg:h-[42px] md:h-[36px] sm:h-[32px] h-[32px] w-auto object-contain"
            />
          </a>

          <p className="sm:max-w-md 2xl:text-[20px] xl:text-[18px] md:text-[16px] sm:text-[14px] text-[12px] text-[var(--medium-text)] font-urbanist">
            We bring bold ideas to life—combining strategy, structure, and innovation
            to create lasting impact. Our approach turns complexity into clarity, helping
            you move forward with confidence and purpose.
          </p>
          </div>

          <div className="sm:hidden flex items-center gap-[16px] w-full">
          <h4 className="text-[14px] text-black font-urbanist">Say Hello 👋</h4>
          <ul className="text-black font-urbanist text-[12px] gap-[16px] flex items-center">
            {socials.map(({ label, href, Icon }) => (
              <li key={label}>
                <a
                  href={href}
                  className="group inline-flex items-center justify-center text-black font-urbanist text-[12px]"
                  aria-label={label}
                >
                  {Icon}
                </a>
              </li>
            ))}
          </ul>
        </div>

          
          <div className="flex flex-col items-start justify-start sm:items-end sm:justify-end lg:items-start lg:justify-start gap-6 mt-auto lg:mt-0 min-w-[330px] lg:min-w-full w-full">
          <div className="text-black font-urbanist flex gap-4 sm:gap-6 items-center justify-center">
            <div className="flex items-center gap-2 justify-center">
              <Phone className="lg:h-5 lg:w-5 h-4 w-4" aria-hidden />
              <a href="tel:08010880109" className="text-black font-urbanist 2xl:text-[20px] xl:text-[18px] md:text-[16px] sm:text-[14px] text-[12px]">
                080108 80109
              </a>
            </div>
            <div className="w-[1px] lg:h-[20px] h-[16px] bg-[#E9EAEC]"></div>
            <div className="flex items-center gap-2 justify-center">
              <Mail className="lg:h-5 lg:w-5 h-4 w-4" aria-hidden />
              <a href="mailto:hello@alpheric.com" className="text-black font-urbanist 2xl:text-[20px] xl:text-[18px] md:text-[16px] sm:text-[14px] text-[12px]">
                hello@alpheric.com
              </a>
            </div>
          </div>

          <a
            href="#"
            className="inline-flex items-center 2xl:text-[20px] xl:text-[18px] md:text-[16px] text-[14px] gap-4 font-urbanist border-2 border-[#F0F1F2] lg:px-6 lg:py-[10px] px-4 py-[8px] text-black"
          >
            Download Alpheric’s Profile PDF 😊
            <Download className="lg:h-[40px] md:h-[32px] w-auto h-[20px] " aria-hidden />
          </a>
          </div>
        </div>

        {/* Column: Say hello + socials */}
        <div className="w-full lg:w-1/2 flex flex-row gap-[32px] lg:justify-between items-start">
        <div className="hidden gap-4 sm:flex flex-col items-start justify-start lg:min-w-[135px] w-full">
          <h4 className="2xl:text-[24px] xl:text-[20px] lg:text-[18px] md:text-[16px] sm:text-[14px] text-[12px] text-black font-urbanist">Say Hello 👋</h4>
          <ul className="text-black font-urbanist 2xl:text-[24px] xl:text-[20px] lg:text-[18px] md:text-[16px] sm:text-[14px] text-[12px] gap-4 flex flex-col items-start justify-start">
            {socials.map(({ label, href, Icon }) => (
              <li key={label}>
                <a
                  href={href}
                  className="group inline-flex items-center gap-3 text-black font-urbanist 2xl:text-[24px] xl:text-[20px] lg:text-[18px] md:text-[16px] sm:text-[14px] text-[12px] "
                  aria-label={label}
                >
                  {Icon}
                  <span>{label}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Column: left nav */}
        <div className="lg:gap-4 gap-2 flex flex-col items-start justify-start lg:min-w-[80px] w-full">
          <ul className="text-black font-urbanist 2xl:text-[24px] xl:text-[20px] lg:text-[18px] md:text-[16px] sm:text-[14px] text-[12px] gap-4 flex flex-col items-start justify-start lg:h-[48px]">
            {leftNav.map((item) => (
              <li key={item.label}>
                <a
                  className="text-black font-urbanist 2xl:text-[24px] xl:text-[20px] lg:text-[18px] md:text-[16px] sm:text-[14px] text-[12px] inline-flex items-center"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Column: right nav */}
        <div className="lg:gap-4 gap-2 flex flex-col items-start justify-start lg:min-w-[100px] w-full">
          <ul className="text-black font-urbanist 2xl:text-[24px] xl:text-[20px] lg:text-[18px] md:text-[16px] sm:text-[14px] text-[12px] gap-4 flex flex-col items-start justify-start ">
            {rightNav.map((item) => (
              <li key={item.label}>
                <a
                  className="text-black font-urbanist 2xl:text-[24px] xl:text-[20px] lg:text-[18px] md:text-[16px] sm:text-[14px] text-[12px] inline-flex items-center"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
        </div>
      </div>
      </div>
      <div className="mx-auto px-4 sm:px-6 md:px-12 lg:px-[80px] xl:px-[120px] 2xl:px-[200px] xl:py-[32px] lg:py-[24px] py-[16px] flex flex-row max-[470px]:flex-col justify-between sm:items-center items-start sm:gap-4 gap-2">
        <p className="text-black/70 font-urbanist 2xl:text-[24px] xl:text-[22px] md:text-[18px] sm:text-[16px] text-[14px]">© {new Date().getFullYear()} Alpheric</p>
        <div className="flex flex-wrap justify-center gap-4 lg:gap-8 xl:gap-[48px]">
          <a href="#" className="text-black font-urbanist 2xl:text-[24px] xl:text-[20px] lg:text-[18px] md:text-[16px] sm:text-[14px] text-[12px]">Sitemap</a>
          <a href="#" className="text-black font-urbanist 2xl:text-[24px] xl:text-[20px] lg:text-[18px] md:text-[16px] sm:text-[14px] text-[12px]">Privacy Policy</a>
          <a href="#" className="text-black font-urbanist 2xl:text-[24px] xl:text-[20px] lg:text-[18px] md:text-[16px] sm:text-[14px] text-[12px]">Terms of Use</a>
          <a href="#" className="text-black font-urbanist 2xl:text-[24px] xl:text-[20px] lg:text-[18px] md:text-[16px] sm:text-[14px] text-[12px]">Cookie Policy</a>
          <a href="#top" className="text-black font-urbanist 2xl:text-[24px] xl:text-[20px] lg:text-[18px] md:text-[16px] sm:text-[14px] text-[12px] md:inline-flex items-center gap-1 hidden">Goto Top <ArrowUp size={24} /></a>
        </div>
      </div>
    </footer>
  );
};

export default FooterAlpheric;

















