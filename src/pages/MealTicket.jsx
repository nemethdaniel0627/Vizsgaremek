import React from "react";
import ticketImg from "../images/icon.png";
import QRcode from "qrcode.react";

export default function MealTicket(props) {
    return (
        <div>
            <div id="ticket" className="border border-dark p-2 w-75 mx-auto">
                <div className="container mx-auto p-2">
                    <div className="row">
                        <div className="col-lg-4 col-sm-12 col-md-12">
                            <img src={ticketImg} alt="Icon" className="mx-auto d-none d-lg-block align-center" id="Ticket_img" />
                            {/* {props.user.befizetve !== false && props.user.befizetve !== null ? */}
                                <div className="qrcode w-100 d-flex justify-content-center d-block d-lg-none p-3" id="qrcode">
                                    <QRcode value={`{"nev": "${props.user.nev}", "osztaly": "${props.user.osztaly}", "omAzon": "${props.user.omAzon}", "iskolaNev": "${props.user.iskolaNev}", "befizetve": ${props.user.befizetve}}`} bgColor="#ffffff00" width="20%" height='20%' size={100} />
                                </div>
                                {/* :
                                <i />} */}
                        </div>
                        <div className="col-lg-8 col-sm-12 border-start border-dark d-lg-block" id="Ticket_infos">
                            <h2 id="Ticket_name" className="mb-1 ms-1 fs-1">{props.user.nev}</h2>
                            <h5 id="Ticket_class" className="ms-1">{props.user.osztaly}</h5>
                            <h1 id="Ticket_info" className="text-center mt-3 ms-1">
                                <strong>{props.user.befizetve ? "Befizetve" : props.user.befizetve === null ? "Nincs befizetve" : "Lemondta mára"}</strong>
                            </h1>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}