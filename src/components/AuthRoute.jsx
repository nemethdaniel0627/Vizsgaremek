import React from "react";
import { Redirect, Route } from "react-router";
import AuthUser from "../modules/AuthUser.js"
import NotFoundPage from "./NotFoundPage.jsx";

export default function AuthRoute(props) {

    console.log(AuthUser._authorization);
    console.log(props.auth);
    return (
        AuthUser.isLoggedIn() ? (AuthUser._authorization === props.auth ? <Route {...props} /> : <NotFoundPage />) : <Redirect to="/login" />
    );
}