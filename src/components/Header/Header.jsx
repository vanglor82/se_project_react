import { Link } from "react-router-dom";

import "./Header.css";
import headerLogo from "../../assets/WTWR_Logo.svg";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { useContext } from "react";

function Header({
  onClick,
  weatherData,
  isLoggedIn,
  onLoginClick,
  onRegisterClick,
}) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  const currentUser = useContext(CurrentUserContext);

  return (
    <header className="header">
      <Link to="/">
        <img src={headerLogo} alt="WTWR Logo" className="header__logo" />
      </Link>
      <p className="header__date-location">
        {currentDate}, {weatherData.city}
      </p>
      <ToggleSwitch />
      {isLoggedIn ? (
        <>
          <button
            type="button"
            onClick={onClick}
            className="header__add-clothes-btn"
          >
            + Add Clothes
          </button>
          <Link to="/profile" className="header__link">
            <div className="header__user-container">
              <p className="header__username">{currentUser?.name}</p>
              <img
                className="header__avatar"
                src={currentUser?.avatar}
                alt="Avatar Picture"
              />
            </div>
          </Link>
        </>
      ) : (
        <>
          <button
            type="button"
            onClick={onRegisterClick}
            className="header__register-btn"
          >
            Sign up
          </button>
          <button
            type="button"
            onClick={onLoginClick}
            className="header__login-btn"
          >
            Log in
          </button>
        </>
      )}
    </header>
  );
}

export default Header;
