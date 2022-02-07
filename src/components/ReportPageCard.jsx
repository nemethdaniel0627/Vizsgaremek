import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";


export default function ReportPageCard(props) {

    function ErrorSendRequest() {
        props.ErrorSendRequest();
    }

    function EmailModal(){
        props.EmailModal();
    }

    function Link(){
        window.location.href = "https://facebook.com"
    }

    function FaceBookIcon(){
        return (
            <div className={"col-1 " + (props.fontSize ? props.fontSize : "default")}><svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-facebook mb-2" viewBox="0 0 16 16">
            <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z" />
            </svg></div>
        );
    }

    function Nothing() { }

    return (

        <div className={"ReportCard " + (props.button ? "--button" : "")} onClick={(props.button && props.type==="error" ? ErrorSendRequest : props.type==="facebook" && props.button ? Link : props.type === "email" && props.button ? EmailModal : Nothing)}>
            <div className="container">
                <div className="row">
                    {props.type === "error" ? <div className={"col-1 " + (props.fontSize ? props.fontSize : "default")}><FontAwesomeIcon icon={faExclamationTriangle} /></div> : props.type === "facebook" ? <FaceBookIcon/> : props.type === "email" ? <div className={"col-1 " + (props.fontSize ? props.fontSize : "default")}><FontAwesomeIcon icon={faEnvelope} /></div> : <></>}
                    {props.header ? <div className="col-12 fs-4">{props.header}</div> : <></>}
                    <div className={(props.type === "text" ? "col-12 " : "col-11 ") + (props.fontSize ? props.fontSize : "default")}>{props.title}</div>
                </div>
            </div>
        </div>
    );
}
