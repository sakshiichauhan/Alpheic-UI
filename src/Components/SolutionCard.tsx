
import asset_1 from "@/assets/Homeicons/asset-1.png";
import asset_2 from "@/assets/Homeicons/asset-2.png";
import asset_3 from "@/assets/Homeicons/asset-3.png";
import asset_4 from "@/assets/Homeicons/asset-4.png";
import asset_5 from "@/assets/Homeicons/asset-5.png";


interface SolutionCardProps {
  title: string;
  description: string;
  tags?: string[];
  avatars?: string[];
  note?: string;
  heading?: string;
  subtitle?: string;
}

const defaultAvatars = [
  asset_1,
  asset_2,
  asset_3,
  asset_4,
  asset_5,
];

const SolutionCard: React.FC<SolutionCardProps> = ({
  title,
  description,
  tags = [],
  avatars = defaultAvatars,
  note = "You'll Be Talking With Our Creative Talents.",
  heading = "Expertise:",
  subtitle = "It Starts With Clarity.",
}) => {
  return (
    <div className="w-full max-w-[840px] flex flex-col xl:gap-8 gap-6">
      {/* Title */}
      {!!title && (
        <h2 className="font-instrument-sans font-semibold 2xl:text-[64px] xl:text-[52px] text-[48px] text-black">
          {title}
        </h2>
      )}
      <div className="flex flex-col">
      {/* Subtitle */}
      {!!subtitle && (
        <p className="text-black font-semibold xl:text-[28px] text-[24px] 2xl:text-[32px]">
          {subtitle}
        </p>
      )}

      {/* Description */}
      {!!description && (
        <p className="xl:text-[28px] text-[24px] 2xl:text-[32px] text-[var(--medium-text)] font-urbanist">
          {description}
        </p>
      )}
      </div>

      {/* Tags */}
      <div className="flex flex-col gap-2">
      <p className="text-black font-semibold xl:text-[28px] text-[24px] 2xl:text-[32px]">
        {heading}
      </p>
      {!!tags.length && (
        <div className="flex flex-wrap gap-3 max-w-[730px]">
          {tags.map((tag,i) => (
            <div key={i} className="shrink-0">
              <div className="px-4 py-2 xl:px-6 xl:py-3  border border-[var(--medium-text)] 2xl:text-[24px] xl:text-[20px] text-[18px] text-[var(--medium-text)] bg-white">
                {tag}
              </div>
            </div>
          ))}
        </div>
      )}
      </div>

      {/* Avatars + Note */}
      <div className="flex flex-col gap-2">
      <div className="flex items-center xl:gap-4 gap-3">
        <div className="flex -space-x-2 2xl:min-w-[210px] lg:min-w-[165px]">
          {avatars.slice(0, 5).map((src, i) => (
            <img
              key={i}
              src={src}
              alt="team"
              className="2xl:w-[48px] 2xl:h-[48px] w-[40px] h-[40px] rounded-full border border-white object-cover"
            />
          ))}
        </div>
        <span className="2xl:text-[24px] xl:text-[20px] text-[18px] text-[var(--medium-text)] font-urbanist">{note}</span>
      </div>
      </div>
    </div>
  );
};

export default SolutionCard;
