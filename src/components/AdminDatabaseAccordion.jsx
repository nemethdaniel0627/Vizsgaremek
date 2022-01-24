import React from "react";
import { Accordion } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faEdit, faTimes, faUserTie, faUserTimes } from "@fortawesome/free-solid-svg-icons";
import Modal from "./AdminDatabaseModal";
import { useState } from "react";

export default function AdminDatabaseAccodrion(props) {

    const [modifyModalAppear, setModifyModal] = useState(false);
    const [deleteModalAppear, setDeleteModal] = useState(false);
    function ModifyModal(event) {
        setModifyModal(!modifyModalAppear);
    }

    function DeleteModal(event) {
        setDeleteModal(!deleteModalAppear);
    }

    function DateRewrite(date) {
        const temporaryDate = date.split('-');
        return temporaryDate[0] + ". " + temporaryDate[1] + ". " + temporaryDate[2] + ".";
    }

    function SelectionChange(e){
        e.target.selectedIndex = 0;
    }

    const dates = props.user.date ? props.user.date.split('#') : [];

    return (
        <Accordion.Item eventKey={props.eventkey} className="acc">
            <Accordion.Header className="acc-head ">
                <span className="fs-3">{props.user.name} - {props.user.class}</span>
            </Accordion.Header>
            <Accordion.Body className="acc-body">
                <div className="container mw-100">
                    <div className="row">
                        <div className="col-sm-12 col-lg-6 fs-4 mb-3">
                            <span className="key">Felhasználónév:</span>
                            <span className="me-5 float-end">{props.user.user}</span>

                        </div>
                        <hr className="col-12 col-lg-0 d-flex d-lg-none"/>
                        <div className="col-sm-12 col-lg-6 fs-4 mb-3">
                            <span className="key">E-mail:</span>
                            {props.isMobile ? <br/> : <></>}
                            <span className={"me-5 float-end " + (props.isMobile?"mobile-email" : "")}>{props.user.email}</span>
                        </div>
                        <hr />
                        <div className="col-sm-12 col-lg-6 fs-4 mb-3">
                            <span className="key">Befizetve:</span>
                            <span className={"me-5 float-end" + (props.user.isPaid ? " text-success" : " text-danger")}>{props.user.isPaid ? <FontAwesomeIcon icon={faCheck} /> : <FontAwesomeIcon icon={faTimes} />}</span>
                        </div>
                        <hr className="col-12 col-lg-0 d-flex d-lg-none"/>
                        <div className="col-sm-12 col-lg-6 fs-4 mb-3">
                            <span className="key">Összeg:</span>
                            <span className={"me-5 float-end"}>{props.user.value ? props.user.value : "Nincs befizetve!"}</span>
                        </div>
                        <hr />
                        <div className="col-sm-12 col-lg-12 fs-4 mb-3">
                            <span className="key">Lemondott napok:</span>
                            <select className={"form-select float-end fs-4 " + (props.isMobile ? "mobile-select" : "cancel-select")} onChange={SelectionChange}>
                                {props.user.date ? <option className="opt-first" value='0'>Napok:</option> : <option className="opt-first" value ='0'>Nincs</option>}
                                {dates.map((date,index) => (
                                    <option key={index}>{DateRewrite(date)}</option>
                                ))}

                            </select>
                        </div>
                        <hr />
                        <div className={"col-12" + (props.isMobile ? " text-center" : "")}>
                            <button className="btn btn-modify btn-darkMode fs-3 me-lg-5 mb-2 mb-lg-0" id={"btn_" + props.user.name + "-" + props.user.class} onClick={ModifyModal} ><FontAwesomeIcon id={"icon_" + props.user.name + "-" + props.user.class} icon={faEdit} /> Módosítás</button>
                            <button className="btn btn-delete btn-darkMode fs-3" id={"btn2_" + props.user.name + "-" + props.user.class} onClick={DeleteModal}><FontAwesomeIcon id={"icon2_" + props.user.name + "-" + props.user.class} icon={faUserTimes} /> Törlés</button>
                        </div>
                        {modifyModalAppear ? <Modal ModalClose={ModifyModal} title="Személy módosítása" message="" button="Módosítás" show={modifyModalAppear} type="Modify" user={props.user}></Modal> : <></>}
                        {deleteModalAppear ? <Modal ModalClose={DeleteModal} title="Személy törlése" message={"Biztosan törölni akarok ezt a személyt? (" + props.user.name + ")"} user={props.user} button="Törlés" show={deleteModalAppear} type="Delete" ></Modal> : <></>}
                    </div>
                </div>
            </Accordion.Body>
        </Accordion.Item>

    );
}

