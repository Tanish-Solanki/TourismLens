import Link from "next/link";
import { Database, BarChart, Globe } from "lucide-react";

export function Footer() {
    return (
        <footer className="bg-[#213832] border-t border-[#3F6A5E]/40 text-[#FFF2DA] py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                    {/* Col 1: About */}
                    <div className="md:col-span-2 space-y-3">
                        <div className="flex items-center gap-2.5">
                            <div className="w-8 h-8 rounded-lg bg-[#162622] border border-[#76B7A6]/60 flex items-center justify-center text-[#76B7A6] shadow-sm">
                                <svg viewBox="0 0 40 40" className="w-4 h-4 text-[#76B7A6]" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <circle cx="20" cy="20" r="17" stroke="currentColor" strokeWidth="2" strokeDasharray="3 2" opacity="0.8" />
                                    <circle cx="20" cy="20" r="12" stroke="#A9D7C8" strokeWidth="1.5" />
                                    <path d="M20 5 L20 12 M20 28 L20 35 M5 20 L12 20 M28 20 L35 20" stroke="#76B7A6" strokeWidth="2" strokeLinecap="round" />
                                    <circle cx="20" cy="20" r="4.5" fill="#FFF2DA" />
                                </svg>
                            </div>
                            <span className="font-extrabold text-lg text-[#FFF2DA]">Tourism<span className="px-1.5 py-0.5 ml-1 rounded bg-[#76B7A6] text-[#162622] font-black text-xs uppercase tracking-wider">Lens</span></span>
                        </div>
                        <p className="text-xs text-[#A0C4B9] leading-relaxed max-w-md">
                            A data-driven decision-support system built for Nirma University&apos;s Data Analysis and Visualization (DAV 3CS103ME244) course.
                            Analyzes historical global travel records from 2019–2024 (10,000 trips across 20 origin and 20 destination countries).
                        </p>
                        <div className="text-[11px] text-[#EBCFB1] font-medium pt-1">
                            Submitted by: Tanish Solanki (24BCE360), Pratham Chaudhary (24BCE351), Manav Vala (24BCE345)
                        </div>
                    </div>

                    {/* Col 2: Core Applications */}
                    <div>
                        <h4 className="text-xs font-bold uppercase tracking-wider text-[#FFF2DA] mb-3">
                            Application Modules
                        </h4>
                        <ul className="space-y-2 text-xs text-[#A0C4B9]">
                            <li><Link href="/find-destination" className="hover:text-[#76B7A6] transition-colors">Find My Destination</Link></li>
                            <li><Link href="/explore" className="hover:text-[#76B7A6] transition-colors">Destination Explorer</Link></li>
                            <li><Link href="/compare" className="hover:text-[#76B7A6] transition-colors">Compare Destinations</Link></li>
                            <li><Link href="/trip-analyzer" className="hover:text-[#76B7A6] transition-colors">Trip Cost & CO₂ Analyzer</Link></li>
                            <li><Link href="/sustainability" className="hover:text-[#76B7A6] transition-colors">Sustainability Analytics</Link></li>
                        </ul>
                    </div>

                    {/* Col 3: Academic Resources */}
                    <div>
                        <h4 className="text-xs font-bold uppercase tracking-wider text-[#FFF2DA] mb-3">
                            Academic & Data Pipeline
                        </h4>
                        <ul className="space-y-2 text-xs text-[#A0C4B9]">
                            <li><Link href="/insights" className="hover:text-[#76B7A6] transition-colors">Statistical &amp; Correlation Insights</Link></li>
                            <li><Link href="/data-explorer" className="hover:text-[#76B7A6] transition-colors">Cleaned Dataset Explorer</Link></li>
                            <li><Link href="/tableau" className="hover:text-[#76B7A6] transition-colors">Tableau Dashboard</Link></li>
                            <li><Link href="/methodology" className="hover:text-[#76B7A6] transition-colors">KNIME &amp; Pipeline Specs</Link></li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-[#3F6A5E]/30 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-[#A0C4B9] gap-4">
                    <div>
                        © 2026 TourismLens Project — Institute of Technology, Nirma University.
                    </div>
                    <div className="flex items-center space-x-3">
                        <span className="inline-flex items-center gap-1.5 text-[11px] bg-[#162622] border border-[#3F6A5E] px-3 py-1 rounded-lg text-[#FFF2DA]">
                            <Database className="w-3 h-3 text-[#A9D7C8]" />
                            10,000 Validated Records
                        </span>
                        <span className="inline-flex items-center gap-1.5 text-[11px] bg-[#162622] border border-[#3F6A5E] px-3 py-1 rounded-lg text-[#FFF2DA]">
                            <BarChart className="w-3 h-3 text-[#76B7A6]" />
                            Python + KNIME
                        </span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
