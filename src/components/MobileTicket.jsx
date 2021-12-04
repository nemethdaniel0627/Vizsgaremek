import React from "react";
import Ticket from "./Ticket";
import QRcode from "qrcode.react";

export default function MobileTicket() {
    return (

        <div id="ticket" className="border border-dark p-2 mx-auto w-75">

            <div className="mobile-ticket w-100" >
                <div className="container mx-auto p-5 w-100">
                    <div class="qrcode w-100 d-flex justify-content-center d-block d-lg-none" id="qrcode">
                        <Ticket data = "google.com" size = "64"/>
                    </div>
                </div>

            </div>
        </div>


    );
}