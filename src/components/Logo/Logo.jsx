import Icon from '../Icon/Icon.jsx';
import './Logo.css';

function Logo() {
  return (
    <a className="logo" href="/">
      <Icon className="logo__icon" name="logo" width={28} height={34} />
      <span className="logo__text">Money Guard</span>
    </a>
  );
}

export default Logo;
