import React, { useState } from 'react';

interface BangPhiGuiXe {
  id: number;
  loaiXe: string;
  giaGui: number;
  loaiGui: string;
}

interface Props {
  data: BangPhiGuiXe;
  onCancel: () => void;
  onSuccess: () => void;
}

const EditBangPhiGuiXe: React.FC<Props> = ({ data, onCancel, onSuccess }) => {
  const [formData, setFormData] = useState({ ...data });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'giaGui' ? parseInt(value) || 0 : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await fetch(`https://localhost:7537/api/admin/bang-phi-gui-xe/${formData.id}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')?.replace(/"/g, '')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      onSuccess();
    } else {
      alert('Cập nhật không thành công!');
    }
  };

  return (
    <div className="modal fade show d-block" tabIndex={-1} style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog modal-md modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Chỉnh sửa bảng phí gửi xe</h5>
            <button type="button" className="btn-close" onClick={onCancel}></button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit}>
              <input type="hidden" name="id" value={formData.id} />
              <div className="mb-3">
                <label className="form-label">Loại xe</label>
                <input
                  name="loaiXe"
                  className="form-control"
                  value={formData.loaiXe}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Giá gửi</label>
                <input
                  name="giaGui"
                  type="number"
                  className="form-control"
                  value={formData.giaGui}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Loại gửi</label>
                <input
                  name="loaiGui"
                  className="form-control"
                  value={formData.loaiGui}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="text-end">
                <button type="submit" className="btn btn-primary me-2">Lưu</button>
                <button type="button" className="btn btn-secondary" onClick={onCancel}>Hủy</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditBangPhiGuiXe;
