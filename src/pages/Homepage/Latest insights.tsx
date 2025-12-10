import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@/store";
import { fetchDesignPageL2Data } from "@/store/Slice/UxDesgin/DesginPageThunk";
import { fetchLatestInsights } from "@/store/Slice/LatestInsights/LatestInsightThunk";
import { ParsedHtml } from "@/Components/ParsedHtml";
import dummyImage from "@/assets/dummy.png";
import { DefaultButton } from "@/Components/Button";

// Normalize API file paths to absolute URLs
const getImageUrl = (path?: string | null) => {
  if (!path) return "";
  const trimmed = path.trim();
  if (!trimmed) return "";
  if (trimmed.startsWith("http://") || trimmed.startsWith("https://")) return trimmed;
  if (trimmed.startsWith("/files/")) return `https://work.alpheric.com${trimmed}`;
  if (!trimmed.startsWith("/")) return `https://work.alpheric.com/files/${trimmed}`;
  return `https://work.alpheric.com${trimmed}`;
};

type Post = {
  id: string;
  date: string;
  about: string;
  readTime: string;
  title: string;
  image: string;
  href?: string;
};

function PostCard({ post }: { post: Post }) {
    // Always include read time if available, otherwise show default
    const readTimeDisplay = post.readTime || "0 min";
    const metaParts = [post.date, post.about, readTimeDisplay].filter(Boolean);
    return (
      <a href={post.href ?? "#"} className="group focus:outline-none lg:w-[470px] w-full">
        <div className="flex flex-col gap-[48px]">
            <div className="relative overflow-hidden flex flex-col ">
          {/* image + overlays */}
          <div className="relative aspect-[16/9] w-full overflow-hidden">
            <img
              src={post.image}
              alt={post.title}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
              loading="lazy"
              referrerPolicy="no-referrer"
            />
  
            
  
            {/* BOTTOM shadow (so the date line reads clearly) */}
            <div
              className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 z-10
                         bg-gradient-to-t from-black/70 via-black/35 to-transparent"
            />
          </div>
  
          {/* bottom-left meta (no bg, uses shadow for contrast) */}
          <div className="pointer-events-none absolute left-4 bottom-3 z-20">
            <div className="text-white xl:text-[16px] lg:text-[14px] text-[12px] font-medium [text-shadow:0_2px_6px_rgba(0,0,0,0.8)]">
              {metaParts.join(" · ")}
            </div>
          </div>
        </div>
        </div>
        {/* Title */}
        <h3 className="2xl:text-[24px] xl:text-[22px] lg:text-[20px] md:text-[18px] sm:text-[16px] text-[14px] font-medium font-urbanist leading-snug text-black lg:mt-4 mt-3">
          <span
            className="line-clamp-2"
            style={{ display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical" }}
          >
            {post.title}
          </span>
        </h3>
      </a>
    );
  }
  
  
  

export default function LatestInsights() {
  const dispatch = useDispatch<AppDispatch>();
  const { data, loading } = useSelector((state: RootState) => state.designPageL2);
  const { items: insights, loading: insightsLoading, error: insightsError } = useSelector(
    (state: RootState) => state.latestInsights
  );

  useEffect(() => {
    // Fetch data if not already loaded
    if (!data && !loading) {
      dispatch(fetchDesignPageL2Data());
    }
  }, [dispatch, data, loading]);

  // Fetch latest insights
  useEffect(() => {
    if (!insights.length && !insightsLoading) {
      dispatch(fetchLatestInsights());
    }
  }, [dispatch, insights.length, insightsLoading]);

  const posts: Post[] = useMemo(() => {
    if (!insights.length) {
      return [];
    }
    // Limit to first 3 insights
    return insights.slice(0, 3).map((insight) => {
      const creationDate = insight.creation ? new Date(insight.creation) : null;
      const formattedDate = creationDate
        ? creationDate.toLocaleDateString("en-US", { day: "2-digit", month: "short" })
        : "";
      return {
        id: insight.name,
        date: formattedDate,
        about: insight.about || "Insights",
        readTime: insight.read || "0 min",
        title: insight.title || insight.name,
        image: getImageUrl(insight.image) || dummyImage,
        href: `/Insights/${encodeURIComponent(insight.name)}`,
      };
    });
  }, [insights]);

  // Conditionally render based on insights flag
  const shouldShowSection = data?.insights === 1;

  // Use dummy data only for heading
  const heading = '<div class="ql-editor read-mode"><p>Latest <strong>insights</strong></p></div>';
  const buttonText = data?.insights_buttondata || "View All Insights";

  // Don't render if insights is 0
  if (data && !shouldShowSection) {
    return null;
  }

  const isLoading = loading || insightsLoading;

  return (
    <section className="w-full px-4 sm:px-6 md:px-12 lg:px-[80px] xl:px-[120px] 2xl:px-[200px]  py-10 md:py-[60px] lg:py-[120px] flex flex-col xl:gap-[64px] lg:gap-[48px] md:gap-[32px] gap-[24px]">
        <div className="flex flex-col gap-[32px]">
          <div className="w-full mx-auto">
            {/* Heading */}
            {heading ? (
              <ParsedHtml
                htmlContent={heading}
                as="h2"
                className="mb-10 text-center 2xl:text-[96px] xl:text-[82px] md:text-[68px] sm:text-[48px] text-[32px] leading-none text-black"
              />
            ) : (
              <h2 className="mb-10 text-center 2xl:text-[96px] xl:text-[82px] md:text-[68px] sm:text-[48px] text-[32px] leading-none text-black">
                Latest <span className="md:font-semibold">insights</span>
              </h2>
            )}

            {/* Cards */}
            {insightsError && (
              <div className="text-center text-red-500 text-sm mb-4">{insightsError}</div>
            )}
            {isLoading && (
              <div className="text-center text-[#3E3E3E] text-sm mb-4">Loading insights...</div>
            )}
            {!isLoading && posts.length === 0 && (
              <div className="text-center text-[#3E3E3E] text-sm mb-4">No insights found.</div>
            )}
            {!isLoading && posts.length > 0 && (
              <div className="flex w-full lg:flex-row flex-col justify-center 2xl:gap-[48px] xl:gap-[40px] gap-[24px]">
                {posts.map((p) => (
                  <PostCard key={p.id} post={p} />
                ))}
              </div>
            )}
          </div>
          <div className="lg:flex w-full items-center justify-center hidden">
              <DefaultButton href="/Insights" onClick={() => {}}>{buttonText}</DefaultButton>
          </div>
        </div>
    </section>
  );
}
