import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileDownload, faFileUpload, faUserPlus, faBars, faTimes, faCheckSquare } from "@fortawesome/free-solid-svg-icons";
import AdminDatabaseModal from "../components/AdminDatabaseModal";

export default function Manager(props) {
    const [uploadModalAppear, setUploadModal] = useState(false);
    const [newModalAppear, setNewModal] = useState(false);
    const [showPending, setShowPending] = useState(false);

    const [active, setActive] = useState(!props.isMobile);

    function UploadModal() {
        setUploadModal(!uploadModalAppear);
    }

    function NewModal() {
        setNewModal(!newModalAppear);
    }

    function Download() {
        props.Download();
    }

    useEffect(() => {
        props.setShowPending(showPending);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [showPending])


    return (

        <div className={"admin-db-mg " + (active ? "active" : "deactive")}>
            <div className="header">
                <button className="btn-activate btn btn-mg" onClick={() => { setActive(!active) }}><FontAwesomeIcon icon={!active ? faBars : faTimes} /></button>
            </div>
            <div className="manager-body">

                {active ? <>
                    <div className="refresh-mg">
                        <button className="btn-new btn fs-3 w-100 mb-3 btn-mg" onClick={() => setShowPending(!showPending)}><FontAwesomeIcon icon={faCheckSquare} /> {active ? showPending ? "Felhasználók" : "Megerősítések" : ""}</button>
                    </div>
                    <div className="download-mg">
                        <button className="btn-new btn fs-3 w-100 mb-3 btn-mg" onClick={Download}><FontAwesomeIcon icon={faFileDownload} /> {active ? "Letöltés" : ""} </button>
                    </div>
                    <div className="new btn-div">
                        <button className="btn-new btn fs-3 w-100 mb-3 btn-mg" onClick={NewModal}><FontAwesomeIcon icon={faUserPlus} /> Új személy</button>
                        {newModalAppear ? <AdminDatabaseModal ModalClose={NewModal} title="Új személy" message="" button="Hozzáadás" show={newModalAppear} type="New"></AdminDatabaseModal> : <></>}
                    </div>
                    <div className="file btn-div">
                        <button className="btn-new btn fs-3 w-100 mb-3 btn-mg" onClick={UploadModal}><FontAwesomeIcon icon={faFileUpload} /> Fájl feltöltés</button>
                        {uploadModalAppear ? <AdminDatabaseModal ModalClose={UploadModal} title="Feltöltés" message="" button="Feltöltés" show={uploadModalAppear} type="File"></AdminDatabaseModal> : <></>}
                    </div></>
                    : <></>}
            </div>
        </div>
    );
}