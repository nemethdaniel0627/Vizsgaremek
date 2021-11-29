import React from "react";

export default function MenuDays(props) {
    return (
        <div id={props.id} className={"menu--day-table " + (props.notDay ? "menu--day-table--legend" : "")}>
            <h3 className="menu--day-table--header">{props.dayName}</h3>
            <span className="menu--day-table--appetizer">{props.breakfast}</span>
            <span className="menu--day-table--appetizer">{props.elevens}</span>
            <span className="menu--day-table--appetizer">{props.lunch}</span>
            <span className="menu--day-table--main-course">{props.snack}</span>
            <span className="menu--day-table--appetizer">{props.dinner}</span>
        </div>
    )
}