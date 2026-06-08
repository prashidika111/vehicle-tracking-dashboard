# Realtime Vehicle Tracker Frontend

This project is a beginner-friendly React + TypeScript + Vite frontend that connects to a Socket.IO backend and shows live moving vehicles on a fullscreen map.

## Local Setup

1. Open a terminal in `frontend/`
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the app:
   ```bash
   npm run dev
   ```
4. Keep the backend running from the repository root:
   ```bash
   npm start
   ```

## What this frontend does

- Connects to `http://localhost:8080` using Socket.IO Client
- Listens for `position` events
- Stores realtime vehicle positions in a typed object map
- Renders markers with React Leaflet
- Shows a live connection indicator and latest vehicle updates

## Folder structure

- `src/components` - reusable UI and page components
- `src/hooks` - socket hooks with realtime state logic
- `src/lib` - socket connection helpers and utility helpers
- `src/types` - TypeScript interfaces for backend payloads
