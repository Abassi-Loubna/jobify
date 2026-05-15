import React from 'react';
import { motion } from 'framer-motion';

const Contact: React.FC = () => {
  return (
    // استخدام bg-primary للخلفية و text-primary للنصوص الأساسية
    <div className="min-h-screen bg-bg-primary text-text-primary pt-28 pb-16 px-6 relative overflow-hidden transition-colors duration-300">
      
      {/* خلفية جمالية: استخدام لون البراند مع شفافية */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-brand/10 rounded-full blur-[120px]"></div>

      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 relative z-10">
        
        {/* الجزء الأول: معلومات التواصل */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* استخدام لون البراند للعنوان */}
          <h1 className="text-6xl font-extrabold mb-8 text-brand">Get in Touch</h1>
          <p className="text-text-muted text-lg mb-10 leading-relaxed">
            Have a project in mind or need assistance? Our support team is ready to help you 24/7. 
            Drop us a message and we'll get back to you shortly.
          </p>
          
          <div className="space-y-6">
            <ContactInfo icon="📧" label="Email" value="support@jobify.com" />
            <ContactInfo icon="📍" label="Location" value="Global Remote Hub" />
            <ContactInfo icon="📱" label="Support" value="+1 (555) 000-0000" />
          </div>
        </motion.div>

        {/* الجزء الثاني: الفورم (Form) - استخدام bg-card و border-color */}
        <motion.form 
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-bg-card p-10 rounded-3xl border border-border-color backdrop-blur-md shadow-xl"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
            <Input label="Name" placeholder="John Doe" />
            <Input label="Email" placeholder="john@example.com" />
          </div>
          <Input label="Subject" placeholder="How can we help?" />
          <div className="mb-6">
            <label className="block text-sm text-text-secondary mb-2">Message</label>
            <textarea 
              className="w-full bg-bg-primary border border-border-color rounded-xl p-4 h-32 focus:border-brand outline-none transition-all text-text-primary placeholder:text-text-muted" 
              placeholder="Your message here..."
            ></textarea>
          </div>
          
          {/* الزر باستخدام ألوان البراند المتحولة */}
          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full py-4 bg-brand hover:bg-brand-hover text-white rounded-xl font-bold text-lg transition-all shadow-lg shadow-brand/20"
          >
            Send Message
          </motion.button>
        </motion.form>
      </div>
    </div>
  );
};

// Components مساعدة
const ContactInfo = ({ icon, label, value }: { icon: string, label: string, value: string }) => (
  <div className="flex items-center gap-4">
    {/* استخدام bg-secondary للأيقونات */}
    <div className="w-12 h-12 bg-bg-secondary rounded-lg flex items-center justify-center text-xl border border-border-color shadow-sm">
      {icon}
    </div>
    <div>
      <div className="text-xs text-text-muted uppercase tracking-widest">{label}</div>
      <div className="text-lg font-medium text-text-primary">{value}</div>
    </div>
  </div>
);

const Input = ({ label, placeholder }: { label: string, placeholder: string }) => (
  <div className="mb-6 last:mb-0">
    <label className="block text-sm text-text-secondary mb-2">{label}</label>
    <input 
      type="text" 
      className="w-full bg-bg-primary border border-border-color rounded-xl p-4 focus:border-brand outline-none transition-all text-text-primary placeholder:text-text-muted" 
      placeholder={placeholder} 
    />
  </div>
);

export default Contact;