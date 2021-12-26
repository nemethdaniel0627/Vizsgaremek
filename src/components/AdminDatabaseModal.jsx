import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileUpload, faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import Modal from "react-bootstrap/Modal";
import ModalHeader from 'react-bootstrap/ModalHeader'

export default function AdminDatabaseModal(props) {
  const [search, setSearch] = useState(props.show);

  function ModalClose() {
    setSearch(!search);
    props.ModalClose();
  }

  return (
    <div>
      <Modal show={search}>
        <Modal.Header closeButton>
          <Modal.Title>{props.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {
            (props.type === "upload" ? (
              <label for="file" className="custom-file-upload btn btn-file fs-3 w-100">
                <input id="file" type="file" />
                <FontAwesomeIcon icon={faFileUpload}/> Fájl kiválasztása
              </label>
            ) : (
              props.message
            ))
          }
        </Modal.Body>
        <Modal.Footer>
          <button type="button" className="btn btn-primary fs-4">
            {props.button}
          </button>
          <button
            type="button"
            className="btn btn-danger fs-4"
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
