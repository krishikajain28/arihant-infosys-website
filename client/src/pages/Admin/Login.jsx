import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaLock, FaShieldAlt } from "react-icons/fa";

const Login = () => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    if (password === import.meta.env.VITE_ADMIN_KEY) {
      localStorage.setItem("isAdmin", "true"); // Save the "Key" to browser memory
      navigate("/admin"); // Unlock the door
    } else {
      setError(true);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 p-8 rounded-2xl shadow-2xl w-full max-w-md text-center relative overflow-hidden">
        {/* Decorative Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-32 bg-emerald-500/20 blur-[50px] rounded-full pointer-events-none"></div>

        <div className="relative z-10">
          <div className="bg-slate-800 inline-block p-4 rounded-full border border-slate-700 mb-6 shadow-lg">
            <FaShieldAlt className="text-4xl text-emerald-500" />
          </div>

          <h2 className="text-2xl font-bold text-white mb-2">
            Restricted Access
          </h2>
          <p className="text-slate-400 mb-8 text-sm">
            Enter the Admin Security Key to manage inventory.
          </p>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="relative">
              <FaLock className="absolute left-4 top-3.5 text-slate-500" />
              <input
                type="password"
                placeholder="Security Key"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError(false);
                }}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-emerald-500 transition-all placeholder-slate-600"
              />
            </div>

            {error && (
              <p className="text-red-500 text-xs font-bold animate-pulse">
                ⛔ Access Denied. Invalid Key.
              </p>
            )}

            <button className="w-full bg-emerald-500 hover:bg-emerald-600 text-black font-bold py-3 rounded-xl transition-all shadow-lg shadow-emerald-500/20">
              Unlock Dashboard
            </button>
          </form>

          <p className="text-slate-600 text-xs mt-6">
            System ID: ARIHANT-SECURE-V1
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
