import React from "react";
import { Switch, Route } from "react-router-dom";
import Home from "../Views/Home";
import About from "../Views/About";
import Contact from "../Views/Contact";

const Main = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route exact path="/about" component={About} />
    <Route exact path="/contact" component={Contact} />
  </Switch>
);

export default Main;
