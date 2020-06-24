import React from "react";
import "./styles.scss";
import Navigation from "./components/Nav/Navigation";
import Main from "./components/Routes/Main";
import ErrorBoundary from "./ErrorBoundary";
import Footer from "./components/Footer/Footer";

const App = () => (
  <ErrorBoundary>
    <div className="App">
      <Navigation />
      <Main />
      <Footer />
    </div>
  </ErrorBoundary>
);

export default App;
