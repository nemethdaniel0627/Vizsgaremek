import React, { useState } from "react";

export default function DateSelector() {
    const [justOneDay, setJustOneDay] = useState(false);

    function justOneDayChange() {    
        setJustOneDay(!justOneDay);
    }
    
    return (
        <div className="date-selector">
          <div className="row w-100">
            <div className="col-sm-12 col-lg-12 mb-5 w-100 mt-2">
              <h1 className="menu--header">Lemondás</h1>
            </div>
            <div className="col-lg-6 col-sm-12 mt-3" id="DayPicker">
              <h4>Mettől:</h4>
              <input type="date" id="FirstDay" className="form-control mb-4 date-selector--input" />
              <input onChange={justOneDayChange} type="checkbox" name="JustOneDay" id="JustOneDay" className="form-check-input"/> Csak egy nap!
            </div>
            <div className="col-lg-6 col-sm-12">
              <h4 className="mt-3">Meddig:</h4>
              <input type="date" className={`form-control date-selector--input`} disabled={justOneDay}/>
            </div>
            <div className="col-lg-12 col-sm-12">
              <input type="button" name="ResignBTN" id="ResignBTN" className="btn btn-success mt-5 date-selector--input" value="Lemondás"/>
            </div>
          </div>
        </div>
    )
}