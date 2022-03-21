
import React, { useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import DateLoader from "../components/PaymentDateTableLoader";


export default function PaymentDateTable(props) {
    const date = new Date();
    const monthNames = ["Január", "Február", "Március", "Április", "Május", "Június",
        "Július", "Augusztus", "Szeptember", "October", "November", "December"
    ];
    const forFor = [0, 1, 2, 3, 4, 5, 6];
    return (
        <div>
            <div className="cal text-light">
                <h1><span className="cal-year">{date.getMonth() + 1 > 11 ? date.getFullYear() + 1 : date.getFullYear()}</span>. <span className="cal-month">{monthNames[(date.getMonth() + 1 > 11 ? 1 : date.getMonth() + 1)]}</span></h1>
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
                                <DateLoader key={index} indexKey={index} date={props.dates[day + 0 * 7]} row='0' sendDate={props.sendDate} />
                            ))}
                        </tr>
                        <tr>
                            {forFor.map((day, index) => (
                                <DateLoader key={index} indexKey={index} date={props.dates[day + 1 * 7]} row='1' sendDate={props.sendDate} />
                            ))}
                        </tr>

                        <tr>
                            {forFor.map((day, index) => (
                                <DateLoader key={index} indexKey={index} date={props.dates[day + 2 * 7]} row='2' sendDate={props.sendDate}/>
                            ))}
                        </tr>

                        <tr>
                            {forFor.map((day, index) => (
                                <DateLoader key={index} indexKey={index} date={props.dates[day + 3 * 7]} row='3' sendDate={props.sendDate}/>
                            ))}
                        </tr>

                        <tr>
                            {forFor.map((day, index) => (
                                <DateLoader key={index} indexKey={index} date={props.dates[day + 4 * 7]} row='4' sendDate={props.sendDate}/>
                            ))}
                        </tr>

                        <tr className={props.dates[5 * 7].month === '-1' ? "d-none" : ""}>
                            {forFor.map((day, index) => (
                                <DateLoader key={index} indexKey={index} date={props.dates[day + 5 * 7]} row='5' />
                            ))}
                        </tr>
                    </tbody>
                </table>
                <div className="alert"><FontAwesomeIcon icon={faInfoCircle} /> A kiválasztott nap lemondásához kattintson a naptár adott napjára</div>
            </div>
        </div>
    );
}
