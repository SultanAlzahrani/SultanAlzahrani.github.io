import { useState } from "react";
import Header from "./components/header";
import Game from "./Game";

// Imports
import "./styles/general-styles.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      {" "}
      <Header />
      <Game size={14} />
    </>
  );
}

export default App;
