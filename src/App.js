import React from "react";
import "./styles.css";
import Navigation from "./components/Nav/Navigation";
import Main from "./components/Routes/Main";

const App = () => (
  <div className="app">
    <h1>React Router Demo</h1>
    <Navigation />
    <Main />
  </div>
);

export default App;
