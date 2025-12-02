

type Props = {
  title?: string
  kicker?: string;
  description?: string;
  className?: string;
};

const LetBuild: React.FC<Props> = ({



}) => {
  return (
    <section
      className={`w-full relative bg-[radial-gradient(ellipse_50%_100%_at_top_right,#EDE6FE_10%,#FFFFFF_100%)] py-20 flex items-center overflow-visible`}
      aria-labelledby="ux-heading"
    >
      <div className="w-full px-4 sm:px-6 md:px-12 lg:px-[80px] xl:px-[120px] 2xl:px-[200px] 2xl:py-[84px] xl:py-[72px] lg:py-[60px] md:py-[52px] py-[40px]">
        <div className="flex flex-col  overflow-visible">

          {/* Title with abstract graphic */}
          <div className="relative inline-flex gap-2 mb-6 flex-wrap">
            <h1
              id="ux-heading"
              className="text-[28px] sm:text-[32px] md:text-6xl lg:text-7xl 2xl:text-[82px] font-semibold text-[#000000] leading-tight inline-block"
            >
           Let’s Build Something Extraordinary.
            </h1>
          
          </div>

          {/* First paragraph */}
          <p className="text-[13px] sm:text-[15px] md:text-xl lg:text-[40px] text-[#3E3E3E]  font-urbanist font-semibold  leading-relaxed mb-3">
           If you’ve got a dream, a deck, or even a napkin sketch — we’re ready to dig in.
          </p>

          {/* Second paragraph */}
          <p className="text-[13px] sm:text-[15px] md:text-xl lg:text-2xl text-[#3E3E3E] max-w-6xl font-urbanist leading-relaxed">
           Use this page to start a conversation with our business team
          </p>
          <p className="text-[13px] sm:text-[15px] md:text-xl lg:text-2xl text-[#3E3E3E] max-w-6xl font-urbanist leading-relaxed">
            We’ll review your details and get back to you within 24–48 hours with next steps or a tailored consultation slot.
          </p>
        </div>
      </div>
    </section>
  );
};

export default LetBuild;
