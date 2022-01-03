
import React, { useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import DateLoader from "./PaymentDateTableLoader";


export default function PaymentDateTable(props) {
    const date = new Date();
    const monthNames = ["Január", "Február", "Március", "Április", "Május", "Június",
        "Július", "Augusztus", "Szeptember", "October", "November", "December"
    ];
    const forFor = [0, 1, 2, 3, 4, 5, 6];
    const dates = props.dates;
    console.log(dates);


    return (
        <div>
            <div className="w-75 mx-auto cal text-light">
                <h1><span className="cal-year">{date.getMonth() + 1 > 11 ? date.getFullYear()+1 : date.getFullYear()}</span>. <span className="cal-month">{monthNames[(date.getMonth() + 1 > 11 ? 1 : date.getMonth() + 1)]}</span></h1>
                <table className="table fs-4 ">
                    <thead className="">
                        <tr className="cal-header text-light">
                            <th className="weekdays">Hétfő</th>
                            <th className="weekdays">Kedd</th>
                            <th className="weekdays">Szerda</th>
                            <th className="weekdays">Csütörtök</th>
                            <th className="weekdays">Péntek</th>
                            <th className="weekdays">Szombat</th>
                            <th className="weekdays">Vasárnap</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            {forFor.map((day, index) => (
                                <DateLoader key={index} indexKey={index} date={dates[day + 0 * 7]} row='0' 
                                    breakfast={props.type === "Teljes" || props.type === "Kollégium" || props.type === "Kollégium+" ? "Reggeli" : ""} 
                                    beforeLunch={props.type === "Teljes" ? "Tízórai" : ""} 
                                    lunch={props.type !== "Kollégium" ? "Ebéd" : ""} 
                                    snack={props.type === "Teljes" ? "Uzsonna" : ""} 
                                    dinner={props.type === "Teljes" || props.type === "Kollégium" || props.type === "Kollégium+" ? "Vacsora" : ""} 
                                />
                            ))}

                            {/* <td className="text-center">
                                <button className="cal-btn btn btn-primary" onClick={() => Opacity('0')} >
                                    <FontAwesomeIcon icon={faAngleDoubleDown} />
                                </button>
                            </td> */}
                        </tr>
                        <tr>
                            {forFor.map((day, index) => (
                                <DateLoader key={index} indexKey={index} date={dates[day + 1 * 7]} row='1' 
                                breakfast={props.type === "Teljes" || props.type === "Kollégium" || props.type === "Kollégium+" ? "Reggeli" : ""} 
                                beforeLunch={props.type === "Teljes" ? "Tízórai" : ""} 
                                lunch={props.type !== "Kollégium" ? "Ebéd" : ""} 
                                snack={props.type === "Teljes" ? "Uzsonna" : ""} 
                                dinner={props.type === "Teljes" || props.type === "Kollégium" || props.type === "Kollégium+" ? "Vacsora" : ""} 
                            />
                            ))}
                            {/* <td className="text-center">
                                <button className="cal-btn btn btn-primary" onClick={() => Opacity('1')} >
                                    <FontAwesomeIcon icon={faAngleDoubleDown} />
                                </button>

                            </td> */}
                        </tr>

                        <tr>
                            {forFor.map((day, index) => (
                               <DateLoader key={index} indexKey={index} date={dates[day + 2 * 7]} row='2' 
                               breakfast={props.type === "Teljes" || props.type === "Kollégium" || props.type === "Kollégium+" ? "Reggeli" : ""} 
                               beforeLunch={props.type === "Teljes" ? "Tízórai" : ""} 
                               lunch={props.type !== "Kollégium" ? "Ebéd" : ""} 
                               snack={props.type === "Teljes" ? "Uzsonna" : ""} 
                               dinner={props.type === "Teljes" || props.type === "Kollégium" || props.type === "Kollégium+" ? "Vacsora" : ""} 
                           />
                            ))}
                            {/* <td className="text-center">
                                <button className="cal-btn btn btn-primary" onClick={() => Opacity('2')} >
                                    <FontAwesomeIcon icon={faAngleDoubleDown} />
                                </button>
                            </td> */}
                        </tr>

                        <tr>
                            {forFor.map((day, index) => (
                                <DateLoader key={index} indexKey={index} date={dates[day + 3 * 7]} row='3' 
                                breakfast={props.type === "Teljes" || props.type === "Kollégium" || props.type === "Kollégium+" ? "Reggeli" : ""} 
                                beforeLunch={props.type === "Teljes" ? "Tízórai" : ""} 
                                lunch={props.type !== "Kollégium" ? "Ebéd" : ""} 
                                snack={props.type === "Teljes" ? "Uzsonna" : ""} 
                                dinner={props.type === "Teljes" || props.type === "Kollégium" || props.type === "Kollégium+" ? "Vacsora" : ""} 
                            />
                            ))}
                            {/* <td className="text-center">
                                <button className="cal-btn btn btn-primary" onClick={() => Opacity('3')} >
                                    <FontAwesomeIcon icon={faAngleDoubleDown} />
                                </button>
                            </td> */}
                        </tr>

                        <tr>
                            {forFor.map((day, index) => (
                                <DateLoader key={index} indexKey={index} date={dates[day + 4 * 7]} row='4' 
                                breakfast={props.type === "Teljes" || props.type === "Kollégium" || props.type === "Kollégium+" ? "Reggeli" : ""} 
                                beforeLunch={props.type === "Teljes" ? "Tízórai" : ""} 
                                lunch={props.type !== "Kollégium" ? "Ebéd" : ""} 
                                snack={props.type === "Teljes" ? "Uzsonna" : ""} 
                                dinner={props.type === "Teljes" || props.type === "Kollégium" || props.type === "Kollégium+" ? "Vacsora" : ""} 
                            />
                            ))}
                            {/* <td className="text-center">
                                <button className="cal-btn btn btn-primary" onClick={() => Opacity('4')} >
                                    <FontAwesomeIcon icon={faAngleDoubleDown} />
                                </button>
                            </td> */}
                        </tr>

                        <tr className={dates[5 * 7].month === '-1' ? "d-none" : ""}>
                            {forFor.map((day, index) => (
                                <DateLoader key={index} indexKey={index} date={dates[day + 5 * 7]} row='5' 
                                breakfast={props.type === "Teljes" || props.type === "Kollégium" || props.type === "Kollégium+" ? "Reggeli" : ""} 
                                beforeLunch={props.type === "Teljes" ? "Tízórai" : ""} 
                                lunch={props.type !== "Kollégium" ? "Ebéd" : ""} 
                                snack={props.type === "Teljes" ? "Uzsonna" : ""} 
                                dinner={props.type === "Teljes" || props.type === "Kollégium" || props.type === "Kollégium+" ? "Vacsora" : ""} 
                            />
                            ))}
                            {/* <td className="text-center">
                                <button className="cal-btn btn btn-primary" onClick={() => Opacity('5')} >
                                    <FontAwesomeIcon icon={faAngleDoubleDown} />
                                </button>
                            </td> */}
                        </tr>
                    </tbody>
                </table>
                <div className="alert"><FontAwesomeIcon icon={faInfoCircle}/> A kiválasztott nap lemondásához kattintson a naptár adott napjára</div>
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

