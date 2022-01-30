import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faFileDownload, faFileUpload, faSyncAlt, faUserPlus, faCaretUp, faCaretDown } from "@fortawesome/free-solid-svg-icons";
import AdminDatabaseModal from "../components/AdminDatabaseModal";

export default function Manager(props) {
    const [uploadModalAppear, setUploadModal] = useState(false);
    const [newModalAppear, setNewModal] = useState(false);

    const [search, setSearch] = useState(false);
    const [modify, setModify] = useState(false);
   
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

    function Download() {
        props.Download();
    }

    return (
        <div className="admin-db-mg">
            <button className="btn-new btn fs-3 w-100 mb-3 btn-mg" onClick={refreshPage}><FontAwesomeIcon icon={faSyncAlt} /> Frissítés</button>
            <button className="btn-new btn fs-3 w-100 mb-3 btn-mg" onClick={Download}><FontAwesomeIcon icon={faFileDownload} /> Letöltés</button>
            {!modify ? <button className="btn-new btn fs-3 w-100 btn-mg" onClick={Modify}><FontAwesomeIcon icon={faEdit} /> Módosítás <span className="float-end"><FontAwesomeIcon icon={faCaretDown} /></span></button> :
                <div className="w-100 search ">
                    <button className="btn-new btn fs-3 w-100 btn-mg active" onClick={Modify}><FontAwesomeIcon icon={faEdit} /> Módosítás <span className="float-end"><FontAwesomeIcon icon={faCaretUp} /></span></button>
                    <hr />
                    <div className="modify-mg">
                        <button className="btn-new btn fs-3 w-100 mb-3 btn-m" onClick={NewModal}><FontAwesomeIcon icon={faUserPlus} /> Új személy</button>
                        {newModalAppear ? <AdminDatabaseModal ModalClose={NewModal} title="Új személy" message="" button="Hozzáadás" show={newModalAppear} type="New"></AdminDatabaseModal> : <></>}
                        <button className="btn-new btn fs-3 w-100 mb-3 btn-m" onClick={UploadModal}><FontAwesomeIcon icon={faFileUpload} /> Fájl feltöltés</button>
                        {uploadModalAppear ? <AdminDatabaseModal ModalClose={UploadModal} title="Feltöltés" message="" button="Feltöltés" show={uploadModalAppear} type="File"></AdminDatabaseModal> : <></>}
                    </div>
                    <hr />
                </div>
            }
        </div>
    );
}