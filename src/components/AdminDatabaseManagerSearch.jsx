import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight, faSearch } from "@fortawesome/free-solid-svg-icons";
import ResponseMessage from "../components/ResponseMessage";

export default function AdminDatabaseManagerSearch(props) {
    const [pageNumber, setPageNumber] = useState(1);
    const [forwardDisabled, setForwardDisabled] = useState(false);
    const [backwardDisabled, setBackwardDisabled] = useState(true);
    const [numberOfPeople, setNumberOfPeople] = useState(10);
    const [searchValue, setSearchValue] = useState("");
    const [alertOpen, setAlertOpen] = useState(false);
    const [alertText, setAlertText] = useState("");
    const [alertType, setAlertType] = useState();

    function numberOfPeopleChange(event) {
        setNumberOfPeople(Number(event.target.value));
        props.pagination(Number(event.target.value), 0, searchValue);
        setPageNumber(1);
        setBackwardDisabled(true);
        setForwardDisabled(false);
    }

    function pageChange(event) {
        switch (event.target.name) {
            case "forward":
                if (pageNumber + 1 === props.numberOfPages) setForwardDisabled(true);
                setBackwardDisabled(false);
                setPageNumber(pageNumber + 1);
                console.log(numberOfPeople);
                console.log(numberOfPeople * ((pageNumber + 1) - 1));
                props.pagination(numberOfPeople, numberOfPeople * ((pageNumber + 1) - 1), searchValue);
                break;

            case "backward":
                if (pageNumber - 1 === 1) setBackwardDisabled(true);
                setForwardDisabled(false);
                setPageNumber(pageNumber - 1);
                props.pagination(numberOfPeople, numberOfPeople * ((pageNumber - 1) - 1), searchValue);
                break;
            default:
                break;
        }
    }

    function inputChange(event) {
        setSearchValue(event.target.value);
    }

    function pageInputChange(event) {
        if ((event.target.value.toString().length <= props.numberOfPages.toString().length) && !event.target.value.includes("e")) {
            setPageNumber(event.target.value === "" ? "" : Number(event.target.value));
            console.log(event.target.value.toString().length);
            event.target.style.width = event.target.value.toString().length + 4 + "ch";
        }
    }

    function preventExtraCharacters(event) {
        if ((event.keyCode > 47 && event.keyCode < 58) || (event.keyCode > 95 && event.keyCode < 106) || event.keyCode === 8 || event.keyCode === 46) {

        }
        else event.preventDefault();
    }

    function pageNumberChange(event, outFocus) {

        if (event.keyCode === 13 || outFocus === true) {
            if (Number(event.target.value) <= props.numberOfPages && Number(event.target.value) !== "" && Number(event.target.value) !== 0) {
                if (Number(event.target.value) === 1) {
                    setBackwardDisabled(true);
                    setForwardDisabled(false);
                }
                console.log(Number(event.target.value));
                console.log(props.numberOfPages);
                if (Number(event.target.value) === props.numberOfPages) {
                    setBackwardDisabled(false);
                    setForwardDisabled(true);
                }
                props.pagination(numberOfPeople, numberOfPeople * (Number(event.target.value) - 1), searchValue);
                if (!outFocus) event.target.blur();
            }
            else if (event.target.value === "") {
                setAlertText("Nem hagyható üresen az oldalszám");
                setAlertType("warning");
                setAlertOpen(true);
                setPageNumber(1);
                if (!outFocus) event.target.blur();
            }
            else {
                setAlertText("Nincs ennyi oldal az adatbázisban");
                setAlertType("error");
                setAlertOpen(true);
                setPageNumber(1);
                if (!outFocus) event.target.blur();
            }
        }
    }

    function search() {
        props.pagination(numberOfPeople, 0, searchValue);
        setPageNumber(1);
        setBackwardDisabled(true);
        setForwardDisabled(false);
    }

    useEffect(() => {
        setPageNumber(1);
        setNumberOfPeople(10);
        setSearchValue("");
        setBackwardDisabled(true);
        setForwardDisabled(false);
    }, [props.showPending])

    return (
        <div className="acc-head manager" id="back-to-top-anchor">
            <div className="container">
                <div className="row">
                    <div className="col-12 col-lg-3">
                        <div className="input-group search-group">
                            <input type="text" onChange={inputChange} value={searchValue} className="form-control btn btn-new i-search" placeholder="Keresés" />
                            <button className="input-group-text btn-search" onClick={search}><FontAwesomeIcon icon={faSearch} /></button>
                        </div>
                    </div>
                    <div className="col-12 col-lg-1 space"></div>
                    <div className="col-12 col-lg-4 justify-content-center d-flex">
                        <div className="onePage">
                            <label htmlFor="" className="fs-4 p-1">Egy oldalon: </label>
                            <select onChange={numberOfPeopleChange} value={numberOfPeople} name="" id="" className="form-select select float-end page--select">
                                <option value="10">10</option>
                                <option value="25">25</option>
                                <option value="50">50</option>
                            </select>
                        </div>
                    </div>
                    <div className="col-12 col-lg-1 space"></div>
                    <div className="col-12 col-lg-3 justify-content-center d-flex">
                        <div className="pageChanger">
                            <label htmlFor="" className="mb-3"><span className="page-number"><input type="number" onKeyDown={preventExtraCharacters} onKeyUp={pageNumberChange} onChange={pageInputChange} value={pageNumber} /></span> oldal / <span className="page-number">{props.numberOfPages}</span> oldal</label>
                            <div>
                                <button disabled={backwardDisabled} onClick={pageChange} name="backward" className="btn btn-page ms-2"><FontAwesomeIcon pointerEvents={"none"} icon={faAngleLeft} /></button>
                                <button disabled={forwardDisabled} onClick={pageChange} name="forward" className="btn btn-page"><FontAwesomeIcon pointerEvents={"none"} icon={faAngleRight} /></button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ResponseMessage
                setAlertOpen={setAlertOpen}
                alertOpen={alertOpen}
                text={alertText}
                type={alertType}
                fixed={true} />

        </div>
    );
}