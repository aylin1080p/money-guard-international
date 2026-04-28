import { useDispatch } from 'react-redux';
import { openAddTransactionModal } from '../../store/global/globalSlice.js';
import './ButtonAddTransaction.css';

function ButtonAddTransaction() {
  const dispatch = useDispatch();

  return (
    <button
      className="button-add-transaction"
      type="button"
      onClick={() => dispatch(openAddTransactionModal())}
    >
      +
    </button>
  );
}

export default ButtonAddTransaction;