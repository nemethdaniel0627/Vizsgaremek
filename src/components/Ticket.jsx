import React from "react";
import QRcode from "qrcode.react";

export default function Ticket(props)
{
    
    return (<QRcode value={props.data} bgColor="#ffffff00" width="20%" height='20%' size={props.size} />);
}