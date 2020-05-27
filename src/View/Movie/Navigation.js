import React from "react";
import { Link } from "react-router-dom";
import "./Navigation.css";

const Navigation = ({ movie }) => (
  <div className="md-navigation">
    <div>
      <Link to="/">
        <p>Home</p>
      </Link>
      <p>/</p>
      <p>{movie}</p>
    </div>
  </div>
);

export default Navigation;
