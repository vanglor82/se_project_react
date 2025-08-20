import "./ItemCard.css";

function ItemCard({ item, onCardClick, onCardLike }) {
  const handleCardClick = () => {
    onCardClick(item);
  };

  const handleLikeClick = () => {
    onCardLike({ id: item._id, isLiked: item.isLiked });
  };

  return (
    <li className="card">
      <div className="card__name-row">
        <h2 className="card__name">{item.name}</h2>
        <button
          onClick={handleLikeClick}
          type="button"
          className={`card__like-btn${
            item.isLiked ? " card__like-btn_liked" : ""
          }`}
        ></button>
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
