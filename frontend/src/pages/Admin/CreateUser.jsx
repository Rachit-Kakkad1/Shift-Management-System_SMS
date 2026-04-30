import { useState } from "react";
import { useNavigate } from "react-router";
import { validateEmail } from "../../utils/helper";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATH } from "../../utils/apiPath";
import Input from "../../Inputs/Input";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { UserPlus, ArrowLeft, ShieldCheck, Mail, Lock, User, Users } from "lucide-react";

const CreateUsers = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [team, setTeam] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("employee");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    if (!name) {
      toast.error("Please enter the full name");
      return;
    }

    if (!password) {
      toast.error("Please enter the password");
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await axiosInstance.post(API_PATH.AUTH.REGISTER, {
        name,
        email,
        password,
        team,
        role,
      });

      if (response.data.token) {
        toast.success(`${role.toUpperCase()} created successfully!`);
        navigate("/admin/users");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-12 pb-20 max-w-5xl mx-auto">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
        <div className="flex items-center gap-6">
           <button 
             onClick={() => navigate(-1)}
             className="w-14 h-14 rounded-2xl bg-white border border-stone-100 flex items-center justify-center text-stone-400 hover:text-orange-500 hover:shadow-2xl hover:shadow-orange-500/10 transition-all duration-500 group"
           >
             <ArrowLeft size={24} className="group-hover:-translate-x-1 transition-transform" />
           </button>
           <div>
             <h1 className="text-4xl font-black text-stone-900 tracking-tighter">Onboard Member</h1>
             <p className="text-stone-500 font-medium">Initialize a new identity node within the ecosystem</p>
           </div>
        </div>
        
        <div className="px-6 py-3 bg-white border border-stone-100 rounded-2xl shadow-xl shadow-stone-200/40 text-[10px] font-black uppercase tracking-widest text-orange-500 flex items-center gap-3">
           <div className="w-2 h-2 rounded-full bg-orange-500 animate-pulse"></div>
           System Ready
        </div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        className="card !p-0 overflow-hidden shadow-2xl shadow-orange-500/5 border-stone-100/60"
      >
        <div className="p-10 border-b border-stone-100 bg-stone-50/30 flex items-center gap-6">
           <div className="w-14 h-14 rounded-2xl bg-orange-500 flex items-center justify-center text-white shadow-xl shadow-orange-500/20">
              <UserPlus size={28} />
           </div>
           <div>
              <h3 className="text-2xl font-black text-stone-900 tracking-tight">Identity Parameters</h3>
              <p className="text-xs text-stone-400 font-black uppercase tracking-widest mt-1">Access Tier: {role.toUpperCase()}</p>
           </div>
        </div>

        <form onSubmit={handleSignUp} className="p-10 lg:p-14 space-y-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="space-y-2">
               <div className="flex items-center gap-2 mb-1 px-1">
                  <User size={12} className="text-orange-500" />
                  <span className="text-[10px] font-black uppercase tracking-widest text-orange-500">Legal Name</span>
               </div>
               <Input
                 value={name}
                 onChange={(e) => setName(e.target.value)}
                 placeholder="e.g. Alexander Pierce"
                 type="text"
               />
            </div>
            <div className="space-y-2">
               <div className="flex items-center gap-2 mb-1 px-1">
                  <Mail size={12} className="text-orange-500" />
                  <span className="text-[10px] font-black uppercase tracking-widest text-orange-500">Node Email</span>
               </div>
               <Input
                 value={email}
                 onChange={(e) => setEmail(e.target.value)}
                 placeholder="identity@shiftsync.com"
                 type="text"
               />
            </div>
            <div className="space-y-2">
               <div className="flex items-center gap-2 mb-1 px-1">
                  <Lock size={12} className="text-orange-500" />
                  <span className="text-[10px] font-black uppercase tracking-widest text-orange-500">Initial Private Key</span>
               </div>
               <Input
                 value={password}
                 onChange={(e) => setPassword(e.target.value)}
                 placeholder="Min. 8 characters"
                 type="password"
               />
            </div>
            
            <div className="space-y-2">
               <div className="flex items-center gap-2 mb-1 px-1">
                  <ShieldCheck size={12} className="text-orange-500" />
                  <span className="text-[10px] font-black uppercase tracking-widest text-orange-500">System Role</span>
               </div>
               <div className="relative group">
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full bg-white border border-stone-100 rounded-[1.5rem] px-6 py-4 text-stone-900 text-sm font-black outline-none focus:border-orange-500/30 focus:ring-8 focus:ring-orange-500/5 transition-all appearance-none cursor-pointer shadow-sm hover:border-stone-200"
                >
                  <option value="employee">EMPLOYEE</option>
                  <option value="hr">HR_MANAGER</option>
                  <option value="admin">SYSTEM_ADMIN</option>
                </select>
                <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-stone-300 group-hover:text-orange-500 transition-colors">
                   <ShieldCheck size={20} />
                </div>
              </div>
            </div>

            <div className="space-y-2">
               <div className="flex items-center gap-2 mb-1 px-1">
                  <Users size={12} className="text-orange-500" />
                  <span className="text-[10px] font-black uppercase tracking-widest text-orange-500">Department Allocation</span>
               </div>
               <div className="relative group">
                <select
                  value={team}
                  onChange={(e) => setTeam(e.target.value)}
                  className="w-full bg-white border border-stone-100 rounded-[1.5rem] px-6 py-4 text-stone-900 text-sm font-black outline-none focus:border-orange-500/30 focus:ring-8 focus:ring-orange-500/5 transition-all appearance-none cursor-pointer shadow-sm hover:border-stone-200"
                >
                  <option value="">SELECT_DEPARTMENT</option>
                  <option value="sozialbetreuer">Social Caregiver</option>
                  <option value="sozialarbeiter">Social Worker</option>
                  <option value="sozialbetreuerhelfer">Social Caregiver Assistant</option>
                </select>
                <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-stone-300 group-hover:text-orange-500 transition-colors">
                   <Users size={20} />
                </div>
              </div>
            </div>
          </div>

          <div className="pt-12 border-t border-stone-100 flex justify-end gap-6">
             <button 
               type="button" 
               onClick={() => navigate(-1)}
               className="px-10 py-5 rounded-3xl text-stone-400 font-black uppercase tracking-widest text-[11px] hover:bg-stone-50 hover:text-stone-900 transition-all duration-500"
             >
               Discard
             </button>
             <button 
               type="submit" 
               disabled={isSubmitting}
               className="add-btn !bg-orange-500 !shadow-orange-500/20 px-12 py-5 flex items-center gap-3 group !rounded-3xl"
             >
               {isSubmitting ? "Processing..." : "Deploy Identity"}
               {!isSubmitting && <UserPlus size={20} className="group-hover:rotate-12 transition-transform" />}
             </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default CreateUsers;
