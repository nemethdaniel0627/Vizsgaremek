import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState, useEffect } from "react";

export default function MenuDays(props) {

    const [meals, setMeals] = useState([]);
    const [moreInfos, setMoreInfos] = useState(false);

    function inputChange() {
        const tmpChecked = !moreInfos;
        setMoreInfos(!moreInfos);
        let elements = document.getElementsByClassName("menu--day-table--meals--infos");
        let allergen = document.getElementsByClassName("menu--allergen");
        elements[0].classList.add("d-none");
        for (let i = 0; i < elements.length; i++) {
            if (tmpChecked) {
                elements[i].classList.remove("d-none");
                allergen[0].classList.remove("d-none");
            }
            else {
                elements[i].classList.add("d-none");
                allergen[0].classList.add("d-none");
            }
        }
    }

    useEffect(() => {
        if (props.meals) setMeals(props.meals);
    }, [props.meals])
    return (
        <label htmlFor={props.inputId} onChange={props.onChange} className={"menu--day-table--meals " + (props.notDay ? "menu--day-table--legend" : "")} id={props.id} >
            <h3 className="menu--day-table--header">
                {props.dayName === true ?
                    <div className="menu--day-table--header--infos">
                        <input onChange={inputChange} type="checkbox" id="menuInfos" />
                        <label htmlFor="menuInfos">
                            Részletes?
                            {moreInfos ? <FontAwesomeIcon className="text-success" icon={faCheck} /> : <FontAwesomeIcon className="text-danger" icon={faTimes} />}
                        </label>
                    </div>
                    : props.dayName
                }
            </h3>
            {meals.map((meal, index) => {
                return <span key={`meal_${index}`}>
                    {props.notDay ? meal : meal[0].replaceAll("\r\n", ", ")}
                    {!props.notDay ? <div className="menu--day-table--meals--infos d-none">
                        <div className="menu--day-table--meals--infos--energia">Energia: {meal[1]}</div>
                        <div className="menu--day-table--meals--infos--tapertek">
                            <div>
                                <span>
                                    Fehérje
                                </span>
                                <span>
                                    {meal[2]}
                                </span>
                            </div>
                            <div>
                                <span>
                                    Zsír
                                </span>
                                <span>
                                    {meal[3]}
                                </span>
                            </div>
                            <div>
                                <span>
                                    T.Zsírsav
                                </span>
                                <span>
                                    {meal[4]}
                                </span>
                            </div>
                            <div>
                                <span>
                                    Szénhidrát
                                </span>
                                <span>
                                    {meal[5]}
                                </span>
                            </div>
                            <div>
                                <span>
                                    Cukor
                                </span>
                                <span>
                                    {meal[6]}
                                </span>
                            </div>
                            <div>
                                <span>
                                    Só
                                </span>
                                <span>
                                    {meal[7]}
                                </span>
                            </div>
                        </div>
                        <div className="menu--day-table--meals--infos--allergen">Allergének: {meal[8]}</div>
                    </div> : <i />}
                </span>
            })}
        </label>
    )
}