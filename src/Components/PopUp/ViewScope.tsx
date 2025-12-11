import React, { useEffect } from 'react';
import { X } from "lucide-react";

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
};

type ViewScopeProps = {
  open: boolean;
  onClose: () => void;
  program?: Program | null;
};

const ViewScope: React.FC<ViewScopeProps> = ({ open, onClose, program }) => {
  const handleBookCall = () => {
    console.log("Booking call functionality coming soon!");
    // TODO: Implement booking call functionality
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    if (open) {
      document.body.classList.add("overflow-hidden");
      window.addEventListener("keydown", onKey);
    }
    return () => {
      document.body.classList.remove("overflow-hidden");
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  if (!open) return null;

  const clickBackdrop = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div className="fixed inset-0 z-[100]">
      {/* Blur + dim on all sides */}
      <div
        className="absolute inset-0 bg-black/35 backdrop-blur-md"
        onMouseDown={clickBackdrop}
        aria-hidden
      />

      {/* Centering container */}
      <div
        className="relative z-10 flex min-h-[100dvh] w-screen items-center justify-center p-2 sm:p-3 overscroll-contain"
        role="dialog"
        aria-modal="true"
      >
        {/* Modal Content */}
        <div className="relative bg-[#ffffff] shadow-xl w-full max-w-[695px] max-h-[90vh] overflow-y-auto p-[40px]">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
            aria-label="Close modal"
          >
            <X className="h-6 w-6" />
          </button>

          <div className="mx-auto max-w-[695px]">
            <div className="w-full max-w-2xl space-y-2">
              {/* Badge - Light gray rectangular tag with rounded corners */}
              <div className="inline-block bg-[#F9FAFB] rounded-md px-3 py-1.5">
                <p className="text-[20px] text-foreground font-medium">View Scope</p>
              </div>

              {/* Title */}
              <h1 className="text-[24px] sm:text-[32px] md:text-[40px] font-medium text-foreground leading-tight">
                {program?.pilot || 'Pilot Program'}
              </h1>

              {/* Objective Section */}
              <div className="space-y-4 md:space-y-6">
                <div>
                  <span className="text-[20px] font-semibold text-[var(--sub-text)] font-urbanist">Objective: </span>
                  <span className="text-[20px] text-[var(--sub-text)] font-urbanist">
                    {program?.subPilotData?.objective || 
                     program?.subPilotData?.objective_name || 
                     program?.description || 
                     program?.objective || 
                     'Transform your idea into a strong, memorable brand identity.'}
                  </span>
                </div>

                {/* Objective Points List - Dynamic from API objective_points */}
                {program?.objectivePoints && program.objectivePoints.length > 0 && (
                  <ul className="space-y-2 md:space-y-3 pl-8">
                    {program.objectivePoints.map((pointItem, index) => (
                      <li key={pointItem.name || index} className="text-[20px] text-[var(--sub-text)] font-urbanist list-disc">
                        {pointItem.point || ''}
                      </li>
                    ))}
                  </ul>
                )}
                {/* Fallback: Features List - Dynamic from API */}
                {(!program?.objectivePoints || program.objectivePoints.length === 0) && program?.features && program.features.length > 0 && (
                  <ul className="space-y-2 md:space-y-3 pl-8">
                    {program.features.map((feature, index) => (
                      <li key={index} className="text-[20px] text-[var(--sub-text)] font-urbanist list-disc">
                        {feature}
                      </li>
                    ))}
                  </ul>
                )}
                {/* Fallback: Show scope items if features not available */}
                {(!program?.objectivePoints || program.objectivePoints.length === 0) && 
                 (!program?.features || program.features.length === 0) && 
                 program?.scopeItems && program.scopeItems.length > 0 && (
                  <ul className="space-y-2 md:space-y-3 pl-8">
                    {program.scopeItems.map((item, index) => (
                      <li key={index} className="text-[20px] text-[var(--sub-text)] font-urbanist list-disc">
                        {item}
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Deliverables Card */}
              <div className="bg-white p-[16px] space-y-3 md:space-y-4">
                <div>
                  <span className="text-[20px] font-semibold text-[var(--sub-text)] font-urbanist">Deliverables: </span>
                  <span className="text-[20px] text-[var(--sub-text)] font-urbanist">
                    {program?.deliverables || 'Strategy Deck + Brand Pack'}
                  </span>
                </div>
                <div>
                  <span className="text-[20px] font-semibold text-[var(--sub-text)] font-urbanist">Duration: </span>
                  <span className="text-[20px] text-[var(--sub-text)] font-urbanist">
                    {program?.duration || '2 Weeks'} 🗓️
                  </span>
                </div>
                <div>
                  <span className="text-[20px] font-semibold text-[var(--sub-text)] font-urbanist">Primary KPI: </span>
                  <span className="text-[20px] text-[var(--sub-text)] font-urbanist">
                    {program?.kpi || 'Name recall & clarity'}
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={handleBookCall}
                className="flex items-center justify-center lg:text-[24px] md:text-[20px] text-[16px] md:px-8 px-4 md:py-[10px] py-[8px] bg-black text-white font-urbanist hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 transition-all"
              >
            {program?.buttonText || program?.subPilotData?.buttontext || 'Book Call'}
            {/* Arrow Icon */}
            <svg
              className="lg:w-[32px] lg:h-[32px] w-[24px] h-[24px] ml-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              ></path>
            </svg>
          </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewScope;
