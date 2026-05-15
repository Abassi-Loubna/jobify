import React, { useState } from "react";
import { Mail, Lock, ShieldCheck } from "lucide-react";

interface Props {
  onLogin: () => void;
}

const AdminLogin: React.FC<Props> = ({
  onLogin,
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] =
    useState("");

  const [error, setError] = useState("");

  const handleSubmit = (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    // SIMPLE FRONTEND AUTH
    if (
      email === "lobna@gmail.com" &&
      password === "lobna123"
    ) {
      localStorage.setItem(
        "admin-auth",
        "true"
      );

      onLogin();
    } else {
      setError("Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] flex items-center justify-center p-6">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-[#0f172a] border border-gray-800 rounded-3xl p-8 text-white"
      >
        <div className="flex justify-center mb-6">
          <div className="bg-cyan-500/20 p-5 rounded-3xl">
            <ShieldCheck
              className="text-cyan-400"
              size={45}
            />
          </div>
        </div>

        <h1 className="text-4xl font-black text-center  from-cyan-400 to-blue-500 bg-clip-text text-transparent">
          Admin Login
        </h1>

        <p className="text-gray-400 text-center mt-3 mb-8">
          Access dashboard securely
        </p>

        {/* EMAIL */}
        <div className="mb-5">
          <label className="text-sm text-gray-400">
            Email
          </label>

          <div className="relative mt-2">
            <Mail
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
              size={18}
            />

            <input
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              className="w-full bg-[#020617] border border-gray-700 rounded-2xl pl-11 pr-4 py-4 outline-none focus:border-cyan-500"
            />
          </div>
        </div>

        {/* PASSWORD */}
        <div className="mb-6">
          <label className="text-sm text-gray-400">
            Password
          </label>

          <div className="relative mt-2">
            <Lock
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
              size={18}
            />

            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              className="w-full bg-[#020617] border border-gray-700 rounded-2xl pl-11 pr-4 py-4 outline-none focus:border-cyan-500"
            />
          </div>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-2xl mb-5">
            {error}
          </div>
        )}

        <button
          type="submit"
          className="w-full from-cyan-500 to-blue-500 hover:opacity-90 transition py-4 rounded-2xl font-bold text-lg"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default AdminLogin;