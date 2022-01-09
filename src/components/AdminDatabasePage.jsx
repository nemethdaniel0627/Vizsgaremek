import React, { useState } from "react";

import Modal from "./AdminDatabaseModal";
import Accord from "./AdminDatabaseAccordion";
import Manager from "./AdminDatabaseManager";
import ManagerMobile from "./AdminDatabaseManagerMobile";

import { Accordion } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight, faSearch } from "@fortawesome/free-solid-svg-icons";


export default function AdminDatabasePage() {

    let isMobile = false;
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        isMobile = true;
    }


    const [modalAppear, setModal] = useState(false);

    function ModalClose() {
        setModal(!modalAppear);
    }
    let users = [];
    const user = { name: "Teszt Elek", class: "12.A", email: "teszt.elek@students.jedlik.eu", user: "Teszt.Elek", isPaid: true, value: "15000 Ft", date: "2022-05-16#2022-05-18#2022-05-20", isDeleted: false };

    for (let index = 0; index < 10; index++) {
        users.push(user);

    }




    return (
        <div>

            <div className="admin-mg">
                {!isMobile ? <Manager></Manager> : <ManagerMobile></ManagerMobile>}
            </div>


            {modalAppear ? <Modal ModalClose={ModalClose} title="Figyelem" message="Biztosan törölni szeretné?" button="Törlés" show={modalAppear}></Modal> : <></>}
            <div className="container">
                <div className="row">
                    <div className="col-2 col-lg-1"></div>
                    <div className="col-10 col-lg-11 admin-db-acc mb-5 mb-lg-0 mt-5">


                        <div className="acc-head manager">
                            <div className="container">
                                <div className="row">
                                    <div className="div-search col-12 col-lg-3">
                                        <div className="input-group search-group">
                                            <input type="text" className="form-control btn btn-new i-search" placeholder="Keresés" />
                                            <button className="input-group-text btn-search" ><FontAwesomeIcon icon={faSearch} /></button>
                                        </div>
                                    </div>


                                    <div className="col-0 col-lg-1"></div>

                                    <div className="col-6 col-lg-2 mt-3 mt-lg-0"><label htmlFor="" className="fs-4 p-1 float-end">Egy oldalon: </label></div>

                                    <div className="div-max col-6 col-lg-1 mt-3 mt-lg-0">
                                        
                                        <select name="" id="" className="form-select mt-1">
                                            <option value="10">10</option>
                                            <option value="25">25</option>
                                            <option value="50">50</option>
                                        </select>
                                    </div>

                                    <div className="col-0 col-lg-2"></div>

                                    <div className="div-page-number col-7 col-lg-2 mt-3 mt-lg-0">
                                        <label htmlFor="">1 oldal / 10 oldal</label>
                                    </div>

                                    <div className="div-page-btns col-5 col-lg-1 mt-3 mt-lg-0">
                                        <button className="btn btn-page"><FontAwesomeIcon icon={faAngleLeft} /></button>
                                        <button className="btn btn-page"><FontAwesomeIcon icon={faAngleRight} /></button>
                                    </div>
                                </div>
                            </div>



                        </div>

                        <Accordion>
                            {users.map((user, index) => (
                                <Accord key={index} eventkey={index} user={user} isMobile={isMobile}></Accord>
                            ))}
                        </Accordion>

                    </div>

                </div>
            </div>
        </div>

    );
}