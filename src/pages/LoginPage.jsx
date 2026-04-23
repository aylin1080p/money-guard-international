import AuthLayout from '../components/AuthLayout/AuthLayout.jsx';
import LoginForm from '../components/LoginForm/LoginForm.jsx';
import './LoginPage.css';

function LoginPage() {
  return (
    <div className="login-page">
      <AuthLayout variant="login">
        <LoginForm />
      </AuthLayout>
    </div>
  );
}

export default LoginPage;
