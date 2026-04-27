import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { fetchCurrency } from '../../redux/currency/operations';
import './Currency.css';

const FALLBACK_DATA = [
  { currencyCodeA: 840, rateBuy: 39.15, rateSell: 39.85 },
  { currencyCodeA: 978, rateBuy: 42.10, rateSell: 42.95 }
];

function Currency() {
  const dispatch = useDispatch();
  const location = useLocation();
  const items = useSelector((state) => state.currency?.items);

  useEffect(() => {
    dispatch(fetchCurrency());
  }, [dispatch]);

  const displayData = items && items.length > 0 ? items : FALLBACK_DATA;
  
  const isMobile = window.innerWidth < 768;
  const isCurrencyPage = location.pathname.includes('currency');

  // MANTIK: 
  // 1. Mobildeysek VE URL '/currency' DEĞİLSE gizle (null döndür).
  // 2. Mobildeysek VE URL '/currency' İSE göster (Butona tıklandığında bu olur).
  // 3. Tablet veya Desktop'taysak HER ZAMAN göster.
  if (isMobile && !isCurrencyPage) {
    return null;
  }

  return (
    <section className="currency-container">
      <div className="currency__wrapper">
        <table className="currency__table">
          <thead className="currency__thead">
            <tr>
              <th>Currency</th>
              <th>Purchase</th>
              <th>Sale</th>
            </tr>
          </thead>
          <tbody className="currency__tbody">
            {displayData.map((curr, index) => (
              <tr key={`${curr.currencyCodeA}-${index}`}>
                <td>{curr.currencyCodeA === 840 ? 'USD' : 'EUR'}</td>
                <td>{(curr.rateBuy || curr.rateCross)?.toFixed(2)}</td>
                <td>{(curr.rateSell || curr.rateCross)?.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="currency__wave-container">
          <svg className="currency__wave-svg" viewBox="0 0 280 93" preserveAspectRatio="none">
            <path 
              d="M0 93L0 42.4331C39.5113 22.181 83.2173 22.0163 122.956 41.9856C162.738 61.9765 206.495 61.8021 246.044 41.5204L280 24.1132V93H0Z" 
              fill="white" 
              fillOpacity="0.2"
            />
          </svg>
        </div>
      </div>
    </section>
  );
}

export default Currency;