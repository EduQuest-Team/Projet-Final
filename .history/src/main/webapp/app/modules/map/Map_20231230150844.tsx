import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { MapContainer, MapContainerProps, Marker, Popup, TileLayer, TileLayerProps } from 'react-leaflet';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import React from 'react';
import { AttributionControl } from 'react-leaflet';

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
});

L.Marker.prototype.options.icon = DefaultIcon;

export interface IMapProps {
  data: any[];
  latitude: number;
  longitude: number;
  // data[0].longitude: number;
}

// const Map = props => {
// const Map = (props: IMapProps) => {
const Map = ({data}) => {
    // const { latitude, longitude } = props;
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
          {propsdata.map(item => {
            console.log(item);
            return (
              <Marker position={[item.latitude, item.longitude]}>
                <Popup>
                  <p>
                    <strong>Nom:</strong> {item.name}
                  </p>
                  <p>
                    <strong>Address:</strong> {item.address}
                  </p>
                </Popup>
              </Marker>
            );
          })}
          <AttributionControl position="bottomright" prefix={false} />
        </CustomMapContainer>
      </Row>
    </Container>
  );
};

export default Map;
