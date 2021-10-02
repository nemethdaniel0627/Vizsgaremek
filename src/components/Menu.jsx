import React, { useEffect } from "react";
import MenuDays from "./MenuDays";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

export default function Menu(props) {
    function currentDayColorize() {

        const day = new Date().getDay();
        let currentDay;
        if (day === 6 || day === 7) {
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
        return finalString;
    }

    useEffect(() => {
        currentDayColorize();
        setCurrentWeek();
    })

    return (
        <div className="menu">
            <h2 className="menu--header">
                Étlap
                <span className="menu--week-header">
                    <span id="weekArrow-1" className="menu--week-header--icon"><FontAwesomeIcon icon={faChevronLeft}/></span>
                    {setCurrentWeek()}
                    <span id="weekArrow-2" className="menu--week-header--icon"><FontAwesomeIcon icon={faChevronRight}/></span>
                </span>
            </h2>
            

            <div className="menu--wrapper">
                <MenuDays id="day-1" dayName="Hétfő" appetizer="Meggyes almaleves" mainCourse="BBQ-s sült csirkecomb Rizs Káposztasaláta" />
                <MenuDays id="day-2" dayName="Kedd" appetizer="Meggyes almaleves" mainCourse="BBQ-s sült csirkecomb Rizs Káposztasaláta" />
                <MenuDays id="day-3" dayName="Szerda" appetizer="Meggyes almaleves" mainCourse="BBQ-s sült csirkecomb Rizs Káposztasaláta" />
                <MenuDays id="day-4" dayName="Csütörtök" appetizer="Meggyes almaleves" mainCourse="BBQ-s sült csirkecomb Rizs Káposztasaláta" />
                <MenuDays id="day-5" dayName="Péntek" appetizer="Meggyes almaleves" mainCourse="BBQ-s sült csirkecomb Rizs Káposztasaláta" />
            </div>
        </div>
    )
}