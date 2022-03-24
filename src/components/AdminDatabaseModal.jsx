import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faFileUpload, faTimesCircle, faUserPlus, faUserTimes } from "@fortawesome/free-solid-svg-icons";
import Modal from "react-bootstrap/Modal";
import axios from 'axios'
import AuthUser from "../modules/AuthUser";
import UserModal from "./UserModal";
import ResponseMessage from "./ResponseMessage";

export default function AdminDatabaseModal(props) {
  const [search, setSearch] = useState(props.show);
  const [dates, setDates] = useState([]);
  const [datesBool, setDatesBool] = useState(true);
  const [fileURL, setFileURL] = useState("");
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertType, setAlertType] = useState(undefined);
  const [alertMessage, setAlertMessage] = useState("");
  const [tmpUser, setTmpUser] = useState({
    nev: "",
    omAzon: "",
    osztaly: "",
    email: "",
    iskolaOM: "",
    befizetve: undefined,
    lemondva: []
  })
  // let user = {};

  if (props.user !== undefined) {
    // user = props.user;
    if (props.user.date && dates.length === 0 && datesBool) {
      setDates(props.user.date.split('#'));
      setDatesBool(false);
    }

  }

  function modifyUser() {
    console.log("modify");
    if (tmpUser.nev.trim() !== "" && tmpUser.omAzon.trim() !== "" && tmpUser.osztaly.trim() !== "" && tmpUser.email.trim() !== "" && tmpUser.iskolaOM.trim() !== "") {
      axios.post("/usermodify",
        {
          omAzon: props.user.omAzon,
          user: tmpUser
        }, AuthUser.authHeader())
        .then(response => {
          console.log(response);
          props.user.email = response.data.email;
          props.user.omAzon = response.data.omAzon;
          setAlertType(false);
          setAlertMessage("Sikeres felhasználó módosítás!");
          // ModalClose();
        })
        .catch(error => {
          setAlertType(true);
          setAlertMessage("Hiba történt a felhasználó módosítása közben!");
          //ERROR
        })
    }

  }

  function deleteUser() {
    axios.post("/userdelete",
      {
        omAzon: props.user.omAzon
      },
      AuthUser.authHeader())
      .then(response => {
        setAlertType(false);
        window.location.reload();
        setAlertMessage("Sikeres felhasználó törlés!");
      })
      .catch(error => {
        console.error(error);
        setAlertType(true);
        setAlertMessage("Hiba történt a felhasználó törlése során!")
      })
    // ModalClose();    
  }

  function addUser() {
    const loggedInUser = JSON.parse(sessionStorage.getItem("user"));
    setTmpUser(prevData => {
      return {
        ...prevData,
        iskolaOM: loggedInUser.iskolaOM
      }
    })

    if (tmpUser.nev.trim() !== "" && tmpUser.omAzon.trim() !== "" && tmpUser.osztaly.trim() !== "" && tmpUser.email.trim() !== "" && tmpUser.iskolaOM.trim() !== "") {
      let addedUser = tmpUser;
      axios.post("/useradd",
        {
          user: addedUser
        },
        AuthUser.authHeader())
        .then(response => {
          setAlertType(false);
          setAlertMessage("Sikeres felhasználó hozzáadás!");
        })
        .catch(error => {
          setAlertType(true);
          setAlertMessage("Hiba történt a felhasználó hozzáadása közben!");
        });
    }
    // ModalClose();
  }

  function ModalClose() {
    setSearch(!search);
    props.ModalClose();
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

  function getUserInfo(user) {
    setTmpUser(user);
  }

  useEffect(() => {
    if (alertType !== undefined) setAlertOpen(true);
  }, [alertType])

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

  return (
    <div>
      <Modal show={search}>
        <Modal.Header closeButton>
          <Modal.Title><span className="fw-bold">{props.title}</span></Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {props.type === "File" ? <FileUploadModal /> : props.type === "New" ? <UserModal getUserInfo={getUserInfo} /> : props.type === "Modify" ? <UserModal user={props.user} getUserInfo={getUserInfo} /> : <></>}
          <span className="fs-3">{props.message}</span>
        </Modal.Body>
        <Modal.Footer>
          {props.type === "New" ?
            <button type="button" onClick={addUser} className="btn btn-modify fs-4">
              <FontAwesomeIcon icon={faUserPlus} /> <span> {props.button}</span>
            </button> :
            props.type === "File" ?
              <button type="button" className="btn btn-modify fs-4">
                <FontAwesomeIcon icon={faFileUpload} /> <span> {props.button}</span>
              </button> :
              props.type === "Modify" ?
                <button type="button" className="btn btn-modify fs-4" onClick={modifyUser}>
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
        {alertType ?
          <ResponseMessage
            setAlertOpen={setAlertOpen}
            alertOpen={alertOpen}
            text={alertMessage}
            type="error" />
          : <ResponseMessage
            setAlertOpen={setAlertOpen}
            alertOpen={alertOpen}
            text={alertMessage}
            type="success" />}
      </Modal>
    </div>
  );
}




