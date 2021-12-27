class AuthUser {
    _authorization = sessionStorage.getItem("auth");    

    isLoggedIn() {
        console.log(sessionStorage.getItem("auth"));
        if (sessionStorage.getItem("auth")) return true;
        
        else return false;
    }

    loginUser(userName, password) {
        if (userName && password){
            this._user = userName;
            sessionStorage.setItem("user",userName);
            sessionStorage.setItem("password",password);
            sessionStorage.setItem("auth", password);
            window.location.pathname = "/";
            return true;
        }
        else {            
            return false;
        }
    }

    logoutUser() {
        sessionStorage.removeItem("user");
        sessionStorage.removeItem("password");
        sessionStorage.removeItem("auth");        
        window.location.pathname = "/";
    }


}

export default new AuthUser();