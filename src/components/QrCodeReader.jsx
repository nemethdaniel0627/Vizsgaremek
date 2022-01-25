import React, { useEffect, useState } from "react";
import QrReader from "react-qr-reader";
import PermissionPopup from "./PermissionPopup";

export default function QrCodeReader() {
    const [isCamera, setIsCamera] = useState(false);
    const [qrResult, setQrResult] = useState({ nev: "Teszt Elek", osztaly: "12.a", iskola: "Jedlik Ányos Technikum És Kollégium", befizetve: false });
    // const [qrResult, setQrResult] = useState({ nev: "", osztaly: "", befizetve: null });

    let handleScan = data => {
        if (data) {
            console.log(data);
            const tmpJson = JSON.parse(data);
            setQrResult({
                nev: tmpJson.nev,
                osztaly: tmpJson.osztaly,
                befizetve: tmpJson.befizetve,
                iskola: tmpJson.iskola
            });
            console.log(isCamera);
        }
    }

    let handleError = err => {
        console.error(err)
    }

    useEffect(() => {
        if (isCamera !== null || isCamera === "false") {
            navigator.permissions.query({ name: "camera" })
                .then((permissionObj) => {
                    console.log(permissionObj.state);
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
                    console.log(error);
                })
        }

    }, [isCamera])    

    function askPermission(denied) {
        var now = Date.now();
        navigator.mediaDevices.getUserMedia({ audio: false, video: true })
            .then(function (stream) {
                console.log('Got stream, time diff :', Date.now() - now);
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
                        <div className="qr-result--item">Ebédelhet? {qrResult.befizetve ? "Igen" : "Nincs befizetve"}</div>
                        <div className="qr-result--item">Iskola:  <div className="qr-result--item--school">{qrResult.iskola}</div></div>
                        <button className="qr-result--button" onClick={newRead}>
                            <div>Új beolvas</div>
                        </button>
                    </div>
            }
        </div>
    )
}