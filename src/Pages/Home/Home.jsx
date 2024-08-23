import * as React from "react";
import Map, { Marker } from "react-map-gl";
import pin from "../../assets/pin.svg";
import { Link } from "react-router-dom";
import styles from "./Home.module.css";
import infoButton from "../../assets/Info_icon.svg";
import geoPin from "../../assets/geoPin.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import postitLogga from "../../assets/logga.svg";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

function Home() {
  const [isInfoVisible, setIsInfoVisible] = React.useState(false);

  React.useEffect(() => {
    // Check if info div has been shown before
    const hasSeenInfo = localStorage.getItem("hasSeenInfo");

    if (!hasSeenInfo) {
      const timer = setTimeout(() => {
        setIsInfoVisible(true);
        // Set the flag in localStorage
        localStorage.setItem("hasSeenInfo", "true");
      }, 3000);

      // Clear the timer if the component unmounts
      return () => clearTimeout(timer);
    }
  }, []);

  const toggleInfoDiv = () => {
    setIsInfoVisible((prev) => !prev);
  };

  return (
    <div style={{ position: "relative", width: "100%", height: "100vh" }}>
      <button className={styles.infoButton} onClick={toggleInfoDiv}>
        <img className={styles.infoButtonImage} src={infoButton} alt="Info" />
      </button>
      <img src={postitLogga} className={styles.headerText} alt="" />
      <h2 className={styles.headerLindholmen}>Lindholmen</h2>
      {/* Conditionally render the Info Div */}
      {isInfoVisible && (
        <div className={`${styles.infoDiv} ${styles.fadeIn}`}>
          <h2 className={styles.infoDivTitle}>Hur Går det till?</h2><br />
          <p className={styles.popupTypo}>
            Vad är det som kännetecknar historia om inte människorna som skapar den? Ta del av upplevelser och dela dina egna, här på Lindholmen.<br /><br />
            <span className={styles.fatPopupTypo}>Scanna någon utav QR-koderna och dela din tanke.</span><br /><br />
            <span className={styles.popupTypo}>QR koderna hittar du utplacerade på kartan.</span><br /><br />
            <img src={geoPin} alt="" />
          </p>
          <button className={styles.infoDivCross} onClick={toggleInfoDiv}>
            <FontAwesomeIcon icon={faXmark} size="2x" />
          </button>
        </div>
      )}

      <Map
        mapboxAccessToken={import.meta.env.VITE_MAPBOX_KEY}
        initialViewState={{
          longitude: 11.9375,
          latitude: 57.706,
          zoom: 15,
          pitch: 65,  // Set the pitch to create a 3D effect
          bearing: -50.6  // Adjust bearing to tilt the view
        }}
        style={{ width: "100%", height: "100%" }}
        mapStyle="mapbox://styles/fannykarlsson/cm0250q19009u01phh6a1gchj"
      >
        {/* Markers with Links */}
        <Marker longitude={11.931182} latitude={57.702886} anchor="bottom">
          <Link to={`/Location/bädden`}>
            <img src={pin} alt="pin" style={{ cursor: "pointer" }} />
          </Link>
        </Marker>

        <Marker longitude={11.9362} latitude={57.705052} anchor="bottom">
          <Link to={`/Location/fontänen`}>
            <img src={pin} alt="pin" style={{ cursor: "pointer" }} />
          </Link>
        </Marker>

        <Marker longitude={11.9398} latitude={57.7055} anchor="bottom">
          <Link to={`/Location/lindholmspiren`}>
            <img src={pin} alt="pin" style={{ cursor: "pointer" }} />
          </Link>
        </Marker>

        <Marker longitude={11.9373} latitude={57.70755} anchor="bottom">
          <Link to={`/Location/hållplatsen`}>
            <img src={pin} alt="pin" style={{ cursor: "pointer" }} />
          </Link>
        </Marker>
      </Map>
    </div>
  );
}

export default Home;
