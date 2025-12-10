import photo1 from "@/assets/Pilot_assets/one.png";
import baground1 from "@/assets/Pilot_assets/bg.png";
import { ArrowUpRight } from "lucide-react";
import ParsedHtml from "@/Components/ParsedHtml";


/* ==================== Data ==================== */
type PilotCard = {
  id: string;
  title: string;
  subtitle: string;
  gradient: string;
  bigImg?: string;
  tags: string[];
};

interface StartPilotProps {
  title?: string;
  heading?: string;
  description?: string;
  buttonData?: string;
}

const DEFAULT_CARDS: PilotCard[] = [
  {
    id: "you",
    title: "Start a Pilot",
    subtitle:
      "Experience the Alpheric process\nwith a 2-week UX/UI Sprint.\n\nFrom research to prototype — see how our design thinking drives tangible outcomes.",
    gradient: "bg-gradient-to-b from-[#62D5E8] to-[#678DFE]",
    bigImg: photo1,
    tags: [
      "Retail","Private Equity","Advanced Manufacturing & Services","Technology","Oil & Gas",
      "Healthcare & Life Sciences","Mining","Chemicals","Consumer Products","Financial Services",
    ],
  },
];

/* ==================== UI Bits ==================== */


function PilotCardView({ card, title, heading, description, buttonData }: { card: PilotCard; title?: string; heading?: string; description?: string; buttonData?: string }) {
  
  return (
    <div className="relative w-full h-fit overflow-hidden  box-border">
      {/* Gradient border wrapper */}
      <div className="relative h-full p-[3px] bg-gradient-to-br from-white/50 via-gray-400/50 to-gray-400/50">
        <div className={`relative h-full  overflow-hidden ${card.gradient} text-white shadow-[0_8px_30px_rgba(0,0,0,0.2)]`}>
          
          {/* background image: cover the whole card */}
          <img
            src={baground1}
            alt="bg"
            className="absolute inset-0 z-0"
          />

          <div className="absolute inset-0 z-[1] bg-black/20" />
          
          <div className="relative z-10">
          <div className="flex h-full flex-row justify-between  min-[1700px]:pl-[84px] min-[1400px]:pl-[64px] min-[1250px]:pl-[40px] pl-[20px]">
            <div className="max-w-[800px] flex flex-col   min-[1700px]:pt-[84px] min-[1400px]:pt-[64px] min-[1250px]:pt-[40px] pt-[20px]">
              {title ? (
                <ParsedHtml
                  htmlContent={title}
                  as="h3"
                  className="2xl:text-[72px] xl:text-[52px] lg:text-[40px] text-[32px] font-light text-white"
                />
              ) : (
                <h3 className="2xl:text-[72px] xl:text-[52px] lg:text-[40px] text-[32px] font-light text-white">
                  Start a  <span className="font-semibold">Pilot</span>
                </h3>
              )}
              
              {heading ? (
                <div className="2xl:text-[20px] xl:text-[18px] lg:text-[16px] text-[14px] text-white leading-relaxed">
                  <ParsedHtml htmlContent={heading} as="div" />
                </div>
              ) : (
                <>
                  <p className="2xl:text-[20px] xl:text-[18px] lg:text-[16px] text-[14px] text-white ">
                    Experience the Alpheric process
                  </p>
                  
                  <p className="2xl:text-[20px] xl:text-[18px] lg:text-[16px] text-[14px]  text-white leading-relaxed">
                    with a <span className="font-semibold">2-week UX/UI Sprint.</span>
                  </p>
                </>
              )}
              
              {description ? (
                <ParsedHtml
                  htmlContent={description}
                  as="p"
                  className="2xl:text-[20px] xl:text-[18px] lg:text-[16px] text-[14px] mt-2 text-white/90 leading-relaxed mb-4"
                />
              ) : (
                <p className="2xl:text-[20px] xl:text-[18px] lg:text-[16px] text-[14px] mt-2 text-white/90 leading-relaxed mb-4">
                  From research to prototype — see how our design thinking drives tangible outcomes.
                </p>
              )}

              <div className="flex items-center gap-6 p-2 bg-white/10 w-fit">
                {/* White button */}
                <button
                  type="button"
                  className="inline-flex items-center justify-center gap-2 border border-black/10 bg-white xl:px-[34px] px-[30px] xl:py-[16px] py-[12px] 2xl:text-[20px] xl:text-[18px] lg:text-[16px] text-[14px] font-semibold text-black shadow-[0_1px_0_rgba(0,0,0,0.08)]
                             hover:shadow-[0_2px_0_rgba(0,0,0,0.12)] focus:outline-none focus-visible:ring-2 focus-visible:ring-black/20"
                >
                  {buttonData || "Book Now"} <ArrowUpRight className="w-6 h-auto" />
                </button>
              </div>
            </div>
            <div>
            {card.bigImg && (
            <img
              src={card.bigImg}
              alt=""
              className="pointer-events-none  z-[2] h-auto w-[580px] shrink-0  object-contain object-top"
            />
          )}
            </div>
            
          </div>

           
            </div>
        </div>
      </div>
    </div>
  );
}


