import { useSelector } from 'react-redux';

import { selectTotalBalance } from '../../store/finance/financeSelectors.js';
import './Balance.css';

function Balance() {
  const totalBalance = useSelector(selectTotalBalance);

  const formattedBalance = totalBalance.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return (
    <section className="balance">
      <p className="balance__label">Your balance</p>
      <p className="balance__value">$ {formattedBalance}</p>
    </section>
  );
}

export default Balance;
