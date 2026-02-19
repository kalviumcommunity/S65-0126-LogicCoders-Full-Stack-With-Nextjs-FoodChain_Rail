import { useParams } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";


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

<>
  <Navbar />

  <div className="flex justify-center mt-10">
    <div className="bg-white shadow-lg p-6 rounded w-96">
      <h2 className="text-xl font-bold mb-4 text-center">
        Raise Complaint
      </h2>

      <textarea
        className="border p-2 w-full"
        placeholder="Describe your issue"
        onChange={(e) => setIssue(e.target.value)}
      />

      <button
        className="bg-red-500 text-white w-full p-2 mt-3 rounded"
        onClick={handleSubmit}
      >
        Submit Complaint
      </button>
    </div>
  </div>
</>

  );
}

export default Complaint;
