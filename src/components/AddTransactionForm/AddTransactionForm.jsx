import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTransaction, fetchCategories, fetchBalance, fetchTransactions } from '../../store/finance/financeOperations.js';
import { closeAddTransactionModal } from '../../store/global/globalSlice.js';
import { selectCategories } from '../../store/finance/financeSelectors.js';
import './AddTransactionForm.css';

function AddTransactionForm() {
  const dispatch = useDispatch();
  const categories = useSelector(selectCategories);

  const [type, setType] = useState('INCOME');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState(() => new Date().toISOString().split('T')[0]);
  const [categoryId, setCategoryId] = useState('');
  const [comment, setComment] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const isIncome = type === 'INCOME';

  const expenseCategories = categories.filter(cat => cat.type === 'EXPENSE');
  const incomeCategoryId = categories.find(cat => cat.type === 'INCOME')?.id ?? '';

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!amount || isNaN(amount) || Number(amount) <= 0) {
      setError('Please enter a valid amount.');
      return;
    }
    if (!isIncome && !categoryId) {
      setError('Please select a category.');
      return;
    }

    setError('');

    await dispatch(
      addTransaction({
        type,
        amount: isIncome ? Math.abs(Number(amount)) : -Math.abs(Number(amount)),
        transactionDate: date,
        categoryId: isIncome ? incomeCategoryId : categoryId,
        comment,
      })
    );

    await dispatch(fetchTransactions());
    await dispatch(fetchBalance());
    dispatch(closeAddTransactionModal());

  };

  return (
    <form className="add-transaction-form" onSubmit={handleSubmit}>
      <h2 className="form-title">Add transaction</h2>

      <div className="type-switch">
        <span className={`switch-label ${isIncome ? 'active-income' : ''}`}>
          Income
        </span>
        <label className="toggle">
          <input
            type="checkbox"
            checked={!isIncome}
            onChange={() => { setType(isIncome ? 'EXPENSE' : 'INCOME'); setCategoryId(''); }}
          />
          <span className="toggle-slider"></span>
        </label>
        <span className={`switch-label ${!isIncome ? 'active-expense' : ''}`}>
          Expense
        </span>
      </div>

      {!isIncome && (
        <select
          className="form-select"
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
        >
          <option value="">Select a category</option>
          {expenseCategories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
      )}

      <div className="form-row">
        <input
          className="form-input"
          type="number"
          placeholder="0.00"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          min="0"
          step="0.01"
        />
        <input
          className="form-input"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </div>

      <input
        className="form-input"
        type="text"
        placeholder="Comment"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />

      {error && <p className="form-error">{error}</p>}

      <div className="form-buttons">
        <button type="submit" className="btn-submit">ADD</button>
        <button
          type="button"
          className="btn-cancel"
          onClick={() => dispatch(closeAddTransactionModal())}
        >
          CANCEL
        </button>
      </div>
    </form>
  );
}

export default AddTransactionForm;