# Calculator Service

A RESTful calculator microservice implementing basic arithmetic operations as pure stateless functions (ADR-001).

## Endpoints

- `GET /health` – Health check
- `GET /api/add?a={num1}&b={num2}` – Addition
- `GET /api/subtract?a={num1}&b={num2}` – Subtraction
- `GET /api/multiply?a={num1}&b={num2}` – Multiplication
- `GET /api/divide?a={num1}&b={num2}` – Division

All endpoints return JSON: `{ "result": <number> }` or `{ "error": "message" }` on failure.

## Run

```bash
npm install
npm start
```

Service runs on port 3001 by default (override with `PORT` env variable).

## Test

```bash
npm test
```
