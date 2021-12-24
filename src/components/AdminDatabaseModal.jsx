import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileUpload, faPlus, faTimes, faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import Modal from "react-bootstrap/Modal";
import ModalHeader from 'react-bootstrap/ModalHeader'

export default function AdminDatabaseModal(props) {
  const [search, setSearch] = useState(props.show);

  let dates = [];

  function ModalClose() {
    setSearch(!search);
    props.ModalClose();
  }

  function NewDateCancel()
  {
    dates.push(document.getElementById('new_date').value = "");

  }

  function FileUploadModal(props) {
    return (
      <div>

        <label for="file" className="custom-file-upload btn btn-file fs-3 w-100">
          <input id="file" type="file" />
          <FontAwesomeIcon icon={faFileUpload} /> Fájl kiválasztása
        </label>

      </div>
    );
  }

  function NewUserModal(props) {
    return (
      <div className="fs-4">
        <div className="input-group mb-3">
          <label for="new_name" className="mb-2">Név</label>
          <input type="text" id="new_name" className="w-100 form-control" />
        </div>
        <div className="input-group mb-3">
          <label for="new_class" className="mb-2">Osztály</label>
          <input type="text" id="new-class" className="w-100 form-control" />
        </div>
        <div className="input-group mb-3">
          <label for="new_email" className="mb-2">E-mail cím</label>
          <input type="email" id="new-email" className="w-100 form-control" />
        </div>
        <div className="input-group mb-3">
          <label for="new_username" className="mb-2">Felhasználónév</label>
          <input type="text" id="new_username" className="w-100 form-control" />
        </div>
        <div className="form-check mb-3">
          <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
          <label className="form-check-label" for="flexCheckDefault">
            Befizetve
          </label>
        </div>
        <div className="mb-3">
          <label for="new_amount" className="mb-2">Összeg</label>
          <div className="input-group">
            <input type="number" className="form-control" />
            <span className="input-group-text"> Ft</span>
          </div>
        </div>
        <div>
          <label for="new_date" className="mb-2">Lemondott nap(ok) hozzáadása</label>
          <div className="input-group">
            <input type="date" className="form-control" id = "new_date" />
            <span className="input-group-text new-date-add" onClick={NewDateCancel}><FontAwesomeIcon icon={faPlus} /></span>
          </div>
        </div>
        {dates.map(date => (
          <Chips date={date} />
        ))}
      </div>
    );
  }

  function Chips(props) {
    return (
      <div className="w-50 mt-2">
        <div className="input-group">
          <input type="date" value={props.date} className="form-control" readOnly disabled/>
          <span className="input-group-text new-date-add" ><FontAwesomeIcon icon={faTimes} /></span>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Modal show={search}>
        <Modal.Header closeButton>
          <Modal.Title><span className="fw-bold">{props.title}</span></Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {props.type === "File" ? <FileUploadModal /> : props.type === "New" ? <NewUserModal /> : <></>}
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




