import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTransactions, fetchCategories, fetchBalance } from '../../store/finance/financeOperations.js';
import { selectTransactions } from '../../store/finance/financeSelectors.js';
import TransactionsItem from '../TransactionsItem/TransactionsItem.jsx';
import './TransactionsList.css';

function TransactionsList() {
  const dispatch = useDispatch();
  const transactions = useSelector(selectTransactions);

  useEffect(() => {
    dispatch(fetchTransactions());
    dispatch(fetchCategories());
    dispatch(fetchBalance());
  }, [dispatch]);

  if (transactions.length === 0) {
    return (
      <section className="transactions-list">
        <p className="transactions-empty">No transactions yet.</p>
      </section>
    );
  }

  return (
    <section className="transactions-list">
      <div className="transactions-header">
        <span>Date</span>
        <span>Type</span>
        <span>Category</span>
        <span>Comment</span>
        <span>Sum</span>
        <span></span>
        <span></span>
      </div>

      {transactions.map((transaction) => (
        <TransactionsItem key={transaction.id} transaction={transaction} />
      ))}
    </section>
  );
}

export default TransactionsList;