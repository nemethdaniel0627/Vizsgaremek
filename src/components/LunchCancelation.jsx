import React, { useEffect, useState } from "react";
import DateSelector from "./DateSelector";
import Menu from "./Menu";
import modules from "../modules/modules";

export default function LunchCancelation() {
    const [isMenuChecked, setIsMenuChecked] = useState(true);
    const [disabledDays, setDisabledDays] = useState([])
    function checkChange() {
        setIsMenuChecked(!isMenuChecked)
    }

    function createDisabledDays() {
        const date = new Date();
        const day = date.getDay();
        const time = Number(date.getHours().toString() + modules.toZeroForm(date.getDate()));
        setDisabledDays((prevDays) => {
            return [...prevDays, day]
        });
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

    useEffect(() => {
        createDisabledDays();
    }, [])

    return (
        <div>
            <div className="lunch-cncl--menu">
                <input onChange={checkChange} className="lunch-cncl--menu--input" defaultChecked={isMenuChecked} type="radio" name="lunchCancelation" id="etlapCancel" />
                <input onChange={checkChange} className="lunch-cncl--menu--input" defaultChecked={!isMenuChecked} type="radio" name="lunchCancelation" id="datumCancel" />
                <label htmlFor="etlapCancel" id="etlapCancelItem" className="lunch-cncl--menu--item">Étlap alapú lemondás</label>
                <label htmlFor="datumCancel" id="datumCancelItem" className="lunch-cncl--menu--item">Dátum alapú lemondás</label>
            </div>
            {isMenuChecked ? <Menu disabledDays={disabledDays} cancel={true} header="Lemondás" /> : <DateSelector />}
        </div>
    )
}