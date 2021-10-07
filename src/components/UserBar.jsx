import React from "react";
import Login_icon from "../images/Login_icon.png"
import Calendar_Icon from "../images/Calendar_Icon.png"
import Resign from "../images/Resign.png"
import Ticket_Icon from "../images/Ticket_Icon.png"
import Password_icon from "../images/Password_icon.png"
import Logout from "../images/Logout.png"

export default function UserBar() {
    return (
        <div id="Login_header">
            <div className="dropdown">
                <button onclick="OpenForm()" className="Login_button dropbtn"> <img src={Login_icon} className="Login_icon" alt="" /> Bejelentkezés</button>
                <div className="dropdown--content" id="dropdown">
                    {/* eslint-disable-next-line */}
                    <a href="#" onclick="MenuPage()" className="dropdown--item"><img className="dropdown--icon-img" src={Calendar_Icon} alt="Étrend" />Étrend</a>
                    {/* eslint-disable-next-line */}
                    <a href="#" onclick="ResignPage()" className="dropdown--item"><img className="dropdown--icon-img" src={Resign} alt="Lemondás" />Lemondás</a>
                    {/* eslint-disable-next-line */}
                    <a href="#" onclick="TicketPage()" className="dropdown--item"><img className="dropdown--icon-img" src={Ticket_Icon} alt="Ebedjegy" />Ebédjegy</a>
                    {/* eslint-disable-next-line */}
                    <a href="#" onclick="PassWordPage()" className="dropdown--item"><img className="dropdown--icon-img" src={Password_icon} alt="Jelszó" />Jelszó modosítás</a>
                    <a href="./index.html" onclick="LogingOut()" className="dropdown--item"><img className="dropdown--icon-img" src={Logout} alt="Kijelentkezés" />Kijelentkezés</a>
                </div>
            </div>
        </div>
    )
}