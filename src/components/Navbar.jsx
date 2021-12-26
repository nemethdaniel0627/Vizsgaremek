import React, { useState } from "react";
import foodE_logo from "../images/FoodWeb_logo.png";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt, faCalendarTimes, faUserCircle, faCaretDown, faSignOutAlt, faTicketAlt, faUser } from "@fortawesome/free-solid-svg-icons";
import { faCreditCard, faEnvelope, faIdCard } from "@fortawesome/free-regular-svg-icons";

export default function Navbar(props) {
    const [darkMode, setDarkMode] = useState(true);

    function darkModeChange(setDefault) {
        let tmpDarkMode = darkMode;
        if (!setDefault || setDefault.type === "click") {            
            tmpDarkMode = !darkMode;
            setDarkMode(!darkMode);
        }
        const root = document.querySelector(':root');
        if (tmpDarkMode) {
            root.style.setProperty('--dark-blue', "#0D1321");
            root.style.setProperty('--light-blue', "#1D2D44");
            root.style.setProperty('--blue', "#3E5C76");
            root.style.setProperty('--bodyBackground', "#3E5C76");
            root.style.setProperty('--darkModeFontColor', "#fff");
            root.style.setProperty('--currentDay', "#28622a");
        }
        else {
            root.style.setProperty('--dark-blue', "#001E6C");
            root.style.setProperty('--blue', "#035397");
            root.style.setProperty('--light-blue', "#5089C6");
            root.style.setProperty('--bodyBackground', "#fff");
            root.style.setProperty('--darkModeFontColor', "#000");
            root.style.setProperty('--currentDay', "#adf7b0");
        }
    }

    useState(() => {
        darkModeChange(true);
    }, [])

    return (
        <div id="navbar" className="navbar">
            <div className="navbar--items-container">
                <label htmlFor="navbar--btn" id="navbar--photo" className="navbar--photo">
                    <img alt="ICON" id="Logo" src={foodE_logo} />
                </label>
                <div className="navbar--item">
                    <Link to="/etlap"><FontAwesomeIcon icon={faCalendarAlt} /> Étrend</Link>
                </div>
                <div className="navbar--item">
                    <Link to="/lemondas"><FontAwesomeIcon icon={faCalendarTimes} /> Lemondás</Link>
                </div>
                <div className="navbar--item">
                    <Link to="/ebedjegy"><FontAwesomeIcon icon={faTicketAlt} /> Ebédjegy</Link>
                </div>
            </div>
            <div className="dropdown">
                <button className="Login_button dropbtn"> <FontAwesomeIcon icon={faUser} /> Teszt Elek <FontAwesomeIcon icon={faCaretDown} />
                    <div className="dropdown--content" id="dropdown">
                        <Link to="/adatlap" className="dropdown--item"><FontAwesomeIcon icon={faIdCard} /> Adatlap</Link>
                        <Link to="/fizetes" className="dropdown--item"><FontAwesomeIcon icon={faCreditCard} /> Fizetés</Link>
                        <Link to="/kapcsolat" className="dropdown--item"><FontAwesomeIcon icon={faEnvelope} /> Kapcsolat</Link>
                        <Link to="/login" className="dropdown--item"><FontAwesomeIcon icon={faSignOutAlt} /> Kijelentkezés</Link>
                    </div>
                </button>
            </div>
            <div className="darkmode">
                <input id="toggle" defaultChecked={darkMode} className="toggle" onClick={darkModeChange} type="checkbox" />
                {/* <label className="switch" for="toggle">                    
                    <span className="slider round"></span>
                </label> */}
                {/* <label for="toggle" class ="title">Toggle dark mode</label> */}
            </div>
            <input type="checkbox" id="navbar--button" />
            <label htmlFor="navbar--button" className="navbar--button--container">
                <div className="navbar--button"></div>
            </label>
            <div className="navbar--items-container--collapse">
                <div className="navbar--items-container--collapse--item">
                    <Link to="/etlap"><FontAwesomeIcon icon={faCalendarAlt} /> Étrend</Link>
                </div>
                <div className="navbar--items-container--collapse--item">
                    <Link to="/lemondas"><FontAwesomeIcon icon={faCalendarTimes} /> Lemondás</Link>
                </div>
                <div className="navbar--items-container--collapse--item">
                    <Link to="/ebedjegy"><FontAwesomeIcon icon={faTicketAlt} /> Ebédjegy</Link>
                </div>
                <div className="navbar--items-container--collapse--item">
                    <Link to="/fizetes" className="dropdown--item"><FontAwesomeIcon icon={faCreditCard} /> Fizetés</Link>
                </div>
                <div className="navbar--items-container--collapse--item">
                    <Link to="/kapcsolat" className="dropdown--item"><FontAwesomeIcon icon={faEnvelope} /> Kapcsolat</Link>
                </div>
                <div className="navbar--items-container--collapse--item">
                    <Link to="/login" className="dropdown--item"><FontAwesomeIcon icon={faSignOutAlt} /> Kijelentkezés</Link>
                </div>
            </div>
            <Link to="/adatlap" className="account--item"><FontAwesomeIcon icon={faUserCircle} /> {props.userName}</Link>
        </div>

    );
}