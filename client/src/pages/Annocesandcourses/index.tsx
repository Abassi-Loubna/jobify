import React, { useState } from 'react';
import { Star, User, Search, Filter, ArrowUpRight, BookOpen, Megaphone } from 'lucide-react';

// 1. Updated Interface
interface AdItem {
  id: number;
  title: string;
  price?: number; // جعلته اختياري لأن بعض إعلانات الشركات قد لا تضع سعراً مباشراً
  category: 'Annonces' | 'Courses';
  username: string;
  rating: number;
  reviews: number;
  image?: string;
}

// 2. Card Component (Modified for Announcements)
const ServiceCard: React.FC<{ item: AdItem }> = ({ item }) => {
  return (
    <div className="group bg-slate-900/40 backdrop-blur-md border border-white/10 rounded-3xl overflow-hidden hover:border-emerald-500/50 transition-all duration-500 shadow-xl hover:shadow-emerald-500/10">
      {/* Image Section */}
      <div className="relative h-52 w-full overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 to-transparent z-10" />
        <img 
          src={item.image || `https://images.unsplash.com/photo-1614850523296-d8c1af93d400?w=800&q=80`} 
          alt={item.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute top-4 left-4 z-20 flex gap-2">
          <span className={`backdrop-blur-md border text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full flex items-center gap-1 ${
            item.category === 'Courses' 
            ? 'bg-blue-500/20 border-blue-500/30 text-blue-400' 
            : 'bg-emerald-500/20 border-emerald-500/30 text-emerald-400'
          }`}>
            {item.category === 'Courses' ? <BookOpen size={10} /> : <Megaphone size={10} />}
            {item.category}
          </span>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-6 relative z-20">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-8 h-8 rounded-full bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20">
            <User size={14} className="text-emerald-500" />
          </div>
          <span className="text-gray-400 text-sm font-medium">@{item.username}</span>
        </div>

        <h3 className="text-white font-bold text-lg mb-3 h-14 line-clamp-2 group-hover:text-emerald-400 transition-colors">
          {item.title}
        </h3>

        <div className="flex items-center gap-1 text-amber-400 mb-4">
          <Star size={16} fill="currentColor" />
          <span className="font-bold text-sm">{item.rating}</span>
          <span className="text-gray-500 text-xs">({item.reviews} reviews)</span>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-white/5">
          <div>
            <p className="text-gray-500 text-[10px] uppercase font-bold tracking-tighter">
                {item.category === 'Annonces' ? 'Budget' : 'Course Fee'}
            </p>
            <p className="text-2xl font-black text-white">${item.price || 'Negotiable'}</p>
          </div>
          <button className="flex items-center gap-1 bg-emerald-500 hover:bg-emerald-400 text-black px-4 py-2.5 rounded-2xl font-bold text-sm transition-all active:scale-95 shadow-lg shadow-emerald-500/20">
            View Details <ArrowUpRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

// 3. Main Page Component
const AnnouncePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
const adsData: AdItem[] = [
    { id: 1, title: "Hiring React Developer for FinTech Project", price: 1200, category: 'Annonces', username: "global_tech", rating: 4.9, reviews: 12 },
    { id: 2, title: "Mastering Node.js Backend: From Zero to Hero", price: 89, category: 'Courses', username: "tech_guru", rating: 5.0, reviews: 340 },
    { id: 3, title: "Urgent: Senior UI/UX Designer for SaaS Startup", price: 950, category: 'Annonces', username: "creative_hub", rating: 4.7, reviews: 8 },{ id: 4, title: "Full Stack Development Bootcamp 2026", price: 199, category: 'Courses', username: "code_academy", rating: 4.8, reviews: 520 },
    { id: 5, title: "Mobile App Masterclass", price: 65, category: 'Courses', username: "pixel_perfect", rating: 4.9, reviews: 92 },
    { id: 6, title: "Marketing Agency looking for SEO Expert", price: 500, category: 'Annonces', username: "scale_up", rating: 4.6, reviews: 44 },
  ];

  const filteredData = adsData.filter(item => {
    const matchesTab = activeTab === 'All' || item.category === activeTab;
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#05080d] text-slate-200 font-sans selection:bg-emerald-500/30 pb-20">
      
      {/* Header & Hero */}
      <div className="max-w-7xl mx-auto px-6 pt-20 pb-12">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tight">
            Elevate Your <span className="text-emerald-500">Skills</span>
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg leading-relaxed">
            Discover corporate announcements and industry-leading courses designed to help you succeed.
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-4xl mx-auto bg-slate-900/80 border border-white/10 p-2 rounded-[2.5rem] flex flex-col md:flex-row items-center gap-2 shadow-2xl backdrop-blur-xl mb-12">
          <div className="flex items-center flex-grow w-full px-4">
            <Search className="text-gray-500 mr-3" size={20} />
            <input 
              type="text" 
              placeholder="Search for announcements or courses..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent border-none outline-none w-full py-4 text-white placeholder:text-gray-600 font-medium"
            />
          </div>
          
          <div className="h-8 w-px bg-white/10 hidden md:block" />
          
          <div className="flex items-center gap-2 w-full md:w-auto p-2">
            <button className="flex items-center gap-2 px-6 py-3 bg-white/5 hover:bg-white/10 rounded-2xl transition-colors border border-white/5 font-semibold">
              <Filter size={18} /> <span>Filters</span>
            </button>
          </div>
        </div>

        {/* Categories Tabs */}
        <div className="flex justify-center gap-3 mb-16">
          {['All', 'Annonces', 'Courses'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-10 py-3 rounded-2xl font-bold transition-all duration-300 ${
                activeTab === tab 
                ? 'bg-emerald-500 text-black shadow-lg shadow-emerald-500/30 scale-105' 
                : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white border border-white/5'
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
          <div className="text-center py-20 bg-white/5 rounded-3xl border border-dashed border-white/10">
            <p className="text-gray-500 text-xl font-medium">No results found for "{searchQuery}"</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AnnouncePage;