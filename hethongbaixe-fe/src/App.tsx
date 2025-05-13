import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  useNavigate,
  useLocation,
} from 'react-router-dom';
import MainLayout from './components/MainLayout';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import ChoDeXeList from './pages/ChoDeXeList';
import DangKyPhuongTien from './pages/DangKyPhuongTien';
import DanhSachGuiXe from './pages/DanhSachGuiXe';
import DanhSachXe from './pages/DanhSachXe';
import ThanhToan from './pages/ThanhToan';
import ListChoDeXe from './pages/ListChoDeXe';
import CreateChoDeXe from './pages/CreateChoDeXe';
import EditChoDeXe from './pages/EditChoDeXe';

const PrivateRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const isAuthenticated = !!localStorage.getItem('token');
  return isAuthenticated ? <>{children}</> : <Navigate to="/" />;
};

const AppContent: React.FC = () => {
  const [username, setUsername] = useState<string | null>(localStorage.getItem('username') || null);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    setUsername(null);
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('role');
    navigate('/'); // Redirect to login
  };

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setUsername(storedUsername.replace(/"/g, ''));
    }
  }, []);

  const isAuthRoute = location.pathname === '/' || location.pathname === '/register';

  return (
    <>
      {isAuthRoute ? (
        <Routes>
          <Route path="/" element={<Login setUsername={setUsername} />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      ) : (
        <MainLayout username={username} onLogout={handleLogout}>
          <Routes>
            <Route
              path="/home"
              element={
                <PrivateRoute>
                  <Home />
                </PrivateRoute>
              }
            />
            <Route
              path="/cho-do-trong"
              element={
                <PrivateRoute>
                  <ChoDeXeList />
                </PrivateRoute>
              }
            />
            <Route
              path='/dang-ky-xe'
              element={
                <PrivateRoute>
                  <DangKyPhuongTien />
                </PrivateRoute>
              }
            />
            <Route
              path='/danh-sach-xe'
              element={
                <PrivateRoute>
                  <DanhSachXe />
                </PrivateRoute>
              }
            />
            <Route
              path='/lich-su-gui-xe'
              element={
                <PrivateRoute>
                  <DanhSachGuiXe />
                </PrivateRoute>
              }
            />
            <Route
              path='/thanh-toan/:id'
              element={
                <PrivateRoute>
                  <ThanhToan />
                </PrivateRoute>
              }
            />
            <Route
              path='/admin/danh-sach-cho-de-xe'
              element={
                <PrivateRoute>
                  <ListChoDeXe />
                </PrivateRoute>
              }
            />
            <Route
              path='/admin/tao-cho-de-xe'
              element={
                <PrivateRoute>
                  <CreateChoDeXe />
                </PrivateRoute>
              }
            />
            <Route
              path='/admin/cap-nhat-cho-de-xe/:id'
              element={
                <PrivateRoute>
                  <EditChoDeXe />
                </PrivateRoute>
              }
            />
          </Routes>
        </MainLayout>
      )}
    </>
  );
};

const AppWrapper: React.FC = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default AppWrapper;