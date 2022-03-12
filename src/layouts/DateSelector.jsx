import React, { useEffect, useState } from "react";
import DateSelectorInput from "../components/DateSelectorInputs";
import Chips from "../components/Chips";
import modules from "../helpers/modules";

export default function DateSelector(props) {
  const [justOneDay, setJustOneDay] = useState(false);
  const [startInputValue, setStartInputValue] = useState("");
  const [endInputValue, setEndInputValue] = useState("");
  const [selectedDates, setSelectedDates] = useState([]);

  function justOneDayChange() {
    setJustOneDay(!justOneDay);
    if (startInputValue) {
      showSelectedDate(true);
      setStartInputValue("");
    }
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

  function sameDateCheck() {
    let hasInterval = false;
    let returnValue;
    console.log(startInputValue);
    console.log(selectedDates.includes(startInputValue.replaceAll("-", ".")));
    selectedDates.forEach(date => {
      if (date.includes("-")) hasInterval = true;
    })
    if (hasInterval) {
      let addDate = undefined;
      selectedDates.sort().some((date, index) => {
        console.log(date);
        if (date.includes("-")) {
          if (endInputValue) {
            const tmpStart = date.toString().split("-")[0].trim();
            const tmpEnd = date.toString().split("-")[1].trim();
            if (
              modules.convertDateWithDash(new Date(tmpStart)) >= modules.convertDateWithDash(new Date(startInputValue)) &&
              modules.convertDateWithDash(new Date(tmpEnd)) <= modules.convertDateWithDash(new Date(endInputValue))
            ) {
              const tmpSelectedDates = selectedDates;
              tmpSelectedDates.splice(index, 1);
              const dateInterval = `${startInputValue.replaceAll("-", ".")} - ${endInputValue.replaceAll("-", ".")}`;
              tmpSelectedDates.push(dateInterval);
              setSelectedDates(tmpSelectedDates);
              returnValue = false;
            }
            else if (
              modules.convertDateWithDash(new Date(tmpStart)) >= modules.convertDateWithDash(new Date(startInputValue)) &&
              modules.convertDateWithDash(new Date(tmpEnd)) >= modules.convertDateWithDash(new Date(endInputValue)) &&
              modules.convertDateWithDash(new Date(tmpStart)) <= modules.convertDateWithDash(new Date(endInputValue))
            ) {
              const tmpSelectedDates = selectedDates;
              tmpSelectedDates.splice(index, 1);
              const dateInterval = `${startInputValue.replaceAll("-", ".")} - ${tmpEnd}`;
              tmpSelectedDates.push(dateInterval);
              setSelectedDates(tmpSelectedDates);
              returnValue = false;
            }
            else if (
              modules.convertDateWithDash(new Date(tmpStart)) <= modules.convertDateWithDash(new Date(startInputValue)) &&
              modules.convertDateWithDash(new Date(tmpEnd)) <= modules.convertDateWithDash(new Date(endInputValue)) &&
              modules.convertDateWithDash(new Date(tmpEnd)) >= modules.convertDateWithDash(new Date(startInputValue))
            ) {
              const tmpSelectedDates = selectedDates;
              tmpSelectedDates.splice(index, 1);
              const dateInterval = `${tmpStart} - ${endInputValue.replaceAll("-", ".")}`;
              tmpSelectedDates.push(dateInterval);
              setSelectedDates(tmpSelectedDates);
              returnValue = false;
            }
            else {
              console.log("another");
              returnValue = true;
            }
          }
          else {
            const tmpStart = date.toString().split("-")[0].trim();
            console.log(tmpStart);
            const tmpEnd = date.toString().split("-")[1].trim();
            console.log(modules.convertDateWithDash(new Date(tmpEnd)));
            console.log(modules.convertDateWithDash(new Date(startInputValue)));
            if (modules.convertDateWithDash(new Date(tmpEnd)) === modules.convertDateWithDash(new Date(startInputValue))
              || modules.convertDateWithDash(new Date(startInputValue)) === modules.convertDateWithDash(new Date(tmpStart))) {
              returnValue = false;
              addDate = false;
            }
            else if (modules.convertDateWithDash(new Date(tmpStart)) > modules.convertDateWithDash(new Date(startInputValue))
              || modules.convertDateWithDash(new Date(tmpEnd)) < modules.convertDateWithDash(new Date(startInputValue))) {
              console.log("anyad itt vagyok");
              addDate = true;
              returnValue = false;
            }
            else {
              addDate = false;
              returnValue = false
            }
          }
        }
        console.log(`returh ${returnValue}`);
        return addDate === false;
      })
      if (addDate) {
        setSelectedDates((prevDates) => {
          return [...prevDates, startInputValue.replaceAll("-", ".")];
        });
      }
    }
    else if (selectedDates.includes(startInputValue.replaceAll("-", "."))) {
      console.log("include");
      returnValue = false;
    }
    else {
      console.log("else");
      if (selectedDates.length !== 0) {
        selectedDates.sort().forEach((date, index) => {
          console.log(date);
          if (endInputValue) {
            if (
              modules.convertDateWithDash(new Date(date)) >= modules.convertDateWithDash(new Date(startInputValue)) &&
              modules.convertDateWithDash(new Date(date)) <= modules.convertDateWithDash(new Date(endInputValue))
            ) {
              console.log("ige");
              const tmpSelectedDates = selectedDates;
              tmpSelectedDates.splice(index, 1);
              const dateInterval = `${startInputValue.replaceAll("-", ".")} - ${endInputValue.replaceAll("-", ".")}`;
              tmpSelectedDates.push(dateInterval);
              setSelectedDates(tmpSelectedDates);
              returnValue = false;
            }
          }
          else {
            returnValue = true;
            console.log(returnValue);
          }
        });
      }
      else returnValue = true;
    }
    return returnValue;
  }

  function showSelectedDate(manuJustOneDay = null) {
    if (justOneDay || manuJustOneDay === true) {
      const sameDate = sameDateCheck();
      console.log(sameDate);
      console.log((!selectedDates.includes(startInputValue.replaceAll("-", ".")) && sameDate));
      if ((!selectedDates.includes(startInputValue.replaceAll("-", ".")) && sameDate))
        setSelectedDates((prevDates) => {
          return [...prevDates, startInputValue.replaceAll("-", ".")];
        });
    }
    else if (startInputValue === endInputValue) {
      const sameDate = sameDateCheck();
      if (!sameDate)
        setSelectedDates((prevDates) => {
          return [...prevDates, startInputValue.replaceAll("-", ".")];
        });
    }
    else {
      console.log("ad");
      const samdeDate = sameDateCheck();
      const dateInterval = `${startInputValue.replaceAll("-", ".")} - ${endInputValue.replaceAll("-", ".")}`;
      if ((!selectedDates.includes(dateInterval) && samdeDate))
        setSelectedDates((prevDates) => {
          return [...prevDates, dateInterval];
        });
    }
    // setSelectedDates(tmpDates);
  }

  function closeDate(index) {
    setSelectedDates((prevDates) => {
      if (index > -1) {
        prevDates.splice(index, 1);
      }
      return [...prevDates];
    });
  }

  useEffect(() => {
    if (justOneDay && startInputValue !== "") {
      showSelectedDate();
      setStartInputValue("");
    }
    else if (endInputValue !== "") {
      showSelectedDate();
      setStartInputValue("");
      setEndInputValue("");
    }
    props.getDates(selectedDates);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [startInputValue])

  useEffect(() => {
    if (startInputValue !== "") {
      showSelectedDate();
      setStartInputValue("");
      setEndInputValue("");
    }
    props.getDates(selectedDates);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [endInputValue])

  return (
    <div className="date-selector">
      <div className="row w-100">
        <div className="col-sm-12 col-lg-12 mb-5 w-100 mt-2 date-selector--col">
          <h2 className="menu--header">Lemondás</h2>
        </div>
        {
          selectedDates.sort().map((date, index) => {
            return <Chips key={`selectedDate-${index}`} removeIndex={index} date={date} closeDate={closeDate} />
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