import React from "react";

import { calcTime, convertMoney } from "./helpers";
import "./MovieInfoBar.css";

const MovieInfoBar = (props) => {
  return (
    <div className="rmdb-movieinfobar">
      <div className="rmdb-movieinfobar-content">
        <div className="rmdb-movieinfobar-content-col">
          <img
            src="https://img.icons8.com/officel/40/000000/time.png"
            alt=""
            className="fa-time"
          />
          <span className="rmdb-movieinfobar-info">
            Running Time: {calcTime(props.time)}
          </span>
        </div>
        <div className="rmdb-movieinfobar-content-col">
          <img
            src="https://img.icons8.com/ultraviolet/40/000000/cheap-2.png"
            alt=""
            className="fa-budget"
          />
          <span className="rmdb-movieinfobar-info">
            Budget: {convertMoney(props.budget)}
          </span>
        </div>
        <div className="rmdb-movieinfobar-content-col">
          <img
            src="https://img.icons8.com/ultraviolet/40/000000/refund-2.png"
            alt=""
            className="fa-revenue"
          />
          <span className="rmdb-movieinfobar-info">
            Revenue: {convertMoney(props.revenue)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default MovieInfoBar;
