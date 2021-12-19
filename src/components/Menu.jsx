import React, { useEffect, useState } from "react";
import MenuDays from "./MenuDays";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import axios from "axios";
import { URL, allgergens } from "../utils/constants";
import DaySelector from "./DaySelector";

export default function Menu(props) {
    const [displayWeek, setDisplayWeek] = useState();
    const [firstDay, setFirstDay] = useState();
    const [menu, setMenu] = useState([]);
    const [selectedDay, setSelectedDay] = useState();
    const [weekLength, setWeekLength] = useState(4);

    const dayNames = ["Hétfő", "Kedd", "Szerda", "Csütörtök", "Péntek", "Szombat"];
    const root = document.querySelector(":root");

    function currentDayColorize() {

        const day = new Date().getDay();
        let currentDay;
        let currentDayInput;
        if (day === 6 || day === 0) {
            currentDay = document.getElementById("day-" + 1);
            setSelectedDay(day + 1);
            currentDayInput = document.getElementById("day-selector_" + 1);
        }
        else {
            currentDay = document.getElementById("day-" + day);
            setSelectedDay(day);
            currentDayInput = document.getElementById("day-selector_" + day);
        }

        if (currentDay && currentDayInput) {
            currentDay.classList.toggle("menu--day-selected");
            currentDay.classList.add("today");
            currentDayInput.checked = true;
        }
    }

    function setCurrentWeek(date) {
        const year = date.getFullYear();
        const month = date.getMonth();
        const startDay = new Date(year, month, ((date.getDate()) - (date.getDay() - 1)));
        setFirstDay(`${year}-${(startDay.getMonth() + 1) < 10 ? "0" : ""}${(startDay.getMonth() + 1)}-${startDay.getDate() < 10 ? "0" : ""}${startDay.getDate()}`);
        const endDay = new Date(year, month, ((date.getDate()) - (date.getDay() - 1)) + weekLength)
        let finalString = `${year}.${(startDay.getMonth() + 1) < 10 ? "0" : ""}${(startDay.getMonth() + 1)}.${startDay.getDate() < 10 ? "0" : ""}${startDay.getDate()} - ${(endDay.getMonth() + 1) < 10 ? "0" : ""}${(endDay.getMonth() + 1)}.${endDay.getDate() < 10 ? "0" : ""}${endDay.getDate()}`;

        setDisplayWeek(finalString);
        return finalString;
    }

    function convertDisplayWeek(date) {
        const year = date.getFullYear();
        const month = date.getMonth();
        const startDay = new Date(year, month, ((date.getDate()) - (date.getDay() - 1)));        
        const endDay = new Date(year, month, ((date.getDate()) - (date.getDay() - 1)) + weekLength);
        setDisplayWeek(`${year}.${(startDay.getMonth() + 1) < 10 ? "0" : ""}${(startDay.getMonth() + 1)}.${startDay.getDate() < 10 ? "0" : ""}${startDay.getDate()} - ${(endDay.getMonth() + 1) < 10 ? "0" : ""}${(endDay.getMonth() + 1)}.${endDay.getDate() < 10 ? "0" : ""}${endDay.getDate()}`);
    }

    function weekChange(event) {
        let arrow = event.target.attributes[8];
        if (arrow === undefined) {
            arrow = event.target.attributes[0].ownerElement.parentNode.id;
        }
        else {
            arrow = arrow.value;
        }
        const firstArrow = document.getElementById("weekArrow-1");
        let date;
        switch (arrow) {
            case "weekArrow-1":
                date = new Date(firstDay);
                date.setDate(date.getDate() - 7);
                setCurrentWeek(date);
                break;

            case "weekArrow-2":
                date = new Date(firstDay);
                date.setDate(date.getDate() + 7);
                setCurrentWeek(date);
                if (firstArrow) firstArrow.classList.remove("hidden");
                break;

            default:
                break;
        }

    }

    function daySelect(event) {
        const day = event.target.attributes[3].value.split("_")[1];
        const menuDay = document.getElementById(`day-${day}`);
        const olMenuDay = document.getElementById(`day-${selectedDay}`);
        if (menuDay && olMenuDay) {
            olMenuDay.classList.remove("menu--day-selected");
            menuDay.classList.add("menu--day-selected");
            setSelectedDay(day);
        }
    }

    useEffect(() => {
        if (menu.length === 0) {
            axios.get(`${URL}/etlap`)
                .then((response) => {
                    setMenu(response.data);
                    if (root) {
                        root.style.setProperty("--numberOfDays", response.data.length);
                    }
                    currentDayColorize();
                    setCurrentWeek(new Date());
                    setWeekLength(response.data.length - 1);
                })
                .catch((error) => {
                    console.log(error.response);
                })
        }
        else {
            currentDayColorize();
            setCurrentWeek(new Date());
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        convertDisplayWeek(new Date());        
    }, [weekLength])

    function checkNextWeek() {

    }

    function cancelSelect(event) {
        const input = document.getElementById(event.target.attributes[2].value);
        const day = document.getElementById(event.target.attributes[2].value.split("_")[1]);
        if (day && input) {
            if (input.checked) day.style.backgroundImage = "linear-gradient(rgba(255, 0, 0, 0.349), var(--bodyBackground))"
            else day.style.backgroundImage = null;
        }
    }

    useEffect(() => {
        if (new Date(firstDay) <= new Date()) {
            const firstArrow = document.getElementById("weekArrow-1");
            if (firstArrow) firstArrow.classList.add("hidden");
        }
        checkNextWeek()

    }, [firstDay])

    return (
        <div className="menu">
            <h2 className="menu--header">
                {props.header}
                <span className="menu--week-header">
                    <FontAwesomeIcon className="menu--week-header--icon hidden" onClick={weekChange} id="weekArrow-1" icon={faChevronLeft} />
                    {displayWeek}
                    <FontAwesomeIcon className="menu--week-header--icon" onClick={weekChange} id="weekArrow-2" icon={faChevronRight} />
                </span>
            </h2>

            <div className="menu--day-selector">
                {dayNames.map((day, index) => {
                    if (index <= weekLength) {
                        if (index === 2 || index === 3 || index === 5)
                            return <DaySelector
                                onChange={daySelect}
                                key={`day-selector_${index + 1}`}
                                id={`day-selector_${index + 1}`}
                                dayName={`${day[0]}${day[1]}${day[2]}`} />
                        else return <DaySelector
                            onChange={daySelect}
                            key={`day-selector_${index + 1}`}
                            id={`day-selector_${index + 1}`}
                            dayName={`${day[0]}${day[1]}`} />
                    }
                    else return "";
                })}
            </div>

            <div className="menu--wrapper">
                <div id="day-0" className="menu--day-table menu--container menu--day-table--legend">
                    <MenuDays
                        dayName="&nbsp;"
                        notDay={true}
                        breakfast="Reggeli"
                        elevens="Tízórai"
                        lunch="Ebéd"
                        snack="Uzsonna"
                        dinner="Vacsora" />
                </div>
                {menu.map((meal, index) => {
                    return (
                        <label
                            onChange={cancelSelect}
                            key={`day-${index + 1}`}
                            id={`day-${index + 1}`}
                            className={
                                "menu--day-table menu--container " +
                                (props.disabledDays.includes(index + 1) ? "disabled-day " : "") +
                                (props.cancel ? "clickable" : "")}>

                            {props.cancel
                                ? <input
                                    disabled={props.disabledDays.includes(index + 1)}
                                    key={`menucheck_day-${index + 1}`}
                                    className="menu--day-table--input"
                                    type="checkbox"
                                    id={`menucheck_day-${index + 1}`} />
                                : ""
                            }
                            <MenuDays
                                key={`aday-${index + 1}`}
                                id={`aday-${index + 1}`}
                                dayName={dayNames[index]}
                                breakfast={meal[0]}
                                elevens={meal[1]}
                                lunch={meal[2]}
                                snack={meal[3]}
                                dinner={meal[4]}
                                clickable={props.cancel}
                                inputId={`menucheck_day-${index + 1}`}
                                onChange={cancelSelect} />
                        </label>)
                })}

            </div>

            <div className="menu--allergen">
                {
                    allgergens.map((allergen, index) => {
                        return <span key={`allergen_${index}`}>{allergen} </span>
                    })
                }
            </div>
        </div>
    )
}