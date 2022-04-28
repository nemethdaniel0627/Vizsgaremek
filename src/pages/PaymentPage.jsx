import React, { useState } from "react";
import PaymentDateTable from "../layouts/PaymentDateTable";
import PaymentDateTableMobile from "../layouts/PaymentDateTableMobile";
import PaymentOptionCard from "../components/PaymentOptionCard";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import PaymentTableDateArray from "../helpers/PaymentTableDatesArray";
import AuthUser from "../modules/AuthUser";
import modules from "../helpers/modules";
import axios from "axios";
import ResponseMessage from "../components/ResponseMessage";

export default function PaymentPage(props) {

    let isMobile = false;
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        isMobile = true;
    }

    const [modify, cheking] = useState(false);
    const [payable, changePayable] = useState(true);
    const [type, typing] = useState('');
    let dates = PaymentTableDateArray();
    // eslint-disable-next-line no-unused-vars
    const [sendDate, addSendDate] = useState([]);
    const [alertOpen, setAlertOpen] = useState(false);
    const [alertText, setAlertText] = useState("");
    const [alertType, setAlertType] = useState();

    function cardBtnClick(event) {
        cheking(!modify);
        typing(event.target.attributes[1].value.split('_')[1]);
    }

    function Pay() {

        let sendDate = []
        for (const date of dates) {
            if (date.cancellation !== null && date.cancellation !== true) {
                let tmpDate = modules.convertDateWithDash(new Date(`${date.year}-${date.month}-${date.day}`));
                sendDate.push(tmpDate);
            }
        }
        if (sendDate.length < 1) { changePayable(false); }
        let sendMeals = [];
        if (payable) {
            switch (type) {
                case "Teljes":
                    sendMeals = [1, 1, 1, 1, 1];
                    break;
                case "Kollégium+":
                    sendMeals = [1, 0, 1, 0, 1];
                    break;
                case "Kollégium":
                    sendMeals = [1, 0, 0, 0, 1];
                    break;
                case "Ebéd":
                    sendMeals = [0, 0, 1, 0, 0];
                    break;

                default:
                    break;
            }
            axios.post("/order",
                {
                    omAzon: props.user.omAzon,
                    dates: sendDate,
                    meals: sendMeals
                }, AuthUser.authHeader())
                .then(response => {

                    setAlertText("Sikeres ebéd befizetés!");
                    setAlertOpen(true);
                    setAlertType("success");
                })
                .catch(error => {
                    console.error(error);
                    setAlertText("Sikertelen ebéd befizetés!");
                    setAlertOpen(true);
                    setAlertType("error");
                })


        }


    }

    return (
        <div className="mx-auto payment-page">

            {!modify ?
                <div className="container mt-0 mt-lg-4">
                    <div className="row">
                        <div className={"col-lg-3 col-md-6 col-sm-12 mt-4 mt-lg-0 "}>
                            <PaymentOptionCard btnClick={cardBtnClick} name="Teljes" price="10 000" breakfast="van" snackBefore="van" lunch="van" snackAfter="van" dinner="van" mobile={isMobile}></PaymentOptionCard>
                        </div>
                        <div className={"col-lg-3 col-md-6 col-sm-12 mt-4 mt-lg-0 "}>
                            <PaymentOptionCard btnClick={cardBtnClick} name="Kollégium+" price="9 000" breakfast="van" lunch="van" dinner="van" mobile={isMobile}></PaymentOptionCard>
                        </div>
                        <div className={"col-lg-3 col-md-6 col-sm-12 mt-4 mt-lg-0"}>
                            <PaymentOptionCard btnClick={cardBtnClick} name="Kollégium" price="8 000" breakfast="van" dinner="van" mobile={isMobile}></PaymentOptionCard>
                        </div>
                        <div className={"col-lg-3 col-md-6 col-sm-12 mt-4 mt-lg-0 "}>
                            <PaymentOptionCard btnClick={cardBtnClick} name="Ebéd" price="5 000" lunch="van" mobile={isMobile}></PaymentOptionCard>
                        </div>
                    </div>
                </div>
                :
                <div className={"mt-3 div " + (!isMobile ? "desktop" : "mobile")}>
                    <div className="container">
                        <div className="row justify-content-around">
                            <div className="w-75 col-12 col-lg-10">
                                {!isMobile ? <PaymentDateTable type={type} dates={dates} sendDate={sendDate}></PaymentDateTable> : <PaymentDateTableMobile type={type} dates={dates} sendDate={sendDate} />}
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

                    <hr className="div-hr" />
                    <div className="w-50 mx-auto mt-5 mb-5">
                        <button className={"btn w-100 fs-2 btn-pay " + (payable ? "" : "notpayable")} onClick={Pay}>Fizetés</button>
                        {payable ? <></> : <div className="alert text-danger"><FontAwesomeIcon icon={faInfoCircle} /> Ne legyen minden nap kiválasztva lemondásra!</div>}
                    </div>
                </div>
            }
            <ResponseMessage
                setAlertOpen={setAlertOpen}
                alertOpen={alertOpen}
                text={alertText}
                type={alertType}
                fixed={true}
                customFunc={alertType === "succes" ? AuthUser.logoutUser() : () => { }} />
        </div>
    );
}
