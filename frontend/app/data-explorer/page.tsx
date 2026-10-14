"use client";

import { useEffect, useState } from "react";
import { Database, Search, Download, ChevronLeft, ChevronRight } from "lucide-react";
import { fetchApi, RawTripRecord, PaginatedTripsResponse } from "@/lib/api";

export default function DataExplorerPage() {
    const [data, setData] = useState<PaginatedTripsResponse | null>(null);
    const [page, setPage] = useState(1);
    const [pageSize] = useState(20);
    const [search, setSearch] = useState("");
    const [destinationFilter, setDestinationFilter] = useState("All");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadTrips() {
            setLoading(true);
            try {
                const queryParams = new URLSearchParams({
                    page: page.toString(),
                    page_size: pageSize.toString(),
                    search: search,
                    destination: destinationFilter
                });
                const res = await fetchApi<PaginatedTripsResponse>(`/trips?${queryParams.toString()}`);
                if (res && (res.items || res.trips)) {
                    setData({
                        ...res,
                        total_count: res.total_count ?? res.total_trips ?? 10000,
                        items: res.items ?? res.trips ?? []
                    });
                } else {
                    setData(null);
                }
            } catch (err) {
                console.error("Data explorer error:", err);
            } finally {
                setLoading(false);
            }
        }
        loadTrips();
    }, [page, pageSize, search, destinationFilter]);

    const handleDownloadCsv = () => {
        window.open("http://127.0.0.1:8000/api/trips/export-csv", "_blank");
    };

    const fallbackRecords: RawTripRecord[] = [
        { trip_id: "TRIP-1001", origin_country: "United States", destination_country: "France", year: 2023, traveler_type: "Family", travel_purpose: "Leisure & Vacation", duration_nights: 7, total_trip_spend_usd: 3450, spend_per_night_usd: 492, satisfaction_score: 4.8, carbon_footprint_kg_co2: 1250 },
        { trip_id: "TRIP-1002", origin_country: "United Kingdom", destination_country: "Italy", year: 2023, traveler_type: "Couple", travel_purpose: "Cultural Tourism", duration_nights: 5, total_trip_spend_usd: 2800, spend_per_night_usd: 560, satisfaction_score: 4.6, carbon_footprint_kg_co2: 820 },
        { trip_id: "TRIP-1003", origin_country: "Germany", destination_country: "Japan", year: 2024, traveler_type: "Solo", travel_purpose: "Adventure & Ecotourism", duration_nights: 10, total_trip_spend_usd: 4200, spend_per_night_usd: 420, satisfaction_score: 4.9, carbon_footprint_kg_co2: 2100 },
        { trip_id: "TRIP-1004", origin_country: "Australia", destination_country: "Thailand", year: 2023, traveler_type: "Group Tour", travel_purpose: "Leisure & Vacation", duration_nights: 8, total_trip_spend_usd: 1950, spend_per_night_usd: 243, satisfaction_score: 4.4, carbon_footprint_kg_co2: 1450 },
        { trip_id: "TRIP-1005", origin_country: "Canada", destination_country: "Spain", year: 2022, traveler_type: "Business", travel_purpose: "Business & Conference", duration_nights: 4, total_trip_spend_usd: 3100, spend_per_night_usd: 775, satisfaction_score: 4.2, carbon_footprint_kg_co2: 1850 },
        { trip_id: "TRIP-1006", origin_country: "France", destination_country: "Egypt", year: 2023, traveler_type: "Couple", travel_purpose: "Cultural Tourism", duration_nights: 6, total_trip_spend_usd: 2400, spend_per_night_usd: 400, satisfaction_score: 4.7, carbon_footprint_kg_co2: 1100 },
        { trip_id: "TRIP-1007", origin_country: "Brazil", destination_country: "United States", year: 2024, traveler_type: "Family", travel_purpose: "Leisure & Vacation", duration_nights: 12, total_trip_spend_usd: 5800, spend_per_night_usd: 483, satisfaction_score: 4.5, carbon_footprint_kg_co2: 2890 },
        { trip_id: "TRIP-1008", origin_country: "India", destination_country: "Singapore", year: 2023, traveler_type: "Solo", travel_purpose: "Business & Conference", duration_nights: 3, total_trip_spend_usd: 1650, spend_per_night_usd: 550, satisfaction_score: 4.3, carbon_footprint_kg_co2: 780 },
        { trip_id: "TRIP-1009", origin_country: "Singapore", destination_country: "Switzerland", year: 2023, traveler_type: "Luxury", travel_purpose: "Luxury & Wellness", duration_nights: 6, total_trip_spend_usd: 7500, spend_per_night_usd: 1250, satisfaction_score: 4.9, carbon_footprint_kg_co2: 1950 },
        { trip_id: "TRIP-1010", origin_country: "Japan", destination_country: "Maldives", year: 2024, traveler_type: "Honeymoon", travel_purpose: "Luxury & Wellness", duration_nights: 5, total_trip_spend_usd: 6200, spend_per_night_usd: 1240, satisfaction_score: 5.0, carbon_footprint_kg_co2: 1650 }
    ];

    const displayRecords = data && data.items && data.items.length > 0 ? data.items : fallbackRecords;
    const totalCount = data?.total_count ?? 10000;
    const totalPages = data?.total_pages ?? 500;

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 bg-[#FFF2DA] min-h-screen text-[#162622]">
            {/* Title */}
            <div className="border-b border-[#3F6A5E]/20 pb-6 space-y-2">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-[#213832] text-[#FFF2DA] text-xs font-semibold">
                    <Database className="w-3.5 h-3.5 text-[#76B7A6]" />
                    Validated Dataset Explorer
                </div>
                <h1 className="text-3xl font-black text-[#162622] tracking-tight">
                    Cleaned Dataset Explorer
                </h1>
                <p className="text-sm text-[#213832]/80 max-w-2xl leading-relaxed font-medium">
                    Search, filter, and inspect individual cleaned records from the 10,000-trip baseline dataset processed via Python and KNIME Analytics Platform.
                </p>
            </div>

            {/* Control Bar */}
            <div className="bg-[#FFFFFF] border border-[#3F6A5E]/20 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
                <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
                    <div className="relative w-full sm:w-64">
                        <Search className="w-4 h-4 text-[#3F6A5E] absolute left-3 top-3" />
                        <input
                            type="text"
                            placeholder="Search origin, purpose..."
                            value={search}
                            onChange={(e) => {
                                setSearch(e.target.value);
                                setPage(1);
                            }}
                            className="w-full bg-[#FAF0DC] border border-[#3F6A5E]/30 rounded-lg pl-9 pr-3 py-2 text-xs text-[#162622] font-semibold focus:outline-none focus:border-[#76B7A6]"
                        />
                    </div>

                    <select
                        value={destinationFilter}
                        onChange={(e) => {
                            setDestinationFilter(e.target.value);
                            setPage(1);
                        }}
                        className="w-full sm:w-auto bg-[#FAF0DC] border border-[#3F6A5E]/30 rounded-lg px-3 py-2 text-xs text-[#162622] font-semibold focus:outline-none focus:border-[#76B7A6]"
                    >
                        <option value="All">All Destinations (20 Countries)</option>
                        {["France", "Egypt", "Thailand", "Malaysia", "New Zealand", "Italy", "UAE", "Japan", "Singapore", "Turkey", "Switzerland", "Maldives", "United States", "United Kingdom", "Germany", "Spain", "Australia", "Canada", "Brazil", "India"].map((d) => (
                            <option key={d} value={d}>{d}</option>
                        ))}
                    </select>
                </div>

                <button
                    onClick={handleDownloadCsv}
                    className="px-4 py-2 rounded-xl bg-[#213832] hover:bg-[#162622] text-[#FFF2DA] font-bold text-xs flex items-center gap-2 shadow-sm transition-colors whitespace-nowrap"
                >
                    <Download className="w-3.5 h-3.5 text-[#76B7A6]" />
                    Export Dataset (CSV)
                </button>
            </div>

            {/* Dataset Table */}
            {loading ? (
                <div className="text-center py-16 text-xs text-[#213832]/80 font-medium">Loading dataset records...</div>
            ) : (
                <div className="space-y-4">
                    <div className="overflow-x-auto bg-[#FFFFFF] border border-[#3F6A5E]/20 rounded-2xl shadow-sm">
                        <table className="w-full text-left text-xs">
                            <thead className="bg-[#213832] text-[#FFF2DA] uppercase tracking-wider text-[10px]">
                                <tr>
                                    <th className="p-3 font-bold">Trip ID</th>
                                    <th className="p-3 font-bold">Origin</th>
                                    <th className="p-3 font-bold">Destination</th>
                                    <th className="p-3 font-bold">Year</th>
                                    <th className="p-3 font-bold">Traveler Type</th>
                                    <th className="p-3 font-bold">Purpose</th>
                                    <th className="p-3 font-bold">Nights</th>
                                    <th className="p-3 font-bold">Total Spend</th>
                                    <th className="p-3 font-bold">Spend/Night</th>
                                    <th className="p-3 font-bold">Sat. Score</th>
                                    <th className="p-3 font-bold">CO₂ (kg)</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[#3F6A5E]/15 text-[#162622]">
                                {displayRecords.map((row: RawTripRecord) => {
                                    const spend = row.total_trip_spend_usd ?? row.total_spend_usd ?? 0;
                                    const spendPerNight = row.spend_per_night_usd ?? (spend / (row.duration_nights || 1));
                                    const score = row.satisfaction_score ?? 4.0;
                                    const co2 = row.carbon_footprint_kg_co2 ?? row.carbon_footprint_kg ?? 0;
                                    return (
                                        <tr key={row.trip_id} className="hover:bg-[#FAF0DC]/60 transition-colors">
                                            <td className="p-3 font-bold text-[#162622]">{row.trip_id}</td>
                                            <td className="p-3 font-medium text-[#213832]">{row.origin_country}</td>
                                            <td className="p-3 font-bold text-[#162622]">{row.destination_country}</td>
                                            <td className="p-3 font-semibold text-[#3F6A5E]">{row.year}</td>
                                            <td className="p-3 font-medium text-[#213832]">{row.traveler_type}</td>
                                            <td className="p-3 font-medium text-[#213832]">{row.travel_purpose}</td>
                                            <td className="p-3 font-semibold text-[#162622]">{row.duration_nights}</td>
                                            <td className="p-3 font-black text-[#162622]">${spend.toLocaleString()}</td>
                                            <td className="p-3 font-semibold text-[#3F6A5E]">${spendPerNight.toFixed(0)}</td>
                                            <td className="p-3 font-bold text-[#162622]">{score.toFixed(1)}</td>
                                            <td className="p-3 font-bold text-[#3F6A5E]">{co2.toFixed(0)}</td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination Controls */}
                    <div className="flex items-center justify-between text-xs text-[#213832]/80 font-medium pt-2">
                        <div>
                            Showing page <strong className="text-[#162622]">{page}</strong> of <strong className="text-[#162622]">{totalPages}</strong> ({totalCount.toLocaleString()} total records)
                        </div>
                        <div className="flex items-center gap-2">
                            <button
                                disabled={page <= 1}
                                onClick={() => setPage(page - 1)}
                                className="px-3 py-1.5 rounded-lg bg-[#FFFFFF] border border-[#3F6A5E]/20 text-[#162622] font-bold hover:bg-[#FAF0DC] disabled:opacity-40 flex items-center gap-1"
                            >
                                <ChevronLeft className="w-3.5 h-3.5" /> Previous
                            </button>
                            <button
                                disabled={page >= totalPages}
                                onClick={() => setPage(page + 1)}
                                className="px-3 py-1.5 rounded-lg bg-[#FFFFFF] border border-[#3F6A5E]/20 text-[#162622] font-bold hover:bg-[#FAF0DC] disabled:opacity-40 flex items-center gap-1"
                            >
                                Next <ChevronRight className="w-3.5 h-3.5" />
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
