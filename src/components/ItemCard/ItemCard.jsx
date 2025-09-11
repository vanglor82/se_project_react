import { useContext } from "react";
import "./ItemCard.css";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function ItemCard({ item, onCardClick, onCardLike }) {
  const currentUser = useContext(CurrentUserContext);
  const isLiked = Array.isArray(item.likes)
    ? item.likes.some(
        (user) =>
          user === currentUser?._id ||
          user === currentUser?.id ||
          user._id === currentUser?._id ||
          user.id === currentUser?.id
      )
    : false;

  const handleCardClick = () => {
    onCardClick(item);
  };

  const handleLikeClick = () => {
    onCardLike({ id: item._id, isLiked });
  };

  return (
    <li className="card">
      <div className="card__name-row">
        <h2 className="card__name">{item.name}</h2>
        {currentUser && (
          <button
            onClick={handleLikeClick}
            type="button"
            className={`card__like-btn${
              isLiked ? " card__like-btn_liked" : ""
            }`}
          ></button>
        )}
      </div>
      <img
        onClick={handleCardClick}
        className="card__image"
        src={item.imageUrl}
        alt={item.name}
      />
    </li>
  );
}

export default ItemCard;
