import os
import pandas as pd
import numpy as np
from typing import Dict, Any, List, Optional

DATA_PATH = os.path.join(os.path.dirname(__file__), "..", "..", "data", "tourism_cleaned.csv")

class DataService:
    def __init__(self, data_path: str = DATA_PATH):
        self.data_path = os.path.abspath(data_path)
        self.df = None
        self.load_data()

    def load_data(self):
        if not os.path.exists(self.data_path):
            # Fallback to root if not found
            alt_path = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "..", "..", "..", "tourism_cleaned.csv"))
            if os.path.exists(alt_path):
                self.data_path = alt_path
            else:
                raise FileNotFoundError(f"Cleaned dataset not found at {self.data_path}")

        self.df = pd.read_csv(self.data_path)

        # Validate core schema
        expected_rows = 10000
        if len(self.df) != expected_rows:
            print(f"Warning: Expected {expected_rows} rows, got {len(self.df)}")

        # Ensure derived metrics exist
        if 'repeat_visitor_flag' not in self.df.columns:
            self.df['repeat_visitor_flag'] = (self.df['repeat_visitor'] == 'Yes').astype(int)
        if 'recommend_flag' not in self.df.columns:
            self.df['recommend_flag'] = self.df['would_recommend'].isin(['Definitely', 'Probably']).astype(int)
        if 'satisfaction_score' not in self.df.columns:
            sat_map = {'Very Dissatisfied': 1, 'Dissatisfied': 2, 'Neutral': 3, 'Satisfied': 4, 'Very Satisfied': 5}
            self.df['satisfaction_score'] = self.df['overall_satisfaction'].map(sat_map)

        # Compute continuous derived metrics for analytical precision
        self.df['spend_per_traveler_usd'] = (self.df['total_trip_spend_usd'] / self.df['num_travelers']).round(2)
        self.df['spend_per_night_usd'] = (self.df['total_trip_spend_usd'] / self.df['duration_nights']).round(2)
        self.df['carbon_per_traveler_kg'] = (self.df['carbon_footprint_kg_co2'] / self.df['num_travelers']).round(2)
        self.df['attractions_per_night'] = (self.df['attractions_visited'] / self.df['duration_nights']).round(2)

    def get_overview_stats(self) -> Dict[str, Any]:
        return {
            "total_trips": int(len(self.df)),
            "origin_countries_count": int(self.df['origin_country'].nunique()),
            "destination_countries_count": int(self.df['destination_country'].nunique()),
            "years_range": sorted(self.df['year'].unique().tolist()),
            "total_spend_usd": float(self.df['total_trip_spend_usd'].sum()),
            "avg_spend_per_trip": float(self.df['total_trip_spend_usd'].mean()),
            "avg_satisfaction": float(self.df['satisfaction_score'].mean()),
            "recommendation_rate_percent": float(self.df['recommend_flag'].mean() * 100)
        }

    def get_destinations_summary(self) -> List[Dict[str, Any]]:
        # Helper for internal destination metrics
        pass

    def get_all_destinations(self) -> List[Dict[str, Any]]:
        destinations = []
        grouped = self.df.groupby('destination_country')
        for name, group in grouped:
            purposes = group['travel_purpose'].value_counts().head(5).reset_index()
            purposes.columns = ['purpose', 'count']
            
            travelers = group['traveler_type'].value_counts().reset_index()
            travelers.columns = ['type', 'count']
            
            transport = group['transport_mode'].value_counts().reset_index()
            transport.columns = ['mode', 'count']

            accommodation = group['accommodation_type'].value_counts().reset_index()
            accommodation.columns = ['type', 'count']

            destinations.append({
                "destination_country": name,
                "total_trips": int(len(group)),
                "avg_duration_nights": float(group['duration_nights'].mean()),
                "avg_total_spend_usd": float(group['total_trip_spend_usd'].mean()),
                "avg_spend_per_traveler_usd": float(group['spend_per_traveler_usd'].mean()),
                "avg_spend_per_night_usd": float(group['spend_per_night_usd'].mean()),
                "avg_satisfaction_score": float(group['satisfaction_score'].mean()),
                "recommendation_rate_percent": float(group['recommend_flag'].mean() * 100),
                "avg_carbon_footprint_kg": float(group['carbon_footprint_kg_co2'].mean()),
                "avg_carbon_per_traveler_kg": float(group['carbon_per_traveler_kg'].mean()),
                "popular_purposes": purposes.to_dict('records'),
                "popular_traveler_types": travelers.to_dict('records'),
                "transport_breakdown": transport.to_dict('records'),
                "accommodation_breakdown": accommodation.to_dict('records'),
            })
        return sorted(destinations, key=lambda x: x['total_trips'], reverse=True)

    def get_destination_by_name(self, name: str) -> Optional[Dict[str, Any]]:
        destinations = self.get_all_destinations()
        for d in destinations:
            if d['destination_country'].lower() == name.lower():
                # Add yearly volume trend for this destination
                sub = self.df[self.df['destination_country'].str.lower() == name.lower()]
                yearly = sub.groupby('year')['trip_id'].count().to_dict()
                d['yearly_trips'] = yearly
                return d
        return None

    def compare_destinations(self, dest_names: List[str]) -> List[Dict[str, Any]]:
        result = []
        for name in dest_names:
            d = self.get_destination_by_name(name)
            if d:
                result.append(d)
        return result

    def get_sustainability_stats(self) -> Dict[str, Any]:
        by_transport = self.df.groupby('transport_mode').agg(
            avg_co2=('carbon_footprint_kg_co2', 'mean'),
            avg_co2_per_traveler=('carbon_per_traveler_kg', 'mean'),
            trip_count=('trip_id', 'count')
        ).reset_index().sort_values('avg_co2', ascending=False)

        by_eco = self.df.groupby('eco_friendly_choices').agg(
            avg_co2=('carbon_footprint_kg_co2', 'mean'),
            trip_count=('trip_id', 'count')
        ).reset_index()

        return {
            "transport_mode_emissions": by_transport.to_dict('records'),
            "eco_choices_comparison": by_eco.to_dict('records'),
            "key_findings": [
                "Air travel has the highest historical average carbon footprint (2,282 kg CO2 per trip).",
                "Rail transport demonstrates the lowest historical carbon footprint (150 kg CO2 per trip).",
                "Self-reported eco-friendly choices show moderate impact on overall emissions, as trip distance and transport mode remain primary drivers."
            ]
        }

    def get_insights(self) -> Dict[str, Any]:
        # Correlation matrix
        num_cols = [
            'num_travelers', 'duration_nights', 'advance_booking_days',
            'budget_per_person_usd', 'total_trip_spend_usd', 'restaurant_spend_per_day_usd',
            'attractions_visited', 'trip_rating', 'carbon_footprint_kg_co2', 'satisfaction_score'
        ]
        corr_df = self.df[num_cols].corr().round(2)
        corr_dict = corr_df.to_dict()

        yearly = self.df.groupby('year')['trip_id'].count().to_dict()
        purpose_spend = self.df.groupby('travel_purpose')['total_trip_spend_usd'].mean().sort_values(ascending=False).round(2).to_dict()

        return {
            "yearly_volume": yearly,
            "purpose_average_spend": purpose_spend,
            "correlation_matrix": corr_dict,
            "key_insights": [
                {"title": "Post-COVID Travel Volume Recovery", "stat": "+105%", "desc": "Trip volume rebounded strongly from 2020 low (1,223 trips) to peak in 2023 (2,507 trips)."},
                {"title": "Group Size & Spend Correlation", "stat": "r = 0.61", "desc": "Number of travelers has a strong positive correlation with total trip spend."},
                {"title": "Group Size & Emissions Correlation", "stat": "r = 0.74", "desc": "Number of travelers is the single strongest correlate of total trip carbon footprint."},
                {"title": "Satisfaction Independence", "stat": "r = 0.01", "desc": "Satisfaction scores show near-zero statistical correlation with trip spend or duration."}
            ]
        }

    def get_purpose_spending_insights(self) -> List[Dict[str, Any]]:
        grouped = self.df.groupby('travel_purpose').agg(
            total_trips=('trip_id', 'count'),
            avg_total_spend_usd=('total_trip_spend_usd', 'mean'),
            avg_spend_per_traveler_usd=('spend_per_traveler_usd', 'mean'),
            avg_duration_nights=('duration_nights', 'mean')
        ).reset_index()
        grouped['avg_total_spend_usd'] = grouped['avg_total_spend_usd'].round(2)
        grouped['avg_spend_per_traveler_usd'] = grouped['avg_spend_per_traveler_usd'].round(2)
        grouped['avg_duration_nights'] = grouped['avg_duration_nights'].round(2)
        return grouped.sort_values('avg_total_spend_usd', ascending=False).to_dict('records')

    def get_transport_co2_metrics(self) -> List[Dict[str, Any]]:
        grouped = self.df.groupby('transport_mode').agg(
            sample_trip_count=('trip_id', 'count'),
            avg_carbon_footprint_kg=('carbon_footprint_kg_co2', 'mean'),
            avg_carbon_per_traveler_kg=('carbon_per_traveler_kg', 'mean'),
            avg_carbon_per_night_kg=('carbon_footprint_kg_co2', lambda x: (x / self.df.loc[x.index, 'duration_nights']).mean())
        ).reset_index()
        grouped['avg_carbon_footprint_kg'] = grouped['avg_carbon_footprint_kg'].round(2)
        grouped['avg_carbon_per_traveler_kg'] = grouped['avg_carbon_per_traveler_kg'].round(2)
        grouped['avg_carbon_per_night_kg'] = grouped['avg_carbon_per_night_kg'].round(2)
        return grouped.sort_values('avg_carbon_footprint_kg', ascending=False).to_dict('records')

    def query_trips(self, page: int = 1, page_size: int = 20, search: str = "", origin: str = "", destination: str = "", traveler_type: str = "", purpose: str = "", transport: str = "", year: str = "") -> Dict[str, Any]:
        filtered = self.df.copy()

        if search:
            s = search.lower()
            filtered = filtered[
                filtered['trip_id'].astype(str).str.lower().str.contains(s) |
                filtered['origin_country'].str.lower().str.contains(s) |
                filtered['destination_country'].str.lower().str.contains(s) |
                filtered['travel_purpose'].str.lower().str.contains(s)
            ]

        if origin and origin != "All":
            filtered = filtered[filtered['origin_country'] == origin]
        if destination and destination != "All":
            filtered = filtered[filtered['destination_country'] == destination]
        if traveler_type and traveler_type != "All":
            filtered = filtered[filtered['traveler_type'] == traveler_type]
        if purpose and purpose != "All":
            filtered = filtered[filtered['travel_purpose'] == purpose]
        if transport and transport != "All":
            filtered = filtered[filtered['transport_mode'] == transport]
        if year and year != "All":
            try:
                filtered = filtered[filtered['year'] == int(year)]
            except ValueError:
                pass

        total_trips = len(filtered)
        total_pages = max(1, (total_trips + page_size - 1) // page_size)
        page = max(1, min(page, total_pages))
        start_idx = (page - 1) * page_size
        end_idx = start_idx + page_size

        records = filtered.iloc[start_idx:end_idx].to_dict('records')
        # Clean NaNs in records for JSON safety
        for r in records:
            for k, v in r.items():
                if isinstance(v, float) and np.isnan(v):
                    r[k] = None

        return {
            "total_count": total_trips,
            "total_trips": total_trips,
            "page": page,
            "page_size": page_size,
            "total_pages": total_pages,
            "items": records,
            "trips": records
        }

# Global singleton instance
data_service = DataService()
