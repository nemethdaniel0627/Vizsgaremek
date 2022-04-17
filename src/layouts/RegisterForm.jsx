import { faEye, faEyeSlash, faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState, useEffect } from "react";
import axios from "axios";
import ResponseMessage from "../components/ResponseMessage";
import AuthUser from "../modules/AuthUser";

export default function RegisterForm(props) {

    const [seePwd, setSeePwd] = useState(false);
    const [alertOpen, setAlertOpen] = useState(undefined);
    const [alertType, setAlertType] = useState(undefined);
    const [alertText, setAlertText] = useState("");
    const [schools, setSchools] = useState([]);
    const [user, setUser] = useState({
        nev: "",
        jelszo: "",
        email: "",
        iskolaOM: null,
        osztaly: "",
        omAzon: ""
    });

    function SelectionChange(event) {
        const { value, name } = event.target;

        console.log(value);

        setUser(prevUser => {
            return {
                ...prevUser,
                [name]: Number(value)
            }
        })
    }

    function RegisterOff() {
        props.RegisterOff();
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

    function Regist(e) {
        e.preventDefault();

        axios.post("/register",
            {
                user: user
            })
            .then(response => {
                setAlertOpen(true);
                setAlertType("success");
                setAlertText("Sikeres regisztráció!\nTovábbi információkat emailben küldtünk");
                console.log(response);
                axios.post("/email",
                    {
                        email: user.email,
                        nev: user.nev,
                        osztaly: user.osztaly,
                        omAzon: user.omAzon,
                        iskolaOM: user.iskolaOM,
                        type: "register"
                    }, AuthUser.authHeader())
                    .then(response => {
                        console.log(response);
                    })
                    .catch(error => {
                        console.error(error);
                    });

            })
            .catch(error => {
                setAlertOpen(true);
                setAlertType("error");
                setAlertText("Hiba történt a regisztrációkor elküldésekor!\nIlyen OM azonosító vagy email cím már létezik!");
                console.error(error)
            });
    }

    useEffect(() => {
        axios.get("/schoollist")
            .then(response => {
                console.log(response.data);
                setSchools(response.data)
            })
            .catch(error => {

            })
    }, [])

    function changePasswordType() {
        setSeePwd(!seePwd);
    }

    return (
        <section className="gradient-custom login register">
            <div className="container py-5">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                        <div className="card text-white">
                            <div className="card-body p-5 text-center">
                                <form action="" onSubmit={Regist}>
                                    <div className="mb-md-5 mt-md-4 pb-5">
                                        <div className="justify-content-center d-flex row mb-5">
                                            <h2 className="fw-bold text-uppercase --header"> <FontAwesomeIcon icon={faUserPlus} /> {props.title}</h2>
                                        </div>

                                        <hr className="mb-3" />
                                        <div className="form-outline form-white mb-4">
                                            <input type="text" className="form-control form-control-lg fs-4 --input" onChange={inputChange} value={user.nev} placeholder="Név" autoFocus required name="nev" />
                                        </div>

                                        <div className="form-outline form-white mb-4">
                                            <input type="text" className="form-control form-control-lg fs-4 --input" onChange={inputChange} value={user.osztaly} placeholder="Osztály" required name="osztaly" />
                                        </div>

                                        <div className="form-outline form-white mb-4">
                                            <input type="number" className="form-control form-control-lg fs-4 --input" onChange={inputChange} value={user.omAzon} placeholder="OM azonosító" required name="omAzon" />
                                        </div>

                                        <div className="form-outline form-white mb-4">
                                            <input type="email" required className="form-control form-control-lg fs-4 --input" onChange={inputChange} value={user.email} placeholder="E-mail" name="email" />
                                        </div>

                                        <div className="form-outline form-white mb-4 position-relative">
                                            <input autoComplete="new-password" type={seePwd ? "text" : "password"} onChange={inputChange} required value={user.jelszo} name="jelszo" className="form-control form-control-lg fs-4 --input" placeholder="Jelszó" />
                                            {seePwd ? <FontAwesomeIcon onClick={changePasswordType} className="password--icon" icon={faEyeSlash} /> : user.jelszo !== "" ? <FontAwesomeIcon onClick={changePasswordType} className="password--icon" icon={faEye} /> : <></>}
                                        </div>


                                        <div className="form-outline form-white mb-4">
                                            <select name="iskolaOM" className="form-select fs-4 --input" onChange={SelectionChange}>
                                                <option value="0" className="">--Válassz iskolát--</option>
                                                {schools.map((school, index) => {
                                                    return <option key={`school_${index}`} value={school.iskolaOM}>{school.nev}</option>
                                                })}
                                            </select>
                                        </div>

                                        <div className="form-outline form-white mb-4">
                                            <input className="form-check-input mt-1" type="checkbox" value="" id="flexCheckDefault" required />
                                            <label className="form-check-label fs-5 ms-2" htmlFor="flexCheckDefault">
                                                Elfogadom az <a className="rule" href="https://policies.google.com/terms?hl=hu">általános szerződési feltételeket</a>!
                                            </label>
                                        </div>


                                        {/* <p class="text-white-50 mb-5 alert">Felhasználónév vagy jelszó nem megfelelő!</p> */}

                                        <button className="btn btn-outline-light btn-lg px-5" type="submit">Regisztráció</button>

                                    </div>
                                </form>


                                <div>
                                    {/*eslint-disable-next-line jsx-a11y/anchor-is-valid*/}
                                    <p className="mb-0">Van fiókod? <a className="text-white-50 fw-bold page-changer" onClick={RegisterOff}>Bejeletkezés</a></p>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ResponseMessage
                setAlertOpen={setAlertOpen}
                alertOpen={alertOpen}
                text={alertText}
                type={alertType}
                fixed={true} />
        </section>

    );
}