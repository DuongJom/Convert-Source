import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';

const App: React.FC = () => {
  const [username, setUsername] = useState<string | null>('');

  const handleLogout = () => {
    setUsername(null);
    localStorage.removeItem('token');
  };

  return (
    <Router>
      <Navbar username={username} onLogout={handleLogout} />
      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<Login setUsername={setUsername} />} />
          <Route path="/home" element={<Home />} />
          <Route path="/register" element={<Register />} />
          {/* Add other routes here */}
        </Routes>
      </div>
      <footer className="border-top text-muted text-center mt-5 py-3">
        &copy; 2025 - HeThongBaiXe
      </footer>
    </Router>
  );
};

export default App;
