import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { Mail, Lock, QrCode, ShieldCheck, TrendingUp } from "lucide-react";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", { email, password }, { withCredentials: true });
      if (res.data.user.role === "vendor" || res.data.user.role === "admin") {
        navigate("/dashboard");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 flex">

      {/* ── Left Brand Panel (desktop only) ── */}
      <div className="hidden lg:flex w-[460px] shrink-0 relative overflow-hidden flex-col justify-between p-12 border-r border-zinc-800/50">
        {/* Ambient glows */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-32 -left-32 w-[500px] h-[500px] bg-amber-400/8 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-72 h-72 bg-amber-500/5 rounded-full blur-3xl" />
        </div>

        {/* Brand mark */}
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-16">
            <div className="w-12 h-12 rounded-2xl bg-amber-400 flex items-center justify-center shadow-xl shadow-amber-400/30">
              <span className="text-zinc-950 font-black text-lg">RF</span>
            </div>
            <div>
              <span className="text-white font-bold text-xl tracking-tight">RailFood</span>
              <span className="text-amber-400 font-bold text-xl tracking-tight"> Trace</span>
            </div>
          </div>

          <h2 className="text-white text-4xl font-bold tracking-tight leading-tight mb-4">
            Food Safety<br />
            <span className="text-amber-400">Reimagined</span><br />
            for India.
          </h2>
          <p className="text-zinc-500 text-base leading-relaxed max-w-xs">
            End-to-end traceability for railway food vendors — from kitchen to passenger.
          </p>
        </div>

        {/* Feature bullets */}
        <div className="relative z-10 space-y-4">
          {[
            { icon: <QrCode className="w-4 h-4" />, title: "QR Traceability", desc: "Every batch gets a unique scannable code" },
            { icon: <ShieldCheck className="w-4 h-4" />, title: "Hygiene Compliance", desc: "Track expiry, ingredients & kitchen source" },
            { icon: <TrendingUp className="w-4 h-4" />, title: "Passenger Feedback", desc: "Real-time ratings improve food quality" },
          ].map((f) => (
            <div key={f.title} className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-xl bg-amber-400/10 border border-amber-400/20 flex items-center justify-center text-amber-400 shrink-0 mt-0.5">
                {f.icon}
              </div>
              <div>
                <p className="text-white text-sm font-semibold">{f.title}</p>
                <p className="text-zinc-500 text-xs mt-0.5">{f.desc}</p>
              </div>
            </div>
          ))}
          <div className="pt-5 border-t border-zinc-800/80 text-zinc-600 text-xs tracking-wide">
            INDIAN RAILWAYS · FOOD TRACEABILITY PLATFORM
          </div>
        </div>
      </div>

      {/* ── Right Form Panel ── */}
      <div className="flex-1 flex items-center justify-center p-6 relative">
        {/* Subtle glows */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/3 right-1/3 w-80 h-80 bg-amber-400/4 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 left-1/4 w-48 h-48 bg-amber-500/3 rounded-full blur-3xl" />
        </div>

        <div className="relative w-full max-w-sm">
          {/* Mobile-only logo */}
          <div className="lg:hidden text-center mb-8">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-amber-400 shadow-xl shadow-amber-400/25 mb-3">
              <span className="text-zinc-950 font-black text-xl">RF</span>
            </div>
            <h1 className="text-white text-2xl font-bold tracking-tight">
              RailFood <span className="text-amber-400">Trace</span>
            </h1>
          </div>

          {/* Card */}
          <div className="bg-zinc-900/90 backdrop-blur-sm border border-zinc-800/80 rounded-3xl p-8 shadow-2xl shadow-black/60 ring-1 ring-white/5">
            <div className="mb-7">
              <h2 className="text-white text-2xl font-bold tracking-tight">Welcome back</h2>
              <p className="text-zinc-500 text-sm mt-1.5">Sign in to your vendor account</p>
            </div>

            {error && (
              <div className="bg-red-500/10 border border-red-500/25 text-red-400 text-sm rounded-xl px-4 py-3 mb-5">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-zinc-500 text-xs font-semibold uppercase tracking-widest mb-2 block">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600 pointer-events-none" />
                  <input
                    type="email"
                    placeholder="vendor@railfood.in"
                    value={email}
                    className="w-full bg-zinc-800/70 border border-zinc-700/80 text-white placeholder-zinc-600 rounded-xl pl-10 pr-4 py-3 text-sm focus:outline-none focus:border-amber-400/80 focus:bg-zinc-800 focus:ring-1 focus:ring-amber-400/25 transition-all"
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div>
                <label className="text-zinc-500 text-xs font-semibold uppercase tracking-widest mb-2 block">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600 pointer-events-none" />
                  <input
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    className="w-full bg-zinc-800/70 border border-zinc-700/80 text-white placeholder-zinc-600 rounded-xl pl-10 pr-4 py-3 text-sm focus:outline-none focus:border-amber-400/80 focus:bg-zinc-800 focus:ring-1 focus:ring-amber-400/25 transition-all"
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 disabled:from-amber-400/40 disabled:to-amber-500/40 text-zinc-950 font-bold py-3.5 rounded-xl transition-all duration-200 text-sm tracking-wide mt-1 shadow-lg shadow-amber-400/20 hover:shadow-amber-400/30"
              >
                {loading ? "Signing in..." : "Sign In →"}
              </button>
            </form>

            <div className="mt-7 pt-6 border-t border-zinc-800/60 text-center">
              <p className="text-zinc-600 text-sm">
                Don&apos;t have an account?{" "}
                <Link to="/register" className="text-amber-400 hover:text-amber-300 font-semibold transition-colors">
                  Register here
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
