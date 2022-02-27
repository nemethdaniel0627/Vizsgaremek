import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight, faSearch } from "@fortawesome/free-solid-svg-icons";

export default function AdminDatabaseManagerSearch(props) {
    const [pageNumber, setPageNumber] = useState(1);
    const [forwardDisabled, setForwardDisabled] = useState(false);
    const [backwardDisabled, setBackwardDisabled] = useState(true);
    const [numberOfPeople, setNumberOfPeople] = useState();

    function numberOfPeopleChange(event) {
        setNumberOfPeople(Number(event.target.value));
        props.paginaton(Number(event.target.value), Number(event.target.value) * ((pageNumber + 1) - 1));
    }

    function pageChange(event) {
        switch (event.target.name) {
            case "forward":
                if (pageNumber + 1 === props.numberOfPages) setForwardDisabled(true);
                setBackwardDisabled(false);
                setPageNumber(pageNumber + 1);
                props.paginaton(numberOfPeople, numberOfPeople * ((pageNumber + 1) - 1));
                break;

            case "backward":
                if (pageNumber - 1 === 1) setBackwardDisabled(true);
                setForwardDisabled(false);
                setPageNumber(pageNumber - 1);
                props.paginaton(numberOfPeople, numberOfPeople * ((pageNumber + 1) - 1));
                break;
            default:
                break;
        }
    }

    return (
        <div className="acc-head manager">
            <div className="container">
                <div className="row">
                    <div className="col-12 col-lg-3">
                        <div className="input-group search-group">
                            <input type="text" className="form-control btn btn-new i-search" placeholder="Keresés" />
                            <button className="input-group-text btn-search" ><FontAwesomeIcon icon={faSearch} /></button>
                        </div>
                    </div>
                    <div className="col-12 col-lg-1 space"></div>
                    <div className="col-12 col-lg-4 justify-content-center d-flex">
                        <div className="onePage">
                            <label htmlFor="" className="fs-4 p-1">Egy oldalon: </label>
                            <select onChange={numberOfPeopleChange} name="" id="" className="form-select select float-end page--select">
                                <option value="10">10</option>
                                <option value="25">25</option>
                                <option value="50">50</option>
                            </select>
                        </div>
                    </div>
                    <div className="col-12 col-lg-1 space"></div>
                    <div className="col-12 col-lg-3 justify-content-center d-flex">
                        <div className="pageChanger">
                            <label htmlFor=""><span className="page-number">{pageNumber}</span> oldal / <span className="page-number">{props.numberOfPages}</span> oldal</label>
                            <div>
                                <button disabled={backwardDisabled} onClick={pageChange} name="backward" className="btn btn-page ms-2"><FontAwesomeIcon pointerEvents={"none"} icon={faAngleLeft} /></button>
                                <button disabled={forwardDisabled} onClick={pageChange} name="forward" className="btn btn-page"><FontAwesomeIcon pointerEvents={"none"} icon={faAngleRight} /></button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <div className="container">
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
            </div> */}



        </div>
    );
}