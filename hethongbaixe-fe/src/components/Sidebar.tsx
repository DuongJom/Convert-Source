import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Sidebar: React.FC = () => {
  const location = useLocation();
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    const storedRole = localStorage.getItem('role');
    setRole(storedRole);
  }, []);

  const links = [
    { to: '/home', label: 'Trang chủ', icon: 'bi-house-door-fill' },
    { to: '/dang-ky-xe', label: 'Đăng ký xe', icon: 'bi-pencil-square' },
    { to: '/cho-do-trong', label: 'Chỗ đỗ trống', icon: 'bi-cone-striped' },
    { to: '/danh-sach-xe', label: 'Xe đã đăng ký', icon: 'bi-truck-front' },
    { to: '/lich-su-gui-xe', label: 'Lịch sử gửi xe', icon: 'bi-calendar-event' }
  ];

  const adminLinks = [
    { to: '/admin/danh-sach-cho-de-xe', label: 'Danh sách chỗ đỗ xe', icon: 'bi-list-check' },
    { to: '/admin/tao-cho-de-xe', label: 'Tạo chỗ đỗ xe', icon: 'bi-plus-square' },
    { to: '/admin/bang-phi-gui-xe', label: 'Bảng phí gửi xe', icon: 'bi-cash-coin' }  
  ];

  const isAdmin = (role?.replace(/"/g, '') === "Admin");

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
        {(isAdmin ? adminLinks : links).map(link => (
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
