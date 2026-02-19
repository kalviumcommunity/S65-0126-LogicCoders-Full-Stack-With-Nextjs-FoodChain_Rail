import { useParams } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

function Complaint() {
  const { id } = useParams();
  const [issue, setIssue] = useState("");

  const handleSubmit = async () => {
    try {
      await axios.post("http://localhost:5000/api/complaint/create", {
        batchId: id,
        issue
      });

      alert("Complaint submitted");

    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold">Complaint</h2>

      <textarea
        className="border p-2 w-full"
        placeholder="Enter issue"
        onChange={(e) => setIssue(e.target.value)}
      />

      <button
        className="bg-red-500 text-white p-2 mt-2"
        onClick={handleSubmit}
      >
        Submit
      </button>
    </div>
  );
}

export default Complaint;
