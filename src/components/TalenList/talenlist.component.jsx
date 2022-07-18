import React from "react";
import TalenCard from "../TalenCard/talencard.component";
import "./talenlist.style.scss";
function TalenList() {
  return (
    <div className="talenlist">
      <h1>Hire a Talented</h1>

      <div className="talenlist__list">
        <TalenCard />
        <TalenCard />
        <TalenCard />
        <TalenCard />
        <TalenCard />
        <TalenCard />
      </div>
    </div>
  );
}

export default TalenList;
