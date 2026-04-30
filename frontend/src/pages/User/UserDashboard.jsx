import { useContext, useEffect, useState } from "react";
import DashboardLayout from "../../components/DashboardLayout";
import { UserContext } from "../../context/UserContext";
import moment from "moment-timezone";
import { IoIosCloseCircleOutline } from "react-icons/io";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATH } from "../../utils/apiPath";
import UserCalendar from "../../components/Calendars/UserCalendar";
import toast from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Clock, Sparkles, Zap, ArrowUpRight, TrendingUp, CheckCircle2 } from "lucide-react";
import ShiftSyncCalendar from "../../components/Calendars/ShiftSyncCalendar";

const UserDashboard = () => {
  const { user } = useContext(UserContext);
  const [isOpen, setIsOpen] = useState(true);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  const getAllShifts = async () => {
    setLoading(true);
    try {
      const result = await axiosInstance.get(API_PATH.SHIFTS.GET_SHIFTS);
      if (result?.data?.shifts) {
        const formattedShiftDataArray = result.data.shifts.map((shift) => ({
          ...shift,
          id: shift._id,
          start: moment(shift.start).format("YYYY-MM-DD HH:mm"),
          end: moment(shift.end).format("YYYY-MM-DD HH:mm"),
          title: shift.employee?.name || "Unknown",
          calendarId:
            shift.employee?.workType === "part-time"
              ? "partTime"
              : shift.employee?.team || "sozialarbeiter",
          uid: shift.employee?._id,
          description: shift.notes,
        }));
        setEvents(formattedShiftDataArray);
      }
    } catch (error) {
      toast.error("Failed to load shifts");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) getAllShifts();
  }, [user]);

  const stats = [
    { label: "Hours This Week", value: "38.5", icon: Clock, color: "text-teal-500", bg: "bg-teal-50" },
    { label: "Completed Shifts", value: "14", icon: CheckCircle2, color: "text-emerald-500", bg: "bg-emerald-50" },
    { label: "Reliability", value: "100%", icon: TrendingUp, color: "text-cyan-500", bg: "bg-cyan-50" },
  ];

  return (
    <DashboardLayout activeMenu="Dashboard">
      <div className="space-y-10 pb-20">
        {/* Welcome Banner */}
        <AnimatePresence>
          {isOpen && (
            <motion.div 
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
              className="relative p-12 rounded-[3rem] bg-stone-900 text-white overflow-hidden shadow-2xl shadow-stone-900/20 group"
            >
              {/* Background Decorations */}
              <div className="absolute top-0 right-0 p-12 opacity-5 group-hover:scale-110 group-hover:rotate-12 transition-transform duration-1000">
                <Sparkles size={240} />
              </div>
              <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-teal-500 via-cyan-400 to-transparent"></div>
              
              <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-10">
                <div>
                  <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 rounded-full border border-white/10 text-[10px] font-black uppercase tracking-[0.2em] mb-6">
                     <Zap size={12} className="text-teal-400" />
                     Your status: Fully Synced
                  </div>
                  <h2 className="text-4xl md:text-6xl font-black tracking-tighter leading-none mb-6">
                    Hello,{" "}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-cyan-300">
                      {user?.name?.split(' ')[0] ?? "Member"}
                    </span>
                  </h2>
                  <div className="flex flex-wrap items-center gap-6">
                    <div className="flex items-center gap-3 text-stone-400 font-bold">
                       <Calendar size={18} className="text-teal-500" />
                       {moment().format("dddd, MMMM Do")}
                    </div>
                    <div className="w-1.5 h-1.5 rounded-full bg-stone-700"></div>
                    <div className="flex items-center gap-3 text-stone-400 font-bold">
                       <Clock size={18} className="text-teal-500" />
                       {moment().format("HH:mm")}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <button className="px-8 py-4 bg-white text-stone-900 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-teal-500 hover:text-white transition-all duration-500 shadow-xl shadow-white/5 flex items-center gap-2 group/btn">
                    View My Log
                    <ArrowUpRight size={18} className="group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                  </button>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="w-14 h-14 bg-white/10 hover:bg-rose-500 text-white rounded-2xl transition-all duration-500 border border-white/10 flex items-center justify-center group/close"
                  >
                    <IoIosCloseCircleOutline size={28} className="group-hover/close:rotate-90 transition-transform" />
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Personal Stats */}
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.15 }
            }
          }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
           {stats.map((stat, i) => (
             <motion.div
               key={i}
               variants={{
                 hidden: { opacity: 0, y: 30, scale: 0.95 },
                 visible: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 100 } }
               }}
               className="card !p-8 group hover:-translate-y-2 transition-all duration-500 shadow-sm hover:shadow-xl hover:shadow-teal-900/5"
             >
                <div className="flex items-center justify-between mb-6">
                   <div className={`w-14 h-14 rounded-2xl ${stat.bg} ${stat.color} flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform duration-500`}>
                      <stat.icon size={24} />
                   </div>
                   <div className="text-[10px] font-black text-emerald-500 bg-emerald-50 px-2 py-1 rounded-lg">
                      Top 5%
                   </div>
                </div>
                <p className="text-xs font-black text-stone-400 uppercase tracking-widest mb-1">{stat.label}</p>
                <h3 className="text-3xl font-black text-stone-900 tracking-tighter">{stat.value}</h3>
             </motion.div>
           ))}
        </div>

        {/* Schedule View */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="card !p-0 overflow-hidden shadow-2xl shadow-teal-500/5 border-stone-100/60"
        >
          <div className="p-10 border-b border-stone-100 bg-stone-50/30 flex justify-between items-center">
             <div>
                <h3 className="text-2xl font-black text-stone-900 tracking-tight">Active Schedule</h3>
                <p className="text-sm text-stone-500 font-medium mt-1">Real-time duty timeline and hour tracking</p>
             </div>
             <div className="flex items-center gap-3 bg-white px-4 py-2 rounded-xl border border-stone-100 shadow-sm">
                <div className="w-2 h-2 rounded-full bg-teal-500 animate-pulse"></div>
                <span className="text-[10px] font-black uppercase tracking-widest text-stone-900">Live Server Connected</span>
             </div>
          </div>
          <div className="p-10">
            <div className="relative group">
              <div className="absolute inset-0 bg-teal-500/5 rounded-[3rem] blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
              <div className="relative rounded-[3rem] overflow-hidden border border-stone-100/60 bg-white shadow-2xl shadow-stone-200/20 p-2">
                  <ShiftSyncCalendar 
                    events={events} 
                    role={user?.role}
                    userId={user?._id}
                  />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </DashboardLayout>
  );
};

export default UserDashboard;
