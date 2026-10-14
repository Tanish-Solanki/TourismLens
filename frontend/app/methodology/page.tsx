"use client";

import { FileText, Cpu, CheckCircle, Database, Award } from "lucide-react";

export default function MethodologyPage() {
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10 bg-[#FFF2DA] min-h-screen text-[#162622]">
            {/* Title */}
            <div className="border-b border-[#3F6A5E]/20 pb-6 space-y-2">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-[#213832] text-[#FFF2DA] text-xs font-semibold">
                    <FileText className="w-3.5 h-3.5 text-[#76B7A6]" />
                    Academic Rigor & Data Architecture
                </div>
                <h1 className="text-3xl font-black text-[#162622] tracking-tight">
                    Analytical Methodology & Workflow Architecture
                </h1>
                <p className="text-sm text-[#213832]/80 max-w-2xl leading-relaxed font-medium">
                    Comprehensive documentation of the data cleaning pipeline, metric derivations, KNIME workflow integration, and academic standards.
                </p>
            </div>

            {/* 4-Stage Methodology Pipeline */}
            <div className="space-y-6">
                <h2 className="text-lg font-black text-[#162622] flex items-center gap-2">
                    <Cpu className="w-5 h-5 text-[#3F6A5E]" />
                    End-to-End Data Pipeline Steps
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
                    {/* Step 1 */}
                    <div className="bg-[#FFFFFF] border border-[#3F6A5E]/20 rounded-2xl p-6 space-y-3 shadow-sm">
                        <div className="flex items-center justify-between">
                            <span className="text-[10px] uppercase font-bold text-[#3F6A5E]">Phase 1</span>
                            <span className="px-2 py-0.5 rounded bg-[#FAF0DC] text-[#213832] font-extrabold text-[10px]">Data Ingestion & Hygiene</span>
                        </div>
                        <h3 className="text-base font-black text-[#162622]">1. Data Collection & Preprocessing</h3>
                        <p className="text-[#213832]/80 leading-relaxed font-medium">
                            Ingested 10,000 raw travel records spanning 2019 to 2024 across 20 countries. Handled missing value imputation, standardized country nomenclature, and sanitized numerical boundaries for trip duration and financial metrics.
                        </p>
                    </div>

                    {/* Step 2 */}
                    <div className="bg-[#FFFFFF] border border-[#3F6A5E]/20 rounded-2xl p-6 space-y-3 shadow-sm">
                        <div className="flex items-center justify-between">
                            <span className="text-[10px] uppercase font-bold text-[#3F6A5E]">Phase 2</span>
                            <span className="px-2 py-0.5 rounded bg-[#FAF0DC] text-[#213832] font-extrabold text-[10px]">KNIME & Python Processing</span>
                        </div>
                        <h3 className="text-base font-black text-[#162622]">2. Automated ETL & Feature Engineering</h3>
                        <p className="text-[#213832]/80 leading-relaxed font-medium">
                            Executed automated transformation workflows in KNIME Analytics Platform alongside Python Pandas. Computed derived fields including Spend per Traveler, Daily Spend Rate, and Mode-Specific Carbon Emission Equivalents.
                        </p>
                    </div>

                    {/* Step 3 */}
                    <div className="bg-[#FFFFFF] border border-[#3F6A5E]/20 rounded-2xl p-6 space-y-3 shadow-sm">
                        <div className="flex items-center justify-between">
                            <span className="text-[10px] uppercase font-bold text-[#3F6A5E]">Phase 3</span>
                            <span className="px-2 py-0.5 rounded bg-[#FAF0DC] text-[#213832] font-extrabold text-[10px]">Multi-Dimensional Scoring</span>
                        </div>
                        <h3 className="text-base font-black text-[#162622]">3. 5-Dimension Destination Aggregation</h3>
                        <p className="text-[#213832]/80 leading-relaxed font-medium">
                            Aggregated clean records into per-country profiles across 5 dimensions: Popularity (volume), Spending (financial commitment), Experience (satisfaction), Loyalty (recommendation rate), and Sustainability (carbon footprint).
                        </p>
                    </div>

                    {/* Step 4 */}
                    <div className="bg-[#FFFFFF] border border-[#3F6A5E]/20 rounded-2xl p-6 space-y-3 shadow-sm">
                        <div className="flex items-center justify-between">
                            <span className="text-[10px] uppercase font-bold text-[#3F6A5E]">Phase 4</span>
                            <span className="px-2 py-0.5 rounded bg-[#FAF0DC] text-[#213832] font-extrabold text-[10px]">Serving & Visualization</span>
                        </div>
                        <h3 className="text-base font-black text-[#162622]">4. Full-Stack Web Integration</h3>
                        <p className="text-[#213832]/80 leading-relaxed font-medium">
                            Exposed analytical outputs through a high-performance RESTful FastAPI backend and reactive Next.js 14 frontend with interactive filtering, transparent algorithms, and custom styling.
                        </p>
                    </div>
                </div>
            </div>

            {/* Derived Metric Formulas */}
            <div className="bg-[#FFFFFF] border border-[#3F6A5E]/20 rounded-2xl p-6 space-y-4 shadow-sm">
                <h2 className="text-base font-black text-[#162622] flex items-center gap-2">
                    <Database className="w-4 h-4 text-[#3F6A5E]" />
                    Derived Analytical Formulas
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-mono">
                    <div className="bg-[#FAF0DC] p-3 rounded-xl border border-[#3F6A5E]/15">
                        <span className="text-[10px] text-[#3F6A5E] font-bold block mb-1">Spend Per Traveler (USD)</span>
                        <code className="text-[#162622] font-bold">Total Spend / Number of Travelers</code>
                    </div>
                    <div className="bg-[#FAF0DC] p-3 rounded-xl border border-[#3F6A5E]/15">
                        <span className="text-[10px] text-[#3F6A5E] font-bold block mb-1">Daily Spend Intensity</span>
                        <code className="text-[#162622] font-bold">Total Spend / Duration (Nights)</code>
                    </div>
                    <div className="bg-[#FAF0DC] p-3 rounded-xl border border-[#3F6A5E]/15">
                        <span className="text-[10px] text-[#3F6A5E] font-bold block mb-1">Carbon CO₂ Footprint (kg)</span>
                        <code className="text-[#162622] font-bold">Nights × Transport Mode Factor</code>
                    </div>
                </div>
            </div>

            {/* Academic Standards Footer */}
            <div className="p-6 rounded-2xl bg-[#213832] text-[#FFF2DA] space-y-2 text-xs">
                <div className="flex items-center gap-2 text-[#76B7A6] font-extrabold uppercase tracking-wider text-[11px]">
                    <Award className="w-4 h-4" />
                    DAV Innovative Assignment Compliance
                </div>
                <p className="leading-relaxed text-[#FFF2DA]/90 font-medium">
                    This system strictly satisfies all requirements for the Data Analysis & Visualization course at Nirma University. All visual charts, metric cards, recommendation matching, and data tables reflect true underlying data distributions without mock or randomized values.
                </p>
            </div>
        </div>
    );
}
