import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faFileUpload, faPlus, faTimesCircle, faUserPlus, faUserTimes } from "@fortawesome/free-solid-svg-icons";
import Modal from "react-bootstrap/Modal";
import Chips from './Chips';
import axios from 'axios'
import AuthUser from "../modules/AuthUser";
import UserModal from "./UserModal";
import ResponseMessage from "./ResponseMessage";

export default function AdminDatabaseModal(props) {
  const [search, setSearch] = useState(props.show);
  const [dates, setDates] = useState([]);
  const [datesBool, setDatesBool] = useState(true);
  const [fileURL, setFileURL] = useState("");
  const [canceledDate, setCanceledDate] = useState("");
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertType, setAlertType] = useState(undefined);
  const [alertMessage, setAlertMessage] = useState("");
  const [tmpUser, setTmpUser] = useState({
    nev: "",
    omAzon: undefined,
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
          user: tmpUser
        }, AuthUser.authHeader())
        .then(response => {
          console.log(response);
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
      let valami = tmpUser;
      valami.password = "alma";
      axios.post("/useradd",
        {
          user: valami
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

  function dateChange(event) {
    const value = event.target.value;
    console.log(value);
    setDates(prevDates => {
      return [...prevDates, value];
    })
    setCanceledDate("");
  }

  // function NewUserModal(props) {


  //   console.log("asd");
  //   return (
  //     <div className="fs-4 admin-modal">
  //       <div className="input-group mb-3">
  //         <label htmlFor="new_name " className="mb-2">Név:</label>
  //         <input type="text" name="nev" onChange={inputChange} value={tmpUser.nev} className="w-100 form-control" />
  //       </div>
  //       <div className="input-group mb-3">
  //         <label htmlFor="new_class" className="mb-2">Osztály:</label>
  //         <input type="text" name="osztaly" onChange={inputChange} value={tmpUser.osztaly} className="w-100 form-control" defaultValue={user.osztaly} />
  //       </div>
  //       <div className="input-group mb-3">
  //         <label htmlFor="new_email" className="mb-2">E-mail cím:</label>
  //         <input type="email" name="email" onChange={inputChange} value={tmpUser.email} className="w-100 form-control" defaultValue={user.email} />
  //       </div>
  //       <div className="input-group mb-3">
  //         <label htmlFor="new_username" className="mb-2">OM azonosító:</label>
  //         <input type="text" name="omAzon" onChange={inputChange} value={tmpUser.omAzon} className="w-100 form-control" defaultValue={user.omAzon} />
  //       </div>
  //       <div className="form-check mb-3">
  //         <input className="form-check-input" name="befizetve" onChange={inputChange} value={tmpUser.befizetve} type="checkbox" defaultChecked={user.befizetve ? true : false} />
  //         <label className="form-check-label" htmlFor="new_isPaid">
  //           Befizetve
  //         </label>
  //       </div>
  //       <div className="mb-4">
  //         <label htmlFor="new_date" className="mb-2">Lemondott nap(ok) hozzáadása</label>
  //         <div className="input-group">
  //           <input onChange={dateChange} value={canceledDate} type="date" id="new_date" className="form-control date-selector--input" />
  //         </div>
  //       </div>
  //       {dates.lenght !== 0 ?
  //         dates.map((date, index) => (
  //           <Chips key={"c_" + index} removeIndex={index} date={DateRewrite(date)} closeDate={DateCancelDelete} />
  //         )) : <></>}

  //     </div>
  //   );
  // }

  function DateRewrite(date) {
    const temporaryDate = date.split('-');
    return temporaryDate[0] + ". " + temporaryDate[1] + ". " + temporaryDate[2];
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




