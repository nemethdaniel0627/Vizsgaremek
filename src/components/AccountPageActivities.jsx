import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle, faClock, faTimesCircle } from "@fortawesome/free-solid-svg-icons";

export default function Activities(props)
{
    return(
        <div className="act">
            <div className="container">
                <div className="row">
                    <div className={"col-2 "  + props.type}>
                        {props.type==="pay" ? 
                        <FontAwesomeIcon icon={faCheckCircle} className="fs-1"/> : 
                        props.type==="cancel" ? 
                        <FontAwesomeIcon icon={faTimesCircle} className="fs-1"/> :
                        <FontAwesomeIcon icon={faClock} className="fs-1"/> 
                        }
                    </div>
                    <div className="col-10">
                        <h3 className="act-name">{props.activity}</h3>
                        <h5 className="act-date">{props.date}</h5>
                    </div>
                </div>
            </div>
        </div>
    );
}