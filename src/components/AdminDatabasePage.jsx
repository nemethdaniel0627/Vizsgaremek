import React, { useState } from "react";

import Modal from "./AdminDatabaseModal";
import Accord from "./AdminDatabaseAccordion";
import Manager from "./AdminDatabaseManager";
import ManagerMobile from "./AdminDatabaseManagerMobile";

import { Accordion } from "react-bootstrap";


export default function AdminDatabasePage() {

    let isMobile = false;
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        isMobile = true;
    }    


    const [modalAppear, setModal] = useState(false);

    function ModalClose() {
        setModal(!modalAppear);
    }


    const users = [{ name: "Teszt Elek", class: "12.A", email: "teszt.elek@students.jedlik.eu", user: "Teszt.Elek", isPaid: true, value: "15000 Ft", date: "2022-05-16#2022-05-18#2022-05-20", isDeleted: false }, { name: "Teszt Elek Béla", class: "13.A", email: "teszt.elek.bela@students.jedlik.eu", user: "Teszt.Elek.Bela", isPaid: false, value: "", date: "",  isDeleted: false }, { name: "Teszt Elek", class: "12.A", email: "teszt.elek@students.jedlik.eu", user: "Teszt.Elek", isPaid: true, value: "15000 Ft", date: "2022-05-16#2022-05-18#2022-05-20",  isDeleted: false }]

   

    return (
        <div>

            <div className="admin-mg">
               {!isMobile ?  <Manager></Manager> :  <ManagerMobile></ManagerMobile>}
            </div>


            {modalAppear ? <Modal ModalClose={ModalClose} title="Figyelem" message="Biztosan törölni szeretné?" button="Törlés" show={modalAppear}></Modal> : <></>}
            <div className="container">
                <div className="row">
                    <div className="col-1 col-lg-1"></div>
                    <div className="col-10 col-lg-11 admin-db-acc mb-5 mb-lg-0 mt-5">
                        <Accordion>
                            {users.map((user, index) => (
                                <Accord key={index} eventkey={index} user={user}></Accord>
                            ))}
                        </Accordion>

                    </div>
                    
                </div>
            </div>
        </div>

    );
}