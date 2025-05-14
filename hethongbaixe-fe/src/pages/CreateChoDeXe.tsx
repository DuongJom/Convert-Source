import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface Props {
  onSuccess: () => void;
  onCancel: () => void;
}

const CreateChoDeXe: React.FC<Props> = ({ onSuccess, onCancel }) => {
  const [viTri, setViTri] = useState('');
  const [errors, setErrors] = useState<{ viTri?: string }>({});
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
        onSuccess();
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
      <form onSubmit={handleSubmit} className="w-100">
        <div className="mb-3">
          <label className="form-label fw-semibold">Vị trí</label>
          <input
              type="text"
              className={`form-control ${errors.viTri ? 'is-invalid' : ''}`}
              value={viTri}
              onChange={(e) => setViTri(e.target.value)}
          />
          {errors.viTri && <div className="invalid-feedback">{errors.viTri}</div>}
        </div>

        <div className="d-flex justify-content-end gap-2 mt-3">
          <button type="button" className="btn btn-outline-secondary rounded-pill" onClick={onCancel}>
            <i className="bi bi-arrow-left me-1"></i>Quay lại
          </button>
          <button type="submit" className="btn btn-primary rounded-pill">
            <i className="bi bi-save me-1"></i>Tạo mới
          </button>
        </div>
      </form>
  );
};

export default CreateChoDeXe;
