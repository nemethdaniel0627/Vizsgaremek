import axios from "axios";
import jwt from "jsonwebtoken";
class AuthUser {
    _authorization = sessionStorage.getItem("auth");

    isLoggedIn() {        
        if (sessionStorage.getItem("auth")) return true;
        else return false;
    }

    loginUser(userName, password) {
        if (userName && password) {
            axios.post("/login",
                {
                    user: {
                        userName: userName,
                        password: password
                    }
                })
                .then(response => {
                    console.log(response.headers);
                    let token = response.headers.authorization.split(" ")[1];
                    token = token.split(";")[0];                    
                    try {
                        const payload = jwt.verify(token, (process.env.REACT_APP_JWT_SECRET));
                        sessionStorage.setItem("token", token);
                        sessionStorage.setItem("userId", payload._id)
                        switch (payload.roles) {
                            case 1:
                                sessionStorage.setItem("auth", "admin");
                                break;
                            case 2:
                                sessionStorage.setItem("auth", "user");
                                break;
                            case 3:
                                sessionStorage.setItem("auth", "alkalmazott");
                                break;

                            default:
                                break;
                        }                        
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
                });

            return false;
        }
        else {
            return false;
        }
    }
    async isTokenVerified() {
        await axios.post("/token",
            {
                token: sessionStorage.getItem("token")
            },
            {
                headers: {
                    "Authorization": `Baerer ${sessionStorage.getItem("token")}`
                }
            })
            .catch(error => {
                console.error(error);
                const oldPath = window.location.pathname;
                sessionStorage.setItem("oldPath", oldPath);
                this.logoutUser();
            })
        return this.isLoggedIn()

    }

    registerUser(omAzon, password, name, osztaly, iskolaOM, email) {
        axios.post("/register",
            {
                omAzon: omAzon,
                password: password,
                name: name,
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
        sessionStorage.removeItem("userId");
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("auth");
        window.location.pathname = "/login";
    }
}

export default new AuthUser();