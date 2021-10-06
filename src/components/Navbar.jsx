import React, { useState } from "react";
import foodE_logo from "../images/FoodWeb_logo.png";
import lightModeImg from "../images/ToDefault.png";
import darkModeImg from "../images/ToDark.png";

export default function Navbar() {
    const [darkMode, setDarkMode] = useState(false);

    function darkModeChange() {
        let tmpDarkMode = !darkMode;
        setDarkMode(!darkMode);
        const root = document.querySelector(':root');
        if (tmpDarkMode) {            
            root.style.setProperty('--dark-blue', "#0D1321");
            root.style.setProperty('--light-blue', "#1D2D44");
            root.style.setProperty('--blue', "#3E5C76");
            root.style.setProperty('--bodyBackground', "#3E5C76");
            root.style.setProperty('--darkModeFontColor', "#fff");
        }
        else {
            root.style.setProperty('--dark-blue', "#001E6C");
            root.style.setProperty('--blue', "#035397");
            root.style.setProperty('--light-blue', "#5089C6");
            root.style.setProperty('--bodyBackground', "#fff");
            root.style.setProperty('--darkModeFontColor', "#000");
        }
    }
    
    return (
        <div id="header" className="header">
            <label htmlFor="header--btn" id="header--photo" className="header--photo">                
                <img alt="ICON" id="Logo" src={foodE_logo} />
            </label>
            <div className="darkmode">
                <label className="switch">
                    <input type="checkbox" onClick={darkModeChange} id="Dark_check" />
                    <span className="slider round"></span>
                </label>
                <img src={darkMode ? darkModeImg : lightModeImg} alt="DarkMode" className="darkmode--img" />
            </div>
        </div>

    );
}