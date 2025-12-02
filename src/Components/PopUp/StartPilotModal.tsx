import React, { useEffect } from 'react';
import { X } from "lucide-react";
import StartPilotForm from "@/pages/Pilot/StartPilotForm";

type Program = {
  id: number;
  category: 'Dreamers' | 'Startups' | 'SMBs' | 'Enterprises';
  objective: string;
  pilot: string;
  serviceMix: string;
  kpi: string;
  duration: string;
};

type StartPilotModalProps = {
  open: boolean;
  onClose: () => void;
  program?: Program | null;
};

const StartPilotModal: React.FC<StartPilotModalProps> = ({ open, onClose }) => {
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
        <div className="relative bg-[#ffffff] shadow-xl w-full max-w-[1200px] max-h-[90vh] overflow-y-auto">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors z-10"
            aria-label="Close modal"
          >
            <X className="h-6 w-6" />
          </button>

          {/* StartPilotForm Content */}
          <div className="w-full">
            <StartPilotForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StartPilotModal;

