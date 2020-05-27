import React from "react";

import "./StarRating.css";

const Star = ({ selected = false, onClick = (f) => f }) => (
  <div className={selected ? "star selected" : "star"} onClick={onClick} />
);

const StarRating = ({ totalStars, selectStar, starsSelected }) => (
  <div className="star-rating">
    <p>Rating:</p>
    {[...Array(totalStars)].map((n, i) => (
      <Star
        key={i}
        selected={i < starsSelected}
        onClick={() => selectStar(i + 1)}
      />
    ))}
  </div>
);

export default StarRating;
