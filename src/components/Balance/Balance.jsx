import "./Balance.css";
import { useSelector } from "react-redux";
import { IoHomeSharp, IoStatsChart } from "react-icons/io5";

function Balance() {
  const transactions = useSelector((state) => state.transactions?.items || []);

  const totalBalance = transactions.reduce((total, transaction) => {
    if (transaction.type === "INCOME") {
      return total + Number(transaction.amount);
    }

    if (transaction.type === "EXPENSE") {
      return total - Number(transaction.amount);
    }

    return total;
  }, 0);

  const formattedBalance = totalBalance.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return (
    <section className="balance">
      <div className="balance__sidebar">
        <div className="balance__menu-item balance__menu-item--active">
          <>
            <IoHomeSharp className="balance__icon" />
            🏠
          </>
          <span>Home</span>
        </div>

        <div className="balance__menu-item">
          <>
            <IoStatsChart className="balance__icon" />
            📊
          </>
          <span>Statistics</span>
        </div>
      </div>

      <div className="balance__content">
        <p className="balance__label">Your balance</p>

        <p className="balance__value">
          <span className="balance__currency">₴</span>{" "}
          <span className="balance__amount">{formattedBalance}</span>
        </p>

        <div className="home-tab__currency">
          <div className="currency">
            <div className="currency__header">
              <span>Currency</span>
              <span>Purchase</span>
              <span>Sale</span>
            </div>

            <div className="currency__body">
              <div className="currency__row">
                <span>USD</span>
                <span>27.55</span>
                <span>27.65</span>
              </div>

              <div className="currency__row">
                <span>EUR</span>
                <span>30.00</span>
                <span>30.10</span>
              </div>
            </div>

            <div className="currency__graph">
              <svg
                className="currency__wave"
                viewBox="0 0 480 100"
                preserveAspectRatio="none"
              >
                <path
                  d="M0,60 C40,30 80,30 120,60 C160,90 200,90 240,60 C280,30 320,10 360,30 C400,50 440,70 480,50"
                  fill="none"
                  stroke="#FF868D"
                  strokeWidth="2"
                />

                <path
                  d="M0,75 C40,45 80,45 120,75 C160,105 200,105 240,75 C280,45 320,25 360,45 C400,65 440,85 480,65 L480,100 L0,100 Z"
                  fill="rgba(255,255,255,0.15)"
                />

                <circle cx="40" cy="47" r="4" fill="#FF868D" />
                <circle cx="360" cy="30" r="4" fill="#FF868D" />

                <text
                  x="20"
                  y="35"
                  fill="#FF868D"
                  fontSize="12"
                  fontFamily="Poppins"
                >
                  27.55
                </text>

                <text
                  x="340"
                  y="18"
                  fill="#FF868D"
                  fontSize="12"
                  fontFamily="Poppins"
                >
                  30.00
                </text>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Balance;
