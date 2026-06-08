import type { VehiclePosition } from "../types/vehicle";
interface VehicleSidebarProps {
  vehicles: VehiclePosition[];
  selectedVehicle: VehiclePosition | null;
  setSelectedVehicle: React.Dispatch<
    React.SetStateAction<VehiclePosition | null>
  >;
  setTracingVehicle: React.Dispatch<React.SetStateAction<string>>;
  hoveredVehicle: VehiclePosition | null;
}

export function VehicleSidebar({
  vehicles,
  selectedVehicle,
  setSelectedVehicle,
  setTracingVehicle,
  hoveredVehicle,
}: VehicleSidebarProps) {
  return (
    <div
      className="
        rounded-3xl
        bg-slate-900
        p-4
        text-white
        overflow-y-auto       
      "
    >
      <h2
        className="
          text-xl
          font-bold
          mb-4
        "
      >
        Vehicles
      </h2>
      <div
        className="
          flex
          flex-col
          gap-3
        "
      >
        {vehicles.map((vehicle) => (
          <div
            key={vehicle.vehicleCode}
            onClick={() => {
              setSelectedVehicle(vehicle);
              setTracingVehicle(vehicle.vehicleCode);
            }}
            className={`
              rounded-2xl
              p-3
              cursor-pointer
              transition
              ${
                selectedVehicle?.vehicleCode === vehicle.vehicleCode || hoveredVehicle?.vehicleCode === vehicle.vehicleCode
                  ? "bg-sky-700"
                  : "bg-slate-800 hover:bg-slate-700"
              }
            `}
          >
            <h3
              className="
                font-semibold
                text-sky-400
              "
            >
              {vehicle.vehicleCode}
            </h3>
            <p className="text-sm">Latitude: {vehicle.lat.toFixed(5)}</p>
            <p className="text-sm">Longitude: {vehicle.lon.toFixed(5)}</p>
            <p
              className="
                text-xs
                text-slate-400
                mt-2
              "
            >
              {vehicle.timestamp.split(".")[0] + "Z"}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
