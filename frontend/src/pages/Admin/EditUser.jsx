import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import Input from "../../Inputs/Input";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATH } from "../../utils/apiPath";
import { validateEmail } from "../../utils/helper";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { UserCog, ArrowLeft, ShieldCheck, Briefcase, ToggleLeft } from "lucide-react";

const EditUser = () => {
  const { id } = useParams();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [team, setTeam] = useState("");
  const [workType, setWorkType] = useState("");
  const [isActive, setIsActive] = useState(true);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const getUserInfo = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(
        API_PATH.USERS.GET_USER_BY_ID(id),
      );
      if (response.data) {
        const user = response.data;
        setName(user.name);
        setEmail(user.email);
        setTeam(user.team);
        setWorkType(user.workType);
        setIsActive(user.isActive);
      }
    } catch (error) {
      toast.error("Error fetching user data");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!name) {
      toast.error("Please enter the full name");
      setLoading(false);
      return;
    }

    if (!validateEmail(email)) {
      toast.error("Please enter a valid email address");
      setLoading(false);
      return;
    }

    try {
      const response = await axiosInstance.put(
        API_PATH.USERS.UPDATE_USER_BY_ID(id),
        { name, email, team, workType, isActive },
      );

      if (response.status === 200) {
        toast.success("Member updated successfully");
        navigate("/admin/users");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Update failed");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUserInfo();
  }, [id]);

  return (
    <div className="py-6 space-y-10 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
           <button 
             onClick={() => navigate("/admin/users")}
             className="w-12 h-12 rounded-2xl bg-white border border-stone-200 flex items-center justify-center text-stone-500 hover:text-stone-900 hover:shadow-lg transition-all"
           >
             <ArrowLeft size={20} />
           </button>
           <div>
             <h1 className="text-3xl font-bold text-stone-900 tracking-tight">Edit Member</h1>
             <p className="text-stone-500 font-medium mt-0.5">Update account details and permissions for {name || "User"}</p>
           </div>
        </div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card !p-0 overflow-hidden shadow-2xl shadow-stone-200/40"
      >
        <div className="p-8 border-b border-stone-100 bg-stone-50/50 flex items-center gap-4">
           <div className="w-12 h-12 rounded-2xl bg-stone-900 flex items-center justify-center text-white">
              <UserCog size={24} />
           </div>
           <div>
              <h3 className="font-bold text-stone-900">Account Configuration</h3>
              <p className="text-xs text-stone-400 font-bold uppercase tracking-widest mt-0.5">ID: {id.slice(-6)}</p>
           </div>
        </div>

        <form onSubmit={handleUpdate} className="p-8 md:p-10 space-y-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              label="Full Name"
              placeholder="e.g. Johnathan Smith"
              type="text"
            />
            <Input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              label="Work Email"
              placeholder="jsmith@company.com"
              type="text"
            />
            
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold text-stone-700 uppercase tracking-wider ml-1">Team Assignment</label>
              <div className="relative group">
                <select
                  value={team}
                  onChange={(e) => setTeam(e.target.value)}
                  className="w-full bg-white border border-stone-200 rounded-2xl px-5 py-3.5 text-stone-900 text-[15px] font-medium outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/5 transition-all appearance-none cursor-pointer"
                >
                  <option value="">Select Team</option>
                  <option value="sozialbetreuer">Social Caregiver</option>
                  <option value="sozialarbeiter">Social Worker</option>
                  <option value="sozialbetreuerhelfer">Social Caregiver Assistant</option>
                </select>
                <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-stone-400">
                   <ShieldCheck size={18} />
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold text-stone-700 uppercase tracking-wider ml-1">Work Type</label>
              <div className="relative group">
                <select
                  value={workType}
                  onChange={(e) => setWorkType(e.target.value)}
                  className="w-full bg-white border border-stone-200 rounded-2xl px-5 py-3.5 text-stone-900 text-[15px] font-medium outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/5 transition-all appearance-none cursor-pointer"
                >
                  <option value="">Select Type</option>
                  <option value="full-time">Full-time</option>
                  <option value="part-time">Part-time</option>
                </select>
                <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-stone-400">
                   <Briefcase size={18} />
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold text-stone-700 uppercase tracking-wider ml-1">Account Status</label>
            <div className="relative group max-w-md">
              <select
                value={isActive}
                onChange={(e) => setIsActive(e.target.value === "true")}
                className="w-full bg-white border border-stone-200 rounded-2xl px-5 py-3.5 text-stone-900 text-[15px] font-medium outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/5 transition-all appearance-none cursor-pointer"
              >
                <option value={true}>Active (Authorized Access)</option>
                <option value={false}>Inactive (Access Revoked)</option>
              </select>
              <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-stone-400">
                 <ToggleLeft size={18} />
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-stone-100 flex justify-end gap-4">
             <button 
               type="button" 
               onClick={() => navigate("/admin/users")}
               className="px-8 py-4 rounded-2xl text-stone-500 font-bold hover:bg-stone-50 transition-all"
             >
               Cancel
             </button>
             <button 
               type="submit" 
               disabled={loading}
               className="btn-primary !w-auto px-10 py-4 shadow-xl shadow-indigo-200"
             >
               {loading ? "Saving..." : "Update Member"}
             </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default EditUser;
