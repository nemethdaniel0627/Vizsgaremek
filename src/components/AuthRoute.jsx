import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Redirect, Route } from "react-router";
import AuthUser from "../modules/AuthUser.js"
import NotFoundPage from "./NotFoundPage.jsx";

export default function AuthRoute(props) {
    // const [validToken, setValidToken] = useState();

    // useEffect(() => {
    //     AuthUser.isTokenVerified(props.setToken);
    // }, [])

    // useEffect(() => {
    //     console.log(props.token);
    // }, [props.token])

    return (
        AuthUser.isLoggedIn() && AuthUser.isTokenVerified() ? (props.auth.includes(AuthUser._authorization) ? <Route {...props} /> : <NotFoundPage />) : <Redirect to="/login" />
    );
}