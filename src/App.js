import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Header, NotFound } from "./View";
import { Discover, Movie } from "./app/pages";

const App = () => (
  <BrowserRouter>
    <React.Fragment>
      <Header />
      <Switch>
        <Route path="/" component={Discover} exact />
        <Route path="/:movieId" component={Movie} exact />
        <Route component={NotFound} />
      </Switch>
    </React.Fragment>
  </BrowserRouter>
);

export default App;
