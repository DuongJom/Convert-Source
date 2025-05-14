import React, { useEffect, useState } from 'react';

interface ChoDeXe {
  id: number;
  viTri: string;
  trangThai: string;
}

interface EditChoDeXeProps {
  id: number;
  onSuccess: () => void;
  onCancel: () => void;
}

const EditChoDeXe: React.FC<EditChoDeXeProps> = ({ id, onSuccess, onCancel }) => {
  const [formData, setFormData] = useState<ChoDeXe>({
    id: 0,
    viTri: '',
    trangThai: '',
  });

  const [errors, setErrors] = useState<{ viTri?: string; trangThai?: string }>({});
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetch(`https://localhost:7537/api/admin/cho-de-xe/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')?.replace(/"/g, '')}`,
      },
    })
        .then(res => res.json())
        .then(data => {
          setFormData(data.choDeXe || data);
          setLoading(false);
        })
        .catch(err => {
          console.error('Lỗi tải dữ liệu:', err);
          setLoading(false);
        });
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const validate = () => {
    const newErrors: { viTri?: string; trangThai?: string } = {};
    if (!formData.viTri.trim()) newErrors.viTri = 'Vị trí không được để trống';
    if (!formData.trangThai.trim()) newErrors.trangThai = 'Trạng thái không được để trống';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    fetch(`https://localhost:7537/api/admin/cho-de-xe/${formData.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')?.replace(/"/g, '')}`
      },
      body: JSON.stringify(formData),
    })
        .then(res => {
          if (res.ok) {
            onSuccess(); // Callback khi thành công
          } else {
            console.error('Cập nhật thất bại');
          }
        })
        .catch(err => console.error('Lỗi khi gửi dữ liệu:', err));
  };

  if (loading) {
    return (
        <div className="text-center py-4">
          <div className="spinner-border text-primary" role="status" />
        </div>
    );
  }

  return (
      <div>
        <form onSubmit={handleSubmit} noValidate>
          <div className="mb-3">
            <label htmlFor="viTri" className="form-label">Vị trí</label>
            <input
                type="text"
                id="viTri"
                name="viTri"
                className={`form-control ${errors.viTri ? 'is-invalid' : ''}`}
                value={formData.viTri}
                onChange={handleChange}
            />
            <div className="invalid-feedback">{errors.viTri}</div>
          </div>

          <div className="mb-3">
            <label htmlFor="trangThai" className="form-label">Trạng thái</label>
            <select
                id="trangThai"
                name="trangThai"
                className={`form-select ${errors.trangThai ? 'is-invalid' : ''}`}
                value={formData.trangThai}
                onChange={handleChange}
            >
              <option value="">-- Chọn trạng thái --</option>
              <option value="Trống">Trống</option>
              <option value="Đã đầy">Đã đầy</option>
            </select>
            <div className="invalid-feedback">{errors.trangThai}</div>
          </div>

          <div className="d-flex justify-content-between">
            <button type="submit" className="btn btn-primary w-50 me-2">Lưu</button>
            <button type="button" className="btn btn-outline-secondary w-50" onClick={onCancel}>Hủy</button>
          </div>
        </form>
      </div>
  );
};

export default EditChoDeXe;
