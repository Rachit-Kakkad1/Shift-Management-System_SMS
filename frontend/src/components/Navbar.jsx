import React, { useContext } from "react";
import { 
  Bell, 
  Search, 
  Menu, 
  Calendar, 
  ChevronDown,
  Sparkles,
  Zap,
  HelpCircle
} from "lucide-react";
import { UserContext } from "../context/UserContext";
import { motion } from "framer-motion";
import { useNavigate } from "react-router";

const Navbar = ({ activeMenu }) => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  return (
    <header className="h-24 px-10 flex items-center justify-between bg-white/70 backdrop-blur-2xl border-b border-stone-100/50 sticky top-0 z-40">
      {/* Brand / Logo */}
      <div className="flex items-center gap-4">
        <div className="flex items-center justify-center w-12 h-12 rounded-[1.25rem] bg-gradient-to-br from-teal-400 to-teal-600 shadow-xl shadow-teal-200">
          <Calendar className="text-white w-6 h-6" />
        </div>
        <div className="flex flex-col">
          <span className="text-xl font-black tracking-tight text-stone-900 leading-none">
            Shift<span className="text-teal-500">Sync</span>
          </span>
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-stone-300 mt-1.5">
            Personal Portal
          </span>
        </div>
      </div>

      {/* Center Nav (Desktop) */}
      <div className="hidden lg:flex items-center gap-10">
        <div className="flex items-center gap-3 px-6 py-2.5 bg-stone-50 rounded-full border border-stone-100 text-stone-400 text-xs font-bold uppercase tracking-widest cursor-default">
           <Zap size={14} className="text-teal-500" />
           {activeMenu || "Overview"}
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-6">
        {/* Search */}
        <div className="hidden md:flex items-center gap-3 px-4 py-2 bg-stone-50 border border-stone-100 rounded-xl text-stone-400 hover:text-stone-900 hover:bg-white transition-all cursor-pointer">
           <Search size={16} />
           <span className="text-xs font-bold uppercase tracking-tight">Quick Find</span>
        </div>

        {/* Notifications */}
        <div className="flex items-center gap-3">
           <button className="relative w-12 h-12 rounded-2xl bg-white border border-stone-100 flex items-center justify-center text-stone-500 hover:text-stone-900 hover:shadow-xl hover:shadow-stone-200/50 transition-all group">
             <Bell className="w-5 h-5 group-hover:rotate-12 transition-transform" />
             <span className="absolute top-3 right-3 w-2.5 h-2.5 bg-teal-500 border-2 border-white rounded-full"></span>
           </button>
        </div>

        {/* User Profile */}
        <div 
          onClick={() => navigate(user?.role === 'admin' ? '/admin/profile' : '/user/profile')}
          className="flex items-center gap-4 group cursor-pointer pl-4 border-l border-stone-100 hover:opacity-80 transition-all"
        >
          <div className="flex flex-col items-end">
            <span className="text-sm font-black text-stone-900 leading-none">{user?.name || "Member"}</span>
            <span className="text-[10px] font-black uppercase tracking-[0.1em] text-teal-500 mt-1.5">Team {user?.team || "Sync"}</span>
          </div>
          <div className="relative">
            <div className="absolute inset-0 bg-teal-500 rounded-2xl blur-lg opacity-0 group-hover:opacity-20 transition-opacity"></div>
            <div className="relative w-12 h-12 rounded-2xl border-2 border-white bg-teal-500 flex items-center justify-center text-white font-black text-lg shadow-sm group-hover:scale-105 transition-transform">
               {user?.name?.charAt(0) || "M"}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
