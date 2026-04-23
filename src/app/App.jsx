import AppRoutes from '../routes/AppRoutes.jsx';
import Loader from '../components/Loader/Loader.jsx';
import './App.css';

function App() {
  return (
    <div className="app-shell">
      <Loader />
      <AppRoutes />
    </div>
  );
}

export default App;
