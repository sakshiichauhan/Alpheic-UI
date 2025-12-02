
type Program = {
  id: number;
  objective: string;
  pilot: string;
  serviceMix: string;
  kpi: string;
  duration: string;
};

// --- 2. Static Data (Matches Image Content) ---
const dreamerProgramsData: Program[] = [
  { id: 1, objective: 'Name it', pilot: 'Idea to Brand', serviceMix: 'Strategy, Naming, Identity', kpi: 'Name tests, recall', duration: '2 to 3 wks' },
  { id: 2, objective: 'Show it', pilot: 'Concept Site', serviceMix: 'UX UI, Web, Hosting', kpi: 'Visits and leads', duration: '2 to 3 wks' },
  { id: 3, objective: 'Try it', pilot: 'Clickable Prototype', serviceMix: 'UX UI, Design System', kpi: 'Task success', duration: '3 to 4 wks' },
  { id: 4, objective: 'Pitch it', pilot: 'Investor Deck', serviceMix: 'Story, Content, Visuals', kpi: 'Meeting rate', duration: '3 to 4 wks' },
  { id: 5, objective: 'Prove demand', pilot: 'AI Idea Validation', serviceMix: 'SEO tests, CPC proxy', kpi: 'Intent score', duration: '3 to 4 wks' },
];

const Table = () => {
  // Now uses the static data array directly
  const programs = dreamerProgramsData; 

  return (
    <section className="w-full px-4 sm:px-6 md:px-8 lg:px-[80px] xl:px-[120px] 2xl:px-[200px] py-[40px] sm:py-[48px] md:py-[52px] lg:py-[64px]">
      <div className="mx-auto flex flex-col items-center lg:gap-[32px] md:gap-[24px] gap-[16px]">
        
        {/* Title */}
        <h2 className="xl:text-[64px] lg:text-[52px] md:text-[40px] sm:text-[32px] text-[24px] font-bold tracking-tight text-black text-center">
          Dreamer pilots
        </h2>

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
              {programs.map((program) => (
                <tr key={program.id} className="border-b border-[#E8E9E9] font-urbanist mt-[8px]">
                  <td className="md:py-3 py-1 md:px-4 px-2 xl:px-6 text-[var(--medium-text)] xl:text-[16px] lg:text-[14px] md:text-[12px] text-[10px]">{program.objective}</td>
                  <td className="md:py-3 py-1 md:px-4 px-2 xl:px-6 text-[var(--medium-text)] xl:text-[16px] lg:text-[14px] md:text-[12px] text-[10px]">{program.pilot}</td>
                  <td className="md:py-3 py-1 md:px-4 px-2 xl:px-6 text-[var(--medium-text)] xl:text-[16px] lg:text-[14px] md:text-[12px] text-[10px]">{program.serviceMix}</td>
                  <td className="md:py-3 py-1 md:px-4 px-2 xl:px-6 text-[var(--medium-text)] xl:text-[16px] lg:text-[14px] md:text-[12px] text-[10px]">{program.kpi}</td>
                  <td className="md:py-3 py-1 md:px-4 px-2 xl:px-6 text-[var(--medium-text)] xl:text-[16px] lg:text-[14px] md:text-[12px] text-[10px]">{program.duration}</td>
                  <td className="md:py-3 py-1 md:px-4 px-2 xl:px-6">
                    <div className="flex lg:gap-[10px] md:gap-[8px] gap-[6px] w-full">
                      <button className="flex-1 md:px-4 px-2 md:py-2 py-1 border border-black 2xl:text-[16px] xl:text-[14px] lg:text-[12px] text-[10px] font-urbanist text-black transition-colors hover:bg-gray-100">
                        View
                      </button>
                      <button className="flex-1 md:px-4 px-2 md:py-2 py-1 2xl:text-[16px] xl:text-[14px] lg:text-[12px] text-[10px] font-urbanist text-white bg-black hover:bg-gray-800 transition-colors">
                        Start
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* --- 2. Responsive Grid (md & sm) --- */}
        {/* (Using the styling from the previous turn, as the new snippet only provided desktop styles) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full lg:hidden">
          {programs.map((program) => (
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
                <button className="flex-1 md:px-4 px-2 md:py-2 py-1 border border-black 2xl:text-[16px] xl:text-[14px] lg:text-[12px] text-[10px] font-urbanist text-black transition-colors hover:bg-gray-100">
                  View
                </button>
                <button className="flex-1 md:px-4 px-2 md:py-2 py-1 2xl:text-[16px] xl:text-[14px] lg:text-[12px] text-[10px] font-urbanist text-white bg-black hover:bg-gray-800 transition-colors">
                  Start
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Table;