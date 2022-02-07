import React from "react";
import { useState } from "react";
import Desktop from "../layouts/AccountPageDesktop";
import Mobile from "../layouts/AccountPageMobile";

export default function Page(user) {

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
      {isMobile ? <Mobile user={user} /> : 
        !isLittleScreen ? <Desktop user={user} /> : <Mobile user={user} />
      }
    </div>
  );
}