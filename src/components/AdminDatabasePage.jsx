import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faFileDownload, faFileUpload, faSearch, faSyncAlt, faTimesCircle, faUserPlus } from "@fortawesome/free-solid-svg-icons";
import Modal from "./AdminDatabaseModal";
import Accord from "./AdminDatabaseAccordion";
import { Accordion } from "react-bootstrap";


export default function AdminDatabasePage() {
    const [search, setSearch] = useState(false);
    const [modify, setModify] = useState(false);
    const [modalAppear, setModal] = useState(false);
    const [uploadModalAppear, setUploadModal] = useState(false);
    const [newModalAppear, setNewModal] = useState(false);
    const [choosenUser, setChoosenUser] = useState("");

    const users = [{ name: "Teszt Elek", class: "12.A", email: "teszt.elek@students.jedlik.eu", user: "Teszt.Elek", isPaid: true, value: "15000 Ft", date: "2022-05-16#2022-05-18#2022-05-20", isDeleted: false }, { name: "Teszt Elek Béla", class: "13.A", email: "teszt.elek.bela@students.jedlik.eu", user: "Teszt.Elek.Bela", isPaid: false, value: "", date: "",  isDeleted: false }, { name: "Teszt Elek", class: "12.A", email: "teszt.elek@students.jedlik.eu", user: "Teszt.Elek", isPaid: true, value: "15000 Ft", date: "2022-05-16#2022-05-18#2022-05-20",  isDeleted: false }]

    function Search() {
        setSearch(!search);
        modify ? setModify(!modify) : setModify(modify);
    }
    

    function Modify() {
        setModify(!modify);
        search ? setSearch(!search) : setSearch(search);
    }

    function ModalClose() {
        setModal(!modalAppear);
    }

    function UploadModal() {
        setUploadModal(!uploadModalAppear);
    }

    function NewModal() {
        setNewModal(!newModalAppear);
    }

    function refreshPage() {
        window.location.reload(false);
    }

    return (
        <div>
            {modalAppear ? <Modal ModalClose={ModalClose} title="Figyelem" message="Biztosan törölni szeretné?" button="Törlés" show={modalAppear}></Modal> : <></>}
            <div className="container mt-5">
                <div className="row">
                    <div className="col-12 col-lg-8 admin-db-acc mb-5 mb-lg-0">
                        <Accordion>
                            {users.map((user, index) => (
                                <Accord key={index} eventkey={index} user={user}></Accord>
                            ))}
                        </Accordion>

                    </div>
                    <div className="col-lg-1 col-0"></div>
                    <div className="col-12 col-lg-3">
                        <div className="admin-db-mg">
                            {!search ? <button className="search-btn btn fs-3 w-100 mb-3" onClick={Search}><FontAwesomeIcon icon={faSearch} /> Keresés</button> :
                                <div className="w-100">
                                    <input type="text" className="btn fs-3 w-100 mb-3" placeholder="Keresés" />
                                    <button className="search-btn btn fs-3 w-100 mb-3"><FontAwesomeIcon icon={faSearch} /> Keresés</button>
                                    <button className="search-btn btn fs-3 w-100 mb-3 btn-cancel" onClick={Search}><FontAwesomeIcon icon={faTimesCircle} /> Mégsem</button>
                                    <hr />
                                </div>
                            }

                            <button className="search-btn btn fs-3 w-100 mb-3" onClick={refreshPage}><FontAwesomeIcon icon={faSyncAlt} /> Frissítés</button>
                            <button className="search-btn btn fs-3 w-100 mb-3"><FontAwesomeIcon icon={faFileDownload} /> Letöltés</button>
                            {!modify ? <button className="search-btn btn fs-3 w-100" onClick={Modify}><FontAwesomeIcon icon={faEdit} /> Módosítás</button> :
                                <div className="w-100">
                                    <hr />
                                    <button className="search-btn btn fs-3 w-100 mb-3" onClick={NewModal}><FontAwesomeIcon icon={faUserPlus} /> Új személy</button>
                                    {newModalAppear ? <Modal ModalClose={NewModal} title="Új személy" message="" button="Hozzáadás" show={newModalAppear} type="New"></Modal> : <></>}
                                    <button className="search-btn btn fs-3 w-100 mb-3" onClick={UploadModal}><FontAwesomeIcon icon={faFileUpload} /> Fájl feltöltés</button>
                                    {uploadModalAppear ? <Modal ModalClose={UploadModal} title="Feltöltés" message="" button="Feltöltés" show={uploadModalAppear} type="File"></Modal> : <></>}
                                    <button className="search-btn btn fs-3 w-100 mb-3 btn-cancel" onClick={Modify}><FontAwesomeIcon icon={faTimesCircle} /> Mégsem</button>
                                </div>
                            }

                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
}