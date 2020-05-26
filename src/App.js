import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

const Home = () => (<p>Home</p>)
const Movie = () => (<p>Movie</p>)
const NotFound = () => (<p>Not Found</p>)

const App = () => (
  <BrowserRouter>
    <React.Fragment>
      <Switch>
        <Route path="/" component={Home} exact />
        <Route path="/:movieId" component={Movie} exact />
        <Route component={NotFound} />
      </Switch>
    </React.Fragment>
  </BrowserRouter>
);

export default App;
