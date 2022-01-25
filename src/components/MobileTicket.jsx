import React from "react";
import Ticket from "./Ticket";

export default function MobileTicket(props) {
    return (

        <div id="ticket" className="border border-dark p-2 mx-auto w-75">

            <div className="mobile-ticket w-100" >
                <div className="container mx-auto p-5 w-100">
                    <div className="qrcode w-100 d-flex justify-content-center d-block d-lg-none" id="qrcode">
                        <Ticket data={`{"nev": "${props.vnev} ${props.kNev}", "osztaly": "${props.osztaly}", "userOM": "${props.om}", "iskolaOM": "${props.iskolaOm}", "befizetve": ${props.befizetve}}`} size={100} />
                    </div>
                </div>

            </div>
        </div>


    );
}