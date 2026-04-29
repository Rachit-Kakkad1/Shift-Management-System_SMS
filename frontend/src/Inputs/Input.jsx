import { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";

const Input = ({ value, onChange, label, placeholder, type }) => {
  const [showPassword, setShowPassword] = useState(false);
  const inputId = label ? `input-${label.replace(/\s+/g, '-').toLowerCase()}` : `input-${Math.random()}`;

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  
  return (
    <div className="flex flex-col gap-2">
      {label && (
        <label htmlFor={inputId} className="text-xs font-bold text-stone-700 uppercase tracking-wider ml-1">
          {label}
        </label>
      )}
      <div className="relative group">
        <div className="absolute inset-0 bg-stone-900/5 rounded-2xl blur-xl group-focus-within:bg-indigo-600/5 transition-all"></div>
        <div className="relative flex items-center bg-white border border-stone-200 rounded-2xl px-5 py-3.5 transition-all duration-300 focus-within:border-indigo-500 focus-within:ring-4 focus-within:ring-indigo-500/5 shadow-sm group-hover:border-stone-300">
          <input
            id={inputId}
            type={
              type === "password" ? (showPassword ? "text" : "password") : type
            }
            placeholder={placeholder}
            className="w-full bg-transparent outline-none text-stone-900 text-[15px] font-medium placeholder:text-stone-400 placeholder:font-normal"
            value={value}
            onChange={(e) => onChange(e)}
          />
          {type === "password" && (
            <button
              type="button"
              onClick={toggleShowPassword}
              className="ml-2 text-stone-400 hover:text-stone-900 transition-colors focus:outline-none"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? (
                <FaRegEye size={20} />
              ) : (
                <FaRegEyeSlash size={20} />
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Input;
