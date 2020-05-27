import React from "react";
import Navigation from "./Navigation";
import MovieInfo from "./MovieInfo";
import MovieInfoBar from "./MovieInfoBar";
import Spinner from "../Spinner";

const Movie = ({ movie, directors, loading }) => (
  <div>
    {movie ? (
      <div>
        <Navigation movie={movie.original_title} />
        <MovieInfo movie={movie} directors={directors} />
        <MovieInfoBar
          time={movie.runtime}
          budget={movie.budget}
          revenue={movie.revenue}
        />
      </div>
    ) : null}
    {loading ? <Spinner /> : null}
  </div>
);

export default Movie;
