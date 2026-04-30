import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router";
import { motion, useInView, useMotionValue, useTransform, animate, AnimatePresence } from "framer-motion";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowRight, Users, BarChart3, Globe, Shield, 
  Calendar, LayoutDashboard, Search, Bell, Settings, Plus,
  Clock, CheckCircle2, AlertCircle, ChevronDown, Check,
  MoreHorizontal, Menu, X
} from "lucide-react";
import Footer from "../components/Footer";

gsap.registerPlugin(ScrollTrigger);

// Utility for framer motion easing
const customEase = [0.22, 1, 0.36, 1];

// 0. Navbar
const Navbar = ({ navigate }) => {
  const [scrolled, setScrolled] = React.useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <nav className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${scrolled ? "bg-white/80 backdrop-blur-md border-b border-stone-200/60 shadow-sm py-3" : "bg-transparent py-5"}`}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-teal-400 to-cyan-500 flex items-center justify-center shadow-md">
              <Calendar className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-stone-900 tracking-tight">ShiftSync</span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#" className="text-sm font-medium text-stone-600 hover:text-stone-900 transition-colors">Features</a>
            <a href="#" className="text-sm font-medium text-stone-600 hover:text-stone-900 transition-colors">Solutions</a>
            <a href="#" className="text-sm font-medium text-stone-600 hover:text-stone-900 transition-colors">Resources</a>
            <a href="#" className="text-sm font-medium text-stone-600 hover:text-stone-900 transition-colors">Pricing</a>
          </div>

          <div className="hidden md:flex items-center gap-4">
            <button onClick={() => navigate("/login")} className="text-sm font-semibold text-stone-600 hover:text-stone-900 transition-colors">Log in</button>
            <button onClick={() => navigate("/login")} className="text-sm font-semibold px-4 py-2 bg-stone-900 text-white rounded-full hover:bg-stone-800 transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5">Start for free</button>
          </div>

          {/* Mobile Menu Toggle */}
          <button className="md:hidden text-stone-600" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Nav Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-white/95 backdrop-blur-md pt-24 px-6 md:hidden flex flex-col gap-6">
          <div className="flex flex-col gap-4 text-center">
            <a href="#" className="text-xl font-semibold text-stone-800 py-2 border-b border-stone-100">Features</a>
            <a href="#" className="text-xl font-semibold text-stone-800 py-2 border-b border-stone-100">Solutions</a>
            <a href="#" className="text-xl font-semibold text-stone-800 py-2 border-b border-stone-100">Resources</a>
            <a href="#" className="text-xl font-semibold text-stone-800 py-2 border-b border-stone-100">Pricing</a>
          </div>
          <div className="flex flex-col gap-4 mt-4">
            <button onClick={() => navigate("/login")} className="w-full py-3 text-lg font-semibold text-stone-800 border border-stone-200 rounded-xl">Log in</button>
            <button onClick={() => navigate("/login")} className="w-full py-3 text-lg font-semibold bg-stone-900 text-white rounded-xl shadow-md">Start for free</button>
          </div>
        </div>
      )}
    </>
  );
};

// 1. Hero Section
const HeroSection = ({ navigate }) => {
  return (
    <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-[#faf8f5]">
      {/* Background Animated Gradient Shift */}
      <motion.div 
        className="absolute inset-0 z-0 opacity-50"
        animate={{
          background: [
            "radial-gradient(circle at 20% 30%, rgba(13, 148, 136, 0.08) 0%, transparent 50%)",
            "radial-gradient(circle at 80% 70%, rgba(6, 182, 212, 0.08) 0%, transparent 50%)",
            "radial-gradient(circle at 20% 30%, rgba(13, 148, 136, 0.08) 0%, transparent 50%)"
          ]
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
      />
      
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 w-full pt-20 pb-12">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-16">
          
          {/* Left: Text */}
          <div className="lg:w-1/2 flex flex-col items-start text-left">
            <motion.div
              initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 1, ease: customEase }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-teal-50 border border-teal-100 text-teal-800 text-sm font-medium mb-6 shadow-sm"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-500"></span>
              </span>
              ShiftSync 4.0 is now live
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 1, delay: 0.08, ease: customEase }}
              className="text-5xl md:text-7xl lg:text-[5rem] font-bold tracking-tight text-stone-900 leading-[1.05] mb-6"
            >
              Precision Shift <br className="hidden md:block"/>
              Management for <br className="hidden md:block"/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-cyan-500">Modern Teams.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 1, delay: 0.16, ease: customEase }}
              className="text-lg md:text-xl text-stone-500 mb-10 max-w-lg leading-relaxed font-light"
            >
              Plan smarter, collaborate faster, and optimize every shift with real-time clarity. Built for the modern workforce.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 1, delay: 0.24, ease: customEase }}
              className="flex items-center gap-4"
            >
              <button
                onClick={() => navigate("/login")}
                className="group relative inline-flex items-center justify-center px-8 py-4 font-semibold text-white transition-all duration-300 bg-teal-600 rounded-full hover:bg-teal-700 hover:shadow-xl hover:shadow-teal-500/20 hover:-translate-y-0.5"
              >
                <span>Start for free</span>
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </button>
              <button 
                className="px-8 py-4 font-semibold text-stone-700 bg-white border border-stone-200 rounded-full hover:bg-stone-50 transition-colors shadow-sm"
              >
                Book Demo
              </button>
            </motion.div>
          </div>

          {/* Right: Floating Dashboard UI (Highly Realistic) */}
          <motion.div 
            initial={{ opacity: 0, x: 50, filter: "blur(20px)" }}
            animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
            transition={{ duration: 1.2, delay: 0.2, ease: customEase }}
            className="lg:w-1/2 relative w-full perspective-1000"
          >
            <motion.div
              animate={{ y: [-8, 8, -8] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
              className="relative w-full aspect-[4/3] bg-white rounded-[2rem] border border-stone-200/60 shadow-[0_30px_60px_-15px_rgba(13,148,136,0.15)] overflow-hidden flex flex-col font-sans"
            >
              {/* Fake UI Header */}
              <div className="h-14 border-b border-stone-100 flex items-center justify-between px-4 bg-white/80 backdrop-blur-md z-10 shrink-0">
                <div className="flex items-center gap-4">
                  <div className="flex gap-1.5 ml-2">
                    <div className="w-3 h-3 rounded-full bg-stone-200 hover:bg-red-400 transition-colors cursor-pointer"></div>
                    <div className="w-3 h-3 rounded-full bg-stone-200 hover:bg-amber-400 transition-colors cursor-pointer"></div>
                    <div className="w-3 h-3 rounded-full bg-stone-200 hover:bg-green-400 transition-colors cursor-pointer"></div>
                  </div>
                  <div className="flex items-center gap-2 text-stone-800 font-semibold text-sm ml-2">
                    <Calendar className="w-4 h-4 text-teal-600" />
                    ShiftSync
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-stone-50 rounded-full border border-stone-100 text-stone-400 text-xs shadow-inner">
                    <Search className="w-3.5 h-3.5" />
                    Search shifts...
                  </div>
                  <div className="relative cursor-pointer">
                    <Bell className="w-4 h-4 text-stone-400 hover:text-stone-600" />
                    <div className="absolute top-0 right-0 w-1.5 h-1.5 bg-red-500 rounded-full border border-white"></div>
                  </div>
                  <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-teal-400 to-cyan-500 shadow-sm flex items-center justify-center text-[10px] font-bold text-white cursor-pointer">
                    JD
                  </div>
                </div>
              </div>
              
              {/* Fake UI Body */}
              <div className="flex-1 flex bg-stone-50/50 overflow-hidden">
                {/* Sidebar */}
                <div className="w-14 sm:w-44 bg-white border-r border-stone-100 flex flex-col py-4 shrink-0">
                  <div className="flex flex-col gap-2 px-2">
                    <div className="w-full flex items-center gap-3 px-3 py-2 bg-teal-50 text-teal-700 rounded-xl text-sm font-medium shadow-sm cursor-pointer">
                      <LayoutDashboard className="w-4 h-4 shrink-0" />
                      <span className="hidden sm:block">Overview</span>
                    </div>
                    <div className="w-full flex items-center gap-3 px-3 py-2 text-stone-500 hover:bg-stone-50 rounded-xl text-sm font-medium transition-colors cursor-pointer">
                      <Calendar className="w-4 h-4 shrink-0" />
                      <span className="hidden sm:block">Schedule</span>
                    </div>
                    <div className="w-full flex items-center gap-3 px-3 py-2 text-stone-500 hover:bg-stone-50 rounded-xl text-sm font-medium transition-colors cursor-pointer">
                      <Users className="w-4 h-4 shrink-0" />
                      <span className="hidden sm:block">Team</span>
                    </div>
                  </div>
                  <div className="mt-auto px-2">
                    <div className="w-full flex items-center gap-3 px-3 py-2 text-stone-400 hover:bg-stone-50 rounded-xl text-sm font-medium transition-colors cursor-pointer">
                      <Settings className="w-4 h-4 shrink-0" />
                      <span className="hidden sm:block">Settings</span>
                    </div>
                  </div>
                </div>

                {/* Main Content area */}
                <div className="flex-1 flex flex-col p-4 sm:p-6 overflow-hidden gap-4">
                  {/* Top Bar inside content */}
                  <div className="flex justify-between items-center shrink-0">
                    <div>
                      <h2 className="text-lg font-bold text-stone-800 tracking-tight">Team Schedule</h2>
                      <p className="text-xs text-stone-500 font-medium">Oct 24 - Oct 30, 2026</p>
                    </div>
                    <button className="flex items-center gap-1.5 px-3 py-1.5 bg-teal-600 text-white text-xs font-semibold rounded-lg hover:bg-teal-700 transition-colors shadow-md hover:shadow-lg transform hover:-translate-y-0.5">
                      <Plus className="w-3.5 h-3.5" />
                      Add Shift
                    </button>
                  </div>

                  {/* Stat Cards */}
                  <div className="flex gap-3 shrink-0">
                    <div className="flex-1 bg-white border border-stone-200/80 rounded-xl p-3 shadow-sm flex flex-col justify-center relative overflow-hidden group">
                      <div className="absolute top-0 right-0 p-2 opacity-5 group-hover:scale-110 transition-transform"><Clock className="w-10 h-10 text-teal-900"/></div>
                      <div className="text-xs font-medium text-stone-500 flex items-center gap-1.5 mb-1 relative z-10">
                        <Clock className="w-3.5 h-3.5" /> Total Hours
                      </div>
                      <div className="text-lg font-bold text-stone-800 relative z-10">342<span className="text-xs text-stone-400 font-normal ml-1">hrs</span></div>
                    </div>
                    <div className="flex-1 bg-white border border-stone-200/80 rounded-xl p-3 shadow-sm flex flex-col justify-center relative overflow-hidden group">
                      <div className="absolute top-0 right-0 p-2 opacity-5 group-hover:scale-110 transition-transform"><CheckCircle2 className="w-10 h-10 text-teal-500"/></div>
                      <div className="text-xs font-medium text-stone-500 flex items-center gap-1.5 mb-1 relative z-10">
                        <CheckCircle2 className="w-3.5 h-3.5 text-teal-500" /> Covered
                      </div>
                      <div className="text-lg font-bold text-stone-800 relative z-10">92<span className="text-xs text-stone-400 font-normal ml-1">%</span></div>
                    </div>
                    <div className="flex-1 bg-white border border-stone-200/80 rounded-xl p-3 shadow-sm flex flex-col justify-center relative overflow-hidden group">
                      <div className="absolute top-0 right-0 p-2 opacity-5 group-hover:scale-110 transition-transform"><AlertCircle className="w-10 h-10 text-amber-500"/></div>
                      <div className="text-xs font-medium text-stone-500 flex items-center gap-1.5 mb-1 relative z-10">
                        <AlertCircle className="w-3.5 h-3.5 text-amber-500" /> Open Shifts
                      </div>
                      <div className="text-lg font-bold text-stone-800 relative z-10">4</div>
                    </div>
                  </div>

                  {/* Calendar/Timeline View Mockup */}
                  <div className="flex-1 bg-white border border-stone-200/80 rounded-xl shadow-sm overflow-hidden flex flex-col">
                     {/* Timeline Header */}
                     <div className="flex border-b border-stone-100 bg-stone-50/50">
                        <div className="w-20 sm:w-28 shrink-0 border-r border-stone-100 p-2 text-[10px] font-semibold text-stone-500 uppercase tracking-wider flex items-center">
                          Staff
                        </div>
                        <div className="flex-1 flex items-center justify-around p-2 text-[10px] font-medium text-stone-500">
                          <span>9 AM</span>
                          <span>12 PM</span>
                          <span>3 PM</span>
                          <span>6 PM</span>
                        </div>
                     </div>
                     {/* Timeline Rows */}
                     <div className="flex-1 flex flex-col divide-y divide-stone-50/80">
                        {/* Row 1 */}
                        <div className="flex flex-1 items-center hover:bg-stone-50/50 transition-colors group">
                          <div className="w-20 sm:w-28 shrink-0 border-r border-stone-100 px-3 flex items-center gap-2">
                             <div className="w-6 h-6 rounded-full bg-cyan-100 text-cyan-700 flex items-center justify-center text-[9px] font-bold shrink-0">AS</div>
                             <div className="text-xs font-medium text-stone-700 truncate hidden sm:block">A. Smith</div>
                          </div>
                          <div className="flex-1 relative h-full">
                            {/* Grid lines (subtle) */}
                            <div className="absolute inset-0 flex justify-around pointer-events-none opacity-20">
                              <div className="w-px h-full bg-stone-200"></div><div className="w-px h-full bg-stone-200"></div><div className="w-px h-full bg-stone-200"></div>
                            </div>
                            <div className="absolute top-1/2 -translate-y-1/2 left-[10%] right-[40%] h-8 bg-teal-50 border border-teal-200/80 rounded-lg flex items-center px-2 shadow-sm cursor-pointer hover:border-teal-400 hover:shadow-md transition-all group-hover:scale-[1.01]">
                               <div className="w-1.5 h-1.5 rounded-full bg-teal-500 mr-2 shadow-[0_0_5px_rgba(13,148,136,0.5)]"></div>
                               <span className="text-[10px] font-medium text-teal-800 truncate">Morning Shift</span>
                            </div>
                          </div>
                        </div>
                        {/* Row 2 */}
                        <div className="flex flex-1 items-center hover:bg-stone-50/50 transition-colors group">
                          <div className="w-20 sm:w-28 shrink-0 border-r border-stone-100 px-3 flex items-center gap-2">
                             <div className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center text-[9px] font-bold shrink-0">BJ</div>
                             <div className="text-xs font-medium text-stone-700 truncate hidden sm:block">B. Jones</div>
                          </div>
                          <div className="flex-1 relative h-full">
                            <div className="absolute inset-0 flex justify-around pointer-events-none opacity-20">
                              <div className="w-px h-full bg-stone-200"></div><div className="w-px h-full bg-stone-200"></div><div className="w-px h-full bg-stone-200"></div>
                            </div>
                            <div className="absolute top-1/2 -translate-y-1/2 left-[40%] right-[10%] h-8 bg-stone-50 border border-stone-200/80 rounded-lg flex items-center px-2 shadow-sm cursor-pointer hover:border-stone-400 hover:shadow-md transition-all group-hover:scale-[1.01]">
                               <div className="w-1.5 h-1.5 rounded-full bg-stone-500 mr-2 shadow-[0_0_5px_rgba(120,113,108,0.5)]"></div>
                               <span className="text-[10px] font-medium text-stone-700 truncate">Closing Shift</span>
                            </div>
                          </div>
                        </div>
                        {/* Row 3 */}
                        <div className="flex flex-1 items-center hover:bg-stone-50/50 transition-colors group">
                          <div className="w-20 sm:w-28 shrink-0 border-r border-stone-100 px-3 flex items-center gap-2">
                             <div className="w-6 h-6 rounded-full bg-rose-100 text-rose-700 flex items-center justify-center text-[9px] font-bold shrink-0">CW</div>
                             <div className="text-xs font-medium text-stone-700 truncate hidden sm:block">C. Williams</div>
                          </div>
                          <div className="flex-1 relative h-full">
                            <div className="absolute inset-0 flex justify-around pointer-events-none opacity-20">
                              <div className="w-px h-full bg-stone-200"></div><div className="w-px h-full bg-stone-200"></div><div className="w-px h-full bg-stone-200"></div>
                            </div>
                            {/* Open shift indicator */}
                            <div className="absolute top-1/2 -translate-y-1/2 left-[25%] right-[55%] h-8 bg-white border border-dashed border-red-300 rounded-lg flex items-center justify-center shadow-sm cursor-pointer hover:bg-red-50/50 hover:border-red-400 hover:shadow-md transition-all group-hover:scale-[1.01]">
                               <span className="text-[10px] font-medium text-red-500 flex items-center gap-1.5"><AlertCircle className="w-3 h-3"/> Open</span>
                            </div>
                          </div>
                        </div>
                     </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

// 2. Trusted Companies
const MarqueeSection = () => {
  const logos = ["Acme Corp", "GlobalTech", "ShiftWorks", "Nexus", "Quantum", "Apex"];
  
  return (
    <section className="py-12 bg-white border-y border-stone-100 overflow-hidden flex items-center">
      <div className="w-full inline-flex flex-nowrap overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-128px),transparent_100%)]">
        <ul className="flex items-center justify-center md:justify-start [&_li]:mx-8 [&_img]:max-w-none animate-infinite-scroll hover:play-state-paused">
          {[...logos, ...logos, ...logos].map((logo, i) => (
            <li key={i} className="text-2xl font-bold text-stone-300 font-serif italic mx-8 whitespace-nowrap cursor-default hover:text-stone-400 transition-colors">
              {logo}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

// 3. Services / Features
const FeaturesSection = () => {
  const features = [
    { icon: Calendar, title: "Shift Scheduling", desc: "Drag-and-drop simplicity meets powerful automation." },
    { icon: Users, title: "Team Management", desc: "Keep everyone synced with real-time updates and profiles." },
    { icon: BarChart3, title: "Analytics", desc: "Understand your labor costs and coverage at a glance." },
    { icon: Globe, title: "Timezone Handling", desc: "Flawless scheduling across distributed global teams." },
    { icon: Shield, title: "Secure Auth", desc: "Enterprise-grade security and role-based access." },
    { icon: LayoutDashboard, title: "Smart Visualization", desc: "Beautiful, clear timelines for immediate comprehension." }
  ];

  const handleMouseEnter = (e) => {
    animate({
      targets: e.currentTarget.querySelector('.feature-icon'),
      translateY: [-5, 0],
      scale: [1.1, 1],
      duration: 600,
      easing: 'easeOutElastic(1, .5)'
    });
  };

  return (
    <section className="py-32 bg-[#faf8f5] relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-20">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-stone-900 mb-6">
            Everything you need. <br/> Nothing you don't.
          </h2>
          <p className="text-lg text-stone-500 font-light">
            A meticulously crafted toolkit to eliminate scheduling chaos.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: i * 0.1, ease: customEase }}
              onMouseEnter={handleMouseEnter}
              className="group p-8 bg-white rounded-3xl border border-stone-200/60 shadow-sm hover:shadow-xl hover:shadow-teal-900/5 transition-all duration-500 cursor-default"
            >
              <div className="w-12 h-12 rounded-2xl bg-teal-50 flex items-center justify-center mb-6 feature-icon border border-teal-100">
                <f.icon className="w-6 h-6 text-teal-600" />
              </div>
              <h3 className="text-xl font-semibold text-stone-900 mb-3">{f.title}</h3>
              <p className="text-stone-500 leading-relaxed text-sm">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// 4. Interactive Showcase (Horizontal Scroll)
const ShowcaseSection = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      const sections = gsap.utils.toArray(".showcase-panel");
      
      gsap.to(sections, {
        xPercent: -100 * (sections.length - 1),
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          pin: true,
          scrub: 1,
          snap: 1 / (sections.length - 1),
          end: () => "+=" + containerRef.current.offsetWidth * 2
        }
      });
    }, containerRef);
    
    return () => ctx.revert();
  }, []);

  const panels = [
    { 
      title: "Intelligent Dashboard", 
      desc: "Get a bird's-eye view of your entire operation in real-time.", 
      color: "bg-teal-50",
      mockup: (
        <div className="absolute inset-4 sm:inset-8 bg-white/80 backdrop-blur-xl rounded-[2rem] border border-white shadow-xl flex flex-col overflow-hidden font-sans">
          <div className="h-12 border-b border-stone-100 flex items-center px-4 justify-between bg-white shrink-0">
            <div className="w-24 h-4 bg-stone-100 rounded-md"></div>
            <div className="w-8 h-8 rounded-full bg-teal-100"></div>
          </div>
          <div className="flex-1 flex p-4 sm:p-6 gap-4 overflow-hidden">
            <div className="w-1/3 hidden sm:flex flex-col gap-3">
              <div className="h-24 bg-stone-50 rounded-xl border border-stone-100 p-4 flex flex-col justify-center">
                <div className="text-[10px] text-stone-400 font-medium mb-1">Labor Cost</div>
                <div className="text-xl font-bold text-stone-800">$4,250</div>
              </div>
              <div className="flex-1 bg-stone-50 rounded-xl border border-stone-100 p-4 flex flex-col gap-2">
                <div className="h-4 w-16 bg-stone-200 rounded-md mb-2"></div>
                <div className="flex-1 rounded-lg bg-gradient-to-t from-teal-100 to-transparent border-b-2 border-teal-400"></div>
              </div>
            </div>
            <div className="flex-1 flex flex-col gap-3">
               <div className="flex gap-2 h-10">
                 <div className="flex-1 bg-stone-50 rounded-lg border border-stone-100"></div>
                 <div className="w-10 bg-stone-900 rounded-lg shadow-sm"></div>
               </div>
               <div className="flex-1 bg-stone-50 rounded-xl border border-stone-100 p-4 flex flex-col gap-3">
                 {[1,2,3,4].map(i => (
                   <div key={i} className="flex-1 bg-white rounded-lg border border-stone-100 shadow-sm flex items-center px-3 gap-3">
                     <div className="w-6 h-6 rounded-full bg-teal-100 shrink-0"></div>
                     <div className="flex-1">
                       <div className="h-2 w-1/2 bg-stone-200 rounded-full mb-1.5"></div>
                       <div className="h-1.5 w-1/3 bg-stone-100 rounded-full"></div>
                     </div>
                     <div className="w-12 h-4 bg-cyan-50 rounded-full border border-cyan-100 shrink-0"></div>
                   </div>
                 ))}
               </div>
            </div>
          </div>
        </div>
      )
    },
    { 
      title: "Lightning Fast Creation", 
      desc: "Create and assign shifts in seconds, not hours.", 
      color: "bg-stone-100",
      mockup: (
        <div className="absolute inset-0 flex items-center justify-center">
          {/* Background overlay */}
          <div className="absolute inset-0 bg-stone-900/10 backdrop-blur-sm"></div>
          {/* Modal */}
          <div className="relative w-full max-w-sm bg-white rounded-3xl shadow-2xl border border-stone-200 overflow-hidden flex flex-col z-10 m-4">
            <div className="p-5 border-b border-stone-100 flex justify-between items-center">
              <div className="font-bold text-stone-800">Create New Shift</div>
              <div className="w-6 h-6 rounded-full bg-stone-100 flex items-center justify-center text-stone-400 text-xs font-bold">✕</div>
            </div>
            <div className="p-5 flex flex-col gap-4">
              <div>
                <div className="text-[10px] font-semibold text-stone-500 uppercase tracking-wider mb-1.5">Employee</div>
                <div className="h-10 w-full border border-stone-200 rounded-lg flex items-center px-3 justify-between bg-stone-50">
                   <div className="flex items-center gap-2">
                     <div className="w-5 h-5 rounded-full bg-teal-200"></div>
                     <div className="text-xs font-medium text-stone-700">Select team member...</div>
                   </div>
                   <ChevronDown className="w-4 h-4 text-stone-400" />
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex-1">
                  <div className="text-[10px] font-semibold text-stone-500 uppercase tracking-wider mb-1.5">Start Time</div>
                  <div className="h-10 w-full border border-stone-200 rounded-lg flex items-center px-3 bg-stone-50 text-xs font-medium text-stone-700">09:00 AM</div>
                </div>
                <div className="flex-1">
                  <div className="text-[10px] font-semibold text-stone-500 uppercase tracking-wider mb-1.5">End Time</div>
                  <div className="h-10 w-full border border-stone-200 rounded-lg flex items-center px-3 bg-stone-50 text-xs font-medium text-stone-700">05:00 PM</div>
                </div>
              </div>
              <div>
                <div className="text-[10px] font-semibold text-stone-500 uppercase tracking-wider mb-1.5">Role</div>
                <div className="flex gap-2">
                  <div className="px-3 py-1.5 rounded-full bg-stone-900 text-white text-[10px] font-semibold">Manager</div>
                  <div className="px-3 py-1.5 rounded-full bg-stone-100 text-stone-500 text-[10px] font-medium border border-stone-200">Cashier</div>
                  <div className="px-3 py-1.5 rounded-full bg-stone-100 text-stone-500 text-[10px] font-medium border border-stone-200">Stock</div>
                </div>
              </div>
            </div>
            <div className="p-4 border-t border-stone-100 bg-stone-50 flex justify-end gap-2">
               <div className="px-4 py-2 rounded-lg text-xs font-semibold text-stone-500 cursor-pointer">Cancel</div>
               <div className="px-4 py-2 rounded-lg text-xs font-semibold bg-stone-900 text-white shadow-md cursor-pointer flex items-center gap-1.5"><Check className="w-3.5 h-3.5"/> Publish Shift</div>
            </div>
          </div>
        </div>
      )
    },
    { 
      title: "Actionable Insights", 
      desc: "Transform complex data into simple, beautiful charts.", 
      color: "bg-cyan-50",
      mockup: (
         <div className="absolute inset-4 sm:inset-8 bg-white rounded-[2rem] border border-stone-200 shadow-xl flex flex-col p-6 gap-6">
            <div className="flex justify-between items-center">
              <div className="text-lg font-bold text-stone-800">Weekly Analytics</div>
              <MoreHorizontal className="text-stone-400 w-5 h-5"/>
            </div>
            <div className="flex gap-4 h-32">
              <div className="w-1/3 bg-stone-50 rounded-xl border border-stone-100 p-4 flex flex-col justify-between">
                <div className="text-xs font-medium text-stone-500">Efficiency Score</div>
                <div className="text-3xl font-black text-teal-600">94<span className="text-sm text-stone-400">%</span></div>
              </div>
              <div className="flex-1 bg-stone-50 rounded-xl border border-stone-100 p-4 flex items-end gap-2 justify-between">
                 {/* Bar Chart Mockup */}
                 {[40, 70, 45, 90, 65, 80, 50].map((h, i) => (
                   <div key={i} className="w-full bg-teal-100 rounded-t-md relative group cursor-pointer" style={{ height: `${h}%` }}>
                      <div className="absolute bottom-0 left-0 right-0 bg-teal-500 rounded-t-md transition-all group-hover:bg-teal-600" style={{ height: `${h * 0.8}%` }}></div>
                   </div>
                 ))}
              </div>
            </div>
            <div className="flex-1 bg-stone-50 rounded-xl border border-stone-100 p-4 flex items-center gap-6">
               {/* Donut chart mockup */}
               <div className="w-24 h-24 rounded-full border-8 border-stone-200 relative shrink-0">
                  <div className="absolute inset-0 rounded-full border-8 border-teal-500 border-r-transparent border-b-transparent transform rotate-45"></div>
                  <div className="absolute inset-0 flex items-center justify-center text-sm font-bold text-stone-700">72%</div>
               </div>
               <div className="flex-1 flex flex-col gap-2">
                  <div className="flex justify-between items-center text-xs font-medium">
                    <span className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-teal-500"></div> Productive Hours</span>
                    <span className="text-stone-700 font-bold">240h</span>
                  </div>
                  <div className="flex justify-between items-center text-xs font-medium">
                    <span className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-stone-300"></div> Idle/Break</span>
                    <span className="text-stone-700 font-bold">92h</span>
                  </div>
               </div>
            </div>
         </div>
      )
    },
  ];

  return (
    <section ref={containerRef} className="h-screen bg-white overflow-hidden flex items-center border-y border-stone-200/60">
      <div className="flex h-full w-[300vw]">
        {panels.map((panel, i) => (
          <div key={i} className="showcase-panel w-screen h-full flex items-center justify-center p-8 md:p-24 relative">
             <div className="w-full max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-16">
                
                {/* Left Text */}
                <div className="md:w-1/3 text-left">
                  <div className="text-sm font-semibold text-teal-600 tracking-widest uppercase mb-4">Phase 0{i+1}</div>
                  <h2 className="text-4xl md:text-5xl font-bold text-stone-900 mb-6 leading-tight">{panel.title}</h2>
                  <p className="text-xl text-stone-500 font-light leading-relaxed">{panel.desc}</p>
                </div>

                {/* Right Mockup */}
                <div className={`md:w-2/3 w-full aspect-[4/3] sm:aspect-video rounded-[2.5rem] ${panel.color} shadow-inner overflow-hidden relative`}>
                   {panel.mockup}
                </div>

             </div>
          </div>
        ))}
      </div>
    </section>
  );
};

// 5. Stats Section
const StatItem = ({ stat, index }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  
  useEffect(() => {
    if (isInView && ref.current) {
      const isDecimal = stat.value % 1 !== 0;
      animate(0, stat.value, {
        duration: 2.5,
        ease: "easeOut",
        onUpdate: (latest) => {
          if (ref.current) {
            ref.current.innerHTML = isDecimal ? latest.toFixed(1) : Math.round(latest);
          }
        }
      });
    }
  }, [isInView, stat.value]);

  return (
    <div className="text-center pt-8 md:pt-0">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: index * 0.1 }}
        className="flex items-baseline justify-center gap-1 mb-2"
      >
        <span 
          ref={ref}
          className="text-6xl md:text-7xl font-bold text-stone-900 tracking-tighter"
        >
          0
        </span>
        <span className="text-4xl font-bold text-teal-500">{stat.suffix}</span>
      </motion.div>
      <div className="text-stone-500 font-medium">{stat.label}</div>
    </div>
  );
};

const StatsSection = () => {
  const stats = [
    { value: 10, suffix: "x", label: "Faster Scheduling" },
    { value: 500, suffix: "+", label: "Teams Worldwide" },
    { value: 99.9, suffix: "%", label: "Platform Reliability" }
  ];

  return (
    <section className="py-32 bg-[#faf8f5]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 divide-y md:divide-y-0 md:divide-x divide-stone-200">
          {stats.map((stat, i) => (
             <StatItem key={i} stat={stat} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

// 6. Use Cases
const UseCasesSection = () => {
  const cases = [
    { role: "For Admins", desc: "Total control over operations. Set rules, approve requests, and monitor budgets effortlessly.", color: "from-teal-50 to-teal-100/50", shadow: "hover:shadow-teal-500/10" },
    { role: "For Employees", desc: "A beautiful app to see shifts, swap with peers, and manage availability in seconds.", color: "from-stone-50 to-stone-100/50", shadow: "hover:shadow-stone-500/10" },
    { role: "For HR", desc: "Automated compliance, seamless payroll exports, and detailed reporting.", color: "from-cyan-50 to-cyan-100/50", shadow: "hover:shadow-cyan-500/10" }
  ];

  return (
    <section className="py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold text-stone-900 mb-6">Built for everyone.</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 perspective-1000">
          {cases.map((c, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.1, ease: customEase }}
              whileHover={{ rotateX: 2, rotateY: -2, z: 10 }}
              style={{ transformStyle: "preserve-3d" }}
              className={`p-10 rounded-3xl bg-gradient-to-br ${c.color} border border-stone-100 flex flex-col justify-between h-80 transition-all duration-300 shadow-sm ${c.shadow} hover:-translate-y-2`}
            >
              <h3 className="text-2xl font-bold text-stone-900" style={{ transform: "translateZ(20px)" }}>{c.role}</h3>
              <p className="text-stone-600 leading-relaxed" style={{ transform: "translateZ(10px)" }}>{c.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// 7. Testimonials
const TestimonialsSection = () => {
  return (
    <section className="py-32 bg-[#faf8f5] relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-teal-100/40 rounded-full blur-3xl pointer-events-none" />
      
      <div className="max-w-4xl mx-auto px-6 lg:px-8 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: customEase }}
          className="bg-white/80 backdrop-blur-xl border border-white shadow-xl rounded-3xl p-12 md:p-16"
        >
          <div className="flex justify-center mb-8 gap-1">
             {[1,2,3,4,5].map(i => <div key={i} className="text-teal-400 text-2xl">★</div>)}
          </div>
          <p className="text-2xl md:text-3xl font-medium text-stone-900 leading-tight mb-8 font-serif italic">
            "ShiftSync completely transformed how we manage our 200+ retail staff. What used to take days now takes hours. It's simply brilliant."
          </p>
          <div className="flex items-center justify-center gap-4 mt-8">
             <div className="w-12 h-12 rounded-full bg-gradient-to-br from-teal-200 to-cyan-300 shadow-inner flex items-center justify-center font-bold text-teal-900">SJ</div>
             <div className="text-left">
                <div className="font-bold text-stone-900 text-sm">Sarah Jenkins</div>
                <div className="text-xs text-stone-500 font-medium tracking-wide uppercase mt-0.5">Operations Director, Apex Retail</div>
             </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// 8. CTA Section
const CTASection = ({ navigate }) => {
  return (
    <section className="py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-stone-900" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,rgba(13,148,136,0.15),transparent_60%)]" />
      
      <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
        <h2 className="text-5xl md:text-6xl font-bold text-white mb-6 tracking-tight">
          Ready to sync your team?
        </h2>
        <p className="text-xl text-stone-400 mb-10 max-w-2xl mx-auto font-light">
          Join modern companies ditching spreadsheets for intelligent scheduling.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate("/login")}
            className="relative px-10 py-5 bg-white text-stone-900 font-bold rounded-full text-lg overflow-hidden group shadow-[0_0_40px_rgba(255,255,255,0.1)]"
          >
            <span className="relative z-10">Start for free</span>
            <div className="absolute inset-0 bg-teal-50 opacity-0 group-hover:opacity-100 transition-opacity" />
          </motion.button>
          <button className="px-10 py-5 text-white font-semibold rounded-full border border-stone-700 hover:bg-stone-800 transition-colors">
            Contact Sales
          </button>
        </div>
      </div>
    </section>
  );
};

const Root = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Initialize Lenis for smooth scrolling
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
    });

    function raf(time) {
      lenis.raf(time);
      ScrollTrigger.update();
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Add CSS for Marquee animation
    const style = document.createElement('style');
    style.textContent = `
      @keyframes infinite-scroll {
        from { transform: translateX(0); }
        to { transform: translateX(-50%); }
      }
      .animate-infinite-scroll {
        animation: infinite-scroll 20s linear infinite;
      }
      .animate-infinite-scroll:hover {
        animation-play-state: paused;
      }
      .play-state-paused {
        animation-play-state: paused !important;
      }
    `;
    document.head.appendChild(style);

    return () => {
      lenis.destroy();
      document.head.removeChild(style);
    };
  }, []);

  return (
    <div className="bg-white text-stone-900 font-sans selection:bg-teal-100 selection:text-teal-900">
      <Navbar navigate={navigate} />
      <HeroSection navigate={navigate} />
      <MarqueeSection />
      <FeaturesSection />
      <ShowcaseSection />
      <StatsSection />
      <UseCasesSection />
      <TestimonialsSection />
      <CTASection navigate={navigate} />
      <Footer />
    </div>
  );
};

export default Root;
