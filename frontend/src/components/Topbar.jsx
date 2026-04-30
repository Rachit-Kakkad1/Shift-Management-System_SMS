import React, { useContext } from "react";
import { 
  Search, 
  Bell, 
  Settings, 
  HelpCircle, 
  Sparkles,
  Command,
  Plus
} from "lucide-react";
import { UserContext } from "../context/UserContext";
import { motion } from "framer-motion";
import { useNavigate } from "react-router";

const Topbar = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  return (
    <header className="h-24 px-10 flex items-center justify-between bg-white/70 backdrop-blur-2xl border-b border-stone-100/50 sticky top-0 z-40">
      {/* Search Bar */}
      <div className="flex-1 max-w-xl relative group">
        <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
          <Search className="w-4 h-4 text-stone-400 group-focus-within:text-teal-500 transition-colors" />
        </div>
        <input
          type="text"
          placeholder="Quick search..."
          className="w-full bg-stone-50/50 border border-stone-100/50 text-stone-900 text-sm rounded-2xl py-3 pl-12 pr-4 focus:outline-none focus:bg-white focus:ring-4 focus:ring-teal-500/5 focus:border-teal-500/30 transition-all placeholder:text-stone-400 placeholder:font-medium"
        />
        <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
          <div className="flex items-center gap-1 px-1.5 py-1 rounded-lg bg-stone-100 border border-stone-200">
             <Command size={10} className="text-stone-400" />
             <span className="text-[10px] font-black text-stone-400">K</span>
          </div>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-6">
        {/* Quick Action */}
        <button className="hidden md:flex items-center gap-2 px-6 py-2.5 bg-stone-900 text-white rounded-xl hover:bg-stone-800 transition-all shadow-lg shadow-stone-900/10 group">
           <Plus size={16} className="group-hover:rotate-90 transition-transform duration-500" />
           <span className="text-xs font-black uppercase tracking-widest">New Entry</span>
        </button>

        {/* Notifications */}
        <div className="flex items-center gap-3">
           <button className="relative w-12 h-12 rounded-2xl bg-white border border-stone-100 flex items-center justify-center text-stone-500 hover:text-stone-900 hover:shadow-xl hover:shadow-stone-200/50 transition-all group">
             <Bell className="w-5 h-5 group-hover:rotate-12 transition-transform" />
             <span className="absolute top-3 right-3 w-2.5 h-2.5 bg-teal-500 border-2 border-white rounded-full"></span>
           </button>
           
           <button className="w-12 h-12 rounded-2xl bg-white border border-stone-100 flex items-center justify-center text-stone-500 hover:text-stone-900 hover:shadow-xl hover:shadow-stone-200/50 transition-all">
             <HelpCircle className="w-5 h-5" />
           </button>
        </div>

        {/* Vertical Divider */}
        <div className="w-px h-8 bg-stone-100 mx-2"></div>

        {/* User Profile */}
        <div 
          onClick={() => navigate(user?.role === 'admin' ? '/admin/profile' : '/user/profile')}
          className="flex items-center gap-4 group cursor-pointer pl-2 hover:opacity-80 transition-all"
        >
          <div className="flex flex-col items-end">
            <span className="text-sm font-black text-stone-900 leading-none">{user?.name || "Admin"}</span>
            <div className="flex items-center gap-1.5 mt-1.5">
               <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
               <span className="text-[10px] font-black uppercase tracking-[0.1em] text-teal-500">{user?.role || "System Admin"}</span>
            </div>
          </div>
          <div className="relative">
            <div className="absolute inset-0 bg-teal-500 rounded-2xl blur-lg opacity-0 group-hover:opacity-20 transition-opacity"></div>
            <div className="relative w-12 h-12 rounded-2xl border-2 border-white bg-teal-500 flex items-center justify-center text-white font-black text-lg shadow-sm group-hover:scale-105 transition-transform">
               {user?.name?.charAt(0) || "A"}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Topbar;
