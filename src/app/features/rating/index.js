import { createSlice } from "@reduxjs/toolkit";

const ratingSlice = createSlice({
  name: "rating",
  initialState: {current: 10},
  reducers: {
    changeRating: (state, { payload }) => {
      state.current = payload;
    },
  },
});

export const ratingSelector = (state) => state.rating;

export const { changeRating } = ratingSlice.actions;

export default ratingSlice.reducer;
