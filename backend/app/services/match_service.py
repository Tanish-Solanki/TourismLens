import pandas as pd
import numpy as np
from typing import Dict, Any, List
from app.services.data_service import data_service
from app.schemas.models import RecommendationRequest, RecommendationResponse, DestinationMatch, TripAnalyzerRequest, TripAnalyzerResponse

class MatchService:
    @staticmethod
    def get_recommendations(req: RecommendationRequest) -> RecommendationResponse:
        df = data_service.df.copy()
        applied_filters = {}

        # Transparent filtering
        if req.traveler_type and req.traveler_type != "Any":
            df = df[df['traveler_type'] == req.traveler_type]
            applied_filters["traveler_type"] = req.traveler_type

        if req.travel_purpose and req.travel_purpose != "Any":
            df = df[df['travel_purpose'] == req.travel_purpose]
            applied_filters["travel_purpose"] = req.travel_purpose

        if req.preferred_transport and req.preferred_transport != "Any":
            df = df[df['transport_mode'] == req.preferred_transport]
            applied_filters["transport_mode"] = req.preferred_transport

        if req.accommodation_type and req.accommodation_type != "Any":
            df = df[df['accommodation_type'] == req.accommodation_type]
            applied_filters["accommodation_type"] = req.accommodation_type

        if req.preferred_season and req.preferred_season != "Any":
            df = df[df['season'] == req.preferred_season]
            applied_filters["season"] = req.preferred_season

        if req.origin_country and req.origin_country != "Any":
            df = df[df['origin_country'] == req.origin_country]
            applied_filters["origin_country"] = req.origin_country

        total_matching = len(df)

        # Fallback if filters are extremely restrictive
        if total_matching < 10:
            # Relax to destination-wide historical averages
            df = data_service.df.copy()

        # Group by destination country
        grouped = df.groupby('destination_country')
        dest_matches = []

        overall_co2_mean = data_service.df['carbon_footprint_kg_co2'].mean()
        overall_sat_mean = data_service.df['satisfaction_score'].mean()
        overall_rec_mean = data_service.df['recommend_flag'].mean()

        for dest_name, group in grouped:
            trip_cnt = len(group)
            if trip_cnt < 3:
                continue

            avg_duration = float(group['duration_nights'].mean())
            avg_spend = float(group['total_trip_spend_usd'].mean())
            avg_spend_traveler = float(group['spend_per_traveler_usd'].mean())
            avg_sat = float(group['satisfaction_score'].mean())
            rec_rate = float(group['recommend_flag'].mean() * 100)
            avg_co2 = float(group['carbon_footprint_kg_co2'].mean())

            # Historical transparent match score logic (0-100)
            score = 70.0
            why = []

            # 1. Satisfaction alignment
            if avg_sat >= 3.8:
                score += 10.0
                why.append(f"High historical traveler satisfaction ({avg_sat:.2f}/5.0)")
            
            # 2. Recommendation rate alignment
            if rec_rate >= 70.0:
                score += 10.0
                why.append(f"Strong recommendation rate ({rec_rate:.1f}% of matching travelers)")

            # 3. Budget alignment if provided
            if req.budget_per_person_usd and req.budget_per_person_usd > 0:
                if avg_spend_traveler <= req.budget_per_person_usd:
                    score += 10.0
                    why.append(f"Avg spend per traveler (${avg_spend_traveler:.0f}) fits within specified budget (${req.budget_per_person_usd:.0f})")
                else:
                    score -= 5.0

            # 4. Sustainability priority alignment
            if req.sustainability_priority == "High":
                if avg_co2 < overall_co2_mean:
                    score += 10.0
                    why.append(f"Lower carbon footprint ({avg_co2:.0f} kg CO2) than global average ({overall_co2_mean:.0f} kg)")
                else:
                    score -= 5.0
            
            # Default matching rationale if why is sparse
            if len(why) < 2:
                why.append(f"Significant historical volume for selected travel profile ({trip_cnt} trips)")

            score = round(min(100.0, max(40.0, score)), 1)

            dest_matches.append(DestinationMatch(
                destination_country=dest_name,
                match_score=score,
                matching_trip_count=trip_cnt,
                avg_spend=round(avg_spend, 2),
                avg_spend_per_traveler=round(avg_spend_traveler, 2),
                avg_duration_nights=round(avg_duration, 1),
                avg_satisfaction=round(avg_sat, 2),
                recommendation_rate_percent=round(rec_rate, 1),
                avg_carbon_footprint_kg=round(avg_co2, 1),
                why_recommended=why
            ))

        # Sort by match score descending
        dest_matches.sort(key=lambda x: (x.match_score, x.matching_trip_count), reverse=True)
        top_matches = dest_matches[:5]

        return RecommendationResponse(
            total_matching_trips=total_matching,
            applied_filters=applied_filters,
            matches=top_matches,
            historical_disclaimer="Recommendations are computed from transparent filtering of 10,000 historical trips (2019–2024). They serve as historical decision support and do not guarantee future travel conditions."
        )

    @staticmethod
    def analyze_trip(req: TripAnalyzerRequest) -> TripAnalyzerResponse:
        df = data_service.df.copy()

        if req.destination_country and req.destination_country != "Any":
            df = df[df['destination_country'] == req.destination_country]
        if req.transport_mode and req.transport_mode != "Any":
            df = df[df['transport_mode'] == req.transport_mode]
        if req.accommodation_type and req.accommodation_type != "Any":
            df = df[df['accommodation_type'] == req.accommodation_type]
        if req.traveler_type and req.traveler_type != "Any":
            df = df[df['traveler_type'] == req.traveler_type]
        if req.travel_purpose and req.travel_purpose != "Any":
            df = df[df['travel_purpose'] == req.travel_purpose]

        matching_cnt = len(df)
        if matching_cnt == 0:
            df = data_service.df.copy() # fallback to global dataset

        avg_spend_per_night = float(df['spend_per_night_usd'].mean())
        avg_spend_per_traveler = float(df['spend_per_traveler_usd'].mean())
        avg_co2_per_traveler = float(df['carbon_per_traveler_kg'].mean())
        avg_attractions_per_night = float(df['attractions_per_night'].mean())

        # Calculated estimates for the requested trip specifications
        est_total_spend = round(avg_spend_per_night * req.duration_nights * max(1, req.num_travelers * 0.7), 2)
        est_spend_traveler = round(est_total_spend / max(1, req.num_travelers), 2)
        est_spend_night = round(est_total_spend / max(1, req.duration_nights), 2)
        est_co2 = round(avg_co2_per_traveler * req.num_travelers, 1)
        est_co2_traveler = round(avg_co2_per_traveler, 1)
        est_attractions = round(avg_attractions_per_night * req.duration_nights, 1)

        avg_sat = round(float(df['satisfaction_score'].mean()), 2)
        rec_rate = round(float(df['recommend_flag'].mean() * 100), 1)

        return TripAnalyzerResponse(
            matching_historical_trips=matching_cnt,
            est_total_spend_usd=est_total_spend,
            est_spend_per_traveler_usd=est_spend_traveler,
            est_spend_per_night_usd=est_spend_night,
            est_carbon_footprint_kg=est_co2,
            est_carbon_per_traveler_kg=est_co2_traveler,
            est_attractions_visited=est_attractions,
            avg_satisfaction_score=avg_sat,
            recommendation_rate_percent=rec_rate,
            disclaimer="Estimates are computed based on historical dataset averages matching your selected trip parameters."
        )
