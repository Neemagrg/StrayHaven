import { MapContainer, TileLayer, Marker, Popup, useMapEvents, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useState, useEffect } from "react";
import L from "leaflet";

// Fix for default Leaflet icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
});

// 1. Smooth Animation Component
function ChangeView({ center }) {
  const map = useMap();
  useEffect(() => {
    if (center) {
      map.flyTo(center, 15, { duration: 1.5 }); // Smoothly glides to the spot
    }
  }, [center, map]);
  return null;
}

// 2. Click Handler with Marker
function LocationMarker({ setLocation, position, setPosition }) {
  useMapEvents({
    click(e) {
      setPosition(e.latlng);
      setLocation(e.latlng);
    },
  });

  return position ? (
    <Marker position={position}>
      <Popup>
        <div style={{ textAlign: 'center' }}>
          <strong>Pet Found Here!</strong><br />
          Rescue team notified.
        </div>
      </Popup>
    </Marker>
  ) : null;
}

export default function MapComponent({ setLocation }) {
  const [position, setPosition] = useState(null);
  const defaultCenter = [27.7172, 85.3240]; // Kathmandu

  return (
    <div style={{ position: 'relative', borderRadius: '15px', overflow: 'hidden', border: '4px solid #eff6ff' }}>
      
      {/* UI Overlay: Status Bar */}
      <div style={{
        position: 'absolute',
        top: '15px',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 1000,
        background: 'rgba(255, 255, 255, 0.9)',
        padding: '8px 20px',
        borderRadius: '30px',
        boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        border: '1px solid #2563eb'
      }}>
        <span style={{ color: '#2563eb', fontWeight: 'bold' }}>📍 Click to mark pet location</span>
      </div>

      <MapContainer
        center={defaultCenter}
        zoom={13}
        style={{ height: "500px", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        <ChangeView center={position} />
        
        <LocationMarker 
          setLocation={setLocation} 
          position={position} 
          setPosition={setPosition} 
        />
      </MapContainer>

      {/* Modern Bluish Footer for Map */}
      <div style={{
        background: '#2563eb',
        color: 'white',
        padding: '10px',
        textAlign: 'center',
        fontSize: '14px',
        fontWeight: '500'
      }}>
        {position 
          ? `Selected: ${position.lat.toFixed(4)}, ${position.lng.toFixed(4)}` 
          : "No location selected yet"}
      </div>
    </div>
  );
}