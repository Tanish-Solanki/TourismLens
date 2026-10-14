"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { MapPin, DollarSign, Star, ThumbsUp, Leaf, Calendar, ArrowLeft, Users, Compass, Building, Plane } from "lucide-react";
import { fetchApi, DestinationProfile } from "@/lib/api";

export function DestinationDetailClient({ destName }: { destName: string }) {
    const [profile, setProfile] = useState<DestinationProfile | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!destName) return;
        async function loadDetail() {
            try {
                const data = await fetchApi<DestinationProfile>(`/destinations/${encodeURIComponent(destName)}`);
                setProfile(data);
            } catch (err: any) {
                console.error("Profile load error:", err);
                setError(`Failed to load profile for ${destName}`);
            } finally {
                setLoading(false);
            }
        }
        loadDetail();
    }, [destName]);

    if (loading) {
        return (
            <div className="max-w-7xl mx-auto px-4 py-16 text-center text-xs text-[#213832]/80 bg-[#FFF2DA] min-h-screen font-medium">
                Loading profile for {destName}...
            </div>
        );
    }

    if (error || !profile) {
        return (
            <div className="max-w-7xl mx-auto px-4 py-16 text-center space-y-4 bg-[#FFF2DA] min-h-screen">
                <p className="text-red-700 font-semibold text-sm">{error || "Destination profile not found"}</p>
                <Link href="/explore" className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#213832] text-xs font-semibold text-[#FFF2DA] rounded-lg">
                    <ArrowLeft className="w-3.5 h-3.5" /> Back to Destination Explorer
                </Link>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10 bg-[#FFF2DA] min-h-screen text-[#162622]">
            {/* Back Link */}
            <div>
                <Link href="/explore" className="inline-flex items-center gap-1.5 text-xs font-bold text-[#3F6A5E] hover:text-[#162622] transition-colors">
                    <ArrowLeft className="w-3.5 h-3.5" />
                    Back to Destination Explorer
                </Link>
            </div>

            {/* Header Banner */}
            <div className="bg-[#FFFFFF] border border-[#3F6A5E]/20 rounded-2xl p-8 space-y-4 shadow-sm">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-[#213832] flex items-center justify-center text-[#FFF2DA] font-bold text-xl shadow-md">
                            <MapPin className="w-6 h-6 text-[#76B7A6]" />
                        </div>
                        <div>
                            <h1 className="text-3xl font-black text-[#162622]">{profile.destination_country}</h1>
                            <p className="text-xs text-[#213832]/80 mt-0.5 font-medium">
                                5-Dimension Historical Profile (Sample: {profile.total_trips} trips, 2019–2024)
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <Link href={`/compare?dest1=${encodeURIComponent(profile.destination_country)}`} className="px-4 py-2.5 rounded-xl bg-[#213832] hover:bg-[#162622] text-[#FFF2DA] text-xs font-bold shadow-md transition-colors">
                            Compare {profile.destination_country}
                        </Link>
                    </div>
                </div>

                {/* 5-Dimension Metrics Banner */}
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 text-xs pt-4 border-t border-[#3F6A5E]/15">
                    <div className="bg-[#FAF0DC] p-3 rounded-xl border border-[#3F6A5E]/15">
                        <span className="text-[10px] text-[#3F6A5E] uppercase font-bold block mb-1">1. Popularity</span>
                        <span className="font-black text-[#162622] text-base">{profile.total_trips} Trips</span>
                    </div>

                    <div className="bg-[#FAF0DC] p-3 rounded-xl border border-[#3F6A5E]/15">
                        <span className="text-[10px] text-[#3F6A5E] uppercase font-bold block mb-1">2. Average Spend</span>
                        <span className="font-black text-[#162622] text-base flex items-center gap-1">
                            <DollarSign className="w-4 h-4 text-[#3F6A5E]" />
                            ${profile.avg_total_spend_usd.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                        </span>
                    </div>

                    <div className="bg-[#FAF0DC] p-3 rounded-xl border border-[#3F6A5E]/15">
                        <span className="text-[10px] text-[#3F6A5E] uppercase font-bold block mb-1">3. Experience</span>
                        <span className="font-black text-[#162622] text-base flex items-center gap-1">
                            <Star className="w-4 h-4 text-[#3F6A5E]" />
                            {profile.avg_satisfaction_score.toFixed(2)} / 5.0
                        </span>
                    </div>

                    <div className="bg-[#FAF0DC] p-3 rounded-xl border border-[#3F6A5E]/15">
                        <span className="text-[10px] text-[#3F6A5E] uppercase font-bold block mb-1">4. Loyalty</span>
                        <span className="font-black text-[#162622] text-base flex items-center gap-1">
                            <ThumbsUp className="w-4 h-4 text-[#3F6A5E]" />
                            {profile.recommendation_rate_percent.toFixed(1)}%
                        </span>
                    </div>

                    <div className="bg-[#FAF0DC] p-3 rounded-xl border border-[#3F6A5E]/15">
                        <span className="text-[10px] text-[#3F6A5E] uppercase font-bold block mb-1">5. CO₂ Footprint</span>
                        <span className="font-black text-[#162622] text-base flex items-center gap-1">
                            <Leaf className="w-4 h-4 text-[#3F6A5E]" />
                            {profile.avg_carbon_footprint_kg.toFixed(0)} kg
                        </span>
                    </div>
                </div>
            </div>

            {/* Yearly Volume Trend Preview */}
            {profile.yearly_trips && (
                <div className="bg-[#FFFFFF] border border-[#3F6A5E]/20 rounded-2xl p-6 space-y-4 shadow-sm">
                    <h2 className="text-sm font-bold uppercase tracking-wider text-[#162622] flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-[#3F6A5E]" />
                        Yearly Travel Volume (2019–2024)
                    </h2>
                    <div className="grid grid-cols-6 gap-2 text-center text-xs">
                        {Object.entries(profile.yearly_trips).map(([year, count]) => (
                            <div key={year} className="bg-[#FAF0DC] p-3 rounded-xl border border-[#3F6A5E]/15">
                                <span className="text-[10px] text-[#3F6A5E] block font-bold">{year}</span>
                                <span className="text-base font-black text-[#162622]">{count}</span>
                                <span className="text-[10px] text-[#213832]/75 block font-medium">trips</span>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Categorical Composition Breakdown */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Travel Purposes */}
                <div className="bg-[#FFFFFF] border border-[#3F6A5E]/20 rounded-2xl p-6 space-y-4 shadow-sm">
                    <h2 className="text-sm font-bold uppercase tracking-wider text-[#162622] flex items-center gap-2">
                        <Compass className="w-4 h-4 text-[#3F6A5E]" />
                        Top Travel Purposes
                    </h2>
                    <div className="space-y-2 text-xs">
                        {profile.popular_purposes.map((p, idx) => (
                            <div key={idx} className="flex items-center justify-between p-2.5 rounded-xl bg-[#FAF0DC] border border-[#3F6A5E]/15">
                                <span className="text-[#213832] font-semibold">{p.purpose}</span>
                                <span className="font-black text-[#162622]">{p.count} trips</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Traveler Types */}
                <div className="bg-[#FFFFFF] border border-[#3F6A5E]/20 rounded-2xl p-6 space-y-4 shadow-sm">
                    <h2 className="text-sm font-bold uppercase tracking-wider text-[#162622] flex items-center gap-2">
                        <Users className="w-4 h-4 text-[#3F6A5E]" />
                        Traveler Group Composition
                    </h2>
                    <div className="space-y-2 text-xs">
                        {profile.popular_traveler_types.map((t, idx) => (
                            <div key={idx} className="flex items-center justify-between p-2.5 rounded-xl bg-[#FAF0DC] border border-[#3F6A5E]/15">
                                <span className="text-[#213832] font-semibold">{t.type}</span>
                                <span className="font-black text-[#162622]">{t.count} trips</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Transport Breakdown */}
                <div className="bg-[#FFFFFF] border border-[#3F6A5E]/20 rounded-2xl p-6 space-y-4 shadow-sm">
                    <h2 className="text-sm font-bold uppercase tracking-wider text-[#162622] flex items-center gap-2">
                        <Plane className="w-4 h-4 text-[#3F6A5E]" />
                        Transport Mode Distribution
                    </h2>
                    <div className="space-y-2 text-xs">
                        {profile.transport_breakdown.map((tr, idx) => (
                            <div key={idx} className="flex items-center justify-between p-2.5 rounded-xl bg-[#FAF0DC] border border-[#3F6A5E]/15">
                                <span className="text-[#213832] font-semibold">{tr.mode}</span>
                                <span className="font-black text-[#162622]">{tr.count} trips</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Accommodation Breakdown */}
                <div className="bg-[#FFFFFF] border border-[#3F6A5E]/20 rounded-2xl p-6 space-y-4 shadow-sm">
                    <h2 className="text-sm font-bold uppercase tracking-wider text-[#162622] flex items-center gap-2">
                        <Building className="w-4 h-4 text-[#3F6A5E]" />
                        Accommodation Tier Distribution
                    </h2>
                    <div className="space-y-2 text-xs">
                        {profile.accommodation_breakdown.map((ac, idx) => (
                            <div key={idx} className="flex items-center justify-between p-2.5 rounded-xl bg-[#FAF0DC] border border-[#3F6A5E]/15">
                                <span className="text-[#213832] font-semibold">{ac.type}</span>
                                <span className="font-black text-[#162622]">{ac.count} trips</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
