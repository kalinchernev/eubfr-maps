import React from "react";
import "@ecl/ec-preset-website/dist/styles/ecl-ec-preset-website.css";
import Header from "./components/Header";
import Footer from "./components/Footer";

import Map from "./components/Map";

import "./App.css";

const App = () => (
  <div>
    <Header />
    <div className="ecl-container">
      <h1>EUBFR Maps</h1>
      <Map />
    </div>
    <Footer />
  </div>
);

export default App;
