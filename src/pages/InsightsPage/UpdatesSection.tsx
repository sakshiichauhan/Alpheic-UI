import React, { useState } from 'react';

// --- 1. TypeScript Type Definition ---
// Defines the shape of our post data
type Post = {
  id: string;
  image: string;
  date: string;
  tag: string;
  readTime: string;
  title: string;
  category: string; // Used for filtering
  href?: string;
};

// --- 2. Mock Data ---
// This is the data for our components, based on your image.
// I've assigned different categories so the filtering works.
const categories = ['All', 'Websites', 'Dashboards', 'Mobile Apps', 'Landing Pages'];

const mockPosts: Post[] = [
  { 
    id: '1', 
    image: 'https://placehold.co/600x400/D1D5DB/1F2937?text=Post+1', 
    date: '07 Apr', 
    tag: 'Product Updates', 
    readTime: '6min', 
    title: 'Will Zero UI Replace Screen-Based Interfac? The Designer\'s Verdict', 
    category: 'Websites' 
  },
  { 
    id: '2', 
    image: 'https://placehold.co/600x400/263A50/FFFFFF?text=Post+2', 
    date: '07 Apr', 
    tag: 'Product Updates', 
    readTime: '6min', 
    title: 'Will Zero UI Replace Screen-Based Interfac? The Designer\'s Verdict', 
    category: 'Dashboards' 
  },
  { 
    id: '3', 
    image: 'https://placehold.co/600x400/9CA3AF/111827?text=Post+3', 
    date: '07 Apr', 
    tag: 'Product Updates', 
    readTime: '6min', 
    title: 'Will Zero UI Replace Screen-Based Interfac? The Designer\'s Verdict', 
    category: 'Mobile Apps' 
  },
  { 
    id: '4', 
    image: 'https://placehold.co/600x400/FCA5A5/450A0A?text=Post+4', 
    date: '07 Apr', 
    tag: 'Product Updates', 
    readTime: '6min', 
    title: 'Will Zero UI Replace Screen-Based Interfac? The Designer\'s Verdict', 
    category: 'Landing Pages' 
  },
  { 
    id: '5', 
    image: 'https://placehold.co/600x400/FDE68A/78350F?text=Post+5', 
    date: '07 Apr', 
    tag: 'Product Updates', 
    readTime: '6min', 
    title: 'Will Zero UI Replace Screen-Based Interfac? The Designer\'s Verdict', 
    category: 'Websites' 
  },
  { 
    id: '6', 
    image: 'https://placehold.co/600x400/BFDBFE/1E3A8A?text=Post+6', 
    date: '07 Apr', 
    tag: 'Product Updates', 
    readTime: '6min', 
    title: 'Will Zero UI Replace Screen-Based Interfac? The Designer\'s Verdict', 
    category: 'Dashboards' 
  },
];


function PostCard({ post }: { post: Post }) {
  return (
    <a href={post.href ?? "#"} className="group flex flex-col focus:outline-none">
      
      {/* Image + Overlays Wrapper */}
      {/* Added rounded-lg to match the image */}
      <div className="relative aspect-[16/9] w-full overflow-hidden">
        {/* Image */}
        <img
          src={post.image}
          alt={post.title}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
          loading="lazy"
        />

        {/* BOTTOM shadow */}
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 z-10
                     bg-gradient-to-t from-black/70 via-black/35 to-transparent"
        />

        {/* bottom-left meta */}
        <div className="pointer-events-none absolute left-4 bottom-3 z-20">
          <div className="text-white xl:text-[16px] lg:text-[14px] text-[12px] font-medium [text-shadow:0_2px_6px_rgba(0,0,0,0.8)]">
            {post.date} &middot; {post.tag} &middot; {post.readTime}
          </div>
        </div>
      </div>

      {/* Title (Using your exact responsive text classes) */}
      <h3 className="2xl:text-[24px] xl:text-[22px] lg:text-[20px] md:text-[18px] sm:text-[16px] text-[14px] font-medium font-urbanist leading-snug text-black lg:mt-4 mt-3">
        {/* Using Tailwind's line-clamp class is cleaner */}
        <span className="line-clamp-2">
          {post.title}
        </span>
      </h3>
    </a>
  );
}


// --- 4. Main Updates Section Component ---

const UpdatesSection: React.FC = () => {
  // State to track the currently selected filter
  const [activeCategory, setActiveCategory] = useState('All');

  // Filter the posts based on the active category
  const filteredPosts = activeCategory === 'All'
    ? mockPosts
    : mockPosts.filter(post => post.category === activeCategory);

  return (
    <section className="bg-white 2xl:py-[84px] xl:py-[72px] lg:py-[60px] md:py-[52px] py-[40px] px-4 sm:px-6 md:px-12 lg:px-[80px] xl:px-[120px] 2xl:px-[200px]
 ">
      <div className="mx-auto flex flex-col lg:gap-[32px] md:gap-[24px] gap-[16px]">
        
        {/* 1. Title */}
        <h1 className="text-center font-semibold 2xl:text-[72px] xl:text-[60px] lg:text-[48px] md:text-[40px] sm:text-[38px] text-[32px] text-black">
          Updates
        </h1>

        {/* 2. Filter Tabs */}
        <nav className="flex justify-center gap-2 md:gap-4 lg:gap-6">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`
                lg:py-3 md:py-2 py-1 lg:px-6 md:px-4 sm:px-3 px-2 xl:text-[20px] lg:text-[18px] md:text-[16px] sm:text-[14px] text-[12px] font-urbanist font-medium transition-all duration-200 text-[var(--hero-text)]
                border
                ${
                  activeCategory === category
                    ? 'border-[var(--color)] bg-[var(--color)]/10' // Active state
                    : 'border-[var(--border-color)] hover:text-[var(--sub-text)] bg-white' // Inactive state
                }
              `}
            >
              {category}
            </button>
          ))}
        </nav>

        {/* 3. Posts Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8 xl:gap-y-12 lg:gap-x-6 lg:gap-y-8 md:gap-x-4 md:gap-y-6 gap-x-2 gap-y-4">
          {filteredPosts.map((post) => (
            <PostCard post={post} key={post.id} />
          ))}
        </div>

      </div>
    </section>
  );
};

export default UpdatesSection;