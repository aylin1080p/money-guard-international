import { useSelector } from 'react-redux';

import ButtonAddTransaction from '../components/ButtonAddTransaction/ButtonAddTransaction.jsx';
import ModalAddTransaction from '../components/ModalAddTransaction/ModalAddTransaction.jsx';
import ModalEditTransaction from '../components/ModalEditTransaction/ModalEditTransaction.jsx';
import TransactionsList from '../components/TransactionsList/TransactionsList.jsx';
import { selectTransactions } from '../store/finance/financeSelectors.js';
import DashboardWelcome from './DashboardWelcome.jsx';
import './HomeTab.css';

function HomeTab() {
  const transactions = useSelector(selectTransactions);
  const hasTransactions = transactions.length > 0;

  return (
    <section className="home-tab">
      <div className="home-tab__content">
        {hasTransactions ? <TransactionsList /> : <DashboardWelcome />}
      </div>
      <ButtonAddTransaction />
      <ModalAddTransaction />
      <ModalEditTransaction />
    </section>
  );
}

export default HomeTab;
