import React from 'react';
import { motion } from 'framer-motion';

const Contact: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#061121] text-white pt-28 pb-16 px-6 relative overflow-hidden">
      {/* خلفية جمالية */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-emerald-500/10 rounded-full blur-[120px]"></div>

      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 relative z-10">
        
        {/* الجزء الأول: معلومات التواصل */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-6xl font-extrabold mb-8 text-emerald-400">Get in Touch</h1>
          <p className="text-gray-400 text-lg mb-10 leading-relaxed">
            Have a project in mind or need assistance? Our support team is ready to help you 24/7. 
            Drop us a message and we'll get back to you shortly.
          </p>
          
          <div className="space-y-6">
            <ContactInfo icon="📧" label="Email" value="support@jobify.com" />
            <ContactInfo icon="📍" label="Location" value="Global Remote Hub" />
            <ContactInfo icon="📱" label="Support" value="+1 (555) 000-0000" />
          </div>
        </motion.div>

        {/* الجزء الثاني: الفورم (Form) */}
        <motion.form 
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-[#0a192f]/50 p-10 rounded-3xl border border-gray-800 backdrop-blur-md"
        >
          <div className="grid grid-cols-2 gap-6 mb-6">
            <Input label="Name" placeholder="John Doe" />
            <Input label="Email" placeholder="john@example.com" />
          </div>
          <Input label="Subject" placeholder="How can we help?" />
          <div className="mb-6">
            <label className="block text-sm text-gray-400 mb-2">Message</label>
            <textarea className="w-full bg-[#061121] border border-gray-700 rounded-xl p-4 h-32 focus:border-emerald-500 outline-none transition-all" placeholder="Your message here..."></textarea>
          </div>
          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full py-4 bg-emerald-500 hover:bg-emerald-600 rounded-xl font-bold text-lg transition-all"
          >
            Send Message
          </motion.button>
        </motion.form>
      </div>
    </div>
  );
};

// Components مساعدة لتنظيم الكود
const ContactInfo = ({ icon, label, value }: { icon: string, label: string, value: string }) => (
  <div className="flex items-center gap-4">
    <div className="w-12 h-12 bg-[#0a192f] rounded-lg flex items-center justify-center text-xl border border-gray-800">{icon}</div>
    <div>
      <div className="text-xs text-gray-500 uppercase tracking-widest">{label}</div>
      <div className="text-lg font-medium text-emerald-100">{value}</div>
    </div>
  </div>
);

const Input = ({ label, placeholder }: { label: string, placeholder: string }) => (
  <div>
    <label className="block text-sm text-gray-400 mb-2">{label}</label>
    <input type="text" className="w-full bg-[#061121] border border-gray-700 rounded-xl p-4 focus:border-emerald-500 outline-none transition-all" placeholder={placeholder} />
  </div>
);

export default Contact;