import { Link } from "react-router-dom";
import { IUser } from "../../types";
import {
  FiGrid,
  FiPlusCircle,
  FiPackage,
  FiMessageCircle,
  FiLogOut,
  FiChevronDown,
  FiUser,
  FiArrowRight,
} from "react-icons/fi";

type Props = {
  data: IUser;
  logout: () => void;
  onClick?: () => void;
};

const User: React.FC<Props> = ({ data, logout, onClick }) => {
  return (
    <div className="flex items-center gap-3 cursor-pointer group relative py-1 px-2 rounded-full hover:bg-bg-secondary transition-all duration-300">
      <div className="relative shrink-0">
        <div className="size-10 rounded-full p-0.5 border-2 border-brand/20 group-hover:border-brand transition-all duration-500 shadow-lg shadow-brand/10">
          <img
            src={data.photo}
            className="w-full h-full rounded-full object-cover"
            alt={data.username}
          />
        </div>
        <span className="absolute bottom-0 right-0 size-3 bg-brand border-2 border-bg-primary rounded-full"></span>
      </div>

      <div className="hidden md:flex flex-col items-start gap-0.5">
        <span className="font-bold text-sm text-text-primary group-hover:text-brand transition-colors">
          {data.username}
        </span>
        <span className="text-[9px] text-brand font-black uppercase tracking-widest bg-brand/10 px-1.5 py-0.5 rounded-md">
          {data.isSeller ? "Pro Seller" : "Buyer Account"}
        </span>
      </div>

      <FiChevronDown className="text-text-muted group-hover:text-brand group-hover:rotate-180 transition-all duration-500" />

      <div className="absolute top-[130%] right-0 w-72 bg-bg-secondary/95 backdrop-blur-2xl border border-border-color rounded-[2.5rem] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.6)] opacity-0 invisible group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 translate-y-4 transition-all duration-500 z-50 overflow-hidden">
        <div className="px-7 py-6 bg-gradient-to-br from-brand/10 via-transparent to-transparent border-b border-border-color">
          <p className="text-[10px] text-brand uppercase font-black tracking-[0.2em] mb-1">
            Authenticated as
          </p>
          <p className="text-text-primary font-bold truncate text-sm">
            {data.email || data.username}
          </p>
        </div>

        <div className="p-3 flex flex-col gap-1.5">
          {data.isSeller && (
            <>
              <Link to="/my-gigs" onClick={onClick} className="nav-dropdown-item group/item">
                <div className="flex items-center gap-4">
                  <div className="p-2 rounded-xl bg-bg-card group-hover/item:bg-brand/20 transition-colors">
                    <FiGrid className="text-lg" />
                  </div>
                  <span className="font-semibold">Dashboard</span>
                </div>
                <FiArrowRight className="opacity-0 group-hover/item:opacity-100 -translate-x-2 group-hover/item:translate-x-0 transition-all" />
              </Link>

              <Link to="/add-gig" onClick={onClick} className="nav-dropdown-item group/item">
                <div className="flex items-center gap-4">
                  <div className="p-2 rounded-xl bg-bg-card group-hover/item:bg-brand/20 transition-colors">
                    <FiPlusCircle className="text-lg" />
                  </div>
                  <span className="font-semibold">Create Service</span>
                </div>
                <FiArrowRight className="opacity-0 group-hover/item:opacity-100 -translate-x-2 group-hover/item:translate-x-0 transition-all" />
              </Link>
              <div className="h-[1px] bg-border-color my-1 mx-4"></div>
            </>
          )}

          <Link to="/" onClick={onClick} className="nav-dropdown-item group/item">
            <div className="flex items-center gap-4">
              <div className="p-2 rounded-xl bg-bg-card group-hover/item:bg-brand/20 transition-colors">
                <FiPackage className="text-lg" />
              </div>
              <span className="font-semibold">Manage Orders</span>
            </div>
          </Link>

          <Link to="/" onClick={onClick} className="nav-dropdown-item group/item justify-between">
            <div className="flex items-center gap-4">
              <div className="p-2 rounded-xl bg-bg-card group-hover/item:bg-brand/20 transition-colors">
                <FiMessageCircle className="text-lg" />
              </div>
              <span className="font-semibold">Messages</span>
            </div>
            <span className="bg-brand text-bg-primary text-[10px] font-black px-2 py-0.5 rounded-full shadow-lg shadow-brand/20">
              3
            </span>
          </Link>

          <Link to="/" onClick={onClick} className="nav-dropdown-item group/item">
            <div className="flex items-center gap-4">
              <div className="p-2 rounded-xl bg-bg-card group-hover/item:bg-brand/20 transition-colors">
                <FiUser className="text-lg" />
              </div>
              <span className="font-semibold">Settings</span>
            </div>
          </Link>

          <div className="h-[1px] bg-border-color my-1 mx-4"></div>

          <button
            onClick={() => {
              logout();
              onClick?.();
            }}
            className="nav-dropdown-item group/item text-red-400 hover:bg-red-500/10 hover:text-red-300"
          >
            <div className="flex items-center gap-4">
              <div className="p-2 rounded-xl bg-red-500/10 group-hover/item:bg-red-500/20 transition-colors">
                <FiLogOut className="text-lg" />
              </div>
              <span className="font-bold uppercase tracking-wider text-xs">
                Sign Out
              </span>
            </div>
          </button>
        </div>
      </div>

      <style>{`
        .nav-dropdown-item {
          @apply flex items-center justify-between gap-3 px-3 py-2 rounded-[1.2rem] text-sm text-text-secondary transition-all duration-300 hover:bg-bg-card hover:text-brand;
        }
      `}</style>
    </div>
  );
};

export default User;