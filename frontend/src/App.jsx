import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CreateBatch from "./pages/CreateBatch";
import ScanPage from "./pages/ScanPage";
import Complaint from "./pages/Complaint";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <div className="min-h-screen bg-zinc-950">
      <BrowserRouter>
        <Routes>
          {/* Landing */}
          <Route path="/" element={<Home />} />

          {/* Auth */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Vendor */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/create-batch" element={<CreateBatch />} />

          {/* Public (Passenger) */}
          <Route path="/scan/:id" element={<ScanPage />} />
          <Route path="/complaint/:id" element={<Complaint />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
