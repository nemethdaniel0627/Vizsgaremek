import React from "react";
import { Route, Switch, useLocation } from "react-router";
import AuthRoute from "./AuthRoute";
import LoginForm from "./LoginForm";
import Menu from "./Menu";
import Navbar from "./Navbar";
import LunchTicket from "./LunchTicket";
import LunchCancelation from "./LunchCancelation";

export default function App() {

    const path = useLocation().pathname;

    return (
        <div className="App">            
            <Navbar />            
            <Switch>
                <AuthRoute path="/" exact component={() =>
                    <LoginForm title="Jelszo"/>
                } />

                <Route path="/login" component={() =>
                    <LoginForm title="Jelszo"/>
                } />

                <Route path="/etlap" component={() =>                    
                    <Menu cancel={false} header="Étlap" disabledDays={[]}/>
                } />

                <Route path="/ebedjegy" component={() =>
                    <LunchTicket />
                } />

                <Route path="/lemondas" component={() =>
                    <LunchCancelation />
                } />
            </Switch>
        </div>
    )
}
