import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { closeEditTransactionModal } from '../../store/global/globalSlice.js';
import { selectIsEditTransactionModalOpen, selectEditingTransaction } from '../../store/global/globalSelectors.js';
import EditTransactionForm from '../EditTransactionForm/EditTransactionForm.jsx';
import './ModalEditTransaction.css';

function ModalEditTransaction() {
  const dispatch = useDispatch();
  const isOpen = useSelector(selectIsEditTransactionModalOpen);
  const transaction = useSelector(selectEditingTransaction);

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') dispatch(closeEditTransactionModal());
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [dispatch]);

  if (!isOpen || !transaction) return null;

  return (
    <div
      className="modal-backdrop"
      onClick={() => dispatch(closeEditTransactionModal())}
    >
      <div
        className="modal-edit-transaction"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="modal-close-btn"
          onClick={() => dispatch(closeEditTransactionModal())}
        >
          ✕
        </button>
        <EditTransactionForm transaction={transaction} />
      </div>
    </div>
  );
}

export default ModalEditTransaction;