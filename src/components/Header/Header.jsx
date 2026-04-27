import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { ROUTES } from '../../constants/routes.js';
import { useAuth } from '../../hooks/useAuth.js';
import { clearAuthState } from '../../store/auth/authSlice.js';
import { logoutUser } from '../../store/auth/authOperations.js';
import Logo from '../Logo/Logo.jsx';
import LogoutModal from '../LogoutModal/LogoutModal.jsx';
import './Header.css';

function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const username = user?.email?.split('@')[0] || 'username';

  const handleLogout = async () => {
    try {
      await dispatch(logoutUser()).unwrap();
    } catch (error) {
      window.alert(error || 'Logout request failed. Client session will still be cleared.');
    } finally {
      dispatch(clearAuthState());
      setIsModalOpen(false);
      navigate(ROUTES.LOGIN, { replace: true });
    }
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
