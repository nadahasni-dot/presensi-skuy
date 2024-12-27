import React from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";
import { LatLng } from "leaflet";
import { defaultLatLng } from "../Form/form-config";

interface MapEventsHandlerProps {
  onChangeLocation: (latlng: LatLng) => void;
}

function MapEventsHandler({ onChangeLocation }: MapEventsHandlerProps) {
  const map = useMapEvents({
    click: (e) => {
      onChangeLocation(e.latlng);
      map.flyTo(e.latlng, map.getZoom());
    },
    locationfound: (e) => {
      onChangeLocation(e.latlng);
      map.flyTo(e.latlng, map.getZoom());
    },
  });

  return null;
}

interface MapViewProps {
  onPositionChange: (latlng: LatLng) => void;
}

export default function MapView({ onPositionChange }: Readonly<MapViewProps>) {
  const [position, setPosition] = React.useState<LatLng>(defaultLatLng);

  const handlePositionChange = (latlng: LatLng) => {
    setPosition(latlng);
    onPositionChange(latlng);
  };

  return (
    <MapContainer
      className="h-72 w-full z-10"
      center={position}
      zoom={17}
      scrollWheelZoom={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={position}>
        <Popup>
          Your selected location <br /> click on the map to change location
        </Popup>
      </Marker>
      <MapEventsHandler onChangeLocation={handlePositionChange} />
    </MapContainer>
  );
}
