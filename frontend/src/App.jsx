import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import CreateBatch from "./pages/CreateBatch";
import ScanPage from "./pages/ScanPage";
import Complaint from "./pages/Complaint";

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <BrowserRouter>
        <Routes>

          {/* Auth */}
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Vendor */}
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
