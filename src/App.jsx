import React from "react";
import { Route, Switch, useLocation } from "react-router";
import AuthRoute from "./routes/AuthRoute";
import LoginForm from "./pages/LoginForm";
import Menu from "./pages/Menu";
import Navbar from "./layouts/Navbar";
import MealTicket from "./pages/MealTicket";
import LunchCancelation from "./pages/LunchCancelation";
import AccountPage from "./pages/AccountPage";
import ReportPage from "./pages/ReportPage";
import AdminDatabasePage from "./pages/AdminDatabasePage";
import QrCodeReader from "./pages/QrCodeReader";
import { Redirect } from "react-router-dom";
import AuthUser from "./modules/AuthUser";
import { useState, useEffect } from "react";
import axios from "axios";
import NotFoundPage from "./pages/NotFoundPage";
import MenuUpload from "./pages/MenuUpload";
import PaymentPage from "./pages/PaymentPage";
import Loader from "./layouts/Loader";
import jwt from "jsonwebtoken";
import AdminUserDetails from "./pages/AdminUserDetails";
import ResponseMessage from "./components/ResponseMessage";


export default function App() {
    const [loading, setLoading] = useState(true);
    const path = useLocation().pathname;
    const [user, setUser] = useState(JSON.parse(sessionStorage.getItem("user")));
    const [alertOpen, setAlertOpen] = useState(false);
    const [alertText, setAlertText] = useState("");
    const [alertType, setAlertType] = useState();

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
        try {
            if (sessionStorage.getItem("user") == null) {

                const payload = jwt.verify(sessionStorage.getItem("token"), process.env.REACT_APP_JWT_SECRET);
                const userId = payload._id;
                axios.post("/user",
                    {
                        userId: Number(userId)
                    },
                    {
                        headers: {
                            "Authorization": `Baerer ${sessionStorage.getItem("token")}`
                        }
                    })
                    .then(response => {
                        sessionStorage.setItem("user", JSON.stringify(response.data[0]));
                        setUser(response.data[0]);
                        setLoading(false);
                    })
                    .catch(error => {
                        setLoading(false);
                        console.error(error);
                    });
            }
            else setLoading(false);
        } catch (error) {

            setLoading(false);
            setAlertType("error");
            setAlertText("Nem siker??lt lek??rni a felhaszn??l??i adatokat!\nPr??b??ljon meg be ??s kijelentkezni")
            setAlertOpen(true);
        }
    }

    useEffect(() => {
        if (path !== "/login") {
            axios.post("/token",
                {
                    token: sessionStorage.getItem("token")
                },
                {
                    headers: {
                        "Authorization": `Baerer ${sessionStorage.getItem("token")}`
                    }
                })
                .then(() => {
                    setLoading(false);
                })
                .catch(error => {
                    console.error(error);
                    setLoading(false);
                    const oldPath = window.location.pathname;
                    sessionStorage.setItem("oldPath", oldPath);
                    AuthUser.logoutUser();
                })
            getUser();
        }
        else setLoading(false);
    }, [path])

    function startLoading() {
        setLoading(true);
    }

    function endLoading() {
        setLoading(false);
    }

    return (
        <div className="App">
            <Navbar nev={`${user == null ? "" : user.nev}`} />
            {loading ? <Loader />
                :
                <Switch>
                    <AuthRoute path="/" auth={AuthUser._authorization()} exact component={() => {
                        return AuthUser._authorization() === "user"
                            ?
                            <Redirect to="/etlap" />
                            : AuthUser._authorization() === "admin" ?
                                <Redirect to="/adatbazis" />
                                : AuthUser._authorization() === "alkalmazott" ?
                                    <Redirect to="/beolvas" />
                                    :
                                    <Menu cancel={false} header="??tlap" disabledDays={[]} />

                    }
                    } />

                    <Route path="/login" component={() =>
                        AuthUser.isLoggedIn() ? <Redirect to="/" /> : <LoginForm title="Bejelentkez??s" />
                    } />

                    <AuthRoute path="/etlap" auth="user" component={() =>
                        <Menu cancel={false} header="??tlap" disabledDays={[]} />
                    } />

                    <AuthRoute path="/ebedjegy" auth="user" component={() =>
                        <MealTicket user={user} />
                    } />

                    <AuthRoute path="/lemondas" auth="user" component={() =>
                        <LunchCancelation user={user} />
                    } />

                    <AuthRoute path="/adatlap" auth="user" component={() =>
                        <AccountPage user={user} />
                    } />

                    <AuthRoute path="/kapcsolat" auth="user" component={() =>
                        <ReportPage props={user} />
                    } />


                    <AuthRoute path="/adatbazis" auth="admin" component={() =>
                        <AdminDatabasePage endLoading={endLoading} startLoading={startLoading} />
                    } />

                    <AuthRoute path="/fizetes" auth="user" component={() =>
                        <PaymentPage user={user} />
                    } />

                    <AuthRoute path="/beolvas" auth="admin alkalmazott" component={() =>
                        <QrCodeReader />
                    } />

                    <AuthRoute path="/etlapfeltolt" auth="admin" component={() =>
                        <MenuUpload />
                    } />

                    <AuthRoute path="/reszletes/:omAzon" auth="admin" component={() =>
                        <AdminUserDetails user={user} />
                    } />

                    <Route>
                        <NotFoundPage />
                    </Route>

                </Switch>
            }

            <ResponseMessage
                setAlertOpen={setAlertOpen}
                alertOpen={alertOpen}
                text={alertText}
                type={alertType}
                fixed={true} />
        </div >
    )
}
