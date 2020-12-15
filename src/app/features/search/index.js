import { createSlice } from "@reduxjs/toolkit";
import { API_URL, API_KEY } from "../../../config";

const initialState = {
  qLoading: false,
  qHasErrors: false,
  qMovies: [],
  qCurrentPage: 0,
  qTotalPages: 0,
};

// A slice for movies with our reducers
const queriedSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    getQueriedStart: (state) => {
      state.qLoading = true;
    },
    getQueriedSuccess: (state, { payload }) => {
      state.qMovies = [...state.qMovies, ...payload.results];
      state.qCurrentPage = payload.page;
      state.qTotalPages = payload.total_pages;
      state.qLoading = false;
      state.qHasErrors = false;
    },
    getMoviesFailure: (state) => {
      state.qLoading = false;
      state.qHasErrors = true;
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
export const searchSelector = (state) => {
  console.log(state)
  return state.search
};

// The reducer
export default queriedSlice.reducer;

// Asynchronous thunk action
export function fetchQueried(
  endpoint = `${API_URL}search/movie?api_key=${API_KEY}`,
  searchTerm
) {
  return async (dispatch) => {
    dispatch(getQueriedStart());
    try {
      await fetch(`${endpoint}&query=${searchTerm}`)
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

export function fetchMoreQueried(
  endpoint = `${API_URL}search/movie?api_key=${API_KEY}`,
  searchTerm,
  currentPage
) {
  return async (dispatch) => {
    dispatch(getQueriedStart());
    try {
      await fetch(
        `${endpoint}&query=${searchTerm}&page=${currentPage}`
      )
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
