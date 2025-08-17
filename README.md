# cmoDataPretty (aka CMO Data Pretty Viewer)

`cmoDataPretty` is a clean, component-based web application for visualizing **Ginnie Mae** data. Built with a modular architecture separating frontend components, backend APIs, and a data source layer, it showcases custom REST endpoints to deliver processed mortgage data in a well-organized UI.

---

## Features

* **Separated UI and data logic** — Frontend components fetch JSON from custom API endpoints, ensuring leaner and decoupled layers.
* **Custom APIs** — Backend routes to ingest, process, and serve Ginnie Mae-specific data (e.g., MBS pools, issuances, performance metrics).
* **Component-driven UI** — Clean organization of display elements, data tables, charts, filters.
* **(Optional) Heroku–ready** — Configured for cloud deployment, including `Procfile`, environment variables, and build specs.

