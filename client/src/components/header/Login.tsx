import { Link } from "react-router-dom";
import { FiArrowUpRight } from "react-icons/fi";

type LoginProps = {
  vertical?: boolean;
  onClick?: () => void;
};

const Login: React.FC<LoginProps> = ({ vertical = false, onClick }) => {
  return (
    <div
      className={`flex ${
        vertical
          ? "flex-col items-center gap-4 w-full"
          : "items-center gap-4 md:gap-6"
      } font-bold text-[13px] md:text-[14px]`}
    >
      <Link
        to="/login"
        onClick={onClick}
        className={`group relative flex items-center gap-2 py-1 text-white transition-all duration-300 hover:text-emerald-400 ${
          vertical ? "w-full justify-center" : ""
        }`}
      >
        <span>Sign In</span>
        <span className="absolute bottom-0 left-0 h-[2px] w-0 bg-emerald-500 transition-all duration-300 group-hover:w-full"></span>
      </Link>

      <Link
        to="/register"
        onClick={onClick}
        className={`group relative flex items-center gap-2 overflow-hidden rounded-full 
        bg-emerald-500 px-5 md:px-7 py-2 md:py-2.5 text-[#020617] transition-all duration-500 
        hover:bg-emerald-400 hover:shadow-[0_0_20px_rgba(16,185,129,0.4)] 
        active:scale-95 border border-emerald-400/20 ${
          vertical ? "w-full justify-center" : ""
        }`}
      >
        <div className="absolute inset-0 bg-gradient-to-tr from-emerald-600 to-emerald-400 opacity-0 transition-opacity duration-500 group-hover:opacity-100"></div>

        <span className="relative z-10 font-extrabold uppercase tracking-tight">
          Join Now
        </span>

        <div className="relative z-10 rounded-full bg-[#020617]/10 p-1 transition-colors group-hover:bg-[#020617]/20">
          <FiArrowUpRight className="text-base md:text-lg transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </div>

        <div className="absolute inset-0 h-full w-full -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent group-hover:animate-[shimmer_2s_infinite]"></div>
      </Link>
    </div>
  );
};

export default Login;