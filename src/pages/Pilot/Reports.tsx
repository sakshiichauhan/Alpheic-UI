import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@/store";
import { fetchPilotPageData, isEnabled } from "@/store/Slice/Pilot/PilotPageThunk";
import { ParsedHtml } from "@/Components/ParsedHtml";
import teamImage from "@/assets/ServicePage/Whitepaper.png";

// Normalize API file paths to absolute URLs (same as DesignInsights.tsx)
const getImageUrl = (path?: string | null) => {
  if (!path) return "";
  const trimmed = path.trim();
  if (!trimmed) return "";
  if (trimmed.startsWith("/files/")) return `https://work.alpheric.com${trimmed}`;
  return "";
};

const Reports = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { data, loading } = useSelector((state: RootState) => state.pilotPage);

  useEffect(() => {
    if (!data && !loading) {
      dispatch(fetchPilotPageData());
    }
  }, [data, loading, dispatch]);

  if (!isEnabled(data?.report)) {
    return null;
  }

  // Get HTML content from backend for all text fields
  const headingHtml = data?.report_heading || '<p>Reports</p>';
  const subheadingHtml = data?.report_subheading || '<p>Download sample pilot documents. Share with teams. Decide with clarity.</p>';
  const titleHtml = data?.report_title || '<p>UX in the Age of Automation 2025 Report</p>';
  const descriptionHtml = data?.report_description || '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>';
  const image = getImageUrl(data?.report_image) || teamImage;
  const buttonText = data?.report_buttontext || "Download";
  return (
    <main className="px-4 sm:px-6 md:px-12 lg:px-20 xl:px-28 2xl:px-[200px] py-10 md:py-14 lg:py-16 xl:py-20 2xl:py-24">
      <section className="w-full">
        <ParsedHtml
          htmlContent={headingHtml}
          as="h1"
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-center mb-4 text-black"
        />
        <ParsedHtml
          htmlContent={subheadingHtml}
          as="p"
          className="text-[var(--hero-text)] text-[14px] md:text-2xl font-urbanist text-center mb-10"
        />

        <div className="bg-white border border-[#ADD8E6] ">
          <div className="grid xl:grid-cols-2">
            
            {/* Image Section */}
            <div className="relative order-1 xl:order-2 h-52 sm:h-64 md:h-80 lg:h-96 xl:h-full">
              <img
                src={image}
                alt="Professional team collaborating at a modern workspace"
                className="absolute inset-0 w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Text Section */}
            <div className="flex flex-col justify-center order-2 xl:order-1 p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12">
              <ParsedHtml
                htmlContent={titleHtml}
                as="p"
                className="text-lg sm:text-xl md:text-2xl xl:text-[24px] 2xl:text-[32px] text-[#3E3E3E] mb-4  font-urbanist"
              />

              <ParsedHtml
                htmlContent={descriptionHtml}
                as="p"
                className="text-sm sm:text-base md:text-lg xl:text-[20px] 2xl:text-2xl  text-[#3E3E3E] mb-6 font-urbanist leading-relaxed"
              />

              <button className="px-4 sm:px-6 lg:px-8 py-2 sm:py-3 border border-black text-black bg-white hover:bg-black hover:text-white transition-all duration-200 text-sm sm:text-base lg:text-lg 2xl:text-2xl font-light font-urbanist self-start">
                {buttonText}
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Reports;
