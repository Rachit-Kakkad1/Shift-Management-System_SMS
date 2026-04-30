import React from 'react';
import { Outlet, useLocation } from 'react-router';
import { AnimatePresence, motion } from 'framer-motion';
import Sidebar from './Sidebar';
import Topbar from './Topbar';

const AdminLayout = () => {
  const location = useLocation();

  return (
    <div className="flex h-screen w-full bg-transparent text-stone-900 overflow-hidden font-sans selection:bg-orange-100 selection:text-orange-900">
      {/* Mesh Background */}
      <div className="mesh-bg" />
      
      <Sidebar />
      
      <div className="flex-1 flex flex-col min-w-0 h-full relative">
        <Topbar />
        
        <main className="flex-1 overflow-y-auto p-8 lg:p-12 scroll-smooth">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -30, filter: 'blur(10px)' }}
              transition={{ 
                duration: 0.6, 
                ease: [0.22, 1, 0.36, 1] 
              }}
              className="h-full max-w-screen-2xl mx-auto"
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </main>

        {/* Decorative elements */}
        <div className="fixed bottom-0 right-0 p-8 pointer-events-none opacity-20 hidden 2xl:block">
           <span className="text-[200px] font-black text-stone-900/5 select-none -mb-20 -mr-20">SYNC</span>
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
