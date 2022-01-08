import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faFileDownload, faFileUpload, faSearch, faSyncAlt, faTimesCircle, faUserPlus, faCaretUp, faCaretDown } from "@fortawesome/free-solid-svg-icons";
import Modal from "./AdminDatabaseModal";
import { Accordion } from "react-bootstrap";

export default function Manager() {
    const [uploadModalAppear, setUploadModal] = useState(false);
    const [newModalAppear, setNewModal] = useState(false);

    const [search, setSearch] = useState(false);
    const [modify, setModify] = useState(false);

    function Search() {
        setSearch(!search);
        modify ? setModify(!modify) : setModify(modify);
    }


    function Modify() {
        setModify(!modify);
        search ? setSearch(!search) : setSearch(search);
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
        <div className="admin-db-mg mt-5">


            {!search ? <button className="btn-new btn btn-mg fs-3 w-100 mb-3" onClick={Search}><span className="float-start"><FontAwesomeIcon icon={faSearch} /> Keresés</span> <span className="float-end"><FontAwesomeIcon icon={faCaretDown}/></span></button> :
                <div className="w-100 search">
                    <button className="btn-new btn fs-3 w-100 mb-3 btn-mg active" onClick={Search}><span className="float-start"><FontAwesomeIcon icon={faSearch} /> Keresés</span> <span className="float-end"><FontAwesomeIcon icon={faCaretUp}/></span></button>
                    <hr />
                    <div className="search-plus">
                        <div className="input-group mb-3 search-group">
                            <input type="text" className="form-control btn btn-new" placeholder="Keresés" />
                            <button className="input-group-text btn-search" ><FontAwesomeIcon icon={faSearch} /></button>
                        </div>
                    </div>
                    
                    <hr className="bug-hr" />

                </div>
            }

            <button className="btn-new btn fs-3 w-100 mb-3 btn-mg" onClick={refreshPage}><FontAwesomeIcon icon={faSyncAlt} /> Frissítés</button>
            <button className="btn-new btn fs-3 w-100 mb-3 btn-mg"><FontAwesomeIcon icon={faFileDownload} /> Letöltés</button>
            {!modify ? <button className="btn-new btn fs-3 w-100 btn-mg" onClick={Modify}><FontAwesomeIcon icon={faEdit} /> Módosítás <span className="float-end"><FontAwesomeIcon icon={faCaretDown}/></span></button> :
                <div className="w-100 search ">
                    <button className="btn-new btn fs-3 w-100 btn-mg active" onClick={Modify}><FontAwesomeIcon icon={faEdit} /> Módosítás <span className="float-end"><FontAwesomeIcon icon={faCaretUp}/></span></button>
                    <hr />
                    <div className="modify-mg">
                        <button className="btn-new btn fs-3 w-100 mb-3 btn-m" onClick={NewModal}><FontAwesomeIcon icon={faUserPlus} /> Új személy</button>
                        {newModalAppear ? <Modal ModalClose={NewModal} title="Új személy" message="" button="Hozzáadás" show={newModalAppear} type="New"></Modal> : <></>}
                        <button className="btn-new btn fs-3 w-100 mb-3 btn-m" onClick={UploadModal}><FontAwesomeIcon icon={faFileUpload} /> Fájl feltöltés</button>
                        {uploadModalAppear ? <Modal ModalClose={UploadModal} title="Feltöltés" message="" button="Feltöltés" show={uploadModalAppear} type="File"></Modal> : <></>}
                    </div>
                    <hr />

                </div>
            }

        </div>
    );
}