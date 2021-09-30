import React from "react";
import ticketImg from "../images/icon.png";

export default function DesktopTicket() {
    return (
        <div id="ticket">
            <div className="front-side" id="front">
                <div className="color-grid">
                    <div className="black"></div>
                    <div className="red1"></div>
                    <div className="red2"></div>
                    <div className="green"></div>
                </div>
                <div className="info-grid">
                    <div className="name">
                        <h2 id="ticket_name">VezetékNév Keresztnév UtóNév</h2>
                        <h5 id="ticket_className">Osztály</h5>
                    </div>
                    <div className="img-tag">
                        <img src={ticketImg} alt="Icon" id="ticket--img" />
                    </div>
                    <div className="info-tag">
                        <h1 id="ticket_info">
                            <strong>Befizetve</strong>
                        </h1>
                    </div>
                    <div className="date">
                        <p>Dátum: ----------</p>
                    </div>
                </div>
            </div>
        </div>
    );
}