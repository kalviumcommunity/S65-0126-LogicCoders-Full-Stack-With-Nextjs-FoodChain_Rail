import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      await axios.post("http://localhost:5000/api/auth/register", {
        name,
        email,
        password,
        role: "vendor"  
      });

      alert("Registered successfully");
      navigate("/");

    } catch (err) {
      console.log(err);
      alert("Registration failed");
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <div className="p-6 shadow-lg rounded w-80 bg-white">
        <h2 className="text-xl font-bold mb-4 text-center">Register</h2>

        <input
          placeholder="Name"
          className="border p-2 w-full mb-3"
          onChange={(e) => setName(e.target.value)}
        />

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
          className="bg-green-500 text-white w-full p-2 rounded"
        >
          Register
        </button>
      </div>
    </div>
  );
}

export default Register;
