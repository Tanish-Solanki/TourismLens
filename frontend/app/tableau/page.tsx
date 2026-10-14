"use client";

import { useEffect, useRef } from "react";
import { BarChart2 } from "lucide-react";

export default function TableauPage() {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Load Tableau embed script
        const existingScript = document.getElementById("tableau-viz-script");
        if (!existingScript) {
            const script = document.createElement("script");
            script.id = "tableau-viz-script";
            script.type = "module";
            script.src = "https://public.tableau.com/javascripts/api/tableau.embedding.3.latest.min.js";
            script.async = true;
            document.head.appendChild(script);
        }
    }, []);

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 min-h-screen text-[#162622]">
            {/* Page Title */}
            <div className="border-b border-[#3F6A5E]/20 pb-6 space-y-2">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-[#213832] text-[#FFF2DA] text-xs font-semibold">
                    <BarChart2 className="w-3.5 h-3.5 text-[#76B7A6]" />
                    Interactive Visual Analytics
                </div>
                <h1 className="text-3xl font-black text-[#162622] tracking-tight">
                    Tableau Dashboard
                </h1>
                <p className="text-sm text-[#213832]/80 max-w-2xl leading-relaxed font-medium">
                    Interactive visual analytics built in Tableau, exploring patterns across 10,000 global tourism trips (2019–2024).
                    Use filters inside the dashboard to drill down by country, traveler type, season, and more.
                </p>
            </div>

            {/* Tableau Embed */}
            <div className="bg-[#FFFFFF] border border-[#3F6A5E]/20 rounded-2xl overflow-hidden shadow-sm">
                <div className="p-4 bg-[#FAF5EB] border-b border-[#3F6A5E]/15 flex items-center gap-2">
                    <BarChart2 className="w-4 h-4 text-[#3F6A5E]" />
                    <span className="text-xs font-bold text-[#162622] uppercase tracking-wider">Live Tableau Dashboard — new_graphs</span>
                </div>
                <div ref={containerRef} className="w-full bg-white" style={{ height: "900px" }}>
                    <iframe
                        src="https://public.tableau.com/views/new_graphs/Dashboard1?:embed=yes&:showVizHome=no&:tabs=yes&:toolbar=yes&:device=desktop"
                        width="100%"
                        height="100%"
                        frameBorder="0"
                        allowFullScreen
                        style={{ border: "none", display: "block" }}
                        title="Tableau Dashboard — new_graphs"
                    />
                </div>
            </div>

            {/* Footer Note */}
            <div className="p-4 rounded-xl bg-[#FAF5EB] border border-[#3F6A5E]/15 text-[11px] text-[#213832]/80 font-medium">
                <strong>Note:</strong> This dashboard is hosted on Tableau Public. An internet connection is required to load it.
                To explore the raw dataset, visit the <a href="/data-explorer" className="text-[#3F6A5E] font-bold hover:underline">Data Explorer</a>.
            </div>
        </div>
    );
}
