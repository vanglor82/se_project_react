import React, { useContext } from "react";
import ItemCard from "../ItemCard/ItemCard";
import "./ClothesSection.css";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function ClothesSection({ onCardClick, clothingItems, onClick, onCardLike }) {
  const currentUser = useContext(CurrentUserContext);
  const userItems = clothingItems.filter(
    (item) => item.owner === currentUser?._id
  );
  return (
    <div className="clothes-section">
      <div className="clothes-section__item">
        <p className="clothes-section__text">Your Items</p>
        <button className="clothes-section__btn" onClick={onClick}>
          + Add New
        </button>
      </div>
      <ul className="clothes-section__list">
        {userItems.map((item) => {
          return (
            <ItemCard
              key={item._id}
              item={item}
              onCardClick={onCardClick}
              onCardLike={onCardLike}
            />
          );
        })}
      </ul>
    </div>
  );
}

export default ClothesSection;
