import * as React from "react";
import Map, { Marker, Popup } from "react-map-gl";
import pin from "../../assets/pin.svg";
import { Link } from "react-router-dom";
import styles from "./Home.module.css";
import infoButton from "../../assets/Info_icon.svg";
import geoPin from "../../assets/geoPin.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

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
        <h2 className={styles.headerLindholmen}>Lindholmen</h2>

      {/* Conditionally render the Info Div */}
      {isInfoVisible && (
        <div className={styles.infoDiv}>
          <h2 className={styles.infoDivTitle}>Hur Går det till?</h2><br />
          <p className={styles.popupTypo}>
          Vad är det som kännetecknar historia om inte människorna som skapar den? Ta del av upplevelser och dela dina egna, här på Lindholmen.<br /><br />
          <span className={styles.fatPopupTypo}>Scanna någon utav QR-koderna och dela din tanke.</span><br /><br />
          <span className={styles.popupTypo}>QR koderna hittar du utplacerade på kartan.</span><br /><br />
          <img src={geoPin} alt="" />
          </p>
          <button className={styles.infoDivCross} onClick={toggleInfoDiv}><FontAwesomeIcon icon={faXmark} size="2x" /></button>
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
          longitude={11.931182}
          latitude={57.702886}
          anchor="bottom"
          onClick={() => handleMarkerClick(11.931182, 57.702886, "bädden")}
        >
          <img src={pin} alt="pin" style={{ cursor: "pointer" }} />
        </Marker>

        <Marker
          longitude={11.9362}
          latitude={57.705052}
          anchor="bottom"
          onClick={() => handleMarkerClick(11.9362, 57.705052, "fontänen")}
        >
          <img src={pin} alt="pin" style={{ cursor: "pointer" }} />
        </Marker>

        <Marker
          longitude={11.9398}
          latitude={57.7055}
          anchor="bottom"
          onClick={() => handleMarkerClick(11.9398, 57.7055, "lindholmspiren")}
        >
          <img src={pin} alt="pin" style={{ cursor: "pointer" }} />
        </Marker>

        <Marker
          longitude={11.9373}
          latitude={57.70755}
          anchor="bottom"
          onClick={() => handleMarkerClick(11.9373, 57.70755, "hållplatsen")}
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
            /* className={styles.mapboxglPopupStyles} funkade ej */ 
          >
            <div className={styles.markerPopup}>
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
