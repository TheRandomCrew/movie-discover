import { createSlice } from "@reduxjs/toolkit";
import { API_URL, API_KEY } from "../../../config";

const initialState = {
  loading: false,
  hasErrors: false,
  movies: [],
  currentPage: 0,
  totalPages: 0,
};

// A slice for movies with our reducers
const queriedSlice = createSlice({
  name: "queried",
  initialState,
  reducers: {
    getQueriedStart: (state) => {
      state.loading = true;
    },
    getQueriedSuccess: (state, { payload }) => {
      state.movies = [...state.movies, ...payload.results];
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
  getQueriedStart,
  getQueriedSuccess,
  getQueriedFailure,
} = queriedSlice.actions;

// A selector
export const queriedSelector = (state) => state.queried;

// The reducer
export default queriedSlice.reducer;

// Asynchronous thunk action
export function fetchQueried(
  endpoint = `${API_URL}search/movie?api_key=${API_KEY}`,
  searchTerm,
  currentPage
) {
  return async (dispatch) => {
    dispatch(getQueriedStart());
    try {
      const response = await fetch(
        `${endpoint}&query=${searchTerm}&page=${currentPage + 1}`
      );
      await response.json();
      fetch(endpoint)
        .then((result) => result.json())
        .then((result) => {
          dispatch(getQueriedSuccess(result));
        })
        .catch((error) => {
          console.error(error);
          dispatch(getQueriedFailure());
        });
    } catch (error) {
      console.error(error);
      dispatch(getQueriedFailure());
    }
  };
}
