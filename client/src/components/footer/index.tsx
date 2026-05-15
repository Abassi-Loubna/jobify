import { Link } from "react-router-dom";
import { FiGithub, FiTwitter, FiLinkedin, FiInstagram, FiSend } from "react-icons/fi";
import React from "react";

// --- تعريف أنواع البيانات ---
interface FooterLink {
  name: string;
  path: string;
}

interface FooterColumnProps {
  title: string;
  links: FooterLink[];
}

interface SocialIconProps {
  icon: React.ReactNode;
  href: string;
}

// --- المكونات الفرعية ---

const FooterColumn = ({ title, links }: FooterColumnProps) => (
  <div className="flex flex-col items-center md:items-start gap-6">
    {/* استخدام text-primary للعنوان */}
    <h3 className="text-text-primary font-bold text-lg">{title}</h3>
    <ul className="flex flex-col items-center md:items-start gap-4">
      {links.map((link, index) => (
        <li key={index}>
          <Link 
            to={link.path} 
            // استخدام text-muted مع تأثير hover بلون الـ brand المتغير
            className="text-text-muted hover:text-brand text-sm transition-all duration-300 hover:translate-x-1 inline-block"
          >
            {link.name}
          </Link>
        </li>
      ))}
    </ul>
  </div>
);

const SocialIcon = ({ icon, href }: SocialIconProps) => (
  <a 
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    // استخدام bg-secondary والحدود المتغيرة border-color
    className="w-10 h-10 rounded-xl bg-bg-secondary flex items-center justify-center text-text-muted hover:bg-brand hover:text-white transition-all duration-300 border border-border-color hover:border-brand hover:-translate-y-1 shadow-lg"
  >
    {icon}
  </a>
);

// --- المكون الرئيسي ---

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    // استخدام bg-card كخلفية للفوتر لتمييزه عن جسم الصفحة الرئيسي
    <footer className="w-full bg-bg-card border-t border-border-color pt-12 pb-6 md:pt-16 md:pb-8 font-sans transition-colors duration-300">
      <div className="max-w-[1400px] mx-auto px-6 md:px-20">
        
        {/* القسم العلوي */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-16 text-center md:text-left">
          
          {/* العمود الأول: الهوية */}
          <div className="flex flex-col items-center md:items-start gap-6">
            <Link to="/" className="text-3xl font-black tracking-tighter text-text-primary">
              JOB<span className="text-brand">IFY</span>
            </Link>
            <p className="text-text-secondary leading-relaxed text-sm max-w-sm">
              The world's largest marketplace for digital services. Empowering freelancers and businesses to thrive in the modern economy.
            </p>
            <div className="flex gap-4">
              <SocialIcon icon={<FiGithub />} href="#" />
              <SocialIcon icon={<FiTwitter />} href="#" />
              <SocialIcon icon={<FiLinkedin />} href="#" />
              <SocialIcon icon={<FiInstagram />} href="#" />
            </div>
          </div>

          {/* العمود الثاني: المنصة */}
          <FooterColumn 
            title="Platform" 
            links={[
              { name: "Browse Services", path: "/services" },
              { name: "Find Gigs", path: "/search" },
              { name: "Post a Gig", path: "/add-gig" },
              { name: "Success Stories", path: "#" },
            ]} 
          />

          {/* العمود الثالث: الدعم والقانونية */}
          <FooterColumn 
            title="Support" 
            links={[
              { name: "Help Center", path: "#" },
              { name: "Privacy Policy", path: "#" },
              { name: "Terms of Service", path: "#" },
              { name: "Trust & Safety", path: "#" },
            ]} 
          />

          {/* العمود الرابع: النشرة الإخبارية */}
          <div className="flex flex-col items-center md:items-start gap-6">
            <h3 className="text-text-primary font-bold text-lg">Newsletter</h3>
            <p className="text-text-muted text-sm">Get the latest updates and job alerts directly to your inbox.</p>
            <div className="relative group w-full max-w-xs md:max-w-none">
              <input 
                type="email" 
                placeholder="Enter your email"
                // استخدام bg-primary للـ input ليبرز داخل bg-card
                className="w-full bg-bg-primary border border-border-color rounded-xl py-3 px-4 text-sm text-text-primary focus:outline-none focus:border-brand transition-all placeholder:text-text-muted"
              />
              <button className="absolute right-2 top-1.5 bg-brand text-white p-2 rounded-lg hover:bg-brand-hover transition-all active:scale-95 shadow-md">
                <FiSend size={16} />
              </button>
            </div>
          </div>

        </div>

        {/* القسم السفلي */}
        <div className="border-t border-border-color pt-8 flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-text-muted">
          <p>© {currentYear} JOBIFY Inc. All Rights Reserved.</p>
          
          <div className="flex items-center gap-6 md:gap-8">
            <div className="flex items-center gap-2 hover:text-brand cursor-pointer transition-colors group">
              <span className="w-2 h-2 rounded-full bg-brand group-hover:animate-ping"></span>
              English (US)
            </div>
            <span className="hover:text-brand cursor-pointer transition-colors font-medium">USD $</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;