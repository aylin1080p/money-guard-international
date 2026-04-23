import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import * as yup from 'yup';

import { ROUTES } from '../../constants/routes.js';
import Icon from '../Icon/Icon.jsx';
import Logo from '../Logo/Logo.jsx';
import ProgressBar from '../ProgressBar/ProgressBar.jsx';
import './RegistrationForm.css';

const registrationSchema = yup.object({
  name: yup.string().trim().required('Name is required'),
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
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords must match')
    .required('Confirm password is required'),
});

function RegistrationForm() {
  const navigate = useNavigate();
  const [submitStatus, setSubmitStatus] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmVisible, setIsConfirmVisible] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid, isSubmitting },
  } = useForm({
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    mode: 'onChange',
    resolver: yupResolver(registrationSchema),
  });

  const password = watch('password');
  const confirmPassword = watch('confirmPassword');
  const progressValue =
    password && confirmPassword && password === confirmPassword
      ? 100
      : confirmPassword
        ? 60
        : password
          ? 30
          : 0;

  const onSubmit = values => {
    setSubmitStatus(`Registration complete for ${values.email}. Redirecting to login...`);
    navigate(ROUTES.LOGIN, {
      replace: true,
      state: { registeredEmail: values.email },
    });
  };

  return (
    <form className="registration-form" onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className="registration-form__logo-container">
        <Logo />
      </div>

      <div className="registration-form__fields">
        <label className="registration-form__field">
          <Icon name="user" className="registration-form__field-icon" width={20} height={20} />
          <input
            className="registration-form__input"
            type="text"
            placeholder="Name"
            autoComplete="name"
            {...register('name')}
          />
          {errors.name && (
            <p className="registration-form__error" aria-live="polite">
              {errors.name.message}
            </p>
          )}
        </label>

        <label className="registration-form__field">
          <Icon name="email" className="registration-form__field-icon" width={20} height={20} />
          <input
            className="registration-form__input"
            type="email"
            placeholder="E-mail"
            autoComplete="email"
            {...register('email')}
          />
          {errors.email && (
            <p className="registration-form__error" aria-live="polite">
              {errors.email.message}
            </p>
          )}
        </label>

        <label className="registration-form__field">
          <Icon name="lock" className="registration-form__field-icon" width={20} height={20} />
          <input
            className="registration-form__input registration-form__input--password"
            type={isPasswordVisible ? 'text' : 'password'}
            placeholder="Password"
            autoComplete="new-password"
            {...register('password')}
          />
          <button
            className="registration-form__toggle"
            type="button"
            aria-label={isPasswordVisible ? 'Hide password' : 'Show password'}
            onClick={() => setIsPasswordVisible(v => !v)}
          >
            <Icon name={isPasswordVisible ? 'eye-off' : 'eye'} width={20} height={20} />
          </button>
          {errors.password && (
            <p className="registration-form__error" aria-live="polite">
              {errors.password.message}
            </p>
          )}
        </label>

        <label className="registration-form__field">
          <Icon name="lock" className="registration-form__field-icon" width={20} height={20} />
          <input
            className="registration-form__input registration-form__input--password"
            type={isConfirmVisible ? 'text' : 'password'}
            placeholder="Confirm password"
            autoComplete="new-password"
            {...register('confirmPassword')}
          />
          <button
            className="registration-form__toggle"
            type="button"
            aria-label={isConfirmVisible ? 'Hide confirm password' : 'Show confirm password'}
            onClick={() => setIsConfirmVisible(v => !v)}
          >
            <Icon name={isConfirmVisible ? 'eye-off' : 'eye'} width={20} height={20} />
          </button>
          {errors.confirmPassword && (
            <p className="registration-form__error" aria-live="polite">
              {errors.confirmPassword.message}
            </p>
          )}
        </label>
      </div>

      <div className="registration-form__progress">
        <ProgressBar value={progressValue} />
      </div>

      <div className="registration-form__actions">
        <button
          className="registration-form__submit"
          type="submit"
          disabled={!isValid || isSubmitting}
        >
          {isSubmitting ? 'Loading...' : 'REGISTER'}
        </button>

        <Link className="registration-form__secondary" to={ROUTES.LOGIN}>
          LOG IN
        </Link>
      </div>

      {submitStatus && (
        <p className="registration-form__status-global" aria-live="polite">
          {submitStatus}
        </p>
      )}
    </form>
  );
}

export default RegistrationForm;
