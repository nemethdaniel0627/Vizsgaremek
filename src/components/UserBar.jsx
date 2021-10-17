import React from "react";
import Login_icon from "../images/Login_icon.png"
import User_icon from "../images/UserIcon.png"
import Calendar_Icon from "../images/Calendar_Icon.png"
import Resign from "../images/Resign.png"
import Ticket_Icon from "../images/Ticket_Icon.png"
import Password_icon from "../images/Password_icon.png"
import Logout from "../images/Logout.png"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt, faCalendarTimes } from '@fortawesome/free-regular-svg-icons';
import { Link } from "react-router-dom";

export default function UserBar() {


    return (
        <div id="Login_header">
            <div className="dropdown">
                <button className="Login_button dropbtn"> <img src={User_icon} className="Login_icon" alt="" /> Teszt Elek
                    <div className="dropdown--content" id="dropdown">
                        {/* eslint-disable-next-line */}
                        <Link to="/etlap" className="dropdown--item"><FontAwesomeIcon icon={faCalendarAlt} /> Étrend</Link>
                        {/* eslint-disable-next-line */}
                        <Link to="/lemondas" className="dropdown--item"><FontAwesomeIcon icon={faCalendarTimes} />Lemondás</Link>
                        {/* eslint-disable-next-line */}
                        <Link to="/ebedjegy" className="dropdown--item"><img className="dropdown--icon-img" src={Ticket_Icon} alt="Ebedjegy" />Ebédjegy</Link>
                        {/* eslint-disable-next-line */}
                        <Link to="/jelszomod" className="dropdown--item"><img className="dropdown--icon-img" src={Password_icon} alt="Jelszó" />Jelszó modosítás</Link>
                        <Link to="/login" className="dropdown--item"><img className="dropdown--icon-img" src={Logout} alt="Kijelentkezés" />Kijelentkezés</Link>
                    </div>
                </button>
            </div>
        </div>
    )
}