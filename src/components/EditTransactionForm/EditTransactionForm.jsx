import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { editTransaction, fetchCategories, fetchBalance, fetchTransactions } from '../../store/finance/financeOperations.js';
import { closeEditTransactionModal } from '../../store/global/globalSlice.js';
import { selectCategories } from '../../store/finance/financeSelectors.js';
import './EditTransactionForm.css';

function EditTransactionForm({ transaction }) {
  const dispatch = useDispatch();
  const categories = useSelector(selectCategories);

  const isIncome = transaction.type === 'INCOME';

  const [amount, setAmount] = useState(Math.abs(transaction.amount));
  const [date, setDate] = useState(transaction.transactionDate?.split('T')[0] ?? '');
  const [categoryId, setCategoryId] = useState(transaction.categoryId ?? '');
  const [comment, setComment] = useState(transaction.comment ?? '');
  const [error, setError] = useState('');

  useEffect(() => {
    if (categories.length === 0) dispatch(fetchCategories());
  }, [dispatch, categories.length]);

  const expenseCategories = categories.filter(cat => cat.type === 'EXPENSE');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!amount || isNaN(amount) || Number(amount) <= 0) {
      setError('Please enter a valid amount.');
      return;
    }

    setError('');

    await dispatch(
      editTransaction({
        id: transaction.id,
        amount: isIncome ? Math.abs(Number(amount)) : -Math.abs(Number(amount)),
        transactionDate: date,
        categoryId,
        comment,
      })
    );


    await dispatch(fetchTransactions());
    await dispatch(fetchBalance());
    dispatch(closeEditTransactionModal());
  };

  return (
    <form className="edit-transaction-form" onSubmit={handleSubmit}>
      <h2 className="form-title">Edit transaction</h2>

      <div className="type-switch">
        <span className={`switch-label ${isIncome ? 'active-income' : ''}`}>
          Income
        </span>
        <label className="toggle">
          <input
            type="checkbox"
            checked={!isIncome}
            disabled
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
        <button type="submit" className="btn-submit">SAVE</button>
        <button
          type="button"
          className="btn-cancel"
          onClick={() => dispatch(closeEditTransactionModal())}
        >
          CANCEL
        </button>
      </div>
    </form>
  );
}

export default EditTransactionForm;