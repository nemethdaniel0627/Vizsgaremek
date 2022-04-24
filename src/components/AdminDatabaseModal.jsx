import React, { useState } from "react";
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
  const [uploadFile, setUploadFile] = useState("");
  const [loading, setLoading] = useState(false);
  const [tmpUser, setTmpUser] = useState({
    nev: "",
    omAzon: "",
    osztaly: "",
    email: "",
    iskolaOM: "",
    jog: ""
  })

  if (props.user !== undefined) {
    if (props.user.date && dates.length === 0 && datesBool) {
      setDates(props.user.date.split('#'));
      setDatesBool(false);
    }

  }

  function modifyUser() {
    console.log("modify");
    if (tmpUser.nev.trim() !== "" && tmpUser.omAzon.trim() !== "" && tmpUser.email.trim() !== "" && tmpUser.iskolaOM.trim() !== "") {
      axios.put("/user/modify",
        {
          omAzon: props.user.omAzon,
          user: tmpUser
        }, AuthUser.authHeader())
        .then(response => {
          console.log(response);
          props.user.email = response.data.email;
          props.user.omAzon = response.data.omAzon;
          setAlertType("success");
          setAlertMessage("Sikeres felhasználó módosítás!");
          setAlertOpen(true)
        })
        .catch(error => {
          setAlertType("error");
          setAlertMessage("Hiba történt a felhasználó módosítása közben!");
          setAlertOpen(true)
        })
    }
    else {
      setAlertType("error");
      setAlertMessage(`Hiányzó adat!`);
      setAlertOpen(true)
    }

  }

  function deleteUser() {
    axios.delete("/user/delete",
      {
        data: {
          omAzon: props.user.omAzon
        },
        headers: AuthUser.headerAuthorization
      })
      .then(response => {
        setAlertType("success");
        window.location.reload();
        setAlertMessage("Sikeres felhasználó törlés!");
        setAlertOpen(true)
      })
      .catch(error => {
        setAlertType("error");
        setAlertMessage("Hiba történt a felhasználó törlése során!")
        setAlertOpen(true)
      })
  }

  function addUser() {

    if (tmpUser.nev.trim() !== ""
      && tmpUser.omAzon.trim() !== ""
      && tmpUser.email.trim() !== ""
      && tmpUser.iskolaOM.trim() !== ""
      && (tmpUser.jog.trim() === "2" && tmpUser.osztaly.trim() !== "" ?
        true :
        tmpUser.jog.trim() === "3" && tmpUser.osztaly.trim() === "" ?
          true :
          false)) {
      let addedUser = tmpUser;
      axios.post("/user/add",
        {
          user: addedUser
        },
        AuthUser.authHeader())
        .then(response => {
          setAlertType("success");
          setAlertMessage("Sikeres felhasználó hozzáadás!");
          setAlertOpen(true);
        })
        .catch(error => {
          setAlertType("error");
          setAlertMessage("Hiba történt a felhasználó hozzáadása közben!");
          setAlertOpen(true);
        });
    }
    else {
      setAlertType("error");
      setAlertMessage(`Hiányzó adat!`);
      setAlertOpen(true)
    }
  }

  function uploadUser() {
    setLoading(true);

    axios.post("/user/upload", {
      userRows: uploadFile
    }, AuthUser.authHeader())
      .then(response => {
        if (response.status === 207) {
          console.log(response.data);
          setAlertType("warning");
          setAlertMessage(`Pár felhasználót nem sikerült hozzáadni!`);
          setAlertOpen(true);
        }
        else {
          setAlertType("success");
          setAlertMessage("Sikeres felhasználók hozzáadása!");
          setAlertOpen(true);
        }
        let circleLoader = document.querySelector(".circle-loader");
        let checkMark = document.querySelector(".checkmark");
        circleLoader.classList.add("load-complete");
        checkMark.style.display = "block";

      })
      .catch(error => {
        console.error(error);
        setAlertType("error");
        setAlertMessage(`Hiba a hozzáadás közben`);
        setAlertOpen(true);
        let circleLoader = document.querySelector(".circle-loader");
        let cross = document.querySelector(".cross");
        circleLoader.classList.add("load-complete-error");
        cross.style.display = "block";

      })
  }

  function ModalClose() {
    setSearch(!search);
    props.ModalClose();
  }

  function FileUploadText(e) {
    const file = e.target.files[0];
    const reader = new FileReader();
    if (reader.readAsText) {
      reader.readAsText(file);
    }
    reader.addEventListener('loadend', () => {
      setUploadFile(reader.result);
    })
    setFileURL(file.name);
  }

  function getUserInfo(user) {
    setTmpUser(user);
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
              <button type="button" className="btn btn-modify fs-4 d-flex align-items-center gap-2" onClick={uploadUser}>
                {loading ?
                  <div className="circle-loader">
                    <div className="checkmark draw"></div>
                    <div className="cross"></div>
                  </div> :
                  <FontAwesomeIcon icon={faFileUpload} />
                } <span> {props.button}</span>
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
        <ResponseMessage
          setAlertOpen={setAlertOpen}
          alertOpen={alertOpen}
          text={alertMessage}
          type={alertType}
          reload={alertType === "success" ? true : false}
          customFunc={() => { setLoading(false) }} />
      </Modal>
    </div>
  );
}




