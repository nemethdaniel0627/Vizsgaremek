import React, { useState } from "react";
import foodE_logo from "../images/FoodWeb_logo.png";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt, faCalendarTimes, faUserCircle, faCaretDown, faSignOutAlt, faTicketAlt, faUser, faQrcode, faDatabase, faUpload } from "@fortawesome/free-solid-svg-icons";
import { faCreditCard, faEnvelope, faIdCard } from "@fortawesome/free-regular-svg-icons";
import AuthUser from "../modules/AuthUser";
import { useEffect } from "react";

export default function Navbar(props) {
    const [darkMode, setDarkMode] = useState(true);
    const root = document.querySelector(':root');

    function darkModeChange(setDefault) {
        let tmpDarkMode = darkMode;
        if (!setDefault || setDefault.type === "click") {
            tmpDarkMode = !darkMode;
            setDarkMode(!darkMode);
        }

        if (tmpDarkMode) {
            root.style.setProperty('--dark-blue', "#0D1321");
            root.style.setProperty('--light-blue', "#1D2D44");
            root.style.setProperty('--blue', "#3E5C76");
            root.style.setProperty('--bodyBackground', "#3E5C76");
            root.style.setProperty('--darkModeFontColor', "#fff");
            root.style.setProperty('--currentDay', "#28622a");
            root.style.setProperty('--accountBackground', "#00000040");
            root.style.setProperty('--paymentCardBg', "#000b26c0");
            root.style.setProperty('--paymentCardBgEdit', "#000b26a0");
            root.style.setProperty('--paymentCardHover', "#fff");
            root.style.setProperty('--adminDb', "#ffffff40");
            root.style.setProperty('--adminDbFontKey', "#ffffffa0");
            root.style.setProperty('--a-rule', "#5797ff");
            root.style.setProperty('--report-card-bg', "#ffffff");
        }
        else {
            root.style.setProperty('--dark-blue', "#001E6C");
            root.style.setProperty('--blue', "#035397");
            root.style.setProperty('--light-blue', "#5089C6");
            root.style.setProperty('--bodyBackground', "#fff");
            root.style.setProperty('--darkModeFontColor', "#000");
            root.style.setProperty('--currentDay', "#adf7b0");
            root.style.setProperty('--accountBackground', "#001E6Cca");
            root.style.setProperty('--paymentCardBg', "#000b26f0");
            root.style.setProperty('--paymentCardBgEdit', "#000b26a0");
            root.style.setProperty('--paymentCardHover', "#000");
            root.style.setProperty('--adminDb', "#00000040");
            root.style.setProperty('--adminDbFontKey', "#000000a0");
            root.style.setProperty('--a-rule', "#5797ff");
            root.style.setProperty('--report-card-bg', "#00000030");
        }
    }

    function setDropDownHeight() {
        const dropdown = document.getElementById("dropdown");
        const head = document.getElementsByTagName('head');
        const element = document.querySelector("style");
        if (dropdown && root && head && element) {
            dropdown.style.visibility = "hidden";
            dropdown.style.height = "max-content";

            var css = `.dropbtn:hover #dropdown { height: ${dropdown.offsetHeight}px }`;

            if (element.styleSheet) {
                element.styleSheet.cssText = css;
            } else {
                element.appendChild(document.createTextNode(css));
            }

            head[0].appendChild(element);

            dropdown.style.height = "";
            dropdown.style.visibility = "visible";
        }
    }

    useState(() => {
        darkModeChange(true);
    }, [])

    useEffect(() => {
        setDropDownHeight();
    })

    return (
        <div id="navbar" className="navbar">
            {AuthUser._authorization() === "user" ?
                <div className="navbar--items-container">
                    <label htmlFor="navbar--btn" id="navbar--photo" className="navbar--photo">
                        <img alt="ICON" id="Logo" src={foodE_logo} />
                    </label>
                    <div className="navbar--item">
                        <Link to="/etlap"><FontAwesomeIcon icon={faCalendarAlt} /> Étlap</Link>
                    </div>
                    <div className="navbar--item">
                        <Link to="/lemondas"><FontAwesomeIcon icon={faCalendarTimes} /> Lemondás</Link>
                    </div>
                    <div className="navbar--item">
                        <Link to="/ebedjegy"><FontAwesomeIcon icon={faTicketAlt} /> Ebédjegy</Link>
                    </div>
                </div>
                : AuthUser._authorization() === "admin" ?
                    <div className="navbar--items-container">
                        <label htmlFor="navbar--btn" id="navbar--photo" className="navbar--photo">
                            <img alt="ICON" id="Logo" src={foodE_logo} />
                        </label>
                        <div className="navbar--item">
                            <Link to="/adatbazis"><FontAwesomeIcon icon={faDatabase} /> Adatbázis</Link>
                        </div>
                        <div className="navbar--item">
                            <Link to="/beolvas"><FontAwesomeIcon icon={faQrcode} /> Beolvasás</Link>
                        </div>
                        <div className="navbar--item">
                            <Link to="/etlapfeltolt"><FontAwesomeIcon icon={faUpload} /> Étlap feltöltés</Link>
                        </div>
                    </div>
                    :
                    <div className="navbar--items-container">
                        <label htmlFor="navbar--btn" id="navbar--photo" className="navbar--photo">
                            <img alt="ICON" id="Logo" src={foodE_logo} />
                        </label>
                    </div>
            }
            <div className=" navbar--left-side-container">
                <div className="darkmode">
                    <input id="toggle" defaultChecked={darkMode} className="toggle" onClick={darkModeChange} type="checkbox" />
                </div>
                {AuthUser._authorization() === "user" ?
                    <div className="dropdown">
                        <button className="Login_button dropbtn"> <FontAwesomeIcon icon={faUser} /> {props.userName} <FontAwesomeIcon icon={faCaretDown} />
                            <div className="dropdown--content" id="dropdown">
                                <Link to="/adatlap" className="dropdown--item"><FontAwesomeIcon icon={faIdCard} /> Adatlap</Link>
                                <Link to="/fizetes" className="dropdown--item"><FontAwesomeIcon icon={faCreditCard} /> Fizetés</Link>
                                <Link to="/kapcsolat" className="dropdown--item"><FontAwesomeIcon icon={faEnvelope} /> Kapcsolat</Link>
                                <div onClick={AuthUser.logoutUser} className="dropdown--item"><FontAwesomeIcon icon={faSignOutAlt} /> Kijelentkezés</div>
                            </div>
                        </button>
                    </div>
                    : AuthUser._authorization() === "admin" || AuthUser._authorization() === "alkalmazott" ?
                        <div className="navbar--item">
                            <div onClick={AuthUser.logoutUser}><FontAwesomeIcon icon={faSignOutAlt} /> Kijelentkezés</div>
                        </div>
                        :
                        <></>
                }
            </div>
            <input type="checkbox" id="navbar--button" />
            {
                AuthUser._authorization() === "user" || AuthUser._authorization() === "admin" || AuthUser._authorization() === "alkalmazott" ?
                    <label htmlFor="navbar--button" className="navbar--button--container">
                        <div className="navbar--button"></div>
                    </label>
                    : <></>
            }
            {AuthUser._authorization() === "user" ?
                <div className="navbar--items-container--collapse">
                    <div className="navbar--items-container--collapse--item">
                        <Link to="/etlap"><FontAwesomeIcon icon={faCalendarAlt} /> Étlap</Link>
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
                        <div onClick={AuthUser.logoutUser} className="dropdown--item"><FontAwesomeIcon icon={faSignOutAlt} /> Kijelentkezés</div>
                    </div>
                </div>
                :
                AuthUser._authorization() === "admin" ?
                    <div className="navbar--items-container--collapse">
                        <div className="navbar--items-container--collapse--item">
                            <Link to="/adatbazis"><FontAwesomeIcon icon={faDatabase} /> Adatbázis</Link>
                        </div>
                        <div className="navbar--items-container--collapse--item">
                            <Link to="/beolvas"><FontAwesomeIcon icon={faQrcode} /> Beolvasás</Link>
                        </div>
                        <div className="navbar--items-container--collapse--item">
                            <Link to="/etlapfeltolt"><FontAwesomeIcon icon={faUpload} /> Étlap feltöltés</Link>
                        </div>
                        <div className="navbar--items-container--collapse--item">
                            <div onClick={AuthUser.logoutUser}><FontAwesomeIcon icon={faSignOutAlt} /> Kijelentkezés</div>
                        </div>
                    </div>
                    : AuthUser._authorization() === "alkalmazott" ?
                        <div className="navbar--items-container--collapse">
                            <div className="navbar--items-container--collapse--item">
                                <Link to="/beolvas"><FontAwesomeIcon icon={faQrcode} /> Beolvasás</Link>
                            </div>
                            <div className="navbar--items-container--collapse--item">
                                <div onClick={AuthUser.logoutUser}><FontAwesomeIcon icon={faSignOutAlt} /> Kijelentkezés</div>
                            </div>
                        </div>
                        : <></>
            }
            {
                AuthUser._authorization() === "user" ?
                    <Link to="/adatlap" className="account--item"><FontAwesomeIcon icon={faUserCircle} /> {props.userName}</Link>
                    : <label htmlFor="navbar--btn" id="navbar--photo" className="navbar--photo__admin">
                        <img alt="ICON" src={foodE_logo} />
                    </label>
            }
        </div >

    );
}