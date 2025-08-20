import "./SideBar.css";
import { useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function SideBar({ onLogout, onEditProfile }) {
  const currentUser = useContext(CurrentUserContext);
  const name = currentUser?.name;
  const avatar = currentUser?.avatar;

   return (
    <div className="sidebar">
      <div className="sidebar__userinfo">
        <img className="sidebar__avatar" src={avatar} alt="Default" />
        <p>{name}</p>
      </div>
        <button
          type="button"
          className="sidebar__edit-btn"
          onClick={onEditProfile}
        >
          Change profile data
        </button>
        <button type="button" className="sidebar__logout-btn" onClick={onLogout}>
          Log out
        </button>
    </div>
  );
}

export default SideBar;
