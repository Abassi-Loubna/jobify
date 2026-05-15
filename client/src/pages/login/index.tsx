import { FormEvent, useContext, useState } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../context/authContext";
import { ILoginUser } from "../../types";

const Login = () => {
  const { login } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const user = Object.fromEntries(formData.entries());

    try {
      await login(user as unknown as ILoginUser);
    } catch (err: any) {
      console.error("❌ Login failed:", err.message);
    } finally {
      setLoading(false);
    }
  };

  // تحديث الـ Input Style لاستخدام المتغيرات
  const inputStyle = `
    w-full bg-bg-primary border border-border-color text-sm text-text-primary rounded-xl p-3 outline-none 
    focus:border-brand focus:ring-1 focus:ring-brand transition-all 
    placeholder:text-text-muted autofill:bg-bg-primary
  `;

  return (
    // استخدام bg-primary للخلفية و text-primary للنصوص
    <div className="min-h-screen flex items-center justify-center bg-bg-primary p-4 text-text-primary font-sans relative transition-colors duration-300">
      
      {/* خلفية جمالية باستخدام لون البراند */}
      <div className="absolute inset-0 overflow-hidden -z-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-brand/5 blur-[120px] rounded-full"></div>
      </div>

      {/* الكارد الرئيسي: استخدام bg-card و border-color */}
      <div className="w-full max-w-md bg-bg-card/60 backdrop-blur-xl border border-border-color rounded-3xl p-8 shadow-2xl">
        
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-brand to-cyan-400 bg-clip-text text-transparent">
            Welcome Back
          </h1>
          <p className="text-text-muted mt-2 text-sm italic">Log in to your Jobify account</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6" autoComplete="off">
       
          <div className="space-y-2">
            <label className="text-[11px] font-bold text-text-secondary uppercase tracking-wider ml-1">
              Username
            </label>
            <input 
              name="username" 
              placeholder="Enter your username" 
              required 
              className={inputStyle} 
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center px-1">
              <label className="text-[11px] font-bold text-text-secondary uppercase tracking-wider">
                Password
              </label>
              <Link to="/forgot-password"  className="text-[10px] text-brand hover:underline uppercase">
                Forgot?
              </Link>
            </div>
            <input 
              name="password" 
              type="password" 
              placeholder="••••••••" 
              required 
              className={inputStyle}
            />
          </div>

          <div className="pt-2">
            <button 
              disabled={loading}
              type="submit" 
              // الزر يستخدم ألوان البراند
              className={`w-full py-3.5 ${loading ? 'bg-text-muted' : 'bg-brand hover:bg-brand-hover'} text-white font-extrabold rounded-xl shadow-lg transition-all active:scale-[0.98] uppercase tracking-widest text-sm flex justify-center items-center`}
            >
              {loading ? "Authenticating..." : "Sign In"}
            </button>
          </div>

          <p className="text-center text-sm text-text-muted mt-6">
            New to Jobify? 
            <Link to="/register" className="text-brand font-bold ml-2 hover:text-brand-hover transition-colors">
              Create Account
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;