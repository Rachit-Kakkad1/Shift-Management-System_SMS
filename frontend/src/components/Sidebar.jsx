import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import {
  LayoutDashboard,
  Users,
  CalendarDays,
  FileText,
  Settings,
  ChevronLeft,
  ChevronRight,
  LogOut,
  Sparkles,
  ShieldCheck,
  Zap,
  UserCog
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const menuItems = [
    { name: "Dashboard", path: "/admin/dashboard", icon: LayoutDashboard },
    { name: "Team Members", path: "/admin/users", icon: Users },
    { name: "Shift Planner", path: "/admin/create-shifts", icon: CalendarDays },
    { name: "Analytics", path: "/admin/statistics", icon: Zap },
    { name: "Security Logs", path: "/admin/logs", icon: ShieldCheck },
    { name: "My Profile", path: "/admin/profile", icon: UserCog },
  ];

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <motion.aside
      initial={false}
      animate={{ width: isCollapsed ? 100 : 320 }}
      className="relative flex flex-col h-screen bg-white border-r border-stone-100 z-50 shadow-[4px_0_24px_rgba(0,0,0,0.02)]"
    >
      {/* Brand Section */}
      <div className="flex items-center gap-4 px-8 py-10">
        <div className="flex items-center justify-center w-12 h-12 rounded-[1.25rem] bg-gradient-to-br from-teal-400 to-teal-600 shadow-xl shadow-teal-200 shrink-0">
          <CalendarDays className="text-white w-6 h-6" />
        </div>
        {!isCollapsed && (
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex flex-col"
          >
            <span className="text-xl font-black tracking-tight text-stone-900 leading-none">
              Shift<span className="text-teal-500">Sync</span>
            </span>
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-stone-300 mt-1.5">
              Enterprise v4.0
            </span>
          </motion.div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 space-y-2 mt-4">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`relative flex items-center gap-4 px-5 py-4 rounded-[1.5rem] transition-all duration-500 group overflow-hidden ${
                isActive
                  ? "text-teal-600 bg-teal-50/50"
                  : "text-stone-400 hover:text-stone-900 hover:bg-stone-50/80"
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="sidebar-active"
                  className="absolute left-0 w-1.5 h-6 bg-teal-500 rounded-r-full"
                />
              )}
              <item.icon
                className={`w-5 h-5 transition-transform duration-500 group-hover:scale-110 ${
                  isActive ? "text-teal-600" : ""
                }`}
              />
              {!isCollapsed && (
                <span className={`text-[15px] font-bold tracking-tight ${isActive ? "font-black" : ""}`}>
                  {item.name}
                </span>
              )}
              
              {/* Tooltip for collapsed mode */}
              {isCollapsed && (
                <div className="absolute left-full ml-4 px-3 py-2 bg-stone-900 text-white text-xs font-bold rounded-xl opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 transition-all pointer-events-none whitespace-nowrap">
                  {item.name}
                </div>
              )}
            </Link>
          );
        })}
      </nav>

      {/* User Section / Bottom Action */}
      <div className="p-6 border-t border-stone-50">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-4 px-5 py-4 rounded-[1.5rem] text-rose-500 hover:bg-rose-50 transition-all group"
        >
          <div className="w-10 h-10 rounded-xl bg-rose-50 flex items-center justify-center group-hover:bg-rose-100 transition-colors shrink-0">
             <LogOut className="w-5 h-5" />
          </div>
          {!isCollapsed && <span className="font-bold text-[15px]">Sign Out</span>}
        </button>
      </div>

      {/* Collapse Toggle */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute -right-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white border border-stone-100 shadow-lg flex items-center justify-center text-stone-400 hover:text-stone-900 transition-all z-50"
      >
        {isCollapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
      </button>
    </motion.aside>
  );
};

export default Sidebar;
