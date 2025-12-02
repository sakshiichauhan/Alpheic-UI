import { Phone } from 'lucide-react';
import { useState } from 'react';
import baground1 from "@/assets/Pilot_assets/bg.png";
import ContactModal from '@/Components/PopUp/ContactModal';

const CallToActionBanner = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <section className="px-4 sm:px-6 md:px-12 lg:px-[80px] xl:px-[120px] 2xl:px-[200px] 2xl:py-[84px] xl:py-[72px] lg:py-[60px] md:py-[52px] py-[40px]">
      <div className="relative h-full px-[3px] bg-gradient-to-br from-white/50 via-gray-400/50 to-gray-400/50">
        
        <div className="relative overflow-hidden px-4 py-4 lg:py-20 lg:px-24 bg-gradient-to-b from-[#62D5E8] to-[#678DFE] text-white ">
          
          <img
            src={baground1}
            alt="Decorative background"
            className="absolute inset-0 w-full h-full object-cover z-0"
          />

          <div className="absolute inset-0 z-[1] bg-black/20" />
          
          <div className="relative z-10 flex flex-col md:gap-[32px] gap-4">
            
            <div className="flex flex-col md:gap-[18px] ">
              <h2 className="2xl:text-[64px] xl:text-[56px] lg:text-[48px] md:text-[40px] sm:text-[32px] text-[32px] font-semibold tracking-tight ">
                Want to Talk First?
              </h2>
              <p className="2xl:text-[20px] lg:text-[18px] md:text-[16px] text-[13px] text-[#FFFFFF] font-urbanist">
                Not ready to submit a full RFP yet? Let's start with a quick discovery chat.
              </p>
            </div>
            
            <div className="h-[0.5px] w-full bg-[#FFFFFF]" />

            <div className="flex flex-col md:flex-row justify-between gap-[40px]">
              
              <div className="flex gap-2 text-left w-full">
                <div>
                  <h3 className="2xl:text-[40px] lg:text-[32px] md:text-[28px] sm:text-[24px] text-[20px] font-bold flex items-center gap-2">
                <Phone className="w-auto 2xl:h-8 h-4 text-white shrink-0" strokeWidth={1.5} />Book a Discovery Call
                  </h3>
                  <p className="mt-1 2xl:text-[20px] lg:text-[18px] md:text-[16px] text-[15px] text-white flex items-center gap-2">
                    <span aria-hidden="true" className="bg-white w-6 h-[2px] block"></span> <span className="font-semibold">15 minutes </span> to see if we're a fit.
                  </p>
                </div>
              </div>
              
              <div className="flex justify-end sm:justify-start">
  <button className="bg-white text-[#000000] md:px-[34px] px-[8px] md:py-3 py-[6px] 2xl:w-[174px] h-fit 2xl:text-[24px] text-[14px] font-urbanist inline-flex items-center justify-center whitespace-nowrap leading-none"
  
  onClick={() => setIsModalOpen(true)}>
    Book Now
    </button>
      <ContactModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
</div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToActionBanner;