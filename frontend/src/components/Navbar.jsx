import { Link, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { LogOut, LayoutDashboard, PlusSquare } from "lucide-react";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/auth/me", { withCredentials: true })
      .then((res) => setUser(res.data.user))
      .catch(() => setUser(null));
  }, []);

  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:5000/api/auth/logout", {}, { withCredentials: true });
    } catch (err) {
      console.log("Logout Error :",err);
    }
    navigate("/login");
  };

  const navLink = (to, label, Icon) => {
    const active = location.pathname === to;
    return (
      <Link
        to={to}
        className={`relative inline-flex items-center gap-1.5 text-sm font-medium transition-all duration-200 pb-0.5 ${
          active
            ? "text-amber-400"
            : "text-zinc-500 hover:text-zinc-200"
        }`}
      >
        <Icon className="w-4 h-4" />
        {label}
        {/* Active underline indicator */}
        <span
          className={`absolute -bottom-[17px] left-0 right-0 h-px rounded-full transition-all duration-300 ${
            active ? "bg-amber-400" : "bg-transparent"
          }`}
        />
      </Link>
    );
  };

  return (
    <nav className="bg-zinc-950/80 backdrop-blur-xl border-b border-zinc-800/60 px-6 py-4 flex justify-between items-center sticky top-0 z-50">
      {/* Brand */}
      <Link to="/dashboard" className="flex items-center gap-3 group">
        <div className="w-9 h-9 rounded-xl bg-amber-400 flex items-center justify-center shadow-lg shadow-amber-400/30 group-hover:shadow-amber-400/50 transition-shadow">
          <span className="text-zinc-950 font-black text-sm">RF</span>
        </div>
        <div className="hidden sm:block">
          <span className="text-white font-bold text-lg tracking-tight">RailFood</span>
          <span className="text-amber-400 font-bold text-lg tracking-tight"> Trace</span>
        </div>
      </Link>

      {/* Actions */}
      <div className="flex items-center gap-6">
        {navLink("/dashboard", "Dashboard", LayoutDashboard)}
        {navLink("/create-batch", "Create Batch", PlusSquare)}

        {/* User chip */}
        {user && (
          <div className="hidden sm:flex items-center gap-2 bg-zinc-900/80 border border-zinc-800/80 rounded-lg px-3 py-1.5">
            <div className="w-6 h-6 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center shadow-sm shadow-amber-400/30">
              <span className="text-zinc-950 font-black text-xs">{user.name?.[0]?.toUpperCase()}</span>
            </div>
            <span className="text-zinc-300 text-xs font-medium max-w-[120px] truncate">{user.name}</span>
          </div>
        )}

        <button
          onClick={handleLogout}
          className="inline-flex items-center gap-1.5 bg-zinc-900/80 hover:bg-zinc-800 border border-zinc-800/80 hover:border-zinc-700 text-zinc-400 hover:text-white text-sm font-medium px-3.5 py-2 rounded-lg transition-all duration-200"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Logout</span>
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
