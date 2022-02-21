import React from "react";
import AccountPageDesktop from "../layouts/AccountPageDesktop";
import AccountPageMobile from "../layouts/AccountPageMobile";
import { useState } from "react";

export default function Page(props) {
  const [isLittleScreen, setScreen] = useState(false);


  let isMobile = false;

  if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    isMobile = true;
  }

  if (isMobile === false) {
    window.addEventListener('resize', Resizing)
  }

  function Resizing() {
    setScreen(window.matchMedia("(max-width: 768px)").matches);
  }

  return (
    <div>
      {isMobile ? <AccountPageMobile user={props.user} /> :
        !isLittleScreen ? <AccountPageDesktop user={props.user} /> : <AccountPageMobile user={props.user} />
      }
    </div>
  );
}