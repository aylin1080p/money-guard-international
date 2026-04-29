import './DashboardWelcome.css';

function DashboardWelcome() {
  return (
    <section className="dashboard-welcome">
      <p className="dashboard-welcome__eyebrow">You have no transactions yet.</p>
      <h2 className="dashboard-welcome__title">Add your first transaction</h2>
      <p className="dashboard-welcome__description">
        Press the + button to record an income or expense.
      </p>
    </section>
  );
}

export default DashboardWelcome;
