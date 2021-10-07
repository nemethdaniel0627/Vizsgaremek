import React from "react";
import { Route, Switch, useLocation } from "react-router";
import AuthRoute from "./AuthRoute";
import Login from "./Login";
import Menu from "./Menu";
import Navbar from "./Navbar";
import LunchTicket from "./LunchTicket";
import LunchCancelation from "./LunchCancelation";
import UserBar from "./UserBar";

export default function App() {

    const path = useLocation().pathname;

    return (
        <div className="App">
            <input defaultChecked={path === "/login" ? false : true} type="radio" id="header--btn" />
            <Navbar />
            <div id="LetterHead">

            </div>
            <UserBar />
            <Switch>
                <AuthRoute path="/" exact component={() =>
                    <Login />
                } />

                <Route path="/login" component={() =>
                    <Login />
                } />

                <Route path="/etlap" component={() =>
                    
                    <Menu />
                } />

                <Route path="/ebedjegy" component={() =>
                    <LunchTicket />
                } />

                <AuthRoute path="/lemondas" component={() =>
                    <LunchCancelation />
                } />
            </Switch>
        </div>
    )
}