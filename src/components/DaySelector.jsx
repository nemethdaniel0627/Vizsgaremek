import React from "react";

export default function DaySelector(props) {
    return (
        <div>
            <input onChange={props.onChange} className="menu--day-selector--input" type="radio" name="dayselector" id={props.id} />
            <label className="menu--day-selector--btn menu--day-table--header" htmlFor={props.id}>{props.dayName}</label>
        </div>
    );
}