import React from "react";
import Menu from "./Menu";

export default function LunchCancelation() {
    return(
        <div>
            <div className="lunch-cncl--menu">
                <input className="lunch-cncl--menu--input" defaultChecked={true} type="radio" name="lunchCancelation" id="etlapCancel" />
                <input className="lunch-cncl--menu--input" type="radio" name="lunchCancelation" id="datumCancel" />
                <label htmlFor="etlapCancel" id="etlapCancelItem" className="lunch-cncl--menu--item">Étlap alapú lemondás</label>
                <label htmlFor="datumCancel" id="datumCancelItem" className="lunch-cncl--menu--item">Dátum alapú lemondás</label>
            </div>
            <Menu header="Lemondás"/>
        </div>
    )
}