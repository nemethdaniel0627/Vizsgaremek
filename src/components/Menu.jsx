import React, { useEffect, useState } from "react";
import MenuDays from "./MenuDays";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import axios from "axios";
import { URL } from "../utils/constants";

export default function Menu(props) {
    const [displayWeek, setDisplayWeek] = useState();
    const [firstDay, setFirstDay] = useState();
    const [menu, setMenu] = useState([]);

    const dayNames = ["Hétfő", "Kedd", "Szerda", "Csütörtök", "Péntek"]

    function currentDayColorize() {

        const day = new Date().getDay();
        let currentDay;
        if (day === 6 || day === 0) {
            currentDay = document.getElementById("day-" + 1);
        }
        else currentDay = document.getElementById("day-" + day);
        if (currentDay) {
            currentDay.classList.toggle("menu--day-selected");
        }
    }

    function setCurrentWeek(date) {
        const year = date.getFullYear();
        const month = date.getMonth();
        const startDay = new Date(year, month, ((date.getDate()) - (date.getDay() - 1)));
        setFirstDay(`${year}-${(startDay.getMonth() + 1) < 10 ? "0" : ""}${(startDay.getMonth() + 1)}-${startDay.getDate() < 10 ? "0" : ""}${startDay.getDate()}`);
        const endDay = new Date(year, month, ((date.getDate()) - (date.getDay() - 1)) + 4)
        let finalString = `${year}.${(startDay.getMonth() + 1) < 10 ? "0" : ""}${(startDay.getMonth() + 1)}.${startDay.getDate() < 10 ? "0" : ""}${startDay.getDate()} - ${(endDay.getMonth() + 1) < 10 ? "0" : ""}${(endDay.getMonth() + 1)}.${endDay.getDate() < 10 ? "0" : ""}${endDay.getDate()}`;

        setDisplayWeek(finalString);
        return finalString;
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

    useEffect(() => {
        if (menu.length === 0) {
            axios.get(`${URL}/etlap`)
                .then((response) => {                    
                    setMenu(response.data);
                    currentDayColorize();
                    setCurrentWeek(new Date());
                })
                .catch((error) => {
                    console.log(error);
                })
        }
        else {
            currentDayColorize();
            setCurrentWeek(new Date());
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        if (new Date(firstDay) <= new Date()) {
            const firstArrow = document.getElementById("weekArrow-1");
            if (firstArrow) firstArrow.classList.add("hidden");
        }
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


            <div className="menu--wrapper">
                <MenuDays id="day-0"
                    notDay={true}
                    breakfast="Reggeli"
                    elevens="Tízórai"
                    lunch="Ebéd"
                    snack="Uszonna"
                    dinner="Vacsora" />
                {menu.map((meal, index) => {
                    return <div key={`div_day-${index + 1}`} className="menu--container">
                        {props.cancel ? <input key={`menucheck_day-${index + 1}`} className="menu--day-table--input" type="checkbox" id={`menucheck_day-${index + 1}`} /> : ""}
                        <MenuDays
                        key={`day-${index + 1}`}
                        id={`day-${index + 1}`}
                        dayName={dayNames[index]}
                        breakfast={meal[0]}
                        elevens={meal[1]}
                        lunch={meal[2]}
                        snack={meal[3]}
                        dinner={meal[4]}
                        clickable={props.cancel}
                        disabledDay={props.disabledDays.includes(index+1)} />
                    </div>
                })}

            </div>
        </div>
    )
}