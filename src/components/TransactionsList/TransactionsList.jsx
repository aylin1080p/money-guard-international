import { useSelector } from 'react-redux';

import { selectCategories, selectTransactions } from '../../store/finance/financeSelectors.js';
import TransactionsItem from '../TransactionsItem/TransactionsItem.jsx';
import './TransactionsList.css';

function TransactionsList() {
  const transactions = useSelector(selectTransactions);
  const categories = useSelector(selectCategories);

  return (
    <section className="transactions-list">
      <div className="transactions-list__header">
        <span />
        <span>Date</span>
        <span>Type</span>
        <span>Category</span>
        <span className="transactions-list__col-comment">Comment</span>
        <span>Sum</span>
        <span />
      </div>
      <div className="transactions-list__body">
        {transactions.length === 0 ? (
          <p className="transactions-list__empty">No transactions yet. Add your first transaction!</p>
        ) : (
          transactions.map(t => (
            <TransactionsItem key={t.id} {...t} categories={categories} />
          ))
        )}
      </div>
    </section>
  );
}

export default TransactionsList;
