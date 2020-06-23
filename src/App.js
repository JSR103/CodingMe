import React from "react";
import "./styles.scss";
import Navigation from "./components/Nav/Navigation";
import Main from "./components/Routes/Main";
import ErrorBoundary from "./ErrorBoundary";

const App = () => (
  <ErrorBoundary>
    <div className="App">
      <Navigation />
      <Main />
    </div>
  </ErrorBoundary>
);

export default App;
