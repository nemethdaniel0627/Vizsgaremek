import React from "react";
import DesktopTicket from "./DesktopTicket";
import MobileTicket from "./MobileTicket";
import Navbar from "./Navbar";

export default function Lunchticket() {
    let isMobile = false;
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        isMobile = true;
    }    
    return (
        <div>
            <Navbar />
            <div id="LetterHead"></div>
            {!isMobile ? <DesktopTicket /> : <MobileTicket />}
        </div>
    )
}