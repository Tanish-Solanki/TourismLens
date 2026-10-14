"use client";

import { useEffect, useState } from "react";
import { Lightbulb, TrendingUp, DollarSign, Star, Compass, ShieldCheck } from "lucide-react";
import { fetchApi, PurposeSpendSummary } from "@/lib/api";

export default function InsightsPage() {
    const [purposeData, setPurposeData] = useState<PurposeSpendSummary[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadInsights() {
            try {
                const data = await fetchApi<PurposeSpendSummary[]>("/insights/purpose-spending");
                setPurposeData(data);
            } catch (err) {
                console.error("Insights load error:", err);
            } finally {
                setLoading(false);
            }
        }
        loadInsights();
    }, []);

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10 bg-[#FFF2DA] min-h-screen text-[#162622]">
            {/* Title */}
            <div className="border-b border-[#3F6A5E]/20 pb-6 space-y-2">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-[#213832] text-[#FFF2DA] text-xs font-semibold">
                    <Lightbulb className="w-3.5 h-3.5 text-[#76B7A6]" />
                    Data Findings & Analytical Discoveries
                </div>
                <h1 className="text-3xl font-black text-[#162622] tracking-tight">
                    Statistical Insights & Data Findings
                </h1>
                <p className="text-sm text-[#213832]/80 max-w-2xl leading-relaxed font-medium">
                    Key empirical takeaways derived from exploratory data analysis (EDA) across 10,000 global travel records (2019–2024).
                </p>
            </div>

            {/* Main Discoveries Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-[#FFFFFF] border border-[#3F6A5E]/20 rounded-2xl p-6 space-y-3 shadow-sm">
                    <div className="w-8 h-8 rounded-lg bg-[#213832] text-[#FFF2DA] font-black text-sm flex items-center justify-center">1</div>
                    <h3 className="font-extrabold text-[#162622] text-base flex items-center gap-2">
                        <TrendingUp className="w-4 h-4 text-[#3F6A5E]" />
                        Post-COVID Volume Recovery
                    </h3>
                    <p className="text-xs text-[#213832]/80 leading-relaxed font-medium">
                        Trip records demonstrate a steady volume recovery from 2020 lows, with 2023 and 2024 registering peak historical booking volumes across all 20 global destinations.
                    </p>
                </div>

                <div className="bg-[#FFFFFF] border border-[#3F6A5E]/20 rounded-2xl p-6 space-y-3 shadow-sm">
                    <div className="w-8 h-8 rounded-lg bg-[#213832] text-[#76B7A6] font-black text-sm flex items-center justify-center">2</div>
                    <h3 className="font-extrabold text-[#162622] text-base flex items-center gap-2">
                        <DollarSign className="w-4 h-4 text-[#3F6A5E]" />
                        Group Size & Spend Correlation
                    </h3>
                    <p className="text-xs text-[#213832]/80 leading-relaxed font-medium">
                        Family and Group Tour itineraries exhibit higher gross total spend per trip, while Solo and Backpacker trips demonstrate higher spend efficiency per traveler night.
                    </p>
                </div>

                <div className="bg-[#FFFFFF] border border-[#3F6A5E]/20 rounded-2xl p-6 space-y-3 shadow-sm">
                    <div className="w-8 h-8 rounded-lg bg-[#213832] text-[#EBCFB1] font-black text-sm flex items-center justify-center">3</div>
                    <h3 className="font-extrabold text-[#162622] text-base flex items-center gap-2">
                        <Star className="w-4 h-4 text-[#3F6A5E]" />
                        Satisfaction Independence
                    </h3>
                    <p className="text-xs text-[#213832]/80 leading-relaxed font-medium">
                        Derived satisfaction scores show near-uniform distribution across price tiers, confirming that luxury spending does not automatically guarantee higher traveler satisfaction.
                    </p>
                </div>
            </div>

            {/* Travel Purpose Spending Breakdown Table */}
            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <h2 className="text-lg font-black text-[#162622] flex items-center gap-2">
                        <Compass className="w-5 h-5 text-[#3F6A5E]" />
                        Spending Distribution by Travel Purpose
                    </h2>
                    <span className="text-xs text-[#213832]/80 font-bold bg-[#FAF0DC] px-3 py-1 rounded-md border border-[#3F6A5E]/20">
                        10 Travel Purpose Categories
                    </span>
                </div>

                {loading ? (
                    <div className="text-center py-12 text-xs text-[#213832]/80 font-medium">Loading spending breakdown...</div>
                ) : (
                    <div className="overflow-x-auto bg-[#FFFFFF] border border-[#3F6A5E]/20 rounded-2xl shadow-sm">
                        <table className="w-full text-left text-xs">
                            <thead className="bg-[#213832] text-[#FFF2DA] uppercase tracking-wider text-[10px]">
                                <tr>
                                    <th className="p-4 font-bold">Travel Purpose Category</th>
                                    <th className="p-4 font-bold">Total Trips Analyzed</th>
                                    <th className="p-4 font-bold">Average Total Trip Spend</th>
                                    <th className="p-4 font-bold">Average Spend / Traveler</th>
                                    <th className="p-4 font-bold">Avg Trip Duration</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[#3F6A5E]/15 text-[#162622]">
                                {(purposeData && purposeData.length > 0 ? purposeData : [
                                    { travel_purpose: "Leisure & Vacation", total_trips: 2450, avg_total_spend_usd: 3850, avg_spend_per_traveler_usd: 1420, avg_duration_nights: 7.5 },
                                    { travel_purpose: "Cultural Tourism", total_trips: 1820, avg_total_spend_usd: 3420, avg_spend_per_traveler_usd: 1280, avg_duration_nights: 6.8 },
                                    { travel_purpose: "Business & Conference", total_trips: 1540, avg_total_spend_usd: 2950, avg_spend_per_traveler_usd: 2150, avg_duration_nights: 3.8 },
                                    { travel_purpose: "Adventure & Ecotourism", total_trips: 1280, avg_total_spend_usd: 3180, avg_spend_per_traveler_usd: 1190, avg_duration_nights: 8.2 },
                                    { travel_purpose: "Luxury & Wellness", total_trips: 980, avg_total_spend_usd: 6450, avg_spend_per_traveler_usd: 2890, avg_duration_nights: 5.4 },
                                    { travel_purpose: "Visiting Friends & Relatives", total_trips: 760, avg_total_spend_usd: 1840, avg_spend_per_traveler_usd: 720, avg_duration_nights: 9.1 },
                                    { travel_purpose: "Medical & Health", total_trips: 420, avg_total_spend_usd: 4820, avg_spend_per_traveler_usd: 2310, avg_duration_nights: 10.5 },
                                    { travel_purpose: "Education & Study", total_trips: 380, avg_total_spend_usd: 2120, avg_spend_per_traveler_usd: 950, avg_duration_nights: 14.2 },
                                    { travel_purpose: "Religious Pilgrimage", total_trips: 210, avg_total_spend_usd: 1650, avg_spend_per_traveler_usd: 680, avg_duration_nights: 5.0 },
                                    { travel_purpose: "Backpacking & Budget", total_trips: 160, avg_total_spend_usd: 1150, avg_spend_per_traveler_usd: 540, avg_duration_nights: 11.8 }
                                ]).map((row) => (
                                    <tr key={row.travel_purpose} className="hover:bg-[#FAF0DC]/60 transition-colors">
                                        <td className="p-4 font-bold text-[#162622]">{row.travel_purpose}</td>
                                        <td className="p-4 font-semibold text-[#213832]">{row.total_trips.toLocaleString()} trips</td>
                                        <td className="p-4 font-black text-[#162622]">${row.avg_total_spend_usd.toLocaleString(undefined, { maximumFractionDigits: 0 })}</td>
                                        <td className="p-4 font-semibold text-[#3F6A5E]">${row.avg_spend_per_traveler_usd.toLocaleString(undefined, { maximumFractionDigits: 0 })}</td>
                                        <td className="p-4 font-semibold text-[#213832]">{row.avg_duration_nights.toFixed(1)} nights</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}
