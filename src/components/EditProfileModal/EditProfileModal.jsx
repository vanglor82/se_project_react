import { useState, useEffect, useContext } from "react";
import "./EditProfileModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function EditProfileModal({ onClose, isOpen, onEditProfile }) {
  const currentUser = useContext(CurrentUserContext);

  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");

  const isFormValid = name.trim().length >= 2 && avatar.trim();

  const handleNameChange = (evt) => {
    setName(evt.target.value);
  };

  const handleAvatarChange = (evt) => {
    setAvatar(evt.target.value);
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (isFormValid) {
      onEditProfile({ name, avatar });
    }
  };

  useEffect(() => {
    if (isOpen && currentUser) {
      setName(currentUser.name || "");
      setAvatar(currentUser.avatar || "");
    }
  }, [isOpen, currentUser]);

  return (
    <ModalWithForm
      isOpen={isOpen}
      titleText="Edit Profile"
      buttonText="Save changes"
      onClose={onClose}
      onSubmit={handleSubmit}
      isSubmitEnabled={isFormValid}
    >
      <label htmlFor="edit-name" className="modal__label">
        Name
        <input
          type="text"
          className="modal__input"
          id="edit-name"
          placeholder="Name"
          minLength="2"
          maxLength="40"
          onChange={handleNameChange}
          value={name}
          required
        />
      </label>
      <label htmlFor="edit-avatar" className="modal__label">
        Avatar URL
        <input
          type="url"
          className="modal__input"
          id="edit-avatar"
          placeholder="Avatar URL"
          onChange={handleAvatarChange}
          value={avatar}
          required
        />
      </label>
    </ModalWithForm>
  );
}

export default EditProfileModal;
