import UI from "@/assets/ServicePage/UiDesgin.png";
import ParsedHtml from "@/Components/ParsedHtml";

type Props = {
  title?: string;
  kicker?: string;
  description?: string;
  className?: string;
  otherName?: string;
};

const UiDesgin: React.FC<Props> = ({
  title = "UX/UI Design",
  kicker = "At Alpheric, we create user experiences that blend design, data, and purpose.",
  description = `Our UX/UI team transforms complex systems into intuitive digital journeys that drive engagement, efficiency, and growth — helping brands deliver impact through design intelligence.`,
  className = "",
  otherName,
}) => {
  return (
    <section
      className={`w-full relative ${className} bg-[radial-gradient(ellipse_50%_100%_at_top_right,#EDE6FE_10%,#FFFFFF_100%)] py-20 flex items-center overflow-visible`}
      aria-labelledby="ux-heading"
    >
      <div className="w-full px-4 sm:px-6 md:px-12 lg:px-[80px] xl:px-[120px] 2xl:px-[200px] 2xl:py-[84px] xl:py-[72px] lg:py-[60px] md:py-[52px] py-[40px]">
        <div className="flex flex-col items-center text-center overflow-visible">

          {/* Title with abstract graphic */}
          <div className="relative inline-flex items-center justify-center gap-2 mb-6 flex-wrap">
            {title && (
              <ParsedHtml
                htmlContent={title}
                as="h1"
                id="ux-heading"
                className="text-[28px] sm:text-[32px] md:text-6xl lg:text-7xl  text-[#000000] leading-tight inline-block"
              />
            )}
            {otherName && (
              <ParsedHtml
                htmlContent={otherName}
                as="span"
                className="text-[28px] sm:text-[32px] md:text-6xl lg:text-7xl font-semibold text-[#000000] leading-tight"
              />
            )}
            <img
              src={UI}
              alt="Abstract UI design element"
              className="ml-1 w-[42px] h-[36px] sm:w-[58px] sm:h-[48px] md:w-[100px] md:h-[80px] lg:w-[125px] lg:h-[104px] object-contain opacity-90"
            />
          </div>

          {/* First paragraph */}
          {kicker && (
            <ParsedHtml
              htmlContent={kicker}
              as="p"
              className="text-[13px] sm:text-[15px] md:text-xl lg:text-2xl text-[#3E3E3E] max-w-4xl font-urbanist leading-relaxed mb-3"
            />
          )}

          {/* Second paragraph */}
          {description && (
            <ParsedHtml
              htmlContent={description}
              as="p"
              className="text-[13px] sm:text-[15px] md:text-xl lg:text-2xl text-[#3E3E3E] max-w-6xl font-urbanist leading-relaxed"
            />
          )}
        </div>
      </div>
    </section>
  );
};

export default UiDesgin;