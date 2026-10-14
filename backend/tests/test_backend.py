import os
import sys
import pytest
from fastapi.testclient import TestClient

# Ensure app package is importable
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

from app.main import app
from app.services.data_service import data_service

client = TestClient(app)

def test_health_check():
    res = client.get("/api/health")
    assert res.status_code == 200
    data = res.json()
    assert data["status"] == "healthy"
    assert data["dataset_rows"] == 10000

def test_overview_stats():
    res = client.get("/api/overview")
    assert res.status_code == 200
    data = res.json()
    assert data["total_trips"] == 10000
    assert data["origin_countries_count"] == 20
    assert data["destination_countries_count"] == 20
    assert len(data["years_range"]) == 6

def test_get_destinations():
    res = client.get("/api/destinations")
    assert res.status_code == 200
    data = res.json()
    assert len(data) == 20
    france = next((d for d in data if d["destination_country"] == "France"), None)
    assert france is not None
    assert france["total_trips"] > 0
    assert france["avg_satisfaction_score"] > 1.0

def test_get_destination_detail():
    res = client.get("/api/destinations/Japan")
    assert res.status_code == 200
    data = res.json()
    assert data["destination_country"] == "Japan"
    assert "yearly_trips" in data

def test_recommendations_logic():
    payload = {
        "traveler_type": "Solo",
        "travel_purpose": "Leisure/Tourism",
        "preferred_transport": "Air",
        "sustainability_priority": "High"
    }
    res = client.post("/api/recommendations", json=payload)
    assert res.status_code == 200
    data = res.json()
    assert "matches" in data
    assert len(data["matches"]) > 0
    first_match = data["matches"][0]
    assert "why_recommended" in first_match
    assert len(first_match["why_recommended"]) > 0

def test_trip_analyzer():
    payload = {
        "destination_country": "France",
        "num_travelers": 2,
        "duration_nights": 7,
        "transport_mode": "Air",
        "accommodation_type": "4-Star Hotel"
    }
    res = client.post("/api/trip-analyzer", json=payload)
    assert res.status_code == 200
    data = res.json()
    assert data["est_total_spend_usd"] > 0
    assert data["est_carbon_footprint_kg"] > 0

def test_sustainability_stats():
    res = client.get("/api/sustainability")
    assert res.status_code == 200
    data = res.json()
    assert "transport_mode_emissions" in data
    assert len(data["transport_mode_emissions"]) == 5

def test_paginated_trips():
    res = client.get("/api/trips?page=1&page_size=10")
    assert res.status_code == 200
    data = res.json()
    assert data["total_trips"] == 10000
    assert len(data["trips"]) == 10
