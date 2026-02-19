import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // just clear cookie (simple version)
    document.cookie = "token=; Max-Age=0";
    navigate("/");
  };

  return (
    <div className="bg-blue-600 text-white p-4 flex justify-between">
      <h1 className="font-bold text-lg">RailFood Trace</h1>

      <div className="space-x-4">
        <Link to="/create-batch">Create Batch</Link>

        <button
          onClick={handleLogout}
          className="bg-white text-blue-600 px-2 py-1 rounded"
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default Navbar;
