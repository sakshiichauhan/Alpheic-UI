import React, { useMemo, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@/store";
import { fetchPilotPageData, isEnabled, selectPilotBannerSteps } from "@/store/Slice/Pilot/PilotPageThunk";
import { ParsedHtml } from "@/Components/ParsedHtml";
import baground1 from "@/assets/Pilot_assets/bg.png";
import o1 from "@/assets/CareerPage/o1.png";
import o2 from "@/assets/CareerPage/o2.png";
import o3 from "@/assets/CareerPage/o3.png";
import o4 from "@/assets/CareerPage/o4.png";

// Define the type for a single hiring step
type PilotStep = {
  id?: string;
  title?: string;
  description?: string;
  duration?: string;
  image: string; // Required - always use local images
};

// Data for the hiring steps
const defaultSteps: PilotStep[] = [
  {
    id: '01',
    title: 'Discover',
    description: 'Day 1 to 2 <br/> Align goals, audience, scope',
    image: o1,
  },
  {
    id: '02',
    title: 'Build',
    description: 'Week 1 to 3 <br/> Design and tech and content',
    image: o2,
  },
  {
    id: '03',
    title: 'Ship',
    description: 'Week 2 to 4 <br/> Launch and measure KPIs',
    image: o3,
  },
  {
    id: '04',
    title: 'Decide',
    description: 'Next step <br/> Scale or refine or pivot',
    image: o4,
  },
];

const fallbackImages = [o1, o2, o3, o4];

const PilotsWork: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { data, loading } = useSelector((state: RootState) => state.pilotPage);

  useEffect(() => {
    if (!data && !loading) {
      dispatch(fetchPilotPageData());
    }
  }, [data, loading, dispatch]);

  // Always render the component with images, even if banner is disabled
  const isBannerEnabled = isEnabled(data?.banner);

  // Get HTML content from backend for banner name
  const titleHtml = data?.banner_name || '<p>How pilots work</p>';
  const bannerSteps = useMemo(() => selectPilotBannerSteps(data), [data]);

  // Always render steps with local images
  // If API data exists and banner is enabled, use API data but keep local images
  const stepsToRender: PilotStep[] = useMemo(() => {
    if (isBannerEnabled && bannerSteps && bannerSteps.length > 0) {
      // Use API data but always use local images
      return bannerSteps.map((step, index) => ({
        id: String(index + 1).padStart(2, '0'),
        title: step.name || defaultSteps[index]?.title || `Step ${index + 1}`,
        description: step.description || defaultSteps[index]?.description || '',
        duration: step.duration || defaultSteps[index]?.duration,
        // Always use local imported images (o1, o2, o3, o4)
        image: fallbackImages[index % fallbackImages.length],
      }));
    }
    // Always return default steps with local images
    return defaultSteps;
  }, [bannerSteps, isBannerEnabled]);

  return (
    <section className="p-[24px]">
      
      <div className="relative h-full p-[3px] bg-gradient-to-br from-white/50 via-gray-400/50 to-gray-400/50">
    <div className="relative overflow-hidden py-[84px] px-4 sm:px-6 md:px-12 lg:px-[80px] xl:px-[120px] 2xl:px-[224px] bg-gradient-to-b from-[#62D5E8] to-[#678DFE] text-white">
      
      {/* Background Image - at the very bottom */}
      <img
        src={baground1}
        alt="Decorative background"
        className="absolute inset-0 w-full h-full object- cover z-0"
      />

      {/* Black Overlay - sits on top of the image */}
      <div className="absolute inset-0 z-[1] bg-black/20" />

      {/* Top Left Circle */}
      <div className="absolute hidden md:block top-3 left-12 w-[240px] h-[240px] rounded-full border-[7px] border-white  -translate-x-1/2 -translate-y-1/2 z-[2]"></div>
      {/* Mid Left Circle */}
      <div className="absolute hidden md:block 2xl:bottom-5 bottom-9 2xl:left-5 -left-12  2xl:w-[408px] 2xl:h-[400px] w-[300px] h-[300px] rounded-full border-[7px] border-white -translate-x-1/2 translate-y-1/2 z-[2]"></div>
      {/* Bottom Right Circle */}
        <div className="absolute hidden md:block top-5 right-0 lg:-right-10 w-[164px] h-[160px] rounded-full border-[7px] border-white translate-x-1/2 -translate-y-1/2 z-[2]"></div>
      {/* Mid Right Circle */}
      <div className="absolute hidden md:block bottom-10 -right-10 w-[264px] h-[264px] rounded-full border-[7px] border-white translate-x-1/2 translate-y-1/2 z-[2]"></div>


      {/* Main content container - has z-10, so it's on top of everything else */}
      <div className="relative z-10 flex flex-col items-center gap-[42px]">
        <ParsedHtml
          htmlContent={titleHtml}
          as="h2"
          className="2xl:text-[72px] xl:text-[60px] lg:text-[48px] md:text-[36px] text-[32px] text-center"
        />
        <div className="flex flex-col lg:flex-row gap-[24px] items-center lg:items-start w-full">
          {stepsToRender.map((step, index) => (
            <React.Fragment key={step.id || index}>
              <div className="relative flex flex-col items-center text-center bg-transparent w-full lg:w-auto">
                {/* Step Number - Always show local images */}
                <img 
                  src={step.image} 
                  alt={step.title || `Step ${index + 1}`} 
                  className="2xl:w-[94px] xl:w-[80px] lg:w-[64px] md:w-[52px] w-[46px] h-auto mb-[16px]"
                  onError={(e) => {
                    // Fallback to default image if one fails
                    const target = e.target as HTMLImageElement;
                    const fallbackIndex = index % fallbackImages.length;
                    target.src = fallbackImages[fallbackIndex];
                  }}
                />

                <h3 className="2xl:text-[28px] xl:text-[26px] lg:text-[24px] md:text-[22px] text-[20px] font-semibold text-white mb-2">
                  {step.title}
                </h3>
                <p className="2xl:text-[24px] xl:text-[20px] lg:text-[18px] md:text-[16px] text-[14px] font-urbanist text-white w-full text-center px-4 sm:px-0 mx-auto">
                  {(
                    (step.duration ? `${step.duration} <br/>` : '') +
                    (step.description || '')
                  )
                    .split('<br/>')
                    .map((line, i, arr) => (
                    <React.Fragment key={i}>
                      {line}
                      {i < arr.length - 1 && <br />}
                    </React.Fragment>
                  ))}
                </p>
              </div>
              {/* Dotted line separator - only show between items (3 lines) */}
              {index < stepsToRender.length - 1 && (
                <>
                  {/* Vertical line for mobile/tablet */}
                  <div className="flex lg:hidden h-[60px] items-center justify-center">
                    <div className="h-full min-w-[3.50px] border-l-[3.50px] border-dashed border-white border-opacity-50"></div>
                  </div>
                  {/* Horizontal line for desktop */}
                  <div className="hidden lg:block flex-1 min-w-[24px] self-stretch relative">
                    <div className="absolute top-[47px] xl:-left-15 -left-10 xl:-right-15 -right-10 h-0 border-t-[3.50px] border-dashed border-white border-opacity-50"></div>
                  </div>
                </>
              )}
            </React.Fragment>
          ))}
        </div>
        </div>
      </div>
      </div>
    </section>
  );
};

export default PilotsWork;