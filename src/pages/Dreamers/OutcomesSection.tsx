import React, { useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '@/store';
import { fetchPilotByName, selectPilot, selectPilotLoading, isPilotSectionEnabled, selectPilots } from '@/store/Slice/Pilot/PilotThunk';
import { findOriginalPilotName } from '@/utils/urlMapping';
import { ParsedHtml } from '@/Components/ParsedHtml';
import Sparkles from "@/assets/logo/Sparky.png";

// Normalize API file paths to absolute URLs (same as DesignInsights.tsx)
const getImageUrl = (path?: string | null) => {
  if (!path) return "";
  const trimmed = path.trim();
  if (!trimmed) return "";
  if (trimmed.startsWith("/files/")) return `https://work.alpheric.com${trimmed}`;
  if (trimmed.startsWith("http://") || trimmed.startsWith("https://")) return trimmed;
  return "";
};

// --- 2. Reusable Outcome Card Component ---

const OutcomeCard: React.FC<{ 
    title: string;
    description: string;
    icon?: string;
}> = ({ title, description, icon }) => {
    return (
        <div className="flex flex-col xl:gap-6 md:gap-4 gap-2 bg-white 2xl:p-8 xl:p-6 lg:p-5 p-4 ">
            {/* Icon: Use API image if available, otherwise use default sparkles */}
            {icon ? (
                <img 
                    src={getImageUrl(icon) || Sparkles} 
                    alt={title} 
                    className="xl:w-[48px] xl:h-[48px] lg:w-[40px] lg:h-[40px] md:w-[32px] md:h-[32px] w-[24px] h-[24px] object-contain"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                    }}
                />
            ) : (
                <img 
                    src={Sparkles as string} 
                    alt="Sparkles" 
                    className="xl:w-[48px] xl:h-[48px] lg:w-[40px] lg:h-[40px] md:w-[32px] md:h-[32px] w-[24px] h-[24px]"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                />
            )}

            <div>
                {/* Title: Bold and slightly larger font */}
                <h3 className="2xl:text-[24px] xl:text-[20px] lg:text-[18px] md:text-[16px] text-[14px] font-semibold text-black">
                    {title}
                </h3>

                {/* Description: Medium text size and color */}
                <p className="2xl:text-[20px] xl:text-[18px] lg:text-[16px] md:text-[14px] text-[12px] text-[var(--medium-text)] font-urbanist">
                    {description}
                </p>
            </div>
        </div>
    );
};


// --- 3. Main Outcomes Section Component ---

const OutcomesSection: React.FC = () => {
    // Get pilot name from URL params
    const { pilotName } = useParams<{ pilotName?: string }>();
    const dispatch = useDispatch<AppDispatch>();
    const pilots = useSelector(selectPilots);
    
    // Map cleaned URL name back to original pilot name for API calls
    const activePilotName = useMemo(() => {
        if (!pilotName) return "Dreamer"; // Default fallback
        
        const pilotNames = Object.keys(pilots).length > 0 
          ? Object.keys(pilots) 
          : ['Dreamer', 'Startups', 'SMBs', 'Enterprises']; // Fallback to default names
        
        const originalName = findOriginalPilotName(pilotName, pilotNames);
        return originalName || pilotName;
    }, [pilotName, pilots]);

    const pilotData = useSelector((state: RootState) => selectPilot(state, activePilotName));
    const loading = useSelector(selectPilotLoading);

    useEffect(() => {
        if (!pilotData && !loading) {
            dispatch(fetchPilotByName(activePilotName));
        }
    }, [dispatch, pilotData, loading, activePilotName]);

    if (!isPilotSectionEnabled(pilotData?.outcomeinweeks)) {
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

    const headingHtml = pilotData?.outcomeinweeks_heading || '<div class="ql-editor read-mode"><p>Outcome in <strong>Weeks</strong></p></div>';
    const cards = pilotData?.outcomeinweeks_cards || [];

    return (
        <section className="bg-white 2xl:py-[84px] xl:py-[72px] lg:py-[60px] md:py-[52px] py-[40px]">
            <div className="px-4 sm:px-6 md:px-12 lg:px-[80px] xl:px-[120px] 2xl:px-[200px]">

                {/* Header */}
                <ParsedHtml
                    htmlContent={headingHtml}
                    as="h1"
                    className="text-center 2xl:text-[72px] xl:text-[60px] lg:text-[48px] md:text-[40px] sm:text-[32px] text-[24px] text-black lg:mb-[40px] md:mb-[32px] mb-[24px]"
                />

                {/* Responsive Grid with Border Styling to create the box effect */}
                {cards.length > 0 ? (
                    <div className={`
                        grid grid-cols-1 
                        ${cards.length === 2 ? 'lg:grid-cols-2' : cards.length === 3 ? 'lg:grid-cols-3' : 'lg:grid-cols-4'}
                        border-t border-b border-l border-[var(--border-color)] 
                        divide-x divide-[var(--border-color)]
                        lg:gap-0 md:gap-4 gap-2 
                        sm:grid-cols-2 lg:border-r
                    `}>
                        {cards.map((card, index) => (
                            <OutcomeCard 
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

export default OutcomesSection;