import React, { useState } from 'react';

interface Props {
  onSuccess: () => void;
  onCancel: () => void;
}

const CreateBangPhiGuiXe: React.FC<Props> = ({ onSuccess, onCancel }) => {
  const [loaiXe, setLoaiXe] = useState('');
  const [giaGui, setGiaGui] = useState<number | ''>('');
  const [loaiGui, setLoaiGui] = useState('');
  const [errors, setErrors] = useState<string[]>([]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newItem = { loaiXe, giaGui, loaiGui };

    try {
      const res = await fetch('https://localhost:7537/api/admin/bang-phi-gui-xe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')?.replace(/"/g, '')}`,
        },
        body: JSON.stringify(newItem),
      });

      if (res.ok) {
        onSuccess();
      } else {
        const errorData = await res.json();
        setErrors([errorData.message || 'Tạo mới thất bại']);
      }
    } catch (error) {
      setErrors(['Đã xảy ra lỗi khi gửi yêu cầu']);
      console.error(error);
    }
  };

  return (
    <div className="p-4">
      <div className="card border-0 shadow-sm h-100" style={{ maxWidth: '600px', margin: '0 auto' }}>
        <div className="card-body">
          {errors.length > 0 && (
            <div className="alert alert-danger">
              <ul className="mb-0">
                {errors.map((err, i) => (
                  <li key={i}>{err}</li>
                ))}
              </ul>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="row g-3">
              <div className="col-12">
                <label className="form-label">Loại xe</label>
                <input
                  type="text"
                  className="form-control"
                  value={loaiXe}
                  onChange={(e) => setLoaiXe(e.target.value)}
                  required
                  placeholder="VD: Xe máy"
                />
              </div>

              <div className="col-12">
                <label className="form-label">Giá gửi (VNĐ)</label>
                <input
                  type="number"
                  className="form-control"
                  value={giaGui}
                  onChange={(e) => setGiaGui(Number(e.target.value))}
                  required
                  placeholder="VD: 10000"
                />
              </div>

              <div className="col-12">
                <label className="form-label">Loại gửi</label>
                <input
                  type="text"
                  className="form-control"
                  value={loaiGui}
                  onChange={(e) => setLoaiGui(e.target.value)}
                  required
                  placeholder="VD: Theo giờ / Theo tháng"
                />
              </div>
            </div>

            <div className="mt-4 d-flex justify-content-end">
              <button type="submit" className="btn btn-primary me-2">
                <i className="bi bi-check-circle me-1"></i> Lưu
              </button>
              <button type="button" className="btn btn-secondary" onClick={onCancel}>
                <i className="bi bi-x-circle me-1"></i> Hủy
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateBangPhiGuiXe;