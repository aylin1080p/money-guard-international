import { useSelector } from 'react-redux';

import { selectIsRefreshing } from '../../store/auth/authSelectors.js';
import { selectIsLoading } from '../../store/global/globalSelectors.js';
import './Loader.css';

function Loader() {
  const isLoading = useSelector(selectIsLoading);
  const isRefreshing = useSelector(selectIsRefreshing);

  return <div className={`loader${isLoading || isRefreshing ? '' : ' is-hidden'}`} aria-hidden="true" />;
}

export default Loader;
