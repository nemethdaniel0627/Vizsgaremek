import React, { useEffect, useState } from "react";
import {
  faEye,
  faEyeSlash,
  faLock,
  faPencilAlt,
  faTimesCircle,
  faUnlock,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Activities from "../components/AccountPageActivities";
import AuthUser from "../modules/AuthUser";
import axios from "axios";
import modules from "../helpers/modules";
import ResponseMessage from "../components/ResponseMessage";

export default function Page(props) {
  const [change, changing] = useState(false);
  const [aChange, aChanging] = useState(false);
  const [regiJelszo, setRegiJelszo] = useState("");
  const [ujJelszo, setUjJelszo] = useState("");
  const [seeOldPwd, setSeeOldPwd] = useState(false);
  const [seeNewPwd, setSeeNewPwd] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertType, setAlertType] = useState(undefined);
  const [alertText, setAlertText] = useState("");
  const [logoutUser, setLogoutUser] = useState(false);

  function PassChange() {
    changing(!change);
  }

  // eslint-disable-next-line no-unused-vars
  function AccChange() {
    aChanging(!aChange);
  }
  const [dates, setDates] = useState([]);

  function getDates() {
    axios
      .post("/cancel/dates",
        {
          omAzon: props.user.omAzon,
          month: new Date().getMonth() + 1
        },
        AuthUser.authHeader()
      )
      .then((response) => {
        setDates(response.data.dates);

      })
      .catch((error) => {
        console.error(error);
      });
  }

  function dateConcatenation() {
    try {
      dates.sort();
    } catch (error) { }
    let allDates = "";
    dates.forEach((date) => {

      allDates += ` ${modules.convertDateWithDot(new Date(date))}${dates[dates.length - 1] === date ? '' : ","}`;
    });

    return allDates;
  }

  function changePassword() {
    if (regiJelszo && ujJelszo) {
      axios
        .put("/password/modify",
          {
            regiJelszo: regiJelszo,
            ujJelszo: ujJelszo,
            omAzon: props.user.omAzon,
          },
          AuthUser.authHeader()
        )
        .then((response) => {
          setAlertText("Sikeres jelsz?? m??dos??t??s!");
          setAlertOpen(true);
          setAlertType("success");
          setLogoutUser(true);
        })
        .catch((error) => {
          setAlertText("Sikertelen jelsz?? m??dos??t??s!");
          setAlertOpen(true);
          setAlertType("error");
        });
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

  useEffect(() => {
    getDates();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="m-5">
      <div className="datas">
        <div className="row">
          <div className="col-12 col-lg-9 personal-datas">
            <div className="important">
              <div className="header">
                <h1>Szem??lyes adatok</h1>
              </div>

              <div className="personal-tables admin_user-details_table">
                <div className="key">
                  Vezet??kn??v
                  {aChange ?
                    <input
                      className="form-input"
                      value={props.user.nev.split(" ")[0]}
                    />
                    : <div className="value">{props.user.nev.split(" ")[0]}</div>}
                </div>
                <div className="key">
                  Keresztn??v
                  {aChange ?
                    <input
                      className="form-input"
                      value={props.user.nev.split(" ")[1]}
                    />
                    : <div className="value">{props.user.nev.split(" ")[1]}</div>}
                </div>
                <div className="key">
                  Oszt??ly
                  {aChange ?
                    <input
                      name="osztaly"
                      className="form-input"
                      value={props.user.osztaly}
                    />
                    : <div className="value">{props.user.osztaly}</div>}
                </div>
                <div className="key">
                  Iskola OM azonos??t??
                  {aChange ?
                    <input
                      name="iskolaOM"
                      className="form-input"
                      value={props.user.iskolaOM}
                    />
                    : <div className="value">{props.user.iskolaOM}</div>}
                </div>
                <div className="key">
                  OM azonos??t??
                  {aChange ?
                    <input
                      name="omAzon"
                      className="form-input"
                      value={props.user.omAzon}
                    />
                    : <div className="value">{props.user.omAzon}</div>}
                </div>
                <div className="key">
                  E-mail c??m
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
                <h1>Jelsz?? m??dos??t??s</h1>

                <div className="button">
                  {change ? (
                    <button
                      className="btn modify-btn text-danger border-danger"
                      onClick={PassChange}
                    >
                      {" "}
                      M??gsem <FontAwesomeIcon icon={faTimesCircle} />
                    </button>
                  ) : (
                    <button className="btn modify-btn" onClick={PassChange}>
                      {" "}
                      M??dos??t??s <FontAwesomeIcon icon={faPencilAlt} />
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
                      <div className="key">R??gi jelsz??</div>
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
                      <div className="key">??j jelsz??</div>
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
                      <button onClick={changePassword} className="btn passChange-btn">M??dos??t??s</button>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <ResponseMessage
              setAlertOpen={setAlertOpen}
              alertOpen={alertOpen}
              text={alertText}
              type={alertType}
              fixed={true}
              customFunc={logoutUser === true ? () => { AuthUser.logoutUser(); setLogoutUser(false); } : undefined} />
          </div>
          <div className="col-12 col-lg-3 personal-activities">
            <div className="activities desktop">
              <div className="header">
                <h1>Tev??kenys??g</h1>
              </div>
              <hr />
              {props.user.befizetve ? <Activities
                activity="Befizetve"
                descript="Az eb??d befizet??se megt??rt??nt a le??rt h??napra!"
                date="2022. j??nius"
                type="pay"
              ></Activities> : <></>}
              {dates.length ? <Activities
                activity={"Lemondott nap" + (dates.length > 1 ? "ok:" : ":")}
                descript="A le??rt d??tumokat m??r kor??bban lemondta!"
                dates={dateConcatenation()}
                type="cancel"
              ></Activities> : <></>}
              {!props.befizetve && !dates.length ?
                <Activities activity="Nincs tev??kenys??g" descript="Jelenleg nincs semmilyen tev??kenys??ge"></Activities> : <></>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}