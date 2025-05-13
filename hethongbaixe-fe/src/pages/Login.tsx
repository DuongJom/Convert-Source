import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface LoginProps {
  setUsername: (username: string) => void;
}

const Login: React.FC<LoginProps> = ({ setUsername }) => {
  const [tenDangNhap, setTenDangNhap] = useState('');
  const [matKhau, setMatKhau] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('https://localhost:7537/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tenDangNhap, matKhau }),
      });

      if (!response.ok) {
        throw new Error('Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin.');
      }

      const data = await response.json();
      localStorage.setItem('token', JSON.stringify(data.accessToken));
      setUsername(tenDangNhap);
      localStorage.setItem('username', JSON.stringify(tenDangNhap));
      navigate('/home');
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
  <div className="d-flex justify-content-center align-items-center min-vh-100 bg-light">
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-5">
          <div className="card shadow rounded-4">
            <div className="card-body p-4">
              <h3 className="card-title text-center mb-4">Đăng nhập</h3>

              {error && <div className="alert alert-danger">{error}</div>}

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="tenDangNhap" className="form-label">Tên đăng nhập</label>
                  <input
                    type="text"
                    id="tenDangNhap"
                    className="form-control"
                    value={tenDangNhap}
                    onChange={(e) => setTenDangNhap(e.target.value)}
                    required
                    placeholder="Nhập tên đăng nhập"
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="matKhau" className="form-label">Mật khẩu</label>
                  <input
                    type="password"
                    id="matKhau"
                    className="form-control"
                    value={matKhau}
                    onChange={(e) => setMatKhau(e.target.value)}
                    required
                    placeholder="Nhập mật khẩu"
                  />
                </div>

                <div className="d-grid gap-2">
                  <button type="submit" className="btn btn-primary btn-block">
                    Đăng nhập
                  </button>
                  <button
                    type="button"
                    className="btn btn-secondary btn-block"
                    onClick={() => navigate('/register')}
                  >
                    Chưa có tài khoản? Đăng ký
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);
};

export default Login;
