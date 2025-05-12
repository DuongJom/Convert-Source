import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';

const App: React.FC = () => {
  const [username, setUsername] = useState<string | null>(localStorage.getItem('username') || null);
  const navigate = useNavigate(); // Sử dụng useNavigate để điều hướng

  const handleLogout = () => {
    setUsername(null);
    localStorage.removeItem('token');
    navigate('/'); // Điều hướng tới trang Login
  };

  useEffect(() => {}, [username]);

  return (
    <>
      <Navbar username={username} onLogout={handleLogout} />
      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<Login setUsername={setUsername} />} />
          <Route path="/home" element={<Home />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </>
  );
};

const AppWrapper: React.FC = () => {
  return (
    <Router>
      <App />
    </Router>
  );
};

export default AppWrapper;