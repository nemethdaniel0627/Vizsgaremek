import axios from "axios";
import React, { useEffect, useState } from "react";
import QrReader from "react-qr-reader";
import PermissionPopup from "../components/PermissionPopup";
import Loader from "../layouts/Loader";
import AuthUser from "../modules/AuthUser";

export default function QrCodeReader() {
    const [isCamera, setIsCamera] = useState(false);
    const [qrResult, setQrResult] = useState({ nev: "Teszt Elek", omAzon: 1231231231, osztaly: "12.A", iskolaNev: "Jedlik Ányos Technikum És Kollégium", befizetve: false });
    // const [qrResult, setQrResult] = useState({ nev: "", osztaly: "", befizetve: null });
    const [loading, setLoading] = useState(false);

    let handleScan = data => {
        if (data) {

            const tmpJson = JSON.parse(data);

            setLoading(true);
            axios.post("/scan",
                {
                    omAzon: tmpJson.omAzon
                }, AuthUser.authHeader())
                .then(response => {

                    setQrResult({
                        nev: tmpJson.nev,
                        osztaly: tmpJson.osztaly,
                        befizetve: response.data.befizetve,
                        iskolaNev: tmpJson.iskolaNev
                    });
                    setLoading(false);
                })
                .catch(error => {
                    console.error(error);
                    setLoading(false);
                })


        }
    }

    let handleError = err => {
        console.error(err)
    }

    useEffect(() => {
        if (isCamera !== null || isCamera === "false") {
            navigator.permissions.query({ name: "camera" })
                .then((permissionObj) => {

                    if (permissionObj.state === "granted")
                        setIsCamera(true);

                    else if (permissionObj.state === "prompt") {
                        askPermission();
                        !isCamera ? setIsCamera("false") : setIsCamera(false);
                    }
                    else {
                        askPermission(true);
                        setIsCamera(false);
                    }
                })
                .catch(error => {
                    console.error(error);
                })
        }

    }, [isCamera])

    function askPermission(denied) {
        navigator.mediaDevices.getUserMedia({ audio: false, video: true })
            .then(function (stream) {

            })
            .catch(function (err) {
                if (denied) setIsCamera(null);
            });
    }

    function newRead() {
        setIsCamera(false);
        setQrResult({ nev: "", osztaly: "", befizetve: null });
    }

    return (
        <div className="qr-result--wrapper">
            {loading ? <Loader /> : <></>}
            <div id="control-height"></div>
            {isCamera && isCamera !== "false" && qrResult.befizetve === null ?
                <QrReader
                    delay={300}
                    onError={handleError}
                    onScan={handleScan}
                    style={{ width: '100%' }}
                    className="qr-reader"
                />
                : isCamera === null ?
                    <PermissionPopup />
                    :
                    <div className="qr-result">
                        <div className="qr-result--item qr-result--name">{qrResult.nev}</div>
                        <div className="qr-result--item">Osztály:  {qrResult.osztaly}</div>
                        <div className="qr-result--item">Ebédelhet? {qrResult.befizetve}</div>
                        <div className="qr-result--item">Iskola:  <div className="qr-result--item--school">{qrResult.iskolaNev}</div></div>
                        <button className="qr-result--button" onClick={newRead}>
                            <div>Új beolvas</div>
                        </button>
                    </div>
            }

        </div>
    )
}