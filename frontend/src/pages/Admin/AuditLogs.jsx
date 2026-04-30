import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Clock, User, ArrowUpRight, Search, Filter } from 'lucide-react';

const mockLogs = [
  { id: 1, user: 'Admin User', action: 'Created new shift for Alex Smith', timestamp: '2023-10-27 09:41:22', type: 'create' },
  { id: 2, user: 'System', action: 'Conflict Detected: Overlapping shifts', timestamp: '2023-10-27 09:41:25', type: 'warning' },
  { id: 3, user: 'John Doe', action: 'Logged in', timestamp: '2023-10-27 08:30:10', type: 'info' },
  { id: 4, user: 'Admin User', action: 'Deactivated user account (ID: 402)', timestamp: '2023-10-26 14:20:05', type: 'delete' },
  { id: 5, user: 'Jane Smith', action: 'Updated profile information', timestamp: '2023-10-26 11:15:42', type: 'update' },
];

const AuditLogs = () => {
  return (
    <div className="py-6 space-y-8 max-w-7xl mx-auto">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold text-stone-900 tracking-tight">Audit Logs</h1>
          <p className="text-stone-500 font-medium mt-1">Monitor system activity and security events in real-time</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="card-btn-fill">
            Export Logs
          </button>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="card !p-4 flex flex-col sm:flex-row items-center gap-4 bg-stone-50/50">
        <div className="relative flex-1 group">
           <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400 group-focus-within:text-stone-900 transition-colors" />
           <input 
             type="text" 
             placeholder="Filter by user or action..." 
             className="w-full bg-white border border-stone-200 rounded-xl py-2.5 pl-11 pr-4 text-sm outline-none focus:ring-4 focus:ring-stone-900/5 focus:border-stone-900 transition-all"
           />
        </div>
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <button className="card-btn">
            <Filter size={16} />
            All Events
          </button>
          <button className="card-btn">
            Last 24 Hours
          </button>
        </div>
      </div>

      {/* Table Section */}
      <div className="card !p-0 overflow-hidden border-stone-200/60 shadow-2xl shadow-stone-200/40">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="bg-stone-50/80 text-stone-500 border-b border-stone-100">
                <th className="px-8 py-5 font-bold uppercase tracking-wider text-[11px]">User</th>
                <th className="px-8 py-5 font-bold uppercase tracking-wider text-[11px]">Action</th>
                <th className="px-8 py-5 font-bold uppercase tracking-wider text-[11px]">Timestamp</th>
                <th className="px-8 py-5 font-bold uppercase tracking-wider text-[11px] text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {mockLogs.map((log, index) => (
                <motion.tr 
                  key={log.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="group hover:bg-stone-50/50 transition-all duration-300"
                >
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-stone-100 flex items-center justify-center text-stone-500 group-hover:bg-white group-hover:shadow-sm transition-all">
                        <User size={18} />
                      </div>
                      <span className="font-bold text-stone-900">{log.user}</span>
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <div className="flex flex-col gap-1">
                      <span className="text-stone-700 font-medium">{log.action}</span>
                      <span className="text-[10px] text-stone-400 font-bold uppercase tracking-widest">{log.type}</span>
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-2 text-stone-500">
                      <Clock size={14} className="text-stone-300" />
                      <span className="font-mono text-xs">{log.timestamp}</span>
                    </div>
                  </td>
                  <td className="px-8 py-5 text-right">
                    <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tight ${
                      log.type === 'warning' ? 'bg-rose-50 text-rose-600' : 
                      log.type === 'create' ? 'bg-emerald-50 text-emerald-600' :
                      'bg-indigo-50 text-indigo-600'
                    }`}>
                      {log.type === 'warning' ? 'Alert' : 'Success'}
                      <ArrowUpRight size={12} />
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Summary Footer */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-6 opacity-60">
        <p className="text-xs font-bold text-stone-500 uppercase tracking-widest">Showing 5 of 1,204 entries</p>
        <div className="flex items-center gap-2">
           <button className="w-8 h-8 rounded-lg border border-stone-200 flex items-center justify-center text-stone-400 hover:bg-stone-100 transition-colors">1</button>
           <button className="w-8 h-8 rounded-lg border border-stone-200 flex items-center justify-center text-stone-400 hover:bg-stone-100 transition-colors">2</button>
           <button className="w-8 h-8 rounded-lg border border-stone-200 flex items-center justify-center text-stone-400 hover:bg-stone-100 transition-colors">3</button>
        </div>
      </div>
    </div>
  );
};

export default AuditLogs;
