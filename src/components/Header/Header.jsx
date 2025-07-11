import { Link } from "react-router-dom";

import "./Header.css";
import headerLogo from "../../assets/WTWR_Logo.svg";
import avatar from "../../assets/avatar.png";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";

function Header({ onClick, weatherData }) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  return (
    <header className="header">
      <Link to="/">
      <img src={headerLogo} alt="WTWR Logo" className="header__logo" />
      </Link>
      <p className="header__date-location">
        {currentDate}, {weatherData.city}
      </p>
      <ToggleSwitch />
      <button
        onClick={onClick}
        type="button"
        className="header__add-clothes-btn"
      >
        + Add Clothes
      </button>
      <Link to="/profile" className="header__link">
      <div className="header__user-container">
        <p className="header__username">Username</p>
        <img className="header__avatar" src={avatar} alt="Avatar Picture" />
      </div>
      </Link>
    </header>
  );
}

export default Header;
