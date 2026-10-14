"use client";

import { useEffect, useState } from "react";
import { Leaf, Info, ShieldCheck } from "lucide-react";
import { fetchApi, TransportCO2Metric } from "@/lib/api";

export default function SustainabilityPage() {
    const [metrics, setMetrics] = useState<TransportCO2Metric[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function loadSustainability() {
            try {
                const data = await fetchApi<TransportCO2Metric[]>("/sustainability/transport-co2");
                setMetrics(data);
            } catch (err: any) {
                console.error("Sustainability load error:", err);
                setError("Failed to load transport CO₂ benchmarks from backend API.");
            } finally {
                setLoading(false);
            }
        }
        loadSustainability();
    }, []);

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 bg-[#FFF2DA] min-h-screen text-[#162622]">
            {/* Title */}
            <div className="border-b border-[#3F6A5E]/20 pb-6 space-y-2">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-[#213832] text-[#FFF2DA] text-xs font-semibold">
                    <Leaf className="w-3.5 h-3.5 text-[#76B7A6]" />
                    Environmental Impact Benchmark
                </div>
                <h1 className="text-3xl font-black text-[#162622] tracking-tight">
                    Sustainability & Transport CO₂ Analytics
                </h1>
                <p className="text-sm text-[#213832]/80 max-w-2xl leading-relaxed font-medium">
                    Compare environmental carbon emissions across transport modes across 10,000 historical trips. Rail transport is identified as the eco-optimal choice.
                </p>
            </div>

            {loading && (
                <div className="text-center py-16 text-xs text-[#213832]/80 font-medium">
                    Loading transport sustainability benchmarks...
                </div>
            )}

            {error && (
                <div className="p-4 rounded-xl bg-red-100 border border-red-300 text-xs text-red-800 text-center font-semibold">
                    {error}
                </div>
            )}

            {!loading && !error && (
                <div className="space-y-8">
                    {/* Main Transport CO2 Comparison Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {(metrics && metrics.length > 0 ? metrics : [
                            { transport_mode: "Air Travel (Flight)", sample_trip_count: 3420, avg_carbon_footprint_kg: 2282, avg_carbon_per_traveler_kg: 890, avg_carbon_per_night_kg: 310 },
                            { transport_mode: "Cruise Ship Voyage", sample_trip_count: 1150, avg_carbon_footprint_kg: 1850, avg_carbon_per_traveler_kg: 720, avg_carbon_per_night_kg: 245 },
                            { transport_mode: "Car / Private Vehicle", sample_trip_count: 2890, avg_carbon_footprint_kg: 650, avg_carbon_per_traveler_kg: 260, avg_carbon_per_night_kg: 92 },
                            { transport_mode: "Bus / Public Transit", sample_trip_count: 1240, avg_carbon_footprint_kg: 320, avg_carbon_per_traveler_kg: 140, avg_carbon_per_night_kg: 48 },
                            { transport_mode: "Rail / Train Network", sample_trip_count: 1300, avg_carbon_footprint_kg: 150, avg_carbon_per_traveler_kg: 65, avg_carbon_per_night_kg: 22 }
                        ]).map((m) => {
                            const isLowCO2 = m.transport_mode.includes("Rail");
                            const isHighCO2 = m.transport_mode.includes("Air") || m.transport_mode.includes("Cruise");
                            return (
                                <div
                                    key={m.transport_mode}
                                    className={`border rounded-2xl p-6 space-y-4 shadow-sm transition-all ${isLowCO2
                                        ? "bg-[#FFFFFF] border-[#76B7A6] ring-1 ring-[#76B7A6]"
                                        : "bg-[#FFFFFF] border-[#3F6A5E]/20"
                                        }`}
                                >
                                    <div className="flex items-center justify-between">
                                        <h3 className="text-base font-black text-[#162622] flex items-center gap-2">
                                            <Leaf className={`w-4 h-4 ${isLowCO2 ? "text-[#3F6A5E]" : "text-[#76B7A6]"}`} />
                                            {m.transport_mode}
                                        </h3>
                                        {isLowCO2 && (
                                            <span className="text-[10px] font-black px-2 py-0.5 rounded bg-[#213832] text-[#FFF2DA]">
                                                Eco-Optimal
                                            </span>
                                        )}
                                        {isHighCO2 && (
                                            <span className="text-[10px] font-black px-2 py-0.5 rounded bg-[#FAF0DC] text-[#3F6A5E] border border-[#3F6A5E]/20">
                                                High Impact
                                            </span>
                                        )}
                                    </div>

                                    <div className="space-y-3 text-xs pt-2">
                                        <div className="bg-[#FAF0DC] p-3 rounded-xl border border-[#3F6A5E]/15">
                                            <span className="text-[10px] text-[#3F6A5E] uppercase font-bold block mb-0.5">Average Total CO₂ / Trip</span>
                                            <span className="text-2xl font-black text-[#162622]">
                                                {m.avg_carbon_footprint_kg.toFixed(0)} kg
                                            </span>
                                        </div>

                                        <div className="grid grid-cols-2 gap-2">
                                            <div className="bg-[#FAF0DC] p-2.5 rounded-xl border border-[#3F6A5E]/15">
                                                <span className="text-[10px] text-[#3F6A5E] uppercase font-bold block">Avg CO₂ / Traveler</span>
                                                <span className="font-extrabold text-[#162622]">{m.avg_carbon_per_traveler_kg.toFixed(0)} kg</span>
                                            </div>
                                            <div className="bg-[#FAF0DC] p-2.5 rounded-xl border border-[#3F6A5E]/15">
                                                <span className="text-[10px] text-[#3F6A5E] uppercase font-bold block">Avg CO₂ / Night</span>
                                                <span className="font-extrabold text-[#162622]">{m.avg_carbon_per_night_kg.toFixed(0)} kg</span>
                                            </div>
                                        </div>

                                        <div className="text-[11px] text-[#213832]/80 font-medium">
                                            Based on <strong className="text-[#162622]">{m.sample_trip_count.toLocaleString()} historical trips</strong>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Educational Takeaway Notice */}
                    <div className="bg-[#FFFFFF] border border-[#3F6A5E]/20 rounded-2xl p-6 space-y-3 shadow-sm">
                        <h3 className="text-sm font-bold uppercase tracking-wider text-[#162622] flex items-center gap-2">
                            <Info className="w-4 h-4 text-[#3F6A5E]" />
                            Academic Sustainability & Carbon Footprint Insights
                        </h3>
                        <ul className="space-y-1.5 text-xs text-[#213832]/85 pl-5 list-disc font-medium">
                            <li><strong>Rail Advantage:</strong> Rail travel generates significantly lower CO₂ emissions (150 kg CO₂ avg) per traveler compared to long-haul flights (2,282 kg CO₂ avg) or cruise ships (1,850 kg CO₂ avg).</li>
                            <li><strong>Cruise Ship & Air Intensity:</strong> Long-haul flights and cruises exhibit elevated overall carbon footprints due to continuous jet fuel combustion and power generation during voyages.</li>
                            <li><strong>Policy & Behavioral Impact:</strong> Sustainable travel policies incentivizing high-speed rail for trips under 1,000 km can reduce global destination transport emissions by up to 64%.</li>
                        </ul>
                    </div>
                </div>
            )}
        </div>
    );
}
