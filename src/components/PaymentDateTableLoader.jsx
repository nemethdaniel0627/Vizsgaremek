import React from "react";

var date = new Date();

export default function DateLoader(props) {
  return (
    <td
      className={
        date.getDate() === props.day &&
        props.month !== "-1"
          ? "cal-today"
          : ""
      }
    >
      <table
        className={
          "cal-date-meals" +
          (date.getMonth() + 1 !== props.month
            ? " text-secondary"
            : " fw-bold text-light")
        }
      >
        <thead>
          <th className="cal-date">{props.day}</th>
        </thead>
        <tbody className={"meal_" + props.row + " cal-meals-display"}>
          <tr className={"cal-meals mb-2 d-" + (props.breakfast ? "block" : "none")}>
            <td>{props.breakfast}</td>
            <hr className={"d-" + (props.beforeLunch || props.dinner ? "block" : "none")}/>
          </tr>
          <tr className={"cal-meals mb-2 d-" + (props.beforeLunch ? "block" : "none")}>
            <td>{props.beforeLunch}</td>
            <hr className={"d-" + (props.lunch ? "block" : "none")}/>
          </tr>
          <tr className={"cal-meals mb-2 d-" + (props.lunch ? "block" : "none")}>
            <td>{props.lunch}</td>
            <hr className={"d-" + (props.snack || props.dinner ? "block" : "none")}/>
          </tr>
          <tr className={"cal-meals mb-2 d-" + (props.snack ? "block" : "none")}>
            <td>{props.snack}</td>
            <hr className={"d-" + (props.dinner ? "block" : "none")}/>
          </tr>
          <tr className={"cal-meals d-" + (props.dinner ? "block" : "none")}>
            <td>{props.dinner}</td>
          </tr>
        </tbody>
      </table>
    </td>
  );
}




