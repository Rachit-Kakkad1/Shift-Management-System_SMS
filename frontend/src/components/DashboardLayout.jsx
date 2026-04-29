import { useContext, useState } from "react";
import SideMenu from "./SideMenu";
import Navbar from "./Navbar";
import { UserContext } from "../context/UserContext";
import { motion, AnimatePresence } from "framer-motion";
import { PanelLeftClose, PanelLeftOpen } from "lucide-react";

const DashboardLayout = ({ children, activeMenu }) => {
  const { user } = useContext(UserContext);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="min-h-screen bg-transparent font-sans flex flex-col selection:bg-teal-100 selection:text-teal-900 overflow-hidden">
      {/* Mesh Background */}
      <div className="mesh-bg" />

      <Navbar activeMenu={activeMenu} />
      
      {user && (
        <div className="flex flex-1 overflow-hidden relative">
          {/* Sidebar wrapper */}
          <AnimatePresence mode="wait">
            {isSidebarOpen && (
              <motion.div
                initial={{ width: 0, opacity: 0, x: -20 }}
                animate={{ width: 320, opacity: 1, x: 0 }}
                exit={{ width: 0, opacity: 0, x: -20 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="hidden lg:block shrink-0 border-r border-stone-100 bg-white/80 backdrop-blur-2xl shadow-[4px_0_24px_rgba(0,0,0,0.02)] z-20"
              >
                <SideMenu activeMenu={activeMenu} />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Main Content */}
          <main className="flex-1 overflow-y-auto relative scroll-smooth">
            {/* Sidebar Toggle Button (Floating) */}
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="fixed bottom-10 left-10 z-50 w-14 h-14 rounded-[1.25rem] bg-stone-900 text-white shadow-2xl shadow-stone-900/20 flex items-center justify-center hover:bg-teal-500 hover:scale-110 active:scale-95 transition-all duration-500 group"
              title={isSidebarOpen ? "Collapse Sidebar" : "Expand Sidebar"}
            >
              {isSidebarOpen ? <PanelLeftClose size={24} className="group-hover:-translate-x-0.5 transition-transform" /> : <PanelLeftOpen size={24} className="group-hover:translate-x-0.5 transition-transform" />}
            </button>

            <div className="p-8 md:p-12 max-w-screen-2xl mx-auto min-h-full">
               <AnimatePresence mode="wait">
                 <motion.div
                   key={activeMenu}
                   initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
                   animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                   exit={{ opacity: 0, y: -20, filter: 'blur(10px)' }}
                   transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                 >
                   {children}
                 </motion.div>
               </AnimatePresence>
            </div>
          </main>
        </div>
      )}
    </div>
  );
};

export default DashboardLayout;
