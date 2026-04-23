import './ProgressBar.css';

function ProgressBar({ value = 0 }) {
  return (
    <div className="progress-bar" aria-hidden="true">
      <span className="progress-bar__value" style={{ width: `${value}%` }} />
    </div>
  );
}

export default ProgressBar;
