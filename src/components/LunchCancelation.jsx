import React, { useEffect, useState } from "react";
import DateSelector from "./DateSelector";
import Menu from "./Menu";
import modules from "../modules/modules";

export default function LunchCancelation() {
    const [isMenuChecked, setIsMenuChecked] = useState(true);
    const [disabledDays, setDisabledDays] = useState([]);
    const [dates, setDates] = useState([]);
    function checkChange() {
        setIsMenuChecked(!isMenuChecked)
    }

    function createDisabledDays() {
        const date = new Date();
        const day = date.getDay();
        const time = Number(date.getHours().toString() + modules.toZeroForm(date.getMinutes()));
        // setDisabledDays((prevDays) => {
        //     return [...prevDays, day]
        // });        
        if (day !== 0) {
            for (let i = 1; i <= day; i++) {                
                if (i === day && time >= 830) {
                    setDisabledDays((prevDays) => {
                        return [...prevDays, (i + 1)]
                    });
                }
                else {
                    setDisabledDays((prevDays) => {
                        return [...prevDays, i]
                    });
                }
            }
        }
        else if ((day >= 5 && time >= 830) || day === 0) {
            setDisabledDays((prevDays) => {
                return [...prevDays, 1]
            });
        }
    }

    function cancelMeal() {
        console.log(dates);
    }

    function getDates(selectedDates) {
        setDates(selectedDates);
    }

    useEffect(() => {
        createDisabledDays();
        
    }, [])   

    return (
        <div className="lunch-cncl--container">
            <div className="lunch-cncl--menu">
                <input onChange={checkChange} className="lunch-cncl--menu--input" defaultChecked={isMenuChecked} type="radio" name="lunchCancelation" id="etlapCancel" />
                <input onChange={checkChange} className="lunch-cncl--menu--input" defaultChecked={!isMenuChecked} type="radio" name="lunchCancelation" id="datumCancel" />
                <label htmlFor="etlapCancel" id="etlapCancelItem" className="lunch-cncl--menu--item">Étlap alapú lemondás</label>
                <label htmlFor="datumCancel" id="datumCancelItem" className="lunch-cncl--menu--item">Dátum alapú lemondás</label>
            </div>
            {isMenuChecked ? <Menu disabledDays={disabledDays} getDates={getDates} cancel={true} header="Lemondás" /> : <DateSelector getDates={getDates} />}
            <div className="lunch-cncl--button--container">
                <input onClick={cancelMeal} type="button" name="ResignBTN" id="ResignBTN" className="btn btn-success mt-5 lunch-cncl--button" value="Lemondás" />
            </div>
        </div>
    )
}