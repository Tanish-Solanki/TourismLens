"use client";

import { useEffect, useState } from "react";
import { Scale, DollarSign, Star, ThumbsUp, Leaf, MapPin, Trash2 } from "lucide-react";
import { fetchApi, DestinationProfile } from "@/lib/api";

export default function ComparePage() {
    const [allDestinations, setAllDestinations] = useState<DestinationProfile[]>([]);
    const [selectedNames, setSelectedNames] = useState<string[]>(["France", "Japan"]);
    const [comparedData, setComparedData] = useState<DestinationProfile[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function init() {
            try {
                const list = await fetchApi<DestinationProfile[]>("/destinations");
                setAllDestinations(list);
            } catch (e) {
                console.error("Compare init error:", e);
            } finally {
                setLoading(false);
            }
        }
        init();
    }, []);

    useEffect(() => {
        if (selectedNames.length === 0) {
            setComparedData([]);
            return;
        }

        async function loadCompared() {
            try {
                const namesQuery = selectedNames.join(",");
                const res = await fetchApi<DestinationProfile[]>(`/destinations-compare?names=${encodeURIComponent(namesQuery)}`);
                setComparedData(res);
            } catch (e) {
                console.error("Load compare error:", e);
            }
        }
        loadCompared();
    }, [selectedNames]);

    const handleAddDestination = (name: string) => {
        if (selectedNames.length >= 3 || selectedNames.includes(name)) return;
        setSelectedNames([...selectedNames, name]);
    };

    const handleRemoveDestination = (name: string) => {
        setSelectedNames(selectedNames.filter((n) => n !== name));
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 bg-[#FFF2DA] min-h-screen text-[#162622]">
            {/* Title */}
            <div className="border-b border-[#3F6A5E]/20 pb-6 space-y-2">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-[#213832] text-[#FFF2DA] text-xs font-semibold">
                    <Scale className="w-3.5 h-3.5 text-[#76B7A6]" />
                    Multi-Dimension Benchmarking
                </div>
                <h1 className="text-3xl font-black text-[#162622] tracking-tight">
                    Compare Destinations
                </h1>
                <p className="text-sm text-[#213832]/80 max-w-2xl leading-relaxed font-medium">
                    Select 2 or 3 destinations to benchmark side-by-side across Popularity, Spending, Experience, Loyalty, and Carbon Footprint.
                </p>
            </div>

            {/* Destination Selection Bar */}
            <div className="bg-[#FFFFFF] border border-[#3F6A5E]/20 rounded-2xl p-5 space-y-4 shadow-sm">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#3F6A5E]">
                        Selected Destinations ({selectedNames.length} / 3)
                    </span>

                    {selectedNames.length < 3 && (
                        <div className="flex items-center gap-2">
                            <select
                                onChange={(e) => {
                                    if (e.target.value) handleAddDestination(e.target.value);
                                    e.target.value = "";
                                }}
                                className="bg-[#FAF0DC] border border-[#3F6A5E]/30 rounded-lg px-3 py-1.5 text-xs text-[#162622] font-semibold focus:outline-none focus:border-[#76B7A6]"
                            >
                                <option value="">+ Add Destination to Compare...</option>
                                {allDestinations
                                    .filter((d) => !selectedNames.includes(d.destination_country))
                                    .map((d) => (
                                        <option key={d.destination_country} value={d.destination_country}>
                                            {d.destination_country}
                                        </option>
                                    ))}
                            </select>
                        </div>
                    )}
                </div>

                <div className="flex flex-wrap gap-2">
                    {selectedNames.map((name) => (
                        <span
                            key={name}
                            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#FAF0DC] border border-[#3F6A5E]/30 text-xs font-bold text-[#162622]"
                        >
                            <MapPin className="w-3.5 h-3.5 text-[#3F6A5E]" />
                            {name}
                            {selectedNames.length > 1 && (
                                <button
                                    onClick={() => handleRemoveDestination(name)}
                                    className="text-[#3F6A5E] hover:text-red-700 ml-1"
                                >
                                    <Trash2 className="w-3.5 h-3.5" />
                                </button>
                            )}
                        </span>
                    ))}
                </div>
            </div>

            {/* Comparison Table & Cards */}
            {comparedData.length > 0 && (
                <div className="space-y-8">
                    {/* Table View */}
                    <div className="overflow-x-auto bg-[#FFFFFF] border border-[#3F6A5E]/20 rounded-2xl shadow-sm">
                        <table className="w-full text-left text-xs">
                            <thead className="bg-[#213832] text-[#FFF2DA] uppercase tracking-wider text-[10px]">
                                <tr>
                                    <th className="p-4 font-bold">Dimension</th>
                                    {comparedData.map((d) => (
                                        <th key={d.destination_country} className="p-4 font-black text-sm">
                                            {d.destination_country}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[#3F6A5E]/15 text-[#162622]">
                                <tr className="bg-[#FAF0DC]/50">
                                    <td className="p-4 font-bold text-[#3F6A5E]">1. Trip Volume (Popularity)</td>
                                    {comparedData.map((d) => (
                                        <td key={d.destination_country} className="p-4 font-black">
                                            {d.total_trips} trips
                                        </td>
                                    ))}
                                </tr>
                                <tr>
                                    <td className="p-4 font-bold text-[#3F6A5E]">2. Avg Total Trip Spend</td>
                                    {comparedData.map((d) => (
                                        <td key={d.destination_country} className="p-4 font-black">
                                            ${d.avg_total_spend_usd.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                                        </td>
                                    ))}
                                </tr>
                                <tr className="bg-[#FAF0DC]/50">
                                    <td className="p-4 font-bold text-[#3F6A5E]">Avg Spend / Traveler</td>
                                    {comparedData.map((d) => (
                                        <td key={d.destination_country} className="p-4 font-bold">
                                            ${d.avg_spend_per_traveler_usd.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                                        </td>
                                    ))}
                                </tr>
                                <tr>
                                    <td className="p-4 font-bold text-[#3F6A5E]">Avg Trip Length</td>
                                    {comparedData.map((d) => (
                                        <td key={d.destination_country} className="p-4 font-bold">
                                            {d.avg_duration_nights.toFixed(1)} nights
                                        </td>
                                    ))}
                                </tr>
                                <tr className="bg-[#FAF0DC]/50">
                                    <td className="p-4 font-bold text-[#3F6A5E]">3. Avg Satisfaction (1-5)</td>
                                    {comparedData.map((d) => (
                                        <td key={d.destination_country} className="p-4 font-black">
                                            {d.avg_satisfaction_score.toFixed(2)} / 5.0
                                        </td>
                                    ))}
                                </tr>
                                <tr>
                                    <td className="p-4 font-bold text-[#3F6A5E]">4. Recommendation Rate</td>
                                    {comparedData.map((d) => (
                                        <td key={d.destination_country} className="p-4 font-black">
                                            {d.recommendation_rate_percent.toFixed(1)}%
                                        </td>
                                    ))}
                                </tr>
                                <tr className="bg-[#FAF0DC]/50">
                                    <td className="p-4 font-bold text-[#3F6A5E]">5. Avg Carbon Footprint</td>
                                    {comparedData.map((d) => (
                                        <td key={d.destination_country} className="p-4 font-black">
                                            {d.avg_carbon_footprint_kg.toFixed(0)} kg CO₂
                                        </td>
                                    ))}
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
}
