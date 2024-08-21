import * as React from "react";
import styles from "./Header.module.css";
import mapIcon from "../../assets/mapicon.png"
import infoIcon from "../../assets/infoIcon.png"
import { Link } from "react-router-dom";

function Header({ location }) {
    const capitalizeFirstLetter = (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1);
    };

    const [isInfoVisible, setIsInfoVisible] = React.useState(false);

    const toggleInfoDiv = () => {
        setIsInfoVisible((prev) => !prev);
      };

    const capitalizedLocation = capitalizeFirstLetter(location);

    return (
        <div className={styles.headerWrapperDiv}>
            <div className={styles.iconWrapper}>
                <Link to={`/`}>
                    <img src={mapIcon} alt="" />
                </Link>
                <button className={styles.infoButton} onClick={toggleInfoDiv}>
                    <img className={styles.infoIcon} src={infoIcon} alt="Info" />
                </button>
            </div>
            <div className={styles.headerTextWrapper}>
                <h1 className={styles.locationStyle}>{capitalizedLocation}</h1>
                <h1 className={styles.appName}>POST-IT</h1>
            </div>
            {isInfoVisible && (
            <div className={styles.infoDiv}>
                <h2 className={styles.infoDivTitle}>About This Website</h2>
                <p className={styles.p}>
                    This website provides information about bla bla bla
                </p>
                <button onClick={toggleInfoDiv}>Close</button>
            </div>
            )}
        </div>
    );
}

export default Header;
