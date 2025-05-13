import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

interface ChiTietGuiXe {
  id: string;
  ngayGui: string; // ISO string
}

const ThanhToan: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>(); // Lấy id từ URL
  const [chiTietGuiXe, setChiTietGuiXe] = useState<ChiTietGuiXe | null>(null);
  const [tongTien, setTongTien] = useState(0);
  const [phuongThuc, setPhuongThuc] = useState('TienMat');
  const [hienQR, setHienQR] = useState(false);

  // Lấy thông tin chi tiết gửi xe từ API
  useEffect(() => {
    const fetchChiTietGuiXe = async () => {
      try {
        const res = await fetch(`https://localhost:7537/api/thanh-toan/${id}`, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')?.replace(/"/g, '')}`,
          },
        });

        if (res.ok) {
          const data = await res.json();
          setChiTietGuiXe(data.data);

          // Tính toán tổng tiền dựa trên ngày gửi
          const now = new Date();
          const guiDate = new Date(data.data.ngayGui);
          const soGio = (now.getTime() - guiDate.getTime()) / (1000 * 60 * 60);
          const tien = Math.ceil(soGio) * 5000;
          setTongTien(tien);
        }
    } 
    catch (error) {
        console.error('Lỗi khi lấy thông tin chi tiết gửi xe:', error);
        alert('Lỗi kết nối máy chủ!');
        navigate('/lich-su-gui-xe');
    }
    };

    if (id) {
      fetchChiTietGuiXe();
    }
  }, [id, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const data = {
      chiTietGuiXeId: id,
      phuongThuc: phuongThuc,
    };

    try {
      const res = await fetch('https://localhost:7537/api/thanh-toan', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')?.replace(/"/g, '')}`,
        },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        alert('Thanh toán thành công!');
        fetch(`https://localhost:7537/api/lay-xe/${id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')?.replace(/"/g, '')}`,
            }
        })
        .then((response) => {
            if (!response.ok) {
                alert('Lấy xe không thành công!');
            }
            return response.json();
        })
        .then(() => {
            alert('Lấy xe thành công!');
        })
        .catch((error) => {
            console.error('Error:', error);
            alert('Lấy xe không thành công!');
        })
        navigate('/lich-su-gui-xe');
      } else {
        alert('Thanh toán thất bại');
      }
    } catch (error) {
      alert('Lỗi kết nối máy chủ');
    }
  };

  if (!chiTietGuiXe) {
    return <div className="text-center py-5">Đang tải thông tin chi tiết gửi xe...</div>;
  }

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <div className="card shadow rounded-4 border-0">
            <div className="card-body p-4">
              <h3 className="card-title text-center mb-4">Thanh toán lấy xe</h3>

              <form onSubmit={handleSubmit}>
                <input type="hidden" name="chiTietGuiXeId" value={id} />

                <div className="mb-3">
                  <label className="form-label fw-semibold">Ngày gửi:</label>
                  <div className="form-control-plaintext">
                    {new Date(chiTietGuiXe.ngayGui).toLocaleString('vi-VN')}
                  </div>
                </div>

                <div className="mb-3">
                  <label className="form-label fw-semibold">Thời điểm thanh toán:</label>
                  <div className="form-control-plaintext">
                    {new Date().toLocaleString('vi-VN')}
                  </div>
                </div>

                <div className="mb-4">
                  <label className="form-label fw-semibold">Thành tiền (ước tính):</label>
                  <div className="form-control-plaintext text-danger fw-bold fs-5">
                    {tongTien.toLocaleString()} VNĐ
                  </div>
                </div>

                <div className="mb-4">
                  <label className="form-label fw-semibold">Phương thức thanh toán:</label>
                  <div className="d-flex gap-4 flex-wrap">
                    <div className="form-check">
                      <input
                        type="radio"
                        name="phuongThuc"
                        value="TienMat"
                        className="form-check-input"
                        checked={phuongThuc === 'TienMat'}
                        onChange={() => {
                          setPhuongThuc('TienMat');
                          setHienQR(false);
                        }}
                      />
                      <label className="form-check-label">Tiền mặt</label>
                    </div>
                    <div className="form-check">
                      <input
                        type="radio"
                        name="phuongThuc"
                        value="QR"
                        className="form-check-input"
                        checked={phuongThuc === 'QR'}
                        onChange={() => {
                          setPhuongThuc('QR');
                          setHienQR(true);
                        }}
                      />
                      <label className="form-check-label">Mã QR</label>
                    </div>
                  </div>
                </div>

                {hienQR && (
                  <div className="text-center mb-4">
                    <p className="fw-semibold">Quét mã để thanh toán:</p>
                    <img
                      src="/qrcode.png"
                      alt="Mã QR"
                      className="img-fluid rounded"
                      style={{ maxWidth: '200px' }}
                    />
                  </div>
                )}

                <div className="d-grid gap-3">
                  <button type="submit" className="btn btn-success btn-lg rounded-pill">
                    Thanh toán
                  </button>
                  <button
                    type="button"
                    className="btn btn-outline-secondary rounded-pill"
                    onClick={() => navigate('/lich-su-gui-xe')}
                  >
                    Hủy
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThanhToan;