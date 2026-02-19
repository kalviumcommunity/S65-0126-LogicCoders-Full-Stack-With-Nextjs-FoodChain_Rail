import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";
import { ArrowLeft, AlertTriangle, CheckCircle2, Leaf, Beef, Egg, Star, Train, MapPin, Clock, Cookie, AlertCircle, Search, Package, ShoppingCart, Thermometer, ShieldAlert, SendHorizontal, User } from "lucide-react";

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
  const [passengerName, setPassengerName] = useState("");
  const [trainCoach, setTrainCoach] = useState("");
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

  const getCategoryBadge = (cat) => {
    if (cat === "non-veg") return { bg: "bg-red-500/10 border-red-500/30 text-red-400", icon: <Beef className="w-3.5 h-3.5" />, label: "Non-Veg" };
    if (cat === "egg") return { bg: "bg-amber-500/10 border-amber-500/30 text-amber-400", icon: <Egg className="w-3.5 h-3.5" />, label: "Egg" };
    return { bg: "bg-emerald-500/10 border-emerald-500/30 text-emerald-400", icon: <Leaf className="w-3.5 h-3.5" />, label: "Veg" };
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
        passengerName: passengerName || "Anonymous",
        trainCoach,
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
        <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-amber-400/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 right-0 w-64 h-64 bg-amber-500/3 rounded-full blur-3xl" />
      </div>

      {/* Back Button — full width, pinned left */}
      <div className="relative px-4 pt-6 pb-0">
        <Link
          to="/dashboard"
          className="inline-flex items-center gap-1.5 text-zinc-500 hover:text-amber-400 text-sm font-medium transition-colors duration-200 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
          Back to Dashboard
        </Link>
      </div>

      <div className="relative max-w-lg mx-auto px-4 py-8">
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
                <AlertTriangle className="w-4 h-4 shrink-0" />
                This food batch has expired. Do not consume.
              </div>
            )}

            {/* Details Card */}
            <div className="bg-zinc-900/80 border border-zinc-800/80 rounded-3xl overflow-hidden shadow-2xl shadow-black/40 ring-1 ring-white/5">
              {/* Food name header — premium gradient */}
              <div className="relative bg-gradient-to-br from-zinc-800/60 to-zinc-900/80 border-b border-zinc-800/80 px-6 py-6">
                {/* Subtle amber glow in top-right */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-amber-400/5 rounded-full blur-2xl pointer-events-none" />
                <div className="flex items-start justify-between gap-3 relative z-10">
                  <div>
                    <p className="text-zinc-500 text-xs font-semibold uppercase tracking-widest mb-1.5">Food Item</p>
                    <h2 className="text-white text-2xl font-bold tracking-tight">{batch.foodName}</h2>
                    {batch.vendorId?.name && (
                      <p className="text-zinc-400 text-sm mt-1.5 flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-400 inline-block" />
                        by {batch.vendorId.name}
                      </p>
                    )}
                  </div>
                  {(() => {
                    const cb = getCategoryBadge(batch.category);
                    return (
                      <span className={`shrink-0 inline-flex items-center gap-1.5 border text-xs font-semibold px-3 py-1.5 rounded-full ${cb.bg}`}>
                        {cb.icon} {cb.label}
                      </span>
                    );
                  })()}
                </div>
              </div>

              <div className="px-6 py-5 space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-zinc-500 text-sm flex items-center gap-1.5"><Train className="w-4 h-4" /> Train Number</span>
                  <span className="text-white text-sm font-bold bg-zinc-800/80 border border-zinc-700/50 px-3 py-1 rounded-lg">{batch.trainNumber}</span>
                </div>

                {batch.kitchenLocation && (
                  <>
                    <div className="border-t border-zinc-800" />
                    <div className="flex justify-between items-center">
                      <span className="text-zinc-500 text-sm flex items-center gap-1.5"><MapPin className="w-4 h-4" /> Kitchen / Station</span>
                      <span className="text-zinc-300 text-sm text-right max-w-[55%]">{batch.kitchenLocation}</span>
                    </div>
                  </>
                )}

                {batch.ingredients && (
                  <>
                    <div className="border-t border-zinc-800" />
                    <div>
                      <span className="text-zinc-500 text-sm flex items-center gap-1.5 mb-1"><Cookie className="w-4 h-4" /> Ingredients / Allergens</span>
                      <span className="text-zinc-300 text-sm">{batch.ingredients}</span>
                    </div>
                  </>
                )}

              <div className="border-t border-zinc-800/80" />

                <div className="flex justify-between items-center">
                  <span className="text-zinc-500 text-sm flex items-center gap-1.5"><Clock className="w-4 h-4" /> Prepared At</span>
                  <span className="text-zinc-300 text-sm">{new Date(batch.preparedAt).toLocaleString("en-IN", { hour12: true })}</span>
                </div>

                <div className="border-t border-zinc-800/80" />

                <div className="flex justify-between items-center">
                  <span className="text-zinc-500 text-sm flex items-center gap-1.5"><Clock className="w-4 h-4" /> Expires At</span>
                  <span className={`text-sm font-medium ${isExpired ? "text-red-400" : "text-emerald-400"}`}>
                    {new Date(batch.expiryTime).toLocaleString("en-IN", { hour12: true })}
                  </span>
                </div>
              </div>
            </div>

            {/* Feedback Section */}
            <div className="mt-5">
              {fbSubmitted ? (
                <div className="bg-zinc-900/80 border border-zinc-800/80 rounded-3xl p-8 text-center ring-1 ring-white/5">
                  <div className="w-16 h-16 bg-emerald-500/10 border border-emerald-500/30 rounded-full flex items-center justify-center mx-auto mb-5">
                    <CheckCircle2 className="w-8 h-8 text-emerald-400" />
                  </div>
                  <h3 className="text-white font-bold text-lg mb-2">Thank you!</h3>
                  <p className="text-zinc-500 text-sm">Your feedback helps improve food quality on Indian Railways.</p>
                </div>
              ) : (
                <div className="bg-zinc-900/80 border border-zinc-800/80 rounded-3xl p-6 ring-1 ring-white/5">
                  <h3 className="text-white font-bold text-base mb-1">Rate Your Experience</h3>
                  <p className="text-zinc-500 text-xs mb-5">How was the food quality? Your feedback matters.</p>

                  {/* Stars */}
                  <div className="flex items-center gap-1.5 mb-5">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        onMouseEnter={() => setHovered(star)}
                        onMouseLeave={() => setHovered(0)}
                        className="transition-all duration-100 focus:outline-none hover:scale-110"
                      >
                        <Star
                          className={`w-8 h-8 transition-colors ${
                            (hovered || rating) >= star
                              ? "fill-amber-400 text-amber-400"
                              : "text-zinc-700"
                          }`}
                        />
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
                      { value: "general", label: "General", icon: <AlertCircle className="w-3.5 h-3.5" /> },
                      { value: "stale_food", label: "Stale Food", icon: <ShieldAlert className="w-3.5 h-3.5" /> },
                      { value: "foreign_object", label: "Foreign Object", icon: <Search className="w-3.5 h-3.5" /> },
                      { value: "unhygienic_packaging", label: "Packaging", icon: <Package className="w-3.5 h-3.5" /> },
                      { value: "wrong_order", label: "Wrong Order", icon: <ShoppingCart className="w-3.5 h-3.5" /> },
                      { value: "temperature", label: "Temperature", icon: <Thermometer className="w-3.5 h-3.5" /> },
                    ].map((opt) => (
                      <button
                        key={opt.value}
                        type="button"
                        onClick={() => setFeedbackCategory(opt.value)}
                        className={`py-2 px-3 rounded-xl text-xs font-semibold border transition-all inline-flex items-center gap-1.5 ${
                          feedbackCategory === opt.value
                            ? "border-amber-400/80 bg-amber-400/10 text-amber-400 shadow-sm shadow-amber-400/10"
                            : "border-zinc-700/80 bg-zinc-800/70 text-zinc-500 hover:border-zinc-600 hover:text-zinc-400"
                        }`}
                      >
                        {opt.icon} {opt.label}
                      </button>
                    ))}
                  </div>

                  <form onSubmit={handleFeedbackSubmit} className="space-y-3">
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-zinc-500 text-xs uppercase tracking-wider mb-1 block">Your Name <span className="normal-case text-zinc-600">(optional)</span></label>
                        <input
                          type="text"
                          placeholder="e.g. Priya Sharma"
                          value={passengerName}
                          onChange={(e) => setPassengerName(e.target.value)}
                          className="w-full bg-zinc-800/70 border border-zinc-700/80 text-white placeholder-zinc-600 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-amber-400/80 focus:bg-zinc-800 focus:ring-1 focus:ring-amber-400/25 transition-all"
                        />
                      </div>
                      <div>
                        <label className="text-zinc-500 text-xs uppercase tracking-wider mb-1 block">Coach <span className="normal-case text-zinc-600">(optional)</span></label>
                        <input
                          type="text"
                          placeholder="e.g. S4, B2"
                          value={trainCoach}
                          onChange={(e) => setTrainCoach(e.target.value)}
                          className="w-full bg-zinc-800/70 border border-zinc-700/80 text-white placeholder-zinc-600 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-amber-400/80 focus:bg-zinc-800 focus:ring-1 focus:ring-amber-400/25 transition-all"
                        />
                      </div>
                    </div>

                    <textarea
                      placeholder="Any comments? (optional)"
                      value={feedbackText}
                      rows={3}
                      className="w-full bg-zinc-800/70 border border-zinc-700/80 text-white placeholder-zinc-600 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-amber-400/80 focus:bg-zinc-800 focus:ring-1 focus:ring-amber-400/25 transition-all resize-none"
                      onChange={(e) => setFeedbackText(e.target.value)}
                    />

                    {fbError && (
                      <p className="text-red-400 text-xs">{fbError}</p>
                    )}

                    <button
                      type="submit"
                      disabled={!rating || fbLoading}
                      className="w-full bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 disabled:from-zinc-700 disabled:to-zinc-700 disabled:text-zinc-500 text-zinc-950 font-bold py-3.5 rounded-xl transition-all duration-200 text-sm inline-flex items-center justify-center gap-2 shadow-lg shadow-amber-400/20 hover:shadow-amber-400/30 disabled:shadow-none"
                    >
                      <SendHorizontal className="w-4 h-4" />
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
