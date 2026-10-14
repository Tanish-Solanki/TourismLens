const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";

export async function fetchApi<T>(endpoint: string, options?: RequestInit): Promise<T> {
    try {
        const res = await fetch(`${API_BASE_URL}${endpoint}`, {
            ...options,
            headers: {
                "Content-Type": "application/json",
                ...options?.headers,
            },
            cache: "no-store"
        });
        if (!res.ok) {
            throw new Error(`API Error [${res.status}]: ${res.statusText}`);
        }
        return await res.json();
    } catch (err: any) {
        console.warn(`[fetchApi] Backend unreachable at ${endpoint}:`, err.message || err);
        return null as unknown as T;
    }
}

export interface OverviewStats {
    total_trips?: number;
    total_trips_analyzed?: number;
    origin_countries_count?: number;
    total_origin_countries?: number;
    destination_countries_count?: number;
    total_destinations?: number;
    years_range?: number[];
    total_spend_usd?: number;
    avg_spend_per_trip?: number;
    avg_satisfaction?: number;
    recommendation_rate_percent?: number;
}

export type GlobalOverviewStats = OverviewStats;

export interface DestinationProfile {
    destination_country: string;
    total_trips: number;
    avg_duration_nights: number;
    avg_total_spend_usd: number;
    avg_spend_per_traveler_usd: number;
    avg_spend_per_night_usd: number;
    avg_satisfaction_score: number;
    recommendation_rate_percent: number;
    avg_carbon_footprint_kg: number;
    avg_carbon_per_traveler_kg: number;
    popular_purposes: { purpose: string; count: number }[];
    popular_traveler_types: { type: string; count: number }[];
    transport_breakdown: { mode: string; count: number }[];
    accommodation_breakdown: { type: string; count: number }[];
    yearly_trips?: Record<string, number>;
}

export interface DestinationMatch {
    destination_country: string;
    match_score: number;
    matching_trip_count: number;
    avg_spend: number;
    avg_spend_per_traveler: number;
    avg_duration_nights: number;
    avg_satisfaction: number;
    recommendation_rate_percent: number;
    avg_carbon_footprint_kg: number;
    why_recommended: string[];
}

export interface RecommendationResponse {
    total_matching_trips: number;
    applied_filters: Record<string, any>;
    matches: DestinationMatch[];
    historical_disclaimer: string;
}

export interface TripAnalyzerResponse {
    matching_historical_trips: number;
    est_total_spend_usd: number;
    est_spend_per_traveler_usd: number;
    est_spend_per_night_usd: number;
    est_carbon_footprint_kg: number;
    est_carbon_per_traveler_kg: number;
    est_attractions_visited: number;
    avg_satisfaction_score: number;
    recommendation_rate_percent: number;
    disclaimer: string;
}

export interface TransportCO2Metric {
    transport_mode: string;
    avg_carbon_footprint_kg: number;
    avg_carbon_per_traveler_kg: number;
    avg_carbon_per_night_kg: number;
    sample_trip_count: number;
}

export interface PurposeSpendSummary {
    travel_purpose: string;
    total_trips: number;
    avg_total_spend_usd: number;
    avg_spend_per_traveler_usd: number;
    avg_duration_nights: number;
}

export interface RawTripRecord {
    trip_id: string | number;
    origin_country: string;
    destination_country: string;
    year: number;
    traveler_type: string;
    travel_purpose: string;
    duration_nights: number;
    total_spend_usd?: number;
    total_trip_spend_usd?: number;
    spend_per_night_usd?: number;
    satisfaction_score?: number;
    carbon_footprint_kg?: number;
    carbon_footprint_kg_co2?: number;
    [key: string]: any;
}

export interface PaginatedTripsResponse {
    total_count: number;
    total_trips?: number;
    page: number;
    page_size: number;
    total_pages: number;
    items: RawTripRecord[];
    trips?: RawTripRecord[];
}
