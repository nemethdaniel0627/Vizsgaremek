import React, { useEffect, useState } from "react";
import DateSelectorInput from "./DateSelectorInputs";
import Chips from "./Chips";

export default function DateSelector() {
  const [justOneDay, setJustOneDay] = useState(false);
  const [startInputValue, setStartInputValue] = useState("");
  const [endInputValue, setEndInputValue] = useState("");
  const [selectedDates, setSelectedDates] = useState([]);

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
    if (justOneDay) {
      setSelectedDates((prevDates) => {
        return [...prevDates, startInputValue.replaceAll("-", ".")];
      });
    }
    else if (startInputValue === endInputValue) {
      setSelectedDates((prevDates) => {
        return [...prevDates, startInputValue.replaceAll("-", ".")];
      });
    }
    let tmpDates = [];
    selectedDates.sort().forEach((date, index) => {
      if (new Date(date) < new Date(startInputValue) && new Date(date) > new Date(endInputValue)) {
        tmpDates.push(date);
      }
      else if (new Date(date) > new Date(endInputValue)) {
        tmpDates.push(`${startInputValue.replaceAll("-", ".")} - ${endInputValue.replaceAll("-", ".")}`);
        tmpDates.push(date);
      }
    })
    // const dateInterval = `${startInputValue.replaceAll("-", ".")} - ${endInputValue.replaceAll("-", ".")}`;
    // setSelectedDates((prevDates) => {
    //   return [...prevDates, dateInterval];
    // });
    setSelectedDates(tmpDates);
  }

  useEffect(() => {
    if (justOneDay && startInputValue !== "") {
      showSelectedDate();
      setStartInputValue("");
    }
  }, [startInputValue])

  useEffect(() => {
    if (startInputValue !== "") {
      showSelectedDate();
      setStartInputValue("");
      setEndInputValue("");
    }
  }, [endInputValue])

  return (
    <div className="date-selector">
      <div className="row w-100">
        <div className="col-sm-12 col-lg-12 mb-5 w-100 mt-2 date-selector--col">
          <h1 className="menu--header">Lemondás</h1>
        </div>
        {
          selectedDates.sort().map((date, index) => {
            return <Chips key={`selectedDate-${index}`} date={date} />
          })
        }
        <DateSelectorInput
          justOneDayOnChange={justOneDayChange}
          justOneDayValue={justOneDay}
          disabled={justOneDay}
          inputChange={dateInputChange}
          startInputValue={startInputValue}
          endInputValue={endInputValue} />
      </div>
    </div>
  )
}