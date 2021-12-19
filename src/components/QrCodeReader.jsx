import React, { useEffect, useState } from "react";
import QrReader from "react-qr-reader";

export default function QrCodeReader() {
    const [qrResult, setQrResult] = useState("No result");

    let handleScan = data => {
        if (data) {
            setQrResult(data);
        }
    }

    let handleError = err => {
        console.error(err)
    }

    useEffect(() => {
        navigator.permissions.query({name: "camera"})
        .then((permissionObj) => {
            permissionObj.state = "allowed"
        })
        .catch(error => {
            console.log(error);
        })
        // if(navigator.mediaDevices) {
        //     navigator.mediaDevices.getUserMedia({audio: false, video: true});
        // }
    })

    function askPermission() {
        ServiceWorker.permissions.query({name: "camera"})
        .then((permissionObj) => {
            permissionObj.state = "allowed"
        })
        .catch(error => {
            console.log(error);
        })
        // Notification.requestPermission()
        // .then((permission) => {
        //     console.log(permission);
        // })        
    }

    return (
        <div>
            {qrResult === "No result" ?
                <QrReader
                    delay={300}
                    onError={handleError}
                    onScan={handleScan}
                    style={{ width: '100%' }}
                />
                : ""
            }
            <p>{qrResult}</p>
            <button onClick={askPermission}>Klikk</button>
        </div>
    )
}