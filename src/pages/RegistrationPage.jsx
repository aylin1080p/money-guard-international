import AuthLayout from '../components/AuthLayout/AuthLayout.jsx';
import RegistrationForm from '../components/RegistrationForm/RegistrationForm.jsx';
import './RegistrationPage.css';

function RegistrationPage() {
  return (
    <AuthLayout variant="register">
      <RegistrationForm />
    </AuthLayout>
  );
}

export default RegistrationPage;
