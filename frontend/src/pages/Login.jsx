import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        { email, password },
        { withCredentials: true }
      );

      if (res.data.role === "vendor") {
        navigate("/create-batch");
      }

    } catch (err) {
      console.log(err);
      alert("Login failed");
    }
  };

  return (
    <div className="h-screen flex items-center justify-center">
      <div className="p-6 shadow-lg rounded w-80">
        <h2 className="text-xl font-bold mb-4">Login</h2>

        <input
          placeholder="Email"
          className="border p-2 w-full mb-3"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="border p-2 w-full mb-3"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleSubmit}
          className="bg-blue-500 text-white w-full p-2"
        >
          Login
        </button>

        <Link to="/register" className="text-blue-500 text-sm mt-2 block">
          Register
        </Link>
      </div>
    </div>
  );
}

export default Login;
