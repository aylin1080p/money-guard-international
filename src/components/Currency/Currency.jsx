import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchCurrency } from '../../store/finance/financeOperations.js';
import { selectCurrency } from '../../store/finance/financeSelectors.js';
import './Currency.css';

const FALLBACK_DATA = [
  { currencyCodeA: 840, rateBuy: 39.15, rateSell: 39.85 },
  { currencyCodeA: 978, rateBuy: 42.1, rateSell: 42.95 },
];

const formatRate = value => Number(value ?? 0).toFixed(2);
const getCurrencyLabel = code => (code === 840 ? 'USD' : code === 978 ? 'EUR' : String(code));

function Currency() {
  const dispatch = useDispatch();
  const items = useSelector(selectCurrency);

  useEffect(() => {
    if (!items.length) {
      dispatch(fetchCurrency());
    }
  }, [dispatch, items.length]);

  const displayData = items.length ? items : FALLBACK_DATA;

  return (
    <section className="currency">
      <table className="currency__table">
        <thead className="currency__thead">
          <tr>
            <th>Currency</th>
            <th>Purchase</th>
            <th>Sale</th>
          </tr>
        </thead>
        <tbody>
          {displayData.map(rate => (
            <tr key={rate.currencyCodeA}>
              <td>{getCurrencyLabel(rate.currencyCodeA)}</td>
              <td>{formatRate(rate.rateBuy)}</td>
              <td>{formatRate(rate.rateSell)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="currency__wave-container" aria-hidden="true">
        <svg className="currency__wave-svg" viewBox="0 0 280 93" preserveAspectRatio="none">
          <path
            d="M0 93L0 42.4331C39.5113 22.181 83.2173 22.0163 122.956 41.9856C162.738 61.9765 206.495 61.8021 246.044 41.5204L280 24.1132V93H0Z"
            fill="white"
            fillOpacity="0.2"
          />
        </svg>
      </div>
    </section>
  );
}

export default Currency;
