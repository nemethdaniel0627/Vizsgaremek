import React from "react";

export default function MenuDays(props) {
    return (
        <div id={props.id} className="menu--day-table">
            <h3 className="menu--day-table--header">{props.dayName}</h3>
            <span className="menu--day-table--appetizer">{props.appetizer}</span>
            <span className="menu--day-table--main-course">{props.mainCourse}</span>
        </div>
    )
}