import Link from "next/link";
import { Star, ThumbsUp, DollarSign, Leaf, MapPin, ArrowRight } from "lucide-react";
import { DestinationProfile } from "@/lib/api";

interface DestinationCardProps {
    destination: DestinationProfile;
    rank?: number;
}

export function DestinationCard({ destination, rank }: DestinationCardProps) {
    return (
        <div className="group relative bg-[#FAF5EB] border border-[#3F6A5E]/20 rounded-2xl p-6 hover:border-[#3F6A5E]/40 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 flex flex-col justify-between">
            <div>
                {/* Header */}
                <div className="flex items-start justify-between mb-5">
                    <div>
                        <div className="flex items-center gap-2.5">
                            {rank && (
                                <span className="w-6 h-6 rounded-lg bg-gradient-to-br from-[#213832] to-[#162622] text-[#FFF2DA] text-xs font-black flex items-center justify-center shadow-sm">
                                    #{rank}
                                </span>
                            )}
                            <h3 className="text-xl font-black text-[#162622] group-hover:text-[#3F6A5E] transition-colors flex items-center gap-2 tracking-tight">
                                <MapPin className="w-4.5 h-4.5 text-[#3F6A5E]" />
                                {destination.destination_country}
                            </h3>
                        </div>
                        <p className="text-xs text-[#3F6A5E]/85 mt-1.5 font-semibold">
                            Sample dataset: <strong className="text-[#162622]">{destination.total_trips.toLocaleString()} trips</strong> (2019–2024)
                        </p>
                    </div>
                </div>

                {/* 5-Dimension Metrics Grid */}
                <div className="grid grid-cols-2 gap-2.5 text-xs mb-5">
                    <div className="bg-[#FFFFFF]/90 p-3 rounded-xl border border-[#3F6A5E]/15 shadow-2xs group-hover:bg-[#FFFFFF] transition-colors">
                        <span className="text-[10px] uppercase font-bold text-[#3F6A5E] tracking-wider block mb-1">Average Spend</span>
                        <div className="flex items-center gap-1.5 font-black text-sm text-[#162622]">
                            <DollarSign className="w-4 h-4 text-[#3F6A5E]" />
                            ${destination.avg_total_spend_usd.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                        </div>
                    </div>

                    <div className="bg-[#FFFFFF]/90 p-3 rounded-xl border border-[#3F6A5E]/15 shadow-2xs group-hover:bg-[#FFFFFF] transition-colors">
                        <span className="text-[10px] uppercase font-bold text-[#3F6A5E] tracking-wider block mb-1">Average Sat.</span>
                        <div className="flex items-center gap-1.5 font-black text-sm text-[#162622]">
                            <Star className="w-4 h-4 fill-[#3F6A5E] text-[#3F6A5E]" />
                            {destination.avg_satisfaction_score.toFixed(2)} / 5.0
                        </div>
                    </div>

                    <div className="bg-[#FFFFFF]/90 p-3 rounded-xl border border-[#3F6A5E]/15 shadow-2xs group-hover:bg-[#FFFFFF] transition-colors">
                        <span className="text-[10px] uppercase font-bold text-[#3F6A5E] tracking-wider block mb-1">Recommendation Rate</span>
                        <div className="flex items-center gap-1.5 font-black text-sm text-[#162622]">
                            <ThumbsUp className="w-4 h-4 text-[#3F6A5E]" />
                            {destination.recommendation_rate_percent.toFixed(1)}%
                        </div>
                    </div>

                    <div className="bg-[#FFFFFF]/90 p-3 rounded-xl border border-[#3F6A5E]/15 shadow-2xs group-hover:bg-[#FFFFFF] transition-colors">
                        <span className="text-[10px] uppercase font-bold text-[#3F6A5E] tracking-wider block mb-1">Avg CO₂ Footprint</span>
                        <div className="flex items-center gap-1.5 font-black text-sm text-[#162622]">
                            <Leaf className="w-4 h-4 text-[#3F6A5E]" />
                            {destination.avg_carbon_footprint_kg.toFixed(0)} kg
                        </div>
                    </div>
                </div>

                {/* Top Purposes Badge List */}
                <div className="mb-5">
                    <span className="text-[10px] uppercase tracking-wider font-bold text-[#3F6A5E] block mb-2">
                        Dominant Travel Purpose:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                        {destination.popular_purposes.slice(0, 3).map((p, idx) => (
                            <span key={idx} className="text-[11px] px-2.5 py-1 rounded-lg bg-[#EFE3CF] text-[#162622] border border-[#3F6A5E]/20 font-bold shadow-2xs">
                                {p.purpose} ({p.count})
                            </span>
                        ))}
                    </div>
                </div>
            </div>

            {/* Footer CTA */}
            <Link
                href={`/explore/${encodeURIComponent(destination.destination_country)}`}
                className="w-full py-3 px-4 rounded-xl bg-[#213832] hover:bg-[#162622] text-[#FFF2DA] text-xs font-black flex items-center justify-center gap-2 transition-all shadow-md group-hover:shadow-lg"
            >
                View Destination Profile
                <ArrowRight className="w-4 h-4 text-[#76B7A6] group-hover:translate-x-0.5 transition-transform" />
            </Link>
        </div>
    );
}
