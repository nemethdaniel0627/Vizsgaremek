import {
    faKey,
    faLock,
    faPen,
    faTrash,
    faUnlock,
  } from "@fortawesome/free-solid-svg-icons";
  import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
  import React from "react";
  import Accordion from "react-bootstrap/Accordion";
  
  
  export default function AccountPage(props) {
    

    return (
      <div className="h3 m-5">
        <Accordion defaultActiveKey="0">
          <Accordion.Item eventKey="0">
            <Accordion.Header className="acc-head">
              <span className="fs-2 m-2">Személyes adatok</span>
            </Accordion.Header>
            <Accordion.Body className="acc-body">
              <div className="container mw-100">
                <div className="row">
                  <div className="col-sm-12 col-lg-6 rowEven">
                    Vezetéknév:
                    <span>
                      {props.user.vNev}
                    </span>
                  </div>
                  <div className="col-sm-12 col-lg-6 rowEven">
                    Keresztnév:
                    <span>
                      {props.user.kNev}
                    </span>
                  </div>                  
                  <div className="col-sm-12 col-lg-6 rowOdd">
                    OM azonosító:
                    <span>
                      {props.user.om}
                    </span>
                  </div>
                  <div className="col-sm-12 col-lg-6 rowOdd">
                    Osztály:
                    <span>
                      {props.user.osztaly}
                    </span>
                  </div>
                  <div className="col-sm-12 col-lg-6 rowEven">
                    E-mail:
                    <span>
                      {props.user.email}
                    </span>
                  </div>
                  <div className="col-sm-12 col-lg-6 rowEven">
                    Iskola OM azonosítója:
                    <span>
                      {props.user.iskolaOm}
                    </span>
                  </div>
                </div>
              </div>
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="1">
            <Accordion.Header className="acc-head">
              <span className="fs-2 m-2">Bankkártya adatok</span>
            </Accordion.Header>
            <Accordion.Body className="acc-body">
              <div className="container mw-100">
                <div className="row">
                  <div className="col-lg-6 col-sm-12 rowEven">
                    <div className="container">
                      <div className="row">
                        <div className="col-lg-5 col-sm-12">Bankkártya szám:</div>
                        <div className="col-lg-7 col-sm-12">
                          <input
                            type="text"
                            name=""
                            id="cardNumber"
                            className="form-control cardData fs-3 w-100 h-100"
                            disabled
                          />
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
                          <input
                            type="text"
                            name=""
                            id="bankName"
                            className="form-control cardData fs-3 h-100"
                            disabled
                            value=""
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-6 col-sm-12 rowOddorEven">
                    <div className="container">
                      <div className="row">
                        <div className="col-lg-5 col-sm-12">Tulajdonos neve:</div>
                        <div className="col-lg-7 col-sm-12">
                          <input
                            type="text"
                            name=""
                            id="cardName"
                            className="form-control cardData fs-3 w-100 h-100"
                            disabled
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-6 col-sm-12 mt-2 rowOdd">
                    <div className="container">
                      <div className="row">
                        <div className="col-lg-5 col-sm-12">Lejárati dátum:</div>
                        <div className="col-lg-4 col-sm-9 col-9">
                          <input
                            type="text"
                            name=""
                            id="cardExpiry"
                            className="form-control cardData fs-3 h-100"
                            disabled
                          />
                        </div>
                        <div className="col-lg-3 col-sm-3 col-3 justify-content-center d-flex">
                          <button className="btn btn-secondary fs-4">
                            <FontAwesomeIcon icon={faPen} />
                          </button>
                          <button className="btn btn-secondary fs-4 ms-2">
                            <FontAwesomeIcon icon={faTrash} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="2">
            <Accordion.Header className="acc-head">
              <span className="fs-2 m-2">Jelszó változtatás</span>
            </Accordion.Header>
            <Accordion.Body className="acc-body">
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
                      <input
                        type="password"
                        className="form-control w-75 fs-3"
                        required
                        id="oldPass"
                      />
                    </div>
                  </div>
  
                  <div className="col-sm-0 col-lg-2"></div>
  
                  <div className="col-sm-6 col-lg-2 mt-2">
                    <h2>Új jelszó:</h2>
                  </div>
  
                  <div className="col-sm-6 col-lg-3 mt-1">
                    <div className="input-group  h-100">
                      <span className="input-group-text  fs-4">
                        <FontAwesomeIcon icon={faLock} />
                      </span>
                      <input
                        type="password"
                        className="form-control w-75 fs-3"
                        required
                        id="newPass"
                      />
                    </div>
                  </div>
  
                  <div className="col-sm-12 col-lg-12 mt-lg-2 mt-4 ">
                    <button                      
                      className="btn btn-secondary mx-auto d-flex w-auto fs-2 px-4"
                    >
                      <FontAwesomeIcon icon={faKey} className="mt-2 me-2 fs-2" />
                      Módosítás
                    </button>
                  </div>
                </div>
              </div>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </div>
    );
  }
  