import React from "react";
import "./styles.css";
import Navigation from "./components/Nav/Navigation";
import Main from "./components/Routes/Main";

const App = () => (
  <div className="app">
    <Navigation />
    <Main />
  </div>
);

export default App;
