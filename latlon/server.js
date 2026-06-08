const http = require("http");
const { Server } = require("socket.io");

const PORT = process.env.PORT || 8080;

const VEHICLE_CODES = [
  "VH-001",
  "VH-002",
  "VH-003",
  "VH-004",
  "VH-005",
  "VH-006",
  "VH-007",
  "VH-008",
  "VH-009",
  "VH-010"
];

const BASE_LAT = 27.7172;
const BASE_LON = 85.324;

const vehicles = VEHICLE_CODES.map((code, index) => {
  return {
    vehicleCode: code,
    lat: BASE_LAT + index * 0.001,
    lon: BASE_LON + index * 0.001
  };
});

function nextCoordinate(value) {
  const delta = Math.abs((Math.random() - 0.5) * 0.0048);
  return Number((value + delta).toFixed(6));
}

function nextVehiclePosition(vehicle) {
  vehicle.lat = nextCoordinate(vehicle.lat);
  vehicle.lon = nextCoordinate(vehicle.lon);

  return {
    vehicleCode: vehicle.vehicleCode,
    lat: vehicle.lat,
    lon: vehicle.lon,
    timestamp: new Date().toISOString()
  };
}

const server = http.createServer();
const io = new Server(server, {
  cors: {
    origin: "*"
  }
});

io.on("connection", (socket) => {

  console.log(
    `Client connected: ${socket.id}`
  );
  for (const vehicle of vehicles) {

    socket.emit(
      "position",
      {
        vehicleCode: vehicle.vehicleCode,
        lat: vehicle.lat,
        lon: vehicle.lon,
        timestamp: new Date().toISOString()
      }
    );

  }

  socket.on("disconnect", () => {

    console.log(
      `Client disconnected: ${socket.id}`
    );

  });

});

setInterval(() => {
  for (const vehicle of vehicles) {
    io.emit("position", nextVehiclePosition(vehicle));
  }
}, 1000);

server.listen(PORT, () => {
  console.log(`Socket.IO server running on http://localhost:${PORT}`);
});
