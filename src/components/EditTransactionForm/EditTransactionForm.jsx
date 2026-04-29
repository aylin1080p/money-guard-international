import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { toast } from 'react-toastify';
import * as yup from 'yup';

import { editTransactionThunk } from '../../store/finance/financeOperations.js';
import { selectCategories } from '../../store/finance/financeSelectors.js';
import { closeEditTransactionModal } from '../../store/global/globalSlice.js';
import { toApiDate } from '../../utils/formatters.js';
import Icon from '../Icon/Icon.jsx';
import './EditTransactionForm.css';

const schema = yup.object({
  amount: yup
    .number()
    .typeError('Amount must be a number')
    .positive('Amount must be positive')
    .required('Amount is required'),
  transactionDate: yup.date().typeError('Invalid date').required('Date is required'),
  comment: yup.string().max(500).default(''),
});

function EditTransactionForm({ transaction }) {
  const dispatch = useDispatch();
  const categories = useSelector(selectCategories);

  const isIncome = transaction.type === 'INCOME' || transaction.type === '+';
  const categoryName =
    categories.find(c => c.id === transaction.categoryId)?.name ?? transaction.categoryId ?? '—';

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      amount: Math.abs(transaction.amount ?? 0),
      transactionDate: transaction.transactionDate
        ? new Date(transaction.transactionDate)
        : new Date(),
      comment: transaction.comment ?? '',
    },
    resolver: yupResolver(schema),
  });

  const onSubmit = async values => {
    try {
      const payload = {
        transactionDate: toApiDate(values.transactionDate),
        categoryId: transaction.categoryId,
        comment: values.comment || '',
        amount: isIncome ? Number(values.amount) : -Number(values.amount),
      };
      await dispatch(editTransactionThunk({ id: transaction.id, data: payload })).unwrap();
      toast.success('Transaction updated!');
      dispatch(closeEditTransactionModal());
    } catch (err) {
      toast.error(err || 'Could not update transaction');
    }
  };

  return (
    <form className="edit-transaction-form" onSubmit={handleSubmit(onSubmit)} noValidate>
      <h2 className="edit-transaction-form__title">Edit transaction</h2>

      <div className="edit-transaction-form__type-badge">
        <span className={`edit-transaction-form__type-label${isIncome ? ' edit-transaction-form__type-label--income' : ' edit-transaction-form__type-label--expense'}`}>
          {isIncome ? 'Income' : 'Expense'}
        </span>
        <span className="edit-transaction-form__category-label">{categoryName}</span>
      </div>

      <div className="edit-transaction-form__row">
        <div className="edit-transaction-form__field">
          <input
            className={`edit-transaction-form__input${errors.amount ? ' edit-transaction-form__input--error' : ''}`}
            type="number"
            step="0.01"
            placeholder="0.00"
            {...register('amount')}
          />
          {errors.amount && (
            <p className="edit-transaction-form__error" aria-live="polite">{errors.amount.message}</p>
          )}
        </div>

        <div className="edit-transaction-form__field">
          <Controller
            control={control}
            name="transactionDate"
            render={({ field }) => (
              <DatePicker
                selected={field.value}
                onChange={field.onChange}
                dateFormat="dd.MM.yyyy"
                maxDate={new Date()}
                className={`edit-transaction-form__input edit-transaction-form__datepicker${errors.transactionDate ? ' edit-transaction-form__input--error' : ''}`}
                wrapperClassName="edit-transaction-form__datepicker-wrapper"
                calendarClassName="edit-transaction-form__calendar"
                placeholderText="DD.MM.YYYY"
              />
            )}
          />
          <Icon name="calendar" className="edit-transaction-form__calendar-icon" width={18} height={18} />
          {errors.transactionDate && (
            <p className="edit-transaction-form__error" aria-live="polite">{errors.transactionDate.message}</p>
          )}
        </div>
      </div>

      <div className="edit-transaction-form__field">
        <Icon name="comment" className="edit-transaction-form__field-icon" width={18} height={18} />
        <input
          className="edit-transaction-form__input edit-transaction-form__input--comment"
          type="text"
          placeholder="Comment"
          {...register('comment')}
        />
      </div>

      <div className="edit-transaction-form__actions">
        <button
          className="edit-transaction-form__submit"
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Saving...' : 'SAVE'}
        </button>
        <button
          className="edit-transaction-form__cancel"
          type="button"
          onClick={() => dispatch(closeEditTransactionModal())}
        >
          CANCEL
        </button>
      </div>
    </form>
  );
}

export default EditTransactionForm;
