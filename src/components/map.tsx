import { DirectionsRenderer, GoogleMap } from "@react-google-maps/api";
import { useState } from "react";

const Map = () => {
    const [map, setMap] = useState<any>(null);
  
    const directionsService = new window.google.maps.DirectionsService();
  
    const containerStyle = {
        width: "100%",
        height: "98vh"
    };

    const center = { lat: 46.053491, lng: 14.470363 };
    const waypoints = [
        { location: new window.google.maps.LatLng(46.047118, 14.462141), stopover: true },
        { location: new window.google.maps.LatLng(46.046935, 14.495472), stopover: true },
        { location: new window.google.maps.LatLng(46.051347, 14.488195), stopover: true }
    ];

    directionsService.route(
        {
          origin: center,
          destination: center,
          waypoints: waypoints,
          optimizeWaypoints: true,
          travelMode: window.google.maps.TravelMode.DRIVING
        },
        (result, status) => {
          if (status === window.google.maps.DirectionsStatus.OK) {
            setMap(result);
          } else {
            console.error(`error fetching directions ${result}`);
          }
        }
      );

      return (
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={10}
        >
          {map && <DirectionsRenderer directions={map} />}
        </GoogleMap>
      );
    
  };

export default Map;