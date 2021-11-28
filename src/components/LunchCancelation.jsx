import React, { useState } from "react";
import DateSelector from "./DateSelector";
import Menu from "./Menu";

export default function LunchCancelation() {
    const [isMenuChecked, setIsMenuChecked] = useState(false);

    function checkChange() {
        setIsMenuChecked(!isMenuChecked)
    }
    return(
        <div>
            <div className="lunch-cncl--menu">
                <input onChange={checkChange} className="lunch-cncl--menu--input" defaultChecked={isMenuChecked} type="radio" name="lunchCancelation" id="etlapCancel" />
                <input onChange={checkChange} className="lunch-cncl--menu--input" defaultChecked={!isMenuChecked} type="radio" name="lunchCancelation" id="datumCancel" />
                <label htmlFor="etlapCancel" id="etlapCancelItem" className="lunch-cncl--menu--item">Étlap alapú lemondás</label>
                <label htmlFor="datumCancel" id="datumCancelItem" className="lunch-cncl--menu--item">Dátum alapú lemondás</label>
            </div>
            {isMenuChecked ? <Menu header="Lemondás"/> : <DateSelector />}
        </div>
    )
}