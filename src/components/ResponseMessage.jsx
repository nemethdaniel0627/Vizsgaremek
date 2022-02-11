import React, { useEffect, useState } from 'react';
import { Alert, AlertTitle, Collapse, IconButton } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";

export default function ErrorMessage(props) {
    const [alertOpen, setAlertOpen] = useState(false);

    useEffect(() => {
        setAlertOpen(props.alertOpen);
    }, [props.alertOpen])

    useEffect(() => {
        if (!alertOpen) {
            props.setAlertOpen(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [alertOpen])

    return (
        <div className="error-message">
            <Collapse in={alertOpen}>
                <Alert
                    severity={props.type}
                    action={
                        <IconButton
                            aria-label="close"
                            color="inherit"
                            size="large"
                            onClick={() => {
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
                </Alert>
            </Collapse>
        </div>
    )
}