import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

import {
  deleteTransactionThunk,
} from '../../store/finance/financeOperations.js';
import { openEditTransactionModal } from '../../store/global/globalSlice.js';
import { formatCurrency, formatDate } from '../../utils/formatters.js';
import Icon from '../Icon/Icon.jsx';
import './TransactionsItem.css';

function TransactionsItem({ id, transactionDate, type, categoryId, comment, amount, categories }) {
  const dispatch = useDispatch();
  const isIncome = type === 'INCOME' || type === '+';
  const category = categories?.find(c => c.id === categoryId)?.name ?? 'Other';

  const handleEdit = () => {
    dispatch(openEditTransactionModal({ id, transactionDate, type, categoryId, comment, amount }));
  };

  const handleDelete = async () => {
    try {
      await dispatch(deleteTransactionThunk(id)).unwrap();
      toast.success('Transaction deleted');
    } catch (err) {
      toast.error(err || 'Could not delete transaction');
    }
  };

  return (
    <article className={`transactions-item${isIncome ? ' transactions-item--income' : ' transactions-item--expense'}`}>
      <span className="transactions-item__color-marker" aria-hidden="true" />

      <div className="transactions-item__grid">
        <span className="transactions-item__label">Date</span>
        <span className="transactions-item__value">{formatDate(transactionDate)}</span>

        <span className="transactions-item__label">Type</span>
        <span className="transactions-item__value">{isIncome ? '+' : '-'}</span>

        <span className="transactions-item__label">Category</span>
        <span className="transactions-item__value">{category}</span>

        <span className="transactions-item__label">Comment</span>
        <span className="transactions-item__value transactions-item__comment">{comment || '—'}</span>

        <span className="transactions-item__label">Sum</span>
        <span className={`transactions-item__amount${isIncome ? ' transactions-item__amount--income' : ' transactions-item__amount--expense'}`}>
          {isIncome ? '+' : '-'} {formatCurrency(Math.abs(amount))}
        </span>
      </div>

      <div className="transactions-item__actions">
        <button
          className="transactions-item__btn transactions-item__btn--edit"
          type="button"
          aria-label="Edit transaction"
          onClick={handleEdit}
        >
          <Icon name="edit" width={18} height={18} />
        </button>
        <button
          className="transactions-item__btn transactions-item__btn--delete"
          type="button"
          aria-label="Delete transaction"
          onClick={handleDelete}
        >
          <Icon name="trash" width={18} height={18} />
        </button>
      </div>
    </article>
  );
}

export default TransactionsItem;
