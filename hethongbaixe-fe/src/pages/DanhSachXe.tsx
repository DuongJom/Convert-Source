import React, { useEffect } from 'react';

interface PhuongTien {
  id: number;
  bienSo: string;
  loaiXe: string;
  hoTenChuXe: string;
  sdt: string;
  cccd: string;
  maCaVet: string;
}

const DanhSachXe: React.FC = () => {
    const [data, setData] = React.useState<PhuongTien[]>([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
            const response = await fetch('https://localhost:7537/api/danh-sach-xe', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')?.replace(/"/g, '')}`,
                }
        });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const result = await response.json();
            setData(result.data);
            } catch (error) {
            console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);
  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Danh sách xe đã đăng ký</h2>
      <table className="table table-bordered">
        <thead>
          <tr className='text-center'>
            <th>ID</th>
            <th>Biển số</th>
            <th>Loại xe</th>
            <th>Họ tên chủ xe</th>
            <th>Số điện thoại</th>
            <th>CCCD</th>
            <th>Mã cà vẹt</th>
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((xe) => (
              <tr key={xe.id}>
                <td>{xe.id}</td>
                <td>{xe.bienSo}</td>
                <td>{xe.loaiXe}</td>
                <td>{xe.hoTenChuXe}</td>
                <td>{xe.sdt}</td>
                <td>{xe.cccd}</td>
                <td>{xe.maCaVet}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={7} className="text-center">
                Không có xe nào được đăng ký.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default DanhSachXe;