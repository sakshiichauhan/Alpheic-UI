import React, { useEffect, useRef, useState } from 'react';
import Figma from '@/assets/Tools/Design1.png';
import AdobeXD from '@/assets/Tools/Design2.png';
import Illustrator from '@/assets/Tools/Design3.png';
import Photoshop from '@/assets/Tools/Design4.png';
import Sketch from '@/assets/Tools/Design5.png';
import InDesign from '@/assets/Tools/Design6.png';

import Visual1 from '@/assets/Tools/Visual1.png';
import Visual2 from '@/assets/Tools/Visual2.png';
import Visual3 from '@/assets/Tools/Visual3.png';
import Visual4 from '@/assets/Tools/Visual4.png';
import Visual5 from '@/assets/Tools/Visual5.png';
import Visual6 from '@/assets/Tools/Visual6.png';

import Motion1 from '@/assets/Tools/Ai1.png';
import Motion2 from '@/assets/Tools/Ai2.png';
import Motion3 from '@/assets/Tools/Ai3.png';
import Motion4 from '@/assets/Tools/Ai4.png';
import Motion5 from '@/assets/Tools/Ai5.png';
import Motion6 from '@/assets/Tools/Ai6.png';

import Testing1 from '@/assets/Tools/Testing1.png';
import Testing2 from '@/assets/Tools/Testing2.png';
import Testing3 from '@/assets/Tools/Testing3.png';
import Testing4 from '@/assets/Tools/Testing4.png';
import Testing5 from '@/assets/Tools/Testing5.png';
import Testing6 from '@/assets/Tools/Testing6.png';

import Collaboration1 from '@/assets/Tools/Collab1.png';
import Collaboration2 from '@/assets/Tools/Collab2.png';
import Collaboration3 from '@/assets/Tools/Collab3.png';
import Collaboration4 from '@/assets/Tools/Collab4.png';
import Collaboration5 from '@/assets/Tools/Collab5.png';
import Collaboration6 from '@/assets/Tools/Collab6.png';
import Collaboration7 from '@/assets/Tools/Collab7.png';
import Collaboration8 from '@/assets/Tools/Collab8.png';

interface Tool {
  id: number;
  name: string;
  category: string;
  iconSrc: string; // Placeholder for the actual icon image path
}

// Full list of tools (only displaying the "Design And Prototype" set for clarity)
const ALL_TOOLS: Tool[] = [
  { id: 1, name: 'Figma', category: 'Design And Prototype', iconSrc: Figma },
  { id: 2, name: 'Adobe XD', category: 'Design And Prototype', iconSrc: AdobeXD },
  { id: 3, name: 'Illustrator', category: 'Design And Prototype', iconSrc: Illustrator },
  { id: 4, name: 'Photoshop', category: 'Design And Prototype', iconSrc: Photoshop },
  { id: 5, name: 'Sketch', category: 'Design And Prototype', iconSrc: Sketch },
  { id: 6, name: 'InDesign', category: 'Design And Prototype', iconSrc: InDesign },

  { id: 7, name: 'SketchUp', category: '3D And Visualization', iconSrc: Visual1 },
  { id: 8, name: 'AutoCAD', category: '3D And Visualization', iconSrc: Visual2 },
  { id: 9, name: 'Blender', category: '3D And Visualization', iconSrc: Visual3 },
  { id: 10, name: 'Lumion', category: '3D And Visualization', iconSrc: Visual4 },
  { id: 11, name: 'Enscape', category: '3D And Visualization', iconSrc: Visual5 },
  { id: 12, name: 'V Ray', category: '3D And Visualization', iconSrc: Visual6 },

  { id: 13, name: 'Runway', category: 'AI And Motion', iconSrc: Motion1 },
  { id: 14, name: 'Kaiber', category: 'AI And Motion', iconSrc: Motion2 },
  { id: 15, name: 'Spline', category: 'AI And Motion', iconSrc: Motion3 },
  { id: 16, name: 'After Effects', category: 'AI And Motion', iconSrc: Motion4 },
  { id: 17, name: 'Midjourney', category: 'AI And Motion', iconSrc: Motion5 },
  { id: 18, name: 'Pika', category: 'AI And Motion', iconSrc: Motion6 },

  { id: 19, name: 'Maze', category: 'Testing And Research', iconSrc: Testing1 },
  { id: 20, name: 'Hotjar', category: 'Testing And Research', iconSrc: Testing2 },
  { id: 21, name: 'Google Analytics', category: 'Testing And Research', iconSrc: Testing3 },
  { id: 22, name: 'Usability', category: 'Testing And Research', iconSrc: Testing4 },
  { id: 23, name: 'Hub', category: 'Testing And Research', iconSrc: Testing5 },
  { id: 24, name: 'Optimal Workshop', category: 'Testing And Research', iconSrc: Testing6 },

  { id: 25, name: 'Notion', category: 'Collaboration And Delivery', iconSrc: Collaboration1 },
  { id: 26, name: 'Jira', category: 'Collaboration And Delivery', iconSrc: Collaboration2 },
  { id: 27, name: 'Slack', category: 'Collaboration And Delivery', iconSrc: Collaboration3 },
  { id: 28, name: 'GitHub', category: 'Collaboration And Delivery', iconSrc: Collaboration4 },
  { id: 29, name: 'AWS S3', category: 'Collaboration And Delivery', iconSrc: Collaboration5 },
  { id: 30, name: 'Zeplin', category: 'Collaboration And Delivery', iconSrc: Collaboration6 },
  { id: 31, name: 'Amazon S3', category: 'Collaboration And Delivery', iconSrc: Collaboration7 },
  { id: 32, name: 'Zeroheight', category: 'Collaboration And Delivery', iconSrc: Collaboration8 },
];

