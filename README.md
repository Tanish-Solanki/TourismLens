# 🌍 TourismLens — Global Tourism Trends & Destination Insights

> **Innovative Assignment** | Data Analysis & Visualization (DAV)
> **Institution:** Nirma University (2026)
> **Architecture:** Full-Stack Decision Support System · Next.js + FastAPI

---

## 📌 Overview

**TourismLens** is an academic, data-driven decision-support platform that transforms **10,000 global trip records (2019–2024)** into actionable destination benchmarks, preference-based matching, trip cost & carbon footprint estimations, and sustainability insights.

Built with deterministic, rule-based empirical data processing — zero black-box ML bias.

---

## 🚀 Application Pages (11 Modules)

| # | Route | Description |
|---|-------|-------------|
| 1 | `/` | Home — project overview & dataset metric counters |
| 2 | `/find-destination` | Preference filter matching engine |
| 3 | `/explore` | Grid of 20 destination profiles with multi-criteria filtering |
| 4 | `/explore/[id]` | 5-dimension destination profile & trend charts |
| 5 | `/compare` | Side-by-side benchmarking for 2–3 destinations |
| 6 | `/trip-analyzer` | Budget & CO₂ estimator by transport mode |
| 7 | `/sustainability` | Environmental footprint analysis by travel mode |
| 8 | `/analytics` | Embedded Tableau visual analytics (8 worksheets) |
| 9 | `/insights` | Statistical & correlation findings |
| 10 | `/data-explorer` | Paginated dataset grid with CSV export |
| 11 | `/methodology` | Academic pipeline specs & KNIME workflow |

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | Next.js 16, React, TypeScript, Tailwind CSS |
| **Backend** | Python, FastAPI, Pandas, Pydantic |
| **Data** | KNIME-cleaned CSV (10,000 records, 36 columns) |
| **Visualization** | Tableau Desktop (`.twbx`), Recharts |
| **Testing** | Pytest (backend unit tests) |

---

## 📁 Repository Structure

```
TourismLens/
├── backend/                    # FastAPI Python Application
│   ├── app/
│   │   ├── api/                # REST Endpoints
│   │   │   ├── destinations.py
│   │   │   ├── overview.py
│   │   │   ├── recommendations.py
│   │   │   └── sustainability.py
│   │   ├── schemas/            # Pydantic Request/Response Models
│   │   ├── services/           # DataService, MatchService, TripAnalyzer
│   │   └── main.py             # FastAPI Server Entrypoint
│   ├── data/
│   │   └── tourism_cleaned.csv # Cleaned Dataset (10,000 records)
│   ├── tests/
│   │   └── test_backend.py     # Pytest Verification Suite
│   └── requirements.txt
│
└── frontend/                   # Next.js Application
    ├── app/                    # App Router (11 Pages)
    ├── components/             # Navbar, Footer, MetricCard, DestinationCard
    ├── lib/                    # API Client
    ├── public/                 # Static Assets
    └── package.json
```

---

## ⚡ Quick Start

### Prerequisites
- **Python** 3.10+
- **Node.js** 18+

### 1️⃣ Start FastAPI Backend (Port 8000)

```bash
cd backend
pip install -r requirements.txt
python -m uvicorn app.main:app --host 127.0.0.1 --port 8000 --reload
```

📖 Swagger Docs: [http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs)

### 2️⃣ Start Next.js Frontend (Port 3000)

```bash
cd frontend
npm install
npm run dev
```

🌐 Application: [http://localhost:3000](http://localhost:3000)

### 3️⃣ Run Backend Tests

```bash
cd backend
pytest tests/test_backend.py
```

---

## 📡 Key API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/overview` | Dataset summary statistics |
| `GET` | `/api/destinations` | All destination profiles |
| `GET` | `/api/destinations/{id}` | Single destination details |
| `POST` | `/api/recommendations` | Preference-based matching |
| `GET` | `/api/sustainability` | Emission data by transport mode |

---

## 📊 Academic Standards

- ✅ **Zero Black-Box Bias** — All recommendations are deterministic from real historical data
- ✅ **Derived Metrics Transparency** — Standardized formulas for `repeat_visitor_flag`, `recommend_flag`, `satisfaction_score`
- ✅ **Reproducibility** — KNIME pipeline fully repeatable; open backend services
- ✅ **Dataset Provenance** — Raw & cleaned CSVs with documented transformation steps

---

## 👨‍💻 Author

**Tanish Solanki** — Nirma University, Sem 5 · Data Analysis & Visualization (DAV)
