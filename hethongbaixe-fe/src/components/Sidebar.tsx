import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Sidebar: React.FC = () => {
  const location = useLocation(); // để highlight mục đang active

  const links = [
    { to: '/home', label: 'Trang chủ', icon: 'bi-house-door-fill' },
    { to: '/dang-ky-xe', label: 'Đăng ký xe', icon: 'bi-pencil-square' },
    { to: '/cho-do-trong', label: 'Chỗ đỗ trống', icon: 'bi-cone-striped' },
    { to: '/danh-sach-xe', label: 'Xe đã đăng ký', icon: 'bi-truck-front' },
    { to: '/lich-su-gui-xe', label: 'Lịch sử gửi xe', icon: 'bi-calendar-event' }
  ];

  return (
    <div
      className="bg-white border-end vh-100 shadow-sm"
      style={{ width: '250px', position: 'fixed', top: 0, left: 0 }}
    >
      <div className="p-4 border-bottom">
        <h5 className="text-primary mb-0">
          <i className="bi bi-car-front-fill me-2"></i> Hệ Thống Bãi Xe
        </h5>
      </div>

      <ul className="nav flex-column p-3">
        {links.map(link => (
          <li className="nav-item mb-2" key={link.to}>
            <Link
              to={link.to}
              className={`nav-link d-flex align-items-center rounded ${
                location.pathname === link.to ? 'bg-primary text-white' : 'text-dark'
              }`}
              style={{ padding: '10px 15px', transition: '0.3s' }}
            >
              <i className={`bi ${link.icon} me-2`} />
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
