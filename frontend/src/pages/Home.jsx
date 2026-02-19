import { Link } from "react-router-dom";
import { QrCode, ShieldCheck, TrendingUp, ArrowRight, Star, Train, Users, ScanLine, ChevronDown, Sparkles, BadgeCheck } from "lucide-react";

/* ── Inline keyframe animations injected once ── */
const styles = `
  @keyframes float-slow { 0%,100%{transform:translateY(0px)} 50%{transform:translateY(-22px)} }
  @keyframes float-slower { 0%,100%{transform:translateY(0px)} 50%{transform:translateY(-14px)} }
  @keyframes shimmer {
    0%   { background-position: -200% center; }
    100% { background-position: 200% center; }
  }
  @keyframes fade-up {
    from { opacity:0; transform:translateY(28px); }
    to   { opacity:1; transform:translateY(0);    }
  }
  @keyframes fade-in {
    from { opacity:0; }
    to   { opacity:1; }
  }
  @keyframes scale-in {
    from { opacity:0; transform:scale(0.92); }
    to   { opacity:1; transform:scale(1);    }
  }
  @keyframes blob {
    0%,100% { transform: translate(0,0)    scale(1);     }
    33%      { transform: translate(30px,-20px) scale(1.08); }
    66%      { transform: translate(-20px,20px) scale(0.94); }
  }
  @keyframes glow-pulse {
    0%,100% { opacity: 0.5; }
    50%     { opacity: 1;   }
  }
  @keyframes marquee {
    from { transform: translateX(0); }
    to   { transform: translateX(-50%); }
  }
  .anim-fade-up   { animation: fade-up   0.7s ease both; }
  .anim-fade-in   { animation: fade-in   0.6s ease both; }
  .anim-scale-in  { animation: scale-in  0.6s ease both; }
  .delay-100 { animation-delay: 0.1s; }
  .delay-200 { animation-delay: 0.2s; }
  .delay-300 { animation-delay: 0.3s; }
  .delay-400 { animation-delay: 0.4s; }
  .delay-500 { animation-delay: 0.5s; }
  .delay-600 { animation-delay: 0.6s; }
  .shimmer-text {
    background: linear-gradient(
      90deg,
      #fcd34d 0%,
      #fbbf24 20%,
      #fff7e6 40%,
      #fbbf24 60%,
      #f59e0b 80%,
      #fcd34d 100%
    );
    background-size: 200% auto;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    animation: shimmer 4s linear infinite;
  }
`;

