import { useDispatch } from 'react-redux';

import { openAddTransactionModal } from '../../store/global/globalSlice.js';
import Icon from '../Icon/Icon.jsx';
import './ButtonAddTransaction.css';

function ButtonAddTransaction() {
  const dispatch = useDispatch();

  return (
    <button
      className="button-add-transaction"
      type="button"
      aria-label="Add transaction"
      onClick={() => dispatch(openAddTransactionModal())}
    >
      <Icon name="plus" width={24} height={24} />
    </button>
  );
}

export default ButtonAddTransaction;
