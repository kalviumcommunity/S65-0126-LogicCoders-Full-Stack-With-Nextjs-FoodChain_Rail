import { useState } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";

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
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-amber-400/3 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-2xl mx-auto px-4 py-10">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-white text-2xl font-bold tracking-tight">
            Create Food <span className="text-amber-400">Batch</span>
          </h1>
          <p className="text-zinc-500 text-sm mt-1">Register a new food batch and generate a traceability QR code</p>
        </div>

        {/* Form Card */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 shadow-2xl">
          {error && (
            <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-sm rounded-xl p-3 mb-6">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Food Name */}
              <div className="md:col-span-2">
                <label className="text-zinc-400 text-xs font-medium uppercase tracking-wider mb-1.5 block">Food Name</label>
                <input
                  type="text"
                  placeholder="e.g. Veg Biryani, Rajma Rice"
                  value={foodName}
                  className="w-full bg-zinc-800 border border-zinc-700 text-white placeholder-zinc-600 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400/30 transition-all"
                  onChange={(e) => setFoodName(e.target.value)}
                  required
                />
              </div>

              {/* Category */}
              <div className="md:col-span-2">
                <label className="text-zinc-400 text-xs font-medium uppercase tracking-wider mb-1.5 block">Food Category</label>
                <div className="flex gap-3">
                  {[("veg"), ("non-veg"), ("egg")].map((cat) => {
                    const colors = {
                      veg: "border-emerald-500 bg-emerald-500/10 text-emerald-400",
                      "non-veg": "border-red-500 bg-red-500/10 text-red-400",
                      egg: "border-amber-500 bg-amber-500/10 text-amber-400"
                    };
                    const inactive = "border-zinc-700 bg-zinc-800 text-zinc-500 hover:border-zinc-600";
                    return (
                      <button
                        key={cat}
                        type="button"
                        onClick={() => setCategory(cat)}
                        className={`flex-1 py-2.5 rounded-xl border text-sm font-medium capitalize transition-all ${
                          category === cat ? colors[cat] : inactive
                        }`}
                      >
                        {cat === "veg" ? "🟢 Veg" : cat === "non-veg" ? "🔴 Non-Veg" : "🟡 Egg"}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Kitchen Location */}
              <div className="md:col-span-2">
                <label className="text-zinc-400 text-xs font-medium uppercase tracking-wider mb-1.5 block">Kitchen / Station Name</label>
                <input
                  type="text"
                  placeholder="e.g. New Delhi Railway Station Kitchen, Pantry Car"
                  value={kitchenLocation}
                  className="w-full bg-zinc-800 border border-zinc-700 text-white placeholder-zinc-600 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400/30 transition-all"
                  onChange={(e) => setKitchenLocation(e.target.value)}
                />
              </div>

              {/* Ingredients */}
              <div className="md:col-span-2">
                <label className="text-zinc-400 text-xs font-medium uppercase tracking-wider mb-1.5 block">Ingredients / Allergens</label>
                <input
                  type="text"
                  placeholder="e.g. Rice, Spices, Onion, Milk (no nuts)"
                  value={ingredients}
                  className="w-full bg-zinc-800 border border-zinc-700 text-white placeholder-zinc-600 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400/30 transition-all"
                  onChange={(e) => setIngredients(e.target.value)}
                />
              </div>

              {/* Prepared At */}
              <div>
                <label className="text-zinc-400 text-xs font-medium uppercase tracking-wider mb-1.5 block">Prepared At</label>
                <input
                  type="datetime-local"
                  value={preparedAt}
                  className="w-full bg-zinc-800 border border-zinc-700 text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400/30 transition-all [color-scheme:dark]"
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
                  className="w-full bg-zinc-800 border border-zinc-700 text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400/30 transition-all [color-scheme:dark]"
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
                  className="w-full bg-zinc-800 border border-zinc-700 text-white placeholder-zinc-600 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400/30 transition-all"
                  onChange={(e) => setTrainNumber(e.target.value)}
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-amber-400 hover:bg-amber-300 disabled:bg-amber-400/50 text-zinc-950 font-bold py-3.5 rounded-xl transition-all duration-200 text-sm tracking-wide mt-6"
            >
              {loading ? "Generating QR Code..." : "Generate QR Code"}
            </button>
          </form>
        </div>

        {/* QR Result */}
        {success && qr && (
          <div className="mt-6 bg-zinc-900 border border-zinc-800 rounded-2xl p-8 shadow-2xl text-center">
            <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-medium px-3 py-1.5 rounded-full mb-5">
              <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full"></span>
              Batch Created Successfully
            </div>

            <h3 className="text-white text-lg font-semibold mb-4">QR Code Generated</h3>

            <div className="bg-white rounded-2xl p-4 inline-block shadow-xl">
              <img src={qr} alt="QR Code" className="w-48 h-48" />
            </div>

            <p className="text-zinc-500 text-xs mt-4 mb-2">Scan URL</p>
            <a
              href={`http://localhost:5173/scan/${batchId}`}
              target="_blank"
              rel="noreferrer"
              className="text-amber-400 hover:text-amber-300 text-sm break-all transition-colors"
            >
              http://localhost:5173/scan/{batchId}
            </a>
          </div>
        )}
      </div>
    </div>
  );
}

export default CreateBatch;
