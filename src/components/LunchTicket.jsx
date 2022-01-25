import React from "react";
import DesktopTicket from "./DesktopTicket";
import MobileTicket from "./MobileTicket";

export default function Lunchticket(props) {
    let isMobile = false;
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        isMobile = true;
    }    
    return (
        <div>            
            {!isMobile ? <DesktopTicket user={props.user}/> : <MobileTicket user={props.user}/>}
        </div>
    )
}