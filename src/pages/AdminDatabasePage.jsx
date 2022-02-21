import React, { useEffect, useState } from "react";
import AdminDatabaseModal from "../components/AdminDatabaseModal";
import AdminDatabaseAccordion from "../components/AdminDatabaseAccordion";
import AdminDatabaseManager from "../layouts/AdminDatabaseManager";
import AdminDatabaseManagerSearch from "../components/AdminDatabaseManagerSearch";

import { Accordion } from "react-bootstrap";
import axios from "axios";
import Loader from "../layouts/Loader";
import AuthUser from "../modules/AuthUser";

export default function AdminDatabasePage(props) {

    const { endLoading, startLoading } = props;

    const [users, setUsers] = useState([])
    const [pending, setPending] = useState([]);
    const [loading, setLoading] = useState(false);

    let isMobile = false;
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        isMobile = true;
    }


    const [modalAppear, setModal] = useState(false);

    function ModalClose() {
        setModal(!modalAppear);
    }
    // let users = [];
    // // const user = { id: 0, name: "Teszt Elek", class: "12.A", email: "teszt.elek@students.jedlik.eu", user: "Teszt.Elek", isPaid: true, value: "15000 Ft", date: "2022-05-16#2022-05-18#2022-05-20" };

    // for (let index = 0; index < 10; index++) {
    //     user.id = index;
    //     users.push(user);
    // }



    useEffect(() => {
        if (users.length === 0) {
            setLoading(true);
            axios.get("/pending", AuthUser.authHeader())
                .then(response => {
                    setPending(response.data);
                })
                .catch(error => {
                    console.error(error)
                });
            axios.get("/alluser", AuthUser.authHeader())
                .then(response => {
                    setUsers(response.data);
                    console.log(response.data);
                    setLoading(false);
                })
                .catch(error => {
                    console.error(error);
                    setLoading(false);
                });
        }
    }, [endLoading, startLoading, users])

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
            {loading ? <Loader /> : <></>}
            <div className="admin-mg">
                <AdminDatabaseManager Download={Download} isMobile={isMobile}></AdminDatabaseManager>
            </div>


            {modalAppear ? <AdminDatabaseModal ModalClose={ModalClose} title="Figyelem" message="Biztosan törölni szeretné?" button="Törlés" show={modalAppear}></AdminDatabaseModal> : <></>}
            <div className="container">
                <div className="row">
                    <div className="col-2 col-lg-2"></div>
                    <div className="col-10 col-lg-10 admin-db-acc mb-5 mb-lg-0 mt-5">

                        <AdminDatabaseManagerSearch />


                        <Accordion>

                            {pending.map((pending, index) => {
                                return <AdminDatabaseAccordion key={`pending_${index}`} eventkey='1' user={pending} isMobile={isMobile} new="true"></AdminDatabaseAccordion>
                            })}

                            {users.map((user, index) => {
                                return <AdminDatabaseAccordion key={index} eventkey={index} user={user} isMobile={isMobile}></AdminDatabaseAccordion>
                            })}
                        </Accordion>

                    </div>

                </div>
            </div>
        </div>

    );
}