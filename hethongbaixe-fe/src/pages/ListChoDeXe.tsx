import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface ChoDeXe {
  id: number;
  viTri: string;
  trangThai: string;
}

const ChoDeXeList: React.FC = () => {
  const [data, setData] = useState<ChoDeXe[]>([]);
  const [trangThai, setTrangThai] = useState<string>('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = trangThai
          ? `https://localhost:7537/api/admin/cho-de-xe?trangThai=${encodeURIComponent(trangThai)}`
          : `https://localhost:7537/api/admin/cho-de-xe`;

        const response = await fetch(url, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')?.replace(/"/g, '')}`,
          }
        });

        if (response.ok) {
          const result = await response.json();
          const sortedData = (result.data || result).sort((a: ChoDeXe, b: ChoDeXe) =>
            a.viTri.localeCompare(b.viTri, 'vi', { numeric: true, sensitivity: 'base' })
          );
          setData(sortedData);
        } else {
          alert('Lỗi khi tải danh sách!');
        }
      } catch (error) {
        alert('Lỗi kết nối server!');
      }
    };
    fetchData();
  }, [trangThai]);

  const handleEdit = (id: number) => {
    navigate(`/admin/cap-nhat-cho-de-xe/${id}`);
  };

  return (
    <div className="container py-4">
      <h2>Danh sách chỗ để xe</h2>

      <div className="mb-3 d-flex align-items-center gap-2">
        <select
          className="form-select"
          value={trangThai}
          onChange={(e) => setTrangThai(e.target.value)}
          style={{ width: '200px' }}
        >
          <option value="">-- Tất cả --</option>
          <option value="Trống">Trống</option>
          <option value="Đã đầy">Đã đầy</option>
        </select>
        <div>
          <a href="/admin/tao-cho-de-xe" className="btn btn-success">+ Tạo mới</a>
        </div>
      </div>

      <table className="table table-bordered">
        <thead>
          <tr className="text-center">
            <th>Vị trí</th>
            <th>Trạng thái</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((item, index) => (
              <tr key={index}>
                <td>{item.viTri}</td>
                <td className="text-center">{item.trangThai}</td>
                <td className="text-center">
                  <button
                    className="btn btn-sm btn-primary rounded-pill"
                    onClick={() => handleEdit(item.id)}
                  >
                    <i className="bi bi-pencil-square me-1"></i>Sửa
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={3} className="text-center">Không có dữ liệu</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ChoDeXeList;