
import React from 'react';
import { Link } from 'react-router-dom';

// --- 1. TypeScript Type ---
// This defines the "shape" of our article data
type Article = {
  id: string;
  category: string;
  title: string;
  imageUrl: string;
  date?: string;       // Optional: only for the featured article
  readTime?: string;   // Optional: only for the featured article
  type?: string;       // Optional: only for the list items
  read?: string;       // Optional: only for the featured article
};

// --- 2. Mock Data ---
// This is the data for our components, based on your image.
// You would normally fetch this from an API.

const featuredArticle: Article = {
  id: '1',
  category: 'Private Equity',
  title: 'New Diligence Challenge: Uncovering AI Risks and Opportunities',
  imageUrl: 'https://placehold.co/800x500/263A50/FFFFFF?text=99.9%25',
  date: '24 July, 2025',
  readTime: '5 min',
  read: 'Read',
};

const relatedArticles: Article[] = [
  {
    id: '2',
    category: 'Digital',
    title: 'AI Becomes a Modular Business Platform',
    imageUrl: 'https://placehold.co/150x150/E0E7FF/334155?text=AI',
    type: 'Brief',
  },
  {
    id: '3',
    category: 'Digital',
    title: 'The Five Principles of a Successful Strategic Pivot',
    imageUrl: 'https://placehold.co/150x150/263A50/FFFFFF?text=Pivot',
    type: 'Brief',
  },
  {
    id: '4',
    category: 'Digital',
    title: 'Utilities Can Power Growth Through a Better Customer Experience',
    imageUrl: 'https://placehold.co/150x150/D1D5DB/1F2937?text=Growth',
    type: 'Brief',
  },
  {
    id: '5',
    category: 'Digital',
    title: 'Six Steps to Speed Insurgent Brand Growth Post-Acquisition',
    imageUrl: 'https://placehold.co/150x150/F3F4F6/111827?text=Brand',
    type: 'Brief',
  },
];


// --- 3. Featured Article Component (Left Column) ---

const FeaturedArticleCard: React.FC<{ article: Article }> = ({ article }) => {
  return (
    <article className="flex flex-col gap-[24px]">
      {/* Image */}
      <div className="overflow-hidden max-h-[405px]">
        <img
          src={article.imageUrl}
          alt={article.title}
          className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>

      {/* Content */}
      <div className="flex flex-col gap-4">
        <span className="text-[24px] font-semibold text-[var(--color)]">
          {article.category}
        </span>
        <h2 className="xl:text-[40px] lg:text-[32px] md:text-[24px] text-[16px] font-medium text-black">
            {article.title}
        </h2>
        
        {/* Metadata */}
        {(article.date || article.readTime) && (
          <div className="flex items-center gap-4 text-[20px] text-[var(--medium-text)] font-urbanist">
            {article.date && <span className="">{article.date}</span>}
            <div className="flex items-center gap-1">
               {article.date && article.readTime && <span className="text-[var(--color)]">{article.readTime}</span>}
               {article.readTime && <span>{article.read}</span>}
            </div>
          </div>
        )}
      </div>
    </article>
  );
};


// --- 4. Article List Item Component (Right Column) ---

const ArticleListItem: React.FC<{ article: Article }> = ({ article }) => {
  return (
    <div className="flex flex-col gap-[18px]">
    <li className="flex items-start gap-[30px]">
      <Link to="/InsightsKeyDetails" className="flex items-start gap-[30px] w-full">
        {/* Thumbnail */}
        <img
          src={article.imageUrl}
          alt={article.title}
          className="h-full w-full max-h-[117px] max-w-[117px] shrink-0 object-cover"
        />
        {/* Content */}
        <div className="flex flex-col">
          <span className="text-[16px] font-semibold font-urbanist text-[var(--color)] mb-1 leading-[1.2]">
            {article.category}
          </span>
          <h3 className="text-[32px] font-medium text-black leading-[1.2]">
              {article.title}
          </h3>
          {article.type && (
            <span className="text-[16px] font-urbanist text-[var(--medium-text)] leading-[1.2]">
              {article.type}
            </span>
          )}
        </div>
      </Link>
    </li>
     <div className="h-[1px] bg-[var(--border-color)] w-full"></div>
    </div>
  );
};


// --- 5. Main Layout Component ---

const BlogLayout: React.FC = () => {
  return (
    <section className="bg-white pt-0 2xl:pb-[84px] xl:pb-[72px] lg:pb-[60px] md:pb-[52px] pb-[40px] px-4 sm:px-6 md:px-12 lg:px-[80px] xl:px-[120px] 2xl:px-[200px]
 ">
      <div className="">
        {/* Main Grid */}
        <div className="flex flex-row gap-[54px]">
          
          {/* Left Column (Featured) */}
          <div className="w-full lg:max-w-[720px]">
            <FeaturedArticleCard article={featuredArticle} />
          </div>

          {/* Right Column (List) */}
          <div className="w-full">
            <ul className="flex flex-col gap-[30px]">
              {relatedArticles.map((article) => (
                <ArticleListItem key={article.id} article={article} />
                
              ))}
            </ul>
          
          </div>

        </div>
      </div>
    </section>
  );
};

export default BlogLayout;