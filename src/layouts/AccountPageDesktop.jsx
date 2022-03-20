import React, { useState } from "react";
import {
  faEye,
  faEyeSlash,
  faLock,
  faPencilAlt,
  faSyncAlt,
  faTimesCircle,
  faUnlock,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Activities from "../components/AccountPageActivities";
import AuthUser from "../modules/AuthUser";
import axios from "axios";

export default function DataPage(props) {
  const [change, changing] = useState(false);
  const [aChange, aChanging] = useState(false);
  const [regiJelszo, setRegiJelszo] = useState("");
  const [ujJelszo, setUjJelszo] = useState("");
  const [seeOldPwd, setSeeOldPwd] = useState(false);
  const [seeNewPwd, setSeeNewPwd] = useState(false);


  function PassChange() {
    changing(!change);
  }

  // eslint-disable-next-line no-unused-vars
  function AccChange() {
    aChanging(!aChange);
  }

  function changePassword() {
    if (regiJelszo && ujJelszo) {
      axios.post("/passwordmodify",
        {
          regiJelszo: regiJelszo,
          ujJelszo: ujJelszo,
          omAzon: props.props.user.omAzon
        }, AuthUser.authHeader())
        .then(response => {

        })
        .catch(error => {

        })
    }
  }

  function inputChange(event) {
    const { name, value } = event.target;

    switch (name) {
      case "regiJelszo":
        setRegiJelszo(value);
        break;

      case "ujJelszo":
        setUjJelszo(value);
        break;

      default:
        break;
    }
  }


  function changePasswordType() {
    setSeeOldPwd(!seeOldPwd);
  }


  function changeNewPasswordType() {
    setSeeNewPwd(!seeNewPwd);
  }

  return (
    <div className="h3 m-5">
      <div className="container datas">
        <div className="row">
          <div className="col-12 col-lg-9 personal-datas">
            <div className="important">
              <div className="header">
                <h1>Személyes adatok</h1>
              </div>

              <div className="personal-tables admin_user-details_table">
                <div className="key">
                  Vezetéknév
                  {aChange ?
                    <input
                      className="form-input"
                      value={props.user.nev.split(" ")[0]}
                    />
                    : <div className="value">{props.user.nev.split(" ")[0]}</div>}
                </div>
                <div className="key">
                  Keresztnév
                  {aChange ?
                    <input
                      className="form-input"
                      value={props.user.nev.split(" ")[1]}
                    />
                    : <div className="value">{props.user.nev.split(" ")[1]}</div>}
                </div>
                <div className="key">
                  Osztály
                  {aChange ?
                    <input
                      name="osztaly"
                      className="form-input"
                      value={props.user.osztaly}
                    />
                    : <div className="value">{props.user.osztaly}</div>}
                </div>
                <div className="key">
                  Iskola OM azonosító
                  {aChange ?
                    <input
                      name="iskolaOM"
                      className="form-input"
                      value={props.user.iskolaOM}
                    />
                    : <div className="value">{props.user.iskolaOM}</div>}
                </div>
                <div className="key">
                  OM azonosító
                  {aChange ?
                    <input
                      name="omAzon"
                      className="form-input"
                      value={props.user.omAzon}
                    />
                    : <div className="value">{props.user.omAzon}</div>}
                </div>
                <div className="key">
                  E-mail cím
                  {aChange ?
                    <input
                      name="email"
                      className="form-input"
                      value={props.user.email}
                    />
                    : <div className="value">{props.user.email}</div>}
                </div>
              </div>
            </div>

            <div className="password-change">
              <div className="header">
                <h1>Jelszó módosítás</h1>

                <div className="button">
                  {change ? (
                    <button
                      className="btn modify-btn text-danger border-danger"
                      onClick={PassChange}
                    >
                      {" "}
                      Mégsem <FontAwesomeIcon icon={faTimesCircle} />
                    </button>
                  ) : (
                    <button className="btn modify-btn" onClick={PassChange}>
                      {" "}
                      Módosítás <FontAwesomeIcon icon={faPencilAlt} />
                    </button>
                  )}
                </div>

              </div>

              {!change ? (
                <></>
              ) : (
                <div className="personal-tables">
                  <div className="password-change--row">
                    <div className="password-change--inputs">
                      <div className="key">Régi jelszó</div>
                      <div className="value">
                        <div className="input-group h-100">
                          <span className="input-group-text fs-4">
                            <FontAwesomeIcon icon={faUnlock} />
                          </span>
                          <input
                            type={seeOldPwd ? "text" : "password"}
                            onChange={inputChange}
                            className="form-control w-75 fs-3 password-input"
                            required
                            name="regiJelszo"
                            value={regiJelszo}
                          />
                          {seeOldPwd ? <FontAwesomeIcon onClick={changePasswordType} className="password--icon" icon={faEyeSlash} /> : regiJelszo ? <FontAwesomeIcon onClick={changePasswordType} className="password--icon" icon={faEye} /> : <></>}
                        </div>
                      </div>
                    </div>
                    <div className="password-change--inputs">
                      <div className="key">Új jelszó</div>
                      <div className="value">
                        <div className="input-group h-100 position-relative">
                          <span className="input-group-text fs-4 password-input">
                            <FontAwesomeIcon icon={faLock} />
                          </span>
                          <input
                            type={seeNewPwd ? "text" : "password"}
                            onChange={inputChange}
                            className="form-control w-50 fs-3"
                            required
                            name="ujJelszo"
                            value={ujJelszo}
                          />
                          {seeNewPwd ? <FontAwesomeIcon onClick={changeNewPasswordType} className="password--icon" icon={faEyeSlash} /> : ujJelszo ? <FontAwesomeIcon onClick={changeNewPasswordType} className="password--icon" icon={faEye} /> : <></>}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div colSpan={4} className="text-center">
                      <button onClick={changePassword} className="btn passChange-btn">Módosítás</button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="col-12 col-lg-3 personal-activities">
            <div className="activities desktop">
              <div className="header">
                <h1>Tevékenység</h1>
                <div className="button">
                  <button className="btn refresh-btn ">
                    <FontAwesomeIcon icon={faSyncAlt} />
                  </button>
                </div>

              </div>
              <hr />
              <Activities
                activity="Befizetett ebéd"
                date="2022.01.04"
                type="pay"
              ></Activities>
              <Activities
                activity="Lemondott nap(ok)"
                date="2021.12.20"
                type="cancel"
              ></Activities>
              <Activities activity="????????" date="2021.12.20"></Activities>
              <Activities
                activity="Adatmódosítás"
                date="2022.01.24"
                type="modify"
              ></Activities>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
