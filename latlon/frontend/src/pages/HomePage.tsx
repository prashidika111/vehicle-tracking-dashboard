import { useState } from "react";
import { Header } from "../components/Header";
import { LiveIndicator } from "../components/LiveIndicator";
import { MapView } from "../components/MapView";
import { VehicleSidebar } from "../components/VehicleSidebar";
import { useVehicleSocket } from "../hooks/useVehicleSocket";
import type { VehiclePosition } from "../types/vehicle";

export default function HomePage() {
  const [tracingVehicle, setTracingVehicle] = useState("");
  const { vehicles, isConnected, date, vehicleHistory } =
    useVehicleSocket(tracingVehicle);
  const [selectedVehicle, setSelectedVehicle] =
    useState<VehiclePosition | null>(null);
  const [hoveredVehicle, setHoveredVehicle] =
    useState<VehiclePosition | null>(null);
  return (
    <div
      className="
        h-[72vh]
        rounded-3xl
        border
        border-slate-800
        bg-slate-950/80
        shadow-glow
        shadow-slate-900/60
      "
    >
      <Header />
      <p
        className="
          mb-4
          text-sm
          text-slate-400
        "
      >
        {date.toISOString().split(".")[0] + "Z"}
      </p>
      <div className="mt-4 mb-4">
        <LiveIndicator connected={isConnected} />
      </div>
      <div
        className="
          grid
          grid-cols-[300px_1fr]
          gap-4
          h-[75vh]
        "
      >
        <VehicleSidebar
          vehicles={vehicles}
          selectedVehicle={selectedVehicle}
          hoveredVehicle={hoveredVehicle}
          setSelectedVehicle={setSelectedVehicle}
          setTracingVehicle={setTracingVehicle}
        />
        <MapView
          vehicles={vehicles}
          selectedVehicle={selectedVehicle}
          vehicleHistory={vehicleHistory}
        />
      </div>
    </div>
  );
}
