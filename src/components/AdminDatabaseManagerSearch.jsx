import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight, faSearch } from "@fortawesome/free-solid-svg-icons";

export default function AdminDatabaseManagerSearch(props) {
    return (
        <div className="acc-head manager">
            <div className="container">
                <div className="row">
                    <div className="div-search col-12 col-lg-3">
                        <div className="input-group search-group">
                            <input type="text" className="form-control btn btn-new i-search" placeholder="Keresés" />
                            <button className="input-group-text btn-search" ><FontAwesomeIcon icon={faSearch} /></button>
                        </div>
                    </div>


                    <div className="col-0 col-lg-1"></div>

                    <div className="col-6 col-lg-2 mt-3 mt-lg-0"><label htmlFor="" className="fs-4 p-1 float-end">Egy oldalon: </label></div>

                    <div className="div-max col-6 col-lg-1 mt-3 mt-lg-0">
                        <select name="" id="" className="form-select mt-1">
                            <option value="10">10</option>
                            <option value="25">25</option>
                            <option value="50">50</option>
                        </select>
                    </div>

                    <div className="col-0 col-lg-2"></div>

                    <div className="div-page-number col-7 col-lg-2 mt-3 mt-lg-0">
                        <label htmlFor=""><span className="page-number">1</span> oldal / <span className="page-number">10</span> oldal</label>
                    </div>

                    <div className="div-page-btns col-5 col-lg-1 mt-3 mt-lg-0">
                        <button className="btn btn-page"><FontAwesomeIcon icon={faAngleLeft} /></button>
                        <button className="btn btn-page"><FontAwesomeIcon icon={faAngleRight} /></button>
                    </div>
                </div>
            </div>



        </div>
    );
}