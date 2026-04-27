import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import * as yup from 'yup';

import { ROUTES } from '../../constants/routes.js';
import { loginUser } from '../../store/auth/authOperations.js';
import Icon from '../Icon/Icon.jsx';
import Logo from '../Logo/Logo.jsx';
import './LoginForm.css';

const loginSchema = yup.object({
  email: yup
    .string()
    .trim()
    .email('Please enter a valid email address')
    .required('Email is required'),
  password: yup
    .string()
    .min(6, 'Password must contain at least 6 characters')
    .max(12, 'Password must contain at most 12 characters')
    .required('Password is required'),
});

function LoginForm() {
  const dispatch = useDispatch();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm({
    defaultValues: {
      email: location.state?.registeredEmail ?? '',
      password: '',
    },
    mode: 'onChange',
    resolver: yupResolver(loginSchema),
  });

  const onSubmit = async values => {
    try {
      await dispatch(loginUser(values)).unwrap();
      setSubmitStatus('Login successful. Redirecting to dashboard...');
      const nextPath = location.state?.from?.pathname ?? ROUTES.DASHBOARD;
      navigate(nextPath, { replace: true });
    } catch (error) {
      setSubmitStatus(error || 'Login failed. Please try again.');
    }
  };

  return (
    <form className="login-form" onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className="login-form__logo-container">
        <Logo />
      </div>

      <div className="login-form__fields">
        <label className="login-form__field">
          <Icon name="email" className="login-form__field-icon" width={20} height={20} />
          <input
            className="login-form__input"
            type="email"
            placeholder="E-mail"
            autoComplete="email"
            {...register('email')}
          />
          {errors.email && (
            <p className="login-form__status" aria-live="polite">
              {errors.email.message}
            </p>
          )}
        </label>

        <label className="login-form__field">
          <Icon name="lock" className="login-form__field-icon" width={20} height={20} />
          <input
            className="login-form__input login-form__input--password"
            type={isPasswordVisible ? 'text' : 'password'}
            placeholder="Password"
            autoComplete="current-password"
            {...register('password')}
          />
          <button
            className="login-form__toggle"
            type="button"
            aria-label={isPasswordVisible ? 'Hide password' : 'Show password'}
            onClick={() => setIsPasswordVisible(current => !current)}
          >
            <Icon name={isPasswordVisible ? 'eye-off' : 'eye'} width={20} height={20} />
          </button>
          {errors.password && (
            <p className="login-form__status" aria-live="polite">
              {errors.password.message}
            </p>
          )}
        </label>
      </div>

      <div className="login-form__actions">
        <button
          className="login-form__submit"
          type="submit"
          disabled={isSubmitting || !isValid}
        >
          {isSubmitting ? 'Loading...' : 'LOG IN'}
        </button>

        <Link className="login-form__secondary" to={ROUTES.REGISTER}>
          REGISTER
        </Link>
      </div>

      {submitStatus && (
        <p className="login-form__status-global" aria-live="polite">
          {submitStatus}
        </p>
      )}
    </form>
  );
}

export default LoginForm;
