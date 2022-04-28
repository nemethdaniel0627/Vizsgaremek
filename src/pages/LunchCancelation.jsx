import React, { useEffect, useState } from "react";
import DateSelector from "../layouts/DateSelector";
import Menu from "./Menu";
import modules from "../helpers/modules";
import axios from "axios";
import AuthUser from "../modules/AuthUser";
import Loader from "../layouts/Loader";
import ResponseMessage from "../components/ResponseMessage";

export default function LunchCancelation(props) {
    const [isMenuChecked, setIsMenuChecked] = useState(true);
    const [disabledDays, setDisabledDays] = useState([]);
    const [loading, setLoading] = useState(false);
    const [alertOpen, setAlertOpen] = useState(false);
    const [alertText, setAlertText] = useState("");
    const [alertType, setAlertType] = useState();
    const [dates, setDates] = useState([]);
    function checkChange() {
        setIsMenuChecked(!isMenuChecked)
    }

    function cancelMeal() {

        let sendingDates = [];
        dates.forEach(date => {


            if (date.includes("-") && date.includes(".")) {

                let startDate = new Date(date.split("-")[0].toString().trim());
                let endDate = new Date(date.split("-")[1].toString().trim());
                sendingDates.push(modules.convertDateWithDash(startDate));
                while (modules.convertDateWithDash(startDate) !== modules.convertDateWithDash(endDate)) {
                    startDate.setDate(startDate.getDate() + 1);
                    sendingDates.push(modules.convertDateWithDash(startDate));
                }
            }
            else sendingDates.push(date);
        })


        if (dates.length !== 0) {
            setLoading(true);
            axios.patch("/cancel",
                {
                    omAzon: props.user.omAzon,
                    dates: sendingDates
                }, AuthUser.authHeader())
                .then(response => {

                    setLoading(false);
                    if (response.status === 200) {
                        setAlertText("Sikeres ebéd lemondás!");
                        setAlertOpen(true);
                        setAlertType("success");
                    }
                    else if (response.status === 207) {
                        setAlertText("Részben sikeres ebéd lemondás!");
                        setAlertOpen(true);
                        setAlertType("warning");
                    }
                })
                .catch(error => {
                    console.error(error);
                    setAlertText("Hiba történt a lemondás közben!");
                    setLoading(false);
                    setAlertOpen(true);
                    setAlertType("error");
                })
        }
        else {
            setAlertText("Jelöljön ki napokat!");
            setAlertOpen(true);
            setAlertType("error");
        }
    }

    function getDates(selectedDates) {
        setDates(selectedDates);
    }

    useEffect(() => {

        let date = new Date();
        const day = date.getDay();
        const time = Number(date.getHours().toString() + modules.toZeroForm(date.getMinutes()));
        setDisabledDays((prevDays) => {
            return [...prevDays, modules.convertDateWithDash(date)]
        });
        if (day !== 0) {
            for (let i = 1; i <= day; i++) {
                if (i === day && time >= 830) {
                    let tmpDate = modules.getFirstDayOfWeek(new Date());
                    tmpDate.setDate(tmpDate.getDate() + (i));
                    setDisabledDays((prevDays) => {
                        return [...prevDays, modules.convertDateWithDash(tmpDate)]
                    });
                }
                else {
                    let tmpDate = modules.getFirstDayOfWeek(new Date());
                    tmpDate.setDate(tmpDate.getDate() + (i - 1));
                    setDisabledDays((prevDays) => {
                        return [...prevDays, modules.convertDateWithDash(tmpDate)]
                    });
                }
            }
        }

        if ((day >= 5 && time >= 830) || day === 0) {
            let tmpDate = new Date();
            day === 0 ? tmpDate.setDate(tmpDate.getDate() + 1) : tmpDate.setDate(tmpDate.getDate() + (8 - tmpDate.getDay()));
            setDisabledDays((prevDays) => {
                return [...prevDays, modules.convertDateWithDash(tmpDate)]
            });
        }

    }, [])

    function errorMessage() {
        setAlertType("error");
        setAlertText("Nem kiválasztható dátumo(ka)t tartalmaz");
        setAlertOpen(true);
    }


    return (
        <div className="lunch-cncl--container">
            {loading ? <Loader /> : <></>}
            <div className="lunch-cncl--menu">
                <input onChange={checkChange} className="lunch-cncl--menu--input" defaultChecked={isMenuChecked} type="radio" name="lunchCancelation" id="etlapCancel" />
                <input onChange={checkChange} className="lunch-cncl--menu--input" defaultChecked={!isMenuChecked} type="radio" name="lunchCancelation" id="datumCancel" />
                <label htmlFor="etlapCancel" id="etlapCancelItem" className="lunch-cncl--menu--item">Étlap alapú lemondás</label>
                <label htmlFor="datumCancel" id="datumCancelItem" className="lunch-cncl--menu--item">Dátum alapú lemondás</label>
            </div>
            {
                isMenuChecked ?
                    <Menu disabledDays={disabledDays} getDates={getDates} cancel={true} header="Lemondás" /> :
                    <DateSelector errorMessage={errorMessage} disabledDays={disabledDays} getDates={getDates} />
            }
            <div className="lunch-cncl--button--container">
                <input onClick={cancelMeal} type="button" name="ResignBTN" id="ResignBTN" className="btn btn-success mt-5 lunch-cncl--button" value="Lemondás" />
            </div>

            <ResponseMessage
                setAlertOpen={setAlertOpen}
                alertOpen={alertOpen}
                text={alertText}
                type={alertType}
                fixed={true} />
        </div >
    )
}