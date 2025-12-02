// import Spiral from "@/assets/Homepage/spiral.png";

const ContractusHeroSection = () => {
  return (
    <section className="w-full relative bg-[radial-gradient(ellipse_70%_120%_at_right,#EDE6FE_20%,#FFFFFF_70%)] overflow-clip" aria-labelledby="about-heading">
      <div className="px-4 sm:px-6 md:px-12 lg:px-[80px] xl:px-[120px] 2xl:px-[200px] pt-[190px] pb-[84px]">
        <div className="flex flex-col items-center gap-8 ">


          <div className="w-full flex flex-col items-center gap-[16px]">
            <h1
              id="about-heading"
              className="text-[84px] font-semibold text-black text-center"
            >
              Let’s Build 
              <br className="hidden lg:block" /> What the Future Runs On
            </h1>

            <p className="max-w-[890px] mx-auto text-[24px] text-[var(--medium-text)] text-urbanist text-center">
            Whether you’re a startup with a bold idea, an enterprise looking to scale securely,
            or an institution exploring innovation — we’d love to collaborate.
            </p>
          </div>


        </div>
        {/* <img src={Spiral} alt="Spiral" className="absolute top-0 -right-[150px] w-[520px] h-auto object-contain
        max-[1700px]:-translate-y-[30px]
        " /> */}
      </div>
    </section>
  );
};

export default ContractusHeroSection;
