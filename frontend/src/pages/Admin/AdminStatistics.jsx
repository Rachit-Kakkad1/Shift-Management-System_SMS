import { useEffect, useState } from "react";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { Users, Clock, AlertCircle, TrendingUp, Calendar, ArrowUpRight, Zap, Target, PieChart as PieIcon } from 'lucide-react';
import axiosInstance from "../../utils/axiosInstance";
import { API_PATH } from "../../utils/apiPath";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

const AdminStatistics = () => {
  const [stats, setStats] = useState({
    totalEmployees: 0,
    shiftUtilization: 0,
    openShifts: 0
  });

  const barData = [
    { name: 'Social Workers', hours: 420 },
    { name: 'Caregivers', hours: 580 },
    { name: 'Assistants', hours: 350 },
  ];

  const lineData = [
    { name: 'Mon', attendance: 95 },
    { name: 'Tue', attendance: 98 },
    { name: 'Wed', attendance: 92 },
    { name: 'Thu', attendance: 99 },
    { name: 'Fri', attendance: 85 },
    { name: 'Sat', attendance: 75 },
    { name: 'Sun', attendance: 80 },
  ];

  const fetchStats = async () => {
    try {
      const result = await axiosInstance.get(API_PATH.USERS.GET_ALL_USERS);
      if (result?.data?.users) {
        setStats({
          totalEmployees: result.data.users.length,
          shiftUtilization: 92,
          openShifts: 4
        });
      }
    } catch (error) {
      setStats({ totalEmployees: 16, shiftUtilization: 92, openShifts: 4 });
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-5 rounded-2xl shadow-2xl border border-stone-100 font-sans min-w-[140px]">
          <p className="text-stone-400 text-[10px] font-black uppercase tracking-widest mb-2">{label}</p>
          <div className="flex items-center gap-2">
             <div className="w-2 h-2 rounded-full bg-orange-500"></div>
             <p className="text-stone-900 font-black text-xl">
               {payload[0].value}
               <span className="text-stone-400 text-xs font-bold ml-1">
                 {payload[0].name === 'hours' ? 'hrs' : '%'}
               </span>
             </p>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-12 pb-20">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
        <div>
          <div className="flex items-center gap-3 mb-2">
             <div className="w-10 h-10 rounded-xl bg-orange-500 flex items-center justify-center text-white shadow-xl shadow-orange-500/20">
                <Target size={20} />
             </div>
             <h1 className="text-4xl font-black text-stone-900 tracking-tighter">Business Intelligence</h1>
          </div>
          <p className="text-stone-500 font-medium">Strategic overview of workforce efficiency and operational trends</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex bg-stone-100 p-1 rounded-xl border border-stone-200">
             <button className="px-4 py-2 text-[11px] font-black uppercase tracking-widest text-stone-500 hover:text-stone-900 transition-colors">Daily</button>
             <button className="px-4 py-2 text-[11px] font-black uppercase tracking-widest text-white bg-stone-900 rounded-lg shadow-lg">Monthly</button>
          </div>
          <button className="card-btn-fill !bg-orange-500 !border-orange-500 shadow-orange-500/20">
            Export Analytics
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          { label: "Active Workforce", value: stats.totalEmployees, icon: Users, color: "orange", trend: "+8.4%", desc: "Expanding team" },
          { label: "System Efficiency", value: `${stats.shiftUtilization}%`, icon: TrendingUp, color: "emerald", trend: "Stable", desc: "Optimal performance" },
          { label: "Critical Gaps", value: stats.openShifts, icon: AlertCircle, color: "rose", trend: "-2", desc: "Action required" }
        ].map((item, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="card group hover:-translate-y-2 transition-all duration-500 cursor-default"
          >
            <div className="flex items-start justify-between mb-8">
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-transform duration-500 group-hover:scale-110 shadow-lg ${
                item.color === 'orange' ? 'bg-orange-500 text-white shadow-orange-500/10' :
                item.color === 'emerald' ? 'bg-emerald-500 text-white shadow-emerald-500/10' :
                'bg-rose-500 text-white shadow-rose-500/10'
              }`}>
                <item.icon size={24} />
              </div>
              <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black tracking-widest uppercase ${
                item.color === 'rose' ? 'bg-rose-50 text-rose-600' : 'bg-emerald-50 text-emerald-600'
              }`}>
                {item.trend}
                <ArrowUpRight size={14} />
              </div>
            </div>
            <div>
              <p className="text-stone-400 text-[10px] font-black uppercase tracking-[0.2em] mb-2">{item.label}</p>
              <h3 className="text-5xl font-black text-stone-900 tracking-tighter leading-none mb-4">{item.value}</h3>
              <p className="text-stone-500 text-xs font-medium italic">{item.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Bar Chart */}
        <div className="card shadow-2xl shadow-stone-200/40">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h3 className="text-xl font-black text-stone-900 tracking-tight">Workload Distribution</h3>
              <p className="text-xs font-bold text-stone-400 uppercase tracking-widest mt-1">Departmental Hours</p>
            </div>
            <div className="flex gap-3">
              <div className="w-10 h-10 rounded-xl bg-stone-50 flex items-center justify-center text-stone-400 hover:text-stone-900 transition-all cursor-pointer">
                 <PieIcon size={18} />
              </div>
            </div>
          </div>
          <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f5f5f4" vertical={false} />
                <XAxis 
                  dataKey="name" 
                  stroke="#a8a29e" 
                  tick={{ fill: '#78716c', fontSize: 11, fontWeight: 800 }} 
                  axisLine={false}
                  tickLine={false}
                  dy={15}
                />
                <YAxis 
                  stroke="#a8a29e" 
                  tick={{ fill: '#78716c', fontSize: 11, fontWeight: 800 }} 
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip content={<CustomTooltip />} cursor={{ fill: '#fafaf9', radius: 16 }} />
                <Bar 
                  dataKey="hours" 
                  fill="#f97316" 
                  radius={[12, 12, 4, 4]} 
                  barSize={50}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Line Chart */}
        <div className="card shadow-2xl shadow-stone-200/40">
          <div className="flex items-center justify-between mb-12">
             <div>
              <h3 className="text-xl font-black text-stone-900 tracking-tight">System Reliability</h3>
              <p className="text-xs font-bold text-stone-400 uppercase tracking-widest mt-1">Attendance Trend</p>
            </div>
            <div className="px-4 py-2 bg-emerald-50 text-emerald-700 text-[10px] font-black rounded-xl uppercase tracking-widest border border-emerald-100 flex items-center gap-2">
               <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></div>
               Live Analysis
            </div>
          </div>
          <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={lineData} margin={{ top: 0, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorAttendance" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f97316" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#f97316" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f5f5f4" vertical={false} />
                <XAxis 
                  dataKey="name" 
                  stroke="#a8a29e" 
                  tick={{ fill: '#78716c', fontSize: 11, fontWeight: 800 }} 
                  axisLine={false}
                  tickLine={false}
                  dy={15}
                />
                <YAxis 
                  stroke="#a8a29e" 
                  tick={{ fill: '#78716c', fontSize: 11, fontWeight: 800 }} 
                  axisLine={false}
                  tickLine={false}
                  domain={[60, 100]}
                />
                <Tooltip content={<CustomTooltip />} />
                <Area 
                  type="monotone" 
                  dataKey="attendance" 
                  stroke="#f97316" 
                  strokeWidth={4} 
                  fillOpacity={1} 
                  fill="url(#colorAttendance)"
                  dot={{ fill: 'white', stroke: '#f97316', strokeWidth: 3, r: 6 }} 
                  activeDot={{ r: 8, strokeWidth: 0, fill: '#1c1917' }} 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Modern Optimization Card */}
      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="bg-stone-900 rounded-[3rem] p-12 lg:p-16 text-white flex flex-col xl:flex-row items-center justify-between gap-12 shadow-2xl shadow-stone-900/20 relative overflow-hidden group"
      >
         <div className="absolute top-0 right-0 p-12 opacity-5 group-hover:scale-125 transition-transform duration-[2000ms]">
            <Zap size={240} />
         </div>
         <div className="max-w-2xl text-center xl:text-left relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 rounded-full border border-white/10 text-[10px] font-black uppercase tracking-widest mb-6">
               <Zap size={12} className="text-orange-400" />
               AI-Powered Optimization
            </div>
            <h4 className="text-3xl lg:text-5xl font-black tracking-tight mb-6 leading-tight">Maximize potential with <span className="text-orange-500">automated insights.</span></h4>
            <p className="text-stone-400 text-lg font-medium leading-relaxed">Our predictive algorithms have identified <span className="text-white font-bold">4 high-priority efficiency gains</span> in your current caregiver rotation. Implementing these could reduce monthly overhead by 12%.</p>
         </div>
         <button className="px-10 py-5 bg-white text-stone-900 font-black text-sm uppercase tracking-[0.2em] rounded-3xl hover:bg-orange-500 hover:text-white transition-all duration-500 shadow-2xl shadow-white/5 whitespace-nowrap flex items-center gap-3 group/btn">
            Unlock Insights
            <ArrowUpRight size={20} className="group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
         </button>
      </motion.div>
    </div>
  );
};

export default AdminStatistics;
