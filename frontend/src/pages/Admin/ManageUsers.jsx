import React, { useEffect, useState } from "react";
import { API_PATH } from "../../utils/apiPath";
import axiosInstance from "../../utils/axiosInstance";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";
import { MdEdit, MdLockReset, MdBlock, MdCheckCircle, MdDelete } from "react-icons/md";
import { useNavigate } from "react-router";
import { Users, Search, Filter, MoreVertical, ShieldCheck, Mail, Zap, UserPlus } from "lucide-react";

const ManageUsers = () => {
  const [allUsers, setAllUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const getAllUsers = async () => {
    try {
      const response = await axiosInstance.get(API_PATH.USERS.GET_ALL_USERS);
      if (response.data?.users) {
        setAllUsers(response.data.users);
      }
    } catch (error) {
      toast.error("Error fetching users");
    }
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  const toggleStatus = async (user) => {
    toast.success(`User ${user.name} status updated.`);
    setAllUsers(allUsers.map(u => u._id === user._id ? { ...u, isActive: !u.isActive } : u));
  };

  const resetPassword = (user) => {
    toast.success(`Password reset link sent for ${user.name}`);
  };

  const deleteUser = async (userId) => {
    const isConfirmed = window.confirm(
      "CRITICAL: Are you sure you want to PERMANENTLY delete this user? This will remove them from the database and cannot be undone."
    );

    if (isConfirmed) {
      try {
        const response = await axiosInstance.delete(API_PATH.USERS.DELETE_USER_BY_ID(userId));
        if (response.status === 200) {
          toast.success("Identity node purged from database");
          setAllUsers(allUsers.filter((u) => u._id !== userId));
        }
      } catch (error) {
        toast.error(error.response?.data?.message || "Purge operation failed");
      }
    }
  };

  const filteredUsers = allUsers.filter(u => 
    u.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    u.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-12 pb-20">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
        <div>
          <div className="flex items-center gap-3 mb-2">
             <div className="w-10 h-10 rounded-xl bg-teal-500 flex items-center justify-center text-white shadow-xl shadow-teal-500/20">
                <Users size={20} />
             </div>
             <h1 className="text-4xl font-black text-stone-900 tracking-tighter">Team Directory</h1>
          </div>
          <p className="text-stone-500 font-medium">Manage permissions, roles, and enterprise account statuses</p>
        </div>
        <button onClick={() => navigate("/admin/create-user")} className="px-8 py-4 bg-teal-500 text-white rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-teal-600 transition-all shadow-xl shadow-teal-500/20 flex items-center gap-3 group">
          <UserPlus size={18} className="group-hover:rotate-12 transition-transform" />
          Onboard Member
        </button>
      </div>

      {/* Stats Quick View */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
         {[
           { label: "Total Members", value: allUsers.length, icon: Users, color: "teal", bg: "bg-teal-50", text: "text-teal-600" },
           { label: "Active Nodes", value: allUsers.filter(u => u.isActive).length, icon: Zap, color: "emerald", bg: "bg-emerald-50", text: "text-emerald-600" },
           { label: "Account Gaps", value: allUsers.filter(u => !u.isActive).length, icon: ShieldCheck, color: "rose", bg: "bg-rose-50", text: "text-rose-600" }
         ].map((stat, i) => (
           <motion.div 
             key={i}
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: i * 0.1 }}
             className="card !p-8 group hover:-translate-y-2 transition-all duration-500"
           >
              <div className="flex items-center justify-between mb-6">
                 <div className={`w-14 h-14 rounded-2xl ${stat.bg} ${stat.text} flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform duration-500`}>
                    <stat.icon size={24} />
                 </div>
                 <div className="text-[10px] font-black text-stone-300 uppercase tracking-widest">Real-time</div>
              </div>
              <p className="text-xs font-black text-stone-400 uppercase tracking-widest mb-1">{stat.label}</p>
              <h3 className="text-3xl font-black text-stone-900 tracking-tighter">{stat.value}</h3>
           </motion.div>
         ))}
      </div>

      {/* Table Section */}
      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="card !p-0 overflow-hidden shadow-2xl shadow-teal-500/5 border-stone-100/60"
      >
        <div className="p-8 border-b border-stone-100 bg-stone-50/30 flex flex-col sm:flex-row justify-between items-center gap-6">
          <div className="relative w-full sm:w-96 group">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400 group-focus-within:text-teal-500 transition-colors" />
            <input 
              type="text" 
              placeholder="Filter by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white border border-stone-200 rounded-2xl py-3.5 pl-12 pr-4 text-sm outline-none focus:ring-8 focus:ring-teal-500/5 focus:border-teal-500/30 transition-all font-medium placeholder:text-stone-300"
            />
          </div>
          <div className="flex items-center gap-4 w-full sm:w-auto">
            <button className="px-6 py-3.5 bg-white border border-stone-100 rounded-2xl text-stone-400 font-bold text-xs uppercase tracking-widest hover:text-stone-900 hover:border-stone-200 transition-all flex items-center gap-2 group">
              <Filter size={16} className="group-hover:rotate-90 transition-transform" />
              Advanced Filter
            </button>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="bg-stone-50/50 text-stone-400 border-b border-stone-100">
                <th className="px-10 py-6 font-black uppercase tracking-widest text-[10px]">Identity & Access</th>
                <th className="px-10 py-6 font-black uppercase tracking-widest text-[10px]">Department & Tier</th>
                <th className="px-10 py-6 font-black uppercase tracking-widest text-[10px]">Security Status</th>
                <th className="px-10 py-6 font-black uppercase tracking-widest text-[10px] text-right">Operational Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100/60">
              <AnimatePresence>
                {filteredUsers.map((user, index) => (
                  <motion.tr 
                    key={user._id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                    className="group hover:bg-stone-50/30 transition-all duration-300"
                  >
                    <td className="px-10 py-6">
                      <div className="flex items-center gap-5">
                        <div className="relative shrink-0">
                          <div className="absolute inset-0 bg-teal-500 rounded-[1.25rem] blur opacity-0 group-hover:opacity-20 transition-opacity"></div>
                          <div className="relative w-12 h-12 rounded-[1.25rem] bg-teal-500 border-2 border-white flex items-center justify-center text-white font-black text-lg shadow-sm transition-all duration-500 group-hover:scale-105">
                             {user.name.charAt(0)}
                          </div>
                          {user.isActive && <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 border-2 border-white rounded-full"></div>}
                        </div>
                        <div className="flex flex-col">
                          <span className="font-black text-stone-900 text-[16px] tracking-tight">{user.name}</span>
                          <span className="text-stone-400 text-xs font-bold flex items-center gap-1.5 mt-0.5 uppercase tracking-tighter">
                             <Mail size={12} />
                             {user.email || "NO_ALIAS_FOUND"}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="px-10 py-6">
                      <div className="flex flex-col gap-2">
                        <span className="px-3 py-1 bg-stone-900 text-white rounded-lg text-[9px] font-black uppercase tracking-widest inline-block w-fit">
                          {user.role || "MEMBER"}
                        </span>
                        <span className="text-stone-500 text-xs font-bold capitalize flex items-center gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-teal-500"></div>
                          {user.team || "UNASSIGNED"}
                        </span>
                      </div>
                    </td>
                    <td className="px-10 py-6">
                      <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-2xl text-[10px] font-black uppercase tracking-widest ${
                        user.isActive 
                          ? "bg-emerald-50 text-emerald-600 border border-emerald-100" 
                          : "bg-rose-50 text-rose-500 border border-rose-100"
                      }`}>
                        <div className={`w-1.5 h-1.5 rounded-full ${user.isActive ? "bg-emerald-500" : "bg-rose-500 animate-pulse"}`}></div>
                        {user.isActive ? "Authorized" : "Suspended"}
                      </span>
                    </td>
                    <td className="px-10 py-6 text-right">
                      <div className="flex items-center justify-end gap-3 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-4 group-hover:translate-x-0">
                        <button 
                          onClick={() => navigate(`/admin/users/${user._id}`)}
                          className="w-11 h-11 rounded-[1rem] flex items-center justify-center text-stone-400 hover:text-white hover:bg-stone-900 transition-all border border-stone-100 hover:border-stone-900 hover:shadow-xl hover:shadow-stone-900/10"
                          title="Modify Access"
                        >
                          <MdEdit size={20} />
                        </button>
                        <button 
                          onClick={() => resetPassword(user)}
                          className="w-11 h-11 rounded-[1rem] flex items-center justify-center text-stone-400 hover:text-white hover:bg-teal-500 transition-all border border-stone-100 hover:border-teal-500 hover:shadow-xl hover:shadow-teal-500/10"
                          title="Reset Security Key"
                        >
                          <MdLockReset size={20} />
                        </button>
                        <button 
                          onClick={() => deleteUser(user._id)}
                          className="w-11 h-11 rounded-[1rem] flex items-center justify-center text-stone-400 hover:text-white hover:bg-rose-600 transition-all border border-stone-100 hover:border-rose-600 hover:shadow-xl hover:shadow-rose-600/10"
                          title="Permanent Delete"
                        >
                          <MdDelete size={20} />
                        </button>
                        <button 
                          onClick={() => toggleStatus(user)}
                          className={`w-11 h-11 rounded-[1rem] flex items-center justify-center transition-all border border-stone-100 ${
                            user.isActive 
                              ? "text-stone-400 hover:text-white hover:bg-rose-500 hover:border-rose-500 hover:shadow-xl hover:shadow-rose-500/10" 
                              : "text-stone-400 hover:text-white hover:bg-emerald-500 hover:border-emerald-500 hover:shadow-xl hover:shadow-emerald-500/10"
                          }`}
                          title={user.isActive ? "Disable Node" : "Enable Node"}
                        >
                          {user.isActive ? <MdBlock size={20} /> : <MdCheckCircle size={20} />}
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
              {filteredUsers.length === 0 && (
                <tr>
                  <td colSpan="4" className="px-10 py-32 text-center">
                    <div className="flex flex-col items-center gap-4">
                       <div className="w-20 h-20 rounded-[2rem] bg-stone-50 flex items-center justify-center text-stone-200">
                          <Search size={40} />
                       </div>
                       <p className="text-stone-400 text-lg font-black uppercase tracking-widest">No matching nodes detected</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
};

export default ManageUsers;
