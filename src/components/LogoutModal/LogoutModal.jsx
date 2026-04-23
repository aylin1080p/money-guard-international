import Logo from '../Logo/Logo.jsx';
import './LogoutModal.css';

function LogoutModal({ isOpen, onConfirm, onCancel }) {
  if (!isOpen) return null;

  return (
    <div
      className="logout-modal"
      role="dialog"
      aria-modal="true"
      aria-label="Logout confirmation"
      onClick={onCancel}
    >
      <div className="logout-modal__card" onClick={e => e.stopPropagation()}>
        <div className="logout-modal__logo-container">
          <Logo />
        </div>
        <p className="logout-modal__message">Are you sure you want to log out?</p>
        <div className="logout-modal__actions">
          <button className="logout-modal__confirm" type="button" onClick={onConfirm}>
            LOGOUT
          </button>
          <button className="logout-modal__cancel" type="button" onClick={onCancel}>
            CANCEL
          </button>
        </div>
      </div>
    </div>
  );
}

export default LogoutModal;
