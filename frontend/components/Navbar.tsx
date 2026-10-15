"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Compass, Search, Scale, Leaf, Database, BookOpen, Layers, Lightbulb, Calculator, LayoutDashboard, Menu, X } from "lucide-react";

export function Navbar() {
    const pathname = usePathname();
    const [menuOpen, setMenuOpen] = useState(false);

    // Close menu on route change
    useEffect(() => {
        setMenuOpen(false);
    }, [pathname]);

    // Prevent body scroll when menu is open
    useEffect(() => {
        if (menuOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => { document.body.style.overflow = ""; };
    }, [menuOpen]);

    const allLinks = [
        { href: "/", label: "Home", icon: Compass },
        { href: "/find-destination", label: "Find Destination", icon: Search },
        { href: "/explore", label: "Explore", icon: Layers },
        { href: "/compare", label: "Compare", icon: Scale },
        { href: "/trip-analyzer", label: "Trip Analyzer", icon: Calculator },
        { href: "/sustainability", label: "Sustainability", icon: Leaf },
        { href: "/insights", label: "Insights", icon: Lightbulb },
        { href: "/data-explorer", label: "Data Explorer", icon: Database },
        { href: "/tableau", label: "Tableau", icon: LayoutDashboard },
        { href: "/methodology", label: "Methodology", icon: BookOpen },
    ];

    return (
        <>
            <header className="sticky top-0 z-50 bg-[#213832]/95 backdrop-blur-xl border-b border-[#3F6A5E]/40 text-[#FFF2DA] shadow-md">
                <div className="w-full max-w-[1700px] mx-auto px-3 sm:px-4">
                    <div className="flex items-center justify-between h-16">

                        {/* Brand Logo */}
                        <Link href="/" className="flex items-center gap-2 group shrink-0 hover:opacity-90 transition-opacity">
                            <div className="relative flex items-center justify-center">
                                <div className="absolute -inset-0.5 rounded-lg bg-gradient-to-tr from-[#76B7A6] to-[#A9D7C8] opacity-40 group-hover:opacity-90 blur-xs transition-all duration-300"></div>
                                <div className="relative w-8 h-8 rounded-lg bg-[#162622] border border-[#76B7A6]/60 flex items-center justify-center shadow-md">
                                    <svg viewBox="0 0 40 40" className="w-4 h-4 text-[#76B7A6] group-hover:rotate-45 transition-transform duration-500 ease-out" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <circle cx="20" cy="20" r="17" stroke="currentColor" strokeWidth="1.8" strokeDasharray="3 2" opacity="0.7" />
                                        <circle cx="20" cy="20" r="12" stroke="#A9D7C8" strokeWidth="1.5" />
                                        <path d="M20 5 L20 12 M20 28 L20 35 M5 20 L12 20 M28 20 L35 20" stroke="#76B7A6" strokeWidth="2" strokeLinecap="round" />
                                        <circle cx="20" cy="20" r="4.5" fill="#FFF2DA" />
                                        <circle cx="20" cy="20" r="2" fill="#162622" />
                                    </svg>
                                </div>
                            </div>
                            <div className="flex items-center gap-1">
                                <span className="font-black text-base tracking-tight text-[#FFF2DA]">Tourism</span>
                                <span className="px-1.5 py-0.5 rounded bg-[#76B7A6] text-[#162622] font-black text-[10px] tracking-wider uppercase shadow-sm">LENS</span>
                            </div>
                        </Link>

                        {/* Desktop Nav */}
                        <nav className="hidden lg:flex items-center gap-0.5 xl:gap-1">
                            {allLinks.map((link) => {
                                const Icon = link.icon;
                                const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
                                return (
                                    <Link
                                        key={link.href}
                                        href={link.href}
                                        className={`flex items-center gap-1 px-2 xl:px-2.5 py-1.5 rounded-lg text-[11px] xl:text-xs font-bold transition-all duration-150 shrink-0 ${isActive
                                            ? "bg-[#76B7A6] text-[#162622] shadow-sm"
                                            : "text-[#FFF2DA]/90 hover:text-[#FFF2DA] hover:bg-[#3F6A5E]/40"
                                            }`}
                                    >
                                        <Icon className={`w-3.5 h-3.5 shrink-0 ${isActive ? "text-[#162622]" : "text-[#76B7A6]"}`} />
                                        <span className="whitespace-nowrap">{link.label}</span>
                                    </Link>
                                );
                            })}
                        </nav>

                        {/* Mobile Hamburger Button */}
                        <button
                            onClick={() => setMenuOpen(!menuOpen)}
                            aria-label={menuOpen ? "Close menu" : "Open menu"}
                            aria-expanded={menuOpen}
                            className="lg:hidden flex items-center justify-center w-10 h-10 rounded-lg bg-[#3F6A5E]/30 hover:bg-[#3F6A5E]/60 border border-[#76B7A6]/30 text-[#FFF2DA] transition-all duration-200 active:scale-95"
                        >
                            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                        </button>
                    </div>
                </div>
            </header>

            {/* Mobile Menu Overlay */}
            {menuOpen && (
                <div
                    className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
                    onClick={() => setMenuOpen(false)}
                />
            )}

            {/* Mobile Menu Drawer */}
            <div
                className={`fixed top-0 right-0 z-50 h-full w-72 max-w-[85vw] bg-[#162622] border-l border-[#3F6A5E]/50 shadow-2xl lg:hidden flex flex-col transform transition-transform duration-300 ease-in-out ${menuOpen ? "translate-x-0" : "translate-x-full"
                    }`}
            >
                {/* Drawer Header */}
                <div className="flex items-center justify-between px-5 py-4 border-b border-[#3F6A5E]/40 bg-[#213832]/80">
                    <div className="flex items-center gap-2">
                        <span className="font-black text-base text-[#FFF2DA]">Tourism</span>
                        <span className="px-1.5 py-0.5 rounded bg-[#76B7A6] text-[#162622] font-black text-[10px] tracking-wider uppercase">LENS</span>
                    </div>
                    <button
                        onClick={() => setMenuOpen(false)}
                        aria-label="Close menu"
                        className="flex items-center justify-center w-8 h-8 rounded-lg bg-[#3F6A5E]/30 hover:bg-[#3F6A5E]/60 text-[#FFF2DA] transition-all"
                    >
                        <X className="w-4 h-4" />
                    </button>
                </div>

                {/* Drawer Links */}
                <nav className="flex-1 overflow-y-auto py-3 px-3">
                    {allLinks.map((link) => {
                        const Icon = link.icon;
                        const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
                        return (
                            <Link
                                key={link.href}
                                href={link.href}
                                onClick={() => setMenuOpen(false)}
                                className={`flex items-center gap-3 px-4 py-3 rounded-xl mb-1 text-sm font-semibold transition-all duration-150 ${isActive
                                    ? "bg-[#76B7A6] text-[#162622] shadow-sm"
                                    : "text-[#FFF2DA]/85 hover:text-[#FFF2DA] hover:bg-[#3F6A5E]/40"
                                    }`}
                            >
                                <Icon className={`w-4.5 h-4.5 shrink-0 ${isActive ? "text-[#162622]" : "text-[#76B7A6]"}`} />
                                <span>{link.label}</span>
                            </Link>
                        );
                    })}
                </nav>

                {/* Drawer Footer */}
                <div className="px-5 py-4 border-t border-[#3F6A5E]/40 text-[10px] text-[#FFF2DA]/40 text-center">
                    Global Tourism Trends 2019–2024
                </div>
            </div>
        </>
    );
}
