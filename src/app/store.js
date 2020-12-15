import { configureStore } from "@reduxjs/toolkit";

import rootReducer from './features'

const store = configureStore({
  reducer: rootReducer,
});

if (process.env.NODE_ENV === "development" && module.hot) {
  module.hot.accept("./features", () => {
    const newRootReducer = require("./features").default;
    store.replaceReducer(newRootReducer);
  });
}

export default store;
