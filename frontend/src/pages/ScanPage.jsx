import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";

function ScanPage() {
  const { id } = useParams();
  const [batch, setBatch] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/batch/${id}`, { withCredentials: true });
        setBatch(res.data);
      } catch (err) {
        setError(err.response?.data?.message || "Batch not found.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  const getHygieneBadge = (status) => {
    const s = status?.toLowerCase();
    if (s === "good") return { bg: "bg-emerald-500/10 border-emerald-500/30 text-emerald-400", dot: "bg-emerald-400", label: "Good" };
    if (s === "average") return { bg: "bg-amber-500/10 border-amber-500/30 text-amber-400", dot: "bg-amber-400", label: "Average" };
    if (s === "bad") return { bg: "bg-red-500/10 border-red-500/30 text-red-400", dot: "bg-red-400", label: "Bad" };
    return { bg: "bg-zinc-800 border-zinc-700 text-zinc-400", dot: "bg-zinc-400", label: status };
  };

  const isExpired = batch && new Date(batch.expiryTime) < new Date();

  return (
    <div className="min-h-screen bg-zinc-950">
      <Navbar />

      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-amber-400/3 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-lg mx-auto px-4 py-10">
        {loading && (
          <div className="text-center py-20">
            <div className="inline-block w-8 h-8 border-2 border-amber-400 border-t-transparent rounded-full animate-spin mb-4" />
            <p className="text-zinc-500 text-sm">Loading batch details...</p>
          </div>
        )}

        {error && (
          <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-sm rounded-2xl p-6 text-center">
            <p className="text-lg font-semibold text-red-300 mb-1">Batch Not Found</p>
            <p className="text-zinc-500 text-xs">{error}</p>
          </div>
        )}

        {batch && (
          <>
            {/* Header */}
            <div className="mb-6">
              <h1 className="text-white text-2xl font-bold tracking-tight">
                Food <span className="text-amber-400">Details</span>
              </h1>
              <p className="text-zinc-500 text-sm mt-1">Showing information for scanned batch</p>
            </div>

            {/* Expiry Warning */}
            {isExpired && (
              <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-sm rounded-xl p-3 mb-5 flex items-center gap-2">
                <span className="w-2 h-2 bg-red-400 rounded-full shrink-0"></span>
                This food batch has expired. Do not consume.
              </div>
            )}

            {/* Details Card */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden shadow-2xl">
              {/* Food name header */}
              <div className="bg-zinc-800/50 border-b border-zinc-800 px-6 py-5">
                <p className="text-zinc-500 text-xs uppercase tracking-wider mb-1">Food Item</p>
                <h2 className="text-white text-xl font-bold">{batch.foodName}</h2>
                {batch.vendorId?.name && (
                  <p className="text-zinc-400 text-sm mt-1">by {batch.vendorId.name}</p>
                )}
              </div>

              <div className="px-6 py-5 space-y-4">
                {/* Hygiene */}
                <div className="flex justify-between items-center">
                  <span className="text-zinc-500 text-sm">Hygiene Status</span>
                  {(() => {
                    const badge = getHygieneBadge(batch.hygieneStatus);
                    return (
                      <span className={`inline-flex items-center gap-1.5 border text-xs font-medium px-3 py-1.5 rounded-full ${badge.bg}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${badge.dot}`}></span>
                        {badge.label}
                      </span>
                    );
                  })()}
                </div>

                <div className="border-t border-zinc-800" />

                <div className="flex justify-between items-center">
                  <span className="text-zinc-500 text-sm">Train Number</span>
                  <span className="text-white text-sm font-medium bg-zinc-800 px-3 py-1 rounded-lg">{batch.trainNumber}</span>
                </div>

                <div className="border-t border-zinc-800" />

                <div className="flex justify-between items-center">
                  <span className="text-zinc-500 text-sm">Prepared At</span>
                  <span className="text-zinc-300 text-sm">{new Date(batch.preparedAt).toLocaleString("en-IN", { hour12: true })}</span>
                </div>

                <div className="border-t border-zinc-800" />

                <div className="flex justify-between items-center">
                  <span className="text-zinc-500 text-sm">Expires At</span>
                  <span className={`text-sm ${isExpired ? "text-red-400" : "text-zinc-300"}`}>
                    {new Date(batch.expiryTime).toLocaleString("en-IN", { hour12: true })}
                  </span>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="mt-5 space-y-3">
              <Link
                to={`/complaint/${batch._id}`}
                className="w-full bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-red-400 hover:text-red-300 font-semibold py-3.5 rounded-xl transition-all duration-200 text-sm text-center block"
              >
                Report a Complaint
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default ScanPage;
