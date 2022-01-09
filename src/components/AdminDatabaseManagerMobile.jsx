import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faFileDownload, faFileUpload, faSearch, faSyncAlt, faTimesCircle, faUserPlus } from "@fortawesome/free-solid-svg-icons";
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

            <button className="btn-new btn fs-3 w-100 mb-3 btn-mg mobile" onClick={refreshPage}><FontAwesomeIcon icon={faSyncAlt} /></button>
            <button className="btn-new btn fs-3 w-100 mb-3 btn-mg mobile"><FontAwesomeIcon icon={faFileDownload} /></button>
            {!modify ? <button className="btn-new btn fs-3 w-100 btn-mg mobile" onClick={Modify}><FontAwesomeIcon icon={faEdit} /></button> :
                <div className="w-100 search ">
                    <button className="btn-new btn fs-3 w-100 btn-mg active mobile" onClick={Modify}><FontAwesomeIcon icon={faEdit} /></button>
                    <hr />
                    <div className="modify-mg">
                        <button className="btn-new btn fs-3 w-100 mb-3 btn-m mobile" onClick={NewModal}><FontAwesomeIcon icon={faUserPlus} /></button>
                        {newModalAppear ? <Modal ModalClose={NewModal} title="Új személy" message="" button="Hozzáadás" show={newModalAppear} type="New"></Modal> : <></>}
                        <button className="btn-new btn fs-3 w-100 mb-3 btn-m mobile" onClick={UploadModal}><FontAwesomeIcon icon={faFileUpload} /></button>
                        {uploadModalAppear ? <Modal ModalClose={UploadModal} title="Feltöltés" message="" button="Feltöltés" show={uploadModalAppear} type="File"></Modal> : <></>}
                    </div>
                    <hr />

                </div>
            }

        </div>
    );
}