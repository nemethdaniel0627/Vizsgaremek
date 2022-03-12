import axios from "axios";
import jwt from "jsonwebtoken";
class AuthUser {
    _authorization() {
        if (sessionStorage.getItem("token")) {
            try {
                const payload = jwt.verify(sessionStorage.getItem("token"), process.env.REACT_APP_JWT_SECRET);
                const roles = this.roleConvert(payload.roles);
                return roles;
            } catch (error) {
                return "";
            }
        }

        return "";
    }

    authHeader() {
        return {
            headers: {
                "Authorization": `Baerer ${sessionStorage.getItem("token")}`
            }
        }
    }

    isLoggedIn() {
        if (sessionStorage.getItem("token")) return true;
        else return false;
    }

    roleConvert(roleId) {
        switch (roleId) {
            case 1:
                return "admin";
            case 2:
                return "user";
            case 3:
                return "alkalmazott";
            default:
                break;
        }
    }

    loginUser(userName, password) {
        if (userName && password) {
            axios.post("/login",
                {
                    user: {
                        omAzon: userName,
                        jelszo: password
                    }
                })
                .then(response => {
                    console.log(response.headers);
                    let token = response.headers.authorization.split(" ")[1];
                    token = token.split(";")[0];
                    try {
                        const payload = jwt.verify(token, (process.env.REACT_APP_JWT_SECRET));
                        sessionStorage.setItem("token", token);
                        this.roleConvert(payload.role);
                        if (sessionStorage.getItem("oldPath")) {
                            window.location.pathname = sessionStorage.getItem("oldPath");
                            sessionStorage.removeItem("oldPath");
                        }
                        else window.location.pathname = "/";
                        return true;
                    } catch (error) {
                        console.error(error);
                        return false;
                    }
                })
                .catch(error => {
                    console.error(error);
                    return false;
                });
        }
        else {
            return false;
        }
    }

    registerUser(omAzon, password, name, osztaly, iskolaOM, email) {
        axios.post("/register",
            {
                omAzon: omAzon,
                jelszo: password,
                nev: name,
                osztaly: osztaly,
                iskolaOM: iskolaOM,
                email: email
            })
            .then(response => {
                console.log(response);
            })
            .catch(error => {
                console.error(error);
            });
    }

    logoutUser() {
        sessionStorage.removeItem("user");
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("menu");
        window.location.pathname = "/login";
    }
}

export default new AuthUser();