import { useEffect } from 'react';
// import L from 'leaflet'; // Import L from leaflet to start using the plugin
import 'leaflet'; // Import L from leaflet to start using the plugin
import { useMap } from 'react-leaflet';
import 'leaflet-routing-machine';
import 'leaflet-control-geocoder';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.js';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';

import 'leaflet-control-geocoder/dist/Control.Geocoder.css';
import 'leaflet-control-geocoder/dist/Control.Geocoder.js';

import 'leaflet.locatecontrol/dist/L.Control.Locate.min.css'; // Import plugin
import 'leaflet.locatecontrol/dist/L.Control.Locate.min.js';

declare let L;

const LRouting = ({ data }) => {
  // const [currentLocation, setCurrentLocation] = useState([33.2456782, -8.4990917]);
  // const [currentLocation, setCurrentLocation] = useState<{ lat: number; long: number }[]>([]);
  // const [currentLocation, setCurrentLocation] = useState<Location[]>([]);
  // const [marker, setMarker] = useState(null);

  const map = useMap();
  // type Location = {
  //     latitude: number;
  //     longitude: number;
  // };

  useEffect(() => {
    const Icon = L.icon({
      iconUrl: 'content/images/leaflet/layers.png',
      shadowUrl: 'content/images/leaflet/marker-shadow.png',
      iconSize: [25, 41],
      iconAnchor: [10, 41],
      popupAnchor: [2, 40],
    });
    const DefaultIcon = L.icon({
      // iconUrl: 'content/images/leaflet/walking.png',
      iconUrl: 'content/images/leaflet/walk.png',
      // shadowUrl: 'content/images/leaflet/marker-shadow.png',
      iconSize: [25, 41],
      // iconAnchor: [10, 41],
      // popupAnchor: [2, 40],
    });
    // const marker = L.marker([33.2500431, -8.5040995], {icon: DefaultIcon}).addTo(map);

    // let marker = L.marker(currentLocation, {icon: Icon});
    let marker = L.marker([], { icon: Icon });
    // let marker1 = L.marker(currentLocation, {icon: DefaultIcon});
    let marker1 = L.marker([], { icon: DefaultIcon });
    //
    // {
    //     currentLocation &&
    //     L.marker(currentLocation, {icon: DefaultIcon}).addTo(map)
    //
    // }
    data && L.control.locate().addTo(map);
    data &&
      L.Control.geocoder({
        defaultMarkGeocode: false,
      })
        .on('markgeocode', function (e) {
          // let bbox = e.geocode.bbox;
          let lating = e.geocode.center;
          L.marker(lating).addTo(map).bindPopup(e.geocode.name).openPopup();
          // let poly = L.polygon([
          //     bbox.getSouthEast(),
          //     bbox.getNorthEast(),
          //     bbox.getNorthWest(),
          //     bbox.getSouthWest()
          // ]).addTo(map);
          // map.fitBounds(poly.getBounds());
          // map.fitBounds(e.geocode().poly);
        })
        .addTo(map);
    // map.on("click", (e) => {
    // let route = L.Routing.control({
    {
      // currentLocation &&
      // L.Routing.control({
      //     waypoints: [
      //
      //         L.latLng(currentLocation[0]?.latitude, currentLocation[0]?.longitude),
      //         // L.latLng(33.221904, -8.4919703),
      //         L.latLng(33.2500431, -8.5040995),
      //
      //         // L.latLng(e.latlng.lat, e.latlng.lng),
      //         // L.latLng(e.latlng.lat, e.latlng.lng),
      //     ],
      //     lineOptions: {
      //         styles: [
      //             {
      //                 color: 'blue',
      //                 weight: 6,
      //                 opacity: 0.7,
      //             },
      //         ],
      //     },
      //     routeWhileDragging: true,
      //     geocoder: L.Control.Geocoder.nominatim(),
      //     addWaypoints: false,
      //     draggableWaypoints: false,
      //     fitSelectedRoutes: true,
      //     showAlternatives: true,
      // })
      //     .on('routesfound', e => {
      //         e.routes[0].coordinates.forEach((c, i) => {
      //             setTimeout(() => {
      //                 marker.setLatLng([c.lat, c.lng]);
      //             }, 100 * i);
      //         });
      //     }).addTo(map);
    }

    // if (!navigator.geolocation) {
    //     console.log("Your browser doesn't support geolocation feature!");
    // } else {
    //     setInterval(() => {
    //         // navigator.geolocation.getCurrentPosition(getPosition);
    //         navigator.geolocation.watchPosition(success, error);
    //     }, 5000);
    // }
    const success = pos => {
      if (pos && pos.coords) {
        let lat = pos.coords.latitude;
        let long = pos.coords.longitude;
        // const {latitude, longitude} = pos.coords;

        let accuracy = pos.coords.accuracy;
        // L.marker([lat, long], {icon: DefaultIcon}).addTo(map)

        marker1.setLatLng([lat, long]);
        let circle = L.circle([lat, long], { radius: accuracy });

        // setCurrentLocation([{latitude: lat, longitude: long}]);
        // setCurrentLocation(prevLocation => [
        //     ...prevLocation,
        //     {latitude, longitude}
        // ]);
        // const updatedLocations = currentLocation.map((location, i) => ({
        //     latitude: location.latitude,
        //     longitude: location.longitude,
        // }));
        // setCurrentLocation((prevLocation) => [...prevLocation, {latitude: lat, longitude: long}]);

        // console.log(
        //     currentLocation.map((location, i) => {
        //         return {
        //             latitude: location.latitude,
        //             longitude: location.longitude
        //         };
        //     })
        // );

        setTimeout(() => {
          // console.log(updatedLocations)
          data &&
            L.Routing.control({
              waypoints: [
                L.latLng(lat, long),
                // L.latLng(33.221904, -8.4919703),
                // L.latLng(33.2500431, -8.5040995),
                L.latLng(data[0].latitude, data[0].longitude),

                // L.latLng(e.latlng.lat, e.latlng.lng),
                // L.latLng(e.latlng.lat, e.latlng.lng),
              ],
              lineOptions: {
                styles: [
                  {
                    color: 'blue',
                    weight: 6,
                    opacity: 0.7,
                  },
                ],
              },
              routeWhileDragging: true,
              geocoder: L.Control.Geocoder.nominatim(),
              addWaypoints: false,
              draggableWaypoints: false,
              fitSelectedRoutes: true,
              showAlternatives: true,
            })
              .on('routesfound', e => {
                e.routes[0].coordinates.forEach((c, i) => {
                  setTimeout(() => {
                    marker1.setLatLng([c.lat, c.lng]);
                  }, 500 * i);
                });
              })
              .addTo(map);
        }, 30000);
        // marker = L.marker([lat, long])
        // L.marker([lat, long]).addTo(map);
        // L.circle([lat, long], {radius: accuracy}).addTo(map);
        data && circle.addTo(map);
        // if (marker1 && circle) {
        if (marker1) {
          data && map.removeLayer(marker1);
          // map.removeLayer(circle);
        }

        // map.fitBounds(circle.getBounds());
        if (marker) {
          // marker.setLatLng([lat, long]);
          data && marker1.addTo(map);
          // setCurrentLocation([lat, long]);
        }

        // map.setView([lat, long], 15); // Set view to current location

        // console.log('Your coordinate is: Lat: ' + lat + ' Long: ' + long + ' Accuracy: ' + accuracy);
        // console.log(currentLocation.map((l, i) => {
        //     {
        //         l.latitude
        //     }
        //     {
        //         l.longitude
        //     }
        //
        // }))
        //
        // setCurrentLocation([lat, long]);
        // console.log(
        //     currentLocation.map((location, i) => {
        //         return {
        //             latitude: location.latitude,
        //             longitude: location.longitude
        //         };
        //     })
        // );

        // if (lat != null && long != null) {
        //     console.log(currentLocation[0], currentLocation[1])
        // }
      } else {
        console.error('Invalid position data:', pos);
      }
    };
    const error = err => {
      if (err.code === 1) {
        alert('Please allow geolocation access');
      } else {
        alert('Cannot get current location');
      }
    };
    const watchId = navigator.geolocation.watchPosition(success, error);

    // Clean up resources when the component is unmounted
    return () => {
      navigator.geolocation.clearWatch(watchId);
      data && marker.removeFrom(map);
    };
  }, []);

  // function getPosition(position) {
  //     // console.log(position)
  //     let lat = position.coords.latitude;
  //     let long = position.coords.longitude;
  //     let accuracy = position.coords.accuracy;
  //     let marker1, circle1;
  //     const {latitude, longitude} = position.coords;
  //
  //
  //     if (marker1) {
  //         map.removeLayer(marker1);
  //     }
  //     if (circle1) {
  //         map.removeLayer(circle1);
  //     }
  //
  //     // marker = L.marker([lat, long])
  //     marker1 = L.marker([lat, long]);
  //     circle1 = L.circle([lat, long], {radius: accuracy});
  //
  //     let featureGroup = L.featureGroup([marker1, circle1]).addTo(map);
  //
  //     map.fitBounds(featureGroup.getBounds());
  //
  //     console.log('Your coordinate is: Lat: ' + lat + ' Long: ' + long + ' Accuracy: ' + accuracy);
  //     // if (lat != null && long != null){
  //     //     setCurrentLocation([lat,long])
  //     setCurrentLocation(prevLocation => [
  //         ...prevLocation,
  //         {latitude, longitude}
  //     ]);
  //     // }
  // }

  return null;
};

export default LRouting;
