# Money Guard Team Task Distribution

Project folder:
`/Users/aylingunes/Desktop/Money Guard (International)`

## Shared Rules

- Everyone should work only in their own files.
- Do not change another teammate's files without informing them first.
- Route names must stay the same:
  `/register`, `/login`, `/dashboard`, `/home`, `/statistics`, `/currency`
- Everyone can first finish their own UI with mock data.
- Do not commit `.env` or any sensitive key/token information.
- Shared config, route, store and service files should only be changed by the assigned owner.

## Hilal Hanim

Area:
- Registration flow
- Shared auth layout

Files:
- `src/pages/RegistrationPage.jsx`
- `src/pages/RegistrationPage.css`
- `src/components/RegistrationForm/RegistrationForm.jsx`
- `src/components/RegistrationForm/RegistrationForm.css`
- `src/components/ProgressBar/ProgressBar.jsx`
- `src/components/ProgressBar/ProgressBar.css`
- `src/components/AuthLayout/AuthLayout.jsx`
- `src/components/AuthLayout/AuthLayout.css`
- `src/assets/images/auth/*` when needed for auth visuals

Responsibilities:
- Registration page responsive layout
- Register form UI
- Confirm password field and progress bar
- Auth card and auth background structure
- Log in link placement on register page

Should not edit:
- `Login*`
- `routes/*`
- `store/*`
- `services/*`

## Aylin

Area:
- Login flow

Files:
- `src/pages/LoginPage.jsx`
- `src/pages/LoginPage.css`
- `src/components/LoginForm/LoginForm.jsx`
- `src/components/LoginForm/LoginForm.css`

Responsibilities:
- Login page responsive layout
- Email and password fields
- Register link on login page
- Login form UI and validation view

Should not edit:
- `Registration*`
- `AuthLayout*`
- `routes/*`
- `store/*`
- `services/*`

## Burak

Area:
- Dashboard shell
- Top and side interface areas

Files:
- `src/pages/DashboardPage.jsx`
- `src/components/DashboardLayout/DashboardLayout.jsx`
- `src/components/DashboardLayout/DashboardLayout.css`
- `src/components/Header/Header.jsx`
- `src/components/Header/Header.css`
- `src/components/Navigation/Navigation.jsx`
- `src/components/Navigation/Navigation.css`
- `src/components/Balance/Balance.jsx`
- `src/components/Balance/Balance.css`
- `src/components/Logo/Logo.jsx`
- `src/components/Logo/Logo.css`
- `src/components/Icon/Icon.jsx`
- `src/components/LogoutModal/LogoutModal.jsx`
- `src/components/LogoutModal/LogoutModal.css`
- `src/assets/icons/*`

Responsibilities:
- Dashboard general grid layout
- Header design
- Navigation states
- Balance card UI
- Logout modal UI
- Logo and icon usage

Should not edit:
- `HomeTab*`
- `Transactions*`
- `Statistics*`
- `Currency*`
- `routes/*`
- `store/*`
- `services/*`

## Dogukan

Area:
- Home tab
- Transaction CRUD interface

Files:
- `src/pages/HomeTab.jsx`
- `src/pages/HomeTab.css`
- `src/components/TransactionsList/TransactionsList.jsx`
- `src/components/TransactionsList/TransactionsList.css`
- `src/components/TransactionsItem/TransactionsItem.jsx`
- `src/components/TransactionsItem/TransactionsItem.css`
- `src/components/ButtonAddTransaction/ButtonAddTransaction.jsx`
- `src/components/ButtonAddTransaction/ButtonAddTransaction.css`
- `src/components/ModalAddTransaction/ModalAddTransaction.jsx`
- `src/components/ModalAddTransaction/ModalAddTransaction.css`
- `src/components/AddTransactionForm/AddTransactionForm.jsx`
- `src/components/AddTransactionForm/AddTransactionForm.css`
- `src/components/ModalEditTransaction/ModalEditTransaction.jsx`
- `src/components/ModalEditTransaction/ModalEditTransaction.css`
- `src/components/EditTransactionForm/EditTransactionForm.jsx`
- `src/components/EditTransactionForm/EditTransactionForm.css`
- `src/constants/transactionCategories.js` if needed for category UI

Responsibilities:
- Home tab layout
- Transactions list desktop and mobile view
- Add and edit modal UI
- Add transaction button
- Transaction row/card UI
- Empty state and scroll area

Should not edit:
- `Header*`
- `Navigation*`
- `Statistics*`
- `Currency*`
- `routes/*`
- `store/*`
- `services/*`

## Gaye

Area:
- App infrastructure
- Route handling
- Loader
- Currency area
- Statistics area
- Store, service and env layer

Files:
- `src/app/App.jsx`
- `src/app/App.css`
- `src/routes/AppRoutes.jsx`
- `src/routes/PrivateRoute.jsx`
- `src/routes/PublicRoute.jsx`
- `src/components/Loader/Loader.jsx`
- `src/components/Loader/Loader.css`
- `src/pages/CurrencyTab.jsx`
- `src/pages/CurrencyTab.css`
- `src/components/Currency/Currency.jsx`
- `src/components/Currency/Currency.css`
- `src/pages/StatisticsTab.jsx`
- `src/pages/StatisticsTab.css`
- `src/components/Chart/Chart.jsx`
- `src/components/Chart/Chart.css`
- `src/components/StatisticsDashboard/StatisticsDashboard.jsx`
- `src/components/StatisticsDashboard/StatisticsDashboard.css`
- `src/components/StatisticsTable/StatisticsTable.jsx`
- `src/components/StatisticsTable/StatisticsTable.css`
- `src/config/env.js`
- `src/constants/routes.js`
- `src/constants/assets.js`
- `src/services/*`
- `src/store/*`
- `.env.example`

Responsibilities:
- App shell
- Route protection logic
- Global loader
- Currency page and component
- Statistics page and components
- Environment config
- Store and services setup

Should not edit:
- `Registration*`
- `Login*`
- `HomeTab*`
- `Transactions*`
- `Header*`
- `Navigation*`
- `Balance*`

## Final Structure Rule

- Hilal and Aylin work only in auth area.
- Burak works only in dashboard shell area.
- Dogukan works only in transaction area.
- Gaye works only in app, route, env, store, services, currency and statistics area.
- Everyone should finish their own UI first.
- Redux and API integration can be connected after each screen is visually ready.
