import React, { FormEvent, useRef, useEffect, useState } from "react";
import { IoSearch } from "react-icons/io5";
import { FiGift } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const images = [
  "https://images.unsplash.com/photo-1551434678-e076c223a692", // فريق عمل
  "https://images.unsplash.com/photo-1547658719-da2b51169166", // تصميم ويب
  "https://images.unsplash.com/photo-1498050108023-c5249f4df085", // برمجة
  "https://images.unsplash.com/photo-1626785774625-0b1c2c4eab67", // تصميم جرافيك
  "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d", // فيديو وإنتاج
  "https://images.unsplash.com/photo-1542744173-8e7e53415bb0", // اجتماع عمل
  "https://images.unsplash.com/photo-1504384308090-c894fdcc538d", // مساحة عمل
  "https://images.unsplash.com/photo-1560472354-b33ff0c44a43", // تسويق
  "https://images.unsplash.com/photo-1533750349088-cd871a92f312", // كتابة محتوى
  "https://images.unsplash.com/photo-1516321318423-f06f85e504b3", // تعليم أونلاين
  "https://images.unsplash.com/photo-1611532736597-de2d4265fba3", // ترجمة / لغات
  "https://images.unsplash.com/photo-1607703703520-bb638e84caf2", // تصوير فوتوغرافي
  "https://images.unsplash.com/photo-1519389950473-47ba0277781c", // تقنية
  "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40", // محاسبة / مالية
  "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158", // هندسة
];

const Hero = () => {
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);
  const [index, setIndex] = useState(0);

  const customFont =
    '"IBM Plex Sans", sans-serif, system-ui, -apple-system, "Segoe UI"';

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 4500);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const text = inputRef.current!.value;
    if (text.trim()) {
      navigate(`/search?query=${encodeURIComponent(text)}`);
      inputRef.current!.value = "";
    }
  };

  return (
    <div
      className="relative w-full min-h-screen flex flex-col items-center justify-center bg-bg-primary overflow-hidden"
      style={{ fontFamily: customFont }}
    >
      {/* Background */}
      <div className="absolute inset-0 z-0">
        {images.map((img, i) => (
          <img
            key={i}
            src={`${img}?q=80&w=1920&auto=format&fit=crop`}
            className={`absolute w-full h-full object-cover transition-all duration-[2500ms] ${
              i === index
                ? "opacity-40 scale-105 animate-zoom"
                : "opacity-0 scale-100"
            }`}
          />
        ))}

        {/* overlay */}
        <div className="absolute inset-0 bg-bg-primary/40" />
        <div className="absolute inset-0 bg-gradient-to-b from-bg-primary/70 via-transparent to-bg-primary" />
      </div>

      {/* Main Content */}
      <section className="relative z-10 w-full max-w-5xl px-6 pt-32 pb-20 flex flex-col items-center text-center">
        
        {/* Badge */}
        <div className="mb-20 flex items-center gap-2 px-4 py-1.5 rounded-full bg-bg-card/30 border border-border-color backdrop-blur-md">
          <FiGift className="text-brand animate-bounce" />
          <span className="text-text-primary text-[11px] font-bold uppercase tracking-widest">
            Free Registration
          </span>
        </div>

        {/* Title */}
        <h1 className="mb-6 text-3xl md:text-6xl font-black text-text-primary leading-tight">
          The best platform <br />
          <span className="text-brand">
            for freelancers in Algeria
          </span>
        </h1>

        <p className="mb-12 text-text-secondary text-lg md:text-xl max-w-2xl">
          Connect with local experts to get your projects done quickly and efficiently.
        </p>

        {/* Search Bar */}
        <div className="w-full max-w-3xl mb-16 px-4 animate-fade-in-up">
          <form
            onSubmit={handleSubmit}
            className="group relative flex flex-col md:flex-row items-center bg-bg-card/20 backdrop-blur-2xl border border-border-color rounded-2xl md:rounded-full p-2 shadow-[0_20px_50px_rgba(0,0,0,0.3)] transition-all duration-500 focus-within:border-brand/60 focus-within:bg-bg-card/30"
          >
            {/* Input Area */}
            <div className="flex flex-1 items-center w-full px-5">
              <IoSearch className="text-text-muted text-2xl group-focus-within:text-brand transition-colors duration-300" />
              <input
                ref={inputRef}
                type="text"
                className="w-full p-4 bg-transparent text-text-primary outline-none text-lg placeholder:text-text-muted font-light tracking-wide"
                placeholder="What service are you looking for today?"
              />
            </div>

            {/* Divider */}
            <div className="hidden md:block w-[1px] h-8 bg-border-color mx-2" />

            {/* Search Button */}
            <button className="relative w-full md:w-auto overflow-hidden bg-brand hover:bg-brand-hover text-bg-primary font-bold px-10 py-4 rounded-xl md:rounded-full transition-all duration-300 active:scale-95 group/btn">
              <span className="relative z-10 flex items-center justify-center gap-2 uppercase tracking-tighter">
                Search
              </span>
              <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover/btn:animate-[shimmer_2s_infinite]"></div>
            </button>
          </form>

          {/* Popular Tags */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
            <span className="text-text-muted text-sm font-medium tracking-wide">Popular in Algeria:</span>
            {["Logo Design", "Web Development", "Video Editing", "Translation"].map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => { if (inputRef.current) inputRef.current.value = tag; }}
                className="text-text-secondary text-sm border-b border-transparent hover:border-brand hover:text-brand transition-all duration-300 pb-0.5"
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-8 md:gap-20 border-t border-border-color pt-12 w-full">
          <div>
            <p className="text-2xl md:text-3xl font-bold text-text-primary">Free</p>
            <p className="text-xs text-text-muted">Sign Up</p>
          </div>
          <div>
            <p className="text-2xl md:text-3xl font-bold text-text-primary">15k+</p>
            <p className="text-xs text-text-muted">Experts</p>
          </div>
          <div>
            <p className="text-2xl md:text-3xl font-bold text-text-primary">4.9</p>
            <p className="text-xs text-text-muted">Rating</p>
          </div>
        </div>
      </section>

      <style>
        {`
          @keyframes zoom {
            0% { transform: scale(1); }
            50% { transform: scale(1.1); }
            100% { transform: scale(1.15); }
          }
          .animate-zoom {
            animation: zoom 40s ease-in-out infinite;
          }
        `}
      </style>
    </div>
  );
};

export default Hero;