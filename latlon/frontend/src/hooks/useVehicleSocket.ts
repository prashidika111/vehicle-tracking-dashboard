import { useEffect, useRef, useState } from "react";
import type { VehiclePosition } from "../types/vehicle";
import { createVehicleSocket } from "../lib/socket";

export function useVehicleSocket(tracingVehicle: string) {
  const [vehicles, setVehicles] = useState<VehiclePosition[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  const [date, setDate] = useState(new Date());
  const [vehicleHistory, setVehicleHistory] = useState<
    Record<string, VehiclePosition[]>
  >({});
  useEffect(() => {
    setVehicleHistory({});
  }, [tracingVehicle]);
  const buffer = useRef<VehiclePosition[]>([]);
  useEffect(() => {
    const socket = createVehicleSocket();
    socket.on("connect", () => {
      setIsConnected(true);
    });
    socket.on("disconnect", () => {
      setIsConnected(false);
    });
    socket.on("position", (position: VehiclePosition) => {
      buffer.current.push(position);
    });
    const interval = setInterval(() => {
      if (buffer.current.length > 0) {
        const bufferCopy = [...buffer.current];
        buffer.current = [];
        setVehicles((currentVehicles) => {
          const updatedVehicles = [...currentVehicles];
          for (let i = 0; i < bufferCopy.length; i++) {
            const newVehicle = bufferCopy[i];
            const index = updatedVehicles.findIndex(
              (vehicle) => vehicle.vehicleCode === newVehicle.vehicleCode,
            );
            if (index !== -1) {
              updatedVehicles[index] = newVehicle;
            } else {
              updatedVehicles.push(newVehicle);
            }
            if (newVehicle.vehicleCode === tracingVehicle) {
              setVehicleHistory((currentHistory) => ({
                ...currentHistory,

                [tracingVehicle]: [
                  ...(currentHistory[tracingVehicle] || []),

                  newVehicle,
                ],
              }));
            }
          }

          return updatedVehicles;
        });

        setDate(new Date());
      }
    }, 2000);

    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.off("position");
      socket.close();
      clearInterval(interval);
    };
  }, [tracingVehicle]);

  return {
    vehicles,
    isConnected,
    date,
    vehicleHistory,
  };
}
