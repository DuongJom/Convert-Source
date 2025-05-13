import React, { useState } from 'react';
import { Link } from 'react-router-dom';

interface Props {
  username: string | null;
  onLogout: () => void;
}

const Navbar: React.FC<Props> = ({ username, onLogout }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm sticky-top">
      <div className="container">
        <Link className="navbar-brand fw-bold text-primary" to="/home">
          <i className="bi bi-car-front-fill me-2" aria-hidden="true"></i> Hệ Thống Bãi Xe
        </Link>

        <div className="collapse navbar-collapse justify-content-end" id="navbarNavDropdown">
          <ul className="navbar-nav">
            {username ? (
              <li className="nav-item dropdown">
                <button
                  className="nav-link dropdown-toggle btn btn-link"
                  id="userDropdown"
                  type="button"
                  aria-expanded={dropdownOpen ? 'true' : 'false'}
                  onClick={toggleDropdown}
                >
                  <i className="bi bi-person-circle me-2" aria-hidden="true"></i>
                  Xin chào, {username}
                </button>
                <ul
                  className={`dropdown-menu dropdown-menu-end ${dropdownOpen ? 'show' : ''}`}
                  aria-labelledby="userDropdown"
                >
                  <li>
                    <button className="dropdown-item" onClick={onLogout}>
                      <i className="bi bi-box-arrow-right me-2" aria-hidden="true"></i>Đăng xuất
                    </button>
                  </li>
                </ul>
              </li>
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
