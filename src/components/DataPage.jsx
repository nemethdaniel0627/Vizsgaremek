import { faKey, faLock, faPen, faTrash, faUnlock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";


export default function DataPage(props) {
    return (
        <div className="h2">

            <div className="accordion m-5" id="personalData">
                <div className="accordion-item">
                    <h2 className="accordion-header" id="headingPersonal">
                        <button className="accordion-button border border-dark fs-1 p-4" type="button" data-bs-toggle="collapse" data-bs-target="#collapsePersonal">
                            Személyes adatok
                        </button>
                    </h2>
                    <div id="collapsePersonal" className="accordion-collapse collapse show" aria-labelledby="headingPersonal" data-bs-parent="#personalData">
                        <div className="accordion-body table-responsive-sm">

                            <div className="container mw-100">
                                <div className="row">
                                    <div className="col-sm-12 col-lg-6 rowEven rowOdd">
                                        Családi név:
                                        {props.lastName}
                                    </div>
                                    <div className="col-sm-12 col-lg-6 rowEven">
                                        Vezetéknév:
                                        {props.firstName}
                                    </div>
                                    <div className="col-sm-12 col-lg-12 rowOdd">
                                        Útónév:
                                        {props.secondName}
                                    </div>
                                    <div className="col-sm-12 col-lg-6 rowEven">
                                        Iskola OM azonosítója:
                                        {props.schoolId}
                                    </div>
                                    <div className="col-sm-12 col-lg-6 rowEven rowOdd">
                                        Osztály:
                                        {props.userclassName}
                                    </div>
                                    <div className="col-sm-12 col-lg-6 rowOddorEven">
                                        E-mail:
                                        {props.email}
                                    </div>
                                    <div className="col-sm-12 col-lg-6 rowOdd">
                                        Felhasználónév:
                                        {props.userName}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="accordion-item mb-3 mt-3">
                    <h2 className="accordion-header" id="headingCard">
                        <button className="accordion-button collapsed border border-dark fs-1 p-4" type="button" data-bs-toggle="collapse" data-bs-target="#collapseCard">
                            Bankkártya adatok
                        </button>
                    </h2>
                    <div id="collapseCard" className="accordion-collapse" aria-labelledby="headingCard" data-bs-parent="#personalData">
                        <div className="accordion-body table-responsive-sm">

                            <div className="container mw-100">
                                <div className="row">
                                    <div className="col-lg-6 col-sm-12 rowEven">
                                        <div className="container">
                                            <div className="row">
                                                <div className="col-lg-5 col-sm-12">
                                                    Bankkártya szám:
                                                </div>
                                                <div className="col-lg-7 col-sm-12">
                                                    <input type="text" name="" id="cardNumber" className="form-control cardData fs-3 w-100 h-100" disabled />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-6 col-sm-12 rowEven rowOdd">

                                        <div className="container">
                                            <div className="row">
                                                <div className="col-lg-5 col-sm-12">
                                                    Számlavezető bank:
                                                </div>
                                                <div className="col-lg-5 col-sm-12">
                                                    <input type="text" name="" id="bankName" className="form-control cardData fs-3 h-100" disabled value='' />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-6 col-sm-12 rowOddorEven">

                                        <div className="container">
                                            <div className="row">
                                                <div className="col-lg-5 col-sm-12">
                                                    Tulajdonos neve:
                                                </div>
                                                <div className="col-lg-7 col-sm-12">
                                                    <input type="text" name="" id="cardName" className="form-control cardData fs-3 w-100 h-100" disabled />
                                                </div>

                                            </div>
                                        </div>



                                    </div>
                                    <div className="col-lg-6 col-sm-12 mt-2 rowOdd">
                                        <div className="container">
                                            <div className="row">
                                                <div className="col-lg-5 col-sm-12">
                                                    Lejárati dátum:
                                                </div>
                                                <div className="col-lg-5 col-sm-10 w-sm-50">
                                                    <input type="text" name="" id="cardExpiry" className="form-control cardData w-sm-50 w-lg-100 fs-3 h-100" disabled />
                                                </div>
                                                <div className="col-lg-1 col-sm-1 justify-content-center d-flex w-sm-50">
                                                    <button className="btn btn-secondary fs-4">
                                                        <FontAwesomeIcon icon = {faPen} />
                                                    </button>
                                                    <button className="btn btn-secondary fs-4 ms-2">
                                                        <FontAwesomeIcon icon = {faTrash} />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>


                        </div>
                    </div>
                </div>
                <div className="accordion-item">
                    <h2 className="accordion-header" id="headingPass">
                        <button className="accordion-button collapsed border border-dark fs-1 p-4" type="button" data-bs-toggle="collapse" data-bs-target="#collapsePass">
                            Jelszó módosítás
                        </button>
                    </h2>
                    <div id="collapsePass" className="accordion-collapse" aria-labelledby="headingPass" data-bs-parent="#personalData">
                        <div className="accordion-body">

                            <div className="container">
                                <div className="row">
                                    <div className="col-sm-6 col-lg-2 mt-2">
                                        <h2>Régi jelszó:</h2>
                                    </div>

                                    <div className="col-sm-6 col-lg-3 mt-1">
                                        <div className="input-group h-100">
                                            <span className="input-group-text fs-4">
                                                <FontAwesomeIcon icon={faUnlock} />
                                            </span>
                                            <input type="password" className="form-control w-75 fs-3" required id="oldPass" />
                                        </div>
                                    </div>

                                    <div className="col-sm-0 col-lg-2">
                                    </div>

                                    <div className="col-sm-6 col-lg-2 mt-2">
                                        <h2 >Új jelszó:</h2>
                                    </div>

                                    <div className="col-sm-6 col-lg-3 mt-1">
                                        <div className="input-group  h-100">
                                            <span className="input-group-text  fs-4">
                                                <FontAwesomeIcon icon={faLock} />
                                            </span>
                                            <input type="password" className="form-control w-75 fs-3" required id="newPass" />
                                        </div>
                                    </div>

                                    <div className="col-sm-12 col-lg-12 mt-lg-2 mt-4 ">
                                        <button onclick="" className="btn btn-secondary mx-auto d-flex w-auto fs-2 px-4">
                                            <FontAwesomeIcon icon={faKey} className="mt-2 me-2 fs-2" />
                                            Módosítás
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}