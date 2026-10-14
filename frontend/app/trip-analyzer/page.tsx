"use client";

import { useState } from "react";
import { Calculator, DollarSign, Leaf, Star, ThumbsUp, ShieldCheck } from "lucide-react";
import { fetchApi, TripAnalyzerResponse } from "@/lib/api";

export default function TripAnalyzerPage() {
    const [formData, setFormData] = useState({
        destination_country: "France",
        num_travelers: "2",
        duration_nights: "7",
        transport_mode: "Air",
        accommodation_type: "4-Star Hotel",
        traveler_type: "Any",
        travel_purpose: "Any"
    });

    const [loading, setLoading] = useState(false);
    const [results, setResults] = useState<TripAnalyzerResponse | null>(null);
    const [error, setError] = useState<string | null>(null);

    const handleCalculate = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const payload = {
                destination_country: formData.destination_country,
                num_travelers: parseInt(formData.num_travelers) || 1,
                duration_nights: parseInt(formData.duration_nights) || 7,
                transport_mode: formData.transport_mode,
                accommodation_type: formData.accommodation_type,
                traveler_type: formData.traveler_type,
                travel_purpose: formData.travel_purpose
            };

            const res = await fetchApi<TripAnalyzerResponse>("/trip-analyzer", {
                method: "POST",
                body: JSON.stringify(payload)
            });

            setResults(res);
        } catch (err: any) {
            console.error("Trip analyzer error:", err);
            setError("Failed to calculate historical metrics. Please check backend service.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 bg-[#FFF2DA] min-h-screen text-[#162622]">
            {/* Title */}
            <div className="border-b border-[#3F6A5E]/20 pb-6 space-y-2">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-[#213832] text-[#FFF2DA] text-xs font-semibold">
                    <Calculator className="w-3.5 h-3.5 text-[#76B7A6]" />
                    Historical Estimator
                </div>
                <h1 className="text-3xl font-black text-[#162622] tracking-tight">
                    Trip Cost & Carbon Footprint Analyzer
                </h1>
                <p className="text-sm text-[#213832]/80 max-w-2xl leading-relaxed font-medium">
                    Configure a custom trip profile to calculate estimated total spend, daily cost intensity, carbon footprint, and expected attractions based on historical dataset averages.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                {/* Form */}
                <div className="bg-[#FFFFFF] border border-[#3F6A5E]/20 rounded-2xl p-6 space-y-4 shadow-sm">
                    <h2 className="text-sm font-bold uppercase tracking-wider text-[#162622] border-b border-[#3F6A5E]/15 pb-3">
                        Trip Specifications
                    </h2>

                    <form onSubmit={handleCalculate} className="space-y-4 text-xs">
                        <div>
                            <label className="block text-[#213832] font-semibold mb-1">Destination Country</label>
                            <select
                                value={formData.destination_country}
                                onChange={(e) => setFormData({ ...formData, destination_country: e.target.value })}
                                className="w-full bg-[#FAF0DC] border border-[#3F6A5E]/30 rounded-lg px-3 py-2 text-[#162622] font-semibold focus:outline-none focus:border-[#76B7A6]"
                            >
                                <option value="Any">Any Destination</option>
                                {["France", "Egypt", "Thailand", "Malaysia", "New Zealand", "Italy", "UAE", "Japan", "Singapore", "Turkey", "Switzerland", "Maldives", "United States", "United Kingdom", "Germany", "Spain", "Australia", "Canada", "Brazil", "India"].map((d) => (
                                    <option key={d} value={d}>{d}</option>
                                ))}
                            </select>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="block text-[#213832] font-semibold mb-1">Travelers</label>
                                <input
                                    type="number"
                                    min="1"
                                    max="20"
                                    value={formData.num_travelers}
                                    onChange={(e) => setFormData({ ...formData, num_travelers: e.target.value })}
                                    className="w-full bg-[#FAF0DC] border border-[#3F6A5E]/30 rounded-lg px-3 py-2 text-[#162622] font-semibold focus:outline-none focus:border-[#76B7A6]"
                                />
                            </div>
                            <div>
                                <label className="block text-[#213832] font-semibold mb-1">Nights</label>
                                <input
                                    type="number"
                                    min="1"
                                    max="60"
                                    value={formData.duration_nights}
                                    onChange={(e) => setFormData({ ...formData, duration_nights: e.target.value })}
                                    className="w-full bg-[#FAF0DC] border border-[#3F6A5E]/30 rounded-lg px-3 py-2 text-[#162622] font-semibold focus:outline-none focus:border-[#76B7A6]"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-[#213832] font-semibold mb-1">Transport Mode</label>
                            <select
                                value={formData.transport_mode}
                                onChange={(e) => setFormData({ ...formData, transport_mode: e.target.value })}
                                className="w-full bg-[#FAF0DC] border border-[#3F6A5E]/30 rounded-lg px-3 py-2 text-[#162622] font-semibold focus:outline-none focus:border-[#76B7A6]"
                            >
                                <option value="Air">Air Travel</option>
                                <option value="Rail">Rail Transport (Lowest CO₂)</option>
                                <option value="Road">Road / Driving</option>
                                <option value="Ferry">Ferry</option>
                                <option value="Cruise Ship">Cruise Ship</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-[#213832] font-semibold mb-1">Accommodation</label>
                            <select
                                value={formData.accommodation_type}
                                onChange={(e) => setFormData({ ...formData, accommodation_type: e.target.value })}
                                className="w-full bg-[#FAF0DC] border border-[#3F6A5E]/30 rounded-lg px-3 py-2 text-[#162622] font-semibold focus:outline-none focus:border-[#76B7A6]"
                            >
                                <option value="4-Star Hotel">4-Star Hotel</option>
                                <option value="5-Star Hotel">5-Star Luxury Hotel</option>
                                <option value="3-Star Hotel">3-Star Hotel</option>
                                <option value="Airbnb/Vacation Rental">Airbnb / Vacation Rental</option>
                                <option value="Budget Hotel/Hostel">Hostel / Budget Hotel</option>
                                <option value="Resort">Resort</option>
                                <option value="Guesthouse">Guesthouse</option>
                            </select>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-3 px-4 rounded-xl bg-[#213832] hover:bg-[#162622] text-[#FFF2DA] font-bold text-xs transition-colors flex items-center justify-center gap-2 shadow-sm disabled:opacity-50"
                        >
                            {loading ? "Calculating..." : "Calculate Trip Metrics"}
                        </button>
                    </form>
                </div>

                {/* Output Area */}
                <div className="lg:col-span-2 space-y-6">
                    {!results && (
                        <div className="bg-[#FFFFFF] border border-[#3F6A5E]/20 rounded-2xl p-8 text-center text-[#213832]/80 text-xs space-y-2 shadow-sm font-medium">
                            <Calculator className="w-8 h-8 text-[#3F6A5E] mx-auto" />
                            <p>Configure parameters on the left and click Calculate Trip Metrics to view historical estimates.</p>
                        </div>
                    )}

                    {error && (
                        <div className="p-4 rounded-xl bg-red-100 border border-red-300 text-xs text-red-800 font-semibold">
                            {error}
                        </div>
                    )}

                    {results && (
                        <div className="space-y-6">
                            <div className="bg-[#FFFFFF] border border-[#3F6A5E]/20 rounded-2xl p-4 flex items-center justify-between text-xs shadow-sm">
                                <div>
                                    <span className="text-[#3F6A5E] uppercase tracking-wider text-[10px] font-bold block">Sample Match</span>
                                    <span className="text-[#162622] font-black text-sm">
                                        {results.matching_historical_trips} trips matched parameters
                                    </span>
                                </div>
                                <div className="flex items-center gap-1.5 text-[#213832] font-bold text-[11px]">
                                    <ShieldCheck className="w-4 h-4 text-[#3F6A5E]" />
                                    Historical Averages
                                </div>
                            </div>

                            {/* Main Metric Cards */}
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs">
                                <div className="bg-[#FFFFFF] border border-[#3F6A5E]/20 rounded-2xl p-5 space-y-1 shadow-sm">
                                    <span className="text-[#3F6A5E] uppercase font-bold text-[10px] block">Est Total Trip Spend</span>
                                    <span className="text-2xl font-black text-[#162622] flex items-center gap-1">
                                        <DollarSign className="w-5 h-5 text-[#3F6A5E]" />
                                        ${results.est_total_spend_usd.toLocaleString()}
                                    </span>
                                    <span className="text-[10px] text-[#213832]/75 block font-semibold">${results.est_spend_per_night_usd}/night</span>
                                </div>

                                <div className="bg-[#FFFFFF] border border-[#3F6A5E]/20 rounded-2xl p-5 space-y-1 shadow-sm">
                                    <span className="text-[#3F6A5E] uppercase font-bold text-[10px] block">Est Spend / Traveler</span>
                                    <span className="text-2xl font-black text-[#162622] flex items-center gap-1">
                                        <DollarSign className="w-5 h-5 text-[#3F6A5E]" />
                                        ${results.est_spend_per_traveler_usd.toLocaleString()}
                                    </span>
                                </div>

                                <div className="bg-[#FFFFFF] border border-[#3F6A5E]/20 rounded-2xl p-5 space-y-1 shadow-sm">
                                    <span className="text-[#3F6A5E] uppercase font-bold text-[10px] block">Est Carbon Footprint</span>
                                    <span className="text-2xl font-black text-[#162622] flex items-center gap-1">
                                        <Leaf className="w-5 h-5 text-[#3F6A5E]" />
                                        {results.est_carbon_footprint_kg.toLocaleString()} kg
                                    </span>
                                    <span className="text-[10px] text-[#213832]/75 block font-semibold">{results.est_carbon_per_traveler_kg} kg / traveler</span>
                                </div>
                            </div>

                            {/* Secondary Metrics */}
                            <div className="grid grid-cols-3 gap-4 text-xs">
                                <div className="bg-[#FFFFFF] border border-[#3F6A5E]/20 rounded-2xl p-4 shadow-sm">
                                    <span className="text-[10px] text-[#3F6A5E] uppercase font-bold block mb-1">Expected Sightseeing</span>
                                    <span className="font-black text-[#162622] text-base">{results.est_attractions_visited} attractions</span>
                                </div>

                                <div className="bg-[#FFFFFF] border border-[#3F6A5E]/20 rounded-2xl p-4 shadow-sm">
                                    <span className="text-[10px] text-[#3F6A5E] uppercase font-bold block mb-1">Avg Satisfaction</span>
                                    <span className="font-black text-[#162622] text-base flex items-center gap-1">
                                        <Star className="w-4 h-4 text-[#3F6A5E]" />
                                        {results.avg_satisfaction_score} / 5.0
                                    </span>
                                </div>

                                <div className="bg-[#FFFFFF] border border-[#3F6A5E]/20 rounded-2xl p-4 shadow-sm">
                                    <span className="text-[10px] text-[#3F6A5E] uppercase font-bold block mb-1">Recommendation Likelihood</span>
                                    <span className="font-black text-[#162622] text-base flex items-center gap-1">
                                        <ThumbsUp className="w-4 h-4 text-[#3F6A5E]" />
                                        {results.recommendation_rate_percent}%
                                    </span>
                                </div>
                            </div>

                            {/* Disclaimer */}
                            <div className="p-4 rounded-xl bg-[#FFFFFF] border border-[#3F6A5E]/20 text-[11px] text-[#213832]/80 font-medium">
                                <strong>Notice:</strong> {results.disclaimer}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
