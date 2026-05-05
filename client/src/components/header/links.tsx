import React from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";

type LinksProps = {
  vertical?: boolean;
  onClick?: () => void;
};

const Links: React.FC<LinksProps> = ({ vertical = false, onClick }) => {
  const location = useLocation();

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Services", path: "/services" },
    { name: "Tasks", path: "/tasks" },
    { name: "About", path: "/about" },
    { name: "Payment", path: "/payment" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <nav
      className={`flex ${
        vertical 
          ? "flex-col items-center gap-2 w-full pt-4" 
          : "flex-row items-center gap-6"
      }`}
    >
      {navLinks.map((link) => {
        const isActive = location.pathname === link.path;

        return (
          <Link
            key={link.path}
            to={link.path}
            onClick={onClick}
            className={`relative px-4 py-2 text-sm md:text-base font-semibold text-white hover:text-emerald-500 transition-colors duration-300 ${
              vertical ? "w-full text-center py-4 text-lg" : ""
            }`}
          >
            <span className="relative z-10">{link.name}</span>
            {isActive && (
              <motion.div
                layoutId="nav-underline"
                className={`absolute bg-emerald-500 rounded-full ${
                  vertical
                    ? "left-0 top-1/4 bottom-1/4 w-[3px]"
                    : "left-0 right-0 bottom-0 h-[2px]"
                }`}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            )}
          </Link>
        );
      })}
    </nav>
  );
};

export default Links;