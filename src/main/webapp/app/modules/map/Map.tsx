import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { MapContainer, MapContainerProps, Marker, Popup, TileLayer, TileLayerProps } from 'react-leaflet';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import React, { useEffect } from 'react';
import { AttributionControl } from 'react-leaflet';
import LRouting from 'app/modules/map/Routing';

// Extend the TileLayerProps type to include the attribution property
type CustomTileLayerProps = TileLayerProps & { attribution: string };
type CustomMapContainerProps = MapContainerProps & { center: number[]; zoom: number; scrollWheelZoom: boolean; style: React.CSSProperties };

// Use the extended type for TileLayer
function CustomTileLayer(props: CustomTileLayerProps) {
  return <TileLayer {...props} />;
}

function CustomMapContainer(props: CustomMapContainerProps) {
  return <MapContainer {...props} />;
}

const DefaultIcon = L.icon({
  iconUrl: 'content/images/leaflet/marker-icon.png',
  shadowUrl: 'content/images/leaflet/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [10, 41],
  popupAnchor: [2, 40],
});

L.Marker.prototype.options.icon = DefaultIcon;

export interface IMapProps {
  data: any[];
  latitude: number;
  longitude: number;
  name: string;
  address: string;
}

// const Map = props => {
// const Map = (props: IMapProps) => {
const Map = ({ data }) => {
  // const { latitude, longitude, name, address } = props;
  return (
    <Container fluid="sm" className="my-3">
      <Row>
        <CustomMapContainer
          // center={[props.data[0].latitude, props.data[0].longitude]}
          center={[data[0].latitude, data[0].longitude]}
          zoom={13}
          scrollWheelZoom={true}
          style={{ width: '100%', height: '80vh' }}
        >
          <CustomTileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            // Use 'as' to assert the type of the props
          />

          {/* {props.data.map(item => { */}
          {data.map(item => {
            // console.log(item);
            return (
              <Marker key={item.id} position={[item.latitude, item.longitude]}>
                <Popup>
                  <p>
                    <strong>Nom:</strong> {item.nom}
                  </p>
                  <p>
                    <strong>Address:</strong> {item.adresse}
                  </p>
                </Popup>
              </Marker>
            );
          })}
          <LRouting />
          <AttributionControl position="bottomright" prefix={false} />
        </CustomMapContainer>
      </Row>
    </Container>
  );
};

export default Map;
