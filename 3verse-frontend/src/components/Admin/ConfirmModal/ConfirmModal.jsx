import "./ConfirmModal.css";

export default function ConfirmModal({
  isOpen,
  title = "Confirm Action",
  message = "Are you sure?",
  confirmText = "Confirm",
  cancelText = "Cancel",
  onConfirm,
  onCancel,
  danger = false,
}) {
  if (!isOpen) return null;

  return (
    <div className="confirm-overlay">
      <div className="confirm-modal">
        <h2>{title}</h2>

        <p>{message}</p>

        <div className="confirm-buttons">
          <button className="cancel-btn" onClick={onCancel}>
            {cancelText}
          </button>

          <button
            className={danger ? "danger-btn" : "confirm-btn"}
            onClick={onConfirm}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}
