import React from "react";
import { Redirect, Route } from "react-router";
import AuthUser from "../modules/AuthUser.js"
import NotFoundPage from "../pages/NotFoundPage.jsx";

export default function AuthRoute(props) {    

    return (
        AuthUser.isLoggedIn() ? (props.auth.includes(AuthUser._authorization()) ? <Route {...props} /> : <NotFoundPage />) : <Redirect to="/login" />
    );
}