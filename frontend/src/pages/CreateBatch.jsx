import { useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

function CreateBatch() {
  const [foodName, setFoodName] = useState("");
  const [preparedAt, setPreparedAt] = useState("");
  const [expiryTime, setExpiryTime] = useState("");
  const [hygieneStatus, setHygieneStatus] = useState("good");
  const [trainNumber, setTrainNumber] = useState("");

  const [qr, setQr] = useState("");
  const [batchId, setBatchId] = useState("");

  const handleSubmit = async () => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/batch/create",
        {
          foodName,
          preparedAt,
          expiryTime,
          hygieneStatus,
          trainNumber
        },
        { withCredentials: true }
      );

      setQr(res.data.qrCode);
      setBatchId(res.data._id);

      alert("Batch created successfully");

      setFoodName("");
      setPreparedAt("");
      setExpiryTime("");
      setHygieneStatus("good");
      setTrainNumber("");

    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Navbar />

      <div className="flex justify-center mt-10">
        <div className="bg-white shadow-xl p-6 rounded-lg w-96">
          <h2 className="text-2xl font-bold mb-6 text-center text-blue-600">
            Create Food Batch
          </h2>

          {/* Food Name */}
          <label className="text-sm font-medium">Food Name</label>
          <input
            value={foodName}
            className="border p-2 w-full mb-3 rounded"
            onChange={(e) => setFoodName(e.target.value)}
          />

          {/* Prepared Time */}
          <label className="text-sm font-medium">Prepared At</label>
          <input
            type="datetime-local"
            value={preparedAt}
            className="border p-2 w-full mb-3 rounded"
            onChange={(e) => setPreparedAt(e.target.value)}
          />

          {/* Expiry Time */}
          <label className="text-sm font-medium">Expiry Time</label>
          <input
            type="datetime-local"
            value={expiryTime}
            className="border p-2 w-full mb-3 rounded"
            onChange={(e) => setExpiryTime(e.target.value)}
          />

          {/* Hygiene Dropdown */}
          <label className="text-sm font-medium">Hygiene Status</label>
          <select
            value={hygieneStatus}
            className="border p-2 w-full mb-3 rounded"
            onChange={(e) => setHygieneStatus(e.target.value)}
          >
            <option value="good">Good</option>
            <option value="average">Average</option>
            <option value="bad">Bad</option>
          </select>

          {/* Train Number */}
          <label className="text-sm font-medium">Train Number</label>
          <input
            value={trainNumber}
            className="border p-2 w-full mb-3 rounded"
            onChange={(e) => setTrainNumber(e.target.value)}
          />

          {/* Button */}
          <button
            className="bg-blue-600 text-white w-full p-2 mt-3 rounded hover:bg-blue-700 transition"
            onClick={handleSubmit}
          >
            Generate QR Code
          </button>

          {/* QR + Link */}
          {qr && (
            <div className="mt-6 text-center border-t pt-4">
              <h3 className="font-semibold text-lg">QR Code</h3>

              <img src={qr} alt="qr" className="mx-auto mt-3" />

              <p className="mt-2 text-sm text-gray-600">Scan Link:</p>

              <a
                href={`http://localhost:5173/scan/${batchId}`}
                target="_blank"
                rel="noreferrer"
                className="text-blue-600 underline break-all text-sm"
              >
                http://localhost:5173/scan/{batchId}
              </a>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default CreateBatch;
