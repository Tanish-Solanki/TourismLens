"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Compass, Search, Scale, Leaf, Database, ArrowRight, CheckCircle2, TrendingUp, Star, ShieldCheck } from "lucide-react";
import { MetricCard } from "@/components/MetricCard";
import { fetchApi, GlobalOverviewStats } from "@/lib/api";

export default function HomePage() {
  const [stats, setStats] = useState<GlobalOverviewStats | null>(null);

  useEffect(() => {
    async function loadStats() {
      try {
        const res = await fetchApi<GlobalOverviewStats>("/stats/overview");
        setStats(res);
      } catch (err) {
        console.warn("Failed to load overview stats:", err);
      }
    }
    loadStats();
  }, []);

  return (
    <div className="bg-[#FFF2DA] min-h-screen text-[#162622]">
      {/* Hero Section */}
      <section className="relative py-16 lg:py-24 border-b border-[#3F6A5E]/20 bg-gradient-to-b from-[#FFF2DA] via-[#F7EBD7] to-[#FFF2DA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="space-y-4 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#213832] text-[#FFF2DA] text-xs font-semibold shadow-sm">
              <Compass className="w-3.5 h-3.5 text-[#76B7A6]" />
              Global Tourism Trends & Destination Insights
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#162622] tracking-tight leading-tight">
              Explore Tourism Through <span className="text-[#3F6A5E]">Data</span>
            </h1>
            <p className="text-base sm:text-lg text-[#213832]/80 leading-relaxed font-medium">
              What can global travel records tell us about destinations, spending patterns, traveler satisfaction, and environmental impact? TourismLens is an academic decision-support platform that evaluates historical travel data (2019–2024) across 5 transparent analytical dimensions.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <Link
              href="/find-destination"
              className="px-6 py-3.5 rounded-xl bg-[#213832] hover:bg-[#162622] text-[#FFF2DA] font-bold text-sm shadow-md transition-all flex items-center gap-2"
            >
              <Search className="w-4 h-4 text-[#76B7A6]" />
              Find My Destination
            </Link>

            <Link
              href="/explore"
              className="px-6 py-3.5 rounded-xl bg-[#FFFFFF] hover:bg-[#FAF0DC] text-[#213832] font-bold text-sm border border-[#3F6A5E]/30 shadow-sm transition-all flex items-center gap-2"
            >
              <Compass className="w-4 h-4 text-[#3F6A5E]" />
              Explore Destinations
            </Link>
          </div>
        </div>
      </section>

      {/* Dataset Overview Metric Cards */}
      <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#3F6A5E] block">
              Validated Dataset Baseline
            </span>
            <h2 className="text-2xl font-black text-[#162622]">
              Historical Data Infrastructure
            </h2>
          </div>
          <span className="text-xs font-semibold px-3 py-1 rounded-full bg-[#213832] text-[#FFF2DA]">
            KNIME Cleaned Baseline
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          <MetricCard
            title="Trips Analyzed"
            value={stats?.total_trips_analyzed ? stats.total_trips_analyzed.toLocaleString() : (stats?.total_trips ? stats.total_trips.toLocaleString() : "10,000")}
            subtitle="Validated travel records"
            icon={Database}
            badgeText="Verified"
          />
          <MetricCard
            title="Origin Countries"
            value={stats?.total_origin_countries ?? stats?.origin_countries_count ?? "20"}
            subtitle="Global traveler origins"
            icon={Compass}
          />
          <MetricCard
            title="Destinations"
            value={stats?.total_destinations ?? stats?.destination_countries_count ?? "20"}
            subtitle="Global destination hubs"
            icon={Compass}
          />
          <MetricCard
            title="Travel Period"
            value="2019–2024"
            subtitle="Pre & Post recovery years"
            icon={TrendingUp}
          />
          <MetricCard
            title="Raw Variables"
            value="33"
            subtitle="Plus 3 clean derived metrics"
            icon={CheckCircle2}
          />
        </div>
      </section>

      {/* 5-Dimension Framework Section */}
      <section className="py-12 bg-[#FAF0DC] border-y border-[#3F6A5E]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#3F6A5E]">
              Decision Framework
            </span>
            <h2 className="text-3xl font-black text-[#162622]">
              The 5-Dimension Destination Matrix
            </h2>
            <p className="text-xs text-[#213832]/80 leading-relaxed font-medium">
              Every country in TourismLens is evaluated objectively using composite aggregated statistics computed directly from 10,000 historical trip records.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 text-xs">
            <div className="bg-[#FFFFFF] p-5 rounded-xl border border-[#3F6A5E]/20 space-y-2 shadow-sm">
              <div className="w-8 h-8 rounded-lg bg-[#213832] text-[#FFF2DA] font-extrabold flex items-center justify-center">1</div>
              <h3 className="font-bold text-[#162622] text-sm">Popularity</h3>
              <p className="text-[#213832]/75 text-[11px] leading-relaxed">Trip volume and traveler origin diversity metrics.</p>
            </div>

            <div className="bg-[#FFFFFF] p-5 rounded-xl border border-[#3F6A5E]/20 space-y-2 shadow-sm">
              <div className="w-8 h-8 rounded-lg bg-[#213832] text-[#76B7A6] font-extrabold flex items-center justify-center">2</div>
              <h3 className="font-bold text-[#162622] text-sm">Spending</h3>
              <p className="text-[#213832]/75 text-[11px] leading-relaxed">Average total spend, spend intensity per night, and budget tiers.</p>
            </div>

            <div className="bg-[#FFFFFF] p-5 rounded-xl border border-[#3F6A5E]/20 space-y-2 shadow-sm">
              <div className="w-8 h-8 rounded-lg bg-[#213832] text-[#EBCFB1] font-extrabold flex items-center justify-center">3</div>
              <h3 className="font-bold text-[#162622] text-sm">Experience</h3>
              <p className="text-[#213832]/75 text-[11px] leading-relaxed">Derived traveler satisfaction scores (1–5 scale) and attraction visits.</p>
            </div>

            <div className="bg-[#FFFFFF] p-5 rounded-xl border border-[#3F6A5E]/20 space-y-2 shadow-sm">
              <div className="w-8 h-8 rounded-lg bg-[#213832] text-[#A9D7C8] font-extrabold flex items-center justify-center">4</div>
              <h3 className="font-bold text-[#162622] text-sm">Loyalty</h3>
              <p className="text-[#213832]/75 text-[11px] leading-relaxed">Percentage of travelers who would recommend the destination.</p>
            </div>

            <div className="bg-[#FFFFFF] p-5 rounded-xl border border-[#3F6A5E]/20 space-y-2 shadow-sm">
              <div className="w-8 h-8 rounded-lg bg-[#213832] text-[#76B7A6] font-extrabold flex items-center justify-center">5</div>
              <h3 className="font-bold text-[#162622] text-sm">CO₂ Footprint</h3>
              <p className="text-[#213832]/75 text-[11px] leading-relaxed">Average environmental carbon emissions (kg CO₂) by transport mode.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Core Features Callout Grid */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-[#3F6A5E]">
            Core Modules
          </span>
          <h2 className="text-3xl font-black text-[#162622]">
            Explore Analytical Workflows
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-[#FFFFFF] border border-[#3F6A5E]/20 rounded-2xl p-6 space-y-4 shadow-sm hover:shadow-md transition-all">
            <div className="w-10 h-10 rounded-xl bg-[#213832] text-[#76B7A6] flex items-center justify-center">
              <Search className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-extrabold text-[#162622]">Find My Destination</h3>
            <p className="text-xs text-[#213832]/80 leading-relaxed">
              Filter destinations based on custom travel priorities including budget limits, traveler group type, duration, and eco-friendliness.
            </p>
            <Link
              href="/find-destination"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#3F6A5E] hover:text-[#162622]"
            >
              Launch Recommender <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="bg-[#FFFFFF] border border-[#3F6A5E]/20 rounded-2xl p-6 space-y-4 shadow-sm hover:shadow-md transition-all">
            <div className="w-10 h-10 rounded-xl bg-[#213832] text-[#A9D7C8] flex items-center justify-center">
              <Scale className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-extrabold text-[#162622]">Compare Destinations</h3>
            <p className="text-xs text-[#213832]/80 leading-relaxed">
              Select two global destinations side-by-side to compare historical spending, satisfaction ratings, recommendation rates, and CO₂ metrics.
            </p>
            <Link
              href="/compare"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#3F6A5E] hover:text-[#162622]"
            >
              Compare Side-by-Side <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="bg-[#FFFFFF] border border-[#3F6A5E]/20 rounded-2xl p-6 space-y-4 shadow-sm hover:shadow-md transition-all">
            <div className="w-10 h-10 rounded-xl bg-[#213832] text-[#76B7A6] flex items-center justify-center">
              <Leaf className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-extrabold text-[#162622]">Sustainability Analytics</h3>
            <p className="text-xs text-[#213832]/80 leading-relaxed">
              Evaluate transport mode environmental trade-offs, comparing Rail (lowest emissions) vs Air and Cruise transport across 10,000 trips.
            </p>
            <Link
              href="/sustainability"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#3F6A5E] hover:text-[#162622]"
            >
              View Carbon Analytics <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
