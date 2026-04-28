import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { closeAddTransactionModal } from '../../store/global/globalSlice.js';
import { selectIsAddTransactionModalOpen } from '../../store/global/globalSelectors.js';
import AddTransactionForm from '../AddTransactionForm/AddTransactionForm.jsx';
import './ModalAddTransaction.css';

function ModalAddTransaction() {
  const dispatch = useDispatch();
  const isOpen = useSelector(selectIsAddTransactionModalOpen);

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') dispatch(closeAddTransactionModal());
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [dispatch]);

  if (!isOpen) return null;

  return (
    <div
      className="modal-backdrop"
      onClick={() => dispatch(closeAddTransactionModal())}
    >
      <div
        className="modal-add-transaction"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="modal-close-btn"
          onClick={() => dispatch(closeAddTransactionModal())}
        >
          ✕
        </button>
        <AddTransactionForm />
      </div>
    </div>
  );
}

export default ModalAddTransaction;