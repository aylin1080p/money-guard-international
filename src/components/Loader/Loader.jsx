import { Oval } from 'react-loader-spinner';
import { useSelector } from 'react-redux';

import { selectIsRefreshing } from '../../store/auth/authSelectors.js';
import { selectIsLoading } from '../../store/global/globalSelectors.js';
import './Loader.css';

function Loader() {
  const isLoading = useSelector(selectIsLoading);
  const isRefreshing = useSelector(selectIsRefreshing);
  const isVisible = isLoading || isRefreshing;

  if (!isVisible) {
    return null;
  }

  return (
    <div className="loader" role="status" aria-live="polite" aria-label="Loading">
      <div className="loader__backdrop" />
      <div className="loader__spinner-wrap">
        <Oval
          height={56}
          width={56}
          color="#24CCA7"
          secondaryColor="rgba(255, 255, 255, 0.22)"
          strokeWidth={5}
          strokeWidthSecondary={5}
          visible
          ariaLabel="money-guard-loader"
        />
      </div>
    </div>
  );
}

export default Loader;
