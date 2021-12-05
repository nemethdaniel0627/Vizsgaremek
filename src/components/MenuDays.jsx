import React from "react";

export default function MenuDays(props) {
    return (
        <label className={"menu--day-table--meals " + (props.notDay ? "menu--day-table--legend" : "") + (props.disabledDay ? "disabled-day" : "")} htmlFor={`menucheck_${props.id}`} id={props.id} >            
            <h3 className="menu--day-table--header">{props.dayName}</h3>
            <span>{props.breakfast}</span>
            <span>{props.elevens}</span>
            <span>{props.lunch}</span>
            <span>{props.snack}</span>
            <span>{props.dinner}</span>
        </label>
    )
}