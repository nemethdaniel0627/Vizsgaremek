import React, { useEffect, useState } from "react";

export default function UserModal(props) {
    
    const loggedInUser = JSON.parse(sessionStorage.getItem("user"));
    const [tmpUser, setTmpUser] = useState({
        nev: props.user ? props.user.nev : "",
        omAzon: props.user ? props.user.omAzon : "",
        osztaly: props.user ? props.user.osztaly : "",
        email: props.user ? props.user.email : "",
        iskolaOM: props.user ? props.user.iskolaOM : loggedInUser.iskolaOM,
        jog: props.user ? 2 : ""
    })

    function inputChange(event) {
        let { name, value } = event.target;

        setTmpUser(prevDatas => {
            return {
                ...prevDatas,
                [name]: value
            }
        })
    }
    
    useEffect(() => {
        props.getUserInfo(tmpUser);
        console.log(props.user);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [tmpUser])

    useEffect(() => {
        if (tmpUser.jog === "3") {
            setTmpUser(prevData => {
                return {
                    ...prevData,
                    osztaly: ""
                }
            });
        }
    }, [tmpUser.jog])

    return (
        <div className="fs-4 admin-modal">
            <div className="input-group mb-3">
                <label htmlFor="new_name " className="mb-2">Név:</label>
                <input type="text" name="nev" onChange={inputChange} value={tmpUser.nev} className="w-100 form-control" />
            </div>
            {tmpUser.jog !== "3" ? <div className="input-group mb-3">
                <label htmlFor="new_class" className="mb-2">Osztály:</label>
                <input type="text" name="osztaly" onChange={inputChange} value={tmpUser.osztaly} className="w-100 form-control" />
            </div> : <></>}
            <div className="input-group mb-3">
                <label htmlFor="new_email" className="mb-2">E-mail cím:</label>
                <input type="email" name="email" onChange={inputChange} value={tmpUser.email} className="w-100 form-control" />
            </div>
            <div className="input-group mb-3">
                <label htmlFor="new_username" className="mb-2">OM azonosító:</label>
                <input type="text" name="omAzon" onChange={inputChange} value={tmpUser.omAzon} className="w-100 form-control" />
            </div>
            <div className="input-group mb-3 d-flex flex-column">
                <label htmlFor="jog">
                    Felhasználó típusa
                </label>
                <select name="jog" id="jog" className="p-2" onChange={inputChange} value={tmpUser.jog}>
                    <option value="0">-- Válasszon típust --</option>
                    <option value="2">Étkező</option>
                    <option value="3">Konyhás</option>
                </select>
            </div>
        </div>
    )
}