"use client";
import L, { LatLngExpression } from "leaflet";
import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";

import "leaflet/dist/leaflet.css";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

// @ts-ignore
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x.src,
  iconUrl: markerIcon.src,
  shadowUrl: markerShadow.src,
});

interface MapProps {
  center?: number[];
}

function SetViewOnClick({ center }: { center: LatLngExpression }) {
  const map = useMap();
  if (typeof map === "undefined" || typeof center === "undefined") return null;
  map.setView(center, map.getZoom());

  return null;
}

const Map: React.FC<MapProps> = ({ center }) => {
  return (
    <MapContainer
      center={(center as LatLngExpression) || [0, 0]}
      zoom={center ? 10 : 2}
      scrollWheelZoom={true}
      className="h-[35vh] rounded-lg"
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {center && <Marker position={center as L.LatLngExpression} />}
      <SetViewOnClick center={center as LatLngExpression} />
    </MapContainer>
  );
};

export default Map;
