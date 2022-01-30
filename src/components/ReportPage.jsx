import React, { useState } from "react";
import ReportPageCard from "./ReportPageCard";
import ReportPageModal from "./ReportPageModal";
import foodE_icon from "../images/icon.png";


export default function ReportPage() {

  const [error, setError] = useState(false);

  function ErrorSendRequest(){
    setError(!error);

  }

  return (

    <div className="Report">
      <hr className="header--hr" />
      <div className="header">
        <div className="row mx-auto justify-content-center d-flex">
          <div className="col-12 col-lg-5"><h1 className="">Kapcsolat felvétel</h1></div>
          <div className="col-0 col-lg-1 d-none d-lg-block"><img src={foodE_icon} alt="icon" className="icon"/></div>
        </div>
        
        
      </div>
      <div className="report-body">
        <div className="container">
          <div className="row justify-content-center d-flex">
            <span className="--space"></span>
            <div className="col-12 col-lg-4"><ReportPageCard title="Hiba jelentés" type="error" button="true" ErrorSendRequest={ErrorSendRequest}/></div>
            <div className="col-0 col-lg-2"></div>
            <span className="--space d-flex d-lg-none"></span>
            <span className="--space d-flex d-lg-none"></span>
            <div className="col-0 col-lg-4"><ReportPageCard title="Facebook" type="facebook" button="true" ErrorSendRequest={ErrorSendRequest}/></div>

            <span className="--space"></span>
            <div className="col-12 col-lg-4"><ReportPageCard title="foodE@business.gmail.com" fontSize="small" type="text" header="E-mail:"/></div>
            <div className="col-12 col-lg-2"></div>
            <span className="--space d-flex d-lg-none"></span>
            <div className="col-12 col-lg-4"><ReportPageCard title="+36 40 123 7555" fontSize="small" type="text" header="Telefon:"/></div>

            <span className="--space"></span>
            <div className="col-12 col-lg-4"><ReportPageCard title="5231 Fegyvernek, Fő út 8" fontSize="small" type="text" header="Cím:"/></div>
            <div className="col-12 col-lg-2"></div>
            <span className="--space d-flex d-lg-none"></span>
            <div className="col-12 col-lg-4"><ReportPageCard title="?????" fontSize="small" type="text" header="?????:"/></div>

          </div>
        </div>
        <ReportPageModal show={error} ModalClose = {ErrorSendRequest}/>
        
      </div>
    </div>
  );
}
