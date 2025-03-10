import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import UserPage from './pages/UserPage';

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Navigate to="/Login" />} />
      <Route path="/Login" element={<Login />} />
      <Route path="/user" element={<UserPage />} />
    </Routes>
  </Router>
);

export default App;
