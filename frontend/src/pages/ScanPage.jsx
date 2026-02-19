import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";

function ScanPage() {
  const { id } = useParams();
  const [batch, setBatch] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/batch/${id}`
        );

        setBatch(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, [id]);

  if (!batch) {
    return (
      <>
        <Navbar />
        <p className="text-center mt-10">Loading...</p>
      </>
    );
  }

  // Hygiene badge color
  const getBadge = () => {
    const status = batch.hygieneStatus?.toLowerCase();

    if (status === "good") return "bg-green-100 text-green-700";
    if (status === "average") return "bg-yellow-100 text-yellow-700";
    if (status === "bad") return "bg-red-100 text-red-700";

    return "bg-gray-100 text-gray-700";
  };

  return (
    <>
      <Navbar />

      <div className="flex justify-center mt-10">
        <div className="bg-white shadow-xl p-6 rounded-lg w-96">
          <h2 className="text-2xl font-bold mb-6 text-center text-blue-600">
            Food Details
          </h2>

          <div className="space-y-3 text-sm">

            <div className="flex justify-between">
              <span className="font-medium">Food</span>
              <span>{batch.foodName}</span>
            </div>

            <div className="flex justify-between">
              <span className="font-medium">Vendor</span>
              <span>{batch.vendorId?.name}</span>
            </div>

            <div className="flex justify-between">
              <span className="font-medium">Prepared</span>
              <span>{new Date(batch.preparedAt).toLocaleString()}</span>
            </div>

            <div className="flex justify-between">
              <span className="font-medium">Expiry</span>
              <span>{new Date(batch.expiryTime).toLocaleString()}</span>
            </div>

            <div className="flex justify-between items-center">
              <span className="font-medium">Hygiene</span>
              <span className={`px-2 py-1 rounded text-xs ${getBadge()}`}>
                {batch.hygieneStatus}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="font-medium">Train</span>
              <span>{batch.trainNumber}</span>
            </div>

          </div>

          <Link
            to={`/complaint/${batch._id}`}
            className="bg-red-500 text-white w-full p-2 block mt-6 text-center rounded hover:bg-red-600 transition"
          >
            Raise Complaint
          </Link>
        </div>
      </div>
    </>
  );
}

export default ScanPage;
