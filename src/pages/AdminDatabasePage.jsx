import React, { useState } from "react";

import Modal from "../components/AdminDatabaseModal";
import Accord from "../components/AdminDatabaseAccordion";
import Manager from "../layouts/AdminDatabaseManager";
import ManagerMobile from "../layouts/AdminDatabaseManagerMobile";
import ManagerSearchBar from "../components/AdminDatabaseManagerSearch";

import { Accordion } from "react-bootstrap";

export default function AdminDatabasePage(props) {

    let isMobile = false;
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        isMobile = true;
    }


    const [modalAppear, setModal] = useState(false);

    function ModalClose() {
        setModal(!modalAppear);
    }
    let users = [];
    const user = { id: 0, name: "Teszt Elek", class: "12.A", email: "teszt.elek@students.jedlik.eu", user: "Teszt.Elek", isPaid: true, value: "15000 Ft", date: "2022-05-16#2022-05-18#2022-05-20" };

    for (let index = 0; index < 10; index++) {
        user.id = index;
        users.push(user);
    }

    function Download() {

        var csv = [];
        let csvHeader = "Nev;Osztaly;E-mail;Felhasznalonev;Befizetett;Osszeg;Lemondott napok";

        csv.push(csvHeader);

        let csvBody = "";
        for (const user of users) {
            for (const key in user) {
                if (user.hasOwnProperty(key)) {
                    csvBody += `${user[key]};`;
                }
            }
            csv.push(csvBody);
            csvBody = "";
        }

        var csv_string = csv.join("\n");
        var filename = "tanulok.csv";
        var link = document.createElement("a");
        link.setAttribute(
            "href",
            "data:text/csv;charset=utf-8," + encodeURIComponent(csv_string)
        );
        link.setAttribute("download", filename);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

    }

    return (
        <div className="admin-db">

            <div className="admin-mg">
                <Manager Download={Download} isMobile={isMobile}></Manager>
            </div>


            {modalAppear ? <Modal ModalClose={ModalClose} title="Figyelem" message="Biztosan törölni szeretné?" button="Törlés" show={modalAppear}></Modal> : <></>}
            <div className="container">
                <div className="row">
                    <div className="col-2 col-lg-2"></div>
                    <div className="col-10 col-lg-10 admin-db-acc mb-5 mb-lg-0 mt-5">

                        <ManagerSearchBar/>
                        

                        <Accordion>

                            <Accord eventkey='1' user={user} isMobile={isMobile} new="true"></Accord>

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