import React from "react";
import Ticket from "./Ticket";
import ticketImg from "../images/icon.png";

export default function DesktopTicket(props) {


    return (
        <div id="ticket" className="border border-dark p-2 mx-auto">
            <div className="container mx-auto p-2">
                <div className="row">
                    <div className="col-lg-4 col-sm-12 col-md-12">
                        <img src={ticketImg} alt="Icon" className="mx-auto d-none d-lg-block align-center" id="Ticket_img" />
                        <div className="qrcode w-100 d-flex justify-content-center d-block d-lg-none p-3" id="qrcode">
                            <Ticket data={`{"nev": "${props.vnev} ${props.kNev}", "osztaly": "${props.osztaly}", "userOM": "${props.om}", "iskolaOM": "${props.iskolaOm}", "befizetve": ${props.befizetve}}`} size={256} />
                        </div>
                    </div>
                    <div className="col-lg-8 col-sm-12 border-start border-dark d-none d-lg-block" id="Ticket_infos">
                        <h2 id="Ticket_name" className="mb-1 ms-1 fs-1">{props.user.vNev} {props.user.kNev}</h2>
                        <h5 id="Ticket_class" className="ms-1">{props.user.osztaly}</h5>
                        <h1 id="Ticket_info" className="text-center mt-3 ms-1">
                            <strong>{props.user.befizetve ? "Befizetve" : props.user.befizetve === null ? "Nincs befizetve" : "Lemondta mára"}</strong>
                        </h1>
                        <div className="date mt-4 ms-1">
                            <p>Dátum: {props.user.datum}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}