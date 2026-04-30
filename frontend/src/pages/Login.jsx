import React, { useContext, useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router";
import { UserContext } from "../context/UserContext";
import { validateEmail } from "../utils/helper";
import axiosInstance from "../utils/axiosInstance";
import { API_PATH } from "../utils/apiPath";
import toast from "react-hot-toast";
import { motion, AnimatePresence, useAnimation, animate } from "framer-motion";
import { 
  Mail, Lock, Eye, EyeOff, Shield, Calendar, Users, 
  LayoutDashboard, BarChart3, Clock, CheckCircle2, AlertCircle, ArrowRight,
  Bell, Search 
} from "lucide-react";

// Theme configuration per role
const themes = {
  admin: {
    id: "admin",
    label: "Admin",
    icon: Shield,
    colors: {
      primary: "stone",
      bgFrom: "from-stone-200/40",
      bgTo: "to-stone-100/40",
      gradientFrom: "from-stone-700",
      gradientTo: "to-stone-900",
      accent: "bg-stone-900",
      accentHover: "hover:bg-stone-800",
      text: "text-stone-800",
      borderFocus: "focus:border-teal-500",
      ringFocus: "focus:ring-teal-500/20",
      glow: "shadow-stone-500/25",
    },
    panelTitle: "System Control & Oversight",
    panelDesc: "Complete visibility and command over your entire organization's shift operations.",
    mockup: <AdminMockup />
  },
  employee: {
    id: "employee",
    label: "Employee",
    icon: Calendar,
    colors: {
      primary: "teal",
      bgFrom: "from-teal-100/40",
      bgTo: "to-cyan-50/40",
      gradientFrom: "from-teal-400",
      gradientTo: "to-cyan-500",
      accent: "bg-teal-500",
      accentHover: "hover:bg-teal-600",
      text: "text-teal-700",
      borderFocus: "focus:border-teal-500",
      ringFocus: "focus:ring-teal-500/20",
      glow: "shadow-teal-500/25",
    },
    panelTitle: "Manage Your Shifts Seamlessly",
    panelDesc: "View your schedule, request swaps, and manage your availability in seconds.",
    mockup: <EmployeeMockup />
  },
  hr: {
    id: "hr",
    label: "HR",
    icon: Users,
    colors: {
      primary: "cyan",
      bgFrom: "from-cyan-100/40",
      bgTo: "to-blue-50/40",
      gradientFrom: "from-cyan-400",
      gradientTo: "to-blue-500",
      accent: "bg-cyan-500",
      accentHover: "hover:bg-cyan-600",
      text: "text-cyan-700",
      borderFocus: "focus:border-cyan-500",
      ringFocus: "focus:ring-cyan-500/20",
      glow: "shadow-cyan-500/25",
    },
    panelTitle: "People & Workforce Management",
    panelDesc: "Automate compliance, streamline payroll, and keep your teams perfectly synced.",
    mockup: <HRMockup />
  }
};

// --- Panel Mockups ---

function AdminMockup() {
  return (
    <div className="w-full h-full p-6 flex flex-col gap-4 font-sans">
      {/* Header */}
      <div className="flex justify-between items-center bg-white/60 p-3 rounded-xl shadow-sm border border-stone-200/50">
         <div className="flex gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-red-400"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-amber-400"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-green-400"></div>
         </div>
         <div className="flex items-center gap-2">
           <div className="w-2 h-2 rounded-full bg-teal-500 animate-pulse"></div>
           <div className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">Live</div>
         </div>
      </div>
      {/* Charts */}
      <div className="flex gap-4 h-32">
         <div className="flex-1 bg-gradient-to-br from-stone-700 to-stone-900 rounded-xl p-4 text-white shadow-lg flex flex-col justify-between relative overflow-hidden group">
            <LayoutDashboard className="absolute right-[-10px] bottom-[-10px] w-20 h-20 text-white/10 group-hover:scale-110 transition-transform" />
            <div className="text-xs font-medium text-stone-300">System Uptime</div>
            <div className="text-3xl font-bold">99.9%</div>
         </div>
         <div className="w-1/3 bg-white/80 rounded-xl p-4 shadow-sm border border-stone-200/50 flex flex-col justify-between">
            <div className="text-xs font-medium text-stone-500">Active Nodes</div>
            <div className="text-2xl font-bold text-stone-800">1,204</div>
         </div>
      </div>
      {/* Main Content Area */}
      <div className="flex-1 bg-white/80 rounded-xl shadow-sm border border-stone-200/50 p-4 flex flex-col gap-3">
         <div className="h-4 w-32 bg-stone-100 rounded-md mb-2"></div>
         {[1,2,3].map(i => (
           <div key={i} className="flex-1 bg-stone-50/50 rounded-lg border border-stone-100/50 flex items-center px-4 gap-3">
              <div className="w-8 h-8 rounded-lg bg-stone-200 flex items-center justify-center">
                 <Shield className="w-4 h-4 text-stone-700" />
              </div>
              <div className="flex-1">
                 <div className="h-2 w-1/2 bg-stone-200 rounded-full mb-1.5"></div>
                 <div className="h-1.5 w-1/3 bg-stone-100 rounded-full"></div>
              </div>
              <div className="w-12 h-4 bg-teal-100 rounded-full border border-teal-200"></div>
           </div>
         ))}
      </div>
    </div>
  );
}

function EmployeeMockup() {
  return (
    <div className="w-full h-full p-6 flex flex-col gap-4 font-sans">
      {/* Profile Bar */}
      <div className="flex justify-between items-center bg-white/80 p-4 rounded-2xl shadow-sm border border-teal-100/50">
         <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-teal-400 to-cyan-400 p-0.5">
               <div className="w-full h-full bg-white rounded-full flex items-center justify-center text-xs font-bold text-teal-600">ME</div>
            </div>
            <div>
               <div className="text-sm font-bold text-stone-800">My Schedule</div>
               <div className="text-[10px] text-stone-500 font-medium">Oct 24 - Oct 30</div>
            </div>
         </div>
         <div className="w-8 h-8 rounded-full bg-teal-50 flex items-center justify-center relative">
            <div className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-teal-500 animate-ping"></div>
            <Bell className="w-4 h-4 text-teal-600" />
         </div>
      </div>
      {/* Calendar View */}
      <div className="flex-1 bg-white/80 rounded-2xl shadow-sm border border-teal-100/50 overflow-hidden flex flex-col p-4 gap-3">
         {/* Days */}
         <div className="flex justify-between px-2 text-[10px] font-bold text-stone-400 mb-2">
            <span>MON</span><span>TUE</span><span>WED</span><span className="text-teal-600">THU</span><span>FRI</span>
         </div>
         <div className="flex-1 bg-teal-50/30 rounded-xl border border-teal-100/30 relative p-3 flex flex-col gap-2 overflow-hidden">
            {/* Shifts */}
            <div className="h-16 bg-white rounded-xl shadow-sm border border-teal-100 flex items-center px-3 gap-3 transform hover:scale-[1.02] transition-transform cursor-pointer">
               <div className="w-10 h-10 rounded-lg bg-teal-100 flex flex-col items-center justify-center text-teal-700">
                  <span className="text-[10px] font-bold leading-tight">24</span>
                  <span className="text-[8px] uppercase">Oct</span>
               </div>
               <div className="flex-1">
                  <div className="text-xs font-bold text-stone-800">Morning Shift</div>
                  <div className="text-[10px] text-stone-500 flex items-center gap-1 mt-0.5"><Clock className="w-3 h-3"/> 09:00 AM - 05:00 PM</div>
               </div>
               <div className="w-2 h-8 rounded-full bg-teal-400"></div>
            </div>
            
            <div className="h-16 bg-white rounded-xl shadow-sm border border-stone-100 flex items-center px-3 gap-3 transform hover:scale-[1.02] transition-transform cursor-pointer opacity-75">
               <div className="w-10 h-10 rounded-lg bg-stone-100 flex flex-col items-center justify-center text-stone-600">
                  <span className="text-[10px] font-bold leading-tight">25</span>
                  <span className="text-[8px] uppercase">Oct</span>
               </div>
               <div className="flex-1">
                  <div className="text-xs font-bold text-stone-800">Closing Shift</div>
                  <div className="text-[10px] text-stone-500 flex items-center gap-1 mt-0.5"><Clock className="w-3 h-3"/> 02:00 PM - 10:00 PM</div>
               </div>
               <div className="w-2 h-8 rounded-full bg-stone-300"></div>
            </div>
         </div>
      </div>
    </div>
  );
}

function HRMockup() {
  return (
    <div className="w-full h-full p-6 flex flex-col gap-4 font-sans">
       {/* Search Bar */}
       <div className="bg-white/80 p-3 rounded-xl shadow-sm border border-cyan-100/50 flex items-center gap-2">
          <Search className="w-4 h-4 text-stone-400" />
          <div className="h-3 w-32 bg-stone-100 rounded-full"></div>
       </div>
       
       <div className="flex gap-4">
         <div className="flex-1 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-xl p-4 text-white shadow-lg relative overflow-hidden group">
            <Users className="absolute right-[-10px] bottom-[-10px] w-20 h-20 text-white/10 group-hover:scale-110 transition-transform" />
            <div className="text-xs font-medium text-cyan-100">Total Staff</div>
            <div className="text-3xl font-bold mt-1">248</div>
         </div>
         <div className="w-1/3 bg-white/80 rounded-xl p-4 shadow-sm border border-cyan-100/50 flex flex-col justify-center items-center gap-1 relative">
            <div className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-rose-500 animate-ping"></div>
            <div className="text-xs font-medium text-stone-500">On Leave</div>
            <div className="text-xl font-bold text-stone-800">12</div>
         </div>
       </div>

       {/* List */}
       <div className="flex-1 bg-white/80 rounded-xl shadow-sm border border-cyan-100/50 p-4 flex flex-col gap-3">
          <div className="text-xs font-bold text-stone-800 mb-1 flex justify-between">
            Recent Activity
            <span className="text-[9px] text-cyan-500 uppercase tracking-widest bg-cyan-50 px-2 py-0.5 rounded-md">Live</span>
          </div>
          {[1,2,3].map(i => (
             <div key={i} className="flex items-center gap-3 hover:bg-stone-50 p-1.5 rounded-lg transition-colors cursor-default">
                <div className="w-8 h-8 rounded-full bg-cyan-100 flex items-center justify-center shrink-0">
                   <div className="w-4 h-4 rounded-full bg-cyan-300"></div>
                </div>
                <div className="flex-1">
                   <div className="h-2 w-24 bg-stone-200 rounded-full mb-1.5"></div>
                   <div className="h-1.5 w-16 bg-stone-100 rounded-full"></div>
                </div>
                <div className="text-[10px] font-medium text-stone-400">2m ago</div>
             </div>
          ))}
       </div>
    </div>
  );
}

const Login = () => {
  // Load saved role from localStorage or default to employee
  const [role, setRole] = useState(() => localStorage.getItem("selectedRole") || "employee");
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const emailInputRef = useRef(null);

  const navigate = useNavigate();
  const { updateUser } = useContext(UserContext);

  const currentTheme = themes[role];

  // Remember role selection
  useEffect(() => {
    localStorage.setItem("selectedRole", role);
  }, [role]);

  // Auto-focus email input on load
  useEffect(() => {
    if (emailInputRef.current) {
      emailInputRef.current.focus();
    }
  }, []);

  const handleRoleChange = (newRole, e) => {
    setRole(newRole);
    
    // Framer Motion micro-interaction for icon bounce
    if (e.currentTarget) {
       animate(
          e.currentTarget.querySelector('.role-icon'),
          { scale: [0.8, 1.2, 1] },
          { duration: 0.6, ease: "easeOut", type: "spring", bounce: 0.5 }
       );
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    if (!password) {
      toast.error("Please enter your password");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await axiosInstance.post(API_PATH.AUTH.LOGIN, {
        email,
        password,
      });

      if (response.data.twoFactorSessionId && response.data.message === "2FA required") {
        toast.success("2FA code sent to your email");
        navigate("/passcode", { 
          state: { 
            email, 
            twoFactorSessionId: response.data.twoFactorSessionId 
          } 
        });
        return;
      }

      const { token, role: apiRole } = response.data;

      if (token) {
        toast.success("Login successful");
        localStorage.setItem("token", token);
        updateUser(response.data);

        // Routing based on backend role, not UI state role
        if (apiRole === "admin" || apiRole === "hr") {
          navigate("/admin/dashboard");
        } else if (apiRole === "employee") {
          navigate("/user/dashboard");
        } else {
          navigate("/login"); // Fallback
        }
      }
    } catch (error) {
      if (error.response && error.response.data.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex bg-[#faf8f5] font-sans overflow-hidden">
      
      {/* Left: Login Form (Static Layout, Dynamic Accents) */}
      <div className="w-full lg:w-1/2 min-h-screen flex flex-col px-6 sm:px-12 md:px-24 justify-center relative z-10 bg-[#faf8f5]">
        
        <div className="w-full max-w-md mx-auto">
          {/* Logo / Brand */}
          <div className="flex items-center gap-2 mb-16 cursor-pointer" onClick={() => navigate("/")}>
             <div className={`w-8 h-8 rounded-xl bg-gradient-to-tr ${currentTheme.colors.gradientFrom} ${currentTheme.colors.gradientTo} flex items-center justify-center shadow-md transition-colors duration-500`}>
                <Calendar className="w-5 h-5 text-white" />
             </div>
             <span className="text-xl font-bold text-stone-900 tracking-tight">ShiftSync</span>
          </div>

          <div className="mb-10">
            <h1 className="text-3xl font-bold text-stone-900 mb-2">Welcome back</h1>
            <p className="text-stone-500 text-sm">Please select your portal and enter your details to log in.</p>
          </div>

          {/* Role Selector (Floating Buttons) */}
          <div className="flex p-1.5 bg-white/60 rounded-2xl mb-8 relative border border-stone-200/60 shadow-sm">
             {Object.values(themes).map((t) => (
                <button
                   key={t.id}
                   type="button"
                   onClick={(e) => handleRoleChange(t.id, e)}
                   className={`flex-1 relative py-2.5 flex items-center justify-center gap-2 text-sm font-semibold transition-colors duration-300 z-10 ${role === t.id ? t.colors.text : "text-stone-500 hover:text-stone-700"}`}
                >
                   {role === t.id && (
                      <motion.div
                         layoutId="role-pill"
                         className="absolute inset-0 bg-white rounded-xl shadow-sm border border-stone-200/50"
                         transition={{ type: "spring", stiffness: 300, damping: 25 }}
                      />
                   )}
                   <span className="relative z-10 flex items-center gap-1.5">
                      <t.icon className={`w-4 h-4 role-icon ${role === t.id ? t.colors.text : ""}`} />
                      {t.label}
                   </span>
                </button>
             ))}
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="flex flex-col gap-5">
            {/* Custom Email Input */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="email" className="text-xs font-semibold text-stone-700 uppercase tracking-wide">
                Email Address
              </label>
              <div className={`relative flex items-center bg-white border border-stone-200 rounded-xl overflow-hidden transition-all duration-300 focus-within:ring-4 ${currentTheme.colors.ringFocus} ${currentTheme.colors.borderFocus}`}>
                 <div className="pl-4 pr-2 text-stone-400">
                    <Mail className="w-5 h-5" />
                 </div>
                 <input
                    ref={emailInputRef}
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@company.com"
                    className="w-full py-3.5 pr-4 bg-transparent outline-none text-stone-800 text-sm placeholder:text-stone-400"
                    required
                 />
              </div>
            </div>

            {/* Custom Password Input */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="password" className="text-xs font-semibold text-stone-700 uppercase tracking-wide">
                Password
              </label>
              <div className={`relative flex items-center bg-white border border-stone-200 rounded-xl overflow-hidden transition-all duration-300 focus-within:ring-4 ${currentTheme.colors.ringFocus} ${currentTheme.colors.borderFocus}`}>
                 <div className="pl-4 pr-2 text-stone-400">
                    <Lock className="w-5 h-5" />
                 </div>
                 <input
                     id="password"
                     type={showPassword ? "text" : "password"}
                     value={password}
                     onChange={(e) => setPassword(e.target.value)}
                     placeholder="Enter your password"
                     className="w-full py-3.5 pr-12 bg-transparent outline-none text-stone-800 text-sm placeholder:text-stone-400"
                     required
                 />
                 <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 text-stone-400 hover:text-stone-600 transition-colors"
                 >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                 </button>
              </div>
            </div>

            {/* Forgot Password Link */}
            <div className="flex justify-end">
               <a href="#" className={`text-xs font-semibold transition-colors ${currentTheme.colors.text} hover:opacity-80`}>
                  Forgot Password?
               </a>
            </div>

            {/* Submit Button */}
            <button 
               type="submit" 
               disabled={isSubmitting}
               className={`w-full py-4 mt-2 rounded-xl text-white font-semibold text-sm transition-all duration-300 flex justify-center items-center gap-2 hover:shadow-lg hover:-translate-y-0.5 ${currentTheme.colors.accent} ${currentTheme.colors.accentHover} ${currentTheme.colors.glow}`}
            >
               {isSubmitting ? (
                  <motion.div
                     animate={{ rotate: 360 }}
                     transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                     className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                  />
               ) : (
                  <>Sign In <ArrowRight className="w-4 h-4" /></>
               )}
            </button>
          </form>

        </div>
      </div>

      {/* Right: Dynamic Role Showcase Panel (Animated) */}
      <div className="hidden lg:flex lg:w-1/2 min-h-screen relative p-6">
        {/* Animated Background Morph */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`bg-${role}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className={`absolute inset-0 bg-gradient-to-br ${currentTheme.colors.bgFrom} ${currentTheme.colors.bgTo} rounded-3xl m-6`}
          >
             {/* Abstract decorative elements */}
             <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9InJnYmEoMCwwLDAsMC4wNSkiLz48L3N2Zz4=')] opacity-50"></div>
          </motion.div>
        </AnimatePresence>

        <div className="relative w-full h-full flex flex-col justify-center items-center text-center px-12 z-10">
           <AnimatePresence mode="wait">
              <motion.div
                 key={`content-${role}`}
                 initial={{ opacity: 0, y: 20, scale: 0.95 }}
                 animate={{ opacity: 1, y: 0, scale: 1 }}
                 exit={{ opacity: 0, y: -20, scale: 0.95 }}
                 transition={{ type: "spring", stiffness: 120, damping: 20 }}
                 className="w-full max-w-lg flex flex-col items-center"
              >
                 {/* Icon */}
                 <div className={`w-16 h-16 rounded-2xl mb-8 flex items-center justify-center bg-white shadow-xl ${currentTheme.colors.text}`}>
                    <currentTheme.icon className="w-8 h-8" />
                 </div>

                 {/* Text */}
                 <h2 className="text-3xl lg:text-4xl font-bold text-stone-900 mb-4 leading-tight">
                    {currentTheme.panelTitle}
                 </h2>
                 <p className="text-stone-600 text-lg mb-12">
                    {currentTheme.panelDesc}
                 </p>

                 {/* Animated Dashboard Card */}
                 <motion.div 
                    layoutId="mockup-card"
                    className="w-full aspect-[4/3] bg-white/40 backdrop-blur-xl border border-white rounded-[2rem] shadow-2xl overflow-hidden"
                 >
                    {currentTheme.mockup}
                 </motion.div>
              </motion.div>
           </AnimatePresence>
        </div>

      </div>
    </div>
  );
};

export default Login;
