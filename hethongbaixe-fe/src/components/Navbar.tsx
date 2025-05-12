import React from 'react';
import { Link } from 'react-router-dom';

interface Props {
  username: string | null;
  onLogout: () => void;
}

const Navbar: React.FC<Props> = ({ username, onLogout }) => {
  return (
    <nav className="navbar navbar-expand-sm navbar-light bg-white border-bottom shadow-sm mb-3">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">HeThongBaiXe</Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            {username ? (
              <>
                <li className="nav-item"><Link className="nav-link" to="/">Trang chủ</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/dang-ky-xe">Đăng ký xe</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/cho-do-trong">Chỗ đỗ trống</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/danh-sach-xe">Xe đã đăng ký</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/lich-su-gui-xe">Lịch sử gửi xe</Link></li>
                <li className="nav-item">
                  <button className="btn btn-link nav-link" onClick={onLogout}>
                    Đăng xuất ({username})
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item"><Link className="nav-link" to="/">Đăng nhập</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/register">Đăng ký</Link></li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;