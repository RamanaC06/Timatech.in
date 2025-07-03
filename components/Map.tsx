"use client";
import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Define the path to your favicon.ico
const customIcon = new L.Icon({
  iconUrl: "/Tima Logo.png", // Path to your favicon.ico in the public folder
  iconSize: [32, 32], // Size of the icon
  iconAnchor: [16, 32], // Anchor point of the icon
  popupAnchor: [0, -32], // Point from which the popup opens relative to the iconAnchor
});

// Define props for the Map component
interface MapProps {
  className?: string; // Optional className prop
}

const Map: React.FC<MapProps> = ({ className }) => {
  // TIMA Tech coordinates
  const timaPosition: [number, number] = [9.907, 78.106]; // [latitude, longitude]

  return (
    <div className={`relative ${className}`}>
      <MapContainer
        center={timaPosition} // Center the map
        zoom={15} // Adjust zoom level for better visibility
        style={{ height: "500px", width: "100%" }}
        scrollWheelZoom={false}
        className="rounded-lg shadow-lg"
      >
        {/* OpenStreetMap Tile Layer */}
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        {/* Marker with Custom Icon */}
        <Marker position={timaPosition} icon={customIcon}>
          <Popup>
          <strong>TIMA Company</strong>
<br />
9°54&apos;25.1&quot;N 78°06&apos;21.6&quot;E
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default Map;
