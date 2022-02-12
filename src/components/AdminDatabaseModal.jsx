import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faFileUpload, faPlus, faTimesCircle, faUserPlus, faUserTimes } from "@fortawesome/free-solid-svg-icons";
import Modal from "react-bootstrap/Modal";
import Chips from './Chips';
import axios from 'axios'
import AuthUser from "../modules/AuthUser";
import { useLocation } from "react-router-dom";

export default function AdminDatabaseModal(props) {
  const [search, setSearch] = useState(props.show);
  const [dates, setDates] = useState([]);
  const [datesBool, setDatesBool] = useState(true);
  const [fileURL, setFileURL] = useState("");
  let user = {};

  if (props.user !== undefined) {
    user = props.user;
    if (props.user.date && dates.length === 0 && datesBool) {
      setDates(props.user.date.split('#'));
      setDatesBool(false);
    }
    
  }



  function newUserClick() {
    props.user.nev = document.getElementById('new_name').value;
    props.user.osztaly = document.getElementById('new_class').value;
    props.user.email = document.getElementById('new_email').value;
    props.user.omAZon = document.getElementById('new_username').value;
    props.user.befizetve = document.getElementById('new_isPaid').checked;
    props.user.value = document.getElementById('new_amount').value ? document.getElementById('new_amount').value + " Ft" : "Nincs befizetve!";
    let tmpIsPaid = props.user.isPaid;
    !document.getElementById('new_amount').value ? props.user.isPaid = false : props.user.isPaid = tmpIsPaid;
    props.user.date = dates.join('#');
    ModalClose();

  }

  function deleteUser() {
    axios.post("/userdelete",
    {
      omAzon: props.user.omAzon
    },
    AuthUser.authHeader())
    .then(response => {      
    })
    .catch(error => {
      console.error(error);
    })
    ModalClose();
    window.location.reload();
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


  function remove(e) {
    const date = dates.filter((item) => item !== dates[e]);
    console.log(date);
    return date;
  }


  function DateCancelDelete(e) {
    setDates(remove(e));
    console.log(dates);
  }


  function TextAbstract(text, length) {
    if (text == null) {
      return "";
    }
    if (text.length <= length) {
      return text;
    }
    text = text.toString().substring(0, length - 3);
    return text + "...";
  }

  function FileUploadText(e) {
    setFileURL(TextAbstract(e.target.value, 40));
  }

  function FileUploadModal() {
    return (
      <div>

        <label htmlFor="file" className="custom-file-upload btn btn-file fs-3 w-100">
          <input id="file" type="file" onChange={FileUploadText} />
          {fileURL ? fileURL : ""}
          <span className={"modal-file-before " + (fileURL !== "" ? "d-none" : "")}>
            <FontAwesomeIcon icon={faFileUpload} /> Fájl kiválasztása
          </span>
        </label>

        <div className="alert alert-file">A fájl formátumának meg kell felelnie a következőnek: <span className="fw-bold">.xls</span> vagy <span className="fw-bold">.csv</span> kiterjesztésű</div>

      </div>
    );
  }

  function NewUserModal(props) {
    return (
      <div className="fs-4 admin-modal">
        <div className="input-group mb-3">
          <label htmlFor="new_name " className="mb-2">Név:</label>
          <input type="text" id="new_name" className="w-100 form-control" defaultValue={user.nev} />
        </div>
        <div className="input-group mb-3">
          <label htmlFor="new_class" className="mb-2">Osztály:</label>
          <input type="text" id="new_class" className="w-100 form-control" defaultValue={user.osztaly} />
        </div>
        <div className="input-group mb-3">
          <label htmlFor="new_email" className="mb-2">E-mail cím:</label>
          <input type="email" id="new_email" className="w-100 form-control" defaultValue={user.email} />
        </div>
        <div className="input-group mb-3">
          <label htmlFor="new_username" className="mb-2">OM azonosító:</label>
          <input type="text" id="new_username" className="w-100 form-control" defaultValue={user.omAzon} />
        </div>
        <div className="form-check mb-3">
          <input className="form-check-input" type="checkbox" id="new_isPaid" defaultChecked={user.befizetve ? true : false} />
          <label className="form-check-label" htmlFor="new_isPaid">
            Befizetve
          </label>
        </div>
        <div className="mb-3">
          <label htmlFor="new_amount" className="mb-2">Összeg:</label>
          <div className="input-group">
            <input type="number" className="form-control" id="new_amount" defaultValue={user.value ? props.user.value.split(' ')[0] : ""} />
            <span className="input-group-text"> Ft</span>
          </div>
        </div>
        <div className="mb-4">
          <label htmlFor="new_date" className="mb-2">Lemondott nap(ok) hozzáadása</label>
          <div className="input-group">
            <input type="date" className="form-control" id="new_date" />
            <span className="input-group-text new-date-add" onClick={NewDateCancel}><FontAwesomeIcon icon={faPlus} /></span>
          </div>
        </div>
        {dates.lenght !== 0 ?
          dates.map((date, index) => (
            <Chips key={"c_" + index} removeIndex={index} date={DateRewrite(date)} closeDate={DateCancelDelete} />
          )) : <></>}

      </div>
    );
  }

  function DateRewrite(date) {
    const temporaryDate = date.split('-');
    return temporaryDate[0] + ". " + temporaryDate[1] + ". " + temporaryDate[2] + ".";
  }


  return (
    <div>
      <Modal show={search}>
        <Modal.Header closeButton>
          <Modal.Title><span className="fw-bold">{props.title}</span></Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {props.type === "File" ? <FileUploadModal /> : props.type === "New" ? <NewUserModal /> : props.type === "Modify" ? <NewUserModal name={props.nev} class={props.osztaly} email={props.email} user={props.user} isPaid={props.isPaid} value={props.value} dates={props.dates} /> : <></>}
          <span className="fs-3">{props.message}</span>
        </Modal.Body>
        <Modal.Footer>
          {props.type === "New" ?
            <button type="button" className="btn btn-modify fs-4">
              <FontAwesomeIcon icon={faUserPlus} /> <span> {props.button}</span>
            </button> :
            props.type === "File" ?
              <button type="button" className="btn btn-modify fs-4">
                <FontAwesomeIcon icon={faFileUpload} /> <span> {props.button}</span>
              </button> :
              props.type === "Modify" ?
                <button type="button" className="btn btn-modify fs-4" onClick={newUserClick}>
                  <FontAwesomeIcon icon={faEdit} /> <span> {props.button}</span>
                </button> :
                props.type === "Delete" ?
                  <button type="button" className="btn btn-modify fs-4" onClick={deleteUser}>
                    <FontAwesomeIcon icon={faUserTimes} /> <span> {props.button}</span>
                  </button> : <></>
          }
          <button
            type="button"
            className="btn btn-delete fs-4"
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




