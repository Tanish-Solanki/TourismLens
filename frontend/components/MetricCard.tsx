import { LucideIcon } from "lucide-react";

interface MetricCardProps {
    title: string;
    value: string | number;
    subtitle?: string;
    icon: LucideIcon;
    badgeText?: string;
    trend?: string;
    accentColor?: "indigo" | "emerald" | "amber" | "sky";
}

export function MetricCard({
    title,
    value,
    subtitle,
    icon: Icon,
    badgeText,
}: MetricCardProps) {
    return (
        <div className="p-5 rounded-xl border border-[#3F6A5E]/20 bg-[#FFFFFF] shadow-sm hover:border-[#76B7A6] transition-all">
            <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-[#3F6A5E]">
                    {title}
                </span>
                <div className="w-8 h-8 rounded-lg bg-[#FAF0DC] border border-[#EBCFB1] flex items-center justify-center">
                    <Icon className="w-4 h-4 text-[#213832]" />
                </div>
            </div>
            <div className="flex items-baseline gap-2">
                <span className="text-2xl font-black tracking-tight text-[#162622]">
                    {value}
                </span>
                {badgeText && (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#213832] text-[#FFF2DA]">
                        {badgeText}
                    </span>
                )}
            </div>
            {subtitle && (
                <p className="text-xs text-[#213832]/75 font-medium mt-1">
                    {subtitle}
                </p>
            )}
        </div>
    );
}
