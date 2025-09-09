import React, { useContext } from "react";
import "./ItemModal.css";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function ItemModal({ activeModal, onClose, card, onDelete }) {
  const currentUser = useContext(CurrentUserContext);
  const isOwner =
    card.owner === currentUser?._id || card.owner === currentUser?.id;
  return (
    <div className={`modal ${activeModal === "preview" && "modal_opened"}`}>
      <div className="modal__content modal__content_preview">
        <button
          onClick={onClose}
          type="button"
          className="modal__close modal__close_preview"
        ></button>
        <img src={card.imageUrl} alt={card.name} className="modal__image" />
        <div className="modal__footer">
          <div className="modal__footer-del">
            <h2 className="modal__caption">{card.name}</h2>
            {isOwner && (
              <button
                onClick={onDelete}
                type="button"
                className="modal__delete modal__delete-footer"
              >
                Delete item
              </button>
            )}
          </div>
          <p className="modal__weather">Weather: {card.weather}</p>
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
