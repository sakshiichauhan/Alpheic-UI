import { useEffect, useMemo, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@/store";
import { fetchPilotByName, selectPilot, selectPilotLoading, isPilotSectionEnabled } from "@/store/Slice/Pilot/PilotThunk";
import { fetchSubPilots, selectSubPilots, selectSubPilotLoading } from "@/store/Slice/Pilot/SubPilotThunk";
import { ParsedHtml } from "@/Components/ParsedHtml";
import ViewScope from "@/Components/PopUp/ViewScope";

// Program type matching ViewScope expectations exactly
type Program = {
  id: number;
  category: 'Dreamers' | 'Startups' | 'SMBs' | 'Enterprises';
  objective: string;
  pilot: string;
  serviceMix: string;
  kpi: string;
  duration: string;
  description?: string;
  deliverables?: string;
  features?: string[];
  scopeItems?: string[];
  objectivePoints?: Array<{ point?: string; [key: string]: any }>;
  actionButton1?: string;
  actionButton2?: string;
  buttonText?: string;
  subPilotData?: any;
  // Additional fields for internal use
  button1?: string;
  button2?: string;
};

const Table: React.FC = () => {
  // Get pilot name from URL params
  const { pilotName } = useParams<{ pilotName?: string }>();
  
  // Decode the pilot name from URL and default to "Dreamer" for backward compatibility
  const decodedPilotName = pilotName ? decodeURIComponent(pilotName) : undefined;
  const activePilotName = decodedPilotName || "Dreamer";

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const pilotData = useSelector((state: RootState) => selectPilot(state, activePilotName));
  const pilotLoading = useSelector(selectPilotLoading);
  const subPilots = useSelector(selectSubPilots);
  const subPilotLoading = useSelector(selectSubPilotLoading);
  const [isViewScopeOpen, setIsViewScopeOpen] = useState(false);
  const [selectedProgram, setSelectedProgram] = useState<Program | null>(null);

  // Fetch pilot data dynamically
  useEffect(() => {
    if (!pilotData && !pilotLoading) {
      dispatch(fetchPilotByName(activePilotName));
    }
  }, [dispatch, pilotData, pilotLoading, activePilotName]);

  // Fetch sub-pilots when piolets_list is available
  useEffect(() => {
    if (pilotData?.piolets_list) {
      const subPilotNamesToFetch = pilotData.piolets_list
        .map(item => item.piolet)
        .filter((name): name is string => !!name && !subPilots[name]);
      
      if (subPilotNamesToFetch.length > 0) {
        dispatch(fetchSubPilots(subPilotNamesToFetch));
      }
    }
  }, [dispatch, pilotData?.piolets_list, subPilots]);

  // Check if section should be enabled - but wait for data to load first
  // Only hide if we have data and it's explicitly disabled
  const isSectionEnabled = pilotData ? isPilotSectionEnabled(pilotData?.piolets) : true;
  
  if (pilotData && !isSectionEnabled) {
    return null;
  }

  // Helper function to map pilot name to valid category type
  const getCategoryFromPilotName = (name: string): 'Dreamers' | 'Startups' | 'SMBs' | 'Enterprises' => {
    const normalizedName = name.trim();
    // Map common variations to valid categories
    if (normalizedName === 'Dreamer' || normalizedName === 'Dreamers') return 'Dreamers';
    if (normalizedName === 'Startup' || normalizedName === 'Startups') return 'Startups';
    if (normalizedName === 'SMB' || normalizedName === 'SMBs') return 'SMBs';
    if (normalizedName === 'Enterprise' || normalizedName === 'Enterprises') return 'Enterprises';
    // Default fallback
    return 'Dreamers';
  };

  // Map sub-pilots to program format - only include programs with actual API data
  // Deduplicate by pilot name to avoid showing repeated entries
  const programs: Program[] = useMemo(() => {
    if (!pilotData?.piolets_list) return [];
    
    const seenPilots = new Set<string>();
    let programId = 1;
    
    return pilotData.piolets_list
      .map((item) => {
        const subPilot = item.piolet ? subPilots[item.piolet] : null;
        // Only process if subPilot data exists and has been loaded from API
        if (!subPilot) return null;
        
        const subPilotName = subPilot.piolet || item.piolet || '';
        
        // Skip if we've already seen this pilot name (deduplicate)
        if (subPilotName && seenPilots.has(subPilotName)) {
          return null;
        }
        
        // Mark this pilot as seen
        if (subPilotName) {
          seenPilots.add(subPilotName);
        }
        
        const program: Program = {
          id: programId++,
          category: getCategoryFromPilotName(activePilotName), // Use the main pilot name for category
          objective: subPilot.short_objective || subPilot.objective || subPilot.objective_name || '',
          pilot: subPilotName,
          serviceMix: subPilot.service_mix || subPilot.serviceMix || subPilot.service_mix_name || '',
          kpi: subPilot.primary_kpi || subPilot.kpi || subPilot.primary_kpi_name || '',
          duration: subPilot.duration || subPilot.duration_time || '',
          button1: subPilot.action_button1 || 'View',
          button2: subPilot.action_button2 || subPilot.buttontext || 'Start',
          // Additional fields for ViewScope
          description: subPilot.description,
          deliverables: subPilot.deliverables || subPilot.deliverables_name,
          objectivePoints: subPilot.objective_points || [],
          features: subPilot.features || 
                   (subPilot.features_list?.map((f: any) => f.feature || f.name).filter(Boolean)) ||
                   subPilot.scope_items ||
                   (subPilot.scope_list?.map((s: any) => s.item || s.name).filter(Boolean)),
          scopeItems: subPilot.scope_items || 
                     (subPilot.scope_list?.map((s: any) => s.item || s.name).filter(Boolean)),
          // Button fields (matching ViewScope expectations)
          actionButton1: subPilot.action_button1,
          actionButton2: subPilot.action_button2,
          buttonText: subPilot.buttontext,
          subPilotData: subPilot, // Store full data for ViewScope
        };
        
        // Only include program if it has at least pilot name or objective (meaningful data from API)
        if (!program.pilot && !program.objective) {
          return null;
        }
        
        return program;
      })
      .filter((program): program is Program => program !== null);
  }, [pilotData?.piolets_list, subPilots, activePilotName]); 

  // Show loading state only if we're still loading and have no data
  if ((pilotLoading && !pilotData) || (subPilotLoading && programs.length === 0 && pilotData?.piolets_list && pilotData.piolets_list.length > 0)) {
    return (
      <section className="w-full px-4 sm:px-6 md:px-8 lg:px-[80px] xl:px-[120px] 2xl:px-[200px] py-[40px] sm:py-[48px] md:py-[52px] lg:py-[64px]">
        <div className="mx-auto flex flex-col items-center lg:gap-[32px] md:gap-[24px] gap-[16px]">
          <div className="animate-pulse h-16 bg-gray-200 rounded w-64"></div>
          <div className="w-full">
            <div className="animate-pulse h-48 bg-gray-200 rounded"></div>
          </div>
        </div>
      </section>
    );
  }

  // Show empty state if data is loaded but no programs available
  const hasNoPrograms = pilotData && programs.length === 0;
  
  // If no programs and data is loaded, show empty state with heading
  if (hasNoPrograms) {
    const pilotDisplayName = pilotData?.piolet_name || pilotName;
    const headingHtml = pilotData?.piolets_heading || `<div class="ql-editor read-mode"><p>These are all the sub piolets under <strong>${pilotDisplayName}</strong></p></div>`;
    
    return (
      <section className="w-full px-4 sm:px-6 md:px-8 lg:px-[80px] xl:px-[120px] 2xl:px-[200px] py-[40px] sm:py-[48px] md:py-[52px] lg:py-[64px]">
        <div className="mx-auto flex flex-col items-center lg:gap-[32px] md:gap-[24px] gap-[16px]">
          <ParsedHtml
            htmlContent={headingHtml}
            as="h2"
            className="xl:text-[64px] lg:text-[52px] md:text-[40px] sm:text-[32px] text-[24px] tracking-tight text-black text-center"
          />
          <div className="w-full text-center py-8 text-gray-500">
            No programs available for {pilotDisplayName}
          </div>
        </div>
      </section>
    );
  }

  // Dynamic heading based on pilot name
  const pilotDisplayName = pilotData?.piolet_name || activePilotName;
  const headingHtml = pilotData?.piolets_heading || `<div class="ql-editor read-mode"><p>These are all the sub piolets under <strong>${pilotDisplayName}</strong></p></div>`;

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

  return (
    <section className="w-full px-4 sm:px-6 md:px-8 lg:px-[80px] xl:px-[120px] 2xl:px-[200px] py-[40px] sm:py-[48px] md:py-[52px] lg:py-[64px]">
      <div className="mx-auto flex flex-col items-center lg:gap-[32px] md:gap-[24px] gap-[16px]">
        
        {/* Title */}
        <ParsedHtml
          htmlContent={headingHtml}
          as="h2"
          className="xl:text-[64px] lg:text-[52px] md:text-[40px] sm:text-[32px] text-[24px] tracking-tight text-black text-center"
        />

        {/* --- 1. Desktop Table (lg and up) --- */}
        {/* STYLING UPDATED PER YOUR NEW SNIPPET */}
        <div className="hidden lg:block w-full overflow-x-auto border border-[#F0F1F2]">
          <table className="w-full text-left ">
            <thead className="bg-[#F9FAFB]">
              <tr>
                <th className="md:py-3 py-1 md:px-4 px-2 xl:px-6 font-semibold 2xl:text-[20px] xl:text-[18px] lg:text-[16px] md:text-[14px] text-[12px] uppercase tracking-wider">Objective</th>
                <th className="md:py-3 py-1 md:px-4 px-2 xl:px-6 font-semibold 2xl:text-[20px] xl:text-[18px] lg:text-[16px] md:text-[14px] text-[12px] uppercase tracking-wider">Pilot</th>
                <th className="md:py-3 py-1 md:px-4 px-2 xl:px-6 font-semibold 2xl:text-[20px] xl:text-[18px] lg:text-[16px] md:text-[14px] text-[12px] uppercase tracking-wider">Service mix</th>
                <th className="md:py-3 py-1 md:px-4 px-2 xl:px-6 font-semibold 2xl:text-[20px] xl:text-[18px] lg:text-[16px] md:text-[14px] text-[12px] uppercase tracking-wider">Primary KPI</th>
                <th className="md:py-3 py-1 md:px-4 px-2 xl:px-6 font-semibold 2xl:text-[20px] xl:text-[18px] lg:text-[16px] md:text-[14px] text-[12px] uppercase tracking-wider">Duration</th>
                <th className="md:py-3 py-1 md:px-4 px-2 xl:px-6 font-semibold 2xl:text-[20px] xl:text-[18px] lg:text-[16px] md:text-[14px] text-[12px] uppercase tracking-wider">Action</th>
              </tr>
            </thead>
            
            {/* Table Body */}
            <tbody className="bg-white">
              {programs.length > 0 ? programs.map((program) => (
                <tr key={program.id} className="border-b border-[#E8E9E9] font-urbanist mt-[8px]">
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
              )) : (
                <tr>
                  <td colSpan={6} className="text-center py-8 text-gray-500">
                    No programs available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* --- 2. Responsive Grid (md & sm) --- */}
        {/* (Using the styling from the previous turn, as the new snippet only provided desktop styles) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full lg:hidden">
          {programs.length > 0 ? programs.map((program) => (
            <div key={program.id} className="border border-[#E8E9E9] p-4 bg-white">
              <div className="flex justify-between mb-2">
                <h3 className="text-[14px] font-semibold text-black">{program.objective}</h3>
                <p className="text-[12px] text-black font-medium">{program.duration}</p>
              </div>
              <p className="text-[12px] text-gray-600 mb-2">{program.pilot}</p>
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
            </div>
          )) : (
            <div className="col-span-2 text-center py-8 text-gray-500">
              No programs available
            </div>
          )}
        </div>
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