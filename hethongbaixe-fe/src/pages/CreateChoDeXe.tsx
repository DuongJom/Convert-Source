import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CreateChoDeXe: React.FC = () => {
  const [viTri, setViTri] = useState('');
  const [errors, setErrors] = useState<{ viTri?: string; trangThai?: string }>({});
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: typeof errors = {};
    if (!viTri.trim()) newErrors.viTri = 'Vị trí không được để trống.';
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const response = await fetch('https://localhost:7537/api/admin/cho-de-xe', {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')?.replace(/"/g, '')}`,
        },
        body: JSON.stringify({ viTri }),
      });

      if (response.ok) {
        navigate('/admin/danh-sach-cho-de-xe');
      } else {
        const error = await response.text();
        alert(`Thêm thất bại: ${error}`);
      }
    } catch (error) {
      console.error('Lỗi khi gửi yêu cầu:', error);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
        <div className="col-lg-6 col-md-8 col-sm-12">
          <div className="card shadow-sm border-0 rounded-4">
            <div className="card-body p-4">
              <h4 className="mb-4 text-primary fw-bold text-center">
                <i className="bi bi-plus-circle me-2"></i>Thêm Chỗ Để Xe
              </h4>

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label fw-semibold">Vị trí</label>
                  <input
                    type="text"
                    className={`form-control rounded-3 ${errors.viTri ? 'is-invalid' : ''}`}
                    value={viTri}
                    onChange={(e) => setViTri(e.target.value)}
                  />
                  {errors.viTri && <div className="invalid-feedback">{errors.viTri}</div>}
                </div>

                <div className="d-flex justify-content-between">
                  <button type="submit" className="btn btn-primary px-4 rounded-pill">
                    <i className="bi bi-save me-2"></i>Tạo mới
                  </button>
                  <button
                    type="button"
                    className="btn btn-outline-secondary px-4 rounded-pill"
                    onClick={() => navigate('/admin/danh-sach-cho-de-xe')}
                  >
                    <i className="bi bi-arrow-left me-2"></i>Quay lại
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
    </div>
  );
};

export default CreateChoDeXe;
