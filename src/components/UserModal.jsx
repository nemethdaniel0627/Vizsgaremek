import React, { useEffect, useState } from "react";
import Chips from "./Chips";

export default function UserModal(props) {

    const [canceledDate, setCanceledDate] = useState("");
    const [tmpUser, setTmpUser] = useState({
        nev: props.user ? props.user.nev : "",
        omAzon: props.user ? props.user.omAzon : undefined,
        osztaly: props.user ? props.user.osztaly : "",
        email: props.user ? props.user.email : "",
        iskolaOM: props.user ? props.user.iskolaOM : "",
        befizetve: props.user ? props.user.befizetve : "",
        lemondva: []
    })

    function dateChange(event) {
        const value = event.target.value;
        console.log(value);
        let tmpDates = tmpUser.lemondva;
        tmpDates.push(value)
        setTmpUser(prevDates => {
            return {
                ...prevDates,
                lemondva: tmpDates
            }
        })
        setCanceledDate("");
    }

    function inputChange(event) {
        let { name, value } = event.target;
        if (name === "befizetve")  value = event.target.checked

        setTmpUser(prevDatas => {
            return {
                ...prevDatas,
                [name]: value
            }
        })
    }

    function DateRewrite(date) {
        const temporaryDate = date.split('-');
        return temporaryDate[0] + ". " + temporaryDate[1] + ". " + temporaryDate[2];
    }    

    function DateCancelDelete(index) {
        const dates = tmpUser.lemondva.filter((item) => item !== tmpUser.lemondva[index]);

        setTmpUser(prevDatas => {
            return {
                ...prevDatas,
                lemondva: dates
            }
        });
        // console.log(dates);
    }

    useEffect(() => {
        props.getUserInfo(tmpUser);
        console.log(props.user);
    }, [tmpUser])

    return (
        <div className="fs-4 admin-modal">
            <div className="input-group mb-3">
                <label htmlFor="new_name " className="mb-2">Név:</label>
                <input type="text" name="nev" onChange={inputChange} value={tmpUser.nev} className="w-100 form-control" />
            </div>
            <div className="input-group mb-3">
                <label htmlFor="new_class" className="mb-2">Osztály:</label>
                <input type="text" name="osztaly" onChange={inputChange} value={tmpUser.osztaly} className="w-100 form-control" />
            </div>
            <div className="input-group mb-3">
                <label htmlFor="new_email" className="mb-2">E-mail cím:</label>
                <input type="email" name="email" onChange={inputChange} value={tmpUser.email} className="w-100 form-control" />
            </div>
            <div className="input-group mb-3">
                <label htmlFor="new_username" className="mb-2">OM azonosító:</label>
                <input type="text" name="omAzon" onChange={inputChange} value={tmpUser.omAzon} className="w-100 form-control" />
            </div>
            <div className="form-check mb-3">
                <input className="form-check-input" name="befizetve" onChange={inputChange} checked={tmpUser.befizetve ? true : false}  type="checkbox" />
                <label className="form-check-label" htmlFor="new_isPaid">
                    Befizetve
                </label>
            </div>
            <div className="mb-4">
                <label htmlFor="new_date" className="mb-2">Lemondott nap(ok) hozzáadása</label>
                <div className="input-group">
                    <input onChange={dateChange} value={canceledDate} type="date" id="new_date" className="form-control date-selector--input" />
                </div>
            </div>
            {tmpUser.lemondva.lenght !== 0 ?
                tmpUser.lemondva.map((date, index) => (
                    <Chips key={"c_" + index} removeIndex={index} date={DateRewrite(date)} closeDate={DateCancelDelete} />
                )) : <></>}

        </div>
    )
}