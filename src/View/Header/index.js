import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";

const Header = () => {
  return (
    <div className="rmdb-header">
      <div className="rmdb-header-content">
        <Link to="/" className="rmdb-logo">
          <img
            src="https://img.icons8.com/ultraviolet/40/000000/starred-ticket.png"
            alt="Movie"
          />
          <span>Discover!</span>
        </Link>
      </div>
    </div>
  );
};

export default Header;
