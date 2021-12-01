import React, { useState } from "react";
import foodE_logo from "../images/FoodWeb_logo.png";
import lightModeImg from "../images/ToDefault.png";
import darkModeImg from "../images/ToDark.png";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt, faCalendarTimes, faCaretDown, faSignOutAlt, faTicketAlt, faUser } from "@fortawesome/free-solid-svg-icons";
import { faCreditCard, faEnvelope, faIdCard } from "@fortawesome/free-regular-svg-icons";

export default function Navbar() {
    const [darkMode, setDarkMode] = useState(false);

    function darkModeChange() {
        let tmpDarkMode = !darkMode;
        setDarkMode(!darkMode);
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

    return (
        <div id="header" className="header">
            <div className="header--items-container">
                <label htmlFor="header--btn" id="header--photo" className="header--photo">
                    <img alt="ICON" id="Logo" src={foodE_logo} />
                </label>
                <div className="header--item">
                    <Link to="/etlap"><FontAwesomeIcon icon={faCalendarAlt} /> Étrend</Link>
                </div>
                <div className="header--item">
                    <Link to="/lemondas"><FontAwesomeIcon icon={faCalendarTimes} /> Lemondás</Link>
                </div>
                <div className="header--item">
                    <Link to="/ebedjegy"><FontAwesomeIcon icon={faTicketAlt}/> Ebédjegy</Link>
                </div>
            </div>
            <div className="dropdown">
                <button className="Login_button dropbtn"> <FontAwesomeIcon icon={faUser}/> Teszt Elek <FontAwesomeIcon icon={faCaretDown}/>
                    <div className="dropdown--content" id="dropdown">                        
                        <Link to="/adatlap" className="dropdown--item"><FontAwesomeIcon icon={faIdCard} /> Adatlap</Link>
                        <Link to="/fizetes" className="dropdown--item"><FontAwesomeIcon icon={faCreditCard} /> Fizetés</Link>
                        <Link to="/kapcsolat" className="dropdown--item"><FontAwesomeIcon icon={faEnvelope} /> Kapcsolat</Link>
                        <Link to="/login" className="dropdown--item"><FontAwesomeIcon icon={faSignOutAlt} /> Kijelentkezés</Link>
                    </div>
                </button>
            </div>
            {/* <div className="darkmode">
                <label className="switch">
                    <input type="checkbox" onClick={darkModeChange} id="Dark_check" />
                    <span className="slider round"></span>
                </label>
                <img src={darkMode ? darkModeImg : lightModeImg} alt="DarkMode" className="darkmode--img" />
            </div> */}
        </div>

    );
}