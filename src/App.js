import React, { Component } from "react";
import Helmet from "react-helmet";

import "./App.css";
import Main from "./pages/main";
import Header from "./pages/header";
import Footer from "./pages/footer";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Helmet>
          <title>Welcome to React Js NVG</title>
          <meta name="description" content="Helmet application" />
        </Helmet>
        <Header />
        <Main />
        <Footer />
      </div>
    );
  }
}

export default App;
