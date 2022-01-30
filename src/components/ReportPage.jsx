import React, { useState } from "react";
import ReportPageCard from "./ReportPageCard";
import ReportPageModal from "./ReportPageModal";
import foodE_icon from "../images/icon.png";


export default function ReportPage() {

  const [error, setError] = useState(false);
  const [email, setEmail] = useState(false);

  function ErrorSendRequest() {
    setError(!error);

  }

  function EmailModal() {
    setEmail(!email);
  }

  return (

    <div className="Report">
      <hr className="header--hr" />
      <div className="header">
        <div className="row text-center">
          <h1 className="">Kapcsolat felvétel</h1>
        </div>


      </div>
      <div className="report-body">
        <div className="container">
          <div className="row justify-content-center d-flex">
            <span className="--space"></span>
            <div className="col-12 col-lg-4"><ReportPageCard title="Hiba jelentés" type="error" button="true" ErrorSendRequest={ErrorSendRequest} /></div>
            <div className="col-0 col-lg-2"></div>
            <span className="--space d-flex d-lg-none"></span>
            <span className="--space d-flex d-lg-none"></span>
            <div className="col-0 col-lg-4"><ReportPageCard title="Facebook" type="facebook" button="true" /></div>

            <span className="--space"></span>
            <div className="col-12 col-lg-4"><ReportPageCard title="E-mail küldés" type="email" button="true" EmailModal={EmailModal} /></div>

            <div className="col-12 col-lg-2"></div>
            <span className="--space d-flex d-lg-none"></span>
            <div className="col-12 col-lg-4"><ReportPageCard title="+36 40 123 7555" fontSize="small" type="text" header="Telefon:" /></div>

            <span className="--space"></span>
            <div className="col-12 col-lg-4"><ReportPageCard title="foodE@business.gmail.com" fontSize="small" type="text" header="E-mail:" /></div>
            <div className="col-12 col-lg-2"></div>
            <span className="--space d-flex d-lg-none"></span>
            <div className="col-12 col-lg-4"><ReportPageCard title="5231 Fegyvernek, Fő út 8" fontSize="small" type="text" header="Cím:" /></div>

          </div>
        </div>
        <ReportPageModal show={error || email} type={error ? "error" : email ? "email" : ""} ModalClose={error ? ErrorSendRequest : email ? EmailModal : <></>} />

      </div>
    </div>
  );
}
