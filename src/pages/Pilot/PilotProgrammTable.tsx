import { useState } from "react";
import { useNavigate } from "react-router-dom";
import icon1 from "@/assets/Pilot_assets/Icon1.png";
import icon2 from "@/assets/Pilot_assets/Icon2.png";
import icon3 from "@/assets/Pilot_assets/Icon3.png";
import icon4 from "@/assets/Pilot_assets/Icon4.png";
import ViewScope from "@/Components/PopUp/ViewScope";

type TabCategory = 'Dreamers' | 'Startups' | 'SMBs' | 'Enterprises';
type Icon = { [key in TabCategory]: string };

const icons: Icon = {
  Dreamers: icon1,
  Startups: icon2,
  SMBs: icon3,
  Enterprises: icon4,
};

type Program = {
  id: number;
  category: TabCategory;
  objective: string;
  pilot: string;
  serviceMix: string;
  kpi: string;
  duration: string;
};

const allProgramsData: Program[] = [
  { id: 1, category: 'Dreamers', objective: 'Name and identity', pilot: 'Idea to Brand', serviceMix: 'Strategy, Identity', kpi: 'Brand recall', duration: '2 to 3 wks' },
  { id: 2, category: 'Dreamers', objective: 'Concept validation', pilot: 'Feasibility Sprint', serviceMix: 'Research, Strategy', kpi: 'Go/No-go', duration: '2 to 4 wks' },
  { id: 3, category: 'Dreamers', objective: 'First prototype', pilot: 'Clickable Prototype', serviceMix: 'UX/UI Design', kpi: 'User feedback', duration: '3 to 4 wks' },
  { id: 4, category: 'Startups', objective: 'Find market fit', pilot: 'MVP Development', serviceMix: 'Dev, UX, Strategy', kpi: 'User adoption', duration: '4 to 6 wks' },
  { id: 5, category: 'Startups', objective: 'Scale features', pilot: 'Feature Sprint', serviceMix: 'Dev, UI', kpi: 'Feature usage', duration: '3 to 4 wks' },
  { id: 6, category: 'SMBs', objective: 'Optimize operations', pilot: 'Automation Pilot', serviceMix: 'Strategy, Dev', kpi: 'Hours saved', duration: '4 to 6 wks' },
  { id: 7, category: 'SMBs', objective: 'Increase leads', pilot: 'Landing Page A/B Test', serviceMix: 'Design, CRO', kpi: 'Conversion rate', duration: '2 to 3 wks' },
  { id: 8, category: 'SMBs', objective: 'Modernize tech', pilot: 'System Audit', serviceMix: 'Strategy, Analysis', kpi: 'Migration plan', duration: '3 to 4 wks' },
  { id: 9, category: 'Enterprises', objective: 'New market entry', pilot: 'Innovation Lab', serviceMix: 'Strategy, Research, Dev', kpi: 'New revenue stream', duration: '6 to 8 wks' },
  { id: 10, category: 'Enterprises', objective: 'Internal efficiency', pilot: 'AI Workflow Pilot', serviceMix: 'AI, Strategy, Dev', kpi: 'Process speed', duration: '4 to 6 wks' },
];

const PilotProgramTable = () => {
  const navigate = useNavigate();
  const tabs: TabCategory[] = ['Dreamers', 'Startups', 'SMBs', 'Enterprises'];
  const [activeTab, setActiveTab] = useState<TabCategory>('Dreamers');
  const [isViewScopeOpen, setIsViewScopeOpen] = useState(false);
  const [selectedProgram, setSelectedProgram] = useState<Program | null>(null);
  const filteredPrograms = allProgramsData.filter((p) => p.category === activeTab);

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
        <h2 className="xl:text-[64px] lg:text-[52px] md:text-[40px] sm:text-[32px] text-[24px] font-bold tracking-tight text-black text-center">
          Pilot programs matched<br className="sm:hidden block" /> to your stage
        </h2>

        <div className="flex justify-center lg:gap-[24px] md:gap-[20px] gap-[16px] w-full border-b border-[#E8E9E9] overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`md:py-3 py-1 md:px-4 px-2 lg:px-6 xl:text-[20px] lg:text-[18px] md:text-[16px] text-[12px] font-urbanist transition-colors duration-300 flex items-center gap-[10px] whitespace-nowrap ${
                activeTab === tab
                  ? 'text-black border-b-4 border-[var(--color)] bg-[var(--color)]/10'
                  : 'text-[var(--medium-text)] hover:text-black border-b-4 border-transparent bg-white'
              }`}
            >
              <img
                src={icons[tab]}
                alt={tab}
                className="hidden lg:block 2xl:w-[32px] xl:w-[28px] lg:w-[24px] md:w-[20px] w-[16px] 2xl:h-[32px] xl:h-[28px] lg:h-[24px] md:h-[20px] h-[16px]"
              />
              {tab}
            </button>
          ))}
        </div>

        {/* Table for lg and up */}
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
                        View
                      </button>
                      <button 
                        onClick={() => handleStartClick(program)}
                        className="flex-1 md:px-4 px-2 md:py-2 py-1 2xl:text-[16px] xl:text-[14px] lg:text-[12px] text-[10px] font-urbanist text-white bg-black hover:bg-gray-800 transition-colors"
                      >
                        Start
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Responsive grid for md & sm */}
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
                  className="flex-1 px-3 py-1 border border-black text-[12px]"
                >
                  View
                </button>
                <button 
                  onClick={() => handleStartClick(program)}
                  className="flex-1 px-3 py-1 bg-black text-white text-[12px] hover:bg-gray-800"
                >
                  Start
                </button>
              </div>
            </div>
          ))}
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

export default PilotProgramTable;