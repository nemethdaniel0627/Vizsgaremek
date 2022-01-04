import React, { useState } from "react";
import login_icon from "../images/icon.png";
import AuthUser from "../modules/AuthUser";
export default function LoginForm(props) {
    const [user, setUser] = useState({
        name: "",
        password: ""
    });

    function inputChange(event) {        
        const {value, name} = event.target;
        
        setUser(prevUser =>{
            return {
              ...prevUser,
              [name]: value
            }
          })
    }

    function loginUser() {
        AuthUser.loginUser(user.name,user.password);
    }

    function formSend(event) {
        event.preventDefault();
    }

    return (
        <form onSubmit={formSend} className="login">
            <div className="login--header">
                <img className="login--img" src={login_icon} alt="login_icon" />
                <p className="title">{props.title}</p>
            </div>
            <input onChange={inputChange} type="text" placeholder="Felhasználó" autoFocus required name="name" value={user.name} />
            <input onChange={inputChange} type="password" placeholder="Jelszó" required name="password" value={user.password} />
            <button onClick={loginUser}>Bejelentkezés</button>
        </form>
    );
}