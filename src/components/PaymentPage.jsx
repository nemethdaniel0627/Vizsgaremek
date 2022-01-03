import React, { useState } from "react";
import Date from "./PaymentDateTable";
import DateMobile from "./PaymentDateTableMobile";
import Card from "./PaymentOptionCard";
import PaymentTableDateArray from "./PaymentTableDatesArray";

export default function PaymentPage() {

    let isMobile = false;
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        isMobile = true;
    }    

    const [modify, cheking] = useState(false);
    const [type, typing] = useState('');
    const dates = PaymentTableDateArray();

    function cardBtnClick(event) {
        cheking(!modify);
        typing(event.target.attributes[1].value.split('_')[1]);
    }

    function Pay(){
        console.log(dates);
    }

    return (
        <div className="mx-auto payment-page">

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
            <div className={"mt-3 div " + (!isMobile ? "desktop" : "mobile") }>
                <div className="container">
                    <div className="row">
                        <div className="col-12 col-lg-10">
                            {!isMobile ? <Date type={type} dates={dates}></Date> : <DateMobile type={type} dates={dates}></DateMobile>}
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

                <div className="mx-auto w-75 btn-div mt-5">
                    <button className="btn fs-3">Étlap megnyitása/letöltése</button>
                </div>

                <hr className="div-hr"/>
                <div className="w-50 mx-auto mt-5">
                    <button className="btn w-100 fs-2 btn-pay" onClick={Pay}>Fizetés</button>
                </div>
            </div>
            }
        </div>
    );
}
