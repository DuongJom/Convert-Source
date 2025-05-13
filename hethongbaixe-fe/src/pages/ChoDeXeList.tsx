import React, { useEffect, useState } from 'react';

interface ChoDeXe {
  id: number;
  viTri: string;
  trangThai: string;
}

interface PhuongTien {
  id: number;
  bienSo: string;
  loaiXe: string;
}

const ChoDeXeList: React.FC = () => {
  const baseUrl: string = 'https://localhost:7537/api';
  const [danhSachChoDeXe, setDanhSachChoDeXe] = useState<ChoDeXe[]>([]);
  const [danhSachXe, setDanhSachXe] = useState<PhuongTien[]>([]);
  const [selectedXe, setSelectedXe] = useState<{ [key: number]: number }>({}); // key: choDeXeId, value: phuongTienId

  useEffect(() => {
    const token = localStorage.getItem("token")?.replace(/"/g, '');
    if (!token) {
        console.log("No token found");
        return;
    }

    const fetchData = async () => {
        try {
        // Lấy danh sách chỗ đỗ trống
        const resChoDe = await fetch(`${baseUrl}/cho-de-trong`, {
            method: 'GET',
            headers: { 'Authorization': `Bearer ${token}` }
        });

        if (!resChoDe.ok) {
            throw new Error('Không thể lấy dữ liệu chỗ đỗ');
        }

        const dataChoDe = await resChoDe.json();
        setDanhSachChoDeXe(dataChoDe.danhSachCho);
        setDanhSachXe(dataChoDe.danhSachXe);
        } catch (error) {
        console.error(error);
        }
    };

    fetchData();
    }, []);

  const handleChange = (choDeXeId: number, phuongTienId: number) => {
    setSelectedXe(prev => ({ ...prev, [choDeXeId]: phuongTienId }));
  };

  const handleSubmit = async (choDeXeId: number) => {
    const phuongTienId = selectedXe[choDeXeId];
    if (!phuongTienId) return alert('Vui lòng chọn phương tiện');

    const response = await fetch(`${baseUrl}/gui-xe`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem("token")?.replace(/"/g, '')}`
      },
      body: JSON.stringify({ choDeXeId, phuongTienId })
    });

    if (response.ok) {
      alert('Gửi xe thành công!');
    } else {
      alert('Gửi xe thất bại');
    }
  };

  return (
    <div className="container mt-4">
      <h2>Danh sách chỗ đỗ trống</h2>
      <table className="table table-bordered">
        <thead>
          <tr className='text-center'>
            <th>Vị trí</th>
            <th>Trạng thái</th>
            <th>Chọn gửi xe</th>
          </tr>
        </thead>
        <tbody>
          {danhSachChoDeXe.map(item => (
            <tr key={item.id}>
              <td>{item.viTri}</td>
              <td className='text-center'>{item.trangThai}</td>
              <td>
                <select
                  value={selectedXe[item.id] || ''}
                  onChange={e => handleChange(item.id, parseInt(e.target.value))}
                  className="form-select"
                >
                  <option value="">-- Chọn phương tiện --</option>
                  {danhSachXe.map(xe => (
                    <option key={xe.id} value={xe.id}>
                      {xe.bienSo} - {xe.loaiXe}
                    </option>
                  ))}
                </select>
                <button
                  onClick={() => handleSubmit(item.id)}
                  className="btn btn-primary btn-sm mt-2"
                >
                  Gửi xe
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ChoDeXeList;
