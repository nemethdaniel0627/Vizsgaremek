import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileDownload, faFileUpload, faUserPlus, faBars, faTimes, faCheckSquare } from "@fortawesome/free-solid-svg-icons";
import AdminDatabaseModal from "../components/AdminDatabaseModal";
import { CSVLink } from "react-csv";
import ResponseMessage from "../components/ResponseMessage";

export default function Manager(props) {
    const [uploadModalAppear, setUploadModal] = useState(false);
    const [newModalAppear, setNewModal] = useState(false);
    const [showPending, setShowPending] = useState(false);
    const [alertOpen, setAlertOpen] = useState(false);
    const [alertType, setAlertType] = useState(undefined);
    const [alertMessage, setAlertMessage] = useState("");

    const [active, setActive] = useState(!props.isMobile);

    function UploadModal() {
        setUploadModal(!uploadModalAppear);
    }

    function NewModal() {
        setNewModal(!newModalAppear);
    }

    useEffect(() => {
        props.setShowPending(showPending);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [showPending])

    function emptyUsers() {
        setAlertType("error");
        setAlertMessage("Hiba történt a felhasználók exportálása közben!");
        setAlertOpen(true);
    }

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
                        <CSVLink onClick={props.downloadUsers.length === 0 ? emptyUsers : () => { }} className={`btn-new btn fs-3 w-100 mb-3 btn-mg ${props.downloadUsers.length === 0 ? "disabled" : ""}`} data={props.downloadUsers} separator={";"} filename={"tanulok.csv"}><FontAwesomeIcon icon={faFileDownload} /> {active ? "Személyek letöltése" : ""}</CSVLink>
                    </div>
                    <div className="new btn-div">
                        <button className="btn-new btn fs-3 w-100 mb-3 btn-mg" onClick={NewModal}><FontAwesomeIcon icon={faUserPlus} /> Új személy</button>
                        {newModalAppear ? <AdminDatabaseModal ModalClose={NewModal} title="Új személy" message="" button="Hozzáadás" show={newModalAppear} type="New"></AdminDatabaseModal> : <></>}
                    </div>
                    <div className="file btn-div">

                        <button className="btn-new btn fs-3 w-100 mb-3 btn-mg" onClick={UploadModal}><FontAwesomeIcon icon={faFileUpload} /> Személyek feltöltése</button>
                        {uploadModalAppear ? <AdminDatabaseModal ModalClose={UploadModal} title="Feltöltés" message="" button="Feltöltés" show={uploadModalAppear} type="File"></AdminDatabaseModal> : <></>}
                    </div></>
                    : <></>}
            </div>
            <ResponseMessage
                setAlertOpen={setAlertOpen}
                alertOpen={alertOpen}
                text={alertMessage}
                type={alertType}
                fixed={true}
                reload={alertType === "success" ? true : false} />
        </div>
    );
}