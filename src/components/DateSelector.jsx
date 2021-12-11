import React, { useEffect, useState } from "react";
import DateSelectorInput from "./DateSelectorInputs";
import SelectedDate from "./SelectedDate";

export default function DateSelector() {
  const [justOneDay, setJustOneDay] = useState(false);
  const [startInputValue, setStartInputValue] = useState("");
  const [endInputValue, setEndInputValue] = useState("");

  function justOneDayChange() {
    setJustOneDay(!justOneDay);
  }  

  function dateInputChange(event) {
      const inputId = event.target.attributes[1].value;
      const inputValue = event.target.value;
      switch (inputId) {
          case "startDate":
              if (new Date(inputValue) > new Date(endInputValue)) {
                  setStartInputValue(endInputValue);
                  setEndInputValue(inputValue)
              }
              else setStartInputValue(inputValue);
              break;
          case "endDate":
              if (new Date(inputValue) < new Date(startInputValue)) {
                  setEndInputValue(startInputValue);
                  setStartInputValue(inputValue);
              }
              else setEndInputValue(inputValue);
              break;

          default:
              break;
      }
  }

  function showSelectedDate() {

  }

  return (
    <div className="date-selector">
      <div className="row w-100">
        <div className="col-sm-12 col-lg-12 mb-5 w-100 mt-2 date-selector--col">
          <h1 className="menu--header">Lemondás</h1>
        </div>
        
        <DateSelectorInput
          justOneDayOnChange={justOneDayChange}
          justOneDayValue={justOneDay}
          disabled={justOneDay} 
          inputChange={dateInputChange}         
          startInputValue={startInputValue}
          endInputValue={endInputValue} />        
        <div className="col-lg-12 col-sm-12 date-selector--col">
          <input type="button" name="ResignBTN" id="ResignBTN" className="btn btn-success mt-5 date-selector--input" value="Lemondás" />
        </div>
      </div>
    </div>
  )
}