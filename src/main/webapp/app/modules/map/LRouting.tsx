import React, { useEffect, useState } from 'react';
// import L from 'leaflet'; // Import L from leaflet to start using the plugin
import 'leaflet'; // Import L from leaflet to start using the plugin
declare let L;
import { useMap } from 'react-leaflet';
import 'leaflet-routing-machine';
import 'leaflet-control-geocoder';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.js';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import 'leaflet-control-geocoder/dist/Control.Geocoder.css';
import 'leaflet-control-geocoder/dist/Control.Geocoder.js';
import 'leaflet.locatecontrol'; // Import plugin
import 'leaflet.locatecontrol/dist/L.Control.Locate.min.css'; // Import styles

const LRouting = () => {
  const [currentLocation, setCurrentLocation] = useState([]);

  const map = useMap();
  const DefaultIcon = L.icon({
    iconUrl: 'content/images/leaflet/layers.png',
    // shadowUrl: 'content/images/leaflet/marker-shadow.png',
    iconSize: [25, 41],
    // iconAnchor: [10, 41],
    // popupAnchor: [2, 40],
  });
  useEffect(() => {
    var marker = L.marker([33.2500431, -8.5040995], { icon: DefaultIcon }).addTo(map);
    // var marker = L.marker(currentLocation, {icon: DefaultIcon}).addTo(map);
    L.control.locate().addTo(map);
    L.Control.geocoder({
      defaultMarkGeocode: false,
    })
      .on('markgeocode', function (e) {
        // var bbox = e.geocode.bbox;
        var lating = e.geocode.center;
        L.marker(lating).addTo(map).bindPopup(e.geocode.name).openPopup();
        // var poly = L.polygon([
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
    L.Routing.control({
      waypoints: [
        L.latLng(33.2500431, -8.5040995),
        L.latLng(33.221904, -8.4919703),
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
            marker.setLatLng([c.lat, c.lng]);
          }, 100 * i);
        });
      })
      .addTo(map);
    // })
    if (!navigator.geolocation) {
      console.log("Your browser doesn't support geolocation feature!");
    } else {
      setInterval(() => {
        navigator.geolocation.getCurrentPosition(getPosition);
        navigator.geolocation.watchPosition(succes, error);
      }, 5000);
    }
  }, []);
  let circle;
  const succes = pos => {
    var lat = pos.coords.latitude;
    var long = pos.coords.longitude;
    var accuracy = pos.coords.accuracy;

    if (marker1) {
      map.removeLayer(marker1);
      // map.removeLayer(circle);
    }

    // marker = L.marker([lat, long])
    L.marker([lat, long]).addTo(map);
    L.circle([lat, long], { radius: accuracy }).addTo(map);

    map.fitBounds(circle.getBounds());

    console.log('Your coordinate is: Lat: ' + lat + ' Long: ' + long + ' Accuracy: ' + accuracy);
    // if (lat != null && long != null){
    //     setCurrentLocation([lat,long])
    // }
  };
  const error = err => {
    if (err.code === 1) {
      // alert('Please allow geolocation access');
    }
    // else {
    //     alert("Cannot get current location")
    // }
  };

  var marker1, circle1;

  function getPosition(position) {
    // console.log(position)
    var lat = position.coords.latitude;
    var long = position.coords.longitude;
    var accuracy = position.coords.accuracy;

    if (marker1) {
      map.removeLayer(marker1);
    }
    if (circle1) {
      map.removeLayer(circle1);
    }

    // marker = L.marker([lat, long])
    marker1 = L.marker([lat, long]);
    circle1 = L.circle([lat, long], { radius: accuracy });

    var featureGroup = L.featureGroup([marker1, circle1]).addTo(map);

    map.fitBounds(featureGroup.getBounds());

    console.log('Your coordinate is: Lat: ' + lat + ' Long: ' + long + ' Accuracy: ' + accuracy);
    // if (lat != null && long != null){
    //     setCurrentLocation([lat,long])
    // }
  }

  return null;
};

export default LRouting;
