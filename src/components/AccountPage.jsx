import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle, faClock, faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import Desktop from "./AccountPageDesktop";
import Mobile from "./AccountPageMobile";

export default function Page(props)
{

  let isMobile = false;
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        isMobile = true;
    }

    return(
        <div>
          {!isMobile ? <Desktop/> : <Mobile/>}
        </div>
    );
}