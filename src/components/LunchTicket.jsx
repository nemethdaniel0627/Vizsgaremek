import React from "react";
import DesktopTicket from "./DesktopTicket";
import MobileTicket from "./MobileTicket";

export default function Lunchticket() {
    let isMobile = false;
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        isMobile = true;
    }    
    return (
        <div>            
            {!isMobile ? <DesktopTicket /> : <MobileTicket />}
        </div>
    )
}