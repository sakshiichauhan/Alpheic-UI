import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '@/store';
import { fetchPilotByName, selectPilot, selectPilotLoading, isPilotSectionEnabled, buildPilotImageUrl } from '@/store/Slice/Pilot/PilotThunk';
import { ParsedHtml } from '@/Components/ParsedHtml';

// --- 2. Reusable Feature Card Component ---

const FeatureCard: React.FC<{ 
  title: string;
  description: string;
  icon?: string;
}> = ({ title, description, icon }) => {
  return (
    <div className="flex flex-col 2xl:gap-4 gap-2 border border-[var(--border-color)] bg-white xl:p-6 lg:p-5 p-4 ">
      {icon && (
        <img 
          src={buildPilotImageUrl(icon)} 
          alt={title} 
          className="text-black 2xl:w-[61px] 2xl:h-[61px] xl:w-[52px] xl:h-[52px] lg:w-[48px] lg:h-[48px] md:w-[40px] md:h-[40px] w-[32px] h-[32px] object-contain"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.style.display = 'none';
          }}
        />
      )}
      
      <div>
        <h3 className="2xl:text-[24px] xl:text-[20px] lg:text-[18px] md:text-[16px] text-[14px] font-semibold text-black">
          {title}
        </h3>
        
        <p className="2xl:text-[24px] xl:text-[20px] lg:text-[18px] md:text-[16px] text-[14px] text-[var(--medium-text)] font-urbanist">
          {description}
        </p>
      </div>
    </div>
  );
};


// --- 3. Main Section Component ---

const WhoItHelpsSection: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const pilotData = useSelector((state: RootState) => selectPilot(state, "Dreamer"));
  const loading = useSelector(selectPilotLoading);

  useEffect(() => {
    if (!pilotData && !loading) {
      dispatch(fetchPilotByName("Dreamer"));
    }
  }, [dispatch, pilotData, loading]);

  if (!isPilotSectionEnabled(pilotData?.whoithelps)) {
    return null;
  }

  // Show loading state
  if (loading && !pilotData) {
    return (
      <section className="bg-white 2xl:py-[84px] xl:py-[72px] lg:py-[60px] md:py-[52px] py-[40px]">
        <div className="px-4 sm:px-6 md:px-12 lg:px-[80px] xl:px-[120px] 2xl:px-[200px]">
          <div className="animate-pulse">
            <div className="h-16 bg-gray-200 rounded mb-8"></div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-48 bg-gray-200 rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  const headingHtml = pilotData?.whoithelps_heading || '<div class="ql-editor read-mode"><p>Who it <strong>Helps</strong></p></div>';
  const cards = pilotData?.whoithelps_cards || [];

  return (
    <section className="bg-white 2xl:py-[84px] xl:py-[72px] lg:py-[60px] md:py-[52px] py-[40px]">
      <div className="px-4 sm:px-6 md:px-12 lg:px-[80px] xl:px-[120px] 2xl:px-[200px]">
        
        {/* Header */}
        <ParsedHtml
          htmlContent={headingHtml}
          as="h1"
          className="text-center 2xl:text-[72px] xl:text-[60px] lg:text-[48px] md:text-[40px] sm:text-[32px] text-[24px] text-black lg:mb-[40px] md:mb-[32px] mb-[24px]"
        />
        
        {/* Responsive Grid: Stacks on mobile, 4 columns on large screens */}
        {cards.length > 0 ? (
          <div className="grid grid-cols-1 lg:gap-6 md:gap-4 gap-2 sm:grid-cols-2 lg:grid-cols-4">
            {cards.map((card, index) => (
              <FeatureCard 
                key={card.name || index} 
                title={card.title || ''}
                description={card.description || ''}
                icon={card.attach_image}
              />
            ))}
          </div>
        ) : null}
        
      </div>
    </section>
  );
};

export default WhoItHelpsSection;