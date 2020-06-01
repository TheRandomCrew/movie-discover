import { combineReducers } from "@reduxjs/toolkit";

import ratingReducer from "./rating";
import moviesReducer from "./getMovies";
import queryReducer from "./search";

const rootReducer = combineReducers({
  rating: ratingReducer,
  movies: moviesReducer,
  search: queryReducer,
});

export default rootReducer;