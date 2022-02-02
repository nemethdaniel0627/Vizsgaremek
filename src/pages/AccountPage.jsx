import React from "react";
import { useState } from "react";
import Desktop from "../layouts/AccountPageDesktop";
import Mobile from "../layouts/AccountPageMobile";

export default function Page(user) {

  const [isMobile, setMobile] = useState(false);

  if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    setMobile(true);
  }

  window.addEventListener('resize', Resizing)

  function Resizing(){
    setMobile(window.matchMedia("(max-width: 768px)").matches);
  }

  return (
    <div>
      {!isMobile ? <Desktop user={user} /> : <Mobile user={user} />}

    </div>
  );
}