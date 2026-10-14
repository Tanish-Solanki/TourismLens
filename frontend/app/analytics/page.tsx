"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AnalyticsRedirect() {
    const router = useRouter();

    useEffect(() => {
        router.replace("/insights");
    }, [router]);

    return (
        <div className="max-w-7xl mx-auto px-4 py-16 text-center text-xs text-slate-400">
            Redirecting to Insights...
        </div>
    );
}
