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

    headerAuthorization() {
        return { "Authorization": `Baerer ${sessionStorage.getItem("token")}` };
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