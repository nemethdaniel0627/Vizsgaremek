import { faCalendar } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

export default function DateSelectorInput(props) {
    return (
        <div className="date-selector--input-container  ">
            <div className="date-selector--input--col mt-3" id="DayPicker">
                <h4 className="date-selector--text">Mettől:</h4>
                <div className="date-selector--input--wrapper">
                    <FontAwesomeIcon className="date-selector--input--icon" icon={faCalendar} />
                    <input onChange={props.inputChange} value={props.startInputValue} type="date" id="startDate" className="form-control date-selector--input" />
                </div>
                <input onChange={props.justOneDayOnChange} value={props.justOneDayValue} type="checkbox" name="JustOneDay" id="JustOneDay" className="form-check-input" /> Csak egy nap!
            </div>
            <div className="date-selector--input--col d-flex align-items-center flex-column">
                <h4 className="mt-3 date-selector--text">Meddig:</h4>
                <div className="date-selector--input--wrapper">
                    <FontAwesomeIcon className="date-selector--input--icon" icon={faCalendar} />
                    <input onChange={props.inputChange} value={props.endInputValue} type="date" id="endDate" className={`form-control date-selector--input`} disabled={props.justOneDayValue} />
                </div>
            </div>
        </div>
    );
}