import React, { useEffect } from "react";
import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// 🎨 Very Dark Purple Default Marker
const defaultIcon = L.divIcon({
  className: "custom-marker",
  html: `<div style="
    width: 16px; height: 16px; 
    background-color: #2E1A47; 
    border-radius: 50%; 
    box-shadow: 0 0 8px rgba(46, 26, 71, 0.6);"></div>`,
  iconSize: [16, 16],
  iconAnchor: [8, 8],
});

// 🎨 Selected Marker (Brighter Purple)
const selectedIcon = L.divIcon({
  className: "custom-marker",
  html: `<div style="
    width: 20px; height: 20px; 
    background-color: #7D5FFF; 
    border-radius: 50%; 
    box-shadow: 0 0 15px rgba(125, 95, 255, 0.8);"></div>`,
  iconSize: [20, 20],
  iconAnchor: [10, 10],
});

// 📍 Pan to Selected Mic
const MapFocus = ({ selectedMic }) => {
  const map = useMap();
  useEffect(() => {
    if (selectedMic) {
      map.flyTo([selectedMic.latitude, selectedMic.longitude], 15);
    }
  }, [selectedMic, map]);
  return null;
};

const OpenMicMap = ({ mics, selectedMic, setSelectedMic }) => {
  return (
    <MapContainer
      center={[40.7259, -73.9953]}
      zoom={14}
      style={{ height: "100%", width: "100%", borderRadius: "16px", overflow: "hidden" }}
      className="rounded-2xl"
    >
      <TileLayer
        url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        attribution='&copy; <a href="https://carto.com/">CARTO</a> contributors'
      />

      {/* Pan to Selected Mic */}
      <MapFocus selectedMic={selectedMic} />

      {/* 📍 Click Marker to Select in Sidebar */}
      {mics.map((mic) => (
        <Marker
          key={mic.id}
          position={[mic.latitude, mic.longitude]}
          icon={selectedMic?.id === mic.id ? selectedIcon : defaultIcon}
          eventHandlers={{
            click: () => setSelectedMic(mic), // Select mic in sidebar
          }}
        />
      ))}
    </MapContainer>
  );
};

export default OpenMicMap;
