import { Link } from "react-router-dom";
import { categories } from "../../utils/consttants";
import { motion, Variants } from "framer-motion";

const Services = () => {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <div className="my-24 px-6 max-w-7xl mx-auto flex flex-col items-center">

      {/* رأس الصفحة */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-center mb-20 space-y-4"
      >
        <h2 className="text-3xl md:text-4xl font-light text-text-primary tracking-tight">
          Explore Our{" "}
          <span className="font-bold border-b-2 border-brand pb-1">
            Specialized Services
          </span>
        </h2>
        <p className="text-text-secondary text-sm md:text-base max-w-xl mx-auto leading-relaxed">
          Professional solutions tailored to meet your business requirements with precision and excellence.
        </p>
      </motion.div>

      {/* شبكة الخدمات */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 w-full"
      >
        {categories.map((category) => (
          <motion.div key={category.name} variants={itemVariants}>
            <Link
              to={`/search?category=${category.name}`}
              className="group relative flex flex-col items-start p-8 rounded-2xl
                         bg-bg-card border border-border-color
                         transition-all duration-500 ease-out
                         hover:scale-[1.03] hover:border-brand/40
                         hover:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.3),0_0_15px_-3px_rgba(16,185,129,0.15)]"
            >
              {/* أيقونة الخدمة */}
              <div className="mb-8 w-14 h-14 flex items-center justify-center rounded-xl
                              bg-bg-secondary border border-border-color
                              group-hover:bg-brand group-hover:shadow-[0_0_25px_rgba(16,185,129,0.4)]
                              group-hover:border-brand
                              transition-all duration-500">
                <span className="text-3xl grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-110">
                  {category.icon}
                </span>
              </div>

              {/* النصوص */}
              <div className="relative z-10 space-y-2">
                <h3 className="text-text-primary font-semibold text-lg tracking-wide group-hover:text-brand transition-colors">
                  {category.name}
                </h3>
                <p className="text-text-muted text-[10px] uppercase tracking-[0.2em] font-bold group-hover:text-text-secondary transition-colors">
                  Professional Grade
                </p>
              </div>

              {/* سهم تفاعلي */}
              <div className="absolute bottom-8 right-8 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                <svg className="w-5 h-5 text-brand" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>

              {/* Glassmorphism Overlay */}
              <div className="absolute inset-0 bg-brand/[0.02] opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl" />

              {/* خط جانبي مضيء */}
              <div className="absolute top-0 left-0 w-[1px] h-0 bg-gradient-to-b from-brand to-transparent group-hover:h-full transition-all duration-700 rounded-l-2xl" />
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default Services;