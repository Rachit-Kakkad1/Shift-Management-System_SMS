import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  CartesianGrid,
  AreaChart,
  Area
} from "recharts";
import DashboardLayout from "../../components/DashboardLayout";
import { useContext, useEffect, useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATH } from "../../utils/apiPath";
import { ChevronLeft, ChevronRight, Calendar, PieChart as PieIcon, BarChart3, Clock, Zap, Target, TrendingUp } from "lucide-react";
import moment from "moment-timezone";
import { UserContext } from "../../context/UserContext";
import UserShiftTable from "../../components/Statistics/UserShiftTable";
import {
  genareteWeeklySummary,
  getNextMonth,
  getPreviousMonth,
} from "../../utils/helper";
import toast from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";

const ViewStatistics = () => {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(new Date());
  const { user } = useContext(UserContext);

  const weeklyShiftSummary = genareteWeeklySummary(filteredEvents);

  const getAllShifts = async () => {
    try {
      const result = await axiosInstance.get(API_PATH.SHIFTS.GET_SHIFTS);
      if (result?.data?.shifts?.length > 0) {
        const formattedShiftDataArray = result.data.shifts.map((shift) => ({
          ...shift,
          id: shift._id,
          start: moment(shift.start).tz("Europe/Berlin").format(),
          end: moment(shift.end).tz("Europe/Berlin").format(),
          title: shift.employee.name,
          calendarId:
            shift.employee.workType === "part-time"
              ? "partTime"
              : shift.employee.team,
          uid: shift.employee._id,
          description: shift.notes,
        }));
        setEvents(formattedShiftDataArray.filter(e => e.uid === user?._id));
      }
    } catch (error) {
      toast.error("Failed to load statistics");
    }
  };

  const handleLeftClick = () => {
    setSelectedMonth(getPreviousMonth(selectedMonth));
  };

  const handleRightClick = () => {
    setSelectedMonth(getNextMonth(selectedMonth));
  };

  const handleFilter = () => {
    const filtered = events.filter(
      (event) =>
        moment(event.start).isSameOrAfter(
          moment(selectedMonth).startOf("month")
        ) &&
        moment(event.start).isBefore(
          moment(selectedMonth).add(1, "month").startOf("month")
        )
    );
    return filtered;
  };

  useEffect(() => {
    if (user) getAllShifts();
  }, [user]);

  useEffect(() => {
    setFilteredEvents(handleFilter());
  }, [events, selectedMonth]);

  const COLORS = ['#f97316', '#1c1917'];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-5 rounded-2xl shadow-2xl border border-stone-100 font-sans min-w-[140px]">
          <p className="text-stone-400 text-[10px] font-black uppercase tracking-widest mb-2">{label}</p>
          <div className="space-y-2">
            {payload.map((entry, index) => (
              <div key={index} className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.fill }}></div>
                  <span className="text-stone-500 text-[10px] font-bold uppercase tracking-tight">{entry.name}</span>
                </div>
                <p className="text-stone-900 font-black text-sm">{entry.value}</p>
              </div>
            ))}
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <DashboardLayout activeMenu="My Analytics">
      <div className="space-y-12 pb-20">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div>
            <div className="flex items-center gap-3 mb-2">
               <div className="w-10 h-10 rounded-xl bg-orange-500 flex items-center justify-center text-white shadow-xl shadow-orange-500/20">
                  <TrendingUp size={20} />
               </div>
               <h1 className="text-4xl font-black text-stone-900 tracking-tighter">Personal Insights</h1>
            </div>
            <p className="text-stone-500 font-medium">Detailed breakdown of your operational performance and shift history</p>
          </div>
          
          <div className="flex items-center gap-4 bg-white p-2 rounded-2xl border border-stone-100 shadow-xl shadow-stone-200/40 group">
            <button 
              onClick={handleLeftClick}
              className="w-12 h-12 rounded-xl hover:bg-stone-50 flex items-center justify-center text-stone-400 hover:text-orange-500 transition-all duration-500"
            >
              <ChevronLeft size={24} />
            </button>
            <div className="flex items-center gap-3 px-6 font-black text-stone-900 uppercase tracking-widest text-xs min-w-[180px] justify-center">
               <Calendar size={18} className="text-orange-500" />
               {moment(selectedMonth).format("MMMM YYYY")}
            </div>
            <button 
              onClick={handleRightClick}
              className="w-12 h-12 rounded-xl hover:bg-stone-50 flex items-center justify-center text-stone-400 hover:text-orange-500 transition-all duration-500"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
           {[
             { label: "Morning Shifts", value: filteredEvents.filter(e => String(e.start).endsWith("08:00")).length, color: "orange", icon: Clock, bg: "bg-orange-50", text: "text-orange-600" },
             { label: "Evening Shifts", value: filteredEvents.filter(e => String(e.start).endsWith("13:30")).length, color: "stone", icon: Clock, bg: "bg-stone-100", text: "text-stone-900" },
             { label: "Monthly Output", value: filteredEvents.length, color: "orange", icon: Zap, bg: "bg-orange-500", text: "text-white" }
           ].map((stat, i) => (
             <motion.div 
               key={i}
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: i * 0.1 }}
               className="card !p-8 group hover:-translate-y-2 transition-all duration-500 cursor-default"
             >
                <div className={`w-14 h-14 rounded-2xl ${stat.bg} ${stat.text} flex items-center justify-center shadow-lg mb-8 group-hover:scale-110 transition-transform duration-500`}>
                   <stat.icon size={24} />
                </div>
                <p className="text-[10px] font-black text-stone-400 uppercase tracking-[0.2em] mb-2">{stat.label}</p>
                <h3 className="text-4xl font-black text-stone-900 tracking-tighter leading-none">{stat.value}</h3>
             </motion.div>
           ))}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
           <div className="lg:col-span-2 card !p-12 shadow-2xl shadow-orange-500/5">
              <div className="flex items-center justify-between mb-12">
                 <div>
                    <h3 className="text-2xl font-black text-stone-900 tracking-tight">Activity Heatmap</h3>
                    <p className="text-xs font-bold text-stone-400 uppercase tracking-widest mt-1">Weekly Distribution</p>
                 </div>
                 <div className="flex gap-6">
                    <div className="flex items-center gap-2">
                       <div className="w-2.5 h-2.5 rounded-full bg-orange-500"></div>
                       <span className="text-[10px] font-black text-stone-400 uppercase tracking-widest">Morning</span>
                    </div>
                    <div className="flex items-center gap-2">
                       <div className="w-2.5 h-2.5 rounded-full bg-stone-900"></div>
                       <span className="text-[10px] font-black text-stone-400 uppercase tracking-widest">Evening</span>
                    </div>
                 </div>
              </div>
              <div className="h-80 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={weeklyShiftSummary} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f5f5f4" vertical={false} />
                    <XAxis 
                      dataKey="weekday" 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{ fill: '#78716c', fontSize: 11, fontWeight: 800 }}
                      dy={15}
                    />
                    <YAxis 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{ fill: '#78716c', fontSize: 11, fontWeight: 800 }}
                      allowDecimals={false} 
                    />
                    <Tooltip cursor={{ fill: '#fafaf9', radius: 16 }} content={<CustomTooltip />} />
                    <Bar dataKey="morning" fill="#f97316" radius={[8, 8, 2, 2]} barSize={24} name="Morning" />
                    <Bar dataKey="evening" fill="#1c1917" radius={[8, 8, 2, 2]} barSize={24} name="Evening" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
           </div>

           <div className="card !p-12 flex flex-col shadow-2xl shadow-stone-200/40">
              <div className="flex items-center gap-3 mb-10">
                 <div className="w-8 h-8 rounded-lg bg-orange-100 flex items-center justify-center text-orange-600">
                    <PieIcon size={18} />
                 </div>
                 <h3 className="text-xl font-black text-stone-900 tracking-tight">Shift Ratio</h3>
              </div>
              <div className="flex-1 h-64 relative group">
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
                   <div className="text-center">
                      <p className="text-[10px] font-black text-stone-400 uppercase tracking-widest">Total</p>
                      <p className="text-2xl font-black text-stone-900">{filteredEvents.length}</p>
                   </div>
                </div>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={[
                        { name: "Morning", value: filteredEvents.filter(e => String(e.start).endsWith("08:00")).length },
                        { name: "Evening", value: filteredEvents.filter(e => String(e.start).endsWith("13:30")).length },
                      ]}
                      innerRadius={70}
                      outerRadius={90}
                      paddingAngle={10}
                      dataKey="value"
                      stroke="none"
                    >
                      <Cell fill="#f97316" />
                      <Cell fill="#1c1917" />
                    </Pie>
                    <Tooltip content={<CustomTooltip />} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="pt-8 border-t border-stone-100 mt-auto">
                 <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-[0.2em]">
                    <span className="text-stone-400">Target Efficiency</span>
                    <span className="text-emerald-500 flex items-center gap-1">
                       <Zap size={10} />
                       Reached
                    </span>
                 </div>
              </div>
           </div>
        </div>

        {/* List Section */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="card !p-0 overflow-hidden shadow-2xl shadow-orange-500/5 border-stone-100/60"
        >
           <div className="p-10 border-b border-stone-100 bg-stone-50/30 flex justify-between items-center">
              <div>
                 <h3 className="text-2xl font-black text-stone-900 tracking-tight">Audit Log</h3>
                 <p className="text-sm text-stone-500 font-medium mt-1">Immutable record of your operational history</p>
              </div>
              <div className="px-6 py-3 bg-white border border-stone-100 rounded-2xl shadow-sm text-[10px] font-black uppercase tracking-widest text-stone-400">
                 Verified Session
              </div>
           </div>
           <div className="p-6">
              <UserShiftTable
                user={user}
                selectedMonth={selectedMonth}
                filteredEvents={filteredEvents}
              />
           </div>
        </motion.div>
      </div>
    </DashboardLayout>
  );
};

export default ViewStatistics;
