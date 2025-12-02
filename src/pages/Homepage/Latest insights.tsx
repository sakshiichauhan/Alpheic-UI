
import dummyImage from "@/assets/dummy.png";
import { DefaultButton } from "@/Components/Button";

type Post = {
  id: string;
  date: string;       // "07 Apr"
  tag: string;        // "Product Updates"
  readTime: string;   // "6min"
  title: string;
  image: string;      // /path/to/img.jpg
  href?: string;
};

const POSTS: Post[] = [
  {
    id: "1",
    date: "07 Apr",
    tag: "Product Updates",
    readTime: "6min",
    title: "Will Zero UI Replace Screen-Based Interface? The Designer's Verdict",
    image: dummyImage,
  },
  {
    id: "2",
    date: "07 Apr",
    tag: "Product Updates",
    readTime: "6min",
    title: "Will Zero UI Replace Screen-Based Interface? The Designer's Verdict",
    image: dummyImage,
  },
  {
    id: "3",
    date: "07 Apr",
    tag: "Product Updates",
    readTime: "6min",
    title: "Will Zero UI Replace Screen-Based Interface? The Designer's Verdict",
    image: dummyImage,
  },
];

function PostCard({ post }: { post: Post }) {
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
              {post.date} · {post.tag} · {post.readTime}
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
  return (
    <section className="w-full px-4 sm:px-6 md:px-12 lg:px-[80px] xl:px-[120px] 2xl:px-[200px]  py-10 md:py-[60px] lg:py-[120px] flex flex-col xl:gap-[64px] lg:gap-[48px] md:gap-[32px] gap-[24px]">
        <div className="flex flex-col gap-[32px]">
          <div className="w-full mx-auto">
            {/* Heading */}
            <h2 className="mb-10 text-center 2xl:text-[96px] xl:text-[82px] md:text-[68px] sm:text-[48px] text-[32px] leading-none text-black">
              Latest <span className="md:font-semibold">insights</span>
            </h2>

            {/* Cards */}
            <div className="flex w-full lg:flex-row flex-col justify-center 2xl:gap-[48px] xl:gap-[40px] gap-[24px]">
              {POSTS.map((p) => (
                <PostCard key={p.id} post={p} />
              ))}
            </div> 
          </div>
          <div className="lg:flex w-full items-center justify-center hidden">
              <DefaultButton href="/Insights" onClick={() => {}}>View All Insights</DefaultButton>
          </div>
        </div>
    </section>
  );
}
