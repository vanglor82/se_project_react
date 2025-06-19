import "./Header.css";
import headerLogo from "../../assets/WTWR_Logo.svg";
import avatar from "../../assets/avatar.png"; 

function Header() {
  return (
    <header className="header">
      <img src={headerLogo} alt="WTWR Logo" className="header__logo" />
      <p className="header__date-location">Date, Location</p>
      <button className="header__add-clothes-btn">+ Add Clothes</button>
      <div className="header__user-container">
        <p className="header__username">Username</p>
        <img className="header__avatar" src={avatar} alt="Avatar Picture" />
      </div>
    </header>
  );
}

export default Header;
