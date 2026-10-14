import os
from fastapi import APIRouter, HTTPException, Query
from typing import List, Optional
from app.schemas.models import (
    OverviewStats, DestinationProfile, RecommendationRequest, RecommendationResponse,
    TripAnalyzerRequest, TripAnalyzerResponse, SustainabilityStats, PaginatedTripsResponse
)
from app.services.data_service import data_service
from app.services.match_service import MatchService

router = APIRouter()

@router.get("/health")
def health_check():
    return {
        "status": "healthy",
        "service": "TourismLens Backend API",
        "dataset_rows": len(data_service.df)
    }

@router.get("/overview", response_model=OverviewStats)
@router.get("/stats/overview", response_model=OverviewStats)
def get_overview():
    return data_service.get_overview_stats()

@router.get("/destinations", response_model=List[DestinationProfile])
def get_destinations():
    return data_service.get_all_destinations()

@router.get("/destinations/{destination_name}", response_model=DestinationProfile)
def get_destination_detail(destination_name: str):
    dest = data_service.get_destination_by_name(destination_name)
    if not dest:
        raise HTTPException(status_code=404, detail=f"Destination '{destination_name}' not found.")
    return dest

@router.get("/destinations-compare", response_model=List[DestinationProfile])
def compare_destinations(names: str = Query(..., description="Comma-separated list of destination names")):
    dest_names = [n.strip() for n in names.split(",") if n.strip()]
    if not dest_names:
        raise HTTPException(status_code=400, detail="At least one destination name must be provided.")
    return data_service.compare_destinations(dest_names)

@router.post("/recommendations", response_model=RecommendationResponse)
def get_recommendations(req: RecommendationRequest):
    return MatchService.get_recommendations(req)

@router.post("/trip-analyzer", response_model=TripAnalyzerResponse)
def analyze_trip(req: TripAnalyzerRequest):
    return MatchService.analyze_trip(req)

@router.get("/sustainability", response_model=SustainabilityStats)
def get_sustainability():
    return data_service.get_sustainability_stats()

@router.get("/sustainability/transport-co2")
def get_sustainability_transport_co2():
    return data_service.get_transport_co2_metrics()

@router.get("/insights")
def get_insights():
    return data_service.get_insights()

@router.get("/insights/purpose-spending")
def get_insights_purpose_spending():
    return data_service.get_purpose_spending_insights()

@router.get("/trips", response_model=PaginatedTripsResponse)
def get_trips(
    page: int = Query(1, ge=1),
    page_size: int = Query(20, ge=1, le=100),
    search: str = Query(""),
    origin: str = Query("All"),
    destination: str = Query("All"),
    traveler_type: str = Query("All"),
    purpose: str = Query("All"),
    transport: str = Query("All"),
    year: str = Query("All")
):
    return data_service.query_trips(
        page=page,
        page_size=page_size,
        search=search,
        origin=origin,
        destination=destination,
        traveler_type=traveler_type,
        purpose=purpose,
        transport=transport,
        year=year
    )

from fastapi.responses import FileResponse

@router.get("/trips/export-csv")
def export_csv():
    if os.path.exists(data_service.data_path):
        return FileResponse(
            path=data_service.data_path,
            filename="tourism_cleaned_10k.csv",
            media_type="text/csv"
        )
    raise HTTPException(status_code=404, detail="Dataset file not found.")
