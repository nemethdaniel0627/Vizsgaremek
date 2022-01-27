import React from "react";
import { Route, Switch, useLocation } from "react-router";
import AuthRoute from "./AuthRoute";
import LoginForm from "./LoginForm";
import Menu from "./Menu";
import Navbar from "./Navbar";
import LunchTicket from "./LunchTicket";
import LunchCancelation from "./LunchCancelation";
import AccountPage from "./AccountPage";
import ReportPage from "./ReportPage";
import AdminDatabasePage from "./AdminDatabasePage";
import QrCodeReader from "./QrCodeReader";
import { Redirect } from "react-router-dom";
import AuthUser from "../modules/AuthUser";
import { useState, useEffect } from "react";
import axios from "axios";
import NotFoundPage from "./NotFoundPage";
import MenuUpload from "./MenuUpload";
import PaymentPage from "./PaymentPage";


export default function App() {
    const path = useLocation().pathname;    
    const [user, setUser] = useState({
        email: "",
        felhasznaloNev: "",
        id: "",
        iskolaOM: "",
        jelszo: "",
        nev: "",
        osztaly: ""
    });

    useEffect(() => {
        setSearchBarHeight();
    }, [])

    useEffect(() => {
        const openNavbar = document.getElementById("navbar--button");
        if (openNavbar) openNavbar.checked = false;
    }, [path])

    function setSearchBarHeight() {
        const actualHeight = window.innerHeight;
        let elementHeight = document.getElementById('control-height');
        const root = document.querySelector(":root");
        if (elementHeight && root) {
            elementHeight = elementHeight.clientHeight;
            const barHeight = elementHeight - actualHeight;
            root.style.setProperty("--searchBarHeight", `${barHeight}px`);
        }

    }

    function getUser() {
        axios.post("/user",
            {
                userId: Number(sessionStorage.getItem("userId"))
            },
            {
                headers: {
                    "Authorization": `Baerer ${sessionStorage.getItem("token")}`
                }
            })
            .then(response => {
                setUser(response.data[0]);
            })
            .catch(error => {
                console.error(error);

            });
    }

    return (
        <div className="App">
            <Navbar userName={`${user.nev}`} />
            <Switch>
                {console.log("asd " + AuthUser._authorization)}
                <AuthRoute path="/" auth={AuthUser._authorization} exact component={() => {
                    getUser();
                    return AuthUser._authorization === "user"
                        ?
                        <Redirect to="/etlap" />
                        : AuthUser._authorization === "admin" ?
                            <Redirect to="/adatbazis" />
                            : AuthUser._authorization === "alkalmazott" ?
                                <Redirect to="/beolvas" />
                                :
                                <Menu cancel={false} header="Étlap" disabledDays={[]} />

                }
                } />

                <Route path="/login" component={() =>
                    <LoginForm title="Bejelentkezés" />
                } />

                <AuthRoute path="/etlap" auth="user" component={() =>
                    <Menu cancel={false} header="Étlap" disabledDays={[]} />
                } />

                <AuthRoute path="/ebedjegy" auth="user" component={() =>
                    <LunchTicket user={user} />
                } />

                <AuthRoute path="/lemondas" auth="user" component={() =>
                    <LunchCancelation />
                } />

                <AuthRoute path="/adatlap" auth="user" component={() =>
                    <AccountPage user={user} />
                } />

                <AuthRoute path="/kapcsolat" auth="user" component={() =>
                    <ReportPage />
                } />


                <AuthRoute path="/adatbazis" auth="admin" component={() =>
                    <AdminDatabasePage />
                } />

                <AuthRoute path="/fizetes" auth="user" component={() =>
                    <PaymentPage />
                } />

                <AuthRoute path="/beolvas" auth="admin alkalmazott" component={() =>
                    <QrCodeReader />
                } />

                <AuthRoute path="/etlapfeltolt" auth="admin" component={() =>
                    <MenuUpload />
                } />

                <Route>
                    <NotFoundPage />
                </Route>

            </Switch>
        </div>
    )
}
