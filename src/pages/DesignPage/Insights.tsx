import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@/store";
import { fetchDesignPageL2Data } from "@/store/Slice/UxDesgin/DesginPageThunk";
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
  date: string;       // "07 Apr"
  tag: string;        // "Product Updates"
  readTime: string;   // "6min"
  title: string;
  image: string;      // /path/to/img.jpg
  href?: string;
};

function PostCard({ post }: { post: Post }) {
    // Always include read time if available, otherwise show default
    const readTimeDisplay = post.readTime || "0 min";
    const metaParts = [post.date, post.tag, readTimeDisplay].filter(Boolean);
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
  
  
  

interface InsightsProps {
  buttonData?: string;
}

export default function Insights({ buttonData }: InsightsProps) {
  const dispatch = useDispatch<AppDispatch>();
  const { data, loading, error } = useSelector((state: RootState) => state.designPageL2);

  useEffect(() => {
    // Fetch data if not already loaded
    if (!data && !loading) {
      dispatch(fetchDesignPageL2Data());
    }
  }, [dispatch, data, loading]);

  // Convert insights_list to Post format, filtering to only show "Latest Service" tag
  const posts: Post[] = useMemo(() => {
    if (!data?.insights_list || data.insights_list.length === 0) {
      return [];
    }
    
    // Filter to only show insights with "Latest Service" tag
    const latestServiceInsights = data.insights_list.filter((insight) => {
      // Check if the tag is "Latest Service"
      return insight.tag === "Latest Service" || insight.about === "Latest Service";
    });
    
    // Limit to first 3 insights (or all if less than 3)
    return latestServiceInsights.slice(0, 3).map((insight) => {
      const creationDate = insight.creation ? new Date(insight.creation) : null;
      const formattedDate = creationDate
        ? creationDate.toLocaleDateString("en-US", { day: "2-digit", month: "short" })
        : "";
      return {
        id: insight.name,
        date: formattedDate,
        tag: insight.tag || insight.about || "Latest Service",
        readTime: insight.read_time || "0 min",
        title: insight.title || insight.name,
        image: getImageUrl(insight.image) || dummyImage,
        href: `/Insights/${encodeURIComponent(insight.name)}`,
      };
    });
  }, [data?.insights_list]);

  // Conditionally render based on insights flag
  const shouldShowSection = data?.insights === 1;

  // Use API data for heading and button
  const heading = data?.insights_heading;
  const buttonText = buttonData || data?.insights_buttondata || "View All Insights";

  // Don't render if insights is 0
  if (data && !shouldShowSection) {
    return null;
  }

  const isLoading = loading;

  return (
    <section className="w-full">
        <div className="flex flex-col gap-[32px]">
          <div className="w-full mx-auto px-4 sm:px-6 md:px-12 lg:px-[80px] xl:px-[120px] 2xl:px-[200px]  py-10 md:py-[60px] lg:py-[12px] flex flex-col xl:gap-[40px] lg:gap-[48px] md:gap-[32px] gap-[24px]">
            {/* Heading */}
            {heading ? (
              <ParsedHtml
                htmlContent={heading}
                as="h2"
                className="text-center 2xl:text-[72px] xl:text-[68px] md:text-[48px] sm:text-[40px] text-[32px] leading-none text-black"
              />
            ) : (
              <h2 className="text-center 2xl:text-[72px] xl:text-[68px] md:text-[48px] sm:text-[40px] text-[32px] leading-none text-black">
                Design <span className="md:font-semibold">insights</span>
              </h2>
            )}

            {/* Cards */}
            {error && (
              <div className="text-center text-red-500 text-sm mb-4">{error}</div>
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
              <DefaultButton href="/Insights" onClick={() => {}}>
                {buttonText}
              </DefaultButton>
          </div>
        </div>
    </section>
  );
}
