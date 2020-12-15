import React from "react";

import { calcTime, convertMoney } from "./helpers";
import "./MovieInfoBar.css";

const infoItems = [
  {
    img: "https://img.icons8.com/officel/40/000000/time.png",
    text: "Running Time",
  },
  {
    img: "https://img.icons8.com/ultraviolet/40/000000/cheap-2.png",
    text: "Budget",
  },
  {
    img: "https://img.icons8.com/ultraviolet/40/000000/refund-2.png",
    text: "Revenue",
  },
];

const MovieInfoBar = ({ time, budget, revenue }) => (
  <div className="md-movieinfobar">
    <div>
      {infoItems.map((item, i) => (
        <div className="md-movieinfobar-content-col" key={Math.random()}>
          <img src={item.img} alt={item.text} />
          <span>
            {item.text}:{" "}
            {i === 0
              ? calcTime(time)
              : convertMoney(i === 1 ? budget : revenue)}
          </span>
        </div>
      ))}
    </div>
  </div>
);

export default MovieInfoBar;
