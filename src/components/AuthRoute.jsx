import React from "react";
import { Redirect, Route } from "react-router";
import AuthUser from "../modules/AuthUser.js"

export default function AuthRoute(props){

    console.log(AuthUser.isLoggedIn());

    return(
        AuthUser.isLoggedIn() ? <Route {...props} /> : <Redirect to="/login" />
    );
}