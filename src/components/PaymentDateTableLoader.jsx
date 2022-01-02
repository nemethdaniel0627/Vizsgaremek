import React from "react";
import { useState } from "react";

var date = new Date();

export default function DateLoader(props) {

  const [select, changeSelect] = useState(false);

  function SelectedDate(){
    if(props.month === "-1"){
      changeSelect(false);
    }else{
      changeSelect(!select);
    }
  }

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
          <tr>
            <th className={"cal-date" + (select ? " select" : "")} onClick={SelectedDate}>{props.day}</th>
          </tr>
        </thead>
        <tbody className={"meal_" + props.row + " cal-meals-display"}>
          <tr className={"cal-meals mb-2 d-" + (props.breakfast ? "block" : "none")}>
            <td className="w-100">{props.breakfast}
              <hr className={"d-" + (props.beforeLunch || props.dinner ? "block" : "none")} />
            </td>
          </tr>
          <tr className={"cal-meals mb-2 d-" + (props.beforeLunch ? "block" : "none")}>
            <td>{props.beforeLunch}
            <hr className={"d-" + (props.lunch ? "block" : "none")} />
            </td>
          </tr>
          <tr className={"cal-meals mb-2 d-" + (props.lunch ? "block" : "none")}>
            <td>{props.lunch}
            <hr className={"d-" + (props.snack || props.dinner ? "block" : "none")} />
            </td>
          </tr>
          <tr className={"cal-meals mb-2 d-" + (props.snack ? "block" : "none")}>
            <td>{props.snack}
            <hr className={"d-" + (props.dinner ? "block" : "none")} />
            </td>
          </tr>
          <tr className={"cal-meals d-" + (props.dinner ? "block" : "none")}>
            <td>{props.dinner}</td>
          </tr>
        </tbody>
      </table>
    </td>
  );
}




