import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// ✅ 📍 Slightly Smaller Pin (35px)
const pinIcon = L.divIcon({
  className: "",
  html: '<div style="font-size: 35px;">📍</div>', // Reduced size
  iconSize: [35, 35], // Smaller pin
  iconAnchor: [17, 35], // Adjust anchor so it points correctly
});

const OpenMicMap = ({ mics }) => {
  return (
    <MapContainer
      center={[40.7259, -73.9953]} // ✅ Focus on Lower Manhattan & Brooklyn
      zoom={14} // ✅ Slightly more zoomed out
      style={{ height: "500px", width: "100%" }}
    >
      {/* 🗺 Cleaner, Minimalistic Map */}
      <TileLayer
        url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        attribution='&copy; <a href="https://carto.com/">CARTO</a> contributors'
      />

      {/* 📍 Open Mics with Smaller Pin */}
      {mics.map((mic, index) => (
        <Marker
          key={index}
          position={[mic.latitude, mic.longitude]}
          icon={pinIcon}
        >
          <Popup>
            <strong>{mic.name}</strong>
            <br />
            📍 {mic.location}
            <br />
            🏙 {mic.borough}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default OpenMicMap;
