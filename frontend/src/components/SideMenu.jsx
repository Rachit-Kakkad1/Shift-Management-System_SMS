import React from "react";
import { Link, useNavigate } from "react-router";
import { 
  LayoutDashboard, 
  Zap, 
  Lock, 
  LogOut, 
  Clock, 
  Calendar,
  Sparkles,
  ShieldCheck,
  User
} from "lucide-react";
import { motion } from "framer-motion";

const SideMenu = ({ activeMenu }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const menuItems = [
    { name: "Dashboard", icon: LayoutDashboard, path: "/user/dashboard" },
    { name: "My Analytics", icon: Zap, path: "/user/statistics" },
    { name: "Security", icon: Lock, path: "/user/change-password" },
    { name: "Profile", icon: User, path: "/user/profile" },
  ];

  return (
    <div className="flex flex-col h-full bg-white/80 backdrop-blur-2xl">
      {/* Navigation */}
      <nav className="flex-1 px-6 space-y-3 mt-10">
        {menuItems.map((item) => {
          const isActive = activeMenu === item.name;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`relative flex items-center gap-4 px-6 py-5 rounded-[1.75rem] transition-all duration-500 group overflow-hidden ${
                isActive
                  ? "text-teal-600 bg-teal-50/50"
                  : "text-stone-400 hover:text-stone-900 hover:bg-stone-50/80"
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="sidemenu-active"
                  className="absolute left-0 w-1.5 h-8 bg-teal-500 rounded-r-full"
                />
              )}
              <item.icon
                className={`w-5 h-5 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6 ${
                  isActive ? "text-teal-600" : ""
                }`}
              />
              <span className={`text-[15px] font-bold tracking-tight ${isActive ? "font-black" : ""}`}>
                {item.name}
              </span>
            </Link>
          );
        })}
      </nav>

      {/* Footer Info Box */}
      <div className="px-6 mb-8">
         <div className="bg-stone-900 rounded-[2rem] p-6 text-white relative overflow-hidden group">
            <Sparkles size={100} className="absolute -bottom-10 -right-10 opacity-10 group-hover:scale-125 transition-transform duration-1000" />
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-teal-400 mb-2">ShiftSync Plus</p>
            <p className="text-xs font-medium text-stone-400 leading-relaxed mb-4">You are on the enterprise tier with full priority support.</p>
            <div className="flex items-center gap-2">
               <ShieldCheck size={12} className="text-emerald-400" />
               <span className="text-[9px] font-black uppercase tracking-widest text-emerald-400">Identity Verified</span>
            </div>
         </div>
      </div>

      {/* Logout */}
      <div className="p-8 border-t border-stone-50">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-4 px-6 py-4 rounded-[1.5rem] text-rose-500 hover:bg-rose-50 transition-all group group"
        >
          <div className="w-10 h-10 rounded-xl bg-rose-50 flex items-center justify-center group-hover:bg-rose-100 transition-colors shrink-0">
             <LogOut className="w-5 h-5" />
          </div>
          <span className="font-bold text-[15px]">Secure Sign Out</span>
        </button>
      </div>
    </div>
  );
};

export default SideMenu;
