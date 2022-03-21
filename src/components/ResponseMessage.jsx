import React, { useEffect, useState } from 'react';
import { Alert, AlertTitle, Button, Collapse, IconButton } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";

export default function ErrorMessage(props) {
    const [alertOpen, setAlertOpen] = useState(undefined);

    useEffect(() => {
        setAlertOpen(props.alertOpen);
    }, [props.alertOpen])

    useEffect(() => {
        if (alertOpen === false) {
            props.setAlertOpen(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [alertOpen])

    return (
        <div className={`error-message ${props.fixed ? "position-fixed" : ""}`}>
            <Collapse in={alertOpen}>
                <Alert
                    severity={props.type}
                    action={
                        <IconButton
                            aria-label="close"
                            color="inherit"
                            size="large"
                            onClick={() => {
                                if (props.reload === true) window.location.reload();
                                setAlertOpen(false);
                            }}
                        >
                            <FontAwesomeIcon icon={faTimesCircle} />
                        </IconButton>
                    }
                    sx={{ mb: 2, fontSize: '1.2rem' }}
                >
                    <AlertTitle sx={{ fontSize: '1.8rem' }}>
                        {
                            props.type === "error" ? "Hiba"
                                : props.type === "success" ? "Sikeres művelet"
                                    : ""}
                    </AlertTitle>
                    {props.text.split("\n").map((text, index) => {
                        return (
                            <span key={`errorText_${index}`}>
                                {text}
                                <br />
                            </span>
                        )
                    })}
                    {props.buttons ?
                        <div className="d-flex align-items-center justify-content-around mt-2">
                            <Button id="responseYes" onClick={() => { props.buttonClick(); setAlertOpen(false); }} variant="contained" color="success">
                                Igen
                            </Button>
                            <Button onClick={() => { setAlertOpen(false); }} id="responseNo" variant="outlined" color="error">
                                Nem
                            </Button>
                        </div>
                        : <></>}
                </Alert>
            </Collapse>
        </div>
    )
}