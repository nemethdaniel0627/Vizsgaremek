import React from "react";
import AccountPageDesktop from "../layouts/AccountPageDesktop";
import AccountPageMobile from "../layouts/AccountPageMobile";

export default function Page(props)
{

  let isMobile = false;
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        isMobile = true;
    }

    return(
        <div>
          {!isMobile ? <AccountPageDesktop user = {props.user}/> : <AccountPageMobile user={props.user}/>}
          
        </div>
    );
}