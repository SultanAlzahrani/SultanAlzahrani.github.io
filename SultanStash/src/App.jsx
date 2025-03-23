import React, { useEffect } from "react";

import "./styles/General.css";
import "./styles/header-and-footer.css";
import "./styles/main.css";
import Header from "./components/Header";
import Main from "./components/Main";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Hobbies from "./components/Hobbies";
import Footer from "./components/Footer";

function App() {
  return (
    <div id="" className="root">
      <Header />
      <Main />
      <Skills />
      <Projects />
      <Hobbies />
      <Footer />
    </div>
  );
}

export default App;
