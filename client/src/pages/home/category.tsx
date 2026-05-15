import { Link } from "react-router-dom";
import { categories } from "../../utils/consttants";
import { HiOutlineArrowRight } from "react-icons/hi";

const Category = () => {
  const topCategories = categories.slice(0, 12);

  return (
    <div className="py-28 px-6 max-w-7xl mx-auto flex flex-col items-center">

      {/* رأس القسم */}
      <div className="flex flex-col items-center text-center mb-16 gap-4">
        <span className="text-xs font-black uppercase tracking-[0.3em] text-brand px-4 py-1.5 rounded-full border border-brand/20 bg-brand/5">
          What are you looking for?
        </span>

        <h2 className="text-4xl md:text-5xl font-black text-text-primary tracking-tight leading-tight">
          Explore Top{" "}
          <span className="relative inline-block">
            <span className="text-brand">Categories</span>
            <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 200 8" fill="none">
              <path d="M0 6 Q50 0 100 4 Q150 8 200 2" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className="text-brand"/>
            </svg>
          </span>
        </h2>

        <p className="text-text-secondary text-lg max-w-lg">
          Hire top Algerian freelancers across every field — fast, reliable, and affordable.
        </p>

        <Link
          to="/services"
          className="flex items-center gap-2 text-brand text-sm font-bold hover:text-brand-hover transition-all group mt-1"
        >
          Browse all categories
          <HiOutlineArrowRight className="group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 w-full">
        {topCategories.map((i, idx) => (
          <Link
            to={`/search?category=${i.name}`}
            key={i.name}
            style={{ animationDelay: `${idx * 50}ms` }}
            className="group relative flex flex-col items-center justify-center
                       aspect-square p-5 rounded-2xl
                       bg-bg-card border border-border-color
                       transition-all duration-300 ease-out
                       hover:shadow-[0_8px_30px_rgba(16,185,129,0.12)]
                       hover:-translate-y-2 hover:border-brand/40
                       hover:bg-gradient-to-br hover:from-brand/5 hover:to-transparent"
          >
            {/* رقم التصنيف */}
         

            <div className="flex flex-col items-center gap-4">
              {/* الأيقونة */}
              <div className="w-14 h-14 flex items-center justify-center rounded-xl
                              bg-bg-secondary border border-border-color
                              group-hover:bg-brand group-hover:border-brand
                              group-hover:shadow-[0_4px_20px_rgba(16,185,129,0.3)]
                              transition-all duration-300">
                <span className="text-3xl transition-transform duration-300 group-hover:scale-110">
                  {i.icon}
                </span>
              </div>

              {/* الاسم */}
              <span className="font-semibold text-text-secondary group-hover:text-text-primary text-xs md:text-sm text-center leading-snug transition-colors duration-300">
                {i.name}
              </span>
            </div>

            {/* مؤشر السهم */}
            <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-1 group-hover:translate-x-0">
              <HiOutlineArrowRight className="text-brand text-xs" />
            </div>
          </Link>
        ))}
      </div>

      {/* الزر الرئيسي */}
      <div className="mt-14 flex flex-col items-center gap-3">
        <Link
          to="/Services"
          className="flex items-center gap-3 px-10 py-3.5 rounded-xl
                     bg-brand text-bg-primary font-black
                     shadow-[0_4px_20px_rgba(16,185,129,0.25)]
                     hover:bg-brand-hover hover:shadow-[0_8px_30px_rgba(16,185,129,0.35)]
                     hover:-translate-y-0.5 transition-all duration-300
                     active:scale-95 uppercase text-sm tracking-widest group"
        >
          View All Categories
          <HiOutlineArrowRight className="group-hover:translate-x-1 transition-transform" />
        </Link>
        <p className="text-text-muted text-xs">
          +50 categories available on{" "}
          <span className="font-black text-text-secondary">
            JOB<span className="text-brand">IFY</span>
          </span>
        </p>
      </div>

    </div>
  );
};

export default Category;