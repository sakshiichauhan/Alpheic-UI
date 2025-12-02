import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import SneekPeak from '@/Components/SneekPeak';

interface CardProps {
  title: string;
  children: React.ReactNode;
}

const Card: React.FC<CardProps> = ({ title, children }) => {
  return (
    <div className="border border-[#D2D3D7] flex flex-col 2xl:max-h-[384px]   min-h-[281px] p-4 sm:p-5 2xl:p-6 xl:p-2 bg-white">
      <h3 className="font-urbanist text-[#4B4B4B] font-bold mb-2 text-[24px] sm:text-[22px] md:text-[24px] lg:text-[28px] xl:text-[28px] 2xl:text-[32px]">
        {title}
      </h3>
      <div className="font-urbanist flex flex-col flex-1 text-[14px] sm:text-[15px] md:text-[16px] lg:text-[17px] xl:text-[18px] 2xl:text-[20px] text-[var(--medium-text)]">
        {children}
      </div>
    </div>
  );
};

const ContractGrid = () => {
  const cardData = [
    {
      title: 'Headquarters',
      content: (
        <>
          <p className="mb-2">
            <span className="font-semibold">Alpheric Consultants Pvt. Ltd.</span>
            <br />
            Magnus Tower, Sector 73
            <br />
            Noida, Uttar Pradesh, India
          </p>
          <p className="font-bold text-[14px] sm:text-[16px] 2xl:text-[24px]">Sales Office</p>
          <p className="mb-6">
            <span className="font-semibold text-[14px] sm:text-[16px] 2xl:text-[20px]">VBC, Thapar House</span>
            <br />
            Janpath, New Delhi, India
          </p>
          <p>Phone: +91 80108 80109</p>
          <p>
            Email:{' '}
            <a href="mailto:hello@alpheric.com" className="text-[var(--color)] underline">
              hello@alpheric.com
            </a>
          </p>
        </>
      ),
    },
    {
      title: 'New Business',
      content: (
        <>
          <p className="mb-2">
            <span className="font-semibold text-[14px] sm:text-[16px] 2xl:text-[20px]">
              Looking to work with us?
            </span>
            <br />
            Our team partners with organizations to design, build, and scale digital ecosystems blending strategy, design, technology, and marketing.
          </p>
          <p className="font-semibold mb-auto">Tell us your interest or start a conversation here</p>
          <Link
            to="/new-business-inquiry"
            className="flex items-center mt-auto text-[#000] text-[14px] sm:text-[16px] 2xl:text-[20px]"
          >
            Start a Project{' '}
            <ArrowUpRight
              size={40}
              className="text-[var(--color)] w-[18px] h-[18px] sm:w-[22px] sm:h-[22px] 2xl:w-[40px] 2xl:h-[40px] ml-1"
            />
          </Link>
        </>
      ),
    },
    {
      title: 'Careers',
      content: (
        <>
          <p className="mb-2">
            <span className="font-semibold text-[20px]">Join the Mavericks.</span>
            <br />
            Work alongside creative minds, engineers, and strategists shaping digital transformation across industries.
          </p>
          <p className="2xl:mb-9 mb-auto xl:text-[17px] font-urbanist">
            Explore what a career at Alpheric looks like or stay connected with us on social media.
          </p>
          <a href="/Careers" className="mt-4 flex items-center text-[#000]">
            Visit Careers Page <ArrowUpRight size={40} className="text-[var(--color)] w-[18px] h-[18px] sm:w-[22px] sm:h-[22px] 2xl:w-[40px] 2xl:h-[40px] ml-1" />
          </a>
        </>
      ),
    },
    {
      title: 'Partnerships',
      content: (
        <>
          <p className="mb-auto">
            <span className="font-semibold mb-2">Collaborate for Impact.</span>
            <br />
            We work with schools, NGOs, startups, and enterprise partners to co-create solutions that drive growth and inclusion.
          </p>
          <p className="mt-3 font-semibold">For partnerships and collaborations:</p>
          <a
            href="mailto:partners@alpheric.com"
            className="underline decoration-[var(--color)] break-all"
          >
            partners@alpheric.com
          </a>
        </>
      ),
    },
    {
      title: 'Insights & Thinking',
      content: (
        <>
          <p className="mb-2">
            <span className="font-semibold">Explore Ideas That Inspire.</span>
            <br />
            Dive into our latest perspectives, case studies, and stories on innovation, design, and technology shaping the future.
          </p>
          <p className="mb-2 font-semibold">
            For features, interviews, or collaboration stories, reach out to:
          </p>
          <a
            href="mailto:insights@alpheric.com"
            className="underline decoration-[var(--color)] mb-4 break-all"
          >
            insights@alpheric.com
          </a>
          <a href="/Insights" className="flex items-center">
            View Insights{' '}
            <ArrowUpRight size={40} className="text-[var(--color)] w-[18px] h-[18px] sm:w-[22px] sm:h-[22px] 2xl:w-[40px] 2xl:h-[40px] ml-1" />
          </a>
        </>
      ),
    },
    {
      title: 'Alumni Network',
      content: (
        <>
          <p className="mb-auto">
            <span className="font-semibold">Once Alpheric, Always Alpheric.</span>
            <br />
            Stay connected, explore opportunities, and be part of our growing creative network.
          </p>
          <a
            href="mailto:alumni@alpheric.com"
            className="underline decoration-[var(--color)] mt-auto break-all"
          >
            alumni@alpheric.com
          </a>
        </>
      ),
    },
  ];

  return (
    <div className="bg-white font-sans px-4 sm:px-6 md:px-10 lg:px-[80px] xl:px-[120px] 2xl:px-[200px] py-8 md:py-[52px] lg:py-[60px] xl:py-[72px] 2xl:py-[84px]">
      <div>
        {/* Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {cardData.map((card, index) => (
            <Card key={index} title={card.title}>
              {card.content}
            </Card>
          ))}
        </div>

        {/* Follow Us Section */}
        <div className="text-center mt-10 md:mt-12 lg:mt-[24px] xl:mt-[32px] 2xl:mt-[40px] mb-8 lg:mb-[32px]">
          <h2 className="font-semibold text-gray-800 text-[20px] sm:text-[24px] md:text-[28px] lg:text-[32px] 2xl:text-[40px] mb-3">
            Follow Us
          </h2>
          <p className="text-gray-600 leading-relaxed max-w-3xl mx-auto text-[14px] sm:text-[16px] md:text-[18px] lg:text-[20px] 2xl:text-[24px] px-2">
            Join us across platforms to explore our latest insights, see our culture in action, and discover how we're helping brands build the extraordinary.
          </p>
        </div>

        <SneekPeak heading="CONNECT WITH US" />
      </div>
    </div>
  );
};

export default ContractGrid;
