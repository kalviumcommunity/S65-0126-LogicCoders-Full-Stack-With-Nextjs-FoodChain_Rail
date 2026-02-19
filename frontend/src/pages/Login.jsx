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
      <div className="hidden lg:flex w-[520px] shrink-0 relative overflow-hidden flex-col justify-between p-14 border-r border-zinc-800/40">
        {/* Ambient glows */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-amber-400/6 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-80 h-80 bg-amber-500/4 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-amber-400/3 rounded-full blur-3xl" />
        </div>

        {/* Brand mark */}
        <div className="relative z-10">
          <div className="flex items-center gap-3.5 mb-20">
            <div className="w-11 h-11 rounded-2xl bg-amber-400 flex items-center justify-center shadow-xl shadow-amber-400/40">
              <span className="text-zinc-950 font-black text-base tracking-tight">RF</span>
            </div>
            <div className="leading-none">
              <span className="text-white font-bold text-xl tracking-tight">RailFood</span>
              <span className="text-amber-400 font-bold text-xl tracking-tight"> Trace</span>
            </div>
          </div>

          <div className="mb-8">
            <span className="inline-flex items-center gap-2 bg-amber-400/10 border border-amber-400/20 text-amber-400 text-xs font-semibold px-3 py-1.5 rounded-full mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
              LIVE PLATFORM
            </span>
            <h2 className="text-white text-5xl font-black tracking-tight leading-[1.1] mb-5">
              Food Safety<br />
              <span className="text-amber-400">Reimagined</span><br />
              for India.
            </h2>
            <p className="text-zinc-400 text-base leading-relaxed max-w-xs">
              End-to-end traceability for railway food vendors — from kitchen to passenger.
            </p>
          </div>
        </div>

        {/* Feature bullets */}
        <div className="relative z-10">
          <div className="space-y-3 mb-8">
            {[
              { icon: <QrCode className="w-4 h-4" />, title: "QR Traceability", desc: "Every batch gets a unique scannable code" },
              { icon: <ShieldCheck className="w-4 h-4" />, title: "Hygiene Compliance", desc: "Track expiry, ingredients & kitchen source" },
              { icon: <TrendingUp className="w-4 h-4" />, title: "Passenger Feedback", desc: "Real-time ratings improve food quality" },
            ].map((f) => (
              <div key={f.title} className="flex items-center gap-4 bg-zinc-900/40 border border-zinc-800/60 rounded-2xl px-4 py-3.5">
                <div className="w-9 h-9 rounded-xl bg-amber-400/10 border border-amber-400/15 flex items-center justify-center text-amber-400 shrink-0">
                  {f.icon}
                </div>
                <div>
                  <p className="text-white text-sm font-semibold leading-none mb-0.5">{f.title}</p>
                  <p className="text-zinc-500 text-xs">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="border-t border-zinc-800/60 pt-5 text-zinc-600 text-xs font-medium tracking-widest uppercase">
            Indian Railways · Food Traceability Platform
          </div>
        </div>
      </div>

      {/* ── Right Form Panel ── */}
      <div className="flex-1 flex items-center justify-center p-6 relative">
        {/* Subtle glows */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-amber-400/4 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-amber-500/3 rounded-full blur-3xl" />
        </div>

        <div className="relative w-full max-w-[400px]">

          {/* Mobile-only logo */}
          <div className="lg:hidden text-center mb-10">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-amber-400 shadow-xl shadow-amber-400/30 mb-4">
              <span className="text-zinc-950 font-black text-xl">RF</span>
            </div>
            <h1 className="text-white text-3xl font-black tracking-tight">
              RailFood <span className="text-amber-400">Trace</span>
            </h1>
            <p className="text-zinc-500 text-sm mt-1.5">Food Safety Platform</p>
          </div>

          {/* Heading above card */}
          <div className="mb-8">
            <h2 className="text-white text-4xl font-black tracking-tight leading-tight">
              Welcome<br />back.
            </h2>
            <p className="text-zinc-500 text-base mt-3">
              Sign in to manage your food batches and track passenger feedback.
            </p>
          </div>

          {/* Card */}
          <div className="bg-zinc-900/80 backdrop-blur-sm border border-zinc-800/70 rounded-3xl p-8 shadow-2xl shadow-black/50 ring-1 ring-white/5">

            {error && (
              <div className="bg-red-500/10 border border-red-500/25 text-red-400 text-sm rounded-2xl px-4 py-3.5 mb-6 flex items-start gap-2.5">
                <span className="mt-0.5 shrink-0">⚠</span>
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="text-zinc-400 text-xs font-bold uppercase tracking-widest mb-2.5 block">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600 pointer-events-none" />
                  <input
                    type="email"
                    placeholder="vendor@railfood.in"
                    value={email}
                    className="w-full bg-zinc-800/60 border border-zinc-700/70 text-white placeholder-zinc-600 rounded-2xl pl-11 pr-4 py-3.5 text-sm focus:outline-none focus:border-amber-400/70 focus:bg-zinc-800 focus:ring-2 focus:ring-amber-400/20 transition-all"
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div>
                <label className="text-zinc-400 text-xs font-bold uppercase tracking-widest mb-2.5 block">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600 pointer-events-none" />
                  <input
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    className="w-full bg-zinc-800/60 border border-zinc-700/70 text-white placeholder-zinc-600 rounded-2xl pl-11 pr-4 py-3.5 text-sm focus:outline-none focus:border-amber-400/70 focus:bg-zinc-800 focus:ring-2 focus:ring-amber-400/20 transition-all"
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 disabled:from-amber-400/40 disabled:to-amber-500/40 disabled:cursor-not-allowed text-zinc-950 font-black py-4 rounded-2xl transition-all duration-200 text-sm tracking-wide shadow-lg shadow-amber-400/25 hover:shadow-amber-400/40 hover:-translate-y-0.5 mt-1"
              >
                {loading ? "Signing in..." : "Sign In →"}
              </button>
            </form>

            <div className="mt-7 pt-6 border-t border-zinc-800/50 text-center">
              <p className="text-zinc-500 text-sm">
                Don&apos;t have an account?{" "}
                <Link to="/register" className="text-amber-400 hover:text-amber-300 font-bold transition-colors">
                  Register here
                </Link>
                {" · "}
                <Link to="/" className="text-zinc-500 hover:text-zinc-300 font-medium transition-colors">
                  Home
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
