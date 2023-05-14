import { DirectionsRenderer, GoogleMap } from "@react-google-maps/api";
import { useState, useEffect } from "react";

const containerStyle = {
  width: "100%",
  height: "98vh"
};


const center = { lat: 46.024029, lng: 14.476362 };

const Map = ({points}: {points: Array<any>}) => {
  const [map, setMap] = useState<any>(null);

  useEffect(() => {
    const directionsService = new window.google.maps.DirectionsService();
    directionsService.route(
      {
        origin: center,
        destination: center,
        waypoints: points.map((p: any) => ({location: new window.google.maps.LatLng(p.latitude, p.longitude), stopover: true})),
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
  }, []);

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={16}
    >
      {map && <DirectionsRenderer directions={map} />}
    </GoogleMap>
  );
};

export default Map;
