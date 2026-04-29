import { useSelector } from 'react-redux';

import {
  selectExpenseSummary,
  selectIncomeSummary,
  selectStatistics,
} from '../../store/statistics/statisticsSelectors.js';
import { formatCurrency } from '../../utils/formatters.js';
import './StatisticsTable.css';

const PALETTE = [
  '#FED057',
  '#FFD8D0',
  '#FD9498',
  '#C5BAFF',
  '#6E78E8',
  '#4A56E2',
  '#81E1FF',
  '#24CCA7',
  '#00AD84',
  '#FFC727',
];

function StatisticsTable() {
  const categories = useSelector(selectStatistics);
  const incomeSummary = useSelector(selectIncomeSummary);
  const expenseSummary = useSelector(selectExpenseSummary);

  const expenses = categories.filter(c => c.type !== 'INCOME');

  if (expenses.length === 0) {
    return (
      <section className="statistics-table">
        <p className="statistics-table__empty">No data for this period.</p>
      </section>
    );
  }

  return (
    <section className="statistics-table">
      <div className="statistics-table__header">
        <span>Category</span>
        <span>Sum</span>
      </div>

      <ul className="statistics-table__list">
        {expenses.map((cat, i) => (
          <li key={cat.name} className="statistics-table__row">
            <span
              className="statistics-table__color"
              style={{ background: cat.color ?? PALETTE[i % PALETTE.length] }}
              aria-hidden="true"
            />
            <span className="statistics-table__name">{cat.name}</span>
            <span className="statistics-table__total">{formatCurrency(Math.abs(cat.total))}</span>
          </li>
        ))}
      </ul>

      <div className="statistics-table__totals">
        <div className="statistics-table__total-row statistics-table__total-row--expense">
          <span>Expenses:</span>
          <span>{formatCurrency(Math.abs(expenseSummary))}</span>
        </div>
        <div className="statistics-table__total-row statistics-table__total-row--income">
          <span>Income:</span>
          <span>{formatCurrency(incomeSummary)}</span>
        </div>
      </div>
    </section>
  );
}

export default StatisticsTable;
