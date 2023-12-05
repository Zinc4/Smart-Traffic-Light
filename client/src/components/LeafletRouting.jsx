import { useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet-routing-machine";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import { useEffect } from "react";
import { useGeolocation } from "../hooks/useGeolocation";

function LeafletRouting({ position, endPosition, geoLocationPosition }) {
  const map = useMap();

  useEffect(() => {
    if (!map) return;

    const routingControl = L.Routing.control({
      waypoints: [
        L.latLng(position),
        L.latLng(geoLocationPosition ? endPosition : null),
      ],
      routeWhileDragging: false,
      draggableWaypoints: false,
      fitSelectedRoutes: true,
      showAlternatives: true,

      geocoder: L.Control.Geocoder.nominatim(),
    }).addTo(map);

    return () => map.removeControl(routingControl);
  }, [map, position, endPosition, geoLocationPosition]);

  return null;
}

export default LeafletRouting;
