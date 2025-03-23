// Imports
import Img from "./ElementBuilder.jsx";
import "../styles/header.css";

// Returns the header of the page
export default function Header() {
  const logo = "/Logo/GGACR_Logo.png";
  return (
    <div className="header">
      <Img src={logo} className="header-logo" alt="Page Logo" />
    </div>
  );
}
