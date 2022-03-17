import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Tooltip from "react-tooltip";
import {
  faCheckCircle,
  faClock,
  faInfoCircle,
  faTimesCircle,
  faUserCircle,
} from "@fortawesome/free-solid-svg-icons";

function DateSplit(date) {
  try {
    return date.split(" ")[0];
  } catch (error) {
    return "";
  }
  
}

export default function Activities(props) {
  return (
    <div className="act">
      <div className="container">
        <div className="row">
          <div className={"col-2 " + props.type}>
            {props.type === "pay" ? (
              <FontAwesomeIcon icon={faCheckCircle} className="fs-1" />
            ) : props.type === "cancel" ? (
              <FontAwesomeIcon icon={faTimesCircle} className="fs-1" />
            ) : props.type === "modify" ? (
              <FontAwesomeIcon icon={faUserCircle} className="fs-1" />
            ) : (
              <FontAwesomeIcon icon={faClock} className="fs-1" />
            )}
          </div>
          <div className="col-10">
              <div data-tip={props.descript}>
                <h3 className="act-name">{props.activity}</h3>
              </div>
              <Tooltip></Tooltip>
            
            {props.type === "cancel" ? 
            
            <div className="act-dates">
              <p>{props.dates}</p>

            </div> : <></>}

            <h5 className="act-date">{props.date}</h5>
          </div>
        </div>
      </div>
    </div>
  );
}
