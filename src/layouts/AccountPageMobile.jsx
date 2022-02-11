import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLock,  
  faSyncAlt,  
  faUnlock,
} from "@fortawesome/free-solid-svg-icons";
import AccountPageActivities from "../components/AccountPageActivities";
import { useState } from "react";

export default function DataPage(props) {
  const [aChange, aChanging] = useState(false);

  // eslint-disable-next-line no-unused-vars
  function AccChange() {
    aChanging(!aChange);
  }

  const user = props.user.user;
  const userName = props.user.user.nev.split(' ');

  return (
    <div className="h3 mt-5">
      <div className="container datas">
        <div className="row">
          <div className="col-12 personal-datas">
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

              <table className="personal-tables fs-6">
                <tbody>
                  <tr>
                    <td className="key">Vezetéknév</td>
                    {aChange ? (
                      <td>
                        <input
                          className="form-input"
                          value={userName[0]}
                          disabled
                        />
                      </td>
                    ) : (
                      <td className="value">{userName[0]}</td>
                    )}
                  </tr>

                  <tr>
                    <td className="key">Keresztnév</td>
                    {aChange ? (
                      <td>
                        <input
                          className="form-input"
                          value={userName[1]}
                          disabled
                        />
                      </td>
                    ) : (
                      <td className="value">{userName[1]}</td>
                    )}
                  </tr>

                  <tr>
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
                    <td className="key">Iskola OM azonosító</td>
                    {aChange ? (
                      <td>
                        <input
                          className="form-input"
                          value={user.iskolaOm}
                          disabled
                        />
                      </td>
                    ) : (
                      <td className="value">{user.iskolaOm}</td>
                    )}
                  </tr>
                  <tr>
                    <td className="key">OM azonosító</td>
                    {aChange ? (
                      <td>
                        <input
                          className="form-input"
                          value={user.om}
                          disabled
                        />
                      </td>
                    ) : (
                      <td className="value">{user.om}</td>
                    )}
                  </tr>
                  <tr>
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
                <h1 className="mobile-h1">Jelszó módosítás</h1>
              </div>
              <table className="personal-tables">
                <tbody>
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
                </tbody>
              </table>
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
                <AccountPageActivities
                  activity="Befizetett ebéd"
                  date="2022.01.04"
                  type="pay"
                ></AccountPageActivities>
                <AccountPageActivities
                  activity="Lemondott nap(ok)"
                  date="2021.12.20"
                  type="cancel"
                ></AccountPageActivities>
                <AccountPageActivities
                  activity="?????"
                  date="2021.12.20"
                ></AccountPageActivities>
                <AccountPageActivities
                  activity="Adatmódosítás"
                  date="2022.01.24"
                  type="modify"
                ></AccountPageActivities>
              </div>
            </div>


          </div>
        </div>
      </div>
    </div>
  );
}
