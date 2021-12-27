import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faFileUpload, faPlus, faTimes, faTimesCircle, faUserPlus, faUserTimes } from "@fortawesome/free-solid-svg-icons";
import Modal from "react-bootstrap/Modal";
import ModalHeader from 'react-bootstrap/ModalHeader'

export default function AdminDatabaseModal(props) {
  const [search, setSearch] = useState(props.show);
  const [dates, setDates] = useState([]);
  const [datesBool, setDatesBool] = useState(true);
  if (props.dates && dates.length == 0 && datesBool) {
    setDates(props.dates.split('#'));
    setDatesBool(false);
  }

  function ModalClose() {
    setSearch(!search);
    props.ModalClose();
  }

  function NewDateCancel() {
    if (!dates.includes(document.getElementById('new_date').value)) {
      setDates([...dates, document.getElementById('new_date') ? document.getElementById('new_date').value : <></>]);
      document.getElementById('new_date').value = "";
    }
  }

  function NewDateCancelDelete(e) {
    const id = e.target.id;

    setDates(dates.filter(date => date != id.split('_')[1]));
  }

  function FileUploadModal(props) {
    return (
      <div>

        <label htmlFor="file" className="custom-file-upload btn btn-file fs-3 w-100">
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
          <label htmlFor="new_name" className="mb-2">Név:</label>
          <input type="text" id="new_name" className="w-100 form-control" value={props.name} />
        </div>
        <div className="input-group mb-3">
          <label htmlFor="new_class" className="mb-2">Osztály:</label>
          <input type="text" id="new-class" className="w-100 form-control" value={props.class} />
        </div>
        <div className="input-group mb-3">
          <label htmlFor="new_email" className="mb-2">E-mail cím:</label>
          <input type="email" id="new-email" className="w-100 form-control" value={props.email} />
        </div>
        <div className="input-group mb-3">
          <label htmlFor="new_username" className="mb-2">Felhasználónév:</label>
          <input type="text" id="new_username" className="w-100 form-control" value={props.user} />
        </div>
        <div className="form-check mb-3">
          {/* TODO EZ : NEM JÓ A CHECK A MODIFY-NÁL*/}
          <input className="form-check-input" type="checkbox" id="flexCheckDefault" {...props.isPaid ? "checked" : ""} />
          <label className="form-check-label" htmlFor="flexCheckDefault">
            Befizetve
          </label>
        </div>
        <div className="mb-3">
          <label htmlFor="new_amount" className="mb-2">Összeg:</label>
          <div className="input-group">
            {/* TODO EZ2 : NEM JÓ A VALUE A MODIFY-NÁL*/}
            <input type="number" className="form-control" />
            <span className="input-group-text"> Ft</span>
          </div>
        </div>
        <div>
          <label htmlFor="new_date" className="mb-2">Lemondott nap(ok) hozzáadása</label>
          <div className="input-group">
            <input type="date" className="form-control" id="new_date" />
            <span className="input-group-text new-date-add" onClick={NewDateCancel}><FontAwesomeIcon icon={faPlus} /></span>
          </div>
        </div>
        {dates.lenght != 0 ?
          dates.map((date, index) => (
            <Chips key={"c_" + index} date={date} />
          )) : <></>}

      </div>
    );
  }

  function DateRewrite(date) {
    const temporaryDate = date.split('-');
    return temporaryDate[0] + ". " + temporaryDate[1] + ". " + temporaryDate[2] + ".";
  }

  function Chips(props) {
    return (
      <div className="mt-2 admin-chips fs-5">
        <div className="">

          <label>{DateRewrite(props.date)}</label>
          {/* <input type="date" value= className="border-0" readOnly disabled /> */}
          <span className="ms-3 new-date-add" id={"btn_" + props.date} onClick={NewDateCancelDelete}>X</span>
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
          {props.type === "File" ? <FileUploadModal /> : props.type === "New" ? <NewUserModal /> : props.type === "Modify" ? <NewUserModal name={props.name} class={props.class} email={props.email} user={props.user} isPaid={props.isPaid} value={props.value} dates={props.dates} /> : <></>}
          {props.message}
        </Modal.Body>
        <Modal.Footer>
          <button type="button" className="btn btn-primary fs-4">
            {props.type === "New" ? <FontAwesomeIcon icon={faUserPlus} /> : props.type === "File" ? <FontAwesomeIcon icon={faFileUpload} /> : props.type === "Modify" ? <FontAwesomeIcon icon={faEdit} /> : props.type === "Delete" ? <FontAwesomeIcon icon={faUserTimes} /> : <></>}
            <span> {props.button}</span>
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




