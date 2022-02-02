import React, { useState } from "react";
import PaymentDateTable from "../layouts/PaymentDateTable";
import PaymentDateTableMobile from "../layouts/PaymentDateTableMobile";
import PaymentOptionCard from "../components/PaymentOptionCard";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import PaymentTableDateArray from "../helpers/PaymentTableDatesArray";

export default function PaymentPage() {

    let isMobile = false;
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        isMobile = true;
    }

    const [modify, cheking] = useState(false);
    const [payable, changePayable] = useState(true);
    const [type, typing] = useState('');
    const dates = PaymentTableDateArray();

    function cardBtnClick(event) {
        cheking(!modify);
        typing(event.target.attributes[1].value.split('_')[1]);
    }

    function Pay() {
        changePayable(false);
        for (const date of dates) {
            if (!date.cancel && date.cancel !== null) {
                changePayable(true);
                console.log(dates);
                //TODO FIZETES

                break;
            }
        }

        console.log(payable);

        for (const date of dates) {
            if (date.cancel === null) {
            } else {
                date.cancel = false;
            }
        }
    }

    return (
        <div className="mx-auto payment-page">

            {!modify ?
                <div className="container mt-0 mt-lg-4">
                    <div className="row">
                        <div className={"col-6 col-lg-3 mt-4 mt-lg-0 "}>
                            <PaymentOptionCard btnClick={cardBtnClick} name="Teljes" price="10 000" breakfast="van" snackBefore="van" lunch="van" snackAfter="van" dinner="van" mobile={isMobile}></PaymentOptionCard>
                        </div>
                        <div className={"col-6 col-lg-3 mt-4 mt-lg-0 "}>
                            <PaymentOptionCard btnClick={cardBtnClick} name="Kollégium+" price="9 000" breakfast="van" lunch="van" dinner="van" mobile={isMobile}></PaymentOptionCard>
                        </div>
                        <div className={"col-6 col-lg-3 mt-4 mt-lg-0"}>
                            <PaymentOptionCard btnClick={cardBtnClick} name="Kollégium" price="8 000" breakfast="van" dinner="van" mobile={isMobile}></PaymentOptionCard>
                        </div>
                        <div className={"col-6 col-lg-3 mt-4 mt-lg-0 "}>
                            <PaymentOptionCard btnClick={cardBtnClick} name="Ebéd" price="5 000" lunch="van" mobile={isMobile}></PaymentOptionCard>
                        </div>
                    </div>
                </div>
                :
                <div className={"mt-3 div " + (!isMobile ? "desktop" : "mobile")}>
                    <div className="container">
                        <div className="row">
                            <div className="col-12 col-lg-10">
                                {!isMobile ? <PaymentDateTable type={type} dates={dates}></PaymentDateTable> : <PaymentDateTableMobile type={type} dates={dates}></PaymentDateTableMobile>}
                            </div>

                            <div className="col-12 col-lg-2 mt-5 mt-lg-0">
                                {type === "Teljes" ? <PaymentOptionCard btnClick={cardBtnClick} name="Teljes" price="10 000" breakfast="van" snackBefore="van" lunch="van" snackAfter="van" dinner="van" modify="true" ></PaymentOptionCard> :
                                    type === "Kollégium+" ? <PaymentOptionCard btnClick={cardBtnClick} name="Kollégium+" price="9 000" breakfast="van" lunch="van" dinner="van" modify="true"></PaymentOptionCard> :
                                        type === "Kollégium" ? <PaymentOptionCard btnClick={cardBtnClick} name="Kollégium" price="8 000" breakfast="van" dinner="van" modify="true"></PaymentOptionCard> :
                                            <PaymentOptionCard btnClick={cardBtnClick} name="Ebéd" price="5 000" lunch="van" modify="true"></PaymentOptionCard>
                                }

                            </div>

                        </div>
                    </div>

                    <div className="mx-auto w-75 btn-div mt-5">
                        <button className="btn fs-3">Étlap megnyitása/letöltése</button>
                    </div>

                    <hr className="div-hr" />
                    <div className="w-50 mx-auto mt-5 mb-5">
                        <button className={"btn w-100 fs-2 btn-pay " + (payable ? "" : "notpayable")} onClick={Pay}>Fizetés</button>
                        {payable ? <></> : <div className="alert text-danger"><FontAwesomeIcon icon={faInfoCircle} /> Ne legyen minden nap kiválasztva lemondásra!</div>}
                    </div>
                </div>
            }
        </div>
    );
}
