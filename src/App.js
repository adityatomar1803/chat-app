import './styles/main.scss';
import 'rsuite/dist/rsuite.min.css';
import { Routes } from 'react-router';
import SignIn from './pages/SignIn';
import PublicRoute from './components/PublicRoute';
import PrivateRoute from './components/PrivateRoute';
import Home from './pages/Home';

function App() {
  return (
    <Routes>
      <PublicRoute to="/signin">
        <SignIn />
      </PublicRoute>
      <PrivateRoute to="/">
        <Home />
      </PrivateRoute>
    </Routes>
  );
}

export default App;
