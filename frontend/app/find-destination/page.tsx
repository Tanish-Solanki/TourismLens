"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, Sparkles, Filter, Info, MapPin, DollarSign, Star, ThumbsUp, Leaf, ArrowRight, ShieldCheck } from "lucide-react";
import { fetchApi, RecommendationResponse } from "@/lib/api";

export default function FindDestinationPage() {
    const [formData, setFormData] = useState({
        traveler_type: "Any",
        travel_purpose: "Any",
        num_travelers: "",
        preferred_duration_nights: "",
        budget_per_person_usd: "",
        preferred_transport: "Any",
        accommodation_type: "Any",
        preferred_season: "Any",
        sustainability_priority: "Balanced",
        origin_country: "Any"
    });

    const [loading, setLoading] = useState(false);
    const [results, setResults] = useState<RecommendationResponse | null>(null);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const payload = {
                traveler_type: formData.traveler_type,
                travel_purpose: formData.travel_purpose,
                num_travelers: formData.num_travelers ? parseInt(formData.num_travelers) : null,
                preferred_duration_nights: formData.preferred_duration_nights ? parseInt(formData.preferred_duration_nights) : null,
                budget_per_person_usd: formData.budget_per_person_usd ? parseFloat(formData.budget_per_person_usd) : null,
                preferred_transport: formData.preferred_transport,
                accommodation_type: formData.accommodation_type,
                preferred_season: formData.preferred_season,
                sustainability_priority: formData.sustainability_priority,
                origin_country: formData.origin_country
            };

            const data = await fetchApi<RecommendationResponse>("/recommendations", {
                method: "POST",
                body: JSON.stringify(payload)
            });

            setResults(data);
        } catch (err: any) {
            console.error("Match error:", err);
            setError("Failed to fetch historical recommendations. Please verify backend service.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10 bg-[#FFF2DA] min-h-screen text-[#162622]">
            {/* Header */}
            <div className="border-b border-[#3F6A5E]/20 pb-6 space-y-2">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-[#213832] text-[#FFF2DA] text-xs font-semibold">
                    <Sparkles className="w-3.5 h-3.5 text-[#76B7A6]" />
                    Core Application Module
                </div>
                <h1 className="text-3xl font-black text-[#162622] tracking-tight">
                    Find My Destination
                </h1>
                <p className="text-sm text-[#213832]/80 max-w-2xl leading-relaxed font-medium">
                    Filter historical travel records (2019–2024) to discover destinations matching your travel profile.
                    Results are computed transparently from actual trip samples.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                {/* Preference Input Form */}
                <div className="bg-[#FFFFFF] border border-[#3F6A5E]/20 rounded-2xl p-6 space-y-6 shadow-sm">
                    <div className="flex items-center gap-2 border-b border-[#3F6A5E]/15 pb-3">
                        <Filter className="w-4 h-4 text-[#3F6A5E]" />
                        <h2 className="text-sm font-bold uppercase tracking-wider text-[#162622]">
                            Travel Preferences
                        </h2>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                        {/* Traveler Type */}
                        <div>
                            <label className="block text-[#213832] font-semibold mb-1">Traveler Type</label>
                            <select
                                value={formData.traveler_type}
                                onChange={(e) => setFormData({ ...formData, traveler_type: e.target.value })}
                                className="w-full bg-[#FAF0DC] border border-[#3F6A5E]/30 rounded-lg px-3 py-2 text-[#162622] font-semibold focus:outline-none focus:border-[#76B7A6]"
                            >
                                <option value="Any">Any Traveler Type</option>
                                <option value="Solo">Solo Traveler</option>
                                <option value="Couple">Couple</option>
                                <option value="Family">Family</option>
                                <option value="Group Tour">Group Tour</option>
                                <option value="Backpacker">Backpacker</option>
                                <option value="Business Traveler">Business Traveler</option>
                            </select>
                        </div>

                        {/* Travel Purpose */}
                        <div>
                            <label className="block text-[#213832] font-semibold mb-1">Travel Purpose</label>
                            <select
                                value={formData.travel_purpose}
                                onChange={(e) => setFormData({ ...formData, travel_purpose: e.target.value })}
                                className="w-full bg-[#FAF0DC] border border-[#3F6A5E]/30 rounded-lg px-3 py-2 text-[#162622] font-semibold focus:outline-none focus:border-[#76B7A6]"
                            >
                                <option value="Any">Any Purpose</option>
                                <option value="Leisure/Tourism">Leisure / Tourism</option>
                                <option value="Business">Business</option>
                                <option value="Honeymoon">Honeymoon</option>
                                <option value="Adventure/Sports">Adventure / Sports</option>
                                <option value="Cultural Exchange">Cultural Exchange</option>
                                <option value="Digital Nomad">Digital Nomad</option>
                                <option value="Education">Education</option>
                                <option value="Family Visit">Family Visit</option>
                                <option value="Medical Tourism">Medical Tourism</option>
                                <option value="Religious/Pilgrimage">Religious / Pilgrimage</option>
                            </select>
                        </div>

                        {/* Budget per Person */}
                        <div>
                            <label className="block text-[#213832] font-semibold mb-1">Max Budget per Person (USD)</label>
                            <input
                                type="number"
                                placeholder="e.g. 5000 (Optional)"
                                value={formData.budget_per_person_usd}
                                onChange={(e) => setFormData({ ...formData, budget_per_person_usd: e.target.value })}
                                className="w-full bg-[#FAF0DC] border border-[#3F6A5E]/30 rounded-lg px-3 py-2 text-[#162622] font-semibold focus:outline-none focus:border-[#76B7A6]"
                            />
                        </div>

                        {/* Transport Mode */}
                        <div>
                            <label className="block text-[#213832] font-semibold mb-1">Preferred Transport</label>
                            <select
                                value={formData.preferred_transport}
                                onChange={(e) => setFormData({ ...formData, preferred_transport: e.target.value })}
                                className="w-full bg-[#FAF0DC] border border-[#3F6A5E]/30 rounded-lg px-3 py-2 text-[#162622] font-semibold focus:outline-none focus:border-[#76B7A6]"
                            >
                                <option value="Any">Any Transport</option>
                                <option value="Air">Air Travel</option>
                                <option value="Rail">Rail (Low CO₂)</option>
                                <option value="Road">Road / Car</option>
                                <option value="Ferry">Ferry</option>
                                <option value="Cruise Ship">Cruise Ship</option>
                            </select>
                        </div>

                        {/* Accommodation Type */}
                        <div>
                            <label className="block text-[#213832] font-semibold mb-1">Accommodation Tier</label>
                            <select
                                value={formData.accommodation_type}
                                onChange={(e) => setFormData({ ...formData, accommodation_type: e.target.value })}
                                className="w-full bg-[#FAF0DC] border border-[#3F6A5E]/30 rounded-lg px-3 py-2 text-[#162622] font-semibold focus:outline-none focus:border-[#76B7A6]"
                            >
                                <option value="Any">Any Accommodation</option>
                                <option value="5-Star Hotel">5-Star Luxury Hotel</option>
                                <option value="4-Star Hotel">4-Star Hotel</option>
                                <option value="3-Star Hotel">3-Star Hotel</option>
                                <option value="Airbnb/Vacation Rental">Airbnb / Vacation Rental</option>
                                <option value="Budget Hotel/Hostel">Budget Hostel</option>
                                <option value="Resort">Resort</option>
                                <option value="Camping/Glamping">Camping / Glamping</option>
                            </select>
                        </div>

                        {/* Sustainability Priority */}
                        <div>
                            <label className="block text-[#213832] font-semibold mb-1">Sustainability Priority</label>
                            <select
                                value={formData.sustainability_priority}
                                onChange={(e) => setFormData({ ...formData, sustainability_priority: e.target.value })}
                                className="w-full bg-[#FAF0DC] border border-[#3F6A5E]/30 rounded-lg px-3 py-2 text-[#162622] font-semibold focus:outline-none focus:border-[#76B7A6]"
                            >
                                <option value="High">High (Prioritize Lower CO₂ Footprint)</option>
                                <option value="Balanced">Balanced Weighting</option>
                                <option value="Low">Low (Focus on Experience & Spend)</option>
                            </select>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-3 px-4 rounded-xl bg-[#213832] hover:bg-[#162622] text-[#FFF2DA] font-bold text-xs transition-colors flex items-center justify-center gap-2 shadow-md disabled:opacity-50"
                        >
                            {loading ? (
                                <span>Searching Historical Records...</span>
                            ) : (
                                <>
                                    <Search className="w-4 h-4 text-[#76B7A6]" />
                                    Find Historical Destinations
                                </>
                            )}
                        </button>
                    </form>
                </div>

                {/* Results Area */}
                <div className="lg:col-span-2 space-y-6">
                    {!results && !loading && (
                        <div className="bg-[#FFFFFF] border border-[#3F6A5E]/20 rounded-2xl p-8 text-center space-y-4 shadow-sm">
                            <div className="w-12 h-12 rounded-full bg-[#FAF0DC] border border-[#3F6A5E]/20 flex items-center justify-center mx-auto text-[#213832]">
                                <Search className="w-6 h-6" />
                            </div>
                            <div>
                                <h3 className="text-base font-bold text-[#162622]">
                                    Select your preferences to see matching destinations
                                </h3>
                                <p className="text-xs text-[#213832]/80 max-w-md mx-auto mt-1 leading-relaxed font-medium">
                                    Leave any input as &quot;Any&quot; for broad matching across all 10,000 trips.
                                    You can specify traveler type, travel purpose, budget, and transport mode.
                                </p>
                            </div>
                        </div>
                    )}

                    {error && (
                        <div className="p-4 rounded-xl bg-red-100 border border-red-300 text-xs text-red-800 font-semibold">
                            {error}
                        </div>
                    )}

                    {results && (
                        <div className="space-y-6">
                            {/* Summary Header */}
                            <div className="bg-[#FFFFFF] border border-[#3F6A5E]/20 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between text-xs gap-3 shadow-sm">
                                <div>
                                    <span className="text-[#3F6A5E] uppercase tracking-wider text-[10px] font-bold block">
                                        Filtered Historical Sample
                                    </span>
                                    <span className="text-[#162622] font-black text-sm">
                                        {results.total_matching_trips} trips matched your query parameters
                                    </span>
                                </div>
                                <div className="flex items-center gap-2 text-[#213832] font-bold text-[11px]">
                                    <ShieldCheck className="w-4 h-4 text-[#3F6A5E]" />
                                    Transparent Historical Ranking
                                </div>
                            </div>

                            {/* Recommendation Cards */}
                            <div className="space-y-4">
                                {results.matches.map((match, idx) => (
                                    <div key={idx} className="bg-[#FFFFFF] border border-[#3F6A5E]/20 rounded-2xl p-6 hover:border-[#76B7A6] transition-all space-y-4 shadow-sm">
                                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#3F6A5E]/15 pb-4">
                                            <div className="flex items-center gap-3">
                                                <span className="w-8 h-8 rounded-lg bg-[#213832] text-[#FFF2DA] font-extrabold text-sm flex items-center justify-center">
                                                    #{idx + 1}
                                                </span>
                                                <div>
                                                    <h3 className="text-xl font-black text-[#162622] flex items-center gap-2">
                                                        <MapPin className="w-4 h-4 text-[#3F6A5E]" />
                                                        {match.destination_country}
                                                    </h3>
                                                    <p className="text-xs text-[#213832]/75 font-medium mt-0.5">
                                                        Based on {match.matching_trip_count} matching historical trip records
                                                    </p>
                                                </div>
                                            </div>

                                            {/* Match Score Badge */}
                                            <div className="flex items-center gap-2 bg-[#FAF0DC] border border-[#3F6A5E]/30 px-3 py-1.5 rounded-lg">
                                                <span className="text-[10px] text-[#213832] font-bold uppercase">Historical Match</span>
                                                <span className="text-lg font-black text-[#213832]">{match.match_score}%</span>
                                            </div>
                                        </div>

                                        {/* Metrics Breakdown */}
                                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                                            <div className="bg-[#FAF0DC] p-3 rounded-xl border border-[#3F6A5E]/15">
                                                <span className="text-[10px] text-[#3F6A5E] uppercase font-bold block mb-1">Avg Spend / Traveler</span>
                                                <span className="font-bold text-[#162622] flex items-center gap-1 text-sm">
                                                    <DollarSign className="w-3.5 h-3.5 text-[#3F6A5E]" />
                                                    ${match.avg_spend_per_traveler.toLocaleString()}
                                                </span>
                                            </div>

                                            <div className="bg-[#FAF0DC] p-3 rounded-xl border border-[#3F6A5E]/15">
                                                <span className="text-[10px] text-[#3F6A5E] uppercase font-bold block mb-1">Avg Satisfaction</span>
                                                <span className="font-bold text-[#162622] flex items-center gap-1 text-sm">
                                                    <Star className="w-3.5 h-3.5 text-[#3F6A5E]" />
                                                    {match.avg_satisfaction} / 5.0
                                                </span>
                                            </div>

                                            <div className="bg-[#FAF0DC] p-3 rounded-xl border border-[#3F6A5E]/15">
                                                <span className="text-[10px] text-[#3F6A5E] uppercase font-bold block mb-1">Recommendation Rate</span>
                                                <span className="font-bold text-[#162622] flex items-center gap-1 text-sm">
                                                    <ThumbsUp className="w-3.5 h-3.5 text-[#3F6A5E]" />
                                                    {match.recommendation_rate_percent}%
                                                </span>
                                            </div>

                                            <div className="bg-[#FAF0DC] p-3 rounded-xl border border-[#3F6A5E]/15">
                                                <span className="text-[10px] text-[#3F6A5E] uppercase font-bold block mb-1">Avg CO₂ Footprint</span>
                                                <span className="font-bold text-[#162622] flex items-center gap-1 text-sm">
                                                    <Leaf className="w-3.5 h-3.5 text-[#3F6A5E]" />
                                                    {match.avg_carbon_footprint_kg} kg
                                                </span>
                                            </div>
                                        </div>

                                        {/* Why Recommended Explanation */}
                                        <div className="bg-[#FAF0DC] border border-[#3F6A5E]/20 rounded-xl p-4 space-y-2">
                                            <span className="text-[11px] font-bold text-[#162622] uppercase tracking-wider flex items-center gap-1.5">
                                                <Info className="w-3.5 h-3.5 text-[#3F6A5E]" />
                                                Why this destination matches your preferences:
                                            </span>
                                            <ul className="space-y-1 text-xs text-[#213832]/85 pl-4 list-disc font-medium">
                                                {match.why_recommended.map((reason, rIdx) => (
                                                    <li key={rIdx}>{reason}</li>
                                                ))}
                                            </ul>
                                        </div>

                                        {/* Action link */}
                                        <div className="pt-2 flex justify-end">
                                            <Link
                                                href={`/explore/${encodeURIComponent(match.destination_country)}`}
                                                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#213832] hover:bg-[#162622] text-xs font-bold text-[#FFF2DA] transition-colors"
                                            >
                                                Explore Full Destination Profile
                                                <ArrowRight className="w-3.5 h-3.5" />
                                            </Link>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Transparency Notice */}
                            <div className="p-4 rounded-xl bg-[#FFFFFF] border border-[#3F6A5E]/20 text-[11px] text-[#213832]/80 font-medium">
                                <strong>Methodology Note:</strong> {results.historical_disclaimer}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
