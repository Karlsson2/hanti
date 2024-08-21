import * as React from "react";
import Map, { Marker, Popup } from "react-map-gl";
import pin from "../../assets/purplepin.png";
import { Link } from "react-router-dom";
import styles from "./Home.module.css";
import infoButton from "../../assets/infoButton.png";

function Home() {
  const [selectedLocation, setSelectedLocation] = React.useState(null);
  const [isInfoVisible, setIsInfoVisible] = React.useState(false);

  const handleMarkerClick = (longitude, latitude, title) => {
    console.log({ longitude, latitude, title });
    setSelectedLocation({ longitude, latitude, title });
  };

  const toggleInfoDiv = () => {
    setIsInfoVisible((prev) => !prev);
  };

  return (
    <div style={{ position: "relative", width: "100%", height: "100vh" }}>
      <button className={styles.infoButton} onClick={toggleInfoDiv}>
        <img className={styles.infoButtonImage} src={infoButton} alt="Info" />
      </button>
      <h1 className={styles.headerText}>POST-IT</h1>

      {/* Conditionally render the Info Div */}
      {isInfoVisible && (
        <div className={styles.infoDiv}>
          <h2 className={styles.infoDivTitle}>About This Website</h2>
          <p className={styles.p}>
            This website provides information about bla bla bla
          </p>
          <button onClick={toggleInfoDiv}>Close</button>
        </div>
      )}

      <Map
        mapboxAccessToken={import.meta.env.VITE_MAPBOX_KEY}
        initialViewState={{
          longitude: 11.939,
          latitude: 57.70594,
          zoom: 16,
        }}
        style={{ width: "100%", height: "100%" }}
        mapStyle="mapbox://styles/fannykarlsson/cm0250q19009u01phh6a1gchj"
      >
        {/* Your Markers */}
        <Marker
          longitude={11.939}
          latitude={57.70594}
          anchor="bottom"

          onClick={() => handleMarkerClick(11.939, 57.70594, "bädden")}

        >
          <img src={pin} alt="pin" style={{ cursor: "pointer" }} />
        </Marker>

        <Marker
          longitude={11.934}
          latitude={57.70574}
          anchor="bottom"
          onClick={() => handleMarkerClick(11.934, 57.70574, "fontänen")}
        >
          <img src={pin} alt="pin" style={{ cursor: "pointer" }} />
        </Marker>

        <Marker
          longitude={11.936}
          latitude={57.70584}
          anchor="bottom"

          onClick={() => handleMarkerClick(11.936, 57.70584, "lindholmspiren")}

        >
          <img src={pin} alt="pin" style={{ cursor: "pointer" }} />
        </Marker>

        <Marker
          longitude={11.935}
          latitude={57.70594}
          anchor="bottom"
          onClick={() => handleMarkerClick(11.935, 57.70594, "hållplatsen")}
        >
          <img src={pin} alt="pin" style={{ cursor: "pointer" }} />
        </Marker>

        {selectedLocation && (
          <Popup
            longitude={selectedLocation.longitude}
            latitude={selectedLocation.latitude}
            anchor="top"
            onClose={() => setSelectedLocation(null)}
            closeOnClick={false}
          >
            <div>
              <Link to={`/Location/${selectedLocation.title}`}>
                {selectedLocation.title}
              </Link>
            </div>
          </Popup>
        )}
      </Map>
    </div>
  );
}

export default Home;
