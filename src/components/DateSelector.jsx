import React, { useEffect, useState } from "react";
import DateSelectorInput from "./DateSelectorInputs";
import Chips from "./Chips";

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
    selectedDates.forEach(date => {
      if (date.includes("-")) hasInterval = true;
    })
    if (hasInterval) {
      selectedDates.sort().forEach((date, index) => {
        if (date.includes("-")) {
          const tmpStart = date.toString().split("-")[0].trim();
          const tmpEnd = date.toString().split("-")[1].trim();
          if (!(new Date(tmpStart) < new Date(startInputValue) && new Date(tmpEnd) > new Date(startInputValue))) {
            setSelectedDates((prevDates) => {
              return [...prevDates, startInputValue.replaceAll("-", ".")];
            });
            return false;
          }

        }
      })
    }
    return true;
  }



  function showSelectedDate(manuJustOneDay = null) {
    if (justOneDay) {
      const sameDate = sameDateCheck();
      console.log(sameDate);
      if (!selectedDates.includes(startInputValue.replaceAll("-", ".")) && sameDate)
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
      const dateInterval = `${startInputValue.replaceAll("-", ".")} - ${endInputValue.replaceAll("-", ".")}`;
      if (!selectedDates.includes(dateInterval))
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
          <h1 className="menu--header">Lemondás</h1>
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