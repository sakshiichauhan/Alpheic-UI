import teamImage from "@/assets/ServicePage/HireDesigner.png";

const HireDesigner = () => {
  return (
    <main className="px-4 sm:px-6 md:px-12 lg:px-20 xl:px-28 2xl:px-[200px] py-10 md:py-14 lg:py-16 xl:py-20 2xl:py-24">
      <section className="w-full">
        <div className="bg-white border border-[#ADD8E6] overflow-hidden rounded-lg">
          <div className="grid xl:grid-cols-2">
            
            {/* Image Section — first on mobile */}
            <div className="relative order-1 xl:order-2 h-52 sm:h-64 md:h-80 lg:h-96 xl:h-full">
              <img
                src={teamImage}
                alt="Professional team collaborating at a modern workspace"
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
            {/* Text Section */}
            <div className="flex flex-col justify-center order-2 xl:order-1 p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12 2xl:p-14">
              <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl xl:text-[60x] 2xl:text-7xl font-semibold text-black mb-4 font-instrument-sans leading-tight">
                Hire a Designer
              </h1>

              <p className="text-base sm:text-lg md:text-2xl xl:text-[24px] text-[#3E3E3E] mb-3 2xl:mb-6 font-semibold font-urbanist leading-snug">
                Add Alpheric talent to your team, full time, part time, or project based.
              </p>

              <p className="text-sm sm:text-base md:text-lg xl:text-xl 2xl:text-2xl font-light font-urbanist text-[#3E3E3E] mb-6 2xl:mb-8 leading-relaxed">
                From prototype to production, our engineers integrate seamlessly with your internal teams.
              </p>

              <button className="px-4 sm:px-6 lg:px-8 py-2 sm:py-3 border border-black text-black bg-white hover:bg-black hover:text-white transition-all duration-200 text-sm sm:text-base md:text-lg xl:text-xl 2xl:text-2xl font-light font-urbanist self-start">
                Hire Now
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default HireDesigner;
