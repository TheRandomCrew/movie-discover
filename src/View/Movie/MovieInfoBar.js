import React from "react";

import { calcTime, convertMoney } from "./helpers";
import "./MovieInfoBar.css";

const MovieInfoBar = ({ time, budget, revenue }) => (
  <div className="rmdb-movieinfobar">
    <div className="rmdb-movieinfobar-content">
      <div className="rmdb-movieinfobar-content-col">
        <img
          src="https://img.icons8.com/officel/40/000000/time.png"
          alt="Running Time"
          className="icon-time"
        />
        <span className="rmdb-movieinfobar-info">
          Running Time: {calcTime(time)}
        </span>
      </div>
      <div className="rmdb-movieinfobar-content-col">
        <img
          src="https://img.icons8.com/ultraviolet/40/000000/cheap-2.png"
          alt="Budget"
          className="icon-budget"
        />
        <span className="rmdb-movieinfobar-info">
          Budget: {convertMoney(budget)}
        </span>
      </div>
      <div className="rmdb-movieinfobar-content-col">
        <img
          src="https://img.icons8.com/ultraviolet/40/000000/refund-2.png"
          alt="Revenue"
          className="icon-revenue"
        />
        <span className="rmdb-movieinfobar-info">
          Revenue: {convertMoney(revenue)}
        </span>
      </div>
    </div>
  </div>
);

export default MovieInfoBar;
