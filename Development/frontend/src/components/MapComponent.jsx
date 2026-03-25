import { MapContainer, Marker, Popup, TileLayer, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

function ClickHandler({ setLocation }) {
  useMapEvents({
    click(e) {
      setLocation({ lat: e.latlng.lat, lng: e.latlng.lng });
    },
  });
  return null;
}

function LocationMarker({ selectedLocation }) {
  if (!selectedLocation) return null;
  return (
    <Marker position={[selectedLocation.lat, selectedLocation.lng]}>
      <Popup>
        Rescue pin dropped
        <br />
        {selectedLocation.lat.toFixed(4)}, {selectedLocation.lng.toFixed(4)}
      </Popup>
    </Marker>
  );
}

export default function MapComponent({
  setLocation,
  selectedLocation,
  targetLocation = { lat: 27.7172, lng: 85.3240 },
}) {
  return (
    <MapContainer
      center={[targetLocation.lat, targetLocation.lng]}
      zoom={13}
      style={{ height: "100%", width: "100%" }}
      scrollWheelZoom
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <ClickHandler setLocation={setLocation} />
      <LocationMarker selectedLocation={selectedLocation} />
    </MapContainer>
  );
}
