import React from "react";
import { Accordion } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faEdit, faTimes, faUserTimes } from "@fortawesome/free-solid-svg-icons";

export default function AdminDatabaseAccodrion(props) {


    const dates = props.date ? props.date.split('#') : [];

    return (
        <Accordion>
            <Accordion.Item eventKey="0">
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
                                    {props.date ? <option>Napok:</option> : <option>Nincs</option>}
                                    {dates.map((date, index) => (
                                        <option key={`option_${index}`}>{date}</option>
                                    ))}
                                    
                                </select>
                            </div>
                            <hr />
                            <div className="col-sm-12 col-lg-12">
                                <button className="btn btn-primary fs-3 me-5"><FontAwesomeIcon icon={faEdit} /> Módosítás</button>
                                <button className="btn btn-danger fs-3"><FontAwesomeIcon icon={faUserTimes} /> Törlés</button>
                            </div>
                        </div>
                    </div>
                </Accordion.Body>
            </Accordion.Item>
        </Accordion>
    );
}

