
import React, { useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDoubleDown, faAngleDoubleUp } from "@fortawesome/free-solid-svg-icons";
import DateLoader from "./PaymentDateTableLoader";
import PaymentTableDateArray from "./PaymentTableDatesArray";

export default function PaymentDateTable(props) {
    const date = new Date();
    const monthNames = ["Január", "Február", "Március", "Április", "Május", "Június",
        "Július", "Augusztus", "Szeptember", "October", "November", "December"
    ];
    const forFor = [0, 1, 2, 3, 4, 5];
    const dates = PaymentTableDateArray();


    return (
        <div>
            <div className="w-75 mx-auto cal text-light">
                <h1><span className="cal-year">{date.getFullYear()}</span>. <span className="cal-month">{monthNames[date.getMonth()]}</span></h1>
                <table className="table fs-4 ">
                    <thead className="">
                        <tr className="cal-header text-light">
                            <th>Hétfő</th>
                            <th>Kedd</th>
                            <th>Szerda</th>
                            <th>Csütörtök</th>
                            <th>Péntek</th>
                            <th>Szombat</th>
                            <th className="cal-th-btn"></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            {forFor.map((day, index) => (
                                <DateLoader key={index} day={dates[day + 0 * 7].day} month={dates[day + 0 * 7].month} row='0' 
                                    breakfast={props.type === "Teljes" || props.type === "Kollégium" || props.type === "Kollégium+" ? "Reggeli" : ""} 
                                    beforeLunch={props.type === "Teljes" ? "Tízórai" : ""} 
                                    lunch={props.type !== "Kollégium" ? "Ebéd" : ""} 
                                    snack={props.type === "Teljes" ? "Uzsonna" : ""} 
                                    dinner={props.type === "Teljes" || props.type === "Kollégium" || props.type === "Kollégium+" ? "Vacsora" : ""} 
                                />
                            ))}

                            <td className="text-center">
                                <button className="cal-btn btn btn-primary" onClick={() => Opacity('0')} >
                                    <FontAwesomeIcon icon={faAngleDoubleDown} />
                                </button>
                            </td>
                        </tr>
                        <tr>
                            {forFor.map((day, index) => (
                                <DateLoader key={index} day={dates[day + 1 * 7].day} month={dates[day + 1 * 7].month} row='1' 
                                breakfast={props.type === "Teljes" || props.type === "Kollégium" || props.type === "Kollégium+" ? "Reggeli" : ""} 
                                beforeLunch={props.type === "Teljes" ? "Tízórai" : ""} 
                                lunch={props.type !== "Kollégium" ? "Ebéd" : ""} 
                                snack={props.type === "Teljes" ? "Uzsonna" : ""} 
                                dinner={props.type === "Teljes" || props.type === "Kollégium" || props.type === "Kollégium+" ? "Vacsora" : ""} 
                            />
                            ))}
                            <td className="text-center">
                                <button className="cal-btn btn btn-primary" onClick={() => Opacity('1')} >
                                    <FontAwesomeIcon icon={faAngleDoubleDown} />
                                </button>

                            </td>
                        </tr>

                        <tr>
                            {forFor.map((day, index) => (
                               <DateLoader key={index} day={dates[day + 2 * 7].day} month={dates[day + 2 * 7].month} row='2' 
                               breakfast={props.type === "Teljes" || props.type === "Kollégium" || props.type === "Kollégium+" ? "Reggeli" : ""} 
                               beforeLunch={props.type === "Teljes" ? "Tízórai" : ""} 
                               lunch={props.type !== "Kollégium" ? "Ebéd" : ""} 
                               snack={props.type === "Teljes" ? "Uzsonna" : ""} 
                               dinner={props.type === "Teljes" || props.type === "Kollégium" || props.type === "Kollégium+" ? "Vacsora" : ""} 
                           />
                            ))}
                            <td className="text-center">
                                <button className="cal-btn btn btn-primary" onClick={() => Opacity('2')} >
                                    <FontAwesomeIcon icon={faAngleDoubleDown} />
                                </button>
                            </td>
                        </tr>

                        <tr>
                            {forFor.map((day, index) => (
                                <DateLoader key={index} day={dates[day + 3 * 7].day} month={dates[day + 3 * 7].month} row='3' 
                                breakfast={props.type === "Teljes" || props.type === "Kollégium" || props.type === "Kollégium+" ? "Reggeli" : ""} 
                                beforeLunch={props.type === "Teljes" ? "Tízórai" : ""} 
                                lunch={props.type !== "Kollégium" ? "Ebéd" : ""} 
                                snack={props.type === "Teljes" ? "Uzsonna" : ""} 
                                dinner={props.type === "Teljes" || props.type === "Kollégium" || props.type === "Kollégium+" ? "Vacsora" : ""} 
                            />
                            ))}
                            <td className="text-center">
                                <button className="cal-btn btn btn-primary" onClick={() => Opacity('3')} >
                                    <FontAwesomeIcon icon={faAngleDoubleDown} />
                                </button>
                            </td>
                        </tr>

                        <tr>
                            {forFor.map((day, index) => (
                                <DateLoader key={index} day={dates[day + 4 * 7].day} month={dates[day + 4 * 7].month} row='4' 
                                breakfast={props.type === "Teljes" || props.type === "Kollégium" || props.type === "Kollégium+" ? "Reggeli" : ""} 
                                beforeLunch={props.type === "Teljes" ? "Tízórai" : ""} 
                                lunch={props.type !== "Kollégium" ? "Ebéd" : ""} 
                                snack={props.type === "Teljes" ? "Uzsonna" : ""} 
                                dinner={props.type === "Teljes" || props.type === "Kollégium" || props.type === "Kollégium+" ? "Vacsora" : ""} 
                            />
                            ))}
                            <td className="text-center">
                                <button className="cal-btn btn btn-primary" onClick={() => Opacity('4')} >
                                    <FontAwesomeIcon icon={faAngleDoubleDown} />
                                </button>
                            </td>
                        </tr>

                        <tr>
                            {forFor.map((day, index) => (
                                <DateLoader key={index} day={dates[day + 5 * 7].day} month={dates[day + 5 * 7].month} row='5' 
                                breakfast={props.type === "Teljes" || props.type === "Kollégium" || props.type === "Kollégium+" ? "Reggeli" : ""} 
                                beforeLunch={props.type === "Teljes" ? "Tízórai" : ""} 
                                lunch={props.type !== "Kollégium" ? "Ebéd" : ""} 
                                snack={props.type === "Teljes" ? "Uzsonna" : ""} 
                                dinner={props.type === "Teljes" || props.type === "Kollégium" || props.type === "Kollégium+" ? "Vacsora" : ""} 
                            />
                            ))}
                            <td className="text-center">
                                <button className="cal-btn btn btn-primary" onClick={() => Opacity('5')} >
                                    <FontAwesomeIcon icon={faAngleDoubleDown} />
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}



function Opacity(props) {
    if (document.getElementsByClassName('meal_' + props)[0].style.display === 'block') {
        for (const meals of document.getElementsByClassName('cal-meals-display')) {
            meals.style = "display: none";
        }

    } else {

        for (const meals of document.getElementsByClassName('cal-meals-display')) {
            meals.style = "display: none";
        }

        for (const meals of document.getElementsByClassName('meal_' + props)) {
            meals.style = "display: block";
        }
    }
}

function isInTheSameRow() {
    for (const meals of document.getElementsByClassName('cal-meals-display')) {
        meals.style = "display: none";
    }
    for (const item of document.getElementsByClassName('cal-meals-display')) {
        if (item.className.split(' ')[0].split('_')[1] === document.querySelector(".cal-today tbody").className.split(" ")[0].split("_")[1]) {
            item.style = "display:block";
        }
    }
}

