# TourismLens

A full-stack decision support system built on global tourism data. TourismLens transforms 10,000 historical trip records (2019–2024) into actionable destination insights — covering preference matching, cost estimation, carbon footprint analysis, and sustainability benchmarking.

Built as part of the Data Analysis & Visualization (DAV) course at Nirma University.

---

## Application

The web application consists of 11 pages:

| Route | Description |
|-------|-------------|
| `/` | Home — project overview and dataset summary |
| `/find-destination` | Preference-based destination matching engine |
| `/explore` | Destination profiles with multi-criteria filtering |
| `/explore/[id]` | Detailed 5-dimension profile with trend charts |
| `/compare` | Side-by-side benchmarking for 2–3 destinations |
| `/trip-analyzer` | Trip cost and CO₂ estimator by transport mode |
| `/sustainability` | Environmental footprint analysis by travel mode |
| `/analytics` | Tableau visual analytics (8 worksheets) |
| `/insights` | Statistical and correlation findings |
| `/data-explorer` | Paginated dataset grid with CSV export |
| `/methodology` | Pipeline documentation and KNIME workflow |

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | Next.js 16, React, TypeScript, Tailwind CSS |
| Backend | Python, FastAPI, Pandas, Pydantic |
| Data | KNIME-cleaned CSV (10,000 records, 36 columns) |
| Visualization | Tableau Desktop, Recharts |
| Testing | Pytest |

---

## Repository Structure

```
TourismLens/
├── backend/
│   ├── app/
│   │   ├── api/            # REST endpoints
│   │   ├── schemas/        # Pydantic models
│   │   ├── services/       # Business logic
│   │   └── main.py
│   ├── data/
│   │   └── tourism_cleaned.csv
│   ├── tests/
│   │   └── test_backend.py
│   └── requirements.txt
│
└── frontend/
    ├── app/                # Next.js App Router (11 pages)
    ├── components/         # Navbar, Footer, cards
    ├── lib/                # API client
    └── package.json
```

---

## Getting Started

**Prerequisites:** Python 3.10+, Node.js 18+

### Backend (Port 8000)

```bash
cd backend
pip install -r requirements.txt
python -m uvicorn app.main:app --host 127.0.0.1 --port 8000 --reload
```

API documentation available at `http://127.0.0.1:8000/docs`

### Frontend (Port 3000)

```bash
cd frontend
npm install
npm run dev
```

Application available at `http://localhost:3000`

### Running Tests

```bash
cd backend
pytest tests/test_backend.py
```

---

## API Reference

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/overview` | Dataset summary statistics |
| GET | `/api/destinations` | All destination profiles |
| GET | `/api/destinations/{id}` | Single destination detail |
| POST | `/api/recommendations` | Preference-based matching |
| GET | `/api/sustainability` | Emission data by transport mode |

---

## Notes

All recommendations are computed deterministically from historical trip data — no black-box models. Derived metrics (`repeat_visitor_flag`, `recommend_flag`, `satisfaction_score`) follow fixed, documented formulas. The KNIME preprocessing pipeline is fully reproducible from the raw CSV.
