import React from "react";
import { Accordion } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faEdit, faTimes, faUserCheck, faUserPlus, faUserTimes } from "@fortawesome/free-solid-svg-icons";
import AdminDatabaseModal from "./AdminDatabaseModal";
import ResponseMessage from './ResponseMessage';
import { useState } from "react";
import ReadMoreIcon from '@mui/icons-material/ReadMore';
import { Link } from "react-router-dom";
import axios from "axios";
import AuthUser from "../modules/AuthUser";
import { useEffect } from "react";

export default function AdminDatabaseAccodrion(props) {

    const [modifyModalAppear, setModifyModal] = useState(false);
    const [deleteModalAppear, setDeleteModal] = useState(false);
    const [alertOpen, setAlertOpen] = useState(false);
    const [alertType, setAlertType] = useState(undefined);
    const [alertMessage, setAlertMessage] = useState("");

    function ModifyModal(event) {
        setModifyModal(!modifyModalAppear);
    }

    function DeleteModal(event) {
        setDeleteModal(!deleteModalAppear);
    }

    function acceptPending() {
        axios.put("/pending/accept",
            {
                omAzon: props.user.omAzon
            },
            AuthUser.authHeader())
            .then(response => {
                setAlertType("success");
                setAlertMessage("Sikeres elfogadás!")
                setAlertOpen(true);
            })
            .catch(error => {
                setAlertType("error");
                setAlertMessage("Sikertelen elfogadás!")
                setAlertOpen(true);
            });
    }

    function rejectPending() {
        axios.delete("/pending/reject",
            {
                omAzon: props.user.omAzon
            },
            AuthUser.authHeader())
            .then(response => {
                setAlertType("success");
                setAlertMessage("Sikeres elutasítás!")
                setAlertOpen(true);
            })
            .catch(error => {
                setAlertType("error");
                setAlertMessage("Sikertelen elutasítás!")
                setAlertOpen(true);
            });
    }

    useEffect(() => {
        if (alertType !== undefined) setAlertOpen(true);
    }, [alertType])

    return (
        <Accordion.Item eventKey={props.eventkey} className="acc">
            <Accordion.Header className={"acc-head " + (props.new ? "acc-head-new" : "")}>
                {props.new ? <span className="fs-3 new"><FontAwesomeIcon icon={faUserPlus} /></span> : <></>}
                <span className="fs-3">{props.user.nev} - {props.user.osztaly}</span>
            </Accordion.Header>
            <Accordion.Body className="acc-body">
                <div className="container mw-100">
                    <div className="row">
                        <div className="col-sm-12 col-lg-6 fs-4 mb-3">
                            <span className="key">Om azonosító:</span>
                            <span className="me-5 float-end">{props.user.omAzon}</span>

                        </div>
                        <hr className="col-12 col-lg-0 d-flex d-lg-none" />
                        <div className="col-sm-12 col-lg-6 fs-4 mb-3">
                            <span className="key">E-mail:</span>
                            {props.isMobile ? <br /> : <></>}
                            <span className={"me-5 float-end " + (props.isMobile ? "mobile-email" : "")}>{props.user.email}</span>
                        </div>
                        <hr />
                        {!props.new ? <><div className="col-sm-12 col-lg-6 fs-4 mb-3">
                            <span className="key">Befizetve:</span>
                            <span className={"me-5 float-end" + (props.user.befizetve ? " text-success" : " text-danger")}>{props.user.befizetve ? <FontAwesomeIcon icon={faCheck} /> : <FontAwesomeIcon icon={faTimes} />}</span>
                        </div>
                            <hr className="col-12 col-lg-0 d-flex d-lg-none" />
                            <div className="col-sm-12 col-lg-6 fs-4 mb-3">
                                <span className="key">Összeg:</span>
                                <span className={"me-5 float-end"}>{props.user.value ? props.user.value : "Nincs befizetve!"}</span>
                            </div>

                            <div className={"accordion_buttons" + (props.isMobile ? " text-center" : "")}>
                                <button className="btn btn-modify fs-3" id={"btn_" + props.user.nev + "-" + props.user.class} onClick={ModifyModal} ><FontAwesomeIcon id={"icon_" + props.user.nev + "-" + props.user.class} icon={faEdit} /> Módosítás</button>
                                <button className="btn btn-delete fs-3" id={"btn2_" + props.user.nev + "-" + props.user.class} onClick={DeleteModal}><FontAwesomeIcon id={"icon2_" + props.user.nev + "-" + props.user.class} icon={faUserTimes} /> Törlés</button>
                                <Link to={`/reszletes/${props.user.omAzon}`}><button className="btn btn-infos fs-3" id={"btn3_" + props.user.nev + "-" + props.user.class} onClick={DeleteModal}><ReadMoreIcon className="fs-1" fontSize="inherit" color="#000" /> Részletes adatok</button></Link>
                            </div></> : <><div className={"accordion_buttons" + (props.isMobile ? " text-center" : "")}>
                                <button className="btn btn-infos fs-3 me-lg-5 mb-2 mb-lg-0" id={"btn_" + props.user.nev + "-" + props.user.class} onClick={acceptPending} ><FontAwesomeIcon id={"icon_" + props.user.nev + "-" + props.user.class} icon={faUserCheck} /> Elfogadás</button>
                                <button className="btn btn-delete fs-3" id={"btn2_" + props.user.nev + "-" + props.user.class} onClick={rejectPending}><FontAwesomeIcon id={"icon2_" + props.user.nev + "-" + props.user.class} icon={faUserTimes} /> Elutasítás</button>
                            </div></>}

                        {modifyModalAppear ? <AdminDatabaseModal ModalClose={ModifyModal} title="Személy módosítása" message="" button="Módosítás" show={modifyModalAppear} type="Modify" user={props.user}></AdminDatabaseModal> : <></>}
                        {deleteModalAppear ? <AdminDatabaseModal ModalClose={DeleteModal} title="Személy törlése" message={"Biztosan törölni akarok ezt a személyt? (" + props.user.nev + ")"} user={props.user} button="Törlés" show={deleteModalAppear} type="Delete" ></AdminDatabaseModal> : <></>}
                    </div>
                </div>
                <ResponseMessage
                    setAlertOpen={setAlertOpen}
                    alertOpen={alertOpen}
                    text={alertMessage}
                    type={alertType}
                    reload={true} />
            </Accordion.Body>
        </Accordion.Item>

    );
}

