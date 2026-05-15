import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import api from "../../api";
import Loader from "../../components/loader";
import Error from "../../components/error";
import Card from "../../components/card";
import { IGig } from "../../types";
import { HiAdjustments, HiSearch, HiOutlineChevronDown, HiLocationMarker } from "react-icons/hi";

const ALGERIA_STATES = ["Adrar", "Chlef", "Alger", "Oran", "Constantine", "Annaba", "Setif"]; 

const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  
  const query = searchParams.get("query") || "";
  const category = searchParams.get("category") || "";
  const min = searchParams.get("min") || "";
  const max = searchParams.get("max") || "";
  const sort = searchParams.get("sort") || "newest";
  const location = searchParams.get("location") || "";

  const params = { category, search: query, min, max, sort, location };

  const { isLoading, error, data, refetch } = useQuery<IGig[]>({
    queryKey: ["gigs", params],
    queryFn: () => api.get("/gigs", { params }).then((res) => res.data.gigs),
  });

  const updateFilter = (name: string, value: string) => {
    setSearchParams((prev) => {
      if (value) prev.set(name, value); else prev.delete(name);
      return prev;
    });
  };

  const handlePriceSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    updateFilter("min", formData.get("min") as string);
    updateFilter("max", formData.get("max") as string);
  };

  return (
    <div className="min-h-screen bg-bg-primary transition-colors duration-300 mt-16 md:mt-24">
      <div className="max-w-[1400px] mx-auto px-4 md:px-8 py-8 md:py-12">
        
        {/* --- Header Section --- */}
        <header className="mb-8 md:mb-12">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <h1 className="text-2xl md:text-3xl font-black text-text-primary capitalize">
              {category || "All Services"}
            </h1>
            {!isLoading && (
              <div className="px-4 py-2 bg-bg-card rounded-xl border border-border-color text-text-muted text-xs md:text-sm font-bold">
                {data?.length || 0} services available
              </div>
            )}
          </div>
        </header>

        {/* --- Advanced Sticky Filter Bar --- */}
        <div className="sticky top-4 md:top-6 z-40 mb-10 md:mb-16 bg-bg-card/80 backdrop-blur-2xl p-3 md:p-4 rounded-[1.5rem] md:rounded-[2.5rem] border border-border-color shadow-2xl flex flex-col lg:flex-row items-stretch lg:items-center gap-3 md:gap-4 transition-all focus-within:border-brand/50">
          
          {/* 1. البحث بالاسم */}
          <div className="relative flex-[2]">
            <HiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" />
            <input 
              type="text" 
              placeholder="Search services..."
              defaultValue={query}
              onKeyDown={(e) => e.key === "Enter" && updateFilter("query", e.currentTarget.value)}
              className="w-full bg-bg-primary border border-border-color rounded-xl md:rounded-2xl py-3 pl-12 pr-4 text-sm text-text-primary focus:ring-2 focus:ring-brand/50 outline-none transition-all"
            />
          </div>

          {/* حاوية الفلاتر الصغيرة */}
          <div className="flex flex-wrap items-center gap-2 md:gap-4">
            
            {/* 2. فلتر الولاية */}
            <div className="relative flex-1 min-w-[140px]">
              <HiLocationMarker className="absolute left-3 top-1/2 -translate-y-1/2 text-brand z-10" />
              <select 
                value={location}
                onChange={(e) => updateFilter("location", e.target.value)}
                className="w-full appearance-none bg-bg-primary border border-border-color pl-9 pr-8 py-3 rounded-xl md:rounded-2xl text-xs md:text-sm font-bold text-text-secondary outline-none focus:ring-2 focus:ring-brand/50 cursor-pointer transition-all"
              >
                <option value="">All States</option>
                {ALGERIA_STATES.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
              <HiOutlineChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none" />
            </div>

            {/* 3. فلتر السعر */}
            <form onSubmit={handlePriceSubmit} className="flex flex-1 items-center gap-1 md:gap-2 bg-bg-primary border border-border-color p-1 rounded-xl md:rounded-2xl">
              <input name="min" type="number" placeholder="Min" defaultValue={min} className="w-full min-w-[50px] bg-bg-secondary rounded-lg md:rounded-xl py-2 px-2 md:px-3 text-[10px] md:text-xs font-bold text-text-primary outline-none focus:ring-1 focus:ring-brand" />
              <input name="max" type="number" placeholder="Max" defaultValue={max} className="w-full min-w-[50px] bg-bg-secondary rounded-lg md:rounded-xl py-2 px-2 md:px-3 text-[10px] md:text-xs font-bold text-text-primary outline-none focus:ring-1 focus:ring-brand" />
              <button type="submit" className="bg-brand text-white p-2 md:p-2.5 rounded-lg md:rounded-xl hover:bg-brand-hover transition-all shadow-lg shadow-brand/20">
                <HiAdjustments className="size-4" />
              </button>
            </form>

            {/* 4. الترتيب */}
            <div className="relative flex-1 min-w-[140px] lg:min-w-fit">
              <select 
                value={sort}
                onChange={(e) => updateFilter("sort", e.target.value)}
                className="w-full lg:w-auto appearance-none bg-bg-primary lg:bg-transparent border lg:border-none border-border-color px-4 lg:px-0 py-3 lg:py-0 rounded-xl font-bold text-text-primary pr-8 outline-none cursor-pointer hover:text-brand transition-colors text-xs md:text-sm"
              >
                <option value="newest">Newest</option>
                <option value="price_low">Price: Low</option>
                <option value="price_high">Price: High</option>
              </select>
              <HiOutlineChevronDown className="absolute right-3 lg:right-0 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none" />
            </div>
          </div>
        </div>

        {/* --- Content Grid --- */}
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-32 md:py-40">
            <Loader designs="size-12 md:size-14 border-t-brand" />
            <p className="mt-6 text-text-muted font-bold tracking-widest text-[10px] md:text-xs uppercase animate-pulse">Syncing Services...</p>
          </div>
        ) : error ? (
          <Error error={error} refetch={refetch} />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-x-8 md:gap-y-16">
            {data?.map((item) => (
               <Card key={item._id} item={item} />
            ))}
          </div>
        )}

        {/* No Data State */}
        {!isLoading && data?.length === 0 && (
          <div className="py-20 md:py-32 flex flex-col items-center text-center px-4">
            <div className="w-16 h-16 md:w-24 md:h-24 bg-bg-card rounded-full flex items-center justify-center mb-6 md:mb-8 border border-border-color">
              <HiSearch className="text-3xl md:text-4xl text-text-muted" />
            </div>
            <h3 className="text-xl md:text-2xl font-black text-text-primary">No results found</h3>
            <p className="text-text-secondary mt-2 text-sm md:text-base">Try changing your filters or searching for something else.</p>
            <button 
              onClick={() => setSearchParams({})}
              className="mt-6 md:mt-8 px-8 py-3 md:px-10 md:py-4 bg-brand text-white font-bold rounded-xl md:rounded-2xl hover:bg-brand-hover transition-all shadow-xl shadow-brand/20"
            >
              Clear All Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;