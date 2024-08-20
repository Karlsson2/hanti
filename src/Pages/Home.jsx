import mapboxgl from "mapbox-gl";
import { useEffect, useRef, useState } from "react";
import "../App.css";
function Home() {
  // Set the Mapbox access token
  mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_KEY;

  // Create refs for the map container and the map instance
  const mapContainer = useRef(null);
  const map = useRef(null);

  // State for map's center and zoom level
  const [lng, setLng] = useState(-70.9);
  const [lat, setLat] = useState(42.35);
  const [zoom, setZoom] = useState(9);

  useEffect(() => {
    // Initialize map only once
    if (map.current) return;

    map.current = new mapboxgl.Map({
      container: mapContainer.current, // Reference to the map container
      style: "mapbox://styles/mapbox/streets-v12", // Map style
      center: [lng, lat], // Map center (longitude, latitude)
      zoom: zoom, // Initial zoom level
    });

    // Cleanup function to remove the map when the component unmounts
    return () => {
      if (map.current) map.current.remove();
    };
  }, []); // Empty dependency array ensures this effect runs only once

  return (
    <div className="App">
      <div ref={mapContainer} className="map-container" />
    </div>
  );
}

export default Home;
