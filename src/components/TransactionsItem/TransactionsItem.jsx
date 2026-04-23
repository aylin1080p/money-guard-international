import './TransactionsItem.css';

function TransactionsItem() {
  return (
    <article className="transactions-item">
      <span>Date</span>
      <span>Type</span>
      <span>Category</span>
      <span>Comment</span>
      <span>Amount</span>
      <button type="button">Edit</button>
      <button type="button">Delete</button>
    </article>
  );
}

export default TransactionsItem;
