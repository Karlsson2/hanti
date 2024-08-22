import * as React from "react";
import styles from "./Header.module.css";
import mapIcon from "../../assets/map_icon.svg";
import infoIcon from "../../assets/Info_icon.svg";
import { Link } from "react-router-dom";
import viewNoteStyles from "../ViewNotes/ViewNotes.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import rodLogga from "../../assets/logga.svg";

function Header({ location }) {
    const capitalizeFirstLetter = (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1);
    };

    const [isInfoVisible, setIsInfoVisible] = React.useState(false);

    const toggleInfoDiv = () => {
        setIsInfoVisible((prev) => {
            // Toggle the z-index between 4 and 2
            const overlayElement = document.querySelector(`.${viewNoteStyles.overlay}`);
            if (overlayElement) {
                overlayElement.style.zIndex = prev ? '2' : '3';
            }
            return !prev;
        });
    };

    const capitalizedLocation = capitalizeFirstLetter(location);

    return (
        <div className={styles.headerWrapperDiv}>
            <div className={styles.iconWrapper}>
                <Link to={`/`}>
                    <img src={mapIcon} alt="" />
                </Link>
                <img className={styles.appName} src={rodLogga} alt="" />
                <button className={styles.infoButton} onClick={toggleInfoDiv}>
                    <img className={styles.infoIcon} src={infoIcon} alt="Info" />
                </button>
            </div>
            <div className={styles.headerTextWrapper}>
                <h1 className={styles.locationStyle}>{capitalizedLocation}</h1>
            </div>
            {isInfoVisible && (
                <div className={styles.infoDiv}>
                    <h2 className={styles.infoDivTitle}>Hur går det till?</h2> <br />
                    <p className={styles.p}>
                        Klicka på en post-it för att ta del av andras <span className={styles.fatPopupTypo}>upplevelser här på Lindholmen.</span> <br /><br />
                        <span className={styles.fatPopupTypo}>Du kan själv dela</span> dina upplevelser genom att trycka in dig på "skriv här". <br /><br />
                        <span className={styles.sjalvklart}>Självklart kan man vara anonym.</span>
                    </p>
                    <button className={styles.infoDivCross} onClick={toggleInfoDiv}><FontAwesomeIcon icon={faXmark} size="2x" /></button>
                </div>
            )}
        </div>
    );
}

export default Header;
