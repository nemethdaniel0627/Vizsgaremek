import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationTriangle, faPaperPlane, faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";

export default function ReportPageModal(props) {

    function ModalClose() {
        props.ModalClose();
    }


    function ErrorModal() {
        return (
            <div className="fs-4 admin-modal">
                <div className="input-group mb-3">
                    <label htmlFor="where_error" className="mb-2">Hol a hiba?</label>
                    <input type="text" id="where_error" className="w-100 form-control" />
                </div>
                <div className="input-group mb-3">
                    <label htmlFor="error" className="mb-2">Hiba rövid leírása:</label>
                    <textarea className="w-100 form-control" name="" id="error" cols="30" rows="10"></textarea>
                </div>

            </div>
        );
    }

    function EmailModal() {
        return (
            <div className="fs-4 admin-modal">
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


    return (
        <div >
            <Modal show={props.show} className="Report-Modal">
                <Modal.Header closeButton>
                    <Modal.Title>{props.type === "error" ? <span className="fw-bold fs-2">Hiba jelentés</span> : props.type === "email" ? <span className="fw-bold fs-2">E-mail küldés</span> : <></>}</Modal.Title>
                </Modal.Header>
                <Modal.Body className="Report-Modal--body">
                    {props.type === "error" ? <ErrorModal/> : props.type === "email" ? <EmailModal/> : <></>}
                </Modal.Body>
                <Modal.Footer className="Report-Modal--body">
                    {props.type === "error" ? <button type="button" className="btn btn-send fs-4">
                        <FontAwesomeIcon icon={faExclamationTriangle} /> <span> Jelentés</span>
                    </button> : props.type === "email" ? <button type="button" className="btn btn-send fs-4">
                        <FontAwesomeIcon icon={faPaperPlane} /> <span> Küldés</span>
                    </button> : <></>}
                    <button
                        type="button"
                        className="btn btn-cancel fs-4"
                        data-bs-dismiss="modal"
                        onClick={ModalClose}
                    >
                        <FontAwesomeIcon icon={faTimesCircle} /> Mégsem
                    </button>
                </Modal.Footer>
            </Modal>

        </div>
    );
}