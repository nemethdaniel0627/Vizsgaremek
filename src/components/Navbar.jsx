import React from "react";
import foodE_logo from "../images/FoodWeb_logo.png"

export default function Navbar() {

    // function LogingInApper() {
    //     let letterHead = document.getElementById("LetterHead");
    //     if (letterHead)
    //         letterHead.style.height = "11rem";
    //     if (document.body.clientWidth < 768) {
    //         MobilLogingInApper();
    //     } else {
    //         PCLogingInApper();
    //     }

    // }

    // function MobilLogingInApper() {
    //     let id = null;
    //     const elem = document.getElementById("Header_photo");
    //     let pos = 30;
    //     let percent = 0;
    //     let percent2 = 0;
    //     let opacity = 0;
    //     clearInterval(id);
    //     id = setInterval(frame, 10);

    //     function frame() {
    //         if (pos === 5) {
    //             clearInterval(id);
    //             id = setInterval(frame2, 30)

    //             function frame2() {
    //                 if (percent === 100) {
    //                     clearInterval(id);
    //                     id = setInterval(frame3, 30)

    //                     function frame3() {
    //                         if (percent2 === 100) {
    //                             clearInterval(id);
    //                             id = setInterval(frame4, 20)

    //                             function frame4() {
    //                                 if (opacity > 1) {
    //                                     clearInterval(id);
    //                                 }
    //                                 opacity += 0.025;
    //                                 document.getElementById("LoginDiv").style = "opacity: 0;";
    //                                 document.getElementById("LoginDiv").style.opacity = opacity;
    //                                 document.getElementById("LoginDiv").style.marginTop = (-600 + opacity * 20 * 17.5) + "px";
    //                             }
    //                         } else {
    //                             percent2 += 4;
    //                             var background = "radial-gradient(circle, #001e6c " + percent2 + "%, #ffffff00 " + 100 + "%)";
    //                             document.getElementById("LetterHead").style.backgroundImage = background;
    //                         }

    //                     }
    //                 } else {
    //                     percent += 4;
    //                     var background = "radial-gradient(circle, #ffffff " + percent + "%, #5089c6 " + 100 + "%)";
    //                     document.getElementById("body").style.backgroundImage = background;
    //                 }
    //             }
    //         } else {
    //             pos--;

    //             elem.style.top = pos - 3 + "%";
    //             elem.style.width = (pos + 55) + "%";
    //             elem.style.height = (pos * 14) + "px";
    //             elem.style.padding = 5 + "px";


    //         }
    //     }
    // }

    // function PCLogingInApper() {
    //     let loginDiv = document.getElementById("LoginDiv");
    //     const elem = document.getElementById("header_photo");
    //     const header = document.getElementById("header");
    //     let letterHead = document.getElementById("LetterHead");
    //     let body = document.getElementsByTagName("body")[0];
    //     console.log("asd");
    //     if (loginDiv) {
    //         console.log("asd1");
    //         if (elem) {
    //             console.log("asd2");
    //             if (letterHead) {
                    
    //                 if (body) {
    //                     console.log("asd3");
    //                     let id = null;
    //                     let pos = 30;
    //                     let percent = 0;
    //                     let percent2 = 0;
    //                     let opacity = 0;
    //                     clearInterval(id);
    //                     id = setInterval(frame, 10);
    //                     function frame() {
    //                         if (pos === 5) {
    //                             clearInterval(id);
    //                             id = setInterval(frame2, 30)

    //                             function frame2() {
    //                                 if (percent === 100) {
    //                                     clearInterval(id);
    //                                     id = setInterval(frame3, 30)

    //                                     function frame3() {
    //                                         if (percent2 === 100) {
    //                                             clearInterval(id);
    //                                             id = setInterval(frame4, 20)

    //                                             function frame4() {
    //                                                 if (opacity > 1) {
    //                                                     clearInterval(id);
    //                                                 }
    //                                                 opacity += 0.025;
    //                                                 loginDiv.classList.remove("hidden")
    //                                                 loginDiv.style = "opacity: 0;";
    //                                                 loginDiv.style.opacity = opacity;
    //                                                 loginDiv.style.marginTop = (-600 + opacity * 20 * 30) + "px";
    //                                             }
    //                                         } else {
    //                                             percent2 += 4;
    //                                             var background = "radial-gradient(circle, #001e6c " + percent2 + "%, #ffffff00 " + 100 + "%)";                                                
    //                                             letterHead.style.backgroundImage = background;
    //                                         }

    //                                     }
    //                                 } else {
    //                                     percent += 4;
    //                                     var background = "radial-gradient(circle, #ffffff " + percent + "%, #5089c6 " + 100 + "%)";
    //                                     body.style.backgroundImage = background;
    //                                 }
    //                             }
    //                         } else {
    //                             pos--;

    //                             elem.style.top = pos - 3 + "%";
    //                             elem.style.width = (pos + 10) + "%";
    //                             elem.style.height = (pos * 14) + "px";
    //                             elem.style.padding = 5 + "px";
    //                             elem.style.top = "5.5rem";
    //                             if (header) header.style.height = "0px";


    //                         }
    //                     }
    //                 }
    //             }
    //         }

    //     }
    // }

    // function LoginAndPageChanger() { }

    return (
        <div id="header" className="header">
            
            <label htmlFor="header--btn" id="header--photo" className="header--photo">
                {/* <span className="header--img" onclick="LogingInApper()"></span> */}
                <img alt="ICON" id="Logo" src={foodE_logo} />
            </label>
        </div>

    );
}