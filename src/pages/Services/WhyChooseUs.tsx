import Sparkle from "@/assets/ServicePage/Star.png";

interface FeatureCardProps {
  title: string;
  description: string;
}

const FeatureCard = ({ title, description }: FeatureCardProps) => {
  return (
    <div className="flex flex-col items-start space-y-4">
      <img src={Sparkle} alt="Sparkle" className="2xl:w-8 2xl:h-8 w-6 h-6" />
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

const WhyChooseUs = () => {
  const features = [
    {
      title: "User-First Thinking",
      description: "Every interaction begins with understanding user needs and emotions.",
    },
    {
      title: "Collaborative Strategy",
      description: "We work alongside your team to align design with business goals.",
    },
    {
      title: "Proven Impact",
      description: "Delivering measurable design-driven outcomes at scale.",
    },
    {
      title: "Modern Aesthetics",
      description: "Clean, intuitive and conversion-focused visual language.",
    },
    {
      title: "Agile Approach",
      description: "We adapt to your workflow for seamless delivery.",
    },
    {
      title: "Research-Backed",
      description: "Insights that drive real user engagement and satisfaction.",
    },
  ];

  return (
    <section className="px-4 sm:px-6 md:px-12 lg:px-[80px] xl:px-[120px] 2xl:px-[200px] 2xl:py-[84px] xl:py-[72px] lg:py-[60px] md:py-[52px] py-[40px] bg-background">
      <div>
        {/* Heading Section */}
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-[24px] sm:text-[32px] md:text-6xl lg:text-7xl font-light leading-tight">
            Why <span className="font-semibold">Choose Us</span>
          </h2>
          <p className="text-[13px] sm:text-[15px] md:text-[18px] lg:text-[22px] xl:text-[24px] 2xl:text-[24px] max-w-[960px] mx-auto leading-relaxed font-urbanist text-[#3E3E3E]">
            Integral to our approach is a comprehensive user research phase, discovering general and
            niche audience needs through quantitative and qualitative research.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-x-8 lg:gap-x-12 gap-y-10 lg:gap-y-16">
          {features.map((feature, index) => (
            <FeatureCard key={index} title={feature.title} description={feature.description} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
