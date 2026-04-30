import { useState, useContext, useEffect } from "react";
import { UserContext } from "../context/UserContext";
import axiosInstance from "../utils/axiosInstance";
import { API_PATH } from "../utils/apiPath";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { 
  User, 
  Mail, 
  Lock, 
  Shield, 
  Briefcase, 
  Save, 
  Camera,
  CheckCircle2
} from "lucide-react";
import DashboardLayout from "../components/DashboardLayout";
import AdminLayout from "../components/AdminLayout";

const ProfileContent = () => {
  const { user, updateUser } = useContext(UserContext);
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
    }
  }, [user]);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axiosInstance.put(API_PATH.USERS.UPDATE_PROFILE, {
        name,
        email,
        password: password || undefined
      });

      if (response.data) {
        updateUser({ ...user, ...response.data });
        toast.success("Profile updated successfully");
        setPassword("");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Update failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
           <h1 className="text-4xl font-black text-stone-900 tracking-tighter">My Account</h1>
           <p className="text-stone-500 font-medium">Manage your professional identity and security parameters</p>
        </div>
        <div className="px-6 py-3 bg-white border border-stone-100 rounded-2xl shadow-xl shadow-stone-200/40 text-[10px] font-black uppercase tracking-widest text-teal-500 flex items-center gap-3">
           <div className="w-2 h-2 rounded-full bg-teal-500 animate-pulse"></div>
           Profile Active
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Left: Identity Card */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-1 space-y-6"
        >
          <div className="card !p-8 text-center space-y-6 relative overflow-hidden">
             <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-br from-teal-500 to-cyan-600"></div>
             
             <div className="relative pt-8">
                <div className="w-24 h-24 rounded-[2rem] bg-white p-1.5 shadow-2xl mx-auto">
                   <div className="w-full h-full rounded-[1.75rem] bg-teal-500 flex items-center justify-center text-white text-3xl font-black">
                      {user?.name?.charAt(0)}
                   </div>
                </div>
                <button className="absolute bottom-0 right-1/2 translate-x-12 w-8 h-8 rounded-xl bg-stone-900 text-white flex items-center justify-center border-4 border-white hover:scale-110 transition-transform">
                   <Camera size={14} />
                </button>
             </div>

             <div className="space-y-1">
                <h3 className="text-xl font-black text-stone-900">{user?.name}</h3>
                <p className="text-stone-400 text-sm font-bold uppercase tracking-widest">{user?.role}</p>
             </div>

             <div className="pt-6 border-t border-stone-100 space-y-4 text-left">
                <div className="flex items-center gap-4">
                   <div className="w-10 h-10 rounded-xl bg-stone-50 flex items-center justify-center text-stone-400">
                      <Shield size={18} />
                   </div>
                   <div>
                      <p className="text-[10px] font-black text-stone-400 uppercase">Department</p>
                      <p className="text-sm font-bold text-stone-900">{user?.team || "General"}</p>
                   </div>
                </div>
                <div className="flex items-center gap-4">
                   <div className="w-10 h-10 rounded-xl bg-stone-50 flex items-center justify-center text-stone-400">
                      <Briefcase size={18} />
                   </div>
                   <div>
                      <p className="text-[10px] font-black text-stone-400 uppercase">Contract Type</p>
                      <p className="text-sm font-bold text-stone-900 capitalize">{user?.workType || "Full-time"}</p>
                   </div>
                </div>
             </div>
          </div>
        </motion.div>

        {/* Right: Settings Form */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-2"
        >
          <div className="card !p-10">
             <form onSubmit={handleUpdateProfile} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                   <div className="space-y-2">
                      <label className="text-[10px] font-black text-stone-400 uppercase tracking-widest ml-1">Full Name</label>
                      <div className="relative group">
                         <div className="absolute left-5 top-1/2 -translate-y-1/2 text-stone-400 group-focus-within:text-teal-500 transition-colors">
                            <User size={18} />
                         </div>
                         <input 
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full bg-stone-50/50 border border-stone-100 rounded-2xl py-4 pl-12 pr-6 text-stone-900 font-bold outline-none focus:bg-white focus:border-teal-500/30 focus:ring-4 focus:ring-teal-500/5 transition-all"
                         />
                      </div>
                   </div>

                   <div className="space-y-2">
                      <label className="text-[10px] font-black text-stone-400 uppercase tracking-widest ml-1">Email Address</label>
                      <div className="relative group">
                         <div className="absolute left-5 top-1/2 -translate-y-1/2 text-stone-400 group-focus-within:text-teal-500 transition-colors">
                            <Mail size={18} />
                         </div>
                         <input 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full bg-stone-50/50 border border-stone-100 rounded-2xl py-4 pl-12 pr-6 text-stone-900 font-bold outline-none focus:bg-white focus:border-teal-500/30 focus:ring-4 focus:ring-teal-500/5 transition-all"
                         />
                      </div>
                   </div>
                </div>

                <div className="space-y-2">
                   <label className="text-[10px] font-black text-stone-400 uppercase tracking-widest ml-1">Update Security Key (Leave empty to keep current)</label>
                   <div className="relative group">
                      <div className="absolute left-5 top-1/2 -translate-y-1/2 text-stone-400 group-focus-within:text-teal-500 transition-colors">
                         <Lock size={18} />
                      </div>
                      <input 
                         type="password"
                         value={password}
                         onChange={(e) => setPassword(e.target.value)}
                         placeholder="••••••••"
                         className="w-full bg-stone-50/50 border border-stone-100 rounded-2xl py-4 pl-12 pr-6 text-stone-900 font-bold outline-none focus:bg-white focus:border-teal-500/30 focus:ring-4 focus:ring-teal-500/5 transition-all"
                      />
                   </div>
                </div>

                <div className="pt-6 border-t border-stone-100 flex items-center justify-between">
                   <div className="flex items-center gap-3 text-stone-400 font-bold text-xs">
                      <CheckCircle2 size={16} className="text-emerald-500" />
                      Changes will take effect instantly
                   </div>
                   <button 
                      type="submit"
                      disabled={loading}
                      className="px-10 py-4 bg-teal-500 text-white rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-teal-600 transition-all shadow-xl shadow-teal-500/20 flex items-center gap-3 group"
                   >
                      {loading ? "Saving..." : "Update Profile"}
                      <Save size={18} className="group-hover:scale-110 transition-transform" />
                   </button>
                </div>
             </form>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

const Profile = () => {
  const { user } = useContext(UserContext);
  
  if (user?.role === "admin") {
    return (
      <AdminLayout>
        <ProfileContent />
      </AdminLayout>
    );
  }

  return (
    <DashboardLayout activeMenu="Profile">
      <ProfileContent />
    </DashboardLayout>
  );
};

export default Profile;
