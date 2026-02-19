import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import { ArrowLeft, CheckCircle2 } from "lucide-react";

function Complaint() {
  const { id } = useParams();
  const [issue, setIssue] = useState("");
  const [passengerName, setPassengerName] = useState("");
  const [trainCoach, setTrainCoach] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await axios.post("http://localhost:5000/api/complaint/create", {
        batchId: id,
        issue,
        passengerName,
        trainCoach,
      }, { withCredentials: true });
      setSubmitted(true);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to submit complaint. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950">
      <Navbar />

      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-red-500/4 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-red-500/3 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-lg mx-auto px-4 py-10">
        <div className="mb-8">
          <Link
            to={`/scan/${id}`}
            className="inline-flex items-center gap-1.5 text-zinc-500 hover:text-amber-400 text-sm font-medium mb-4 transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
            Back to Scan Page
          </Link>
          <h1 className="text-white text-2xl font-bold tracking-tight">
            Report a <span className="text-red-400">Complaint</span>
          </h1>
          <p className="text-zinc-500 text-sm mt-1">Help us improve food quality on Indian Railways</p>
        </div>

        {submitted ? (
          <div className="bg-zinc-900/80 border border-zinc-800/80 rounded-3xl p-10 text-center shadow-2xl ring-1 ring-white/5">
            <div className="w-16 h-16 bg-emerald-500/10 border border-emerald-500/30 rounded-full flex items-center justify-center mx-auto mb-5">
              <CheckCircle2 className="w-8 h-8 text-emerald-400" />
            </div>
            <h3 className="text-white text-xl font-bold mb-2">Complaint Submitted</h3>
            <p className="text-zinc-500 text-sm">Your complaint has been registered. Our team will review it shortly.</p>
          </div>
        ) : (
          <div className="bg-zinc-900/80 border border-zinc-800/80 rounded-3xl p-8 shadow-2xl ring-1 ring-white/5">
            {error && (
              <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-sm rounded-xl p-3 mb-6">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="text-zinc-400 text-xs font-medium uppercase tracking-wider mb-1.5 block">Your Name (Optional)</label>
                <input
                  type="text"
                  placeholder="e.g. Priya Sharma"
                  value={passengerName}
                  className="w-full bg-zinc-800/70 border border-zinc-700/80 text-white placeholder-zinc-600 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-amber-400/80 focus:bg-zinc-800 focus:ring-1 focus:ring-amber-400/25 transition-all"
                  onChange={(e) => setPassengerName(e.target.value)}
                />
              </div>

              <div>
                <label className="text-zinc-400 text-xs font-medium uppercase tracking-wider mb-1.5 block">Train Coach</label>
                <input
                  type="text"
                  placeholder="e.g. S4, B2, A1"
                  value={trainCoach}
                  className="w-full bg-zinc-800/70 border border-zinc-700/80 text-white placeholder-zinc-600 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-amber-400/80 focus:bg-zinc-800 focus:ring-1 focus:ring-amber-400/25 transition-all"
                  onChange={(e) => setTrainCoach(e.target.value)}
                />
              </div>

              <div>
                <label className="text-zinc-400 text-xs font-medium uppercase tracking-wider mb-1.5 block">Describe Your Issue</label>
                <textarea
                  placeholder="Please describe the food quality issue in detail..."
                  value={issue}
                  rows={5}
                  className="w-full bg-zinc-800/70 border border-zinc-700/80 text-white placeholder-zinc-600 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-amber-400/80 focus:bg-zinc-800 focus:ring-1 focus:ring-amber-400/25 transition-all resize-none"
                  onChange={(e) => setIssue(e.target.value)}
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-400 hover:to-red-500 disabled:from-red-500/40 disabled:to-red-600/40 text-white font-bold py-3.5 rounded-xl transition-all duration-200 text-sm tracking-wide shadow-lg shadow-red-500/20"
              >
                {loading ? "Submitting..." : "Submit Complaint"}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

export default Complaint;
