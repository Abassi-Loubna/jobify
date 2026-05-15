
import React from "react";
import {
  LayoutDashboard,
  Users,
  Briefcase,
  LogOut,
  Menu,
} from "lucide-react";
import { useState } from "react";

interface SidebarItem {
  id: string;
  label: string;
  icon: React.ReactNode;
}

interface AdminSidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

const AdminSidebar: React.FC<AdminSidebarProps> = ({ activeSection, onSectionChange }) => {
  const [isOpen, setIsOpen] = useState(true);

  const menuItems: SidebarItem[] = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: <LayoutDashboard size={20} />,
    },
    {
      id: "users",
      label: "Users",
      icon: <Users size={20} />,
    },
    {
      id: "gigs",
      label: "Gigs",
      icon: <Briefcase size={20} />,
    },
  ];

  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to logout?");
    if (confirmLogout) {
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
  };

  return (
    <>
      {/* Sidebar */}
      <aside
        className={`${
          isOpen ? "w-64" : "w-20"
        } bg-[#0f172a] border-r border-gray-800 transition-all duration-300 flex flex-col h-screen fixed lg:relative z-50`}
      >
        {/* Header */}
        <div className="p-6 border-b border-gray-800 flex items-center justify-between">
          {isOpen && (
            <h2 className="text-xl font-black  from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Docify
            </h2>
          )}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 hover:bg-gray-800 rounded-lg transition"
          >
            <Menu size={20} className="text-gray-400" />
          </button>
        </div>

        {/* Menu Items */}
        <nav className="flex-1 p-4 space-y-3">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onSectionChange(item.id)}
              className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl transition group ${
                activeSection === item.id
                  ? "bg-cyan-500/20 text-cyan-400"
                  : "hover:bg-[#1e293b] text-gray-300 hover:text-cyan-400"
              }`}
            >
              <span className={`transition ${
                activeSection === item.id ? "text-cyan-400" : "text-gray-500 group-hover:text-cyan-400"
              }`}>
                {item.icon}
              </span>
              {isOpen && <span className="font-medium">{item.label}</span>}
            </button>
          ))}
        </nav>

        {/* Logout Button */}
        <div className="p-4 border-t border-gray-800">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-4 px-4 py-3 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 hover:text-red-300 transition group"
          >
            <LogOut size={20} />
            {isOpen && <span className="font-medium">Logout</span>}
          </button>
        </div>
      </aside>

      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

export default AdminSidebar;