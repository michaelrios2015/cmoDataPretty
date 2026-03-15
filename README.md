# CMO Data Viewer

A full-stack web application for visualizing Ginnie Mae mortgage-backed securities (MBS) pool data. Built with React/Redux on the frontend, a Node.js/Express REST API layer, and a PostgreSQL database — updated on a live business-day schedule.

**Live app:** https://cmo-data-two.herokuapp.com/#/  
**Data pipeline repo:** https://github.com/michaelrios2015/capstone_test

---

## What it does

Ginnie Mae publishes raw MBS pool data on a rolling business-day schedule. This application takes that data — after it has been downloaded, parsed, and processed by the data pipeline — and presents it in a clean, queryable web interface.

Users can browse pool-level metrics, filter by date and issuer, and view calculated performance data including CPR speeds and issuance figures. The data is refreshed multiple times per month as new Ginnie Mae files are released.

---

## Architecture

```
Frontend (React/Redux)
    ↓  HTTP requests
REST API (Node.js / Express)
    ↓  SQL queries
PostgreSQL Database
    ↑  populated by
Data Pipeline (see capstone_test repo)
```

The application follows a strict separation of concerns:

- **`src/`** — React components, Redux store, and API call logic
- **`server/`** — Express routes and database query functions
- **`data/`** — Static reference data used by the frontend
- **`dist/`** — Webpack build output

---

## Tech stack

| Layer       | Technology                          |
| ----------- | ----------------------------------- |
| Frontend    | React, Redux                        |
| Backend     | Node.js, Express                    |
| Database    | PostgreSQL                          |
| Build tool  | Webpack                             |
| Data source | Ginnie Mae (via automated pipeline) |

---

## Note on running locally

This application depends on a PostgreSQL database populated by the data pipeline, including stored procedures that handle core calculations. The full database is not included in this repository. The best way to see the application in action is the [live app](https://cmo-data-two.herokuapp.com/#/).

---

## Related

- [ginnie-mae-data-pipeline](https://github.com/michaelrios2015/capstone_test) — the Python pipeline that downloads, parses, and loads the underlying data
