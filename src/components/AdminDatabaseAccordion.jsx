import React from "react";
import { Accordion } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faEdit, faTimes, faUserTie, faUserTimes } from "@fortawesome/free-solid-svg-icons";
import Modal from "./AdminDatabaseModal";
import { useState } from "react";

export default function AdminDatabaseAccodrion(props) {

    const [modifyModalAppear, setModifyModal] = useState(false);
    const [deleteModalAppear, setDeleteModal] = useState(false);
    function ModifyModal() {
        setModifyModal(!modifyModalAppear);
    }

    function DeleteModal() {
        setDeleteModal(!deleteModalAppear);
    }

    function DateRewrite(date){
        const temporaryDate = date.split('-');
        return temporaryDate[0] + ". " + temporaryDate[1] + ". " + temporaryDate[2]+ ".";
    }

    const dates = props.date ? props.date.split('#') : [];

    return (
        <Accordion.Item eventKey={props.eventkey} className="mb-2">
                <Accordion.Header className="acc-head ">
                    <span className="fs-3">{props.name} - {props.class}</span>
                </Accordion.Header>
                <Accordion.Body className="acc-body">
                    <div className="container mw-100">
                        <div className="row">
                            <div className="col-sm-12 col-lg-6 fs-4 mb-3">
                                <span>Felhasználónév:</span>
                                <span className="me-5 float-end">{props.user}</span>

                            </div>
                            <div className="col-sm-12 col-lg-6 fs-4 mb-3">
                                <span>E-mail:</span>
                                <span className="me-5 float-end">{props.email}</span>
                            </div>
                            <hr />
                            <div className="col-sm-12 col-lg-6 fs-4 mb-3">
                                <span>Befizetve:</span>
                                <span className="me-5 float-end">{props.isPaid ? <FontAwesomeIcon icon={faCheck} /> : <FontAwesomeIcon icon={faTimes} />}</span>
                            </div>
                            <div className="col-sm-12 col-lg-6 fs-4 mb-3">
                                <span>Összeg:</span>
                                <span className="me-5 float-end">{props.value}</span>
                            </div>
                            <hr />
                            <div className="col-sm-12 col-lg-12 fs-4 mb-3">
                                <span className="align-middle">Lemondott napok:</span>
                                <select className="form-select w-25 float-end fs-4">
                                    {props.date ? <option className="opt-first" >Napok:</option> : <option className="opt-first" >Nincs</option>}
                                    {dates.map(date => (
                                        <option>{DateRewrite(date)}</option>
                                    ))}

                                </select>
                            </div>
                            <hr />
                            <div className="col-sm-12 col-lg-12">
                                <button className="btn btn-primary fs-3 me-5" onClick={ModifyModal} ><FontAwesomeIcon icon={faEdit} /> Módosítás</button>
                                {modifyModalAppear ? <Modal ModalClose={ModifyModal} title="Személy módosítása" message="" button="Módosítás" show={modifyModalAppear} type="Modify" name={props.name} class={props.class} email={props.email} user={props.user} isPaid={props.isPaid} value={props.value} dates={props.date}></Modal> : <></>}
                                <button className="btn btn-danger fs-3" onClick={DeleteModal}><FontAwesomeIcon icon={faUserTimes} /> Törlés</button>
                                {deleteModalAppear ? <Modal ModalClose={DeleteModal} title="Személy törlése" message={"Biztosan törölni akarok ezt a személyt? (" + props.name + ")"} button="Törlés" show={deleteModalAppear} type="Delete" ></Modal> : <></>}
                            </div>
                        </div>
                    </div>
                </Accordion.Body>
            </Accordion.Item>
        
    );
}

