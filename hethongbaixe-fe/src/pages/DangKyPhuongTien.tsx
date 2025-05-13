import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const DangKyPhuongTien: React.FC = () => {
    const navigate = useNavigate();
  const [form, setForm] = useState({
    bienSo: '',
    loaiXe: '',
    hoTenChuXe: '',
    sdt: '',
    cccd: '',
    maCaVet: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch('https://localhost:7537/api/dang-ky-xe', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')?.replace(/"/g, '')}`,
        },
        body: JSON.stringify(form),
    })
    .then((response) => {
        if (!response.ok) {
            alert('Đăng ký xe không thành công!');
        }
        alert('Đăng ký xe thành công!');
        navigate('/danh-sach-xe');
    })
    .catch((error) => {
        console.error('Error:', error);
        alert('Đăng ký xe không thành công!');
    });
  };

  return (
    <div className="container mt-3">
      <h2 className="text-center mb-3">Đăng ký Phương Tiện</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Biển số:</label>
          <input
            type="text"
            className="form-control"
            name="bienSo"
            value={form.bienSo}
            onChange={handleChange}
            required
            placeholder="Nhập biển số"
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Loại xe:</label>
          <input
            type="text"
            className="form-control"
            name="loaiXe"
            value={form.loaiXe}
            onChange={handleChange}
            required
            placeholder="Nhập loại xe"
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Họ tên chủ xe:</label>
          <input
            type="text"
            className="form-control"
            name="hoTenChuXe"
            value={form.hoTenChuXe}
            onChange={handleChange}
            required
            placeholder="Nhập họ tên chủ xe"
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Số điện thoại:</label>
          <input
            type="text"
            className="form-control"
            name="sdt"
            value={form.sdt}
            onChange={handleChange}
            required
            placeholder="Nhập số điện thoại"
          />
        </div>
        <div className="mb-3">
          <label className="form-label">CCCD:</label>
          <input
            type="text"
            className="form-control"
            name="cccd"
            value={form.cccd}
            onChange={handleChange}
            required
            placeholder="Nhập CCCD"
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Mã ca vẹt:</label>
          <input
            type="text"
            className="form-control"
            name="maCaVet"
            value={form.maCaVet}
            onChange={handleChange}
            required
            placeholder="Nhập mã ca vẹt"
          />
        </div>
        <div className='d-flex justify-content-end'>
            <button type="submit" className="btn btn-primary">
                Đăng ký
            </button>
        </div>
      </form>
    </div>
  );
};

export default DangKyPhuongTien;