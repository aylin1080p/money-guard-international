import { useDispatch, useSelector } from 'react-redux';
import { deleteTransaction, fetchBalance, fetchTransactions } from '../../store/finance/financeOperations.js';
import { openEditTransactionModal } from '../../store/global/globalSlice.js';
import { selectCategories } from '../../store/finance/financeSelectors.js';
import './TransactionsItem.css';

function TransactionsItem({ transaction }) {
  const dispatch = useDispatch();
  const categories = useSelector(selectCategories);
  const { id, transactionDate, type, categoryId, comment, amount } = transaction;

  const isIncome = type === 'INCOME';

  const formattedDate = new Date(transactionDate).toLocaleDateString('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: '2-digit',
  });

  const formattedAmount = Math.abs(amount).toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  const categoryName = categories.find(cat => cat.id === categoryId)?.name ?? categoryId;

  return (
    <article className="transactions-item">
      <span className="item-date">{formattedDate}</span>
      <span className="item-type">{isIncome ? '+' : '-'}</span>
      <span className="item-category">{categoryName}</span>
      <span className="item-comment">{comment || '-'}</span>
      <span className={`item-amount ${isIncome ? 'income' : 'expense'}`}>
        {formattedAmount}
      </span>
      <button
        className="btn-edit"
        type="button"
        onClick={() => dispatch(openEditTransactionModal(transaction))}
      >
        ✏️
      </button>
      <button
        className="btn-delete"
        type="button"
        onClick={async () => {
          await dispatch(deleteTransaction(id));
          await dispatch(fetchTransactions());
          dispatch(fetchBalance());
        }}
      >
        Delete
      </button>
    </article>
  );
}

export default TransactionsItem;