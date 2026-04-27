import ButtonAddTransaction from "../components/ButtonAddTransaction/ButtonAddTransaction";
import ModalAddTransaction from "../components/ModalAddTransaction/ModalAddTransaction";
import ModalEditTransaction from "../components/ModalEditTransaction/ModalEditTransaction";
import TransactionsList from "../components/TransactionsList/TransactionsList";
import Balance from "../components/Balance/Balance";
import "./HomeTab.css";

function HomeTab() {
  return (
    <section className="home-tab">
      <div className="home-tab__top">
        <Balance />
      </div>

      <div className="home-tab__content">
        <TransactionsList />
      </div>

      <ButtonAddTransaction />

      <ModalAddTransaction />
      <ModalEditTransaction />
    </section>
  );
}

export default HomeTab;
