
import * as React from "react";
import Map, { Marker, Popup } from "react-map-gl";
import pin from "../assets/pin.png";
import { Link } from "react-router-dom";


function Home() {
  const [selectedLocation, setSelectedLocation] = React.useState(null);

  const handleMarkerClick = (longitude, latitude, title) => {
    console.log({ longitude, latitude, title });
    setSelectedLocation({ longitude, latitude, title });
  };

  return (
    <Map
      mapboxAccessToken={import.meta.env.VITE_MAPBOX_KEY}
      initialViewState={{
        longitude: 11.939,
        latitude: 57.70594,
        zoom: 16,
      }}
      style={{ width: "100%", height: "100vh" }}
      mapStyle="mapbox://styles/fannykarlsson/cm0250q19009u01phh6a1gchj"
    >
      {/* First Marker */}
      <Marker
        longitude={11.939}
        latitude={57.70594}
        anchor="bottom"
        onClick={() => handleMarkerClick(11.939, 57.70594, "test")}
      >
        <img src={pin} alt="pin" style={{ cursor: "pointer" }} />
      </Marker>

      {/* Second Marker */}
      <Marker
        longitude={11.934}
        latitude={57.70574}
        anchor="bottom"
        onClick={() => handleMarkerClick(11.934, 57.70574, "statyn")}
      >
        <img src={pin} alt="pin" style={{ cursor: "pointer" }} />
      </Marker>

      {/* Third Marker */}
      <Marker
        longitude={11.936}
        latitude={57.70584}
        anchor="bottom"
        onClick={() => handleMarkerClick(11.936, 57.70584, "piren")}
      >
        <img src={pin} alt="pin" style={{ cursor: "pointer" }} />
      </Marker>

      {/* Fourth Marker */}
      <Marker
        longitude={11.935}
        latitude={57.70594}
        anchor="bottom"
        onClick={() => handleMarkerClick(11.935, 57.70594, "glantan")}
      >
        <img src={pin} alt="pin" style={{ cursor: "pointer" }} />
      </Marker>

      {/* Conditionally render the popup based on selectedLocation */}
      {selectedLocation && (
        <Popup
          longitude={selectedLocation.longitude}
          latitude={selectedLocation.latitude}
          anchor="top"
          onClose={() => setSelectedLocation(null)}
          closeOnClick={false} // Prevents popup from closing when clicking on the map
        >
          <div>
            <Link to={`/Location/${selectedLocation.title}`}>
              {selectedLocation.title}
            </Link>
          </div>
        </Popup>
      )}
    </Map>
  );
}

export default Home;

