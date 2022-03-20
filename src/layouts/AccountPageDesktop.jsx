import React, { useEffect, useState } from "react";
import {
  faEye,
  faEyeSlash,
  faInfoCircle,
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
import Tooltip from "react-tooltip";
import modules from "../helpers/modules";

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
  let checker = 0;
  const [dates, setDates] = useState([]);

  function getDates() {
    axios
      .post(
        "/cancelledDates",
        {
          userId: props.user.id,
        },
        AuthUser.authHeader()
      )
      .then((response) => {
        setDates(response.data.dates);

      })
      .catch((error) => {});
  }

  function dateConcatenation() {
    try {
      dates.sort();
    } catch (error) {}
    let allDates = "";
    dates.forEach((date) => {

      allDates += ` ${modules.convertDateWithDot(new Date(date))}${dates[dates.length-1] === date ? '' : ","}`;
    });

    return allDates;
  }

  function changePassword() {
    if (regiJelszo && ujJelszo) {
      axios
        .post(
          "/passwordmodify",
          {
            regiJelszo: regiJelszo,
            ujJelszo: ujJelszo,
            omAzon: props.user.omAzon,
          },
          AuthUser.authHeader()
        )
        .then((response) => {})
        .catch((error) => {});
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

  function SetChecker(){
    checker+=1;
  }

  function changePasswordType() {
    setSeeOldPwd(!seeOldPwd);
  }

  function changeNewPasswordType() {
    setSeeNewPwd(!seeNewPwd);
  }

  useEffect(() => {
    getDates();
  }, []);

  return (
    <div className="h3 m-5">
      <div className="container datas">
        <div className="row">
          <div className="col-12 col-lg-9 personal-datas">
            <div className="important">
              <div className="header">
                <h1>Személyes adatok</h1>
              </div>

              <table className="personal-tables">
                <tbody>
                  <tr>
                    <td className="key">Vezetéknév</td>

                    {aChange ? (
                      <td>
                        <input
                          className="form-input"
                          value={props.user.nev.split(" ")[0]}
                          disabled
                        />
                      </td>
                    ) : (
                      <td className="value">{props.user.nev.split(" ")[0]}</td>
                    )}
                    <td className="key">Osztály</td>
                    {aChange ? (
                      <td>
                        <input
                          className="form-input"
                          value={props.user.osztaly}
                          disabled
                        />
                      </td>
                    ) : (
                      <td className="value">{props.user.osztaly}</td>
                    )}
                  </tr>
                  <tr>
                    <td className="key">Keresztnév</td>
                    {aChange ? (
                      <td>
                        <input
                          className="form-input"
                          value={props.user.nev.split(" ")[1]}
                          disabled
                        />
                      </td>
                    ) : (
                      <td className="value">{props.user.nev.split(" ")[1]}</td>
                    )}
                    <td className="key">Iskola OM azonosító</td>
                    {aChange ? (
                      <td>
                        <input
                          className="form-input"
                          value={props.user.iskolaOM}
                          disabled
                        />
                      </td>
                    ) : (
                      <td className="value">{props.user.iskolaOM}</td>
                    )}
                  </tr>
                  <tr>
                    <td className="key">OM azonosító</td>
                    {aChange ? (
                      <td>
                        <input
                          className="form-input"
                          value={props.user.omAzon}
                          disabled
                        />
                      </td>
                    ) : (
                      <td className="value">{props.user.omAzon}</td>
                    )}
                    <td className="key">E-mail cím</td>
                    {aChange ? (
                      <td>
                        <input
                          className="form-input"
                          value={props.user.email}
                        />
                      </td>
                    ) : (
                      <td className="value">{props.user.email}</td>
                    )}
                  </tr>
                  {aChange ? (
                    <tr>
                      <td colSpan={4} className="text-center">
                        <button className="btn passChange-btn">
                          Módosítás
                        </button>
                      </td>
                    </tr>
                  ) : (
                    <></>
                  )}
                </tbody>
              </table>
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
                <table className="personal-tables">
                  <tr>
                    <td className="key">Régi jelszó</td>
                    <td className="value">
                      <div className="input-group h-100">
                        <span className="input-group-text fs-4">
                          <FontAwesomeIcon icon={faUnlock} />
                        </span>
                        <input
                          type={seeOldPwd ? "text" : "password"}
                          className="form-control w-75 fs-3 password-input"
                          required
                          name="regiJelszo"
                          value={regiJelszo}
                          onChange={inputChange}
                        />
                        {seeOldPwd ? (
                          <FontAwesomeIcon
                            onClick={changePasswordType}
                            className="password--icon"
                            icon={faEyeSlash}
                          />
                        ) : regiJelszo ? (
                          <FontAwesomeIcon
                            onClick={changePasswordType}
                            className="password--icon"
                            icon={faEye}
                          />
                        ) : (
                          <></>
                        )}
                      </div>
                    </td>
                    <td className="key">Új jelszó</td>
                    <td className="value">
                      <div className="input-group h-100 position-relative">
                        <span className="input-group-text fs-4 password-input">
                          <FontAwesomeIcon icon={faLock} />
                        </span>
                        <input
                          type={seeNewPwd ? "text" : "password"}
                          className="form-control w-50 fs-3"
                          required
                          name="ujJelszo"
                          value={ujJelszo}
                          onChange={inputChange}
                        />
                        {seeNewPwd ? (
                          <FontAwesomeIcon
                            onClick={changeNewPasswordType}
                            className="password--icon"
                            icon={faEyeSlash}
                          />
                        ) : ujJelszo ? (
                          <FontAwesomeIcon
                            onClick={changeNewPasswordType}
                            className="password--icon"
                            icon={faEye}
                          />
                        ) : (
                          <></>
                        )}
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td colSpan={4} className="text-center">
                      <button
                        onClick={changePassword}
                        className="btn passChange-btn"
                      >
                        Módosítás
                      </button>
                    </td>
                  </tr>
                </table>
              )}
            </div>
          </div>
          <div className="col-12 col-lg-3 personal-activities">
            <div className="activities desktop">
              <div className="header">
                <h1>Tevékenység</h1>
              </div>
              <hr />
              {props.befizetve ? <Activities
                activity="Befizetve"
                descript="Az ebéd befizetése megtörtént a leírt hónapra!"
                date="2022. március"
                type="pay"
              ></Activities>: <></>}
              {dates.length ? <Activities
                activity={"Lemondott nap" + (dates.length > 1 ? "ok:" : ":")}
                descript="A leírt dátumokon nem tud ebédelni!"
                dates={dateConcatenation()}
                type="cancel"
              ></Activities> :<></>}
              { !props.befizetve && !dates.length ?
              <Activities activity="Nincs tevékenység" descript="Jelenleg nincs semmilyen tevékenysége"></Activities>:<></>}
              {/* <Activities
                activity="Adatmódosítás"
                date="2022.01.24"
                type="modify"
              ></Activities> */}
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
