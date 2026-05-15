import React, { useState } from 'react';
import { Star, User, Search, Filter, ArrowUpRight, BookOpen, Megaphone } from 'lucide-react';

// --- Types ---
interface AdItem {
  id: number;
  title: string;
  price?: number;
  category: 'Annonces' | 'Courses';
  username: string;
  rating: number;
  reviews: number;
  image?: string;
}

// --- Card Component ---
const ServiceCard: React.FC<{ item: AdItem }> = ({ item }) => {
  return (
    <div className="group bg-bg-card border border-border-color rounded-3xl overflow-hidden hover:border-brand transition-all duration-500 shadow-xl hover:shadow-brand/10 flex flex-col h-full">
      {/* Image Section */}
      <div className="relative h-52 w-full overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-bg-primary/80 to-transparent z-10" />
        <img 
          src={item.image || `https://images.unsplash.com/photo-1614850523296-d8c1af93d400?w=800&q=80`} 
          alt={item.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute top-4 left-4 z-20 flex gap-2">
          <span className={`backdrop-blur-md border text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full flex items-center gap-1 ${
            item.category === 'Courses' 
            ? 'bg-blue-500/20 border-blue-500/30 text-blue-400' 
            : 'bg-brand/20 border-brand/30 text-brand'
          }`}>
            {item.category === 'Courses' ? <BookOpen size={10} /> : <Megaphone size={10} />}
            {item.category}
          </span>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-6 relative z-20 flex flex-col flex-grow">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-8 h-8 rounded-full bg-bg-secondary flex items-center justify-center border border-border-color overflow-hidden">
            <User size={14} className="text-brand" />
          </div>
          <span className="text-text-muted text-sm font-medium">@{item.username}</span>
        </div>

        <h3 className="text-text-primary font-bold text-lg mb-3 line-clamp-2 h-14 group-hover:text-brand transition-colors">
          {item.title}
        </h3>

        <div className="flex items-center gap-1 text-amber-400 mb-4">
          <Star size={16} fill="currentColor" />
          <span className="font-bold text-sm">{item.rating}</span>
          <span className="text-text-muted text-xs">({item.reviews} reviews)</span>
        </div>

        <div className="mt-auto flex items-center justify-between pt-4 border-t border-border-color">
          <div>
            <p className="text-text-muted text-[10px] uppercase font-bold tracking-tighter">
                {item.category === 'Annonces' ? 'Budget' : 'Course Fee'}
            </p>
            <div className="flex items-baseline gap-1">
               {item.price && <span className="text-brand text-xs font-black">DZ</span>}
               <p className="text-2xl font-black text-text-primary">
                  {item.price ? `${item.price.toLocaleString()}` : 'Negotiable'}
               </p>
            </div>
          </div>
          <button className="flex items-center gap-1 bg-brand hover:bg-brand-hover text-white px-4 py-2.5 rounded-2xl font-bold text-sm transition-all active:scale-95 shadow-lg shadow-brand/20">
            Details <ArrowUpRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

// --- Main Page Component ---
const AnnouncePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const adsData: AdItem[] = [
    { id: 1, title: "Hiring React Developer for FinTech Project", price: 120000, category: 'Annonces', username: "global_tech", rating: 4.9, reviews: 12 },
    { id: 2, title: "Mastering Node.js Backend: From Zero to Hero", price: 8500, category: 'Courses', username: "tech_guru", rating: 5.0, reviews: 340 },
    { id: 3, title: "Urgent: Senior UI/UX Designer for SaaS Startup", price: 95000, category: 'Annonces', username: "creative_hub", rating: 4.7, reviews: 8 },
    { id: 4, title: "Full Stack Development Bootcamp 2026", price: 19900, category: 'Courses', username: "code_academy", rating: 4.8, reviews: 520 },
    { id: 5, title: "Mobile App Masterclass", price: 6500, category: 'Courses', username: "pixel_perfect", rating: 4.9, reviews: 92 },
    { id: 6, title: "Marketing Agency looking for SEO Expert", price: 50000, category: 'Annonces', username: "scale_up", rating: 4.6, reviews: 44 },
  ];

  const filteredData = adsData.filter(item => {
    const matchesTab = activeTab === 'All' || item.category === activeTab;
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-bg-primary text-text-primary transition-colors duration-300 pb-20 mt-16">
      
      {/* Background Glow */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-brand/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 pt-24 pb-12">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-7xl font-black text-text-primary mb-6 tracking-tight">
            Elevate Your <span className="text-brand">Skills</span>
          </h1>
          <p className="text-text-secondary max-w-2xl mx-auto text-lg leading-relaxed">
            Discover corporate announcements and industry-leading courses designed to help you succeed in the Algerian market.
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-4xl mx-auto bg-bg-card/80 border border-border-color p-2 rounded-[2.5rem] flex flex-col md:flex-row items-center gap-2 shadow-2xl backdrop-blur-xl mb-12 transition-all focus-within:border-brand/50">
          <div className="flex items-center flex-grow w-full px-4">
            <Search className="text-text-muted mr-3" size={20} />
            <input 
              type="text" 
              placeholder="Search for announcements or courses..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent border-none outline-none w-full py-4 text-text-primary placeholder:text-text-muted font-medium"
            />
          </div>
          
          <div className="h-8 w-px bg-border-color hidden md:block" />
          
          <div className="flex items-center gap-2 w-full md:w-auto p-2">
            <button className="flex items-center gap-2 w-full justify-center px-6 py-3 bg-bg-secondary hover:bg-bg-card text-text-primary rounded-2xl transition-colors border border-border-color font-semibold">
              <Filter size={18} /> <span>Filters</span>
            </button>
          </div>
        </div>

        {/* Categories Tabs */}
        <div className="flex justify-center flex-wrap gap-3 mb-16">
          {['All', 'Annonces', 'Courses'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-8 md:px-10 py-3 rounded-2xl font-bold transition-all duration-300 border ${
                activeTab === tab 
                ? 'bg-brand text-white border-brand shadow-lg shadow-brand/30 scale-105' 
                : 'bg-bg-secondary text-text-muted hover:text-text-primary border-border-color'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Results Grid */}
        {filteredData.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredData.map((ad) => (
              <ServiceCard key={ad.id} item={ad} />
            ))}
          </div>
        ) : (
          <div className="text-center py-32 bg-bg-card/50 rounded-[3rem] border border-dashed border-border-color flex flex-col items-center">
            <div className="w-20 h-20 bg-bg-secondary rounded-full flex items-center justify-center mb-6">
               <Search size={32} className="text-text-muted" />
            </div>
            <p className="text-text-primary text-2xl font-black">No matches found</p>
            <p className="text-text-muted mt-2">Try adjusting your filters or search terms.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AnnouncePage;