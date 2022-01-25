
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
    const dates = props.dates;


    return (
        <div>
            <div className="w-100 cal text-light">
            <h1><span className="cal-year">{date.getMonth() + 1 > 11 ? date.getFullYear()+1 : date.getFullYear()}</span>. <span className="cal-month">{monthNames[(date.getMonth() + 1 > 11 ? 1 : date.getMonth() + 1)]}</span></h1>
                <table className="table fs-4 ">
                    <thead className="">
                        
                    </thead>
                    <tbody>
                        <tr>
                            <th className="weekdays">Hétfő</th>

                            <DateLoader indexKey={0} date={dates[0]} row='0'
                                breakfast={props.type === "Teljes" || props.type === "Kollégium" || props.type === "Kollégium+" ? "Reggeli" : ""}
                                beforeLunch={props.type === "Teljes" ? "Tízórai" : ""}
                                lunch={props.type !== "Kollégium" ? "Ebéd" : ""}
                                snack={props.type === "Teljes" ? "Uzsonna" : ""}
                                dinner={props.type === "Teljes" || props.type === "Kollégium" || props.type === "Kollégium+" ? "Vacsora" : ""}
                            />

                            <DateLoader indexKey={0} date={dates[7]} row='1'
                                breakfast={props.type === "Teljes" || props.type === "Kollégium" || props.type === "Kollégium+" ? "Reggeli" : ""}
                                beforeLunch={props.type === "Teljes" ? "Tízórai" : ""}
                                lunch={props.type !== "Kollégium" ? "Ebéd" : ""}
                                snack={props.type === "Teljes" ? "Uzsonna" : ""}
                                dinner={props.type === "Teljes" || props.type === "Kollégium" || props.type === "Kollégium+" ? "Vacsora" : ""}
                            />
                            <DateLoader indexKey={0} date={dates[14]} row='2'
                                breakfast={props.type === "Teljes" || props.type === "Kollégium" || props.type === "Kollégium+" ? "Reggeli" : ""}
                                beforeLunch={props.type === "Teljes" ? "Tízórai" : ""}
                                lunch={props.type !== "Kollégium" ? "Ebéd" : ""}
                                snack={props.type === "Teljes" ? "Uzsonna" : ""}
                                dinner={props.type === "Teljes" || props.type === "Kollégium" || props.type === "Kollégium+" ? "Vacsora" : ""}
                            />
                            <DateLoader indexKey={0} date={dates[21]} row='3'
                                breakfast={props.type === "Teljes" || props.type === "Kollégium" || props.type === "Kollégium+" ? "Reggeli" : ""}
                                beforeLunch={props.type === "Teljes" ? "Tízórai" : ""}
                                lunch={props.type !== "Kollégium" ? "Ebéd" : ""}
                                snack={props.type === "Teljes" ? "Uzsonna" : ""}
                                dinner={props.type === "Teljes" || props.type === "Kollégium" || props.type === "Kollégium+" ? "Vacsora" : ""}
                            />
                            <DateLoader indexKey={0} date={dates[28]} row='4'
                                breakfast={props.type === "Teljes" || props.type === "Kollégium" || props.type === "Kollégium+" ? "Reggeli" : ""}
                                beforeLunch={props.type === "Teljes" ? "Tízórai" : ""}
                                lunch={props.type !== "Kollégium" ? "Ebéd" : ""}
                                snack={props.type === "Teljes" ? "Uzsonna" : ""}
                                dinner={props.type === "Teljes" || props.type === "Kollégium" || props.type === "Kollégium+" ? "Vacsora" : ""}
                            />


                        </tr>
                        <tr>
                            <th className="weekdays">Kedd</th>
                            <DateLoader indexKey={1} date={dates[1]} row='0'
                                breakfast={props.type === "Teljes" || props.type === "Kollégium" || props.type === "Kollégium+" ? "Reggeli" : ""}
                                beforeLunch={props.type === "Teljes" ? "Tízórai" : ""}
                                lunch={props.type !== "Kollégium" ? "Ebéd" : ""}
                                snack={props.type === "Teljes" ? "Uzsonna" : ""}
                                dinner={props.type === "Teljes" || props.type === "Kollégium" || props.type === "Kollégium+" ? "Vacsora" : ""}
                            />
                            <DateLoader indexKey={1} date={dates[8]} row='1'
                                breakfast={props.type === "Teljes" || props.type === "Kollégium" || props.type === "Kollégium+" ? "Reggeli" : ""}
                                beforeLunch={props.type === "Teljes" ? "Tízórai" : ""}
                                lunch={props.type !== "Kollégium" ? "Ebéd" : ""}
                                snack={props.type === "Teljes" ? "Uzsonna" : ""}
                                dinner={props.type === "Teljes" || props.type === "Kollégium" || props.type === "Kollégium+" ? "Vacsora" : ""}
                            />
                            <DateLoader indexKey={1} date={dates[15]} row='2'
                                breakfast={props.type === "Teljes" || props.type === "Kollégium" || props.type === "Kollégium+" ? "Reggeli" : ""}
                                beforeLunch={props.type === "Teljes" ? "Tízórai" : ""}
                                lunch={props.type !== "Kollégium" ? "Ebéd" : ""}
                                snack={props.type === "Teljes" ? "Uzsonna" : ""}
                                dinner={props.type === "Teljes" || props.type === "Kollégium" || props.type === "Kollégium+" ? "Vacsora" : ""}
                            />
                            <DateLoader indexKey={1} date={dates[22]} row='3'
                                breakfast={props.type === "Teljes" || props.type === "Kollégium" || props.type === "Kollégium+" ? "Reggeli" : ""}
                                beforeLunch={props.type === "Teljes" ? "Tízórai" : ""}
                                lunch={props.type !== "Kollégium" ? "Ebéd" : ""}
                                snack={props.type === "Teljes" ? "Uzsonna" : ""}
                                dinner={props.type === "Teljes" || props.type === "Kollégium" || props.type === "Kollégium+" ? "Vacsora" : ""}
                            />
                            <DateLoader indexKey={1} date={dates[29]} row='4'
                                breakfast={props.type === "Teljes" || props.type === "Kollégium" || props.type === "Kollégium+" ? "Reggeli" : ""}
                                beforeLunch={props.type === "Teljes" ? "Tízórai" : ""}
                                lunch={props.type !== "Kollégium" ? "Ebéd" : ""}
                                snack={props.type === "Teljes" ? "Uzsonna" : ""}
                                dinner={props.type === "Teljes" || props.type === "Kollégium" || props.type === "Kollégium+" ? "Vacsora" : ""}
                            />
                        </tr>

                        <tr>
                            <th className="weekdays">Szerda</th>
                            <DateLoader indexKey={2} date={dates[2]} row='0'
                                breakfast={props.type === "Teljes" || props.type === "Kollégium" || props.type === "Kollégium+" ? "Reggeli" : ""}
                                beforeLunch={props.type === "Teljes" ? "Tízórai" : ""}
                                lunch={props.type !== "Kollégium" ? "Ebéd" : ""}
                                snack={props.type === "Teljes" ? "Uzsonna" : ""}
                                dinner={props.type === "Teljes" || props.type === "Kollégium" || props.type === "Kollégium+" ? "Vacsora" : ""}
                            />
                            <DateLoader indexKey={2} date={dates[9]} row='1'
                                breakfast={props.type === "Teljes" || props.type === "Kollégium" || props.type === "Kollégium+" ? "Reggeli" : ""}
                                beforeLunch={props.type === "Teljes" ? "Tízórai" : ""}
                                lunch={props.type !== "Kollégium" ? "Ebéd" : ""}
                                snack={props.type === "Teljes" ? "Uzsonna" : ""}
                                dinner={props.type === "Teljes" || props.type === "Kollégium" || props.type === "Kollégium+" ? "Vacsora" : ""}
                            />
                            <DateLoader indexKey={2} date={dates[16]} row='2'
                                breakfast={props.type === "Teljes" || props.type === "Kollégium" || props.type === "Kollégium+" ? "Reggeli" : ""}
                                beforeLunch={props.type === "Teljes" ? "Tízórai" : ""}
                                lunch={props.type !== "Kollégium" ? "Ebéd" : ""}
                                snack={props.type === "Teljes" ? "Uzsonna" : ""}
                                dinner={props.type === "Teljes" || props.type === "Kollégium" || props.type === "Kollégium+" ? "Vacsora" : ""}
                            />
                            <DateLoader indexKey={2} date={dates[23]} row='3'
                                breakfast={props.type === "Teljes" || props.type === "Kollégium" || props.type === "Kollégium+" ? "Reggeli" : ""}
                                beforeLunch={props.type === "Teljes" ? "Tízórai" : ""}
                                lunch={props.type !== "Kollégium" ? "Ebéd" : ""}
                                snack={props.type === "Teljes" ? "Uzsonna" : ""}
                                dinner={props.type === "Teljes" || props.type === "Kollégium" || props.type === "Kollégium+" ? "Vacsora" : ""}
                            />
                            <DateLoader indexKey={2} date={dates[30]} row='4'
                                breakfast={props.type === "Teljes" || props.type === "Kollégium" || props.type === "Kollégium+" ? "Reggeli" : ""}
                                beforeLunch={props.type === "Teljes" ? "Tízórai" : ""}
                                lunch={props.type !== "Kollégium" ? "Ebéd" : ""}
                                snack={props.type === "Teljes" ? "Uzsonna" : ""}
                                dinner={props.type === "Teljes" || props.type === "Kollégium" || props.type === "Kollégium+" ? "Vacsora" : ""}
                            />
                        </tr>

                        <tr>
                            <th className="weekdays">Csütörtök</th>
                            <DateLoader indexKey={3} date={dates[3]} row='0'
                                breakfast={props.type === "Teljes" || props.type === "Kollégium" || props.type === "Kollégium+" ? "Reggeli" : ""}
                                beforeLunch={props.type === "Teljes" ? "Tízórai" : ""}
                                lunch={props.type !== "Kollégium" ? "Ebéd" : ""}
                                snack={props.type === "Teljes" ? "Uzsonna" : ""}
                                dinner={props.type === "Teljes" || props.type === "Kollégium" || props.type === "Kollégium+" ? "Vacsora" : ""}
                            />
                            <DateLoader indexKey={3} date={dates[10]} row='1'
                                breakfast={props.type === "Teljes" || props.type === "Kollégium" || props.type === "Kollégium+" ? "Reggeli" : ""}
                                beforeLunch={props.type === "Teljes" ? "Tízórai" : ""}
                                lunch={props.type !== "Kollégium" ? "Ebéd" : ""}
                                snack={props.type === "Teljes" ? "Uzsonna" : ""}
                                dinner={props.type === "Teljes" || props.type === "Kollégium" || props.type === "Kollégium+" ? "Vacsora" : ""}
                            />
                            <DateLoader indexKey={3} date={dates[17]} row='2'
                                breakfast={props.type === "Teljes" || props.type === "Kollégium" || props.type === "Kollégium+" ? "Reggeli" : ""}
                                beforeLunch={props.type === "Teljes" ? "Tízórai" : ""}
                                lunch={props.type !== "Kollégium" ? "Ebéd" : ""}
                                snack={props.type === "Teljes" ? "Uzsonna" : ""}
                                dinner={props.type === "Teljes" || props.type === "Kollégium" || props.type === "Kollégium+" ? "Vacsora" : ""}
                            />
                            <DateLoader indexKey={3} date={dates[24]} row='3'
                                breakfast={props.type === "Teljes" || props.type === "Kollégium" || props.type === "Kollégium+" ? "Reggeli" : ""}
                                beforeLunch={props.type === "Teljes" ? "Tízórai" : ""}
                                lunch={props.type !== "Kollégium" ? "Ebéd" : ""}
                                snack={props.type === "Teljes" ? "Uzsonna" : ""}
                                dinner={props.type === "Teljes" || props.type === "Kollégium" || props.type === "Kollégium+" ? "Vacsora" : ""}
                            />
                            <DateLoader indexKey={3} date={dates[31]} row='4'
                                breakfast={props.type === "Teljes" || props.type === "Kollégium" || props.type === "Kollégium+" ? "Reggeli" : ""}
                                beforeLunch={props.type === "Teljes" ? "Tízórai" : ""}
                                lunch={props.type !== "Kollégium" ? "Ebéd" : ""}
                                snack={props.type === "Teljes" ? "Uzsonna" : ""}
                                dinner={props.type === "Teljes" || props.type === "Kollégium" || props.type === "Kollégium+" ? "Vacsora" : ""}
                            />
                        </tr>

                        <tr>
                            <th className="weekdays">Péntek</th>
                            <DateLoader indexKey={4} date={dates[4]} row='0'
                                breakfast={props.type === "Teljes" || props.type === "Kollégium" || props.type === "Kollégium+" ? "Reggeli" : ""}
                                beforeLunch={props.type === "Teljes" ? "Tízórai" : ""}
                                lunch={props.type !== "Kollégium" ? "Ebéd" : ""}
                                snack={props.type === "Teljes" ? "Uzsonna" : ""}
                                dinner={props.type === "Teljes" || props.type === "Kollégium" || props.type === "Kollégium+" ? "Vacsora" : ""}
                            />
                            <DateLoader indexKey={4} date={dates[11]} row='1'
                                breakfast={props.type === "Teljes" || props.type === "Kollégium" || props.type === "Kollégium+" ? "Reggeli" : ""}
                                beforeLunch={props.type === "Teljes" ? "Tízórai" : ""}
                                lunch={props.type !== "Kollégium" ? "Ebéd" : ""}
                                snack={props.type === "Teljes" ? "Uzsonna" : ""}
                                dinner={props.type === "Teljes" || props.type === "Kollégium" || props.type === "Kollégium+" ? "Vacsora" : ""}
                            />
                            <DateLoader indexKey={4} date={dates[18]} row='2'
                                breakfast={props.type === "Teljes" || props.type === "Kollégium" || props.type === "Kollégium+" ? "Reggeli" : ""}
                                beforeLunch={props.type === "Teljes" ? "Tízórai" : ""}
                                lunch={props.type !== "Kollégium" ? "Ebéd" : ""}
                                snack={props.type === "Teljes" ? "Uzsonna" : ""}
                                dinner={props.type === "Teljes" || props.type === "Kollégium" || props.type === "Kollégium+" ? "Vacsora" : ""}
                            />
                            <DateLoader indexKey={4} date={dates[25]} row='3'
                                breakfast={props.type === "Teljes" || props.type === "Kollégium" || props.type === "Kollégium+" ? "Reggeli" : ""}
                                beforeLunch={props.type === "Teljes" ? "Tízórai" : ""}
                                lunch={props.type !== "Kollégium" ? "Ebéd" : ""}
                                snack={props.type === "Teljes" ? "Uzsonna" : ""}
                                dinner={props.type === "Teljes" || props.type === "Kollégium" || props.type === "Kollégium+" ? "Vacsora" : ""}
                            />
                            <DateLoader indexKey={4} date={dates[32]} row='4'
                                breakfast={props.type === "Teljes" || props.type === "Kollégium" || props.type === "Kollégium+" ? "Reggeli" : ""}
                                beforeLunch={props.type === "Teljes" ? "Tízórai" : ""}
                                lunch={props.type !== "Kollégium" ? "Ebéd" : ""}
                                snack={props.type === "Teljes" ? "Uzsonna" : ""}
                                dinner={props.type === "Teljes" || props.type === "Kollégium" || props.type === "Kollégium+" ? "Vacsora" : ""}
                            />
                        </tr>

                        <tr>
                            <th className="weekdays">Szombat</th>
                            <DateLoader indexKey={5} date={dates[5]} row='0'
                                breakfast={props.type === "Teljes" || props.type === "Kollégium" || props.type === "Kollégium+" ? "Reggeli" : ""}
                                beforeLunch={props.type === "Teljes" ? "Tízórai" : ""}
                                lunch={props.type !== "Kollégium" ? "Ebéd" : ""}
                                snack={props.type === "Teljes" ? "Uzsonna" : ""}
                                dinner={props.type === "Teljes" || props.type === "Kollégium" || props.type === "Kollégium+" ? "Vacsora" : ""}
                            />
                            <DateLoader indexKey={5} date={dates[12]} row='1'
                                breakfast={props.type === "Teljes" || props.type === "Kollégium" || props.type === "Kollégium+" ? "Reggeli" : ""}
                                beforeLunch={props.type === "Teljes" ? "Tízórai" : ""}
                                lunch={props.type !== "Kollégium" ? "Ebéd" : ""}
                                snack={props.type === "Teljes" ? "Uzsonna" : ""}
                                dinner={props.type === "Teljes" || props.type === "Kollégium" || props.type === "Kollégium+" ? "Vacsora" : ""}
                            />
                            <DateLoader indexKey={5} date={dates[19]} row='2'
                                breakfast={props.type === "Teljes" || props.type === "Kollégium" || props.type === "Kollégium+" ? "Reggeli" : ""}
                                beforeLunch={props.type === "Teljes" ? "Tízórai" : ""}
                                lunch={props.type !== "Kollégium" ? "Ebéd" : ""}
                                snack={props.type === "Teljes" ? "Uzsonna" : ""}
                                dinner={props.type === "Teljes" || props.type === "Kollégium" || props.type === "Kollégium+" ? "Vacsora" : ""}
                            />
                            <DateLoader indexKey={5} date={dates[26]} row='3'
                                breakfast={props.type === "Teljes" || props.type === "Kollégium" || props.type === "Kollégium+" ? "Reggeli" : ""}
                                beforeLunch={props.type === "Teljes" ? "Tízórai" : ""}
                                lunch={props.type !== "Kollégium" ? "Ebéd" : ""}
                                snack={props.type === "Teljes" ? "Uzsonna" : ""}
                                dinner={props.type === "Teljes" || props.type === "Kollégium" || props.type === "Kollégium+" ? "Vacsora" : ""}
                            />
                            <DateLoader indexKey={5} date={dates[33]} row='4'
                                breakfast={props.type === "Teljes" || props.type === "Kollégium" || props.type === "Kollégium+" ? "Reggeli" : ""}
                                beforeLunch={props.type === "Teljes" ? "Tízórai" : ""}
                                lunch={props.type !== "Kollégium" ? "Ebéd" : ""}
                                snack={props.type === "Teljes" ? "Uzsonna" : ""}
                                dinner={props.type === "Teljes" || props.type === "Kollégium" || props.type === "Kollégium+" ? "Vacsora" : ""}
                            />
                        </tr>

                        <tr>
                            <th className="weekdays">Vasárnap</th>
                            <DateLoader indexKey={6} date={dates[6]} row='0'
                                breakfast={props.type === "Teljes" || props.type === "Kollégium" || props.type === "Kollégium+" ? "Reggeli" : ""}
                                beforeLunch={props.type === "Teljes" ? "Tízórai" : ""}
                                lunch={props.type !== "Kollégium" ? "Ebéd" : ""}
                                snack={props.type === "Teljes" ? "Uzsonna" : ""}
                                dinner={props.type === "Teljes" || props.type === "Kollégium" || props.type === "Kollégium+" ? "Vacsora" : ""}
                            />
                            <DateLoader indexKey={6} date={dates[13]} row='1'
                                breakfast={props.type === "Teljes" || props.type === "Kollégium" || props.type === "Kollégium+" ? "Reggeli" : ""}
                                beforeLunch={props.type === "Teljes" ? "Tízórai" : ""}
                                lunch={props.type !== "Kollégium" ? "Ebéd" : ""}
                                snack={props.type === "Teljes" ? "Uzsonna" : ""}
                                dinner={props.type === "Teljes" || props.type === "Kollégium" || props.type === "Kollégium+" ? "Vacsora" : ""}
                            />
                            <DateLoader indexKey={6} date={dates[20]} row='2'
                                breakfast={props.type === "Teljes" || props.type === "Kollégium" || props.type === "Kollégium+" ? "Reggeli" : ""}
                                beforeLunch={props.type === "Teljes" ? "Tízórai" : ""}
                                lunch={props.type !== "Kollégium" ? "Ebéd" : ""}
                                snack={props.type === "Teljes" ? "Uzsonna" : ""}
                                dinner={props.type === "Teljes" || props.type === "Kollégium" || props.type === "Kollégium+" ? "Vacsora" : ""}
                            />
                            <DateLoader indexKey={6} date={dates[27]} row='3'
                                breakfast={props.type === "Teljes" || props.type === "Kollégium" || props.type === "Kollégium+" ? "Reggeli" : ""}
                                beforeLunch={props.type === "Teljes" ? "Tízórai" : ""}
                                lunch={props.type !== "Kollégium" ? "Ebéd" : ""}
                                snack={props.type === "Teljes" ? "Uzsonna" : ""}
                                dinner={props.type === "Teljes" || props.type === "Kollégium" || props.type === "Kollégium+" ? "Vacsora" : ""}
                            />
                            <DateLoader indexKey={6} date={dates[34]} row='4'
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

