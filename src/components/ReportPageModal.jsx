import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationTriangle, faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";

export default function AdminDatabaseModal(props) {
    const [error, setError] = useState(props.show);

    function ModalClose() {
        setError(!error);
        props.ModalClose();
    }



    return (
        <div >
            <Modal show={props.show}>
                <Modal.Header closeButton>
                    <Modal.Title><span className="fw-bold fs-2">Hiba jelentés</span></Modal.Title>
                </Modal.Header>
                <Modal.Body className="Report-Modal">
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
                </Modal.Body>
                <Modal.Footer className="Report-Modal">
                    <button type="button" className="btn btn-send fs-4">
                        <FontAwesomeIcon icon={faExclamationTriangle} /> <span> Jelentés</span>
                    </button>
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