import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

function ScanPage() {
  const { id } = useParams();
  const [batch, setBatch] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(
        `http://localhost:5000/api/batch/${id}`
      );

      setBatch(res.data);
    };

    fetchData();
  }, [id]);

  if (!batch) return <p>Loading...</p>;

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold">Food Details</h2>

      <p>Food: {batch.foodName}</p>
      <p>Vendor: {batch.vendorId?.name}</p>
      <p>Prepared: {batch.preparedAt}</p>
      <p>Expiry: {batch.expiryTime}</p>
      <p>Hygiene: {batch.hygieneStatus}</p>
      <p>Train: {batch.trainNumber}</p>

      <Link
        to={`/complaint/${batch._id}`}
        className="bg-red-500 text-white p-2 inline-block mt-4"
      >
        Raise Complaint
      </Link>
    </div>
  );
}

export default ScanPage;
