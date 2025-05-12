import React, { useState } from 'react';
import { Link } from 'react-router-dom';

interface Props {
  username: string | null;
  onLogout: () => void;
}

const Navbar: React.FC<Props> = ({ username, onLogout }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false); // State to control dropdown visibility

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen); // Toggle dropdown state
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm sticky-top">
      <div className="container">
        <Link className="navbar-brand fw-bold text-primary" to="/">
          <i className="bi bi-car-front-fill me-2" aria-hidden="true"></i> Hệ Thống Bãi Xe
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav ms-auto">
            {username ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/home">
                    <i className="bi bi-house-door-fill me-2" aria-hidden="true"></i>Trang chủ
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/dang-ky-xe">
                    <i className="bi bi-pencil-square me-2" aria-hidden="true"></i>Đăng ký xe
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/cho-do-trong">
                    <i className="bi bi-cone-striped me-2" aria-hidden="true"></i>Chỗ đỗ trống
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/danh-sach-xe">
                    <i className="bi bi-truck-front me-2" aria-hidden="true"></i>Xe đã đăng ký
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/lich-su-gui-xe">
                    <i className="bi bi-calendar-event me-2" aria-hidden="true"></i>Lịch sử gửi xe
                  </Link>
                </li>

                <li className="nav-item dropdown">
                  <button
                    className="nav-link dropdown-toggle btn btn-link"
                    id="userDropdown"
                    type="button"
                    role="button"
                    aria-expanded={dropdownOpen ? 'true' : 'false'}
                    onClick={toggleDropdown} // Toggle the dropdown on click
                  >
                    <i className="bi bi-person-circle me-2" aria-hidden="true"></i>Xin chào, {username}
                  </button>

                  {/* Dropdown menu with visibility controlled by state */}
                  <ul className={`dropdown-menu dropdown-menu-end ${dropdownOpen ? 'show' : ''}`} aria-labelledby="userDropdown">
                    <li>
                      <button className="dropdown-item" onClick={onLogout}>
                        <i className="bi bi-box-arrow-right me-2" aria-hidden="true"></i>Đăng xuất
                      </button>
                    </li>
                  </ul>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/">
                    <i className="bi bi-box-arrow-in-right me-2" aria-hidden="true"></i>Đăng nhập
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/register">
                    <i className="bi bi-file-earmark-text me-2" aria-hidden="true"></i>Đăng ký
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
