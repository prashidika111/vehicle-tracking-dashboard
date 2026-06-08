import { io } from "socket.io-client";
export function createVehicleSocket() 
{
  const socket = io(
    "http://localhost:8080"
  );
  return socket;
}