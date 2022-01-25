import {
  faLock,
  faPencilAlt,
  faSyncAlt,
  faTimesCircle,
  faUnlock,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import Activities from "./AccountPageActivities";
import { useState } from "react";

export default function DataPage(props) {
  const [change, changing] = useState(true);

  function PassChange() {
    changing(!change);
  }

  return (
    <div className="h3 mt-5">
      <div className="container datas">
        <div className="row">
          <div className="col-12 personal-datas">
            <div className="important">
              <div className="header">
                <h1 className="mobile-h1">Személyes adatok</h1>
                {/* <button className="btn modify-btn">
                                    {" "}
                                    Módosítás <FontAwesomeIcon icon={faPencilAlt} />
                                </button> */}
              </div>

              <table className="personal-tables fs-6">
                <tr>
                  <td className="key">Vezetéknév</td>
                  <td className="value">{props.user.user.vNev}</td>
                </tr>

                <tr>
                  <td className="key">Osztály</td>
                  <td className="value">{props.user.user.osztaly}</td>
                </tr>
                <tr>
                  <td className="key">Keresztnév</td>
                  <td className="value">{props.user.user.kNev}</td>
                </tr>

                <tr>
                  <td className="key">Iskola OM azonosító</td>
                  <td className="value">{props.user.user.iskolaOm}</td>
                </tr>
                <tr>
                  <td className="key">Felhasználónév</td>
                  <td className="value">{props.user.user.om}</td>
                </tr>
                <tr>
                  <td className="key">E-mail cím</td>
                  <td className="value">{props.user.user.email}</td>
                </tr>
              </table>
            </div>

            <div className="password-change">
              <div className="header">
                <h1 className="mobile-h1">Jelszó módosítás</h1>
                {/* {change ?
                                    <button className="btn modify-btn text-danger border-danger" onClick={PassChange}>
                                        {" "}
                                        Mégsem <FontAwesomeIcon icon={faTimesCircle} />
                                    </button> :
                                    <button className="btn modify-btn" onClick={PassChange}>
                                        {" "}
                                        Módosítás <FontAwesomeIcon icon={faPencilAlt} />
                                    </button>} */}
              </div>

              {!change ? (
                <></>
              ) : (
                <table className="personal-tables">
                  <tr>
                    <td className="key">Régi jelszó</td>
                  </tr>
                  <tr>
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
                  </tr>
                  <tr>
                    <td className="key">Új jelszó</td>
                  </tr>
                  <tr>
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
          <div className="col-12 personal-activities">
            <div className="activities">
              <div className="header">
                <h1 className="mobile-h1">Tevékenység</h1>
                <button className="btn refresh-btn mobile-btn">
                  <FontAwesomeIcon icon={faSyncAlt} />
                </button>
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
              <Activities
                activity="Lemondott nap(ok)"
                date="2021.12.20"
              ></Activities>
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
