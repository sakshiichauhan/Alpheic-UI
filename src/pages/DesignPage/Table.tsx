import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@/store";
import { fetchPilotPageData } from "@/store/Slice/Pilot/PilotPageThunk";
import { fetchPilots, selectPilots, buildPilotImageUrl } from "@/store/Slice/Pilot/PilotThunk";
import { fetchSubPilots, selectSubPilots, selectSubPilotLoading, selectSubPilotError } from "@/store/Slice/Pilot/SubPilotThunk";
import { fetchDesignPageL2Data } from "@/store/Slice/UxDesgin/DesginPageThunk";
import { ParsedHtml } from "@/Components/ParsedHtml";
import ViewScope from "@/Components/PopUp/ViewScope";
import icon1 from "@/assets/Pilot_assets/Icon1.png";
import icon2 from "@/assets/Pilot_assets/Icon2.png";
import icon3 from "@/assets/Pilot_assets/Icon3.png";
import icon4 from "@/assets/Pilot_assets/Icon4.png";

type TabCategory = 'Dreamers' | 'Startups' | 'SMBs' | 'Enterprises';
type Icon = { [key in TabCategory]: string };

// Fallback icons if API doesn't provide icons
const fallbackIcons: Icon = {
  Dreamers: icon1,
  Startups: icon2,
  SMBs: icon3,
  Enterprises: icon4,
};

// Mapping from API pilot names to display names
const apiNameToDisplayName: Record<string, TabCategory> = {
  'Dreamer': 'Dreamers',
  'Startups': 'Startups',
  'SMBs': 'SMBs',
  'Enterprises': 'Enterprises',
};

type Program = {
  id: number;
  category: TabCategory;
  objective: string;
  pilot: string;
  serviceMix: string;
  kpi: string;
  duration: string;
  // Additional fields for ViewScope
  description?: string;
  deliverables?: string;
  features?: string[];
  scopeItems?: string[];
  objectivePoints?: Array<{ point?: string; [key: string]: any }>;
  // Button fields
  actionButton1?: string;
  actionButton2?: string;
  buttonText?: string;
  subPilotData?: any;
  // Internal button fields
  button1?: string;
  button2?: string;
};

