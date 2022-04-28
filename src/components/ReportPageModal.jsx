import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle, faExclamationTriangle, faPaperPlane, faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import axios from "axios";

export default function ReportPageModal(props) {
    const user = props.user.props;

    const [sended, changeSended] = useState(false);

    const [sending, changeSending] = useState(false);

    const [error, setError] = useState(false);

    function ModalClose() {
        changeSended(false);
        setError(false);
        props.ModalClose();
    }

    function Send() {
        changeSended(!sended);
        changeSending(false);
        check = true;
    }

    function Sending() {
        changeSending(!sending);
        check = false;
    }

    function Checking() {
        setError(false);
        return document.getElementById('message_where').value !== "" && document.getElementById('message_what').value !== "" && check ? true : false;
    }

    function sendEmail(e) {
        if (Checking()) {
            Sending();

            axios.post("/email",
                {
                    email: user.email,
                    nev: user.nev,
                    osztaly: user.osztaly,
                    omAzon: user.omAzon,
                    where: document.getElementById('message_where').value,
                    what: document.getElementById('message_what').value,
                    fromEmail: user.email,
                    type: "report"
                },
                {
                    headers: {
                        "Authorization": `Baerer ${sessionStorage.getItem("token")}`
                    }
                })
                .then(response => {

                    Send();
                })
                .catch(error => {
                    console.error(error);
                    setError(true);
                });
        } else {
            setError(true);
        }

    }

    let check = false;

    function CheckboxChange(e) {
        check = e.target.checked;
    }

    function ErrorModal() {
        return (
            <div className="fs-4 ReportModal">
                <div className="input-group mb-3 input-container">
                    <label htmlFor="where_error" className="mb-2">Hol a hiba?</label>
                    <input type="text" id="message_where" className="w-100 form-control" name="message_where" />
                </div>
                <div className="input-group mb-5 input-container">
                    <label htmlFor="error" className="mb-2">Hiba rövid leírása:</label>
                    <textarea className="w-100 form-control" id="message_what" cols="30" rows="10" name="message_what"></textarea>
                </div>
                <div className="form-check checkbox">
                    <input className="form-check-input" type="checkbox" id="hozza" onChange={CheckboxChange} />
                    <label className="form-check-label" htmlFor="hozza">
                        Hozzájárulok az adataim elküldésére
                    </label>
                </div>
                {error ? <span className="alert alert-danger mb-2 ">Nincs kitöltve minden adat!</span> : <></>}
            </div>
        );
    }

    function EmailModal() {
        return (
            <div className="fs-4">
                <div className="input-group mb-3">
                    <label htmlFor="where_error" className="mb-2">Tárgy:</label>
                    <input type="text" id="where_error" className="w-100 form-control" />
                </div>
                <div className="input-group mb-3">
                    <label htmlFor="email" className="mb-2">Tartalom:</label>
                    <textarea className="w-100 form-control" name="" id="email" cols="30" rows="10"></textarea>
                </div>

            </div>
        );
    }

    function EmailSendedBody() {
        return (
            <div className="fs-4 ">
                <h2>E-mail elküldve!</h2>
            </div>
        );
    }

    function EmailSending() {
        return (
            <div className="fs-4 ">
                <div disabled>
                    <span className="spinner-border" role="status" aria-hidden="true"></span>
                    <strong>E-mail küldése...</strong>
                </div>
            </div>
        );
    }


    return (
        <form>
            <Modal show={props.show} className="Report-Modal">
                <Modal.Header closeButton>
                    <Modal.Title>{props.type === "error" ? <span className="fw-bold fs-2">Hiba jelentés</span> : props.type === "email" ? <span className="fw-bold fs-2">E-mail küldés</span> : <></>}</Modal.Title>
                </Modal.Header>
                <Modal.Body className="Report-Modal--body">
                    {sending ? <EmailSending /> : sended ? <EmailSendedBody /> : props.type === "error" ? <ErrorModal /> : props.type === "email" ? <EmailModal /> : <></>}
                </Modal.Body>
                <Modal.Footer className="Report-Modal--body">
                    {sended ? <></> : props.type === "error" ? <button type="submit" className="btn btn-send fs-4" onClick={sendEmail} >
                        <FontAwesomeIcon icon={faExclamationTriangle} /> <span> Jelentés</span>
                    </button> : props.type === "email" ? <button type="submit" className="btn btn-send fs-4" disabled={sending}>
                        <FontAwesomeIcon icon={faPaperPlane} /> <span> Küldés</span>
                    </button> : <></>}
                    <button
                        type="button"
                        className={"btn fs-4" + (sended ? " btn-send" : " btn-cancel")}
                        data-bs-dismiss="modal"
                        onClick={ModalClose}
                        disabled={sending}
                    >
                        {sended ? <span><FontAwesomeIcon icon={faCheckCircle} /> Értem</span> : <span><FontAwesomeIcon icon={faTimesCircle} /> Mégsem</span>}
                    </button>
                </Modal.Footer>
            </Modal>

        </form>
    );
}