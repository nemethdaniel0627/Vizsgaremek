import React, { useState } from "react";
import AuthUser from "../modules/AuthUser";
import RegisterForm from "../layouts/RegisterForm"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash, faSignInAlt } from "@fortawesome/free-solid-svg-icons";

export default function LoginForm(props) {
    const [user, setUser] = useState({
        nev: "",
        jelszo: ""
    });

    const [seePwd, setSeePwd] = useState(false);
    const [register, setRegister] = useState(false);    

    function Register() {
        setRegister(!register);
        console.log("asd");
    }

    function inputChange(event) {
        const { value, name } = event.target;

        setUser(prevUser => {
            return {
                ...prevUser,
                [name]: value
            }
        })
    }

    function loginUser() {
        AuthUser.loginUser(user.nev, user.jelszo);
    }

    function changePasswordType() {
        setSeePwd(!seePwd);
    }

    function formSend(event) {
        event.preventDefault();
    }

    return (
        <div>

            {
                !register ? <section className="gradient-custom login">
                    <div className="container py-5">
                        <div className="row d-flex justify-content-center align-items-center h-100">
                            <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                                <div className="card text-white">
                                    <div className="card-body p-5 text-center">

                                        <div className="mb-md-5 mt-md-4 pb-5">
                                            <form onSubmit={formSend}>
                                                <div className="mb-5 text-center">
                                                    <h2 className="fw-bold text-uppercase --header"> <FontAwesomeIcon icon={faSignInAlt}></FontAwesomeIcon> {props.title}</h2>
                                                </div>

                                                <hr className="mb-5" />
                                                <div className="form-outline form-white mb-4">
                                                    <input type="text" className="form-control form-control-lg fs-4 --input" placeholder="OM azonosító" autoFocus required name="name" onChange={inputChange} value={user.nev} />

                                                </div>

                                                <div className="form-outline form-white mb-4 position-relative">
                                                    <input type={seePwd ? "text" : "password"} onChange={inputChange} required value={user.password} name="password" className="form-control form-control-lg fs-4 --input" placeholder="Jelszó" />
                                                    {seePwd ? <FontAwesomeIcon onClick={changePasswordType} className="password--icon" icon={faEyeSlash} /> : user.password ? <FontAwesomeIcon onClick={changePasswordType} className="password--icon" icon={faEye} /> : <></>}
                                                </div>
                                                {/* <p class="text-white-50 mb-5 alert">Felhasználónév vagy jelszó nem megfelelő!</p> */}

                                                <button className="btn btn-outline-light btn-lg px-5" onClick={loginUser}>Bejelentkezés</button>

                                            </form>


                                        </div>

                                        <div>
                                            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid*/}
                                            <p className="mb-0">Még nincs fiókod? <a className="text-white-50 fw-bold page-changer" onClick={Register}>Regisztráció</a></p>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section> :
                    <RegisterForm title="Regisztráció" RegisterOff={Register}></RegisterForm>
            }            
        </div>


    );
}