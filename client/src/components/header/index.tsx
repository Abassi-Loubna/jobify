import { Link, useLocation } from "react-router-dom";
import User from "./user";
import { useContext, useState, useEffect } from "react";
import AuthContext from "../../context/authContext";
import Links from "./links";
import Login from "./Login";
import { Menu, X, Sun, Moon } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useTheme } from "../../context/ThemeContext";



const Header = () => {
  const { user, logout } = useContext(AuthContext);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { dark, toggleTheme } = useTheme();

  const location = useLocation();
  const isHomePage = location.pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const getHeaderStyles = () => {
    if (!isHomePage) {
      return "bg-bg-primary border-b border-border shadow-lg";
    }
    return isScrolled
      ? "bg-bg-primary/90 backdrop-blur-xl border-b border-border shadow-lg"
      : "bg-transparent border-b border-transparent";
  };

  return (
    <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 h-20 flex items-center ${getHeaderStyles()}`}>
      <div className="max-w-[1400px] mx-auto w-full flex justify-between items-center px-6 md:px-10 lg:px-20">

        <Link to="/" className="flex items-center z-[60]">
          <div className="text-2xl md:text-3xl font-black tracking-tighter text-text-primary hover:text-brand transition-colors">
            JOB<span className="text-brand">IFY</span>
          </div>
        </Link>

        <div className="hidden lg:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
          <Links vertical={false} />
        </div>

        <div className="flex items-center gap-4 z-[60]">

          {/* زر تغيير الـ mode */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg text-text-secondary hover:text-brand hover:bg-bg-secondary transition-all duration-300"
            aria-label="Toggle theme"
          >
            <AnimatePresence mode="wait">
              {dark ? (
                <motion.div
                  key="sun"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Sun size={20} />
                </motion.div>
              ) : (
                <motion.div
                  key="moon"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Moon size={20} />
                </motion.div>
              )}
            </AnimatePresence>
          </button>

          <div className="hidden lg:flex">
            {user ? <User data={user} logout={logout} /> : <Login />}
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden text-text-primary p-2 hover:bg-bg-secondary rounded-lg transition-colors"
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-20 left-0 w-full bg-bg-primary border-b border-border flex flex-col items-center gap-8 py-10 lg:hidden shadow-2xl z-50"
          >
            <Links vertical={true} onClick={() => setIsOpen(false)} />

            <div className="pt-4 border-t border-border w-full flex justify-center">
              {user ? (
                <div onClick={() => setIsOpen(false)}>
                  <User data={user} logout={logout} />
                </div>
              ) : (
                <Login />
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;