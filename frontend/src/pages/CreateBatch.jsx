import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import axios from "axios";
import { ArrowLeft, Leaf, Beef, Egg, Copy, Check, CheckCircle2, QrCode, Loader2 } from "lucide-react";

function CreateBatch() {
  const [foodName, setFoodName] = useState("");
  const [category, setCategory] = useState("veg");
  const [kitchenLocation, setKitchenLocation] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [preparedAt, setPreparedAt] = useState("");
  const [expiryTime, setExpiryTime] = useState("");
  const [trainNumber, setTrainNumber] = useState("");
  const [qr, setQr] = useState("");
  const [batchId, setBatchId] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopyLink = () => {
    const url = `${window.location.origin}/scan/${batchId}`;
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handleCreateAnother = () => {
    setSuccess(false);
    setQr("");
    setBatchId("");
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess(false);
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:5000/api/batch/create", {
        foodName,
        category,
        kitchenLocation,
        ingredients,
        preparedAt,
        expiryTime,
        trainNumber,
      }, { withCredentials: true });

      setQr(res.data.qrCode);
      setBatchId(res.data._id);
      setSuccess(true);
      setFoodName("");
      setCategory("veg");
      setKitchenLocation("");
      setIngredients("");
      setPreparedAt("");
      setExpiryTime("");
      setTrainNumber("");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create batch. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950">
      <Navbar />

      {/* Background glow */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-amber-400/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 right-0 w-64 h-64 bg-amber-500/3 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-2xl mx-auto px-4 py-10">
        {/* Header */}
        <div className="mb-8">
          <Link
            to="/dashboard"
            className="inline-flex items-center gap-1.5 text-zinc-500 hover:text-amber-400 text-sm font-medium mb-4 transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
            Back to Dashboard
          </Link>
          <h1 className="text-white text-2xl font-bold tracking-tight">
            Create Food <span className="text-amber-400">Batch</span>
          </h1>
          <p className="text-zinc-500 text-sm mt-1">Register a new food batch and generate a traceability QR code</p>
        </div>

        {/* Form Card */}
        <div className="bg-zinc-900/80 border border-zinc-800/80 rounded-3xl p-8 shadow-2xl shadow-black/40 ring-1 ring-white/5">
          {error && (
            <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-sm rounded-xl p-3 mb-6">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="space-y-6">
              {/* Section: Item Info */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-1 h-4 bg-amber-400 rounded-full" />
                  <p className="text-zinc-400 text-xs font-bold uppercase tracking-widest">Item Information</p>
                </div>
                <div className="space-y-4">
              {/* Food Name */}
              <div>
                <label className="text-zinc-400 text-xs font-medium uppercase tracking-wider mb-1.5 block">Food Name</label>
                <input
                  type="text"
                  placeholder="e.g. Veg Biryani, Rajma Rice"
                  value={foodName}
                  className="w-full bg-zinc-800/70 border border-zinc-700/80 text-white placeholder-zinc-600 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-amber-400/80 focus:bg-zinc-800 focus:ring-1 focus:ring-amber-400/25 transition-all"
                  onChange={(e) => setFoodName(e.target.value)}
                  required
                />
              </div>

              {/* Category */}
              <div>
                <label className="text-zinc-400 text-xs font-medium uppercase tracking-wider mb-1.5 block">Food Category</label>
                <div className="flex gap-3">
                  {["veg", "non-veg", "egg"].map((cat) => {
                    const configs = {
                      veg: { active: "border-emerald-500 bg-emerald-500/10 text-emerald-400 shadow-sm shadow-emerald-500/20", icon: <Leaf className="w-4 h-4" />, label: "Veg" },
                      "non-veg": { active: "border-red-500 bg-red-500/10 text-red-400 shadow-sm shadow-red-500/20", icon: <Beef className="w-4 h-4" />, label: "Non-Veg" },
                      egg: { active: "border-amber-500 bg-amber-500/10 text-amber-400 shadow-sm shadow-amber-500/20", icon: <Egg className="w-4 h-4" />, label: "Egg" },
                    };
                    const inactive = "border-zinc-700/80 bg-zinc-800/70 text-zinc-500 hover:border-zinc-600 hover:text-zinc-400";
                    const cfg = configs[cat];
                    return (
                      <button
                        key={cat}
                        type="button"
                        onClick={() => setCategory(cat)}
                        className={`flex-1 py-3 rounded-xl border text-sm font-semibold capitalize transition-all inline-flex items-center justify-center gap-2 ${
                          category === cat ? cfg.active : inactive
                        }`}
                      >
                        {cfg.icon} {cfg.label}
                      </button>
                    );
                  })}
                </div>
              </div>
                </div>
              </div>

              {/* Section: Origin & Contents */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-1 h-4 bg-emerald-400 rounded-full" />
                  <p className="text-zinc-400 text-xs font-bold uppercase tracking-widest">Origin & Contents</p>
                </div>
                <div className="space-y-4">
              {/* Kitchen Location */}
              <div>
                <label className="text-zinc-400 text-xs font-medium uppercase tracking-wider mb-1.5 block">Kitchen / Station Name</label>
                <input
                  type="text"
                  placeholder="e.g. New Delhi Railway Station Kitchen, Pantry Car"
                  value={kitchenLocation}
                  className="w-full bg-zinc-800/70 border border-zinc-700/80 text-white placeholder-zinc-600 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-amber-400/80 focus:bg-zinc-800 focus:ring-1 focus:ring-amber-400/25 transition-all"
                  onChange={(e) => setKitchenLocation(e.target.value)}
                />
              </div>

              {/* Ingredients */}
              <div>
                <label className="text-zinc-400 text-xs font-medium uppercase tracking-wider mb-1.5 block">Ingredients / Allergens</label>
                <input
                  type="text"
                  placeholder="e.g. Rice, Spices, Onion, Milk (no nuts)"
                  value={ingredients}
                  className="w-full bg-zinc-800/70 border border-zinc-700/80 text-white placeholder-zinc-600 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-amber-400/80 focus:bg-zinc-800 focus:ring-1 focus:ring-amber-400/25 transition-all"
                  onChange={(e) => setIngredients(e.target.value)}
                />
              </div>
                </div>
              </div>

              {/* Section: Schedule & Train */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-1 h-4 bg-blue-400 rounded-full" />
                  <p className="text-zinc-400 text-xs font-bold uppercase tracking-widest">Schedule & Train</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Prepared At */}
              <div>
                <label className="text-zinc-400 text-xs font-medium uppercase tracking-wider mb-1.5 block">Prepared At</label>
                <input
                  type="datetime-local"
                  value={preparedAt}
                  className="w-full bg-zinc-800/70 border border-zinc-700/80 text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-amber-400/80 focus:bg-zinc-800 focus:ring-1 focus:ring-amber-400/25 transition-all [color-scheme:dark]"
                  onChange={(e) => setPreparedAt(e.target.value)}
                  required
                />
              </div>

              {/* Expiry Time */}
              <div>
                <label className="text-zinc-400 text-xs font-medium uppercase tracking-wider mb-1.5 block">Expiry Time</label>
                <input
                  type="datetime-local"
                  value={expiryTime}
                  className="w-full bg-zinc-800/70 border border-zinc-700/80 text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-amber-400/80 focus:bg-zinc-800 focus:ring-1 focus:ring-amber-400/25 transition-all [color-scheme:dark]"
                  onChange={(e) => setExpiryTime(e.target.value)}
                  required
                />
              </div>

              {/* Train Number */}
              <div>
                <label className="text-zinc-400 text-xs font-medium uppercase tracking-wider mb-1.5 block">Train Number</label>
                <input
                  type="text"
                  placeholder="e.g. 12301"
                  value={trainNumber}
                  className="w-full bg-zinc-800/70 border border-zinc-700/80 text-white placeholder-zinc-600 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-amber-400/80 focus:bg-zinc-800 focus:ring-1 focus:ring-amber-400/25 transition-all"
                  onChange={(e) => setTrainNumber(e.target.value)}
                  required
                />
              </div>
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 disabled:from-amber-400/40 disabled:to-amber-500/40 text-zinc-950 font-bold py-4 rounded-xl transition-all duration-200 text-sm tracking-wide mt-6 inline-flex items-center justify-center gap-2 shadow-lg shadow-amber-400/20 hover:shadow-amber-400/30"
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <QrCode className="w-4 h-4" />}
              {loading ? "Generating QR Code..." : "Generate QR Code"}
            </button>
          </form>
        </div>

        {/* QR Result */}
        {success && qr && (
          <div className="mt-6 bg-zinc-900/80 border border-zinc-800/80 rounded-3xl p-8 shadow-2xl shadow-black/40 text-center ring-1 ring-white/5">
            <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 text-xs font-semibold px-4 py-2 rounded-full mb-6">
              <CheckCircle2 className="w-3.5 h-3.5" />
              Batch Created Successfully
            </div>

            <h3 className="text-white text-xl font-bold tracking-tight mb-5">QR Code Generated</h3>

            <div className="bg-white rounded-2xl p-5 inline-block shadow-2xl shadow-black/50 mb-5 ring-4 ring-white/5">
              <img src={qr} alt="QR Code" className="w-52 h-52" />
            </div>

            <p className="text-zinc-600 text-xs uppercase tracking-widest mb-1.5">Scan URL</p>
            <a
              href={`/scan/${batchId}`}
              target="_blank"
              rel="noreferrer"
              className="text-amber-400 hover:text-amber-300 text-sm break-all transition-colors block mb-6"
            >
              {window.location.origin}/scan/{batchId}
            </a>

            <div className="flex gap-3 justify-center">
              <button
                onClick={handleCopyLink}
                className="inline-flex items-center gap-2 bg-zinc-800/80 hover:bg-zinc-700 border border-zinc-700/80 text-zinc-200 text-sm font-semibold px-5 py-3 rounded-xl transition-all"
              >
                {copied ? (
                  <><Check className="w-4 h-4 text-emerald-400" /> Copied!</>
                ) : (
                  <><Copy className="w-4 h-4" /> Copy Link</>
                )}
              </button>
              <button
                onClick={handleCreateAnother}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-zinc-950 font-bold text-sm px-5 py-3 rounded-xl transition-all shadow-lg shadow-amber-400/20"
              >
                + Create Another
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default CreateBatch;