function Home() {
  return (
    <>
      <style>{styles}</style>
      <div className="min-h-screen bg-zinc-950 flex flex-col overflow-x-hidden">

        {/* ── Layered Background ── */}
        <div className="fixed inset-0 pointer-events-none">
          {/* Main radial glow */}
          <div className="absolute -top-60 left-1/2 -translate-x-1/2 w-[1100px] h-[700px] bg-amber-400/8 rounded-full blur-3xl"
            style={{ animation: "glow-pulse 6s ease-in-out infinite" }} />
          {/* Floating orbs */}
          <div className="absolute top-1/4 left-[8%] w-72 h-72 bg-amber-400/5 rounded-full blur-3xl"
            style={{ animation: "blob 12s ease-in-out infinite" }} />
          <div className="absolute top-1/3 right-[6%] w-64 h-64 bg-amber-500/4 rounded-full blur-3xl"
            style={{ animation: "blob 15s ease-in-out infinite 2s" }} />
          <div className="absolute bottom-1/4 left-1/3 w-80 h-80 bg-amber-300/4 rounded-full blur-3xl"
            style={{ animation: "blob 18s ease-in-out infinite 4s" }} />
          {/* Grain noise overlay */}
          <div className="absolute inset-0 opacity-[0.025]"
            style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")", backgroundRepeat: "repeat", backgroundSize: "128px 128px" }} />
        </div>

        {/* ── Navbar ── */}
        <header className="relative z-20 flex items-center justify-between px-8 py-5 border-b border-zinc-800/40 bg-zinc-950/70 backdrop-blur-2xl anim-fade-in">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-400 flex items-center justify-center shadow-lg shadow-amber-400/40"
              style={{ animation: "float-slower 5s ease-in-out infinite" }}>
              <span className="text-zinc-950 font-black text-sm">RF</span>
            </div>
            <div>
              <span className="text-white font-bold text-lg tracking-tight">RailFood</span>
              <span className="text-amber-400 font-bold text-lg tracking-tight"> Trace</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link to="/login"
              className="text-zinc-400 hover:text-white text-sm font-medium px-5 py-2.5 rounded-xl hover:bg-zinc-900/60 transition-all">
              Sign In
            </Link>
            <Link to="/register"
              className="inline-flex items-center gap-1.5 bg-amber-400 hover:bg-amber-300 text-zinc-950 text-sm font-black px-5 py-2.5 rounded-xl transition-all shadow-lg shadow-amber-400/25 hover:shadow-amber-400/40 hover:-translate-y-0.5">
              Get Started <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </header>

        {/* ── Hero ── */}
        <main className="relative z-10 flex-1 flex flex-col items-center justify-center text-center px-6 pt-24 pb-16">

          {/* Top badge */}
          <div className="anim-fade-up delay-100 inline-flex items-center gap-2.5 bg-amber-400/8 border border-amber-400/20 text-amber-300 text-xs font-bold px-5 py-2.5 rounded-full mb-10 backdrop-blur-sm">
            <Sparkles className="w-3.5 h-3.5" />
            Powering Railway Food Safety Across India
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400" style={{ animation: "glow-pulse 1.5s ease-in-out infinite" }} />
          </div>

          {/* Main heading */}
          <h1 className="anim-fade-up delay-200 font-black tracking-tight leading-[0.9] mb-7 max-w-5xl"
            style={{ fontSize: "clamp(3.5rem, 10vw, 8rem)" }}>
            <span className="text-white block">Food You Can</span>
            <span className="shimmer-text block">Trust.</span>
          </h1>

          {/* Sub-headline */}
          <p className="anim-fade-up delay-300 text-zinc-400 text-lg md:text-xl leading-relaxed max-w-lg mb-14">
            Every meal on Indian Railways — traced from kitchen to passenger.
            Scan a QR code. Know what&apos;s on your plate.
          </p>

          {/* CTA row */}
          <div className="anim-fade-up delay-400 flex flex-col sm:flex-row items-center gap-4 mb-20">
            <Link to="/register"
              className="inline-flex items-center gap-2.5 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-zinc-950 font-black text-base px-9 py-4.5 rounded-2xl transition-all shadow-2xl shadow-amber-400/30 hover:shadow-amber-400/50 hover:-translate-y-1 active:translate-y-0"
              style={{ paddingTop: "1.125rem", paddingBottom: "1.125rem" }}>
              Start as a Vendor
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link to="/login"
              className="inline-flex items-center gap-2 bg-zinc-900/60 hover:bg-zinc-800/80 border border-zinc-700/60 hover:border-zinc-600 text-zinc-200 hover:text-white font-semibold text-base px-9 rounded-2xl transition-all backdrop-blur-sm"
              style={{ paddingTop: "1.125rem", paddingBottom: "1.125rem" }}>
              Sign In
            </Link>
          </div>

          {/* Stats */}
          <div className="anim-fade-up delay-500 flex items-center gap-10 md:gap-16 mb-24">
            {[
              { value: "100%", label: "QR Traced" },
              { value: "Live", label: "Feedback" },
              { value: "Zero", label: "Hidden Info" },
            ].map((s, i) => (
              <div key={s.label} className="relative text-center group">
                {i > 0 && <div className="absolute -left-5 md:-left-8 top-1/2 -translate-y-1/2 w-px h-6 bg-zinc-800" />}
                <div className="text-white text-3xl font-black tracking-tight mb-1 group-hover:text-amber-400 transition-colors">{s.value}</div>
                <div className="text-zinc-600 text-xs font-medium uppercase tracking-widest">{s.label}</div>
              </div>
            ))}
          </div>

          {/* Scroll hint */}
          <div className="anim-fade-in delay-600 flex flex-col items-center gap-2 text-zinc-700 mb-16">
            <span className="text-xs tracking-widest uppercase">Scroll to explore</span>
            <ChevronDown className="w-4 h-4" style={{ animation: "float-slower 2s ease-in-out infinite" }} />
          </div>

          {/* ── How it works ── */}
          <div className="w-full max-w-4xl mb-24">
            <div className="anim-fade-up delay-200 text-center mb-12">
              <span className="text-amber-400/70 text-xs font-bold uppercase tracking-widest block mb-3">How It Works</span>
              <h2 className="text-white text-4xl md:text-5xl font-black tracking-tight">
                Simple. <span className="text-amber-400">Transparent.</span> Safe.
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {[
                { step: "01", icon: <ScanLine className="w-5 h-5" />, title: "Vendor Creates Batch", desc: "Register food details — name, ingredients, kitchen, train number — and generate a QR code instantly.", color: "from-amber-400/10 to-amber-500/5", border: "border-amber-400/20", accent: "text-amber-400" },
                { step: "02", icon: <QrCode className="w-5 h-5" />, title: "QR on Packaging", desc: "The QR code is printed or displayed on the food packaging for passengers to scan before eating.", color: "from-emerald-400/10 to-emerald-500/5", border: "border-emerald-400/20", accent: "text-emerald-400" },
                { step: "03", icon: <Star className="w-5 h-5" />, title: "Passenger Rates & Reports", desc: "Passengers scan, view full details, rate quality, and report issues — all from their phone instantly.", color: "from-blue-400/10 to-blue-500/5", border: "border-blue-400/20", accent: "text-blue-400" },
              ].map((item) => (
                <div key={item.step}
                  className={`anim-scale-in relative bg-gradient-to-br ${item.color} border ${item.border} rounded-3xl p-7 text-left hover:-translate-y-1 transition-all duration-300 group overflow-hidden`}>
                  {/* Big faded step number */}
                  <span className={`absolute -top-3 -right-1 text-8xl font-black opacity-[0.06] ${item.accent} leading-none select-none`}>{item.step}</span>
                  <div className={`w-10 h-10 rounded-2xl bg-zinc-900/80 border ${item.border} flex items-center justify-center mb-5 ${item.accent}`}>
                    {item.icon}
                  </div>
                  <div className={`text-xs font-black uppercase tracking-widest ${item.accent} mb-2 opacity-70`}>Step {item.step}</div>
                  <h3 className="text-white font-bold text-base mb-2.5 leading-snug">{item.title}</h3>
                  <p className="text-zinc-500 text-sm leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* ── Feature cards ── */}
          <div className="w-full max-w-4xl mb-24">
            <div className="text-center mb-12">
              <span className="text-amber-400/70 text-xs font-bold uppercase tracking-widest block mb-3">Platform Features</span>
              <h2 className="text-white text-4xl md:text-5xl font-black tracking-tight">
                Built for <span className="text-amber-400">Trust.</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              {[
                { icon: <QrCode className="w-5 h-5" />, color: "bg-amber-400/10 border-amber-400/20 text-amber-400", glow: "hover:shadow-amber-400/10", title: "QR Traceability", desc: "Every food batch gets a unique scannable QR — linking it to its kitchen, vendor, and expiry time." },
                { icon: <ShieldCheck className="w-5 h-5" />, color: "bg-emerald-400/10 border-emerald-400/20 text-emerald-400", glow: "hover:shadow-emerald-400/10", title: "Hygiene Compliance", desc: "Track preparation time, expiry, ingredients, allergens, and kitchen source — all in one card." },
                { icon: <TrendingUp className="w-5 h-5" />, color: "bg-blue-400/10 border-blue-400/20 text-blue-400", glow: "hover:shadow-blue-400/10", title: "Live Feedback Loop", desc: "Passengers rate meals instantly. Vendors see ratings and complaints on their dashboard in real time." },
              ].map((f) => (
                <div key={f.title}
                  className={`bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/60 rounded-3xl p-7 text-left hover:border-zinc-700/80 hover:-translate-y-1 hover:shadow-2xl ${f.glow} transition-all duration-300`}>
                  <div className={`w-11 h-11 rounded-2xl border flex items-center justify-center mb-5 ${f.color}`}>
                    {f.icon}
                  </div>
                  <h3 className="text-white font-bold text-sm mb-2">{f.title}</h3>
                  <p className="text-zinc-500 text-xs leading-relaxed">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* ── Scrolling trust bar ── */}
          <div className="w-full max-w-4xl mb-24 overflow-hidden relative">
            <div className="absolute left-0 top-0 w-24 h-full bg-gradient-to-r from-zinc-950 to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 w-24 h-full bg-gradient-to-l from-zinc-950 to-transparent z-10 pointer-events-none" />
            <div className="flex gap-8 w-max" style={{ animation: "marquee 25s linear infinite" }}>
              {[...Array(2)].map((_, repeat) => (
                [
                  { icon: <Train className="w-3.5 h-3.5" />, label: "Indian Railways" },
                  { icon: <BadgeCheck className="w-3.5 h-3.5" />, label: "FSSAI Compliant" },
                  { icon: <Star className="w-3.5 h-3.5" />, label: "Passenger Rated" },
                  { icon: <ShieldCheck className="w-3.5 h-3.5" />, label: "Hygiene Verified" },
                  { icon: <QrCode className="w-3.5 h-3.5" />, label: "QR Traceable" },
                  { icon: <Users className="w-3.5 h-3.5" />, label: "Vendor Platform" },
                  { icon: <ScanLine className="w-3.5 h-3.5" />, label: "Scan & Verify" },
                ].map((item, i) => (
                  <div key={`${repeat}-${i}`} className="inline-flex items-center gap-2 text-zinc-600 text-xs font-semibold uppercase tracking-widest whitespace-nowrap">
                    <span className="text-amber-400/50">{item.icon}</span>
                    {item.label}
                    <span className="text-zinc-800 mx-2">·</span>
                  </div>
                ))
              ))}
            </div>
          </div>

          {/* ── Big CTA Banner ── */}
          <div className="w-full max-w-4xl mb-8">
            <div className="relative bg-gradient-to-br from-zinc-900/80 to-zinc-900/40 border border-zinc-800/60 rounded-3xl p-12 text-center overflow-hidden backdrop-blur-sm">
              {/* Glow inside card */}
              <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-96 h-64 bg-amber-400/8 rounded-full blur-3xl pointer-events-none" />
              <div className="relative z-10">
                <div className="inline-flex items-center gap-2 bg-amber-400/10 border border-amber-400/20 text-amber-400 text-xs font-bold px-4 py-2 rounded-full mb-6">
                  <Sparkles className="w-3 h-3" /> Free to join
                </div>
                <h2 className="text-white text-4xl md:text-5xl font-black tracking-tight leading-tight mb-4">
                  Ready to build<br />
                  <span className="text-amber-400">passenger trust?</span>
                </h2>
                <p className="text-zinc-400 text-base mb-8 max-w-md mx-auto">
                  Join RailFood Trace and make every meal on Indian Railways accountable, safe, and passenger-approved.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Link to="/register"
                    className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-zinc-950 font-black text-sm px-8 py-3.5 rounded-2xl transition-all shadow-xl shadow-amber-400/25 hover:shadow-amber-400/40 hover:-translate-y-0.5">
                    Create Vendor Account
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  <Link to="/login"
                    className="text-zinc-400 hover:text-white text-sm font-medium transition-colors">
                    Already have an account? Sign in →
                  </Link>
                </div>
              </div>
            </div>
          </div>

        </main>

        {/* ── Footer ── */}
        <footer className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-3 px-8 py-6 border-t border-zinc-800/40 text-zinc-600 text-xs bg-zinc-950/60 backdrop-blur-xl">
          <span className="font-medium">© 2026 RailFood Trace · Built by Logic Coders</span>
          <div className="flex items-center gap-5">
            <span className="flex items-center gap-1.5 hover:text-zinc-400 transition-colors cursor-default"><Train className="w-3 h-3" /> Indian Railways</span>
            <span className="flex items-center gap-1.5 hover:text-zinc-400 transition-colors cursor-default"><Users className="w-3 h-3" /> Vendor Platform</span>
            <span className="flex items-center gap-1.5 hover:text-zinc-400 transition-colors cursor-default"><Star className="w-3 h-3" /> Passenger Rated</span>
          </div>
        </footer>

      </div>
    </>
  );
}

export default Home;

