import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { ROUTES } from '../../constants/routes.js';
import { useAuth } from '../../hooks/useAuth.js';
import { clearSession } from '../../utils/auth.js';
import Logo from '../Logo/Logo.jsx';
import LogoutModal from '../LogoutModal/LogoutModal.jsx';
import './Header.css';

function Header() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const username = user?.email?.split('@')[0] || 'username';

  const handleLogout = () => {
    clearSession();
    setIsModalOpen(false);
    navigate(ROUTES.LOGIN, { replace: true });
  };

  return (
    <header className="header">
      <div className="header__container container">
        <Logo />
        <div className="header__user-block">
          <span className="header__username">{username}</span>
          <button
            className="header__logout-button"
            type="button"
            onClick={() => setIsModalOpen(true)}
          >
            Exit
          </button>
        </div>
      </div>
      <LogoutModal
        isOpen={isModalOpen}
        onConfirm={handleLogout}
        onCancel={() => setIsModalOpen(false)}
      />
    </header>
  );
}

export default Header;
