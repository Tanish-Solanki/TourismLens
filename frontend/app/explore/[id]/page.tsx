import { DestinationDetailClient } from "./DestinationDetailClient";

const DESTINATIONS = [
    "France", "Egypt", "Thailand", "Malaysia", "New Zealand",
    "Italy", "UAE", "Japan", "Singapore", "Turkey",
    "Switzerland", "Maldives", "United States", "United Kingdom", "Germany",
    "Spain", "Australia", "Canada", "Brazil", "India"
];

export async function generateStaticParams() {
    return DESTINATIONS.map((d) => ({
        id: encodeURIComponent(d)
    }));
}

export default async function DestinationPage({ params }: { params: Promise<{ id: string }> }) {
    const resolvedParams = await params;
    const destName = decodeURIComponent(resolvedParams?.id || "");
    return <DestinationDetailClient destName={destName} />;
}
