// components/Footer.js
import React from "react";

function Footer() {
  return (
    <footer className="footer flex-col">
      <h2 className="title-vanilla">Contact me</h2>
      <div className="socials-container flex-row">
        <a
          href="https://github.com/SultanAlzahrani"
          target="_blank"
          rel="noopener noreferrer"
        >
          <i className="devicon-github-original"></i>
        </a>
        <a
          href="https://twitter.com/CEO_allegations"
          target="_blank"
          rel="noopener noreferrer"
        >
          <i class="devicon-twitter-original"></i>
        </a>
        <a
          href="https://www.linkedin.com/in/sultan-bandar-548628283/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <i className="devicon-linkedin-plain"></i>
        </a>
      </div>

      <p className="sub-title">sultanalzahranics@gmail.com</p>
    </footer>
  );
}

export default Footer;
