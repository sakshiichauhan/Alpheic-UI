import teamImage from "@/assets/ServicePage/Whitepaper.png";

const Whitepapers = () => {
  return (
    <main className="px-4 sm:px-6 md:px-12 lg:px-20 xl:px-28 2xl:px-[200px] py-10 md:py-14 lg:py-16 xl:py-20 2xl:py-24">
      <section className="w-full">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-center font-semibold mb-10 text-black">
          Whitepapers & Resources
        </h1>

        <div className="bg-white border border-[#ADD8E6] overflow-hidden rounded-lg">
          <div className="grid xl:grid-cols-2">
            
            {/* Image Section */}
            <div className="relative order-1 xl:order-2 h-52 sm:h-64 md:h-80 lg:h-96 xl:h-full">
              <img
                src={teamImage}
                alt="Professional team collaborating at a modern workspace"
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>

            {/* Text Section */}
            <div className="flex flex-col justify-center order-2 xl:order-1 p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12">
              <p className="text-lg sm:text-xl md:text-2xl xl:text-[24px] 2xl:text-[32px] text-[#3E3E3E] mb-4 font-semibold font-urbanist">
                UX in the Age of Automation 2025 Report
              </p>

              <p className="text-sm sm:text-base md:text-lg xl:text-[20px] 2xl:text-2xl font-light text-[#3E3E3E] mb-6 font-urbanist leading-relaxed">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                consequat.
              </p>

              <button className="px-4 sm:px-6 lg:px-8 py-2 sm:py-3 border border-black text-black bg-white hover:bg-black hover:text-white transition-all duration-200 text-sm sm:text-base lg:text-lg 2xl:text-2xl font-light font-urbanist self-start">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Whitepapers;
