import React from "react";
import { motion } from "framer-motion";

const About: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#030b16] text-white overflow-hidden relative font-sans">
      
      {/* 1. الخلفية الديناميكية - موجات مضيئة */}
      <div className="absolute inset-0 z-0">
        <motion.div 
          animate={{ 
            opacity: [0.3, 0.5, 0.3],
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute -top-[10%] -left-[10%] w-[50%] h-[50%] bg-emerald-500/20 rounded-full blur-[120px]" 
        />
        <div className="absolute top-[20%] right-[-5%] w-[40%] h-[60%] bg-emerald-900/10 skew-y-12 blur-[100px] border-r border-emerald-500/20" />
      </div>

      <div className="max-w-7xl mx-auto px-6 py-20 relative z-10">
        
        {/* القسم العلوي: الهوية البصرية */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-32">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-block px-4 py-1 border border-emerald-500/30 rounded-full bg-emerald-500/5 text-emerald-400 text-sm mb-6">
              Next-Gen Networking
            </div>
            <h1 className="text-7xl font-black mb-6 bg-gradient-to-r from-white via-emerald-100 to-emerald-500 bg-clip-text text-transparent leading-[1.1]">
              Talent & <br /> Opportunity.
            </h1>
            <p className="text-gray-400 text-xl max-w-lg leading-relaxed">
              We are revolutionizing the digital workspace by creating a fluid ecosystem where 
              innovation meets execution.
            </p>
          </motion.div>

          {/* أيقونات عائمة (تمثل الـ Nodes في الصورة) */}
          <div className="relative h-[400px] hidden lg:block">
            {[1, 2, 3, 4].map((i) => (
              <motion.div
                key={i}
                animate={{ y: [0, -20, 0], opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 4, delay: i * 0.5, repeat: Infinity }}
                className={`absolute p-4 bg-[#0a192f]/80 border border-emerald-500/40 rounded-2xl backdrop-blur-xl shadow-[0_0_20px_rgba(16,185,129,0.2)]`}
                style={{
                  top: `${i * 20}%`,
                  left: `${(i % 2) * 40 + 10}%`
                }}
              >
                <div className="w-8 h-8 bg-emerald-500 rounded-lg opacity-80" />
              </motion.div>
            ))}
          </div>
        </div>

        {/* قسم البطاقات - تصميم زجاجي عمودي */}
        <div className="grid md:grid-cols-4 gap-6 mb-32">
          <FeatureCard title="INNOVATION" icon="💡" desc="Embracing new ideas and tech." />
          <FeatureCard title="SIMPLICITY" icon="⚡" desc="Clean and intuitive experiences." />
          <FeatureCard title="TRUST" icon="🛡️" desc="Secure and reliable platform." />
          <FeatureCard title="GROWTH" icon="📈" desc="Helping users scale globally." />
        </div>

        {/* قسم الإحصائيات الدائرية */}
        <div className="text-center">
          <h2 className="text-emerald-500 font-bold tracking-[0.3em] mb-16 uppercase">Statistics</h2>
          <div className="flex flex-wrap justify-center gap-12 lg:gap-24">
            <StatRing value="12K+" label="Users" delay={0.2} />
            <StatRing value="450+" label="Projects" delay={0.4} />
            <StatRing value="99%" label="Success Rate" delay={0.6} />
          </div>
        </div>
      </div>
    </div>
  );
};

/* مكون البطاقة الزجاجية */
const FeatureCard = ({ title, desc, icon }: any) => (
  <motion.div
    whileHover={{ y: -10, scale: 1.02 }}
    className="relative group p-8 rounded-[2rem] bg-gradient-to-b from-emerald-500/10 to-transparent border border-white/5 backdrop-blur-md overflow-hidden"
  >
    <div className="absolute inset-0 bg-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
    <div className="text-4xl mb-6">{icon}</div>
    <h3 className="text-emerald-400 font-bold tracking-widest mb-3">{title}</h3>
    <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
  </motion.div>
);

/* مكون الإحصائيات الدائرية المتحركة */
const StatRing = ({ value, label, delay }: any) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.8 }}
    whileInView={{ opacity: 1, scale: 1 }}
    transition={{ delay, duration: 0.8 }}
    className="relative group"
  >
    {/* حلقة دائرية مضيئة */}
    <div className="w-48 h-48 rounded-full border-2 border-emerald-500/20 flex items-center justify-center relative">
      <motion.div 
        animate={{ rotate: 360 }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0 rounded-full border-t-2 border-emerald-400 shadow-[0_0_15px_rgba(52,211,153,0.4)]"
      />
      <div className="text-center">
        <div className="text-4xl font-black text-white group-hover:text-emerald-400 transition-colors">{value}</div>
        <div className="text-gray-500 text-xs uppercase tracking-widest mt-1">{label}</div>
      </div>
    </div>
  </motion.div>
);

export default About;