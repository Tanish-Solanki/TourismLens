from pydantic import BaseModel, Field
from typing import List, Optional, Dict, Any

class OverviewStats(BaseModel):
    total_trips: int
    origin_countries_count: int
    destination_countries_count: int
    years_range: List[int]
    total_spend_usd: float
    avg_spend_per_trip: float
    avg_satisfaction: float
    recommendation_rate_percent: float

class DestinationProfile(BaseModel):
    destination_country: str
    total_trips: int
    avg_duration_nights: float
    avg_total_spend_usd: float
    avg_spend_per_traveler_usd: float
    avg_spend_per_night_usd: float
    avg_satisfaction_score: float
    recommendation_rate_percent: float
    avg_carbon_footprint_kg: float
    avg_carbon_per_traveler_kg: float
    popular_purposes: List[Dict[str, Any]]
    popular_traveler_types: List[Dict[str, Any]]
    transport_breakdown: List[Dict[str, Any]]
    accommodation_breakdown: List[Dict[str, Any]]

class RecommendationRequest(BaseModel):
    traveler_type: Optional[str] = "Any"
    travel_purpose: Optional[str] = "Any"
    num_travelers: Optional[int] = None
    preferred_duration_nights: Optional[int] = None
    budget_per_person_usd: Optional[float] = None
    preferred_transport: Optional[str] = "Any"
    accommodation_type: Optional[str] = "Any"
    preferred_season: Optional[str] = "Any"
    sustainability_priority: Optional[str] = "Balanced" # "High", "Balanced", "Low"
    origin_country: Optional[str] = "Any"

class DestinationMatch(BaseModel):
    destination_country: str
    match_score: float
    matching_trip_count: int
    avg_spend: float
    avg_spend_per_traveler: float
    avg_duration_nights: float
    avg_satisfaction: float
    recommendation_rate_percent: float
    avg_carbon_footprint_kg: float
    why_recommended: List[str]

class RecommendationResponse(BaseModel):
    total_matching_trips: int
    applied_filters: Dict[str, Any]
    matches: List[DestinationMatch]
    historical_disclaimer: str

class TripAnalyzerRequest(BaseModel):
    destination_country: Optional[str] = "Any"
    num_travelers: int = 1
    duration_nights: int = 7
    transport_mode: str = "Air"
    accommodation_type: str = "4-Star Hotel"
    traveler_type: Optional[str] = "Any"
    travel_purpose: Optional[str] = "Any"

class TripAnalyzerResponse(BaseModel):
    matching_historical_trips: int
    est_total_spend_usd: float
    est_spend_per_traveler_usd: float
    est_spend_per_night_usd: float
    est_carbon_footprint_kg: float
    est_carbon_per_traveler_kg: float
    est_attractions_visited: float
    avg_satisfaction_score: float
    recommendation_rate_percent: float
    disclaimer: str

class SustainabilityStats(BaseModel):
    transport_mode_emissions: List[Dict[str, Any]]
    eco_choices_comparison: List[Dict[str, Any]]
    key_findings: List[str]

class PaginatedTripsResponse(BaseModel):
    total_trips: int
    page: int
    page_size: int
    total_pages: int
    trips: List[Dict[str, Any]]
