import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/UserContext";
import { IoIosCloseCircleOutline, IoMdWarning } from "react-icons/io";
import moment from "moment-timezone";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATH } from "../../utils/apiPath";
import ToggleSwitch from "../../components/ToogleSwitch";
import EditModal from "../../components/EditModal";
import toast from "react-hot-toast";
import CalendarSelector from "../../components/Calendars/CalendarSelector";
import { motion, AnimatePresence } from "framer-motion";
import { 
  LayoutDashboard, 
  Sparkles, 
  ArrowUpRight, 
  Users, 
  Calendar, 
  Clock, 
  TrendingUp,
  AlertCircle,
  Zap,
  Filter
} from "lucide-react";

import ShiftSyncCalendar from "../../components/Calendars/ShiftSyncCalendar";

const Dashboard = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [initialData, setInitialData] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [teamFilter, setTeamFilter] = useState("all");

  const { user } = useContext(UserContext);

  const handleShiftUpdate = async (updated) => {
    try {
      const response = await axiosInstance.put(
        API_PATH.SHIFTS.UPDATE_SHIFTS(updated.id || updated._id),
        { start: updated.start, end: updated.end },
      );
      if (response?.status === 200) {
        toast.success("Shift successfully updated");
        getAllShifts();
      }
    } catch (error) {
      toast.error(error.message || "An error occurred");
    }
  };

  const handleClick = (entry) => {
    setInitialData(entry);
    setModalOpen(true);
  };

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
          role: shift.employee?.role || 'employee'
        }));
        setEvents(formattedShiftDataArray);
      }
    } catch (error) {
      console.error("Fetch shifts error:", error);
      toast.error(error.message || "An error occurred fetching shifts");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllShifts();
  }, []);

  const activeEvents = teamFilter === "all" 
    ? events 
    : events.filter((event) => event.calendarId === teamFilter);

  const stats = [
    { label: "Active Members", value: "16", icon: Users, color: "text-teal-500", bg: "bg-teal-50" },
    { label: "Total Shifts", value: events.length.toString(), icon: Calendar, color: "text-indigo-500", bg: "bg-indigo-50" },
    { label: "Hours Logged", value: "1,240", icon: Clock, color: "text-cyan-500", bg: "bg-cyan-50" },
    { label: "Efficiency", value: "98.2%", icon: TrendingUp, color: "text-emerald-500", bg: "bg-emerald-50" },
  ];

  return (
    <div className="space-y-10 pb-20">
      {/* Welcome Section */}
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
                   {user?.role?.toUpperCase()} Command Center
                </div>
                <h2 className="text-4xl md:text-6xl font-black tracking-tighter leading-none mb-6">
                  Hello,{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-cyan-300">
                    {user?.name?.split(' ')[0] ?? "Manager"}
                  </span>
                </h2>
                <p className="text-stone-400 text-lg font-medium max-w-xl">
                  Welcome to ShiftSync. You have <span className="text-white font-bold">{events.length} active shifts</span> under your supervision this period.
                </p>
              </div>

              <div className="flex items-center gap-4">
                <button className="px-8 py-4 bg-white text-stone-900 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-teal-500 hover:text-white transition-all duration-500 shadow-xl shadow-white/5 flex items-center gap-2 group/btn">
                  Generate Report
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

      {/* Stats Quick View */}
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
        className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6"
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
                    Stable
                 </div>
              </div>
              <p className="text-xs font-black text-stone-400 uppercase tracking-widest mb-1">{stat.label}</p>
              <h3 className="text-3xl font-black text-stone-900 tracking-tighter">{stat.value}</h3>
           </motion.div>
         ))}
      </div>

      {/* Main Schedule Container */}
      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="card !p-12 shadow-2xl shadow-teal-500/5 border-stone-100/40 relative overflow-hidden"
      >
        <div className="flex flex-col xl:flex-row items-start xl:items-center justify-between mb-12 gap-8 relative z-10">
          <div>
            <div className="flex items-center gap-4 mb-3">
               <div className="w-10 h-10 rounded-xl bg-teal-500 flex items-center justify-center text-white shadow-xl shadow-teal-500/20">
                  <Calendar size={20} />
               </div>
               <h5 className="text-4xl font-black text-stone-900 tracking-tighter leading-none">Master Schedule</h5>
            </div>
            <p className="text-stone-500 font-medium text-lg">Real-time operational overview of all departments</p>
          </div>
          
          <div className="flex flex-wrap items-center gap-4 w-full xl:w-auto">
            <div className="relative group flex-1 xl:flex-initial">
               <div className="absolute left-5 top-1/2 -translate-y-1/2 pointer-events-none text-stone-400 group-focus-within:text-teal-500 transition-colors">
                  <Filter size={16} />
               </div>
               <select
                className="select-boxx w-full !pl-12 !pr-10 !py-4 hover:border-teal-200 transition-all"
                onChange={(e) => setTeamFilter(e.target.value)}
                value={teamFilter}
              >
                <option value="all">All Departments</option>
                <option value="sozialarbeiter">Social Workers</option>
                <option value="sozialbetreuer">Caregivers</option>
                <option value="sozialbetreuerhelfer">Assistants</option>
              </select>
            </div>
          </div>
        </div>

        <div className="relative group">
           <div className="absolute inset-0 bg-teal-500/5 rounded-[4rem] blur-[100px] opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
           <div className="relative rounded-[3rem] overflow-hidden border border-stone-100 shadow-2xl bg-white p-2">
            <ShiftSyncCalendar 
              events={activeEvents}
              role={user?.role}
              onEventUpdate={handleShiftUpdate}
              onEventClick={handleClick}
            />
          </div>
        </div>
      </motion.div>

      <EditModal
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        initialData={initialData}
      />
    </div>
  );
};

export default Dashboard;
