import React from "react";
import ReactDOM from "react-dom";
import "./app/index.css";
import store from "./app/store";
import { Provider } from "react-redux";
import * as serviceWorker from "./app/serviceWorker";

const render = () => {
  const App = require("./app/App").default;
  ReactDOM.render(
    <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </React.StrictMode>,
    document.getElementById("root")
  );
};

render();

if (process.env.NODE_ENV === "development" && module.hot) {
  module.hot.accept("./app/App", render);
}

serviceWorker.register();
