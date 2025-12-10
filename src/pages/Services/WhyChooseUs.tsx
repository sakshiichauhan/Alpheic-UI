import Sparkle from "@/assets/ServicePage/Star.png";
import type { WhyChooseUsCard } from "@/store/Slice/UxDesgin/UxDesgin";
import ParsedHtml from "@/Components/ParsedHtml";

interface FeatureCardProps {
  title: string;
  description: string;
  attachImage?: string;
}

// Helper function to construct image URL from API path
const getImageUrl = (imagePath?: string): string => {
  if (!imagePath || typeof imagePath !== 'string' || imagePath.trim() === '') {
    return Sparkle;
  }
  
  const trimmedPath = imagePath.trim();
  
  // If it's already a full URL, return as-is
  if (trimmedPath.startsWith('http://') || trimmedPath.startsWith('https://')) {
    return trimmedPath;
  }
  
  // If it starts with /files/, construct the full URL
  if (trimmedPath.startsWith('/files/')) {
    return `https://work.alpheric.com${trimmedPath}`;
  }
  
  // If it doesn't start with /, add /files/ prefix
  if (!trimmedPath.startsWith('/')) {
    return `https://work.alpheric.com/files/${trimmedPath}`;
  }
  
  // Otherwise, construct the full URL
  return `https://work.alpheric.com${trimmedPath}`;
};

const FeatureCard = ({ title, description, attachImage }: FeatureCardProps) => {
  const imageUrl = getImageUrl(attachImage);
  const isDefaultIcon = !attachImage;
  
  return (
    <div className="flex flex-col items-start space-y-4">
      <img 
        src={imageUrl} 
        alt={title || "Feature icon"} 
        className={`2xl:w-8 2xl:h-8 w-6 h-6 ${isDefaultIcon ? '' : 'object-contain'}`}
        referrerPolicy="no-referrer"
        onError={(e) => {
          // Fallback to default icon if image fails to load
          const target = e.target as HTMLImageElement;
          if (target.src !== Sparkle) {
            target.src = Sparkle;
          }
        }}
      />
      <div className="space-y-2">
        <h3 className="text-[14px] sm:text-[16px] md:text-[20px] lg:text-[24px] 2xl:text-2xl font-semibold leading-snug">
          {title}
        </h3>
        <p className="text-[12px] sm:text-[13px] md:text-[14px] lg:text-[16px] 2xl:text-xl text-[#3E3E3E] font-urbanist leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
};

interface WhyChooseUsProps {
  heading?: string;
  description?: string;
  cards?: WhyChooseUsCard[];
}

const WhyChooseUs = ({ 
  heading = "Why Choose Us",
  description = "Integral to our approach is a comprehensive user research phase, discovering general and niche audience needs through quantitative and qualitative research.",
  cards = []
}: WhyChooseUsProps) => {
  // Default fallback features if no cards provided
  const defaultFeatures: WhyChooseUsCard[] = [
    {
      name: "user-first-thinking",
      title: "User-First Thinking",
      description: "Every interaction begins with understanding user needs and emotions.",
      doctype: "ImageCard",
    },
    {
      name: "collaborative-strategy",
      title: "Collaborative Strategy",
      description: "We work alongside your team to align design with business goals.",
      doctype: "ImageCard",
    },
    {
      name: "proven-impact",
      title: "Proven Impact",
      description: "Delivering measurable design-driven outcomes at scale.",
      doctype: "ImageCard",
    },
    {
      name: "modern-aesthetics",
      title: "Modern Aesthetics",
      description: "Clean, intuitive and conversion-focused visual language.",
      doctype: "ImageCard",
    },
    {
      name: "agile-approach",
      title: "Agile Approach",
      description: "We adapt to your workflow for seamless delivery.",
      doctype: "ImageCard",
    },
    {
      name: "research-backed",
      title: "Research-Backed",
      description: "Insights that drive real user engagement and satisfaction.",
      doctype: "ImageCard",
    },
  ];

  const features = cards.length > 0 ? cards : defaultFeatures;

  return (
    <section className="px-4 sm:px-6 md:px-12 lg:px-[80px] xl:px-[120px] 2xl:px-[200px] 2xl:py-[84px] xl:py-[72px] lg:py-[60px] md:py-[52px] py-[40px] bg-background">
      <div>
        {/* Heading Section */}
        <div className="text-center mb-16 space-y-4">
          {heading ? (
            <ParsedHtml
              htmlContent={heading}
              as="h2"
              className="text-[24px] sm:text-[32px] md:text-6xl lg:text-7xl  leading-tight"
            />
          ) : (
            <h2 className="text-[24px] sm:text-[32px] md:text-6xl lg:text-7xl font-light leading-tight">
              Why <span className="font-semibold">Choose Us</span>
            </h2>
          )}
          {description && (
            <ParsedHtml
              htmlContent={description}
              as="p"
              className="text-[13px] sm:text-[15px] md:text-[18px] lg:text-[22px] xl:text-[24px] 2xl:text-[24px] max-w-[960px] mx-auto leading-relaxed font-urbanist text-[#3E3E3E]"
            />
          )}
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-x-8 lg:gap-x-12 gap-y-10 lg:gap-y-16">
          {features.map((feature, index) => (
            <FeatureCard 
              key={feature.name || index} 
              title={feature.title} 
              description={feature.description}
              attachImage={feature.attach_image}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
