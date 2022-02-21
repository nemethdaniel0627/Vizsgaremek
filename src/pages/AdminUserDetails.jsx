import { faChevronLeft, faChevronRight, faPencilAlt, faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import modules from "../helpers/modules";
import Loader from "../layouts/Loader";
import AuthUser from "../modules/AuthUser";

export default function AdminUserDetails(props) {
    const { omAzon } = useParams();
    const [aChange, aChanging] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(0);
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState({
        id: null,
        omAzon: "",
        jelszo: "",
        nev: "",
        iskolaOM: "",
        osztaly: "",
        email: "",
        orders: []
    });
    const orderBlock = document.getElementById("order_helper");

    function AccChange() {
        aChanging(!aChange);
    }

    useEffect(() => {
        setLoading(true);
        axios.post("/userdetails",
            {
                omAzon: omAzon
            },
            AuthUser.authHeader()
        )
            .then(response => {
                console.log(response.data);
                setUser(response.data[0]);
                setLoading(false);
            })
            .catch(error => {
                console.error(error);
                setLoading(false);
            });
    }, [omAzon])

    useEffect(() => {
        const orderBlock0 = document.getElementById("order_0");
        const root = document.querySelector(":root");
        if (orderBlock && orderBlock0 && root) {
            const blockWidth = orderBlock0.offsetWidth;
            const blockHeight = orderBlock.offsetHeight;
            console.log(orderBlock.clientHeight);
            root.style.setProperty("--orderBlockWidth", `${blockWidth}px`);
            root.style.setProperty("--orderBlockHeight", `${blockHeight}px`);
        }
    })

    useEffect(() => {
        if (orderBlock) {
            const orderBlock0 = document.getElementById("order_0");
            const root = document.querySelector(":root");
            if (orderBlock0 && root) {
                const blockWidth = orderBlock0.offsetWidth;
                const blockHeight = orderBlock.offsetHeight;
                console.log(orderBlock.clientHeight);
                root.style.setProperty("--orderBlockWidth", `${blockWidth}px`);
                root.style.setProperty("--orderBlockHeight", `${blockHeight}px`);
            }
        }
    }, [orderBlock])

    function switchOrder(event) {
        let arrow = event.target.attributes[8];
        if (!arrow) arrow = event.target.parentNode.attributes[8].value;
        else arrow = arrow.value;
        let oldOrder;
        let newOrder;
        let arrowLeft;
        let arrowRight;
        switch (arrow) {
            case "orderArrowRight":
                oldOrder = document.getElementById(`order_${selectedOrder}`);
                newOrder = document.getElementById(`order_${selectedOrder + 1}`);
                arrowLeft = document.getElementById("orderArrowLeft");
                arrowRight = document.getElementById(arrow);
                if (arrowLeft.classList.contains("hidden")) arrowLeft.classList.remove("hidden");
                if (selectedOrder + 1 === user.orders.length - 1) arrowRight.classList.add("hidden");

                if (oldOrder && newOrder) {
                    oldOrder.classList.add("leftOut");
                    oldOrder.classList.remove("startPositon");
                    if (newOrder.classList.contains("rightOut")) newOrder.classList.remove("rightOut");
                    else newOrder.classList.add("startPosition");
                    setSelectedOrder(selectedOrder + 1);
                }
                break;
            case "orderArrowLeft":
                oldOrder = document.getElementById(`order_${selectedOrder}`);
                newOrder = document.getElementById(`order_${selectedOrder - 1}`);
                arrowLeft = document.getElementById(arrow);
                arrowRight = document.getElementById("orderArrowRight");
                if (arrowRight.classList.contains("hidden")) arrowRight.classList.remove("hidden");
                if (selectedOrder - 1 === 0) arrowLeft.classList.add("hidden");

                if (oldOrder && newOrder) {
                    oldOrder.classList.add("rightOut");
                    oldOrder.classList.remove("startPositon");
                    if (newOrder.classList.contains("leftOut")) newOrder.classList.remove("leftOut");
                    else newOrder.classList.add("startPosition");
                    setSelectedOrder(selectedOrder - 1);
                }
                break;

            default:
                break;
        }
    }

    useEffect(() => {
        console.log(selectedOrder);
    }, [selectedOrder])

    return (
        <div className="personal-datas admin_user-details">
            {loading ? <Loader /> : <></>}
            <div className="important">
                <div className="header">
                    <h1>{user.nev} adatai</h1>
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
                </div>

                <div className="personal-tables admin_user-details_table">
                    <div className="key">
                        Vezetéknév
                        {aChange ?
                            <input
                                className="form-input"
                                value={user.nev.split(" ")[0]}
                            />
                            : <div className="value">{user.nev.split(" ")[0]}</div>}
                    </div>
                    <div className="key">
                        Keresztnév
                        {aChange ?
                            <input
                                className="form-input"
                                value={user.nev.split(" ")[1]}
                            />
                            : <div className="value">{user.nev.split(" ")[1]}</div>}
                    </div>
                    <div className="key">
                        Osztály
                        {aChange ?
                            <input
                                className="form-input"
                                value={user.osztaly}
                            />
                            : <div className="value">{user.osztaly}</div>}
                    </div>
                    <div className="key">
                        Iskola OM azonosító
                        {aChange ?
                            <input
                                className="form-input"
                                value={user.iskolaOM}
                            />
                            : <div className="value">{user.iskolaOM}</div>}
                    </div>
                    <div className="key">
                        OM azonosító
                        {aChange ?
                            <input
                                className="form-input"
                                value={user.omAzon}
                            />
                            : <div className="value">{user.omAzon}</div>}
                    </div>
                    <div className="key">
                        E-mail cím
                        {aChange ?
                            <input
                                className="form-input"
                                value={user.email}
                            />
                            : <div className="value">{user.email}</div>}
                    </div>
                    {user.orders.length !== 0 ? <div className="key admin_user-details_table_orders">
                        <hr className="admin_user-details_table_line" />
                        <div id="order_helper" className="admin_user-details_table_orders--row">
                            <div>Nap dátuma</div>
                            <div>Reggeli?</div>
                            <div>Tízórai?</div>
                            <div>Ebéd?</div>
                            <div>Uzsonna?</div>
                            <div>Vacsora?</div>
                            <div>Ár</div>
                            <div>Lemondta?</div>
                        </div>
                        <hr className="admin_user-details_table_line" />
                        {user.orders.map((field, index) => {
                            return (
                                <div key={`order_${index}`} className="admin_user-details_table_orders--row with_data">

                                    <div>{modules.convertDateWithDash(new Date(field.datum))}</div>
                                    <div>{field.reggeli === 1 ? "Kér" : "Nem kér"}</div>
                                    <div>{field.tizorai === 1 ? "Kér" : "Nem kér"}</div>
                                    <div>{field.ebed === 1 ? "Kér" : "Nem kér"}</div>
                                    <div>{field.uzsonna === 1 ? "Kér" : "Nem kér"}</div>
                                    <div>{field.vacsora === 1 ? "Kér" : "Nem kér"}</div>
                                    <div>{field.ar} Ft</div>
                                    <div>{!field.lemondva ? "Nincs lemondva" : "Lemondva"}</div>

                                </div>
                            )
                        })}
                        <div id="orderPlaceholder" className="admin_user-details_table_orders--row data_placeholder">
                            {user.orders.map((field, index) => {
                                return (
                                    <div key={`order_pag_${index}`} id={`order_${index}`} className={`admin_user-details_table_orders--row pagination ${index === 0 ? "startPosition" : ""}`}>

                                        <div>{modules.convertDateWithDash(new Date(field.datum))}</div>
                                        <div>{field.reggeli === 1 ? "Kér" : "Nem kér"}</div>
                                        <div>{field.tizorai === 1 ? "Kér" : "Nem kér"}</div>
                                        <div>{field.ebed === 1 ? "Kér" : "Nem kér"}</div>
                                        <div>{field.uzsonna === 1 ? "Kér" : "Nem kér"}</div>
                                        <div>{field.vacsora === 1 ? "Kér" : "Nem kér"}</div>
                                        <div>{field.ar} Ft</div>
                                        <div>{!field.lemondva ? "Nincs lemondva" : "Lemondva"}</div>

                                    </div>
                                )
                            })}
                            <div className="arrow_placeholder">
                                <FontAwesomeIcon onClick={switchOrder} id="orderArrowLeft" className="admin_user-details_table_orders_arrows hidden" icon={faChevronLeft} />
                                &nbsp;
                                <FontAwesomeIcon onClick={switchOrder} id="orderArrowRight" className="admin_user-details_table_orders_arrows" icon={faChevronRight} />
                            </div>
                        </div>
                        <hr className="admin_user-details_table_line" />
                    </div> : <></>}
                    {aChange ? (
                        <div colSpan={4} className="text-center">
                            <button className="btn passChange-btn">
                                Módosítás
                            </button>
                        </div>

                    ) : (
                        <></>
                    )}
                </div>
            </div>
        </div>
    )
}