import React from "react";
import "./LoadMoreBtn.css";

const LoadMoreBtn = ({ text, onClick }) => (
  <div className="md-loadmorebtn" onClick={onClick}>
    <p>{text}</p>
  </div>
);

export default LoadMoreBtn;
