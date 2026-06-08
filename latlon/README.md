# latlon

This repository includes:

- A Socket.IO backend server in the root folder
- A beginner-friendly React + TypeScript frontend in `frontend/`

## Backend

The Socket.IO backend server emits realtime vehicle positions on port `8080`.

Run the backend:

```bash
npm install
npm start
```

The backend emits the following event:

- Event name: `position`

Payload structure:

```json
{
  "vehicleCode": "VH-001",
  "lat": 27.717392,
  "lon": 85.324104,
  "timestamp": "2026-05-21T04:10:00.000Z"
}
```

## Frontend

The frontend is inside `frontend/`. It connects to `http://localhost:8080` and renders live markers on a fullscreen map.

Run the frontend:

```bash
cd frontend
npm install
npm run dev
```

Open the local Vite URL in your browser to see the dashboard.
