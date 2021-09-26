import React from "react";
import login_icon from "../images/icon.png";
export default function LoginForm() {
    return (
        <div className="wrapper" id="LoginDiv">
            <div className="login">
                <div className="login--header">
                    <img className="login--img" src={login_icon} alt="login_icon" />
                    <p className="title">Bejelentkezés</p>
                </div>
                <input type="text" placeholder="Felhasználó" autoFocus required id="User" />
                <input type="password" placeholder="Jelszó" required id="Pass" />
                <button>Bejelentkezés</button>
            </div>
        </div>
    );
}