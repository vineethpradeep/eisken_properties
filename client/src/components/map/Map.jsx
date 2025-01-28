import { MapContainer, TileLayer } from "react-leaflet";
import "./map.scss";
import "leaflet/dist/leaflet.css";
import LocationPin from "../locationPin/LocationPin";
import PropTypes from "prop-types";

const Map = ({ items }) => {
  return (
    <MapContainer
      center={
        items.length === 1
          ? [items[0].latitude, items[0].longitude]
          : [51.5771, -3.9875]
      }
      zoom={11}
      scrollWheelZoom={false}
      className="map"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {items.map((item) => (
        <LocationPin item={item} key={item.id} />
      ))}
    </MapContainer>
  );
};

Map.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Map;
