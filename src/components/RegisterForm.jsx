import { faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import login_icon from "../images/icon.png";
export default function RegisterForm(props) {

    const [selected, setSelect] = useState(-1);

    function SelectionChange(e) {
        setSelect(e.target.value);
    }

    function RegisterOff() {
        props.RegisterOff();
    }

    return (
        <section className="gradient-custom login register">
            <div className="container py-5">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                        <div className="card text-white">
                            <div className="card-body p-5 text-center">
                                <form action="">
                                    <div className="mb-md-5 mt-md-4 pb-5">
                                        <div className="justify-content-center d-flex row mb-5">
                                            <h2 className="fw-bold text-uppercase --header"> <FontAwesomeIcon icon={faUserPlus} /> {props.title}</h2>
                                        </div>

                                        <hr className="mb-3" />
                                        <div className="form-outline form-white mb-4">
                                            <input type="text" className="form-control form-control-lg fs-4 --input" placeholder="Felhasználónév" autoFocus required name="name" />
                                        </div>

                                        <div className="form-outline form-white mb-4">
                                            <input type="password" required name="password" className="form-control form-control-lg fs-4 --input" placeholder="Jelszó" />
                                        </div>

                                        <div className="form-outline form-white mb-4">
                                            <input type="email" required name="email" className="form-control form-control-lg fs-4 --input" placeholder="E-mail" />
                                        </div>

                                        <div className="form-outline form-white mb-4">
                                            <select name="schools" className="form-select fs-4 --input" onChange={SelectionChange}>
                                                <option value="0" className="">--Válassz iskolát--</option>
                                                <option value="1">Jedlik Ányos</option>
                                                <option value="2">Révia Miklós</option>
                                                <option value="3">Lorem Ipsum</option>
                                                <option value="4">--Iskola hozzáadása--</option>
                                            </select>
                                        </div>

                                        {selected === '4' ? <div className="form-outline form-white mb-4">
                                            <input type="text" className="form-control form-control-lg fs-4 --input" placeholder="Iskola neve" autoFocus required name="school" />
                                        </div> : <></>}

                                        <div className="form-outline form-white mb-4">
                                            <input className="form-check-input mt-1" type="checkbox" value="" id="flexCheckDefault" />
                                            <label className="form-check-label fs-5 ms-2" htmlFor="flexCheckDefault">
                                                Elfogadom az <a href="https://policies.google.com/terms?hl=hu">általános szerződési feltételeket</a>!
                                            </label>
                                        </div>


                                        {/* <p class="text-white-50 mb-5 alert">Felhasználónév vagy jelszó nem megfelelő!</p> */}

                                        <button className="btn btn-outline-light btn-lg px-5" type="submit">Regisztráció</button>

                                    </div>
                                </form>


                                <div>
                                    <p className="mb-0">Van fiókod? <a className="text-white-50 fw-bold" onClick={RegisterOff}>Bejeletkezés</a></p>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

    );
}