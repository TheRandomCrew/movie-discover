import React from "react";
import { IMAGE_BASE_URL, POSTER_SIZE, BACKDROP_SIZE } from "../../config";
import MovieThumb from "../MovieThumb";
import "./MovieInfo.css";

const MovieInfo = ({ movie, directors }) => (
  <div
    className="md-movieinfo"
    style={{
      background: movie.backdrop_path
        ? `url('${IMAGE_BASE_URL}${BACKDROP_SIZE}${movie.backdrop_path}')`
        : "#000",
    }}
  >
    <div className="md-movieinfo-content">
      <div className="md-movieinfo-thumb">
        <MovieThumb
          image={
            movie.poster_path
              ? `${IMAGE_BASE_URL}${POSTER_SIZE}${movie.poster_path}`
              : "https://img.icons8.com/clouds/500/000000/no-image.png"
          }
          clickable={false}
        />
      </div>
      <div className="md-movieinfo-text">
        <h1>{movie.title}</h1>
        <h3>PLOT</h3>
        <p>{movie.overview}</p>
        <h3>IMDB RATING</h3>
        <div className="md-rating">
          <meter
            min="0"
            max="100"
            optimum="100"
            low="40"
            high="70"
            value={movie.vote_average * 10}
          />
          <p className="md-score">{movie.vote_average}</p>
        </div>
        {directors.length > 1 ? <h3>DIRECTORS</h3> : <h3>DIRECTOR</h3>}{" "}
        {directors.map((element, i) => {
          return (
            <p key={i} className="md-director">
              {element.name}
            </p>
          );
        })}
        {movie.homepage && (
          <a href={movie.homepage} className="homepage-link">
            More
            <img
              src="https://img.icons8.com/cute-clipart/64/000000/open-in-browser.png"
              alt="More info"
            />
          </a>
        )}
      </div>
    </div>
  </div>
);

export default MovieInfo;
