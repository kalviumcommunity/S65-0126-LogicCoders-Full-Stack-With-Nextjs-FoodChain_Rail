import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";

function ScanPage() {
  const { id } = useParams();
  const [batch, setBatch] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Feedback state
  const [rating, setRating] = useState(0);
  const [hovered, setHovered] = useState(0);
  const [feedbackText, setFeedbackText] = useState("");
  const [feedbackCategory, setFeedbackCategory] = useState("general");
  const [fbLoading, setFbLoading] = useState(false);
  const [fbSubmitted, setFbSubmitted] = useState(false);
  const [fbError, setFbError] = useState("");

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

  const getCategoryBadge = (cat) => {
    if (cat === "non-veg") return { bg: "bg-red-500/10 border-red-500/30 text-red-400", icon: "🔴", label: "Non-Veg" };
    if (cat === "egg") return { bg: "bg-amber-500/10 border-amber-500/30 text-amber-400", icon: "🟡", label: "Egg" };
    return { bg: "bg-emerald-500/10 border-emerald-500/30 text-emerald-400", icon: "🟢", label: "Veg" };
  };

  const isExpired = batch && new Date(batch.expiryTime) < new Date();

  const starLabels = ["Poor", "Fair", "Good", "Very Good", "Excellent"];

  const handleFeedbackSubmit = async (e) => {
    e.preventDefault();
    if (!rating) return;
    setFbError("");
    setFbLoading(true);
    try {
      const issue = feedbackText || starLabels[rating - 1];
      await axios.post("http://localhost:5000/api/complaint/create", {
        batchId: id,
        issue,
        category: feedbackCategory,
        rating,
      });
      setFbSubmitted(true);
    } catch (err) {
      setFbError(err.response?.data?.message || "Failed to submit. Please try again.");
    } finally {
      setFbLoading(false);
    }
  };

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
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-zinc-500 text-xs uppercase tracking-wider mb-1">Food Item</p>
                    <h2 className="text-white text-xl font-bold">{batch.foodName}</h2>
                    {batch.vendorId?.name && (
                      <p className="text-zinc-400 text-sm mt-1">by {batch.vendorId.name}</p>
                    )}
                  </div>
                  {(() => {
                    const cb = getCategoryBadge(batch.category);
                    return (
                      <span className={`shrink-0 inline-flex items-center gap-1.5 border text-xs font-medium px-3 py-1.5 rounded-full ${cb.bg}`}>
                        {cb.icon} {cb.label}
                      </span>
                    );
                  })()}
                </div>
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

                {batch.kitchenLocation && (
                  <>
                    <div className="border-t border-zinc-800" />
                    <div className="flex justify-between items-center">
                      <span className="text-zinc-500 text-sm">Kitchen / Station</span>
                      <span className="text-zinc-300 text-sm text-right max-w-[55%]">{batch.kitchenLocation}</span>
                    </div>
                  </>
                )}

                {batch.ingredients && (
                  <>
                    <div className="border-t border-zinc-800" />
                    <div>
                      <span className="text-zinc-500 text-sm block mb-1">Ingredients / Allergens</span>
                      <span className="text-zinc-300 text-sm">{batch.ingredients}</span>
                    </div>
                  </>
                )}

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

            {/* Feedback Section */}
            <div className="mt-5">
              {fbSubmitted ? (
                <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 text-center">
                  <div className="w-14 h-14 bg-amber-400/10 border border-amber-400/30 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-7 h-7 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-white font-semibold text-base mb-1">Thank you for your feedback!</h3>
                  <p className="text-zinc-500 text-sm">Your response helps improve food quality on Indian Railways.</p>
                </div>
              ) : (
                <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
                  <h3 className="text-white font-semibold text-base mb-1">Rate Your Experience</h3>
                  <p className="text-zinc-500 text-xs mb-5">How was the food quality? Your feedback matters.</p>

                  {/* Stars */}
                  <div className="flex items-center gap-2 mb-5">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        onMouseEnter={() => setHovered(star)}
                        onMouseLeave={() => setHovered(0)}
                        className="text-3xl transition-all duration-100 focus:outline-none"
                      >
                        <span className={(hovered || rating) >= star ? "text-amber-400" : "text-zinc-700"}>
                          ★
                        </span>
                      </button>
                    ))}
                    {(hovered || rating) > 0 && (
                      <span className="text-zinc-400 text-xs ml-1">
                        {starLabels[(hovered || rating) - 1]}
                      </span>
                    )}
                  </div>

                  {/* Issue category */}
                  <p className="text-zinc-400 text-xs font-medium uppercase tracking-wider mb-2">Issue Type</p>
                  <div className="grid grid-cols-2 gap-2 mb-4">
                    {[
                      { value: "general", label: "General" },
                      { value: "stale_food", label: "Stale Food" },
                      { value: "foreign_object", label: "Foreign Object" },
                      { value: "unhygienic_packaging", label: "Packaging" },
                      { value: "wrong_order", label: "Wrong Order" },
                      { value: "temperature", label: "Temperature" },
                    ].map((opt) => (
                      <button
                        key={opt.value}
                        type="button"
                        onClick={() => setFeedbackCategory(opt.value)}
                        className={`py-2 px-3 rounded-xl text-xs font-medium border transition-all ${
                          feedbackCategory === opt.value
                            ? "border-amber-400 bg-amber-400/10 text-amber-400"
                            : "border-zinc-700 bg-zinc-800 text-zinc-500 hover:border-zinc-600"
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>

                  <form onSubmit={handleFeedbackSubmit}>
                    <textarea
                      placeholder="Any comments? (optional)"
                      value={feedbackText}
                      rows={3}
                      className="w-full bg-zinc-800 border border-zinc-700 text-white placeholder-zinc-600 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400/30 transition-all resize-none mb-3"
                      onChange={(e) => setFeedbackText(e.target.value)}
                    />

                    {fbError && (
                      <p className="text-red-400 text-xs mb-3">{fbError}</p>
                    )}

                    <button
                      type="submit"
                      disabled={!rating || fbLoading}
                      className="w-full bg-amber-400 hover:bg-amber-300 disabled:bg-zinc-700 disabled:text-zinc-500 text-zinc-950 font-bold py-3 rounded-xl transition-all duration-200 text-sm"
                    >
                      {fbLoading ? "Submitting..." : "Submit Feedback"}
                    </button>
                  </form>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default ScanPage;