function PilotCardMobile({ card, title, heading, description, buttonData }: { card: PilotCard; title?: string; heading?: string; description?: string; buttonData?: string }) {
  const subtitleLines = card.subtitle.split('\n').filter(line => line.trim());
  
  return (
    <div className={`relative w-full overflow-hidden ${card.gradient} text-white rounded-none `}>
      {/* background texture + overlay */}
      <img src={baground1} alt="" className="absolute inset-0 w-full h-full object-cover object-center" />
      <div className="absolute inset-0 bg-black/20" />

      {/* top-right image (absolute) */}
      {card.bigImg && (
        <img
          src={card.bigImg}
          alt=""
          className="absolute -top-0 right-0 w-[162px] sm:w-[220px] md:w-[300px] pointer-events-none"
        />
      )}

      {/* content */}
      <div className="relative z-10 px-4 pb-4 sm:px-6 md:px-8 sm:pb-6 md:pb-8   pt-[90px] sm:pt-[120px] md:pt-[150px] ">
        <div className="flex flex-col gap-6 md:gap-10 sm:gap-8 ">
          <div className="flex flex-col gap-4 md:gap-6 ">
        {title ? (
          <ParsedHtml
            htmlContent={title}
            as="h3"
            className="text-[24px] sm:text-[32px] md:text-[36px] font-semibold text-white"
          />
        ) : (
          <h3 className="text-[24px] sm:text-[32px] md:text-[36px] font-semibold text-white">
            {card.title}
          </h3>
        )}

        {heading ? (
          <div className="text-white text-[14px] sm:text-[16px] md:text-[18px] leading-relaxed">
            <ParsedHtml htmlContent={heading} as="div" />
          </div>
        ) : (
          <>
            <p className="text-white text-[14px] sm:text-[16px] md:text-[18px] leading-relaxed">
              {subtitleLines[0]}
            </p>
            
            <p className="text-white text-[14px] sm:text-[16px] md:text-[18px] leading-relaxed">
              {subtitleLines[1]}
            </p>
          </>
        )}
        
        {description ? (
          <ParsedHtml
            htmlContent={description}
            as="p"
            className="text-white/90 text-[14px] sm:text-[16px] md:text-[18px] leading-relaxed mb-4"
          />
        ) : (
          <p className="text-white/90 text-[14px] sm:text-[16px] md:text-[18px] leading-relaxed mb-4">
            {subtitleLines[2]}
          </p>
        )}

        {/* Button */}
        <div className="flex items-center w-fit">
          <button
            type="button"
            className="inline-flex items-center justify-center gap-2 border border-black/10 bg-white px-[30px] py-[12px] text-[14px] font-semibold text-black shadow-[0_1px_0_rgba(0,0,0,0.08)] hover:shadow-[0_2px_0_rgba(0,0,0,0.12)] focus:outline-none focus-visible:ring-2 focus-visible:ring-black/20"
          >
            {buttonData || "Book Now"} <ArrowUpRight className="w-5 h-5" />
          </button>
        </div>
        </div>

        {/* tags */}
       
      </div>
      </div>
    </div>
  );
}


export default function Study({ title, heading, description, buttonData }: StartPilotProps) {
  const cards = DEFAULT_CARDS;
  
  return (
    <div className="w-full px-4 sm:px-6 md:px-12 lg:px-[80px] xl:px-[120px] 2xl:px-[200px] py-[40px] sm:py-[60px] md:py-[80px] lg:py-[100px]">
      {/* Mobile View */}
      <div className="lg:hidden space-y-6">
        {cards.map((card) => (
          <PilotCardMobile key={`m-${card.id}`} card={card} title={title} heading={heading} description={description} buttonData={buttonData} />
        ))}
      </div>

     
      <div className="hidden lg:block">
        {cards.map((card) => (
          <div key={card.id} className="mb-8">
            <PilotCardView card={card} title={title} heading={heading} description={description} buttonData={buttonData} />
          </div>
        ))}
      </div>
    </div>
  );
}
