import React from "react";
import Desktop from "../layouts/AccountPageDesktop";
import Mobile from "../layouts/AccountPageMobile";

export default function Page(user)
{

  let isMobile = false;
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        isMobile = true;
    }

    return(
        <div>
          {!isMobile ? <Desktop user = {user}/> : <Mobile user={user}/>}
          
        </div>
    );
}