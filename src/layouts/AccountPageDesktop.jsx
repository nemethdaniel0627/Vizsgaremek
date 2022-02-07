import React, { useState } from "react";
import {
  faLock,
  faPencilAlt,
  faSyncAlt,
  faTimesCircle,
  faUnlock,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Activities from "../components/AccountPageActivities";

export default function DataPage(props) {
  const [change, changing] = useState(false);
  const [aChange, aChanging] = useState(false);

  function PassChange() {
    changing(!change);
  }

  function AccChange() {
    aChanging(!aChange);
  }

  const user = user.user.user;

  const userName = {
    vNev: user.user.user.nev.split(' ')[0],
    kNev: user.user.user.nev.split(' ')[1]
  }

  return (
    <div className="h3 m-5">
      <div className="container datas">
        <div className="row">
          <div className="col-12 col-lg-9 personal-datas">
            <div className="important">
              <div className="header">
                <h1>Személyes adatok</h1>
                {/* <div className="button">
                  {aChange ? (
                    <button
                      className="btn modify-btn text-danger border-danger"
                      onClick={AccChange}
                    >
                      {" "}
                      Mégsem <FontAwesomeIcon icon={faTimesCircle} />
                    </button>
                  ) : (
                    <button className="btn modify-btn" onClick={AccChange}>
                      {" "}
                      Módosítás <FontAwesomeIcon icon={faPencilAlt} />
                    </button>
                  )}
                </div> */}

              </div>

              <table className="personal-tables">
                <tbody>
                  <tr>
                    <td className="key">Vezetéknév</td>

                    {aChange ? (
                      <td>
                        <input
                          className="form-input"
                          value={userName.vNev}
                          disabled
                        />
                      </td>
                    ) : (
                      <td className="value">{userName.vNev}</td>
                    )}
                    <td className="key">Osztály</td>
                    {aChange ? (
                      <td>
                        <input
                          className="form-input"
                          value={user.osztaly}
                          disabled
                        />
                      </td>
                    ) : (
                      <td className="value">{user.osztaly}</td>
                    )}
                  </tr>
                  <tr>
                    <td className="key">Keresztnév</td>
                    {aChange ? (
                      <td>
                        <input
                          className="form-input"
                          value={userName.kNev}
                          disabled
                        />
                      </td>
                    ) : (
                      <td className="value">{userName.kNev}</td>
                    )}
                    <td className="key">Iskola OM azonosító</td>
                    {aChange ? (
                      <td>
                        <input
                          className="form-input"
                          value={user.user.user.iskolaOM}
                          disabled
                        />
                      </td>
                    ) : (
                      <td className="value">{user.user.user.iskolaOM}</td>
                    )}
                  </tr>
                  <tr>
                    <td className="key">OM azonosító</td>
                    {aChange ? (
                      <td>
                        <input
                          className="form-input"
                          value={user.user.user.omAzon}
                          disabled
                        />
                      </td>
                    ) : (
                      <td className="value">{user.user.user.omAzon}</td>
                    )}
                    <td className="key">E-mail cím</td>
                    {aChange ? (
                      <td>
                        <input
                          className="form-input"
                          value={user.email}
                        />
                      </td>
                    ) : (
                      <td className="value">{user.email}</td>
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
                          type="password"
                          className="form-control w-75 fs-3"
                          required
                          id="oldPass"
                        />
                      </div>
                    </td>
                    <td className="key">Új jelszó</td>
                    <td className="value">
                      <div className="input-group h-100">
                        <span className="input-group-text fs-4">
                          <FontAwesomeIcon icon={faLock} />
                        </span>
                        <input
                          type="password"
                          className="form-control w-50 fs-3"
                          required
                          id="newPass"
                        />
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td colSpan={4} className="text-center">
                      <button className="btn passChange-btn">Módosítás</button>
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
