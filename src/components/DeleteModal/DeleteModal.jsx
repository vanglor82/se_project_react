import "./DeleteModal.css";

function DeleteModal({ activeModal, onClose, onDelete, selectedCard }) {
  const handleDelete = () => {
    onDelete(selectedCard._id);
  };
  return (
    <div className={`modal ${activeModal && "modal_opened"}`}>
      <div className="modal__content modal__content_delete">
        <button
          onClick={onClose}
          type="button"
          className="modal__close"
        ></button>
        <p className="delete__text">
          Are you sure you want to delete this item?
          <br />
          This action is irreversible.
        </p>
        <div className="delete__button">
          <button
            className="delete__confirm"
            onClick={handleDelete}
            type="button"
          >
            Yes, delete item
          </button>
          <button className="delete__cancel" type="button" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteModal;
