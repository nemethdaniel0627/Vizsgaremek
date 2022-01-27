import React, { useState } from "react";

export default function PaymentOptionCard(props) {
  const [modify, cheking] = useState(false);
  const [type] = useState(props.name);

  function btnClick(event) {
    cheking(!modify);
    props.btnClick(event);
  }

  console.log(props.mobile);

  return (
    <div className={"card" + (props.modify ? " card-edit" : " card-hover")}>
      <div className="pt-3">
        <h1 className={"text-light card-header-text " + (props.mobile === true ? "mobile-h1-name" : "")}>{props.name}</h1>
        <hr />
      </div>
      <div className="card-price text-center pt-3">
        <h2 className="text-info">{props.price} Ft / hó</h2>
      </div>
      <ul>
        {props.breakfast ? <li>Reggeli</li> : ""}
        {props.snackBefore ? <li>Tízórai</li> : ""}
        {props.lunch ? <li>Ebéd</li> : ""}
        {props.snackAfter ? <li>Uzsonna</li> : ""}
        {props.dinner ? <li>Vacsora</li> : ""}
      </ul>

      <button
        className={"btn d-flex mx-auto"}
        onClick={btnClick}
        id={"btn_" + props.name}
      >
        {props.modify ? "Módosítás" : "Kiválasztás"}
      </button>
    </div>
  );
}
