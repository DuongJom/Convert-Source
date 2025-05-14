import React, { useState } from 'react';

const ThongKeDoanhThu: React.FC = () => {
    const [kieuThongKe, setKieuThongKe] = useState<'Ngay' | 'Thang' | 'Nam'>('Ngay');
    const [ngay, setNgay] = useState('');
    const [thang, setThang] = useState<number>(0);
    const [nam, setNam] = useState<number>(0);
    const [ketQua, setKetQua] = useState<number | null>(null);

    const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value as 'Ngay' | 'Thang' | 'Nam';
        setKieuThongKe(value);
        // Reset fields
        setNgay('');
        setThang(0);
        setNam(0);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        let apiUrl = "https://localhost:7537/api/admin/thong-ke";

        const params = new URLSearchParams({
            kieuThongKe: kieuThongKe,
            ngay: ngay,
            thang: thang.toString(),
            nam: nam.toString()
        });

        const res = await fetch(`${apiUrl}?${params.toString()}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')?.replace(/"/g, '')}`,
            }
        });

        if(!res.ok){
            console.log("Lỗi khi lấy dữ liệu thống kê");
        }

        const data = await res.json();
        setKetQua(data.doanhThu);
    };

    return (
        <div className="container mt-4">
            <h2><i className="bi bi-bar-chart-line me-2"></i>Thống kê doanh thu</h2>
            <form onSubmit={handleSubmit} className="mt-3">
                <div className="mb-3">
                    <label htmlFor="kieuThongKe" className="form-label">Chọn kiểu thống kê:</label>
                    <select
                        id="kieuThongKe"
                        className="form-select"
                        value={kieuThongKe}
                        onChange={handleTypeChange}
                    >
                        <option value="Ngay">Theo ngày</option>
                        <option value="Thang">Theo tháng</option>
                        <option value="Nam">Theo năm</option>
                    </select>
                </div>

                {kieuThongKe === 'Ngay' && (
                    <div className="mb-3">
                        <label className="form-label">Ngày:</label>
                        <input
                            type="date"
                            className="form-control"
                            value={ngay}
                            onChange={(e) => setNgay(e.target.value)}
                        />
                    </div>
                )}

                {kieuThongKe === 'Thang' && (
                    <div className="mb-3">
                        <label className="form-label">Tháng:</label>
                        <input
                            type="number"
                            min="1"
                            max="12"
                            className="form-control"
                            value={thang}
                            onChange={(e) => setThang(Number(e.target.value))}
                        />
                    </div>
                )}

                {(kieuThongKe === 'Nam' || kieuThongKe === 'Thang') && (
                    <div className="mb-3">
                        <label className="form-label">Năm:</label>
                        <input
                            type="number"
                            min="2000"
                            max="2100"
                            className="form-control"
                            value={nam}
                            onChange={(e) => setNam(Number(e.target.value))}
                        />
                    </div>
                )}

                <button type="submit" className="btn btn-primary">Thống kê</button>
            </form>

            {ketQua !== null && (
                <div className="alert alert-success mt-4">
                    <h4>Doanh thu: {ketQua.toLocaleString()} VNĐ</h4>
                </div>
            )}
        </div>
    );
};

export default ThongKeDoanhThu;
