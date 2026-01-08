import './App.css';
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom';
import LoginPage from './pages/Auth/LoginPage';
import RegisterPage from './pages/Auth/RegisterPage';

function App() {
  return (
    <Router>
      <Routes>
          <Route path='/' element={<LoginPage />} />
          <Route path='/register' element={<RegisterPage />} />
      </Routes>
    </Router>
  );
}

export default App;
