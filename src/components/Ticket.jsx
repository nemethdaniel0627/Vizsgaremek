import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import axios from "axios";
import { URL } from "../utils/constants";
import QRcode from "qrcode.react";

export default function Ticket(props)
{
    return (<QRcode value={props.data} bgColor="#ffffff00" width="20%" height='20%' size={props.size} />);
}