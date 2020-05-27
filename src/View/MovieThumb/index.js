import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import "./MovieThumb.css";

const MovieThumb = ({ image, movieId, movieName }) => (
  <div className="md-moviethumb">
    <Link
      to={{
        pathname: `/${movieId}`,
        movieName: `${movieName}`,
      }}
    >
      <img src={image} alt="moviethumb" />
    </Link>
  </div>
);

MovieThumb.propTypes = {
  clickable: PropTypes.bool,
  image: PropTypes.string,
  movieId: PropTypes.number,
  movieName: PropTypes.string,
};

export default MovieThumb;
