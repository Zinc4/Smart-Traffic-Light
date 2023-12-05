import {
  MapContainer,
  Marker,
  TileLayer,
  useMap,
  useMapEvent,
} from "react-leaflet";
import "leaflet-control-geocoder/dist/Control.Geocoder.css";
import "leaflet-control-geocoder/dist/Control.Geocoder.js";
import styles from "./Map.module.css";
import LeafletRouting from "./LeafletRouting";
import { useEffect, useState } from "react";
import { useGeolocation } from "../hooks/useGeolocation";
import { Button, Modal } from "@mantine/core";
import L from "leaflet";
import iconUrl from "../assets/tf.png";
import { useUrlPosition } from "../hooks/useUrlPosition";
import { useDisclosure } from "@mantine/hooks";
import axios from "axios";

function Map() {
  const [mapPosition, setMapPosition] = useState([-7.250445, 112.768845]);
  const [mapEnd, setMapEnd] = useState([]);
  const [opened, { open, close }] = useDisclosure(false);
  const [selectedTf, setSelectedTf] = useState(null);
  const [trafficlights, setTrafficLights] = useState([]);

  const {
    isLoading: isLoadingPosition,
    position: geoLocationPosition,
    getPosition,
  } = useGeolocation();

  const [mapLat, mapLng] = useUrlPosition();

  useEffect(() => {
    if (geoLocationPosition)
      setMapPosition([geoLocationPosition.lat, geoLocationPosition.lng]);
    console.log(geoLocationPosition);
  }, [geoLocationPosition]);

  useEffect(() => {
    if (mapLat && mapLng && geoLocationPosition) {
      setMapEnd([mapLat, mapLng]);
    }
  }, [mapLat, mapLng, geoLocationPosition]);

  const newIcon = new L.Icon({
    iconUrl,
    iconAnchor: [5, 55],
    popupAnchor: [10, -44],
    iconSize: [45, 55],
  });

  useEffect(() => {
    const fetchTrafficLights = async () => {
      axios
        .get("http://localhost:4000/api/trafficlights")
        .then((res) => {
          setTrafficLights(res.data);
        })
        .catch((err) => {
          console.log(err.message);
        });
    };
    fetchTrafficLights();
  }, []);

  function handleSelecting(tf) {
    setSelectedTf((cur) => (cur?._id === tf._id ? null : tf));
    open();
  }

  return (
    <div className={styles.mapContainer}>
      {!geoLocationPosition && (
        <Button
          variant="filled"
          onClick={getPosition}
          className={styles.button}
          pos="absolute"
        >
          {isLoadingPosition ? "Loading..." : "Use Your Position"}
        </Button>
      )}
      <MapContainer
        center={mapPosition}
        zoom={20}
        scrollWheelZoom={true}
        className={styles.map}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={mapPosition}>
          {/* <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup> */}
        </Marker>

        {trafficlights.map((trafficlight) => (
          <>
            <Marker
              key={trafficlight._id}
              position={[trafficlight.position.lat, trafficlight.position.lng]}
              icon={newIcon}
              eventHandlers={{
                click: () => handleSelecting(trafficlight),
              }}
            >
              {selectedTf && (
                <Modal
                  key={selectedTf._id}
                  opened={opened}
                  onClose={close}
                  title="Traffic Light Configuration"
                  style={{ zIndex: 1000, position: "absolute" }}
                  centered
                  withOverlay={false}
                >
                  {selectedTf.name}
                </Modal>
              )}
            </Marker>
          </>
        ))}

        <LeafletRouting
          position={mapPosition}
          endPosition={mapEnd}
          geoLocationPosition={geoLocationPosition}
        />
        {selectedTf ? null : <ChangeCenter position={mapPosition} />}
        {/* <DetectClick /> */}
      </MapContainer>
    </div>
  );
}

function ChangeCenter({ position }) {
  const map = useMap();
  map.setView(position);
  return null;
}

function DetectClick() {
  useMapEvent({
    click: (e) => console.log(`lat = ${e.latlng.lat} lng = ${e.latlng.lng}`),
  });
}

export default Map;
