import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

export default function Chips(props) {
    
    function closeSelect(event) {        
        const element = document.getElementById(`select_${props.date}`);
        if (element) element.style.display = "none";
    }

    return (
        <div className="selected-date--container" id={`select_${props.date}`}>
            {props.date}
            <FontAwesomeIcon onClick={closeSelect} className="selected-date--close" icon={faTimes} />
        </div>
    );
}