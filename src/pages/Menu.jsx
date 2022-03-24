import React, { useEffect, useState } from "react";
import MenuDays from "../components/MenuDays";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import axios from "axios";
import { allgergens } from "../utils/constants";
import DaySelector from "../components/DaySelector";
import modules from "../helpers/modules";
import AuthUser from "../modules/AuthUser";
import Loader from "../layouts/Loader";

export default function Menu(props) {
    const [displayWeek, setDisplayWeek] = useState();
    const [firstDay, setFirstDay] = useState();
    const [menu, setMenu] = useState([]);
    const [selectedDay, setSelectedDay] = useState();
    const [weekLength, setWeekLength] = useState(4);
    const [selectedDates, setSelectedDates] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentMonday, setCurrentMonday] = useState();
    const [disabledDays, setDisabledDays] = useState([]);

    const dayNames = ["Hétfő", "Kedd", "Szerda", "Csütörtök", "Péntek", "Szombat"];
    const mealTypes = ["Reggeli", "Tízórai", "Ebéd", "Uzsonna", "Vacsora"];
    const root = document.querySelector(":root");

    function currentDayColorize() {
        const day = new Date().getDay();
        let currentDay;
        let currentDayInput;
        if (day === 6 || day === 0) {
            currentDay = document.getElementById("day-" + 1);
            setSelectedDay(day + 1);
            currentDayInput = document.getElementById("day-selector_" + 1);
        }
        else {
            currentDay = document.getElementById(`day-${day}`);
            setSelectedDay(day);
            currentDayInput = document.getElementById("day-selector_" + day);
        }
        if (currentDay && currentDayInput) {
            currentDay.classList.add("menu--day-selected");
            currentDay.classList.add("today");
            currentDayInput.checked = true;
        }
    }

    function setCurrentWeek(date, tmpWeekLength = weekLength) {
        const year = date.getFullYear();
        const month = date.getMonth();
        const startDay = new Date(year, month, ((date.getDate()) - (date.getDay() - 1)));
        setFirstDay(`${year}-${(startDay.getMonth() + 1) < 10 ? "0" : ""}${(startDay.getMonth() + 1)}-${startDay.getDate() < 10 ? "0" : ""}${startDay.getDate()}`);
        const endDay = new Date(year, month, ((date.getDate()) - (date.getDay() - 1)) + tmpWeekLength)
        console.log(endDay);
        let finalString = `${year}.${(startDay.getMonth() + 1) < 10 ? "0" : ""}${(startDay.getMonth() + 1)}.${startDay.getDate() < 10 ? "0" : ""}${startDay.getDate()} - ${(endDay.getMonth() + 1) < 10 ? "0" : ""}${(endDay.getMonth() + 1)}.${endDay.getDate() < 10 ? "0" : ""}${endDay.getDate()}`;

        setDisplayWeek(finalString);
        return finalString;
    }

    function convertDisplayWeek(date) {
        const year = date.getFullYear();
        const month = date.getMonth();
        const startDay = new Date(year, month, ((date.getDate()) - (date.getDay() - 1)));
        const endDay = new Date(year, month, ((date.getDate()) - (date.getDay() - 1)) + weekLength);
        setDisplayWeek(`${year}.${(startDay.getMonth() + 1) < 10 ? "0" : ""}${(startDay.getMonth() + 1)}.${startDay.getDate() < 10 ? "0" : ""}${startDay.getDate()} - ${(endDay.getMonth() + 1) < 10 ? "0" : ""}${(endDay.getMonth() + 1)}.${endDay.getDate() < 10 ? "0" : ""}${endDay.getDate()}`);
    }

    function weekChange(event) {
        console.log("change");
        let arrow = event.target.attributes[8];
        if (arrow === undefined) {
            arrow = event.target.attributes[0].ownerElement.parentNode.id;
        }
        else {
            arrow = arrow.value;
        }
        const firstArrow = document.getElementById("weekArrow-1");
        const lastArrow = document.getElementById("weekArrow-2");
        let date;
        switch (arrow) {
            case "weekArrow-1":
                date = new Date(firstDay);
                date.setDate(date.getDate() - 7);
                setLoading(true);
                axios.post("/menupagination",
                    {
                        date: modules.convertDateWithDash(date)
                    }, AuthUser.authHeader())
                    .then(response => {
                        console.log(response.data);
                        setMenu(response.data.menu)
                        setLoading(false);
                        setCurrentWeek(date, response.data.menu.length - 1);
                        if (!response.data.nextWeek) lastArrow.classList.add("hidden");
                        else lastArrow.classList.remove("hidden")
                    })
                    .catch(error => {
                        console.error(error);
                        setLoading(false);
                    })
                break;

            case "weekArrow-2":
                console.log(firstDay);
                date = new Date(firstDay);
                date.setDate(date.getDate() + 7);
                setLoading(true);
                axios.post("/menupagination",
                    {
                        date: modules.convertDateWithDash(date)
                    }, AuthUser.authHeader())
                    .then(response => {
                        console.log(response.data);
                        setMenu(response.data.menu);
                        setLoading(false);
                        setCurrentWeek(date, response.data.menu.length - 1);
                        if (firstArrow) firstArrow.classList.remove("hidden");
                        if (!response.data.nextWeek) lastArrow.classList.add("hidden");
                        else lastArrow.classList.remove("hidden")
                    })
                    .catch(error => {
                        console.error(error);
                        setLoading(false);
                    })
                break;

            default:
                break;
        }

    }

    function daySelect(event) {
        const day = event.target.attributes[3].value.split("_")[1];
        const menuDay = document.getElementById(`day-${day}`);
        const olMenuDay = document.getElementById(`day-${selectedDay}`);
        if (menuDay && olMenuDay) {
            olMenuDay.classList.remove("menu--day-selected");
            menuDay.classList.add("menu--day-selected");
            setSelectedDay(day);
        }
    }

    useEffect(() => {
        window.onload = () => {
            axios.get(`/etlap`)
                .then((response) => {
                    sessionStorage.setItem("menu", JSON.stringify(response.data.menu))
                    setMenu(response.data.menu);
                    if (root) {
                        root.style.setProperty("--numberOfDays", response.data.menu.length);
                    }
                    console.log(response.data.nextWeek);
                    const lastArrow = document.getElementById("weekArrow-2");
                    if (!response.data.nextWeek) lastArrow.classList.add("hidden");
                    setWeekLength(response.data.menu.length);
                    const startDay = modules.getFirstDayOfWeek(new Date());
                    setCurrentWeek(new Date(), response.data.menu.length - 1);
                    setCurrentMonday(`${startDay.getFullYear()}-${(startDay.getMonth() + 1) < 10 ? "0" : ""}${(startDay.getMonth() + 1)}-${startDay.getDate() < 10 ? "0" : ""}${startDay.getDate()}`);
                })
                .catch((error) => {
                    console.log(error.response);
                })
        }
        if (sessionStorage.getItem("menu") === null) {
            console.log("axios");
            axios.get(`/etlap`)
                .then((response) => {
                    sessionStorage.setItem("menu", JSON.stringify(response.data.menu))
                    setMenu(response.data.menu);
                    if (root) {
                        root.style.setProperty("--numberOfDays", response.data.menu.length);
                    }
                    const lastArrow = document.getElementById("weekArrow-2");
                    if (!response.data.nextWeek) lastArrow.classList.add("hidden");
                    setWeekLength(response.data.menu.length);
                    const startDay = modules.getFirstDayOfWeek(new Date());
                    setCurrentWeek(new Date(), response.data.menu.length - 1);
                    setCurrentMonday(`${startDay.getFullYear()}-${(startDay.getMonth() + 1) < 10 ? "0" : ""}${(startDay.getMonth() + 1)}-${startDay.getDate() < 10 ? "0" : ""}${startDay.getDate()}`);
                })
                .catch((error) => {
                    console.log(error.response);
                })
        }
        else {
            console.log("json");
            const tmpMenu = JSON.parse(sessionStorage.getItem("menu"))
            setMenu(tmpMenu);
            const startDay = modules.getFirstDayOfWeek(new Date());
            setCurrentWeek(new Date(), tmpMenu.length - 1);
            setCurrentMonday(`${startDay.getFullYear()}-${(startDay.getMonth() + 1) < 10 ? "0" : ""}${(startDay.getMonth() + 1)}-${startDay.getDate() < 10 ? "0" : ""}${startDay.getDate()}`);
            if (root) {
                root.style.setProperty("--numberOfDays", tmpMenu.length);
            }
            setWeekLength(tmpMenu.length - 1);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        convertDisplayWeek(new Date());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [weekLength])

    function checkNextWeek() {

    }

    function cancelSelect(event) {
        const input = document.getElementById(event.target.attributes[2].value);
        const day = document.getElementById(event.target.attributes[2].value.split("_")[1]);
        if (day && input) {
            if (input.checked) {
                day.style.backgroundImage = "linear-gradient(rgba(255, 0, 0, 0.349), var(--bodyBackground))";
                setSelectedDates(prevDates => {
                    return [...prevDates, input.value];
                })
            }
            else {
                if (selectedDates.includes(input.value)) {
                    let tmpSelectedDates = selectedDates;
                    const index = tmpSelectedDates.indexOf(input.value);
                    if (index > -1) {
                        tmpSelectedDates.splice(index, 1);
                    }
                    setSelectedDates(tmpSelectedDates);
                }
                day.style.backgroundImage = null;
            }
        }
    }

    useEffect(() => {
        console.log(firstDay);
        if (new Date(currentMonday) <= new Date() && new Date(firstDay) <= new Date()) {
            const firstArrow = document.getElementById("weekArrow-1");
            if (firstArrow) firstArrow.classList.add("hidden");
        }
        checkNextWeek()

    }, [firstDay])

    function getDates(tmpSelectedDates) {
        if (props.getDates) {
            props.getDates(tmpSelectedDates);
        }
    }

    useEffect(() => {
        getDates(selectedDates);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedDates])

    useEffect(() => {
        console.log("menu");
        currentDayColorize();
        // setCurrentWeek(new Date());

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [menu])

    useEffect(() => {
        console.log("disabledDays");
        console.log(props.disabledDays);
        setDisabledDays(props.disabledDays);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.disabledDays])



    return (
        <div className="menu">
            {loading ? <Loader /> : <></>}
            {
                menu.length !== 0 ?
                    <>
                        <h2 className="menu--header">
                            {props.header}
                            <span className="menu--week-header">
                                <FontAwesomeIcon className="menu--week-header--icon hidden" onClick={weekChange} id="weekArrow-1" icon={faChevronLeft} />
                                {displayWeek}
                                <FontAwesomeIcon className="menu--week-header--icon" onClick={weekChange} id="weekArrow-2" icon={faChevronRight} />
                            </span>
                        </h2>
                        <div className="menu--day-selector">
                            {dayNames.map((day, index) => {
                                if (index <= weekLength) {
                                    if (index === 2 || index === 3 || index === 5)
                                        return <DaySelector
                                            onChange={daySelect}
                                            key={`day-selector_${index + 1}`}
                                            id={`day-selector_${index + 1}`}
                                            dayName={`${day[0]}${day[1]}${day[2]}`} />
                                    else return <DaySelector
                                        onChange={daySelect}
                                        key={`day-selector_${index + 1}`}
                                        id={`day-selector_${index + 1}`}
                                        dayName={`${day[0]}${day[1]}`} />
                                }
                                else return "";
                            })}
                        </div>
                    </>
                    :
                    <div className="menu--empty">
                        <h2 className="menu--empty--header">Erre a hétre még nincs étlap</h2>
                        <span className="menu--empty--text">Étlapjaink folyamatosan frissítjük<span id="menu--empty--dots"></span></span>
                        <svg id="flame-menu" width="194" height="256" viewBox="0 0 194 256" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path id="flameTop-menu" d="M175.594 89.113C201.308 122.613 199.808 197.113 165.094 231.113C130.38 265.113 58.3079 266.113 28.0941 222.613C-2.11965 179.113 -14.5452 132.546 24.5941 80.613C28.4492 101.432 31.6945 109.023 39.5941 114.613C24.5799 43.1209 129.046 -10.5843 125.5 1.77612C113.323 17.5521 120.269 52.416 128.5 68.5C132 75.3395 167.5 131.776 160.594 152.113C160.594 152.113 173.808 104.613 175.594 89.113Z" fill="url(#paint0_radial_140_53-menu)" />
                            <path d="M111.481 160.744L109.826 165.781L108.309 171.856L107.068 177.781L106.24 182.522L105.275 188.596L104.585 196.004L104.447 200.3V208.152L104.723 211.263L105.137 215.559L105.826 220.004L106.792 223.707L108.171 227.263L110.792 232.893L116.033 241.633L116.309 242.522L116.447 243.46V245.041L116.5 254.522L120.638 253.743C122 253.522 123.5 253.097 124.171 252.953V140.744L123.895 140.448L123.481 140.3H122.792L122.24 140.596L121.688 141.041L120.861 141.781L120.171 142.522L118.654 144.893L117.413 146.967L116.171 149.337L113.55 154.967L111.481 160.744Z" fill="white" />
                            <path d="M73.4089 229.708L72.9513 238.99L71.4993 253.113C76.82 254.362 78.4993 254.613 81.9993 255.113L83.2465 227.609L83.8185 225.563L84.9624 223.006C85.0768 222.75 86.5639 220.832 86.6783 220.576C86.7698 220.372 87.174 219.554 87.3646 219.17L88.3941 218.275L90.11 216.357L91.0251 215.206L92.0547 213.032L92.5122 211.881L92.9698 210.347L93.4273 208.301L93.7705 203.058L93.9993 200.501V185.156V148.457V145.389V136.949L93.7705 135.798L93.5417 134.775L93.1986 133.88L92.0547 133.369H91.3683L90.682 133.88L90.3388 134.392L89.8812 135.543L89.538 137.716L89.3093 140.529L88.9661 162.523V188.865L88.7373 190.399L88.3941 191.294L87.7078 191.806H86.907H86.4495L86.1063 190.91L85.6487 189.76V189.376C85.5725 188.31 85.42 186.154 85.42 186.051V185.156V143.471V140.146C85.3437 138.739 85.1912 135.901 85.1912 135.798C85.1912 135.696 85.1149 135.159 85.0768 134.903L84.6192 134.136L84.1617 133.369L83.4753 133.113H82.4458L81.5307 133.369L80.9587 134.136L80.8443 142.32L80.5011 157.536L80.2724 179.402V191.802L79.5501 192.573H77.9739L77.0544 192.189L76.8406 191.07V189.606V187.118V151.654V149.608V147.69C76.8406 147.179 76.6118 146.412 76.6118 145.772V143.982V142.32C76.6118 142.115 76.4593 141.041 76.3831 140.529C76.4212 140.061 76.4746 139.021 76.3831 138.611C76.2916 138.202 76.1924 137.162 76.1543 136.693C76.078 136.352 75.9026 135.594 75.8111 135.287C75.6967 134.903 75.5823 134.264 75.4679 134.008C75.3764 133.804 74.896 133.497 74.6672 133.369L74.2096 133.113L73.1801 133.369L72.4938 133.88L72.0362 134.775L71.9218 136.054L71.693 137.716L71.4642 139.507L71.2355 143.087V188.097V188.609V190.91L71.0067 191.55L70.4347 192.189L69.9772 192.573H69.4052H69.062H68.9476L68.7189 192.189L68.1469 191.55C68.0706 191.422 67.9181 191.115 67.9181 190.91C67.9181 190.706 67.7656 190.484 67.6893 190.399C67.6131 190.101 67.4148 189.478 67.2318 189.376C67.0487 189.274 67.1555 188.822 67.2318 188.609V175.694V171.091V154.212L67.1174 150.248C67.1555 145.985 67.2089 137.358 67.1174 136.949C67.0259 136.54 67.003 136.182 67.003 136.054L66.7742 134.903L66.5454 133.88L66.2023 133.369L65.6303 133.113H64.2576L63.9144 133.88L63.5713 135.287L63.2281 136.821L62.9993 138.611L63.2281 208.301L63.6561 210.535L64.0501 211.881L64.4442 213.032L65.7578 215.206L67.2027 216.357L69.173 218.275L69.9612 219.17L71.1434 220.576L72.4569 223.006L73.4089 225.563V227.609V229.708Z" fill="white" />
                            <defs>
                                <radialGradient id="paint0_radial_140_53-menu" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(106.988 178.613) rotate(-81.1441) scale(178.629 145.469)">
                                    <stop id="flameYellow-menu" stopColor="#F9D05B" />
                                    <stop id="flameRed-menu" offset="1" stopColor="#F32215" />
                                </radialGradient>
                            </defs>
                        </svg>
                    </div>
            }



            <div className="menu--wrapper">
                {
                    menu.length !== 0 ?
                        <>
                            <div id="day-0" className="menu--day-table menu--container menu--day-table--legend">
                                <MenuDays
                                    dayName={true}
                                    notDay={true}
                                    meals={mealTypes} />
                            </div>
                            {menu.map((meal, index) => {
                                let tmpFirstDay = new Date(firstDay);
                                tmpFirstDay.setDate(tmpFirstDay.getDate() + index);
                                return (
                                    <label
                                        onChange={cancelSelect}
                                        key={`day-${index + 1}`}
                                        id={`day-${index + 1}`}
                                        className={
                                            "menu--day-table menu--container " +
                                            (disabledDays.includes(modules.convertDateWithDash(tmpFirstDay)) ? "disabled-day " : "") +
                                            (props.cancel ? "clickable" : "")}>

                                        {props.cancel
                                            ? <input
                                                disabled={disabledDays.includes(modules.convertDateWithDash(tmpFirstDay))}
                                                key={`menucheck_day-${index + 1}`}
                                                className="menu--day-table--input"
                                                type="checkbox"
                                                id={`menucheck_day-${index + 1}`}
                                                value={modules.convertDateWithDash(tmpFirstDay)} />
                                            : ""
                                        }
                                        <MenuDays
                                            key={`aday-${index + 1}`}
                                            id={`aday-${index + 1}`}
                                            dayName={dayNames[index]}
                                            meals={meal}
                                            clickable={props.cancel}
                                            inputId={`menucheck_day-${index + 1}`}
                                            onChange={cancelSelect} />
                                    </label>)
                            })}
                        </>
                        : <></>
                }

            </div>

            <div className="menu--allergen d-none">
                {
                    allgergens.map((allergen, index) => {
                        return <span key={`allergen_${index}`}>{allergen} </span>
                    })
                }
            </div>
        </div>
    )
}