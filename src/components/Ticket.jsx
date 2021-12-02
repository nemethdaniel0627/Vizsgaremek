import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import axios from "axios";
import { URL } from "../utils/constants";
import QRCode from "qrcode.react";

export default function Ticket()
{
    function QRcodeLoader(dataRow) {
        let website = dataRow;
        if (website) {

            var qrcodeContainer = document.createElement('div');
            qrcodeContainer.innerHTML = "";
            new QRCode(qrcodeContainer, {
            text: website,
            title: "",
            colorDark: "#000000",
            colorLight: "#ffffff00",
            correctLevel: QRCode.CorrectLevel.H,
            });
        } else {
            console.log('Error');
        }
        return qrcodeContainer;
    }

    return QRcodeLoader('Valami.valami.valami,valami');
}