import { useEffect, useMemo, useRef, useState } from "react";

import Map, {
  Marker,
  NavigationControl,
  Source,
  Layer,
  Popup,
} from "react-map-gl/maplibre";

import type { MapRef } from "react-map-gl/maplibre";
import "maplibre-gl/dist/maplibre-gl.css";
import type { VehiclePosition } from "../types/vehicle";

interface MapViewProps {
  vehicles: VehiclePosition[];
  selectedVehicle: VehiclePosition | null;
  vehicleHistory: Record<string, VehiclePosition[]>;
}

export function MapView({
  vehicles,
  selectedVehicle,
  vehicleHistory,
}: MapViewProps) {
  const mapRef = useRef<MapRef | null>(null);
  const hasInitiallyFocused = useRef(false);
  const [hoveredVehicle, setHoveredVehicle] = useState<VehiclePosition | null>(
    null,
  );
  useEffect(() => {
    if (selectedVehicle && mapRef.current) {
      mapRef.current.flyTo({
        center: [selectedVehicle.lon, selectedVehicle.lat],
        zoom: 12,
        duration: 2000,
      });
    }
  }, [selectedVehicle]);
  useEffect(() => {
    if (vehicles.length > 0 && mapRef.current && !hasInitiallyFocused.current) {
      let minLat = vehicles[0].lat;
      let maxLat = vehicles[0].lat;
      let minLon = vehicles[0].lon;
      let maxLon = vehicles[0].lon;

      for (let i = 0; i < vehicles.length; i++) {
        const vehicle = vehicles[i];

        if (vehicle.lat < minLat) 
        {
          minLat = vehicle.lat;
        }
        if (vehicle.lat > maxLat) 
        {
          maxLat = vehicle.lat;
        }
        if (vehicle.lon < minLon) 
        {
          minLon = vehicle.lon;
        }
        if (vehicle.lon > maxLon) 
        {
          maxLon = vehicle.lon;
        }
      }

      mapRef.current.fitBounds(
        [
          [minLon, minLat],
          [maxLon, maxLat],
        ],
        {
          padding: 100,
          duration: 2000,
        },
      );

      hasInitiallyFocused.current = true;
    }
  }, [vehicles]);

  const pathCoordinates = useMemo(() => {
    if (!selectedVehicle) {
      return [];
    }

    const history = vehicleHistory[selectedVehicle.vehicleCode] || [];
    return history.map((vehicle) => [vehicle.lon, vehicle.lat]);
  }, [selectedVehicle, vehicleHistory]);

  const pathGeoJson = {
    type: "Feature" as const,
    properties: {},
    geometry: {
      type: "LineString" as const,
      coordinates: pathCoordinates,
    },
  };

  return (
    <Map
      ref={mapRef}
      initialViewState={{
        latitude: 27.7172,
        longitude: 85.324,
        zoom: 16,
      }}
      style={{
        width: "100%",
        height: "100%",
      }}
      mapStyle="https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json"
      dragPan={true}
      scrollZoom={true}
      doubleClickZoom={true}
      touchZoomRotate={true}
      cursor="grab"
    >
      <NavigationControl position="top-right" />

      {hoveredVehicle && (
        <Popup
          latitude={hoveredVehicle.lat}
          longitude={hoveredVehicle.lon}
          anchor="top"
          width="40px"
          height="40px"
          closeOnClick={false}
          closeOnMove={false}
          className="text-black text-sm font-medium"
        >
          <div>
            <p className="text-black text-sm font-medium">
              {hoveredVehicle.vehicleCode}
            </p>
            <p className="text-black text-sm font-medium">
              Lat: {hoveredVehicle.lat.toFixed(5)}
            </p>
            <p className="text-black text-sm font-medium">
              Lon: {hoveredVehicle.lon.toFixed(5)}
            </p>
            <p className="text-black text-sm font-medium">
              {hoveredVehicle.timestamp.split(".")[0] + "Z"}
            </p>
          </div>
        </Popup>
      )}
      {selectedVehicle && (
        <Popup
          latitude={
            vehicles.find((vehicle) => vehicle.vehicleCode === selectedVehicle.vehicleCode)?.lat || 0
          }
          longitude={
            vehicles.find((vehicle) => vehicle.vehicleCode === selectedVehicle.vehicleCode)?.lon || 0
          }
          anchor="top"
          width="40px"
          height="40px"
        >
          <div>
            <p className="text-black text-sm font-medium">
              {vehicles.find((vehicle) => vehicle.vehicleCode === selectedVehicle.vehicleCode)?.vehicleCode}
            </p>
            <p className="text-black text-sm font-medium">
              Lat: {vehicles.find((vehicle) => vehicle.vehicleCode === selectedVehicle.vehicleCode)?.lat.toFixed(5)}
            </p>
            <p className="text-black text-sm font-medium">
              Lon: {vehicles.find((vehicle) => vehicle.vehicleCode === selectedVehicle.vehicleCode)?.lon.toFixed(5)}
            </p>
            <p className="text-black text-sm font-medium">
              {selectedVehicle.timestamp.split(".")[0] + "Z"}
            </p>
          </div>
        </Popup>
      )}

      {selectedVehicle && pathCoordinates.length > 1 && (
        <Source id="path" type="geojson" data={pathGeoJson}>
          <Layer
            id="path-line"
            type="line"
            paint={{
              "line-color": "#38bdf8",
              "line-width": 4,
            }}
          />
        </Source>
      )}

      {vehicles.map((vehicle) => (
        <Marker
          key={vehicle.vehicleCode}
          latitude={vehicle.lat}
          longitude={vehicle.lon}
        >
          <div
            onMouseEnter={() => {
              setHoveredVehicle(vehicle);
            }}
            onMouseLeave={() => {
              setHoveredVehicle(null);
            }}
            className="
              flex
              items-center
              justify-center
              h-10
              w-10
              rounded-full
              bg-sky-500
              text-white
              text-xs
              font-bold
              border-2
              border-white
            "
          >
            {vehicle.vehicleCode.slice(-2)}
          </div>
        </Marker>
      ))}
    </Map>
  );
}