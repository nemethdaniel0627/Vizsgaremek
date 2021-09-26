class AuthUser {
    isLoggedIn() {
        if (sessionStorage.length !== 0) return true;
        else return false;
    }

    loginUser(username, password) {
        if (username === "771122" && password === "user"){
            sessionStorage.setItem(username,password);
            // this.setupAxiosInterceptors();
            return true;
        }
        else {
            alert("wrong password or username")
            return false;
        }
    }
}

export default new AuthUser();