import React from "react";
import { useState } from "react";

var date = new Date();

export default function DateLoader(props) {

  const [select, changeSelect] = useState(false);
  

  function SelectedDate(){
    if(props.date.month === "-1" || props.indexKey === 6){
      changeSelect(false);
    }else{
      changeSelect(!select);
      props.date.cancel = !select;
      console.log(props.date.cancel);
    }
  }

  return (
    <td
      className={
        date.getDate() === props.date.day &&
          props.date.month !== "-1"
          ? ""
          : ""
      }
    >
      <table
        className={
          "cal-date-meals" +
          ((date.getMonth() + 2 > 12 ? 1 : date.getMonth() + 2) !== props.date.month || props.indexKey === 6
            ? " text-secondary"
            : " fw-bold text-light")
        }
      >
        <thead>
          <tr>
            <th className={"cal-date" + (select ? " select" : "")} onClick={SelectedDate}>{props.date.day}</th>
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




