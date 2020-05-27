import React from "react";
import { Link } from "react-router-dom";
import "./HeroImage.css";

const HeroImage = ({ movieId, image, title, children }) => (
  <div
    className="md-heroimage"
    style={{
      background: `linear-gradient(to bottom, rgba(0,0,0,0)
      39%, rgba(0,0,0,0)
      41%, rgba(0,0,0,0.65)
      100%), url('${image}'), #1c1c1c`,
    }}
  >
    <div className="md-heroimage-content">
      <div className="md-heroimage-text">
        <p>Featured today:</p>
        <Link to={`/${movieId}`}>
          <h1>{title}</h1>
        </Link>
      </div>
      <p>Don't see your favorite movie? Type the name here:</p>
      <div>{children}</div>
    </div>
  </div>
);

export default HeroImage;
