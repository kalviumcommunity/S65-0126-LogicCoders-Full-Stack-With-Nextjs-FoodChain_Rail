import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:5000/api/auth/logout", {}, { withCredentials: true });
    } catch (err) {
      // silently fail
    }
    navigate("/");
  };

  return (
    <nav className="bg-zinc-950 border-b border-zinc-800 px-6 py-4 flex justify-between items-center sticky top-0 z-50 backdrop-blur">
      {/* Brand */}
      <Link to="/create-batch" className="flex items-center gap-3 group">
        <div className="w-9 h-9 rounded-xl bg-amber-400 flex items-center justify-center shadow-lg shadow-amber-400/20">
          <span className="text-zinc-950 font-black text-sm">RF</span>
        </div>
        <div>
          <span className="text-white font-bold text-lg tracking-tight">RailFood</span>
          <span className="text-amber-400 font-bold text-lg tracking-tight"> Trace</span>
        </div>
      </Link>

      {/* Actions */}
      <div className="flex items-center gap-4">
        <Link
          to="/create-batch"
          className="text-zinc-400 hover:text-amber-400 text-sm font-medium transition-colors duration-200"
        >
          Create Batch
        </Link>

        <button
          onClick={handleLogout}
          className="bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 text-zinc-200 hover:text-white text-sm font-medium px-4 py-2 rounded-lg transition-all duration-200"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
