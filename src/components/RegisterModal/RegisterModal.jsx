import "./RegisterModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useState, useEffect } from "react";

export default function RegisterModal({
  isOpen,
  onClose,
  onRegister,
  onLoginClick,
}) {
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const isFormValid =
    name.trim().length >= 2 &&
    avatar.trim() &&
    email.trim().length >= 2 &&
    password.trim().length >= 8;

  const handleNameChange = (evt) => {
    setName(evt.target.value);
  };

  const handleAvatarChange = (evt) => {
    setAvatar(evt.target.value);
  };

  const handleEmailChange = (evt) => {
    setEmail(evt.target.value);
  };

  const handlePasswordChange = (evt) => {
    setPassword(evt.target.value);
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    onRegister({ name, avatar, email, password });
  };

  useEffect(() => {
    if (isOpen) {
      setName("");
      setAvatar("");
      setEmail("");
      setPassword("");
    }
  }, [isOpen]);

  return (
    <ModalWithForm
      titleText="Sign up"
      buttonText="Sign up"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isSubmitEnabled={isFormValid}
    >
      <label htmlFor="register-name" className="modal__label">
        Name
        <input
          type="text"
          className="modal__input"
          id="register-name"
          placeholder="Name"
          minLength="2"
          maxLength="40"
          onChange={handleNameChange}
          value={name}
          autoComplete="name"
          required
        />
      </label>
      <label htmlFor="register-avatar" className="modal__label">
        Avatar URL
        <input
          type="url"
          className="modal__input"
          id="register-avatar"
          placeholder="Avatar URL"
          required
          onChange={handleAvatarChange}
          value={avatar}
          autoComplete="photo"
        />
      </label>
      <label htmlFor="register-email" className="modal__label">
        Email
        <input
          type="email"
          className="modal__input"
          id="register-email"
          placeholder="Email"
          required
          minLength="2"
          maxLength="40"
          autoComplete="email"
          onChange={handleEmailChange}
          value={email}
        />
      </label>
      <label htmlFor="register-password" className="modal__label">
        Password
        <input
          type="password"
          className="modal__input"
          id="register-password"
          placeholder="Password"
          required
          onChange={handlePasswordChange}
          autoComplete="new-password"
          value={password}
        />
      </label>
      <div className="modal__switch-row">
        <button
          type="submit"
          className={`modal__submit ${
            isFormValid ? "modal__submit-active" : ""
          }`}
          disabled={!isFormValid}
        >
          Sign up
        </button>
        <button
          type="button"
          className="modal__switch-btn"
          onClick={onLoginClick}
        >
          or Log In
        </button>
      </div>
    </ModalWithForm>
  );
}
