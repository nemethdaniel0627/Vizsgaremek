import React, { useEffect } from "react";
import MenuDays from "./MenuDays";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

export default function Menu(props) {
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

    function setCurrentWeek() {
        const year = new Date().getFullYear();
        const month = new Date().getMonth();
        const startDay = new Date(year, month, ((new Date().getDate()) - (new Date().getDay() - 1)));
        const endDay = new Date(year, month, ((new Date().getDate()) - (new Date().getDay() - 1)) + 4)
        let finalString = `${year}.${(startDay.getMonth() + 1) < 10 ? "0" : ""}${(startDay.getMonth() + 1)}.${startDay.getDate() < 10 ? "0" : ""}${startDay.getDate()} - ${(endDay.getMonth() + 1) < 10 ? "0" : ""}${(endDay.getMonth() + 1)}.${endDay.getDate() < 10 ? "0" : ""}${endDay.getDate()}`;
        const firstArrow = document.getElementById("weekArrow-1");
        if (firstArrow) firstArrow.classList.add("hidden");
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
        switch (arrow) {
            case "weekArrow-1":
                if (firstArrow) firstArrow.classList.add("hidden");
                break;

            case "weekArrow-2":
                if (firstArrow) firstArrow.classList.remove("hidden");
                break;

            default:
                break;
        }

    }

    useEffect(() => {
        currentDayColorize();
        setCurrentWeek();
    })

    return (
        <div className="menu">
            <h2 className="menu--header">
                {props.header}
                <span className="menu--week-header">
                    <FontAwesomeIcon className="menu--week-header--icon hidden" onClick={weekChange} id="weekArrow-1" icon={faChevronLeft} />
                    {setCurrentWeek()}
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
                <MenuDays id="day-1"
                    dayName="Hétfő"
                    breakfast="asd"
                    elevens="Meggyes almaleves"
                    lunch="asdasd"
                    snack="BBQ-s sült csirkecomb Rizs Káposztasaláta"
                    dinner="asdlasdé" />
                <MenuDays id="day-2"
                    dayName="Kedd"
                    breakfast="asd"
                    elevens="Meggyes almaleves"
                    lunch="asdasd"
                    snack="BBQ-s sült csirkecomb Rizs Káposztasaláta"
                    dinner="asdlasdé" />
                <MenuDays id="day-3"
                    dayName="Szerda"
                    breakfast="asd"
                    elevens="Meggyes almaleves"
                    lunch="asdasd"
                    snack="BBQ-s sült csirkecomb Rizs Káposztasaláta"
                    dinner="asdlasdé" />
                <MenuDays id="day-4"
                    dayName="Csütörtök"
                    breakfast="asd"
                    elevens="Meggyes almaleves"
                    lunch="asdasd"
                    snack="BBQ-s sült csirkecomb Rizs Káposztasaláta"
                    dinner="asdlasdé" />
                <MenuDays id="day-5"
                    dayName="Péntek"
                    breakfast="asd"
                    elevens="Meggyes almaleves"
                    lunch="asdasd"
                    snack="BBQ-s sült csirkecomb Rizs Káposztasaláta"
                    dinner="asdlasdé" />
            </div>
        </div>
    )
}