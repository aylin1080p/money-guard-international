import './AuthLayout.css';

function AuthLayout({ children, variant = 'login' }) {
  return (
    <section className={`auth-layout auth-layout--${variant}`}>
      <div className="auth-layout__interactive-layer">{children}</div>
    </section>
  );
}

export default AuthLayout;
