import { faEye, faEyeSlash, faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState, useEffect } from "react";
import axios from "axios";
import login_icon from "../images/icon.png";
import ResponseMessage from "../components/ResponseMessage";

export default function RegisterForm(props) {

    const [selected, setSelected] = useState(false);
    const [seePwd, setSeePwd] = useState(false);
    const [alertOpen, setAlertOpen] = useState(false);
    const [alertType, setAlertType] = useState(undefined);
    // function closeError() {
    //     setErrorOpen(false);
    // }
    const [user, setUser] = useState({
        name: "",
        password: "",
        email: "",
        iskolaOM: null,
        osztaly: "",
        omAzon: ""
    });

    function SelectionChange(event) {
        const { value, name } = event.target;

        if (value === '4') setSelected(true);
        else setSelected(false);

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
        axios.post("/email",
            {
                toEmail: "",
                fromEmail: "rozsnono@gmail.com",
                // name: user.nev,
                // class: user.osztaly,
                // om: user.omAzon,
                where: document.getElementById('message_where').value,
                what: document.getElementById('message_what').value,
                type: "register"
            },
            {
                headers: {
                    "Authorization": `Baerer ${sessionStorage.getItem("token")}`
                }
            })
            .then(response => {
                console.log(response);
            })
            .catch(error => {
                console.error(error);
            });
      
        e.preventDefault();

        axios.post("/register",
            {
                user: user
            })
            .then(response => {
                setAlertType(false)
                console.log(response);
            })
            .catch(error => {
                setAlertType(true);
                console.error(error)
            });

        // emailjs.send('gmail', 'registration', {
        //     name: user.name,
        //     subject: "Sikeres regisztráció kérelem",
        //     email: user.email,
        //     text: "A regisztrációja elbírálás alatt van, kérjük legyen türelemmel. \n Amint sikeresen lezárult a regisztáció, e-mailben értesítsük."
        // }, 'user_o4UcHcGE4vZKf1FT7oMAO').then((result) => {
        // }, (error) => {
        //     console.log(error.text);
        // });
    }

    useEffect(() => {
        if (alertType !== undefined) setAlertOpen(true);
    }, [alertType])

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
                                            <input type="text" className="form-control form-control-lg fs-4 --input" onChange={inputChange} value={user.name} placeholder="Név" autoFocus required name="name" />
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
                                            <input autoComplete="new-password" type={seePwd ? "text" : "password"} onChange={inputChange} required value={user.password} name="password" className="form-control form-control-lg fs-4 --input" placeholder="Jelszó" />
                                            {seePwd ? <FontAwesomeIcon onClick={changePasswordType} className="password--icon" icon={faEyeSlash} /> : user.password !== "" ? <FontAwesomeIcon onClick={changePasswordType} className="password--icon" icon={faEye} /> : <></>}
                                        </div>


                                        <div className="form-outline form-white mb-4">
                                            <select name="iskolaOM" className="form-select fs-4 --input" onChange={SelectionChange}>
                                                <option value="0" className="">--Válassz iskolát--</option>
                                                <option value="203037">Jedlik Ányos</option>
                                                <option value="030695">Révia Miklós</option>
                                                <option value="123456">Lorem Ipsum</option>
                                                <option value="4">--Iskola hozzáadása--</option>
                                            </select>
                                        </div>

                                        {selected ? <div className="form-outline form-white mb-4">
                                            <input type="number" className="form-control form-control-lg fs-4 --input" onChange={inputChange} value={user.iskola} placeholder="Iskola OM azonosítója" autoFocus required name="iskolaOM" />
                                        </div> : <></>}

                                        <div className="form-outline form-white mb-4">
                                            <input className="form-check-input mt-1" type="checkbox" value="" id="flexCheckDefault" />
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
            {alertType ?
                <ResponseMessage
                    setAlertOpen={setAlertOpen}
                    alertOpen={alertOpen}
                    text={"Hiba történt a regisztrációkor elküldésekor!\nIlyen OM azonosító vagy email cím már létezik!"}
                    type="error" />
                : <ResponseMessage
                    setAlertOpen={setAlertOpen}
                    alertOpen={alertOpen}
                    text={"Sikeres regisztráció!\nTovábbi információkat emailben küldtünk"}
                    type="success" />}
        </section>

    );
}