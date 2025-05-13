import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface ChiTietGuiXe {
  id: number;
  phuongTienId: number;
  choDeXeId: number;
  ngayGui: string; // ISO format date string
}

const DanhSachGuiXe: React.FC = () => {
    const [danhSachGuiXe, setDanhSachGuiXe] = React.useState<ChiTietGuiXe[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetch('https://localhost:7537/api/danh-sach-gui-xe',{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')?.replace(/"/g, '')}`
            }
        })
            .then((response) => {
                if (!response.ok) {
                    alert('Lấy danh sách gửi xe không thành công!');
                }
                return response.json();
            })
            .then((data) => {
                setDanhSachGuiXe(data.danhSachXe);
            })
            .catch((error) => {
                console.error('Error:', error);
                alert('Lấy danh sách gửi xe không thành công!');
            });
    }, []);

  const handleLayXe = (id: number) => {
    navigate('/thanh-toan/' + id);
  };

  return (
    <div className="container mt-3">
      <h2 className="text-center mb-3">Danh sách gửi xe của bạn</h2>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Phương tiện ID</th>
            <th>Chỗ để xe ID</th>
            <th>Ngày gửi</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {danhSachGuiXe.map((item) => (
            <tr key={item.id}>
              <td>{item.phuongTienId}</td>
              <td>{item.choDeXeId}</td>
              <td>{new Date(item.ngayGui).toLocaleString('vi-VN', { dateStyle: 'short', timeStyle: 'short' })}</td>
              <td>
                <button
                  type="button"
                  className="btn btn-primary btn-sm"
                  onClick={() => handleLayXe(item.id)}
                >
                  Lấy xe
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DanhSachGuiXe;