// components/Header.js
import React from "react";
// import jackFrost from "../assets/jack-frost.webp";

function Header() {
  return (
    <header className="header-container">
      <div className="header-logo-title">
        <img src="../assets/jack-frost.webp" alt="Website Logo" />
        <span>Sultan's Stash </span>
      </div>

      <div className="header-buttons-container">
        <button className="header-button">Home</button>
        <button className="header-button">Skills</button>
        <button className="header-button">Projects</button>
        <button className="header-button">Hobbies</button>
      </div>
    </header>
  );
}

export default Header;
