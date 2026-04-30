import { useState, useContext, useEffect } from "react";
import { useNavigate, useLocation } from "react-router";
import axiosInstance from "../utils/axiosInstance";
import { API_PATH } from "../utils/apiPath";
import { UserContext } from "../context/UserContext";
import toast from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldCheck, ArrowRight, Fingerprint, Lock, ShieldAlert } from "lucide-react";

const Passcode = () => {
  const [passcode, setPasscode] = useState(["", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const { user, updateUser } = useContext(UserContext);
  const navigate = useNavigate();
  const location = useLocation();
  const { email, twoFactorSessionId } = location.state || {};

  const handleChange = (index, value) => {
    if (isNaN(value)) return;
    const newPasscode = [...passcode];
    newPasscode[index] = value.slice(-1);
    setPasscode(newPasscode);

    if (value && index < 3) {
      document.getElementById(`code-${index + 1}`).focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !passcode[index] && index > 0) {
      document.getElementById(`code-${index - 1}`).focus();
    }
  };

  const handleVerify = async (e) => {
    e?.preventDefault();
    const codeString = passcode.join("");
    if (codeString.length < 4) {
      toast.error("Please enter the full 4-digit code");
      return;
    }

    setLoading(true);
    try {
      const response = await axiosInstance.post(API_PATH.AUTH.VERIFY_PASSCODE, {
        email,
        twoFactorSessionId,
        passcode: codeString,
      });

      if (response.status === 200) {
        toast.success("Identity Verified", {
          icon: '🛡️',
          style: { borderRadius: '16px', background: '#1c1917', color: '#fff' }
        });
        
        const userData = response.data;
        updateUser(userData);
        
        if (userData.role === "admin") {
          navigate("/admin/dashboard");
        } else {
          navigate("/user/dashboard");
        }
      }
    } catch (error) {
      console.error("Verification error:", error);
      toast.error(error.response?.data?.message || "Verification failed");
      setPasscode(["", "", "", ""]);
      document.getElementById("code-0").focus();
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (passcode.every(char => char !== "")) {
      handleVerify();
    }
  }, [passcode]);

  return (
    <div className="min-h-screen bg-[#fcfcfc] flex items-center justify-center p-6 selection:bg-orange-100">
      {/* Mesh Background */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-40">
        <div className="absolute top-0 -left-4 w-96 h-96 bg-orange-400 rounded-full mix-blend-multiply filter blur-[128px] animate-pulse"></div>
        <div className="absolute bottom-0 -right-4 w-96 h-96 bg-amber-300 rounded-full mix-blend-multiply filter blur-[128px] animate-pulse delay-700"></div>
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 w-full max-w-md"
      >
        <div className="text-center mb-12">
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
            className="w-20 h-20 bg-stone-900 rounded-[2rem] flex items-center justify-center mx-auto mb-8 shadow-2xl shadow-stone-900/20 group"
          >
            <ShieldCheck className="text-orange-500 w-10 h-10 group-hover:scale-110 transition-transform duration-500" />
          </motion.div>
          <h1 className="text-4xl font-black text-stone-900 tracking-tight mb-3">Security Verification</h1>
          <p className="text-stone-500 font-medium">Hello, <span className="text-stone-900 font-bold">{user?.name || "Admin"}</span>. Please enter your secure 4-digit passcode to continue.</p>
        </div>

        <div className="glass-card !p-10 !bg-white/90 shadow-2xl shadow-orange-500/5 border-orange-100/50">
          <form onSubmit={handleVerify} className="space-y-10">
            <div className="flex justify-between gap-4">
              {passcode.map((digit, index) => (
                <motion.input
                  key={index}
                  id={`code-${index}`}
                  type="text"
                  maxLength="1"
                  value={digit}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  onChange={(e) => handleChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  className="w-full h-20 text-center text-3xl font-black text-stone-900 bg-stone-50 border-2 border-stone-100 rounded-3xl outline-none focus:border-orange-500 focus:ring-8 focus:ring-orange-500/5 focus:bg-white transition-all duration-500"
                  autoFocus={index === 0}
                />
              ))}
            </div>

            <div className="space-y-6">
               <button
                type="submit"
                disabled={loading}
                className="w-full py-5 bg-stone-900 text-white rounded-3xl font-black text-[15px] uppercase tracking-widest flex items-center justify-center gap-3 shadow-2xl shadow-stone-900/20 hover:bg-stone-800 hover:-translate-y-1 active:translate-y-0 transition-all duration-500 disabled:opacity-50 group"
              >
                {loading ? "Authenticating..." : "Authorize Access"}
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>

              <div className="flex items-center justify-center gap-6 pt-2">
                 <div className="flex items-center gap-2 text-stone-400 group cursor-pointer hover:text-stone-900 transition-colors">
                    <Fingerprint size={18} className="group-hover:scale-110 transition-transform" />
                    <span className="text-[11px] font-black uppercase tracking-widest">Biometric</span>
                 </div>
                 <div className="w-1 h-1 rounded-full bg-stone-200"></div>
                 <div className="flex items-center gap-2 text-stone-400 group cursor-pointer hover:text-stone-900 transition-colors">
                    <Lock size={18} className="group-hover:scale-110 transition-transform" />
                    <span className="text-[11px] font-black uppercase tracking-widest">Forgot?</span>
                 </div>
              </div>
            </div>
          </form>
        </div>

        {/* Footer Security Note */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="mt-12 flex items-center justify-center gap-3 py-4 px-6 bg-orange-50/50 rounded-2xl border border-orange-100/50 w-fit mx-auto"
        >
           <ShieldAlert size={16} className="text-orange-600" />
           <p className="text-[11px] font-bold text-orange-800 uppercase tracking-tight">End-to-end encrypted session. Your data is protected.</p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Passcode;
