import React from "react";
import { motion } from "framer-motion";

const About: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#030b16] text-white overflow-hidden relative font-sans">
      
      <div className="absolute inset-0 z-0">
        <motion.div 
          animate={{ 
            opacity: [0.3, 0.5, 0.3],
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute -top-[5%] -left-[10%] w-[70%] h-[50%] bg-emerald-500/10 rounded-full blur-[100px] md:blur-[120px]" 
        />
        <div className="absolute top-[20%] right-[-5%] w-[40%] h-[60%] bg-emerald-900/10 skew-y-12 blur-[80px] border-r border-emerald-500/20" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 md:py-20 relative z-10">
        
        <div className="grid lg:grid-cols-2 gap-10 items-center mb-20 md:mb-32">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left"
          >
            <div className="inline-block px-4 py-1 border border-emerald-500/30 rounded-full bg-emerald-500/5 text-emerald-400 text-xs md:text-sm mb-6">
              Next-Gen Networking
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black mb-6 bg-gradient-to-r from-white via-emerald-100 to-emerald-500 bg-clip-text text-transparent leading-[1.2] lg:leading-[1.1]">
              Talent & <br className="hidden sm:block" /> Opportunity.
            </h1>
            <p className="text-gray-400 text-base md:text-xl max-w-lg mx-auto lg:mx-0 leading-relaxed">
              We are revolutionizing the digital workspace by creating a fluid ecosystem where 
              innovation meets execution.
            </p>
          </motion.div>

          <div className="relative h-[300px] md:h-[400px] hidden md:block">
            {[1, 2, 3, 4].map((i) => (
              <motion.div
                key={i}
                animate={{ y: [0, -20, 0], opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 4, delay: i * 0.5, repeat: Infinity }}
                className="absolute p-3 md:p-4 bg-[#0a192f]/80 border border-emerald-500/40 rounded-2xl backdrop-blur-xl shadow-lg"
                style={{
                  top: `${i * 20}%`,
                  left: `${(i % 2) * 30 + 20}%`
                }}
              >
                <div className="w-6 h-6 md:w-8 md:h-8 bg-emerald-500 rounded-lg opacity-80" />
              </motion.div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-20 md:mb-32">
          <FeatureCard title="INNOVATION" icon="💡" desc="Embracing new ideas and tech." />
          <FeatureCard title="SIMPLICITY" icon="⚡" desc="Clean and intuitive experiences." />
          <FeatureCard title="TRUST" icon="🛡️" desc="Secure and reliable platform." />
          <FeatureCard title="GROWTH" icon="📈" desc="Helping users scale globally." />
        </div>

        <div className="text-center">
          <h2 className="text-emerald-500 font-bold tracking-[0.3em] mb-12 md:mb-16 uppercase text-sm md:text-base">Statistics</h2>
          <div className="flex flex-col sm:flex-row flex-wrap justify-center items-center gap-10 md:gap-16 lg:gap-24">
            <StatRing value="12K+" label="Users" delay={0.2} />
            <StatRing value="450+" label="Projects" delay={0.4} />
            <StatRing value="99%" label="Success Rate" delay={0.6} />
          </div>
        </div>
      </div>
    </div>
  );
};

const FeatureCard = ({ title, desc, icon }: any) => (
  <motion.div
    whileHover={{ y: -5 }}
    className="relative group p-6 md:p-8 rounded-[1.5rem] md:rounded-[2rem] bg-gradient-to-b from-emerald-500/10 to-transparent border border-white/5 backdrop-blur-md overflow-hidden"
  >
    <div className="text-3xl md:text-4xl mb-4 md:mb-6">{icon}</div>
    <h3 className="text-emerald-400 font-bold tracking-widest mb-3 text-sm md:text-base">{title}</h3>
    <p className="text-gray-500 text-xs md:text-sm leading-relaxed">{desc}</p>
  </motion.div>
);

const StatRing = ({ value, label, delay }: any) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.8 }}
    whileInView={{ opacity: 1, scale: 1 }}
    transition={{ delay, duration: 0.8 }}
    className="relative group"
  >
    <div className="w-36 h-36 md:w-48 md:h-48 rounded-full border-2 border-emerald-500/20 flex items-center justify-center relative">
      <motion.div 
        animate={{ rotate: 360 }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0 rounded-full border-t-2 border-emerald-400 shadow-[0_0_15px_rgba(52,211,153,0.3)]"
      />
      <div className="text-center px-2">
        <div className="text-2xl md:text-4xl font-black text-white">{value}</div>
        <div className="text-gray-500 text-[10px] md:text-xs uppercase tracking-widest mt-1">{label}</div>
      </div>
    </div>
  </motion.div>
);

export default About;