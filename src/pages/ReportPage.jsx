import React, { useState } from "react";
import ReportPageCard from "../components/ReportPageCard";
import ReportPageModal from "../components/ReportPageModal";

export default function ReportPage(props) {

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
        <div className="report-container">
          <ReportPageCard title="Hiba jelentés" type="error" button="true" ErrorSendRequest={ErrorSendRequest} />
          <ReportPageCard title="Facebook" type="facebook" button="true" />
          <ReportPageCard title="+36 40 123 7555" fontSize="small" type="text" header="Telefon:" />
          <ReportPageCard title="information.foode@gmail.com" fontSize="small" type="text" header="E-mail:" />
          <ReportPageCard title="5231 Fegyvernek, Fő út 8" fontSize="small" type="text" header="Cím:" />
        </div>
        <ReportPageModal user={props} show={error || email} type={error ? "error" : email ? "email" : ""} ModalClose={error ? ErrorSendRequest : email ? EmailModal : <></>} />

      </div>
    </div>
  );
}
