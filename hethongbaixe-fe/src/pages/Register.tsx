import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface RegisterForm {
  tenDangNhap: string;
  matKhau: string;
  hoTen: string;
  diaChi: string;
  gioiTinh: string;
}

const Register: React.FC = () => {
  const [form, setForm] = useState<RegisterForm>({
    tenDangNhap: '',
    matKhau: '',
    hoTen: '',
    diaChi: '',
    gioiTinh: ''
  });

  const [errors, setErrors] = useState<Partial<RegisterForm>>({});
  const [serverError, setServerError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const validate = () => {
    const newErrors: Partial<RegisterForm> = {};
    if (!form.tenDangNhap) newErrors.tenDangNhap = 'Tên đăng nhập là bắt buộc';
    if (!form.matKhau) newErrors.matKhau = 'Mật khẩu là bắt buộc';
    if (!form.hoTen) newErrors.hoTen = 'Họ tên là bắt buộc';
    if (!form.diaChi) newErrors.diaChi = 'Địa chỉ là bắt buộc';
    if (!form.gioiTinh) newErrors.gioiTinh = 'Giới tính là bắt buộc';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      const response = await fetch("https://localhost:7537/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });

      if (response.ok) {
        navigate('/');
      } else {
        const data = await response.json();
        setServerError(data.message || "Đăng ký thất bại");
      }
    } catch (error) {
      setServerError("Lỗi kết nối đến máy chủ.");
    }
  };

  return (
  <div className="d-flex justify-content-center align-items-center min-vh-100 bg-light">
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-5">
          <div className="card shadow rounded-4">
            <div className="card-body p-4">
              <h2 className="mb-4 text-center">Đăng ký tài khoản</h2>

              {serverError && <div className="alert alert-danger">{serverError}</div>}

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">Tên đăng nhập</label>
                  <input
                    type="text"
                    className={`form-control ${errors.tenDangNhap ? 'is-invalid' : ''}`}
                    name="tenDangNhap"
                    value={form.tenDangNhap}
                    onChange={handleChange}
                  />
                  <div className="invalid-feedback">{errors.tenDangNhap}</div>
                </div>

                <div className="mb-3">
                  <label className="form-label">Mật khẩu</label>
                  <input
                    type="password"
                    className={`form-control ${errors.matKhau ? 'is-invalid' : ''}`}
                    name="matKhau"
                    value={form.matKhau}
                    onChange={handleChange}
                  />
                  <div className="invalid-feedback">{errors.matKhau}</div>
                </div>

                <div className="mb-3">
                  <label className="form-label">Họ tên</label>
                  <input
                    type="text"
                    className={`form-control ${errors.hoTen ? 'is-invalid' : ''}`}
                    name="hoTen"
                    value={form.hoTen}
                    onChange={handleChange}
                  />
                  <div className="invalid-feedback">{errors.hoTen}</div>
                </div>

                <div className="mb-3">
                  <label className="form-label">Địa chỉ</label>
                  <input
                    type="text"
                    className={`form-control ${errors.diaChi ? 'is-invalid' : ''}`}
                    name="diaChi"
                    value={form.diaChi}
                    onChange={handleChange}
                  />
                  <div className="invalid-feedback">{errors.diaChi}</div>
                </div>

                <div className="mb-3">
                  <label className="form-label d-block">Giới tính</label>
                  <div className="d-flex gap-4">
                    <div className="form-check">
                      <input
                        type="radio"
                        className="form-check-input"
                        id="male"
                        name="gioiTinh"
                        value="Nam"
                        checked={form.gioiTinh === 'Nam'}
                        onChange={handleChange}
                      />
                      <label className="form-check-label" htmlFor="male">Nam</label>
                    </div>
                    <div className="form-check">
                      <input
                        type="radio"
                        className="form-check-input"
                        id="female"
                        name="gioiTinh"
                        value="Nữ"
                        checked={form.gioiTinh === 'Nữ'}
                        onChange={handleChange}
                      />
                      <label className="form-check-label" htmlFor="female">Nữ</label>
                    </div>
                  </div>
                  {errors.gioiTinh && <div className="invalid-feedback d-block">{errors.gioiTinh}</div>}
                </div>
                <div className="d-grid gap-2">
                  <button type="submit" className="btn btn-primary">Đăng ký</button>
                  <button type="button" className="btn btn-secondary" onClick={() => navigate('/')}>
                    Hủy
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

export default Register;
