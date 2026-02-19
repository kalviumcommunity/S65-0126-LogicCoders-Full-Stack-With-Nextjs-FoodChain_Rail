import { useState } from "react";
import axios from "axios";

function CreateBatch() {
  const [foodName, setFoodName] = useState("");
  const [preparedAt, setPreparedAt] = useState("");
  const [expiryTime, setExpiryTime] = useState("");
  const [hygieneStatus, setHygieneStatus] = useState("");
  const [trainNumber, setTrainNumber] = useState("");

  const [qr, setQr] = useState("");

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

    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Create Batch</h2>

      <input placeholder="Food Name" className="border p-2 mb-2 block"
        onChange={(e) => setFoodName(e.target.value)}
      />

      <input type="datetime-local" className="border p-2 mb-2 block"
        onChange={(e) => setPreparedAt(e.target.value)}
      />

      <input type="datetime-local" className="border p-2 mb-2 block"
        onChange={(e) => setExpiryTime(e.target.value)}
      />

      <input placeholder="Hygiene Status" className="border p-2 mb-2 block"
        onChange={(e) => setHygieneStatus(e.target.value)}
      />

      <input placeholder="Train Number" className="border p-2 mb-2 block"
        onChange={(e) => setTrainNumber(e.target.value)}
      />

      <button
        className="bg-blue-500 text-white p-2"
        onClick={handleSubmit}
      >
        Create Batch
      </button>

      {qr && (
        <div className="mt-4">
          <h3>QR Code</h3>
          <img src={qr} alt="qr" />
        </div>
      )}
    </div>
  );
}

export default CreateBatch;