// List of all unique categories, plus 'All'
const CATEGORIES = [
  'All',
  'Design And Prototype',
  '3D And Visualization',
  'AI And Motion',
  'Testing And Research',
  'Collaboration And Delivery',
];

// --- Helper Component: Tool Icon Card ---

interface ToolCardProps {
  tool: Tool;
}

const ToolCard: React.FC<ToolCardProps> = ({ tool }) => (
  <div className="flex flex-col items-center justify-center px-4 py-6 2xl:w-[192px] xl:w-[170px] lg:w-[140px] md:w-[112px] w-[104px]">
    {/* Tool Icon Container (for size and background) */}
    <div className="2xl:w-[72px] 2xl:h-[72px] xl:w-[64px] xl:h-[64px] lg:w-[56px] lg:h-[56px] md:w-[48px] md:h-[48px] sm:w-[40px] sm:h-[40px] w-[32px] h-[32px] mb-[10px]">
      <img 
        src={tool.iconSrc} 
        alt={`${tool.name} logo`} 
        className="2xl:min-w-[72px] 2xl:min-h-[72px] xl:min-w-[64px] xl:min-h-[64px] lg:min-w-[56px] lg:min-h-[56px] md:min-w-[48px] md:min-h-[48px] sm:min-w-[40px] sm:min-h-[40px] w-[32px] h-[32px] object-contain" 
      />
    </div>
    <span className="2xl:text-[24px] xl:text-[20px] lg:text-[18px] md:text-[16px] text-[14px] font-urbanist text-[var(--hero-text)]">{tool.name}</span>
  </div>
);

// --- Main Component: ToolsSection ---

const ToolsSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('Design And Prototype');
  const [isOverflowing, setIsOverflowing] = useState(false);
  const listRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const element = listRef.current;
    if (!element) return;

    const measureOverflow = () => {
      setIsOverflowing(element.scrollWidth - element.clientWidth > 1);
    };

    measureOverflow();

    const resizeObserver = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(measureOverflow) : null;
    resizeObserver?.observe(element);

    window.addEventListener('resize', measureOverflow);

    return () => {
      resizeObserver?.disconnect();
      window.removeEventListener('resize', measureOverflow);
    };
  }, []);

  useEffect(() => {
    const element = listRef.current;
    if (!element) return;
    setIsOverflowing(element.scrollWidth - element.clientWidth > 1);
  }, [activeCategory]);

  // Filter tools based on the active category
  const filteredTools = ALL_TOOLS.filter(tool => 
    activeCategory === 'All' || tool.category === activeCategory
  );

  return (
    <section className="2xl:py-[84px] xl:py-[72px] py-[64px] bg-white px-4 sm:px-6 md:px-12 lg:px-[80px] xl:px-[120px] 2xl:px-[200px]">
      <div className="text-center flex flex-col items-center gap-[32px]">
        
        {/* --- Header --- */}
        <div className="flex flex-col items-center xl:gap-[16px] lg:gap-[12px] md:gap-[8px] sm:gap-[6px] gap-[4px]">
        <h2 className="2xl:text-[72px] xl:text-[60px] lg:text-[48px] md:text-[40px] sm:text-[38px] text-[32px] font-semibold text-black">
          Tools we use
        </h2>
        <p className="2xl:text-[24px] xl:text-[20px] lg:text-[18px] md:text-[16px] sm:text-[14px] text-[12px] font-urbanist text-[var(--medium-text)]">
          Technology that enhances design and delivery.
        </p>
        </div>
        {/* --- Category Tabs (Navigation) --- */}
        <nav className="w-full self-stretch">
          <ul
            ref={listRef}
            className={`flex flex-nowrap overflow-x-auto no-scrollbar border-b border-[#E9EAEC] gap-2 sm:gap-3 md:gap-4 lg:gap-0 ${
              isOverflowing
                ? 'justify-start '
                : 'justify-center '
            }`}
          >
            {CATEGORIES.map(category => (
              <li key={category} className="cursor-pointer relative">
                <button
                  onClick={() => setActiveCategory(category)}
                  className={`xl:text-[20px] lg:text-[18px] md:text-[16px] text-[14px] font-urbanist font-medium border-2 lg:border-0 lg:border-b-[4px] xl:py-5 md:py-3 py-2 xl:px-6 md:px-4 px-2 transition-all duration-300 whitespace-nowrap ${
                    category === activeCategory
                      ? 'text-black border-[var(--color)] bg-[var(--color)]/10' 
                      : 'text-[var(--medium-text)] hover:text-[var(--hero-color)] bg-transparent border-[#E9EAEC] lg:border-transparent '
                  }`}
                >
                  {category}
                </button>
              </li>
            ))}
          </ul>
        </nav>
        
        {/* --- Tools Display --- */}
        <div className="flex flex-wrap justify-center max-w-[1310px] mx-auto">
          {/*
            NOTE: The image shows 6 tools, so I've used the first 6 tools from the ALL_TOOLS list.
            If you click 'Design And Prototype' (the default), it will show these.
          */}
          {filteredTools.map(tool => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
        </div>
        
      </div>
    </section>
  );
};

export default ToolsSection;