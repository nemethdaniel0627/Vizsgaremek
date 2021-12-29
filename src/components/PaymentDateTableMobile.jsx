
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
            <div className="w-100 cal text-light">
                <h1><span className="cal-year">{date.getFullYear()}</span>. <span className="cal-month">{monthNames[date.getMonth()]}</span></h1>
                <table className="table fs-4 ">
                    <thead className="">
                        <tr className="cal-header text-light">
                            <td></td>
                            <td className="text-right">
                                <button className="cal-btn btn btn-primary" onClick={() => Opacity('0')} >
                                    <FontAwesomeIcon icon={faAngleDoubleDown} />
                                </button>
                            </td>
                            <td className="text-right">
                                <button className="cal-btn btn btn-primary" onClick={() => Opacity('1')} >
                                    <FontAwesomeIcon icon={faAngleDoubleDown} />
                                </button>
                            </td>
                            <td className="text-right">
                                <button className="cal-btn btn btn-primary" onClick={() => Opacity('2')} >
                                    <FontAwesomeIcon icon={faAngleDoubleDown} />
                                </button>
                            </td>
                            <td className="text-right">
                                <button className="cal-btn btn btn-primary" onClick={() => Opacity('3')} >
                                    <FontAwesomeIcon icon={faAngleDoubleDown} />
                                </button>
                            </td>
                            <td className="text-right">
                                <button className="cal-btn btn btn-primary" onClick={() => Opacity('4')} >
                                    <FontAwesomeIcon icon={faAngleDoubleDown} />
                                </button>
                            </td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th>Hétfő</th>
                            <DateLoader day={dates[0].day} month={dates[0].month} row='0'
                                breakfast={props.type === "Teljes" || props.type === "Kollégium" || props.type === "Kollégium+" ? "Reggeli" : ""}
                                beforeLunch={props.type === "Teljes" ? "Tízórai" : ""}
                                lunch={props.type !== "Kollégium" ? "Ebéd" : ""}
                                snack={props.type === "Teljes" ? "Uzsonna" : ""}
                                dinner={props.type === "Teljes" || props.type === "Kollégium" || props.type === "Kollégium+" ? "Vacsora" : ""}
                            />
                            <DateLoader day={dates[7].day} month={dates[7].month} row='1'
                                breakfast={props.type === "Teljes" || props.type === "Kollégium" || props.type === "Kollégium+" ? "Reggeli" : ""}
                                beforeLunch={props.type === "Teljes" ? "Tízórai" : ""}
                                lunch={props.type !== "Kollégium" ? "Ebéd" : ""}
                                snack={props.type === "Teljes" ? "Uzsonna" : ""}
                                dinner={props.type === "Teljes" || props.type === "Kollégium" || props.type === "Kollégium+" ? "Vacsora" : ""}
                            />
                            <DateLoader day={dates[14].day} month={dates[14].month} row='2'
                                breakfast={props.type === "Teljes" || props.type === "Kollégium" || props.type === "Kollégium+" ? "Reggeli" : ""}
                                beforeLunch={props.type === "Teljes" ? "Tízórai" : ""}
                                lunch={props.type !== "Kollégium" ? "Ebéd" : ""}
                                snack={props.type === "Teljes" ? "Uzsonna" : ""}
                                dinner={props.type === "Teljes" || props.type === "Kollégium" || props.type === "Kollégium+" ? "Vacsora" : ""}
                            />
                            <DateLoader day={dates[21].day} month={dates[21].month} row='3'
                                breakfast={props.type === "Teljes" || props.type === "Kollégium" || props.type === "Kollégium+" ? "Reggeli" : ""}
                                beforeLunch={props.type === "Teljes" ? "Tízórai" : ""}
                                lunch={props.type !== "Kollégium" ? "Ebéd" : ""}
                                snack={props.type === "Teljes" ? "Uzsonna" : ""}
                                dinner={props.type === "Teljes" || props.type === "Kollégium" || props.type === "Kollégium+" ? "Vacsora" : ""}
                            />
                            <DateLoader day={dates[28].day} month={dates[28].month} row='4'
                                breakfast={props.type === "Teljes" || props.type === "Kollégium" || props.type === "Kollégium+" ? "Reggeli" : ""}
                                beforeLunch={props.type === "Teljes" ? "Tízórai" : ""}
                                lunch={props.type !== "Kollégium" ? "Ebéd" : ""}
                                snack={props.type === "Teljes" ? "Uzsonna" : ""}
                                dinner={props.type === "Teljes" || props.type === "Kollégium" || props.type === "Kollégium+" ? "Vacsora" : ""}
                            />


                        </tr>
                        <tr>
                            <th>Kedd</th>
                            <DateLoader day={dates[1].day} month={dates[1].month} row='0'
                                breakfast={props.type === "Teljes" || props.type === "Kollégium" || props.type === "Kollégium+" ? "Reggeli" : ""}
                                beforeLunch={props.type === "Teljes" ? "Tízórai" : ""}
                                lunch={props.type !== "Kollégium" ? "Ebéd" : ""}
                                snack={props.type === "Teljes" ? "Uzsonna" : ""}
                                dinner={props.type === "Teljes" || props.type === "Kollégium" || props.type === "Kollégium+" ? "Vacsora" : ""}
                            />
                            <DateLoader day={dates[8].day} month={dates[8].month} row='1'
                                breakfast={props.type === "Teljes" || props.type === "Kollégium" || props.type === "Kollégium+" ? "Reggeli" : ""}
                                beforeLunch={props.type === "Teljes" ? "Tízórai" : ""}
                                lunch={props.type !== "Kollégium" ? "Ebéd" : ""}
                                snack={props.type === "Teljes" ? "Uzsonna" : ""}
                                dinner={props.type === "Teljes" || props.type === "Kollégium" || props.type === "Kollégium+" ? "Vacsora" : ""}
                            />
                            <DateLoader day={dates[15].day} month={dates[15].month} row='2'
                                breakfast={props.type === "Teljes" || props.type === "Kollégium" || props.type === "Kollégium+" ? "Reggeli" : ""}
                                beforeLunch={props.type === "Teljes" ? "Tízórai" : ""}
                                lunch={props.type !== "Kollégium" ? "Ebéd" : ""}
                                snack={props.type === "Teljes" ? "Uzsonna" : ""}
                                dinner={props.type === "Teljes" || props.type === "Kollégium" || props.type === "Kollégium+" ? "Vacsora" : ""}
                            />
                            <DateLoader day={dates[22].day} month={dates[22].month} row='3'
                                breakfast={props.type === "Teljes" || props.type === "Kollégium" || props.type === "Kollégium+" ? "Reggeli" : ""}
                                beforeLunch={props.type === "Teljes" ? "Tízórai" : ""}
                                lunch={props.type !== "Kollégium" ? "Ebéd" : ""}
                                snack={props.type === "Teljes" ? "Uzsonna" : ""}
                                dinner={props.type === "Teljes" || props.type === "Kollégium" || props.type === "Kollégium+" ? "Vacsora" : ""}
                            />
                            <DateLoader day={dates[29].day} month={dates[29].month} row='4'
                                breakfast={props.type === "Teljes" || props.type === "Kollégium" || props.type === "Kollégium+" ? "Reggeli" : ""}
                                beforeLunch={props.type === "Teljes" ? "Tízórai" : ""}
                                lunch={props.type !== "Kollégium" ? "Ebéd" : ""}
                                snack={props.type === "Teljes" ? "Uzsonna" : ""}
                                dinner={props.type === "Teljes" || props.type === "Kollégium" || props.type === "Kollégium+" ? "Vacsora" : ""}
                            />
                        </tr>

                        <tr>
                            <th>Szerda</th>
                            <DateLoader day={dates[2].day} month={dates[2].month} row='0'
                                breakfast={props.type === "Teljes" || props.type === "Kollégium" || props.type === "Kollégium+" ? "Reggeli" : ""}
                                beforeLunch={props.type === "Teljes" ? "Tízórai" : ""}
                                lunch={props.type !== "Kollégium" ? "Ebéd" : ""}
                                snack={props.type === "Teljes" ? "Uzsonna" : ""}
                                dinner={props.type === "Teljes" || props.type === "Kollégium" || props.type === "Kollégium+" ? "Vacsora" : ""}
                            />
                            <DateLoader day={dates[9].day} month={dates[9].month} row='1'
                                breakfast={props.type === "Teljes" || props.type === "Kollégium" || props.type === "Kollégium+" ? "Reggeli" : ""}
                                beforeLunch={props.type === "Teljes" ? "Tízórai" : ""}
                                lunch={props.type !== "Kollégium" ? "Ebéd" : ""}
                                snack={props.type === "Teljes" ? "Uzsonna" : ""}
                                dinner={props.type === "Teljes" || props.type === "Kollégium" || props.type === "Kollégium+" ? "Vacsora" : ""}
                            />
                            <DateLoader day={dates[16].day} month={dates[16].month} row='2'
                                breakfast={props.type === "Teljes" || props.type === "Kollégium" || props.type === "Kollégium+" ? "Reggeli" : ""}
                                beforeLunch={props.type === "Teljes" ? "Tízórai" : ""}
                                lunch={props.type !== "Kollégium" ? "Ebéd" : ""}
                                snack={props.type === "Teljes" ? "Uzsonna" : ""}
                                dinner={props.type === "Teljes" || props.type === "Kollégium" || props.type === "Kollégium+" ? "Vacsora" : ""}
                            />
                            <DateLoader day={dates[23].day} month={dates[23].month} row='3'
                                breakfast={props.type === "Teljes" || props.type === "Kollégium" || props.type === "Kollégium+" ? "Reggeli" : ""}
                                beforeLunch={props.type === "Teljes" ? "Tízórai" : ""}
                                lunch={props.type !== "Kollégium" ? "Ebéd" : ""}
                                snack={props.type === "Teljes" ? "Uzsonna" : ""}
                                dinner={props.type === "Teljes" || props.type === "Kollégium" || props.type === "Kollégium+" ? "Vacsora" : ""}
                            />
                            <DateLoader day={dates[30].day} month={dates[30].month} row='4'
                                breakfast={props.type === "Teljes" || props.type === "Kollégium" || props.type === "Kollégium+" ? "Reggeli" : ""}
                                beforeLunch={props.type === "Teljes" ? "Tízórai" : ""}
                                lunch={props.type !== "Kollégium" ? "Ebéd" : ""}
                                snack={props.type === "Teljes" ? "Uzsonna" : ""}
                                dinner={props.type === "Teljes" || props.type === "Kollégium" || props.type === "Kollégium+" ? "Vacsora" : ""}
                            />
                        </tr>

                        <tr>
                            <th>Csütörtök</th>
                            <DateLoader day={dates[3].day} month={dates[3].month} row='0'
                                breakfast={props.type === "Teljes" || props.type === "Kollégium" || props.type === "Kollégium+" ? "Reggeli" : ""}
                                beforeLunch={props.type === "Teljes" ? "Tízórai" : ""}
                                lunch={props.type !== "Kollégium" ? "Ebéd" : ""}
                                snack={props.type === "Teljes" ? "Uzsonna" : ""}
                                dinner={props.type === "Teljes" || props.type === "Kollégium" || props.type === "Kollégium+" ? "Vacsora" : ""}
                            />
                            <DateLoader day={dates[10].day} month={dates[10].month} row='1'
                                breakfast={props.type === "Teljes" || props.type === "Kollégium" || props.type === "Kollégium+" ? "Reggeli" : ""}
                                beforeLunch={props.type === "Teljes" ? "Tízórai" : ""}
                                lunch={props.type !== "Kollégium" ? "Ebéd" : ""}
                                snack={props.type === "Teljes" ? "Uzsonna" : ""}
                                dinner={props.type === "Teljes" || props.type === "Kollégium" || props.type === "Kollégium+" ? "Vacsora" : ""}
                            />
                            <DateLoader day={dates[17].day} month={dates[17].month} row='2'
                                breakfast={props.type === "Teljes" || props.type === "Kollégium" || props.type === "Kollégium+" ? "Reggeli" : ""}
                                beforeLunch={props.type === "Teljes" ? "Tízórai" : ""}
                                lunch={props.type !== "Kollégium" ? "Ebéd" : ""}
                                snack={props.type === "Teljes" ? "Uzsonna" : ""}
                                dinner={props.type === "Teljes" || props.type === "Kollégium" || props.type === "Kollégium+" ? "Vacsora" : ""}
                            />
                            <DateLoader day={dates[24].day} month={dates[24].month} row='3'
                                breakfast={props.type === "Teljes" || props.type === "Kollégium" || props.type === "Kollégium+" ? "Reggeli" : ""}
                                beforeLunch={props.type === "Teljes" ? "Tízórai" : ""}
                                lunch={props.type !== "Kollégium" ? "Ebéd" : ""}
                                snack={props.type === "Teljes" ? "Uzsonna" : ""}
                                dinner={props.type === "Teljes" || props.type === "Kollégium" || props.type === "Kollégium+" ? "Vacsora" : ""}
                            />
                            <DateLoader day={dates[31].day} month={dates[31].month} row='4'
                                breakfast={props.type === "Teljes" || props.type === "Kollégium" || props.type === "Kollégium+" ? "Reggeli" : ""}
                                beforeLunch={props.type === "Teljes" ? "Tízórai" : ""}
                                lunch={props.type !== "Kollégium" ? "Ebéd" : ""}
                                snack={props.type === "Teljes" ? "Uzsonna" : ""}
                                dinner={props.type === "Teljes" || props.type === "Kollégium" || props.type === "Kollégium+" ? "Vacsora" : ""}
                            />
                        </tr>

                        <tr>
                            <th>Péntek</th>
                            <DateLoader day={dates[4].day} month={dates[4].month} row='0'
                                breakfast={props.type === "Teljes" || props.type === "Kollégium" || props.type === "Kollégium+" ? "Reggeli" : ""}
                                beforeLunch={props.type === "Teljes" ? "Tízórai" : ""}
                                lunch={props.type !== "Kollégium" ? "Ebéd" : ""}
                                snack={props.type === "Teljes" ? "Uzsonna" : ""}
                                dinner={props.type === "Teljes" || props.type === "Kollégium" || props.type === "Kollégium+" ? "Vacsora" : ""}
                            />
                            <DateLoader day={dates[11].day} month={dates[11].month} row='1'
                                breakfast={props.type === "Teljes" || props.type === "Kollégium" || props.type === "Kollégium+" ? "Reggeli" : ""}
                                beforeLunch={props.type === "Teljes" ? "Tízórai" : ""}
                                lunch={props.type !== "Kollégium" ? "Ebéd" : ""}
                                snack={props.type === "Teljes" ? "Uzsonna" : ""}
                                dinner={props.type === "Teljes" || props.type === "Kollégium" || props.type === "Kollégium+" ? "Vacsora" : ""}
                            />
                            <DateLoader day={dates[18].day} month={dates[18].month} row='2'
                                breakfast={props.type === "Teljes" || props.type === "Kollégium" || props.type === "Kollégium+" ? "Reggeli" : ""}
                                beforeLunch={props.type === "Teljes" ? "Tízórai" : ""}
                                lunch={props.type !== "Kollégium" ? "Ebéd" : ""}
                                snack={props.type === "Teljes" ? "Uzsonna" : ""}
                                dinner={props.type === "Teljes" || props.type === "Kollégium" || props.type === "Kollégium+" ? "Vacsora" : ""}
                            />
                            <DateLoader day={dates[25].day} month={dates[25].month} row='3'
                                breakfast={props.type === "Teljes" || props.type === "Kollégium" || props.type === "Kollégium+" ? "Reggeli" : ""}
                                beforeLunch={props.type === "Teljes" ? "Tízórai" : ""}
                                lunch={props.type !== "Kollégium" ? "Ebéd" : ""}
                                snack={props.type === "Teljes" ? "Uzsonna" : ""}
                                dinner={props.type === "Teljes" || props.type === "Kollégium" || props.type === "Kollégium+" ? "Vacsora" : ""}
                            />
                            <DateLoader day={dates[32].day} month={dates[32].month} row='4'
                                breakfast={props.type === "Teljes" || props.type === "Kollégium" || props.type === "Kollégium+" ? "Reggeli" : ""}
                                beforeLunch={props.type === "Teljes" ? "Tízórai" : ""}
                                lunch={props.type !== "Kollégium" ? "Ebéd" : ""}
                                snack={props.type === "Teljes" ? "Uzsonna" : ""}
                                dinner={props.type === "Teljes" || props.type === "Kollégium" || props.type === "Kollégium+" ? "Vacsora" : ""}
                            />
                        </tr>

                        <tr>
                            <th>Szombat</th>
                            <DateLoader day={dates[5].day} month={dates[5].month} row='0'
                                breakfast={props.type === "Teljes" || props.type === "Kollégium" || props.type === "Kollégium+" ? "Reggeli" : ""}
                                beforeLunch={props.type === "Teljes" ? "Tízórai" : ""}
                                lunch={props.type !== "Kollégium" ? "Ebéd" : ""}
                                snack={props.type === "Teljes" ? "Uzsonna" : ""}
                                dinner={props.type === "Teljes" || props.type === "Kollégium" || props.type === "Kollégium+" ? "Vacsora" : ""}
                            />
                            <DateLoader day={dates[12].day} month={dates[12].month} row='1'
                                breakfast={props.type === "Teljes" || props.type === "Kollégium" || props.type === "Kollégium+" ? "Reggeli" : ""}
                                beforeLunch={props.type === "Teljes" ? "Tízórai" : ""}
                                lunch={props.type !== "Kollégium" ? "Ebéd" : ""}
                                snack={props.type === "Teljes" ? "Uzsonna" : ""}
                                dinner={props.type === "Teljes" || props.type === "Kollégium" || props.type === "Kollégium+" ? "Vacsora" : ""}
                            />
                            <DateLoader day={dates[19].day} month={dates[19].month} row='2'
                                breakfast={props.type === "Teljes" || props.type === "Kollégium" || props.type === "Kollégium+" ? "Reggeli" : ""}
                                beforeLunch={props.type === "Teljes" ? "Tízórai" : ""}
                                lunch={props.type !== "Kollégium" ? "Ebéd" : ""}
                                snack={props.type === "Teljes" ? "Uzsonna" : ""}
                                dinner={props.type === "Teljes" || props.type === "Kollégium" || props.type === "Kollégium+" ? "Vacsora" : ""}
                            />
                            <DateLoader day={dates[26].day} month={dates[26].month} row='3'
                                breakfast={props.type === "Teljes" || props.type === "Kollégium" || props.type === "Kollégium+" ? "Reggeli" : ""}
                                beforeLunch={props.type === "Teljes" ? "Tízórai" : ""}
                                lunch={props.type !== "Kollégium" ? "Ebéd" : ""}
                                snack={props.type === "Teljes" ? "Uzsonna" : ""}
                                dinner={props.type === "Teljes" || props.type === "Kollégium" || props.type === "Kollégium+" ? "Vacsora" : ""}
                            />
                            <DateLoader day={dates[33].day} month={dates[33].month} row='4'
                                breakfast={props.type === "Teljes" || props.type === "Kollégium" || props.type === "Kollégium+" ? "Reggeli" : ""}
                                beforeLunch={props.type === "Teljes" ? "Tízórai" : ""}
                                lunch={props.type !== "Kollégium" ? "Ebéd" : ""}
                                snack={props.type === "Teljes" ? "Uzsonna" : ""}
                                dinner={props.type === "Teljes" || props.type === "Kollégium" || props.type === "Kollégium+" ? "Vacsora" : ""}
                            />
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

