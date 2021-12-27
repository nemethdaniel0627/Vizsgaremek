import React from "react";
import { Route, Switch } from "react-router";
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
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";

export default function App() {
    const [user, setUser] = useState({
        vNev: "",
        kNev: "",
        osztaly: "12.",
        befizetve: null,
        datum: "2021.12.",
        om: "",
        iskolaOm: "",
        email: ""
    });

    useEffect(() => {
        if (user.vNev === "") {
            axios.get("/user")
            .then(response => {                
                setUser(response.data);
            })
            .catch(error => {
                console.error(error);
            })
        }
    })

    // const path = useLocation().pathname;

    return (
        <div className="App">
            <Navbar userName={`${user.vNev} ${user.kNev}`} />
            <Switch>
                <AuthRoute path="/" exact component={() =>
                    {
                        return AuthUser._authorization === "user" 
                        ?
                        <Redirect to="/etlap" />
                        : AuthUser._authorization === "admin" ?
                        <Redirect to="/adatbazis" />
                        :
                        <Menu cancel={false} header="Étlap" disabledDays={[]} />

                    }
                } />

                <Route path="/login" component={() =>
                    <LoginForm title="Jelszo" />
                } />

                <Route path="/etlap" component={() =>
                    <Menu cancel={false} header="Étlap" disabledDays={[]} />
                } />

                <Route path="/ebedjegy" component={() =>
                    <LunchTicket user={user}/>
                } />

                <Route path="/lemondas" component={() =>
                    <LunchCancelation />
                } />

                <Route path="/adatlap" component={() =>
                    <AccountPage user={user}/>
                } />

                <Route path="/kapcsolat" component={() =>
                    <ReportPage />
                } />

                <Route path="/adatbazis" component={() =>
                    <AdminDatabasePage />
                } />

                <Route path="/beolvas" component={() =>
                    <QrCodeReader />
                } />

                <Route>
                    <Redirect to="/" />
                </Route>

            </Switch>
        </div>
    )
}