const Table = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { data: pilotPageData, loading: pilotPageLoading } = useSelector((state: RootState) => state.pilotPage);
  const { data: designPageData, loading: designPageLoading } = useSelector((state: RootState) => state.designPageL2);
  const pilots = useSelector(selectPilots);
  const subPilots = useSelector(selectSubPilots);
  const subPilotLoading = useSelector(selectSubPilotLoading);
  const subPilotError = useSelector(selectSubPilotError);
  const [isViewScopeOpen, setIsViewScopeOpen] = useState(false);
  const [selectedProgram, setSelectedProgram] = useState<Program | null>(null);

  // Fetch design page data for table heading and flag
  useEffect(() => {
    if (!designPageData && !designPageLoading) {
      dispatch(fetchDesignPageL2Data('Design'));
    }
  }, [dispatch, designPageData, designPageLoading]);

  // Get pilot names dynamically from piolets_tabs API or fallback to loaded pilots
  const defaultPilotNames = useMemo(() => {
    // First try to use piolets_tabs from API
    if (pilotPageData?.piolets_tabs && pilotPageData.piolets_tabs.length > 0) {
      const namesFromTabs = pilotPageData.piolets_tabs
        .map(tab => tab.piolet_name)
        .filter((name): name is string => !!name);
      if (namesFromTabs.length > 0) {
        return namesFromTabs;
      }
    }
    // Fallback: use already loaded pilots
    const loadedPilotNames = Object.keys(pilots).filter(key => pilots[key]?.piolet_name);
    if (loadedPilotNames.length > 0) {
      return loadedPilotNames;
    }
    // Final fallback: try common pilot names if we have pilot page data but no tabs
    // This handles cases where piolets_tabs might not be set but pilots exist
    if (pilotPageData) {
      // Try to infer from piolets_list if available
      if (pilotPageData.piolets_list && pilotPageData.piolets_list.length > 0) {
        // Extract unique pilot names from piolets_list
        const namesFromList = pilotPageData.piolets_list
          .map(item => item.piolet_name)
          .filter((name): name is string => !!name);
        if (namesFromList.length > 0) {
          return Array.from(new Set(namesFromList));
        }
      }
    }
    // Final fallback: return empty array
    return [];
  }, [pilotPageData?.piolets_tabs, pilotPageData?.piolets_list, pilots]);

  // Fetch pilot page data
  useEffect(() => {
    if (!pilotPageData && !pilotPageLoading) {
      dispatch(fetchPilotPageData());
    }
  }, [pilotPageData, pilotPageLoading, dispatch]);

  // Fetch individual pilot data
  useEffect(() => {
    const pilotsToFetch = defaultPilotNames.filter(name => !pilots[name]);
    if (pilotsToFetch.length > 0) {
      dispatch(fetchPilots(pilotsToFetch));
    }
  }, [dispatch, pilots, defaultPilotNames]);

  // Fallback: If we don't have pilot names yet but have pilot page data, try fetching common pilots
  useEffect(() => {
    if (pilotPageData && defaultPilotNames.length === 0 && Object.keys(pilots).length === 0) {
      // Try fetching common pilot names as fallback
      const commonPilotNames = ['Dreamer', 'Startups', 'SMBs', 'Enterprises'];
      dispatch(fetchPilots(commonPilotNames));
    }
  }, [dispatch, pilotPageData, defaultPilotNames, pilots]);

  // Extract sub-pilot names from all pilots and fetch their details
  useEffect(() => {
    const subPilotNamesToFetch: string[] = [];
    
    defaultPilotNames.forEach((pilotName) => {
      const pilot = pilots[pilotName];
      // Check both select_sub_piolets and piolets_list
      const subPilotList = pilot?.select_sub_piolets || pilot?.piolets_list;
      if (subPilotList) {
        subPilotList.forEach((subPilot) => {
          if (subPilot.piolet && !subPilots[subPilot.piolet]) {
            subPilotNamesToFetch.push(subPilot.piolet);
          }
        });
      }
    });

    if (subPilotNamesToFetch.length > 0) {
      const uniqueSubPilotNames = Array.from(new Set(subPilotNamesToFetch));
      dispatch(fetchSubPilots(uniqueSubPilotNames));
    }
  }, [dispatch, pilots, subPilots, defaultPilotNames]);

  // Build tabs dynamically from API data
  const tabs: Array<{ name: TabCategory; apiName: string; icon?: string }> = useMemo(() => {
    // First try to use piolets_tabs from API
    if (pilotPageData?.piolets_tabs && pilotPageData.piolets_tabs.length > 0) {
      return pilotPageData.piolets_tabs
        .map(tab => {
          const apiName = tab.piolet_name || '';
          const displayName = apiNameToDisplayName[apiName] || apiName as TabCategory;
          return {
            name: displayName,
            apiName: apiName,
            icon: tab.piolet_icon,
          };
        })
        .filter(tab => tab.name && tab.apiName);
    }
    
    // Fallback: build from individual pilot data
    const pilotNames = defaultPilotNames.length > 0 ? defaultPilotNames : Object.keys(pilots);
    const tabsFromPilots = pilotNames
      .reduce<Array<{ name: TabCategory; apiName: string; icon?: string }>>((acc, apiName) => {
        const pilot = pilots[apiName];
        const displayName = apiNameToDisplayName[apiName];
        
        // Only add if pilot exists and is active, or if we have a valid display name
        if (pilot && (pilot.active === 1 || displayName)) {
          acc.push({
            name: displayName || pilot.piolet_name as TabCategory,
            apiName: apiName,
            icon: pilot.piolet_icon,
          });
        }
        return acc;
      }, []);
    
    // If we still don't have tabs, try using common pilot names as fallback
    if (tabsFromPilots.length === 0) {
      const commonPilotNames = ['Dreamer', 'Startups', 'SMBs', 'Enterprises'];
      return commonPilotNames
        .map(apiName => ({
          name: apiNameToDisplayName[apiName] || apiName as TabCategory,
          apiName: apiName,
          icon: undefined,
        }))
        .filter(tab => tab.name);
    }
    
    return tabsFromPilots;
  }, [pilotPageData?.piolets_tabs, defaultPilotNames, pilots]);

  // Set initial active tab
  const initialTab = tabs.length > 0 ? tabs[0].name : undefined;
  const [activeTab, setActiveTab] = useState<TabCategory | undefined>(initialTab);
  
  // Update active tab when tabs change
  useEffect(() => {
    if (tabs.length > 0) {
      if (!activeTab || !tabs.find(t => t.name === activeTab)) {
        setActiveTab(tabs[0].name);
      }
    } else {
      setActiveTab(undefined);
    }
  }, [tabs, activeTab]);

  // Get icon for a tab (API first, then fallback)
  const getTabIcon = (tab: { name: TabCategory; apiName: string; icon?: string }): string => {
    if (tab.icon) {
      const apiIcon = buildPilotImageUrl(tab.icon);
      if (apiIcon) return apiIcon;
    }
    
    const pilot = pilots[tab.apiName];
    if (pilot?.piolet_icon) {
      const pilotIcon = buildPilotImageUrl(pilot.piolet_icon);
      if (pilotIcon) return pilotIcon;
    }
    
    // Fallback to static icons
    return fallbackIcons[tab.name] || fallbackIcons.Dreamers;
  };

  // Build programs from API data
  const programsFromAPI = useMemo(() => {
    const programs: Program[] = [];
    let programId = 1;
    const seenPilots = new Set<string>();

    // Use defaultPilotNames if available, otherwise use all loaded pilots
    const pilotNamesToProcess = defaultPilotNames.length > 0 
      ? defaultPilotNames 
      : Object.keys(pilots).filter(key => pilots[key]?.active === 1);

    pilotNamesToProcess.forEach((pilotName) => {
      const pilot = pilots[pilotName];
      const displayName = apiNameToDisplayName[pilotName] || pilot?.piolet_name as TabCategory;
      
      if (!displayName) {
        return;
      }

      // Check both select_sub_piolets and piolets_list
      const subPilotList = pilot?.select_sub_piolets || pilot?.piolets_list;
      if (!subPilotList || subPilotList.length === 0) {
        return;
      }

      subPilotList.forEach((subPilotLink) => {
        if (!subPilotLink.piolet) {
          return;
        }
        
        const subPilotData = subPilots[subPilotLink.piolet];
        if (!subPilotData) {
          return;
        }

        const pilotNameKey = subPilotData.piolet || subPilotLink.piolet || '';
        
        // Skip if we've already seen this pilot name (deduplicate)
        if (pilotNameKey && seenPilots.has(pilotNameKey)) {
          return;
        }
        
        // Mark this pilot as seen
        if (pilotNameKey) {
          seenPilots.add(pilotNameKey);
        }

        const program: Program = {
          id: programId++,
          category: displayName,
          objective: subPilotData.short_objective || subPilotData.objective || subPilotData.objective_name || '',
          pilot: pilotNameKey,
          serviceMix: subPilotData.service_mix || subPilotData.serviceMix || subPilotData.service_mix_name || '',
          kpi: subPilotData.primary_kpi || subPilotData.kpi || subPilotData.primary_kpi_name || '',
          duration: subPilotData.duration || subPilotData.duration_time || '',
          // Additional fields for ViewScope
          description: subPilotData.description,
          deliverables: subPilotData.deliverables || subPilotData.deliverables_name,
          objectivePoints: subPilotData.objective_points || [],
          features: subPilotData.features || 
                   (subPilotData.features_list?.map((f: any) => f.feature || f.name).filter(Boolean)) ||
                   subPilotData.scope_items ||
                   (subPilotData.scope_list?.map((s: any) => s.item || s.name).filter(Boolean)),
          scopeItems: subPilotData.scope_items || 
                     (subPilotData.scope_list?.map((s: any) => s.item || s.name).filter(Boolean)),
          // Button fields from API
          actionButton1: subPilotData.action_button1,
          actionButton2: subPilotData.action_button2,
          buttonText: subPilotData.buttontext,
          button1: subPilotData.action_button1 || 'View',
          button2: subPilotData.action_button2 || subPilotData.buttontext || 'Start',
          subPilotData: subPilotData,
        };

        // Only include program if it has at least pilot name or objective (meaningful data from API)
        if (program.pilot || program.objective) {
          programs.push(program);
        }
      });
    });

    return programs;
  }, [pilots, subPilots, defaultPilotNames]);
  
  // Filter by active tab
  const filteredPrograms = activeTab 
    ? programsFromAPI.filter((p) => p.category === activeTab)
    : [];

  const handleViewClick = (program: Program) => {
    setSelectedProgram(program);
    setIsViewScopeOpen(true);
  };

  const handleCloseViewScope = () => {
    setIsViewScopeOpen(false);
    setSelectedProgram(null);
  };

  const handleStartClick = (program: Program) => {
    navigate("/start-pilot", { state: { program } });
  };

  // Get heading from DesignPageL2 API
  const headingHtml = designPageData?.piolet_table_heading;

  // Don't render if table is explicitly disabled (but allow rendering while loading)
  // piolet_table === 1 means show, piolet_table === 0 means hide
  // If undefined/null, show by default (allow rendering while loading)
  if (designPageData && designPageData.piolet_table !== undefined && designPageData.piolet_table !== 1) {
    return null;
  }

  return (
    <section className="w-full px-4 sm:px-6 md:px-8 lg:px-[80px] xl:px-[120px] 2xl:px-[200px] py-[40px] sm:py-[48px] md:py-[52px] lg:py-[64px]">
      <div className="mx-auto flex flex-col items-center lg:gap-[32px] md:gap-[24px] gap-[16px]">
        {/* Title */}
        {headingHtml && (
          <ParsedHtml
            htmlContent={headingHtml}
            as="h2"
            className="xl:text-[64px] lg:text-[52px] md:text-[40px] sm:text-[32px] text-[24px] tracking-tight text-black text-center"
          />
        )}

        {/* Tabs Section */}
        {pilotPageLoading ? (
          <div className="flex justify-center lg:gap-[24px] md:gap-[20px] gap-[16px] w-full border-b border-[#E8E9E9] overflow-x-auto">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="md:py-3 py-1 md:px-4 px-2 lg:px-6 animate-pulse bg-gray-200 h-[40px] w-[120px] rounded"
              />
            ))}
          </div>
        ) : tabs.length > 0 ? (
        <div className="flex justify-center lg:gap-[24px] md:gap-[20px] gap-[16px] w-full border-b border-[#E8E9E9] overflow-x-auto">
          {tabs.map((tab) => (
            <button
                key={tab.name}
                onClick={() => setActiveTab(tab.name)}
              className={`md:py-3 py-1 md:px-4 px-2 lg:px-6 xl:text-[20px] lg:text-[18px] md:text-[16px] text-[12px] font-urbanist transition-colors duration-300 flex items-center gap-[10px] whitespace-nowrap ${
                  activeTab === tab.name
                  ? 'text-black border-b-4 border-[var(--color)] bg-[var(--color)]/10'
                  : 'text-[var(--medium-text)] hover:text-black border-b-4 border-transparent bg-white'
              }`}
            >
              <img
                  src={getTabIcon(tab)}
                  alt={tab.name}
                  className="hidden lg:block 2xl:w-[32px] xl:w-[28px] lg:w-[24px] md:w-[20px] w-[16px] 2xl:h-[32px] xl:h-[28px] lg:h-[24px] md:h-[20px] h-[16px] object-contain"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                  }}
                />
                {tab.name}
            </button>
          ))}
        </div>
        ) : null}

        {/* Loading State */}
        {subPilotLoading && (
          <div className="w-full flex justify-center py-8">
            <div className="text-[var(--medium-text)]">Loading programs...</div>
          </div>
        )}

        {/* Error State */}
        {subPilotError && (
          <div className="w-full flex justify-center py-8">
            <div className="text-red-500">Error loading programs: {subPilotError}</div>
          </div>
        )}

        {/* Empty State - No programs for active tab */}
        {!subPilotLoading && !subPilotError && activeTab && filteredPrograms.length === 0 && programsFromAPI.length > 0 && (
          <div className="w-full flex justify-center py-8">
            <div className="text-[var(--medium-text)]">No programs available for {activeTab}</div>
          </div>
        )}

        {/* Empty State - No programs at all */}
        {!subPilotLoading && !subPilotError && activeTab && filteredPrograms.length === 0 && programsFromAPI.length === 0 && (
          <div className="w-full flex justify-center py-8">
            <div className="text-[var(--medium-text)]">No programs available. Please check if pilots have sub-pilots configured.</div>
          </div>
        )}

        {/* Table for lg and up */}
        {!subPilotLoading && !subPilotError && activeTab && filteredPrograms.length > 0 && (
        <div className="hidden lg:block w-full overflow-x-auto border border-[#F0F1F2]">
          <table className="w-full text-left">
            <thead className="bg-[#F9FAFB]">
              <tr>
                {['Objective', 'Pilot', 'Service mix', 'Primary KPI', 'Duration', 'Action'].map((head) => (
                  <th key={head} className="md:py-3 py-1 md:px-4 px-2 xl:px-6 font-semibold 2xl:text-[20px] xl:text-[18px] lg:text-[16px] md:text-[14px] text-[12px] uppercase tracking-wider">
                    {head}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white">
              {filteredPrograms.map((program) => (
                <tr key={program.id} className="border-b border-[#E8E9E9] font-urbanist">
                  <td className="md:py-3 py-1 md:px-4 px-2 xl:px-6 text-[var(--medium-text)] xl:text-[16px] lg:text-[14px] md:text-[12px] text-[10px]">{program.objective}</td>
                  <td className="md:py-3 py-1 md:px-4 px-2 xl:px-6 text-[var(--medium-text)] xl:text-[16px] lg:text-[14px] md:text-[12px] text-[10px]">{program.pilot}</td>
                  <td className="md:py-3 py-1 md:px-4 px-2 xl:px-6 text-[var(--medium-text)] xl:text-[16px] lg:text-[14px] md:text-[12px] text-[10px]">{program.serviceMix}</td>
                  <td className="md:py-3 py-1 md:px-4 px-2 xl:px-6 text-[var(--medium-text)] xl:text-[16px] lg:text-[14px] md:text-[12px] text-[10px]">{program.kpi}</td>
                  <td className="md:py-3 py-1 md:px-4 px-2 xl:px-6 text-[var(--medium-text)] xl:text-[16px] lg:text-[14px] md:text-[12px] text-[10px]">{program.duration}</td>
                  <td className="md:py-3 py-1 md:px-4 px-2 xl:px-6">
                    <div className="flex lg:gap-[10px] md:gap-[8px] gap-[6px] w-full">
                        <button 
                          onClick={() => handleViewClick(program)}
                          className="flex-1 md:px-4 px-2 md:py-2 py-1 border border-black 2xl:text-[16px] xl:text-[14px] lg:text-[12px] text-[10px] font-urbanist text-black transition-colors hover:bg-gray-100"
                        >
                          {program.button1}
                      </button>
                        <button 
                          onClick={() => handleStartClick(program)}
                          className="flex-1 md:px-4 px-2 md:py-2 py-1 2xl:text-[16px] xl:text-[14px] lg:text-[12px] text-[10px] font-urbanist text-white bg-black hover:bg-gray-800 transition-colors"
                        >
                          {program.button2}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        )}

        {/* Responsive grid for md & sm */}
        {!subPilotLoading && !subPilotError && activeTab && filteredPrograms.length === 0 && programsFromAPI.length > 0 && (
          <div className="w-full flex justify-center py-8 lg:hidden">
            <div className="text-[var(--medium-text)]">No programs available for {activeTab}</div>
          </div>
        )}
        {!subPilotLoading && !subPilotError && activeTab && filteredPrograms.length === 0 && programsFromAPI.length === 0 && (
          <div className="w-full flex justify-center py-8 lg:hidden">
            <div className="text-[var(--medium-text)]">No programs available. Please check if pilots have sub-pilots configured.</div>
          </div>
        )}
        {!subPilotLoading && !subPilotError && activeTab && filteredPrograms.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full lg:hidden">
          {filteredPrograms.map((program) => (
            <div key={program.id} className="border border-[#E8E9E9] p-4 bg-white">
              <div className="flex justify-between mb-2">
                <h3 className="text-[14px] font-semibold text-black">{program.objective}</h3>
                <p className="text-[12px] text-black font-medium">{program.duration}</p>
              </div>
              <p className="text-[12px] text-[var(--medium-text)] mb-2">{program.pilot}</p>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <p className="text-[12px] text-[#666]">Service mix</p>
                  <p className="text-[12px] text-black">{program.serviceMix}</p>
                </div>
                <div>
                  <p className="text-[12px] text-[#666]">Primary KPI</p>
                  <p className="text-[12px] text-black">{program.kpi}</p>
                </div>
              </div>
              <div className="flex gap-2 mt-3">
                  <button 
                    onClick={() => handleViewClick(program)}
                    className="flex-1 px-3 py-1 border border-black text-[12px] hover:bg-gray-100 transition-colors"
                  >
                    {program.button1}
                  </button>
                  <button 
                    onClick={() => handleStartClick(program)}
                    className="flex-1 px-3 py-1 bg-black text-white text-[12px] hover:bg-gray-800 transition-colors"
                  >
                    {program.button2}
                  </button>
              </div>
            </div>
          ))}
        </div>
        )}
      </div>

      {/* ViewScope Modal */}
      <ViewScope 
        open={isViewScopeOpen} 
        onClose={handleCloseViewScope} 
        program={selectedProgram}
      />
    </section>
  );
};

export default Table;
