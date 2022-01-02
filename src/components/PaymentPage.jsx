import React, { useState } from "react";
import Date from "./PaymentDateTable";
import DateMobile from "./PaymentDateTableMobile";
import Card from "./PaymentOptionCard";

export default function PaymentPage() {

    let isMobile = false;
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        isMobile = true;
    }    

    const [modify, cheking] = useState(false);
    const [type, typing] = useState('');

    function cardBtnClick(event) {
        cheking(!modify);
        typing(event.target.attributes[1].value.split('_')[1]);
    }

    return (
        <div className="mx-auto">

            {!modify ? 
            <div className="container mt-0 mt-lg-4">
                <div className="row">
                    <div className={"col-6 col-lg-3 mt-4 mt-lg-0 "}>
                        <Card btnClick={cardBtnClick} name="Teljes" price="10 000" breakfast="van" snackBefore="van" lunch="van" snackAfter="van" dinner="van"></Card>
                    </div>
                    <div className={"col-6 col-lg-3 mt-4 mt-lg-0 "}>
                        <Card btnClick={cardBtnClick} name="Kollégium+" price="9 000" breakfast="van" lunch="van" dinner="van"></Card>
                    </div>
                    <div className={"col-6 col-lg-3 mt-4 mt-lg-0"}>
                        <Card btnClick={cardBtnClick} name="Kollégium" price="8 000" breakfast="van" dinner="van"></Card>
                    </div>
                    <div className={"col-6 col-lg-3 mt-4 mt-lg-0 "}>
                        <Card btnClick={cardBtnClick} name="Ebéd" price="5 000" lunch="van" ></Card>
                    </div>
                </div>
            </div>
             : 
            <div className="mt-3">
                <div className="container">
                    <div className="row">
                        <div className="col-12 col-lg-10">
                            {isMobile ?  <DateMobile type={type}></DateMobile> :  <Date type={type}></Date>}
                        </div>

                        <div className="col-12 col-lg-2 mt-5 mt-lg-0">
                            {type === "Teljes" ? <Card btnClick={cardBtnClick} name="Teljes" price="10 000" breakfast="van" snackBefore="van" lunch="van" snackAfter="van" dinner="van" modify="true" ></Card> :
                             type === "Kollégium+" ? <Card btnClick={cardBtnClick} name="Kollégium+" price="9 000" breakfast="van" lunch="van" dinner="van" modify="true"></Card> :
                             type === "Kollégium" ? <Card btnClick={cardBtnClick} name="Kollégium" price="8 000" breakfast="van" dinner="van" modify="true"></Card> : 
                                                    <Card btnClick={cardBtnClick} name="Ebéd" price="5 000" lunch="van" modify="true" modify="true"></Card>
                            }
                            
                        </div>

                    </div>
                </div>

                <div className="form-check mx-auto w-50 mt-5">
                    <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                    <label className="form-check-label fs-5 text-light" htmlFor="flexCheckDefault">
                        Általános Szerződési Feltételek elfogadása
                    </label>
                </div>
                <div className="w-50 mx-auto mt-5">
                    <input type="submit" value="Fizetés" className="btn btn-success w-100 rounded fs-3" />
                </div>
            </div>
            }
        </div>
    );
}
