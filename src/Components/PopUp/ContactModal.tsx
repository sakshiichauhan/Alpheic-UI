import React from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import ModalForm from '@/Components/PopUp/ModalForm';
import baground1 from '@/assets/Pilot_assets/bg.png';
import logo from '@/assets/logo/Whitelogo.png';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) {
    return null;
  }

  if (typeof document === 'undefined') {
    return null;
  }

  return createPortal(
    // Overlay
    <div
      onClick={onClose}
      style={{ zIndex: 9999 }}
      className="fixed inset-0 flex items-center justify-center bg-black/60 p-4 transition-opacity"
    >
      {/* Modal Container */}
      <div
        onClick={(e) => e.stopPropagation()}
        // CHANGED: Max width is now 1408px
        className="relative w-full max-w-[1408px] mt-15 overflow-hidden bg-white "
      >
        {/* CHANGED: Grid is now 2 equal columns */}
        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* --- Left Column (Design) --- */}
          {/* CHANGED: Col-span is now 1 */}
          <div className="relative col-span-1 hidden overflow-hidden bg-gradient-to-b from-[#62D5E8] to-[#678DFE] p-12 text-white md:block border-[4px] border-white">
            {/* Background Image */}
            <img
              src={baground1}
              alt="Decorative background"
              className="absolute inset-0 z-0 h-full w-full object-cover"
            />
            {/* Overlay */}
            <div className="absolute inset-0 z-[1] bg-black/20" />
            <img src={logo} alt="Alpheric Logo" className="absolute z-10 top-[50px] left-[50px] w-auto xl:h-[36px] lg:h-[32px] md:h-[28px] sm:h-[24px] h-[20px]" />
            {/* Content */}
            <div className="relative z-10 flex h-full flex-col justify-center xl:space-y-6 space-y-4">
              <h2 className="xl:text-[72px] lg:text-[60px] md:text-[48px] sm:text-[48px] text-[32px] font-bold leading-tight">
                Let's Build Something Smart
              </h2>
              <p className="xl:text-[32px] lg:text-[28px] md:text-[24px] text-[20px]">
                Tell us a bit about you. We'll reply within 1 business day.
              </p>
              <p className="xl:text-[24px] lg:text-[20px] md:text-[16px] text-[12px]">
                Share your details — we'll get back within a day.
              </p>
            </div>
          </div>

          {/* --- Right Column (Form) --- */}
          {/* CHANGED: Col-span is now 1 */}
          <div className="relative col-span-1 p-4 pt-12 md:p-8 lg:p-12">
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute lg:right-4 lg:top-4 right-2 top-2 text-gray-400 transition-colors hover:text-gray-800"
            >
              <X size={24} />
            </button>

            {/* Form Component */}
            <ModalForm />
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default ContactModal;