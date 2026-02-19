import { useParams } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

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
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-red-500/3 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-lg mx-auto px-4 py-10">
        <div className="mb-8">
          <h1 className="text-white text-2xl font-bold tracking-tight">
            Report a <span className="text-red-400">Complaint</span>
          </h1>
          <p className="text-zinc-500 text-sm mt-1">Help us improve food quality on Indian Railways</p>
        </div>

        {submitted ? (
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-10 text-center shadow-2xl">
            <div className="w-16 h-16 bg-emerald-500/10 border border-emerald-500/30 rounded-full flex items-center justify-center mx-auto mb-5">
              <svg className="w-8 h-8 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-white text-lg font-semibold mb-2">Complaint Submitted</h3>
            <p className="text-zinc-500 text-sm">Your complaint has been registered. Our team will review it shortly.</p>
          </div>
        ) : (
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 shadow-2xl">
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
                  className="w-full bg-zinc-800 border border-zinc-700 text-white placeholder-zinc-600 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400/30 transition-all"
                  onChange={(e) => setPassengerName(e.target.value)}
                />
              </div>

              <div>
                <label className="text-zinc-400 text-xs font-medium uppercase tracking-wider mb-1.5 block">Train Coach</label>
                <input
                  type="text"
                  placeholder="e.g. S4, B2, A1"
                  value={trainCoach}
                  className="w-full bg-zinc-800 border border-zinc-700 text-white placeholder-zinc-600 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400/30 transition-all"
                  onChange={(e) => setTrainCoach(e.target.value)}
                />
              </div>

              <div>
                <label className="text-zinc-400 text-xs font-medium uppercase tracking-wider mb-1.5 block">Describe Your Issue</label>
                <textarea
                  placeholder="Please describe the food quality issue in detail..."
                  value={issue}
                  rows={5}
                  className="w-full bg-zinc-800 border border-zinc-700 text-white placeholder-zinc-600 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400/30 transition-all resize-none"
                  onChange={(e) => setIssue(e.target.value)}
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-red-500 hover:bg-red-400 disabled:bg-red-500/50 text-white font-bold py-3.5 rounded-xl transition-all duration-200 text-sm tracking-wide"
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
