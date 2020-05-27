import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";

const Header = () => (
  <div className="md-header">
    <div className="md-header-content">
      <Link to="/" className="md-logo">
        <img
          src="https://img.icons8.com/ultraviolet/40/000000/starred-ticket.png"
          alt="Movie"
        />
        <span>Discover!</span>
      </Link>
    </div>
  </div>
);

export default Header;
