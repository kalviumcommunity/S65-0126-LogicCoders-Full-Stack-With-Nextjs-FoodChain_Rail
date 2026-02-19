import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";

function Dashboard() {
  const [batches, setBatches] = useState([]);
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [batchRes, complaintRes] = await Promise.all([
          axios.get("http://localhost:5000/api/batch/my", { withCredentials: true }),
          axios.get("http://localhost:5000/api/complaint", { withCredentials: true }),
        ]);
        setBatches(batchRes.data);
        setComplaints(complaintRes.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const now = new Date();
  const activeBatches = batches.filter((b) => new Date(b.expiryTime) > now);
  const expiredBatches = batches.filter((b) => new Date(b.expiryTime) <= now);

  // Complaints for this vendor's batches
  const myBatchIds = new Set(batches.map((b) => b._id));
  const myComplaints = complaints.filter(
    (c) => c.batchId && myBatchIds.has(c.batchId._id || c.batchId)
  );

  const ratingsOnly = myComplaints.filter((c) => c.rating != null);
  const avgRating =
    ratingsOnly.length > 0
      ? (ratingsOnly.reduce((s, c) => s + c.rating, 0) / ratingsOnly.length).toFixed(1)
      : null;

  const categoryLabels = {
    stale_food: "Stale Food",
    foreign_object: "Foreign Object",
    unhygienic_packaging: "Packaging",
    wrong_order: "Wrong Order",
    temperature: "Temperature",
    general: "General",
  };

  const getCategoryColor = (cat) => {
    const map = {
      stale_food: "text-red-400 bg-red-500/10 border-red-500/20",
      foreign_object: "text-orange-400 bg-orange-500/10 border-orange-500/20",
      unhygienic_packaging: "text-yellow-400 bg-yellow-500/10 border-yellow-500/20",
      wrong_order: "text-blue-400 bg-blue-500/10 border-blue-500/20",
      temperature: "text-purple-400 bg-purple-500/10 border-purple-500/20",
      general: "text-zinc-400 bg-zinc-800 border-zinc-700",
    };
    return map[cat] || map.general;
  };

  const statCards = [
    { label: "Total Batches", value: batches.length, color: "text-amber-400", icon: "📦" },
    { label: "Active Batches", value: activeBatches.length, color: "text-emerald-400", icon: "✅" },
    { label: "Expired Batches", value: expiredBatches.length, color: "text-red-400", icon: "⏰" },
    { label: "Total Feedback", value: myComplaints.length, color: "text-blue-400", icon: "💬" },
    {
      label: "Avg. Rating",
      value: avgRating ? `${avgRating} / 5` : "—",
      color: "text-amber-400",
      icon: "⭐",
    },
  ];

  return (
    <div className="min-h-screen bg-zinc-950">
      <Navbar />

      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-amber-400/3 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-5xl mx-auto px-4 py-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-white text-2xl font-bold tracking-tight">
              Vendor <span className="text-amber-400">Dashboard</span>
            </h1>
            <p className="text-zinc-500 text-sm mt-1">Track your food batches, ratings, and feedback</p>
          </div>
          <Link
            to="/create-batch"
            className="bg-amber-400 hover:bg-amber-300 text-zinc-950 font-bold text-sm px-5 py-2.5 rounded-xl transition-all"
          >
            + New Batch
          </Link>
        </div>

        {loading ? (
          <div className="text-center py-20">
            <div className="inline-block w-8 h-8 border-2 border-amber-400 border-t-transparent rounded-full animate-spin mb-4" />
            <p className="text-zinc-500 text-sm">Loading dashboard...</p>
          </div>
        ) : (
          <>
            {/* Stat Cards */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
              {statCards.map((s) => (
                <div key={s.label} className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4 text-center">
                  <div className="text-2xl mb-1">{s.icon}</div>
                  <div className={`text-2xl font-bold ${s.color}`}>{s.value}</div>
                  <div className="text-zinc-500 text-xs mt-0.5">{s.label}</div>
                </div>
              ))}
            </div>

            {/* Batches Table */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden shadow-2xl mb-8">
              <div className="px-6 py-4 border-b border-zinc-800 flex items-center justify-between">
                <h2 className="text-white font-semibold text-sm">My Food Batches</h2>
                <span className="text-zinc-500 text-xs">{batches.length} total</span>
              </div>

              {batches.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-zinc-600 text-sm">No batches created yet.</p>
                  <Link to="/create-batch" className="text-amber-400 text-sm mt-1 block hover:text-amber-300">
                    Create your first batch →
                  </Link>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-zinc-800">
                        <th className="text-left text-zinc-500 text-xs uppercase tracking-wider px-6 py-3">Food</th>
                        <th className="text-left text-zinc-500 text-xs uppercase tracking-wider px-4 py-3">Category</th>
                        <th className="text-left text-zinc-500 text-xs uppercase tracking-wider px-4 py-3">Train</th>
                        <th className="text-left text-zinc-500 text-xs uppercase tracking-wider px-4 py-3">Expires</th>
                        <th className="text-left text-zinc-500 text-xs uppercase tracking-wider px-4 py-3">Status</th>
                        <th className="text-left text-zinc-500 text-xs uppercase tracking-wider px-4 py-3">QR</th>
                      </tr>
                    </thead>
                    <tbody>
                      {batches.map((b) => {
                        const expired = new Date(b.expiryTime) <= now;
                        const catIcon = b.category === "non-veg" ? "🔴" : b.category === "egg" ? "🟡" : "🟢";
                        const feedbackCount = myComplaints.filter(
                          (c) => (c.batchId?._id || c.batchId) === b._id
                        ).length;
                        return (
                          <tr key={b._id} className="border-b border-zinc-800/50 hover:bg-zinc-800/30 transition-colors">
                            <td className="px-6 py-4">
                              <div className="text-white font-medium">{b.foodName}</div>
                              {b.kitchenLocation && (
                                <div className="text-zinc-500 text-xs mt-0.5">{b.kitchenLocation}</div>
                              )}
                            </td>
                            <td className="px-4 py-4">
                              <span className="text-xs">{catIcon} {b.category || "veg"}</span>
                            </td>
                            <td className="px-4 py-4">
                              <span className="text-zinc-300 bg-zinc-800 px-2 py-1 rounded-lg text-xs font-medium">{b.trainNumber}</span>
                            </td>
                            <td className="px-4 py-4 text-zinc-400 text-xs">
                              {new Date(b.expiryTime).toLocaleString("en-IN", { hour12: true, day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" })}
                            </td>
                            <td className="px-4 py-4">
                              {expired ? (
                                <span className="text-red-400 bg-red-500/10 border border-red-500/20 text-xs px-2 py-1 rounded-full">Expired</span>
                              ) : (
                                <span className="text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 text-xs px-2 py-1 rounded-full">Active</span>
                              )}
                              {feedbackCount > 0 && (
                                <span className="ml-2 text-blue-400 text-xs">{feedbackCount} fb</span>
                              )}
                            </td>
                            <td className="px-4 py-4">
                              <a
                                href={`http://localhost:5173/scan/${b._id}`}
                                target="_blank"
                                rel="noreferrer"
                                className="text-amber-400 hover:text-amber-300 text-xs transition-colors"
                              >
                                View →
                              </a>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            {/* Recent Feedback */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden shadow-2xl">
              <div className="px-6 py-4 border-b border-zinc-800 flex items-center justify-between">
                <h2 className="text-white font-semibold text-sm">Recent Feedback & Complaints</h2>
                <span className="text-zinc-500 text-xs">{myComplaints.length} total</span>
              </div>

              {myComplaints.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-zinc-600 text-sm">No feedback received yet.</p>
                </div>
              ) : (
                <div className="divide-y divide-zinc-800/50">
                  {myComplaints.slice(0, 10).map((c) => (
                    <div key={c._id} className="px-6 py-4 flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                          <span className={`text-xs px-2 py-0.5 rounded-full border ${getCategoryColor(c.category)}`}>
                            {categoryLabels[c.category] || "General"}
                          </span>
                          {c.rating && (
                            <span className="text-amber-400 text-xs flex items-center gap-0.5">
                              {"★".repeat(c.rating)}{"☆".repeat(5 - c.rating)}
                              <span className="text-zinc-500 ml-1">{c.rating}/5</span>
                            </span>
                          )}
                          {c.passengerName && c.passengerName !== "Anonymous" && (
                            <span className="text-zinc-500 text-xs">— {c.passengerName}</span>
                          )}
                        </div>
                        <p className="text-zinc-300 text-sm truncate">{c.issue}</p>
                        {c.batchId?.foodName && (
                          <p className="text-zinc-600 text-xs mt-0.5">Batch: {c.batchId.foodName}</p>
                        )}
                      </div>
                      <div className="shrink-0 text-right">
                        <span
                          className={`text-xs px-2 py-1 rounded-full border ${
                            c.status === "resolved"
                              ? "text-emerald-400 bg-emerald-500/10 border-emerald-500/20"
                              : c.status === "reviewed"
                              ? "text-blue-400 bg-blue-500/10 border-blue-500/20"
                              : "text-amber-400 bg-amber-500/10 border-amber-500/20"
                          }`}
                        >
                          {c.status}
                        </span>
                        <p className="text-zinc-600 text-xs mt-1">
                          {new Date(c.createdAt).toLocaleDateString("en-IN")}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
