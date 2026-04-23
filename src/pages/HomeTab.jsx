import ButtonAddTransaction from '../components/ButtonAddTransaction/ButtonAddTransaction.jsx';
import ModalAddTransaction from '../components/ModalAddTransaction/ModalAddTransaction.jsx';
import ModalEditTransaction from '../components/ModalEditTransaction/ModalEditTransaction.jsx';
import TransactionsList from '../components/TransactionsList/TransactionsList.jsx';
import './HomeTab.css';

function HomeTab() {
  return (
    <section className="home-tab">
      <TransactionsList />
      <ButtonAddTransaction />
      <ModalAddTransaction />
      <ModalEditTransaction />
    </section>
  );
}

export default HomeTab;
