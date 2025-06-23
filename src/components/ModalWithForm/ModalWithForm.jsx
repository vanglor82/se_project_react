import "./ModalWithForm.css";

function ModalWithForm({
  children,
  buttonText,
  titleText,
  isOpen,
  closeModal,
}) {
  return (
    <div
      className={`modal ${isOpen ? "modal_opened" : ""}`}
    >
      <div className="modal__content">
        <h2 className="modal__title">{titleText}</h2>
        <button
          onClick={closeModal}
          type="button"
          className="modal__close"
        ></button>
        <form className="modal__form">
          {children}
          <button type="submit" className="modal__submit">
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
