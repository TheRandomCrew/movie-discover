import { createSlice } from "@reduxjs/toolkit";
import { API_URL, API_KEY } from "../../../config";

const initialState = {
  loading: false,
  hasErrors: false,
  movies: [],
  heroImage: null,
  currentPage: 0,
  totalPages: 0,
};

// A slice for movies with our reducers
const moviesSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    getMoviesStart: (state) => {
      state.loading = true;
    },
    getMoviesSuccess: (state, { payload }) => {
      state.movies = [...state.movies, ...payload.results];
      state.heroImage = state.heroImage || payload.results[0];
      state.currentPage = payload.page;
      state.totalPages = payload.total_pages;
      state.loading = false;
      state.hasErrors = false;
    },
    getMoviesFailure: (state) => {
      state.loading = false;
      state.hasErrors = true;
    },
  },
});

// Three actions generated from the slice
export const {
  getMoviesStart,
  getMoviesSuccess,
  getMoviesFailure,
} = moviesSlice.actions;

// A selector
export const moviesSelector = (state) => state.movies;

// The reducer
export default moviesSlice.reducer;

// Asynchronous thunk action
export function fetchMovies(
  endpoint = `${API_URL}movie/popular?api_key=${API_KEY}`
) {
  return async (dispatch) => {
    dispatch(getMoviesStart());
    try {
      const response = await fetch(endpoint);
      await response.json();
      fetch(endpoint)
        .then((result) => result.json())
        .then((result) => {
          dispatch(getMoviesSuccess(result));
        })
        .catch((error) => {
          console.error(error);
          dispatch(getMoviesFailure());
        });
    } catch (error) {
      console.error(error);
      dispatch(getMoviesFailure());
    }
  };
}

export function fetchMoreMovies(
  endpoint = `${API_URL}movie/popular?api_key=${API_KEY}`,
  currentPage
) {
  return async (dispatch) => {
    dispatch(getMoviesStart());
    try {
      const response = await fetch(`${endpoint}&page=${currentPage + 1}`);
      await response.json();
      fetch(endpoint)
        .then((result) => result.json())
        .then((result) => {
          dispatch(getMoviesSuccess(result));
        })
        .catch((error) => {
          console.error(error);
          dispatch(getMoviesFailure());
        });
    } catch (error) {
      console.error(error);
      dispatch(getMoviesFailure());
    }
  };
}
