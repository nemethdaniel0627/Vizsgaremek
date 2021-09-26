import React from "react";
import { Route, Switch, useLocation } from "react-router";
import AuthRoute from "./AuthRoute";
import Login from "./Login";
import Menu from "./Menu";
import LunchTicket from "./LunchTicket";
import LunchCancelation from "./LunchCancelation";

export default function App() {

    const path = useLocation().pathname;

    return (
        <div className="App">
            <input defaultChecked={path === "/login" ? false : true} type="radio" id="header--btn" />
            <Switch>
                <AuthRoute path="/" exact component={() =>
                    <Login />
                } />

                <Route path="/login" component={() =>
                    <Login />
                } />

                <AuthRoute path="/etlap" component={() =>
                    <Menu />
                } />

                <AuthRoute path="/ebedjegy" component={() =>
                    <LunchTicket />
                } />

                <AuthRoute path="/lemondas" component={() =>
                    <LunchCancelation />
                } />
            </Switch>
        </div>
    )
}