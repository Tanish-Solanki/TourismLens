"use client";

import { useEffect, useState } from "react";
import { Search, Layers, ArrowUpDown } from "lucide-react";
import { fetchApi, DestinationProfile } from "@/lib/api";
import { DestinationCard } from "@/components/DestinationCard";

export default function ExplorePage() {
    const [destinations, setDestinations] = useState<DestinationProfile[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const [search, setSearch] = useState("");
    const [sortBy, setSortBy] = useState<"trips" | "spend" | "satisfaction" | "recommendation" | "carbon">("trips");

    useEffect(() => {
        async function loadData() {
            try {
                const data = await fetchApi<DestinationProfile[]>("/destinations");
                setDestinations(data);
            } catch (err: any) {
                console.error("Explore load error:", err);
                setError("Failed to load destination profiles from backend API.");
            } finally {
                setLoading(false);
            }
        }
        loadData();
    }, []);

    const filteredDestinations = destinations
        .filter((d) => d.destination_country.toLowerCase().includes(search.toLowerCase()))
        .sort((a, b) => {
            if (sortBy === "trips") return b.total_trips - a.total_trips;
            if (sortBy === "spend") return b.avg_total_spend_usd - a.avg_total_spend_usd;
            if (sortBy === "satisfaction") return b.avg_satisfaction_score - a.avg_satisfaction_score;
            if (sortBy === "recommendation") return b.recommendation_rate_percent - a.recommendation_rate_percent;
            if (sortBy === "carbon") return a.avg_carbon_footprint_kg - b.avg_carbon_footprint_kg;
            return 0;
        });

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 bg-[#FFF2DA] min-h-screen text-[#162622]">
            {/* Page Title */}
            <div className="border-b border-[#3F6A5E]/20 pb-6 space-y-2">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-[#213832] text-[#FFF2DA] text-xs font-semibold">
                    <Layers className="w-3.5 h-3.5 text-[#76B7A6]" />
                    5-Dimension Profiling System
                </div>
                <h1 className="text-3xl font-black text-[#162622] tracking-tight">
                    Explore Destinations
                </h1>
                <p className="text-sm text-[#213832]/80 max-w-2xl leading-relaxed font-medium">
                    Browse data profiles for all 20 global destinations analyzed across 10,000 trips.
                    Sort by Popularity, Average Spend, Satisfaction, Recommendation Likelihood, or CO₂ Footprint.
                </p>
            </div>

            {/* Filter and Search Bar */}
            <div className="bg-[#FFFFFF] border border-[#3F6A5E]/20 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
                <div className="relative w-full sm:w-80">
                    <Search className="w-4 h-4 text-[#3F6A5E] absolute left-3 top-3" />
                    <input
                        type="text"
                        placeholder="Search destination country..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full bg-[#FAF0DC] border border-[#3F6A5E]/30 rounded-lg pl-9 pr-3 py-2 text-xs text-[#162622] font-semibold focus:outline-none focus:border-[#76B7A6]"
                    />
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto">
                    <ArrowUpDown className="w-4 h-4 text-[#3F6A5E]" />
                    <span className="text-xs text-[#213832] font-bold whitespace-nowrap">Sort By:</span>
                    <select
                        value={sortBy}
                        onChange={(e: any) => setSortBy(e.target.value)}
                        className="bg-[#FAF0DC] border border-[#3F6A5E]/30 rounded-lg px-3 py-2 text-xs text-[#162622] font-semibold focus:outline-none focus:border-[#76B7A6]"
                    >
                        <option value="trips">Popularity (Trip Volume)</option>
                        <option value="spend">Highest Average Spend</option>
                        <option value="satisfaction">Highest Satisfaction Score</option>
                        <option value="recommendation">Highest Recommendation Rate</option>
                        <option value="carbon">Lowest CO₂ Carbon Footprint</option>
                    </select>
                </div>
            </div>

            {/* Content Area */}
            {loading && (
                <div className="text-center py-16 text-xs text-[#213832]/80 font-medium">
                    Loading 20 destination profiles from backend API...
                </div>
            )}

            {error && (
                <div className="p-4 rounded-xl bg-red-100 border border-red-300 text-xs text-red-800 text-center font-semibold">
                    {error}
                </div>
            )}

            {!loading && !error && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredDestinations.map((dest, idx) => (
                        <DestinationCard key={dest.destination_country} destination={dest} rank={idx + 1} />
                    ))}
                </div>
            )}
        </div>
    );
}
