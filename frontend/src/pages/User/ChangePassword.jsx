import { useContext, useState } from "react";
import DashboardLayout from "../../components/DashboardLayout";
import { UserContext } from "../../context/UserContext";
import Input from "../../Inputs/Input";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATH } from "../../utils/apiPath";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { KeyRound, ShieldAlert, ArrowRight, Lock, ShieldCheck, Mail, User } from "lucide-react";

const ChangePassword = () => {
  const { user, clearUser } = useContext(UserContext);
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!password) {
      toast.error("You must enter your old password");
      setLoading(false);
      return;
    }

    if (!newPassword) {
      toast.error("You must enter your new password");
      setLoading(false);
      return;
    }

    try {
      const response = await axiosInstance.put(
        API_PATH.USERS.UPDATE_USER_PASSWORD,
        {
          password,
          newPassword,
        },
      );
      if (response.status === 200) {
        toast.success("Password changed! Please log in again.");
        handleLogout();
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to change password");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    clearUser();
    navigate("/login");
  };

  return (
    <DashboardLayout activeMenu="Security">
      <div className="space-y-12 pb-20 max-w-5xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div>
            <div className="flex items-center gap-3 mb-2">
               <div className="w-10 h-10 rounded-xl bg-orange-500 flex items-center justify-center text-white shadow-xl shadow-orange-500/20">
                  <ShieldCheck size={20} />
               </div>
               <h1 className="text-4xl font-black text-stone-900 tracking-tighter">Security Center</h1>
            </div>
            <p className="text-stone-500 font-medium">Protect your personal data and manage your operational credentials</p>
          </div>
          
          <div className="px-6 py-3 bg-white border border-stone-100 rounded-2xl shadow-xl shadow-stone-200/40 text-[10px] font-black uppercase tracking-widest text-stone-400 flex items-center gap-3">
             <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
             Account Secure
          </div>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          className="card !p-0 overflow-hidden shadow-2xl shadow-orange-500/5 border-stone-100/60"
        >
          <div className="p-10 border-b border-stone-100 bg-stone-50/30 flex items-center gap-6">
             <div className="w-14 h-14 rounded-2xl bg-stone-900 flex items-center justify-center text-white shadow-xl shadow-stone-900/20">
                <KeyRound size={28} />
             </div>
             <div>
                <h3 className="text-2xl font-black text-stone-900 tracking-tight">Credential Update</h3>
                <p className="text-xs text-stone-400 font-black uppercase tracking-widest mt-1">Enterprise Encryption</p>
             </div>
          </div>

          <form onSubmit={handleSubmit} className="p-10 lg:p-14 space-y-12">
            <div className="bg-orange-50/50 border border-orange-100/50 p-8 rounded-[2rem] flex items-start gap-6 group">
               <div className="w-12 h-12 rounded-2xl bg-orange-100 flex items-center justify-center text-orange-600 group-hover:scale-110 transition-transform">
                  <ShieldAlert size={24} />
               </div>
               <div>
                  <p className="text-orange-900 text-sm font-black tracking-tight mb-1">Global Session Invalidation</p>
                  <p className="text-orange-700/70 text-xs font-bold leading-relaxed uppercase tracking-wide">
                    Updating your password will immediately invalidate all active sessions across all devices. You must re-authenticate with your new private key.
                  </p>
               </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="space-y-2 opacity-50 grayscale pointer-events-none">
                 <div className="flex items-center gap-2 mb-1 px-1">
                    <User size={12} className="text-stone-400" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-stone-400">Node Identity</span>
                 </div>
                 <Input
                   value={user?.name}
                   type="text"
                   placeholder="IDENTITY_NAME"
                 />
              </div>
              <div className="space-y-2 opacity-50 grayscale pointer-events-none">
                 <div className="flex items-center gap-2 mb-1 px-1">
                    <Mail size={12} className="text-stone-400" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-stone-400">Node Email</span>
                 </div>
                 <Input
                   value={user?.email}
                   type="text"
                   placeholder="IDENTITY_EMAIL"
                 />
              </div>

              <div className="space-y-2">
                 <div className="flex items-center gap-2 mb-1 px-1">
                    <Lock size={12} className="text-orange-500" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-orange-500">Current Key</span>
                 </div>
                 <Input
                   value={password}
                   onChange={(e) => setPassword(e.target.value)}
                   type="password"
                   placeholder="••••••••"
                 />
              </div>
              <div className="space-y-2">
                 <div className="flex items-center gap-2 mb-1 px-1">
                    <Zap size={12} className="text-orange-500" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-orange-500">New Private Key</span>
                 </div>
                 <Input
                   value={newPassword}
                   onChange={(e) => setNewPassword(e.target.value)}
                   type="password"
                   placeholder="8+ characters recommended"
                 />
              </div>
            </div>

            <div className="pt-12 border-t border-stone-100 flex justify-end">
               <button 
                 type="submit" 
                 disabled={loading}
                 className="add-btn !bg-orange-500 !shadow-orange-500/20 px-12 py-5 flex items-center gap-3 group !rounded-3xl"
               >
                 {loading ? "Syncing..." : "Commit Changes"}
                 {!loading && <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />}
               </button>
            </div>
          </form>
        </motion.div>

        {/* Security Meta */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
           {[
             { title: "Entropy Check", desc: "8+ characters required", icon: Lock },
             { title: "Layered Defense", icon: ShieldCheck, desc: "End-to-end encryption" },
             { title: "Access Logged", icon: KeyRound, desc: "Audit trail active" }
           ].map((tip, i) => (
             <div key={i} className="flex items-center gap-4 opacity-50 group hover:opacity-100 transition-opacity">
                <div className="w-10 h-10 rounded-xl bg-stone-100 flex items-center justify-center text-stone-500 group-hover:bg-orange-50 group-hover:text-orange-500 transition-colors">
                   <tip.icon size={18} />
                </div>
                <div>
                   <span className="text-[10px] font-black uppercase tracking-widest text-stone-900 block mb-0.5">{tip.title}</span>
                   <span className="text-[11px] font-medium text-stone-400">{tip.desc}</span>
                </div>
             </div>
           ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ChangePassword;
